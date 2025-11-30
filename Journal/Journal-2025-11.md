# Journal — 2025-11

> **Journaling rules for this repo (November 2025):**
> - All prompts for **2025-11** are journaled here, in chronological order.
> - **Every prompt must be logged verbatim** (quoted exactly as asked), followed by a brief Action note.
> - Do **not** reorder or rewrite existing entries; only **append** new ones at the end.
> - For other months, use `Journal/Journal-YYYY-MM.md` (e.g., `Journal-2025-12.md` for December 2025).
> - `Journal/Journal.md` is a historical archive and should not be reordered; treat it as read-only history.

---

## 2025-11-30 — Switch to Monthly Journals

**Prompt (~11:21 PST):** Do option 1, and start to journal to `Journal/Journal-2025-12` from tomorrow. Can you tease out November journals into its own file as our current journal?

**Action:** Decided to keep `Journal/Journal.md` as historical archive and introduce month-specific files. Created `Journal-2025-11.md` for November 2025 (this file) and `Journal-2025-12.md` for December 2025. Going forward, new November entries are appended here; starting 2025-12-01, entries go into `Journal-2025-12.md`.

## 2025-11-30 — Session Summary: WeChat Mini Programs, CV, Google Docs, and Journaling

**Prompts (overview for this session):**
- What information is available about a user in WeChat Mini Programs (basic profile, `openid`, group context via `openGId`).
- Extend the PaceLeader Mini Program project plan to include basic profile collection (`wx.getUserProfile`), `openid`-based identity, and (later) group-based access using `openGId`.
- Change the plan so that group-based access via `openGId` is a core requirement, enforcing "Pacer app only for Pacer group, Runner app only for Runner group".
- Convert a Word resume (`zhian-resume.docx`) into Markdown, deciding on export format (plain text vs RTF/ODT) and creating a structured `.md` version.
- Decide where to host the public full CV and publication list (Google Docs vs GitHub) and how to keep `.md` as source of truth.
- Work out the best way to move Markdown CV content into Google Docs without copying dark theme/background formatting (using plain text or Docs' Open/Upload flow).
- Create a dedicated publications Markdown file and a shortened job-search resume `zhian-resume.md`, with links to full CV and publications in Google Docs.
- Ensure all prompts are journaled in `Journal/Journal.md` (archive) and then design a new journal structure using monthly files (`Journal-YYYY-MM.md`).
- Decide to keep `Journal/Journal.md` as an archive and start using `Journal-2025-11.md` and `Journal-2025-12.md` for November and December 2025 respectively.

**Action:**
- Answered WeChat Mini Program data questions and updated `PaceLeaderMiniProgram/PROJECT_PLAN.md` to make `openid` the primary identity, `wx.getUserProfile` for basic profile, and `openGId`-based group access a core part of the design.
- Guided resume conversion: exported Word resume to plain text, converted it to a structured Markdown CV, then created a shorter `zhian-resume.md` optimized for job search, with links to full CV and publication list in Google Docs.
- Created `Writing/Resume/publications.md` as the Markdown source of truth for the publication list and aligned it with the Google Docs public link.
- Documented a workflow: edit CV/publications in Markdown locally, then publish/update Google Docs by opening the `.md`/`.txt` files inside Google Docs (File → Open → Upload) to avoid IDE theming issues.
- Clarified hosting choices (Google Docs for non-technical audiences; GitHub Markdown and/or Pages for technical/archival use).
- Restructured journaling so that `Journal/Journal.md` serves as historical archive, while new entries for November 2025 and onwards are written into monthly files (`Journal-2025-11.md`, `Journal-2025-12.md`) with append-only rules documented at the top of each file.

## 2025-11-30 — Verbatim Prompt Logging Requirement

**Prompt (~11:50 PST):**
```
Yes.  At the minimum, ALWAYS journal every single prompts per verbatim from now on.  Please update Journal\Journal-2025-11.md and Journal\Journal-2025-12.md so this will also be done in the future.
```

**Action:** Updated journaling rules in `Journal-2025-11.md` and `Journal-2025-12.md` to state that every prompt must be logged verbatim, with a brief Action note, and that entries are append-only and chronological. This entry is the first explicitly logged under the new rule.

## 2025-11-30 — Resume 98% Vibe Coding Edits

**Prompt (~11:39 PST):**
```
In the version you created for me, 98% vibe coding was removed.  I want that or even highlight it.  Can you find a good locattion for that?
```

**Action:** Added a new bullet to the Summary section of `Writing/Resume/zhian-resume.md` explicitly mentioning extremely high AI-assisted development adoption ("98% vibe coding") and placed it as the last bullet in the Summary so it is prominent but reads professionally.

**Prompt (~11:41 PST):**
```
I edit your addition.  Please review and edit.
```

**Action:** Reviewed the user-edited sentence in the Summary and proposed several cleaned-up versions, preserving the "98% vibe coding" phrase while fixing grammar and phrasing to be resume-friendly.

**Prompt (~11:44 PST):**
```
I was trying to convery the idea that the software design and engineer principles get carried out more because I was no longer burdened by lengthy coding/typing, almost like these "gods" become real persons.\\
```

**Action:** Rephrased the idea into multiple options that connect AI-assisted coding with better application of software design and engineering principles, including a more formal Option 3 for use in the resume.

**Prompt (~11:45 PST):**
```
option 3
```

**Action:** Updated the Summary bullet in `zhian-resume.md` to Option 3: "Extremely high AI-assisted development adoption ("98% vibe coding"), reducing manual coding and allowing deeper focus on applying solid software design and engineering principles."


