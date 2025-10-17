#!/usr/bin/env python3
"""
Script to organize Notion backup files into appropriate folders based on content analysis.
"""

import os
import shutil
import re
from pathlib import Path

# Define paths
BASE_DIR = Path("/Users/zan/z/attention")
NOTION_BACKUP = BASE_DIR / "rawMaterials" / "notionBackup"
READING_DIR = BASE_DIR / "Reading"
WRITING_DIR = BASE_DIR / "Writing"
JOURNAL_DIR = BASE_DIR / "Journal"
TODOS_DIR = BASE_DIR / "ToDos"
MISC_DIR = BASE_DIR / "Misc"

# Minimum content threshold (in characters) to consider a file has "real content"
MIN_CONTENT_LENGTH = 50

def get_file_content(file_path):
    """Read and return file content, handling encoding issues."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return ""

def get_meaningful_content(content):
    """Extract meaningful content, excluding title and metadata."""
    lines = content.split('\n')
    meaningful_lines = []
    
    for i, line in enumerate(lines):
        # Skip title (first line starting with #)
        if i == 0 and line.startswith('#'):
            continue
        # Skip empty lines
        if not line.strip():
            continue
        # Skip metadata lines (Date:, Tags:, etc.)
        if re.match(r'^(Date|Tags|Amount|Full date|Ran today|Meditated|Practiced guitar):', line):
            continue
        meaningful_lines.append(line)
    
    return '\n'.join(meaningful_lines).strip()

def has_real_content(file_path):
    """Check if file has real content beyond just title and metadata."""
    content = get_file_content(file_path)
    meaningful = get_meaningful_content(content)
    
    # Check if meaningful content is substantial
    return len(meaningful) >= MIN_CONTENT_LENGTH

def categorize_file(file_path, content):
    """Determine which category a file belongs to based on its content and name."""
    filename = file_path.name.lower()
    meaningful_content = get_meaningful_content(content).lower()
    full_content_lower = content.lower()
    
    # Check filename patterns first
    # Date-based files (habit tracker style) - skip these
    if re.match(r'^@(january|february|march|april|may|june|july|august|september|october|november|december|last|today|yesterday)', filename):
        return None
    
    # Journal files - explicit journal naming
    if 'journal' in filename and 'journal' not in ['journal entry', 'journal article']:
        return JOURNAL_DIR
    
    # ToDo/Task files - only if explicitly task-related
    if any(keyword in filename for keyword in ['todo', 'to-do', 'weekly to-do', 'task list', 'planner', 'tracker', 'shopping']):
        return TODOS_DIR
    
    # Check for job application tracking pattern
    if re.search(r'(position:|stage:|applied|to apply)', full_content_lower):
        return TODOS_DIR
    
    # Check content patterns with weighted scoring
    # Journal indicators (personal reflections, dated entries)
    journal_score = 0
    if re.search(r'add your notes here', meaningful_content):
        journal_score += 3
    if re.search(r'(felt|feeling|realized|today i|yesterday i)', meaningful_content):
        journal_score += 2
    if re.search(r'^\s*#\s*\w+\s+\d+,\s+\d{4}', content, re.MULTILINE):  # Date headers
        journal_score += 2
    
    # ToDo indicators (actionable items, checklists)
    todo_score = 0
    checkbox_matches = len(re.findall(r'\[\s*[x ]\s*\]', meaningful_content))
    if checkbox_matches >= 3:  # Multiple checkboxes indicate a todo list
        todo_score += 5
    elif checkbox_matches > 0:
        todo_score += 2
    if re.search(r'(deadline|due date|priority)', meaningful_content):
        todo_score += 2
    
    # Reading/Reference indicators (notes from external sources)
    reading_score = 0
    # Check for references to external content
    if re.search(r'(source:|reference:|author:|paper|article|study|research)', meaningful_content):
        reading_score += 3
    # Check for structured academic/technical content
    if re.search(r'(abstract|introduction|methodology|conclusion|part i|part ii|part iii)', meaningful_content):
        reading_score += 3
    # Check for person names as titles (likely notes about someone's work)
    if re.search(r'^#\s+[A-Z][a-z]+\s+[A-Z][a-z]+:', content):
        reading_score += 2
    # Technical/AI content (likely reading material)
    if re.search(r'(llm|gpt|chatgpt|deepseek|model|neural network|transformer|ai|machine learning)', meaningful_content):
        reading_score += 2
    # Version comparisons (likely reading/research)
    if re.search(r'(version|comparison|vs\.|versus)', meaningful_content):
        reading_score += 1
    
    # Writing indicators (original thoughts, ideas, essays)
    writing_score = 0
    if re.search(r'tags:\s*idea', full_content_lower):
        writing_score += 3
    if re.search(r'(my take|i think|i believe|in my view|my perspective)', meaningful_content):
        writing_score += 3
    if re.search(r'(idea|concept|thought|perspective|opinion)', meaningful_content):
        writing_score += 1
    # Check for essay-like structure
    if len(meaningful_content) > 500 and not re.search(r'\[\s*[x ]\s*\]', meaningful_content):
        writing_score += 1
    
    # Determine category based on scores
    scores = {
        JOURNAL_DIR: journal_score,
        TODOS_DIR: todo_score,
        READING_DIR: reading_score,
        WRITING_DIR: writing_score,
    }
    
    max_score = max(scores.values())
    
    # If no clear category, use Misc
    if max_score == 0:
        return MISC_DIR
    
    # If there's a tie, use priority: Reading > Writing > Journal > ToDos
    if reading_score == max_score and reading_score > 0:
        return READING_DIR
    elif writing_score == max_score and writing_score > 0:
        return WRITING_DIR
    elif journal_score == max_score and journal_score > 0:
        return JOURNAL_DIR
    elif todo_score == max_score and todo_score > 0:
        return TODOS_DIR
    
    return MISC_DIR

def sanitize_filename(filename):
    """Create a cleaner filename by removing hash suffixes."""
    # Remove the hash pattern like "1f13e8a19b1c80cf9f49cb14f834bfff"
    name = re.sub(r'\s+[a-f0-9]{32}', '', filename)
    return name

def organize_files():
    """Main function to organize all files."""
    stats = {
        'total': 0,
        'empty': 0,
        'copied': 0,
        'skipped': 0,
        'by_category': {
            'Reading': 0,
            'Writing': 0,
            'Journal': 0,
            'ToDos': 0,
            'Misc': 0,
        }
    }
    
    print("Analyzing Notion backup files...\n")
    
    # Get all markdown files
    md_files = list(NOTION_BACKUP.glob("*.md"))
    stats['total'] = len(md_files)
    
    for file_path in md_files:
        # Skip non-markdown files
        if not file_path.suffix == '.md':
            continue
        
        # Check if file has real content
        if not has_real_content(file_path):
            stats['empty'] += 1
            continue
        
        # Read content for categorization
        content = get_file_content(file_path)
        
        # Categorize the file
        target_dir = categorize_file(file_path, content)
        
        if target_dir is None:
            stats['skipped'] += 1
            continue
        
        # Create cleaner filename
        new_filename = sanitize_filename(file_path.name)
        target_path = target_dir / new_filename
        
        # Handle duplicate filenames
        counter = 1
        while target_path.exists():
            name_without_ext = target_path.stem
            target_path = target_dir / f"{name_without_ext}_{counter}.md"
            counter += 1
        
        # Copy the file
        try:
            shutil.copy2(file_path, target_path)
            category_name = target_dir.name
            stats['by_category'][category_name] += 1
            stats['copied'] += 1
            print(f"✓ Copied: {file_path.name} → {category_name}/{target_path.name}")
        except Exception as e:
            print(f"✗ Error copying {file_path.name}: {e}")
    
    # Print summary
    print("\n" + "="*60)
    print("ORGANIZATION SUMMARY")
    print("="*60)
    print(f"Total files analyzed: {stats['total']}")
    print(f"Files with no real content (skipped): {stats['empty']}")
    print(f"Date-based tracker files (skipped): {stats['skipped']}")
    print(f"Files copied: {stats['copied']}")
    print("\nFiles by category:")
    for category, count in stats['by_category'].items():
        if count > 0:
            print(f"  {category}: {count} files")
    print("="*60)

if __name__ == "__main__":
    organize_files()
