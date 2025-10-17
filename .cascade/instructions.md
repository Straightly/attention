# Project Instructions for Cascade AI

## Prompt Logging Requirement

**IMPORTANT:** At the end of every conversation session, append the user's prompts to `/Users/zan/z/attention/journal.md`.

### Format for Journal Entries

Each session should be logged with:

```markdown
## YYYY-MM-DD (Day of Week)

### Session: [Brief Description]

**Time:** HH:MM - HH:MM TZ

#### Prompt N (HH:MM)
```
[User's prompt text]
```

**Outcome:**
- [Brief summary of what was accomplished]
- [Key files created/modified]
```

### When to Log
- Log prompts at the end of each conversation OR when the user explicitly asks
- Include the timestamp and a brief outcome summary
- Keep the format consistent with existing entries in journal.md

### Example Entry
```markdown
## 2025-10-16 (Wednesday)

### Session: File Organization

**Time:** 19:39 - 19:56 PDT

#### Prompt 1 (19:39)
```
Can you organize my Notion files?
```

**Outcome:**
- Created organize_notion.py script
- Organized 65 files into Reading/Writing/Journal/ToDos/Misc folders
```

## Project Context

This is a knowledge management project where the user:
- Organizes content from Notion exports
- Maintains folders: Reading (references), Writing (original work), Journal (personal notes), ToDos (tasks), Misc (other)
- Plans to use organized content for academic paper writing
- Works in both English and Chinese

## Key Files
- `journal.md` - Prompt history (append here!)
- `organize_notion.py` - Script for organizing Notion exports
- `ORGANIZATION_SUMMARY.md` - Summary of organization work
- `NEXT_STEPS.md` - Recommendations for future work
