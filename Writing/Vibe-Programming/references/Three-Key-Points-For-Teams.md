# Three Key Points on LLM-Accelerated Coding
## For Sharing with Development Teams

**Based on:** 25 days of empirical practice, 107 documented prompts  
**Context:** Prepared for Clinicals specialties zone team discussion  
**Date:** November 12, 2025

---

## 1. Start Small with Real Problems, Iterate Rapidly

### What Worked
I built a complete ToDoApp in one evening through conversational prompts—no manual coding. Started with "create a todo list app" and evolved it through 14 incremental prompts:
- GitHub integration
- Authentication (localStorage-based tokens)
- Tagging system (hashtag parsing)
- Deployment automation

### Key Insight
**Small, verifiable increments work better than large autonomous tasks.** Each prompt took 5-10 minutes to verify. The verification loop is critical—make it fast and easy.

### Practical Tip
Don't ask AI to "build everything." Ask for one concrete feature at a time, test immediately, then iterate.

**Example prompt:**
> "I want to add hashtag tags like #work #urgent. Display filter buttons at the top to toggle which tags are shown."

### Supporting Evidence from Journal
- Prompt 9 (Oct 16): Initial app creation
- Prompts 10-20: Security refinement, authentication redesign
- Prompts 94-97 (Oct 29): Tag feature implementation
- Average iteration time: 5-10 minutes between prompts
- Success rate: 65% on first attempt, 21% required iteration

---

## 2. Cross-Domain Capability is the Real Superpower

### What Worked
I successfully used LLM coding for:
- **Web development** (JavaScript/HTML/CSS)
- **Academic writing** (2,500-word security papers)
- **Content organization** (405 files from Notion backup)
- **Deployment scripts** (bash/batch automation)
- **System configuration** (proxy setup, git automation)

All without being an expert in any domain.

### Key Insight
**You don't need to know the syntax, APIs, or frameworks.** You need to clearly describe **what you want**, not **how to implement it**. The AI handles the implementation details.

### Practical Tip
Focus prompts on intent and outcomes, not implementation.

**Bad prompt:**
> "Change the id field to accept both long and string."

**Good prompt:**
> "Import data from these two sources with different ID formats (one uses long IDs, another uses UUID strings). Merge results to preserve important fields and remove duplicates."

### Supporting Evidence from Journal
- Prompt 1: Organized 405 files with intelligent categorization (16-24x speedup)
- Prompt 6: Created comprehensive AI security paper with Auth0 analysis
- Prompt 71: Single prompt generated 301-line paper with references
- Prompt 74-77: Philosophical essay with conceptual synthesis
- Zero lines of code written manually across all projects

---

## 3. The Challenges: Verification, Context, and Trust

### What Didn't Work Smoothly

#### Verification Bottleneck
Understanding why/how AI-generated code works requires domain knowledge. As AI gets better at generating code, verification becomes the slowest part of the workflow.

**Example:** Chinese character encoding issue in ToDoApp (Prompt 84)—AI fixed it, but I had to verify it worked for existing items and understand if old data needed re-entry.

#### Context Window Limits
AI "forgets" secondary tasks despite explicit instructions. I had to remind the AI 15+ times to journal my prompts, even with persistent instructions in `.cascade/instructions.md`.

**Pattern:** Background tasks compete with foreground tasks for limited attention.

#### Ambiguity Problem
Natural language is inherently ambiguous. Approximately 10-15% of my prompts needed clarification or correction.

**Example (Prompt 12):**
> "I think you misunderstood me. I want the app to read only one file. ToDos/List.json..."

### Key Insight
**LLM coding is powerful but not autonomous.** You need human judgment for:
- Verification of correctness
- Security decisions
- Understanding trade-offs
- Domain knowledge application

### Practical Tip
- Use git commits after each successful increment
- Keep changes reversible
- For high-stakes code (security, PHI/PII, patient data), verify thoroughly even if you trust the AI
- Request explanations when needed: "Can you explain why this approach works?"

