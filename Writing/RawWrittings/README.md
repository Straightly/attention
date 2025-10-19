# Raw Writings

This folder contains spontaneous thoughts, observations, and ideas that may develop into formal papers.

## Purpose

- **Capture raw ideas** before they're forgotten
- **Make ideas scannable** for future paper writing
- **Track conceptual connections** across different thoughts
- **Preserve the spark** that triggered each exploration

## Using the Template

1. Copy `_TEMPLATE.md` when creating a new raw writing
2. Fill in the frontmatter (title, date, tags, context, status)
3. Capture your initial thought in "Initial Spark"
4. Extract key concepts, questions, and connections
5. Update as ideas develop

## Frontmatter Fields

- **title**: Descriptive name for the idea
- **date**: When the idea emerged (YYYY-MM-DD)
- **tags**: Searchable keywords with # prefix
- **context**: Where/why this came up (e.g., "Museum visit", "Conversation with X", "Reading Y")
- **status**: Track development
  - `raw-idea` - Initial capture
  - `developing` - Actively exploring
  - `ready-for-paper` - Mature enough to incorporate
  - `incorporated` - Already used in a paper

## Tips for Scannable Writing

### Good Tags
Use specific, searchable tags:
- `#time #duration #philosophy` ✓
- `#interesting #thoughts` ✗

### Good Initial Spark
Preserve the raw thought:
- "Found out the museum has a 'time of art activity' and it triggered..." ✓
- "This paper will explore temporal dimensions..." ✗

### Good Questions
Ask specific, explorable questions:
- "How do we measure duration differently in art vs. physics?" ✓
- "What is time?" ✗

## Searching Your Raw Writings

### By Tag
```bash
grep -r "#philosophy" Writing/RawWrittings/
```

### By Concept
```bash
grep -r "duration" Writing/RawWrittings/
```

### By Date Range
```bash
grep -r "date: 2025-10" Writing/RawWrittings/
```

### By Status
```bash
grep -r "status: ready-for-paper" Writing/RawWrittings/
```

## From Raw Writing to Paper

1. **Scan** your raw writings for related tags/concepts
2. **Extract** key insights and questions
3. **Connect** ideas across multiple raw writings
4. **Develop** into structured arguments
5. **Update status** to `incorporated` when used
