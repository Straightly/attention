# Vibe Programming: A Personal Journey
## Presentation Summary (15-20 minutes)

**Author:** Zhi An  
**Date:** November 10, 2025

---

## Opening Hook (1 min)

> "The hottest new programming language is English." — Andrej Karpathy

In the past 25 days, I wrote **zero lines of code**. Yet I built a complete web application, wrote four academic papers totaling over 1,000 lines, and organized 405 files—all through natural language conversations with an AI assistant.

This is **vibe programming**.

---

## What is Vibe Programming? (2 min)

**Definition**: A coding approach where developers use natural language to describe intent and let LLMs generate code, "fully giving in to the vibes" and "forgetting that the code even exists."

**Key characteristics:**
1. Natural language as primary interface
2. AI-generated code without full understanding
3. Intent articulation over implementation
4. Trust in the vibes

**The paradigm shift:**
- Software 1.0: Computer code (C, Java, Python)
- Software 2.0: Neural network weights
- **Software 3.0: Prompts** ← We are here

---

## My 25-Day Experiment (2 min)

**Setup:**
- Tool: Windsurf/Cascade AI assistant
- Duration: Oct 16 - Nov 8, 2025
- Documentation: 107 prompts journaled
- Approach: Intentional vibe programming

**What I built:**
- ✅ Complete ToDoApp with GitHub integration
- ✅ 4 major papers (AI security, philosophy, interfaces)
- ✅ Content organization system
- ✅ Deployment automation
- ✅ 0 lines of code written manually

**Time investment:** 20-25 hours  
**Traditional estimate:** 100+ hours  
**ROI:** 4-5x productivity improvement

---

## Case Study: The ToDoApp (3 min)

**Initial prompt:**
> "Please create my app in a subfolder called ToDoApp."

**Evolution through 14 prompts:**
1. Day 1: Complete app (HTML, CSS, JS, GitHub API)
2. Day 2: Security refinement (localStorage auth)
3. Day 6: Modular refactoring
4. Day 7: Inline editing
5. Day 15: Hashtag tagging system
6. Day 16: Deployment scripts

**Every line generated through English descriptions.**

**Key prompts:**
- "I want to create a list of todos..."
- "Can I even more fine tune the security..."
- "When I add a todo item, if there are tags selected, automatically tag the item..."

**Result:** Fully functional web app, deployed to GitHub Pages, accessible from any device.

---

## The Meta-Experiment: Teaching AI to Form Habits (3 min)

**The challenge:** Get the AI to journal my prompts automatically.

**Attempts:**
1. Direct instruction ❌
2. Persistent instructions file (`.cascade/instructions.md`) ⚠️
3. Repeated reminders (15+ times) ✅ (60-70% success)
4. Pre-commit hooks (considered)

**The AI's excuse:**
> "I don't have persistent memory between tool calls... I intend to append to journal.md, but I often get focused on answering your question and forget the journaling step."

**Eerily human**, right?

**Key insight:** AI systems exhibit human-like forgetting patterns. This reveals fundamental limitations in current architectures around habit formation and persistent behavior.

**This became a research topic itself**, leading to two papers:
- "Habits for Agents?" (LinkedIn post)
- "A Broken Pencil Is Better Than the Most Sound Mind" (philosophical essay)

---

## Key Findings (3 min)

### 1. The Autonomy Spectrum

Prompts naturally fell along a spectrum:
- **Minimal**: "Please fix this typo"
- **Moderate**: "Trim 122 characters from this LinkedIn post"
- **High**: "Create a paper... analyze authentication flows"
- **Maximum**: "Organize 405 files into Reading/Writing/Journal/ToDos"

### 2. The Verification Loop

**Karpathy's principle:** "Make verification EASY and FAST. Agents are overrated."

**My pattern:**
- Small, verifiable increments
- Immediate testing
- Fast feedback loops (5-10 min between prompts)

**Critical insight:** Vibe programming works best with small increments, not large autonomous agents.

### 3. The Ambition Gradient