### Supporting Evidence from Journal
- 15+ prompts reminding AI to journal (Prompts 22, 32, 38, 40, 48, 57, 65, 73, 82, 85, 98)
- ~15 prompts (14%) required clarification
- ~22 prompts (21%) required iteration
- Meta-experiment on teaching AI habits became research topic itself

---

## Bonus: Tools & ROI

### Tools Used
- **Primary:** Windsurf/Cascade AI assistant
- **Similar tools:** Cursor, GitHub Copilot, Replit AI
- **Hosting:** GitHub Pages (free, static sites)
- **Version control:** Git (essential for reversibility)

### Productivity Metrics

| Metric | Value |
|--------|-------|
| Time investment | 20-25 hours over 25 days |
| Prompts documented | 107 |
| Output | 1 production app, 4 major papers (1,000+ lines), infrastructure improvements |
| Traditional estimate | 100+ hours |
| **ROI** | **4-5x productivity improvement** |

### Time Savings Examples
- **ToDoApp:** 8-10 hours → 2 hours (4-5x faster)
- **Content organization:** 4-6 hours → 15 minutes (16-24x faster)
- **General Interface paper:** 6-8 hours → 15 minutes (24-32x faster)

### The Real Shift
**Programming becomes about articulating intent and verifying results, not writing code.**

**Skill shift:**
- **Traditional:** Syntax, algorithms, debugging techniques
- **LLM-accelerated:** Communication, domain knowledge, verification

---

## Best Practices Summary

### Prompt Design
✅ Be specific about intent, not implementation  
✅ Provide context and examples  
✅ Request incremental changes  
✅ Use conversational language

### Verification
✅ Test immediately after each change  
✅ Request explanations when needed  
✅ Keep changes reversible (git commits)  
✅ Verify each increment before moving forward

### Iteration
✅ Refinement loop: prompt → review → refine → repeat  
✅ Exploration: ask AI to propose approaches  
✅ Clarification: "I think you misunderstood me..."  
✅ Explicit reminders for persistent behaviors

---

## Recommendations for Team Experimentation

### Start With
1. **Low-stakes projects:** Personal tools, prototypes, internal utilities
2. **Clear requirements:** Well-defined features with testable outcomes
3. **Incremental approach:** One feature at a time, verify before moving on

### Avoid Initially
1. **Production-critical code** without thorough verification
2. **Security-sensitive features** without expert review
3. **Large autonomous tasks** that are hard to verify

### Measure
1. **Time to first prototype** (expect 5-10x improvement)
2. **Iteration speed** (expect 3-5x improvement)
3. **Verification overhead** (expect 2-3x increase)
4. **Cross-domain capability expansion** (significant)

### Learn
1. **What prompts work well** for your domain
2. **Where verification is needed most** (security, data handling, edge cases)
3. **Which tasks benefit most** from LLM acceleration

---

## Discussion Questions for Team

1. **What types of tasks** in your workflow would benefit most from LLM acceleration?
2. **What are your concerns** about code quality, security, or maintainability?
3. **How would you structure** verification and review processes?
4. **What metrics** would you use to measure success?
5. **How would this change** your development workflow and team dynamics?

---

## References

**Primary source:** `journal.md` - 107 prompts documented over 25 days (Oct 16 - Nov 8, 2025)

**Related writings:**
- `Vibe-Programming-A-Personal-Journey.md` - Full presentation paper
- `Part1-Introduction.md` - Methodology and statistics
- `Part2-Case-Studies.md` - Detailed case studies
- `Part3-Patterns-And-Insights.md` - Findings and best practices

**External references:**
- Andrej Karpathy: "The hottest new programming language is English"
- Wikipedia: "Vibe coding" definition
- arXiv:2510.12399v1: "A Survey of Vibe Coding with Large Language Models"

---

**Prepared for:** Clinicals specialties zone team  
**Author:** Zhi An  
**Date:** November 12, 2025  
**Status:** Ready for presentation
