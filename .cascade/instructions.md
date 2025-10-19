# Project Instructions for Cascade AI

## Prompt Logging Requirement

**CRITICAL - DO THIS FIRST:** Before responding to ANY user prompt, immediately append it to `/Users/zan/z/attention/journal.md`. 

- Journal the prompt BEFORE executing any other tasks
- Do NOT wait until end of session
- Do NOT journal outcomes (too lengthy) - only journal the prompt itself

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
```

### When to Log
- Log EVERY prompt IMMEDIATELY before responding
- Only include the prompt text, NOT the outcome
- Keep the format consistent with existing entries in journal.md
- Use the current time from metadata

### Example Entry
```markdown
## 2025-10-16 (Wednesday)

### Session: File Organization

**Time:** 19:39 - 19:56 PDT

#### Prompt 1 (19:39)
```
Can you organize my Notion files?
```
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