**Week 1:** Tactical ("Create a journal file")  
**Week 2:** Strategic ("Write a paper, scan folders, incorporate content")  
**Week 3:** Conceptual ("Make it about memory mechanisms for LLM")

**Pattern:** As trust grew, prompts became more ambitious.

### 4. Cross-Domain Capability

Successfully used vibe programming for:
- Web development (JavaScript, HTML, CSS)
- Academic writing (research papers)
- Content creation (LinkedIn posts)
- DevOps (deployment scripts)
- System administration (proxy setup)

**No expertise required in any of these domains.**

---

## Benefits (2 min)

1. **Rapid prototyping**: 8-10 hours → 2 hours
2. **Cross-domain capability**: No need to be an expert in every technology
3. **Conceptual-level programming**: Single prompt → folder structure + 301-line paper + references
4. **Iterative refinement**: Conversational, contextual, no code

---

## Limitations (2 min)

1. **Verification bottleneck**: Understanding why/how fixes work requires domain knowledge
2. **Context window problem**: AI forgets secondary tasks (like journaling)
3. **Ambiguity problem**: ~10-15% of prompts needed clarification
4. **Trust problem**: When to trust code you don't fully understand?

---

## Best Practices (2 min)

### Prompt Design
- ✅ Be specific about **intent**, not implementation
- ✅ Provide context and examples
- ✅ Request incremental changes

### Verification
- ✅ Test immediately
- ✅ Request explanations when needed
- ✅ Keep changes reversible (git commits)

### Iteration
- ✅ Refinement loop: prompt → review → refine → repeat
- ✅ Exploration: ask AI to propose approaches

---

## The Future (1 min)

**Industry adoption:**
- Y Combinator: 25% of startups with 95% AI-generated code (March 2025)
- Wall Street Journal: Commercial adoption (July 2025)
- Fast Company: "Vibe coding hangover" reports (September 2025)

**Karpathy's vision:**
- Not Iron Man robots (full autonomy)
- But Iron Man suits (partial autonomy with human control)

**My predictions:**
- **Near-term (1-2 years):** Standard for prototyping
- **Mid-term (3-5 years):** New roles (prompt engineers, AI code auditors)
- **Long-term (5-10 years):** Natural language as primary interface

---

## Conclusion (1 min)

**Core insight:** Programming has always been about communication—communicating intent to machines.

**The paradigm shift:**
- **Traditional:** Programming is writing code
- **Vibe programming:** Programming is articulating intent

**What changes:**
- **Who can program:** Anyone who can clearly describe what they want
- **What skills matter:** Communication, domain knowledge, verification > syntax, algorithms

**The human element remains irreplaceable:**
1. Vision (deciding what to build)
2. Judgment (evaluating correctness)
3. Context (understanding why it matters)
4. Responsibility (owning outcomes)
5. Creativity (asking "what if?")

**Final thought:** The hottest new programming language is English. And like any language, mastery comes through practice, reflection, and continuous learning.

---

## Q&A Topics

**Prepared to discuss:**
- Specific prompt examples and techniques
- How to handle AI mistakes and misunderstandings
- Security and trust considerations
- Impact on software engineering education
- Comparison with traditional pair programming
- The role of code review in vibe programming
- Ethical considerations (attribution, responsibility)
- Tools and platforms (Windsurf, Cursor, Copilot, etc.)

---

## Slides Suggestion

1. Title slide
2. Opening hook (Karpathy quote)
3. What is vibe programming (definition + Software 3.0)
4. My 25-day experiment (stats)
5. Case study: ToDoApp evolution
6. The meta-experiment (teaching AI habits)
7. Key findings (4 insights)
8. Benefits (with metrics)
9. Limitations (4 challenges)
10. Best practices (prompt design, verification, iteration)
11. The future (industry adoption + predictions)
12. Conclusion (paradigm shift)
13. Q&A

---

**Presentation Time:** 15-20 minutes + Q&A  
**Audience:** Technical and non-technical  
**Tone:** Practical, reflective, slightly humorous  
**Goal:** Share real-world experience, not hype or fear
