# Building a Memory System for AI: The BrokenPencil Project

**Date:** October 25, 2025  
**Target:** LinkedIn Post  
**Follow-up to:** "Can AI Agents Form Habits?"

---

## Breaking News: Claude's Memory System (And Why I'm Building My Own)

Claude just announced a memory system! Exciting, right? Except... it wants to keep your memory and you have to pay for it.

I also read somewhere that AI agents, as new as they are, are already outdated. The new buzzword is "AI clones"—digital representations of yourself that are supposedly "more you than you realize yourself." Is that even possible? But I digress.

### What Memory Systems Do (And Why That's Good)

At its core, a memory system keeps texts and facts which, when attached to your prompt, help AI generate better responses. That's genuinely useful.

### But Here's What Bothers Me

**First: It's My Memory—I Should Control It**

AI is great. AI has become way smarter than I am. But it's my memory. How and when to use it is what makes me who I am. "I think therefore I am." AI and Claude are smarter than I am, but I would like to think for myself, thank you.

**Second: The Cost and Commitment Problem**

I don't like to pay—not just because of the money, but because I don't want to be forced into a way of thinking. Making a commitment to a service means committing to conform to how that service want you to think. I refuse to be pigeonholed into anything, Memory System from Claude included.

**Third: The Autonomy Problem**

Claude's memory stores "bio, tone, style, etc." My immediate reaction: Why would I want that?

I refuse to let anybody—Claude and AI included—produce anything dictated by profiling. I may want a humorous tone with formal style, but that's what **I** want to do. I want Claude to help me achieve my goals and enhance my experiences, not have the experiences for me.

What to use in producing a response is a value assessment. What gets added to my prompts should be my conscious decision, not delegated to AI.

**Finally: The Philosophical Problem**

This goes against my understanding of LLM. The interface to LLMs is just text: a string in and another string out. Why spend time and money learning a system that hides the LLM from me?

As a programmer, I believe in David Wheeler's principle: "Any problem can be solved by another layer of indirection." A memory system can just be a bunch of strings I keep somewhere and conveniently add to my prompt before sending it to an LLM.  If the LLM is freely accessble, so much for the better.

**So I'm starting an open source project: BrokenPencil.**

---

## The Problem: AI That Forgets (And Why That's Actually a Feature)

In my last post, I shared my experience teaching an AI coding assistant to journal my prompts. The results were inconsistent. The AI kept forgetting, apologizing, and forgetting again.

But here's what I realized: **This isn't a bug. It's a feature.**

Modern AI systems operate with:
- **Limited context windows** (like human short-term memory)
- **Stateless processing** (each conversation starts fresh)
- **No persistent memory** across sessions

This is actually good design. LLMs are supposed to be smart with vast knowledge and acute reasoning capabilities—not repositories of your personal data and NOT some kind of clone of you which somebody by their wisdon think is "better than you" or "more you than you realize yourself".

---

## The Solution: External Memory You Control

The ancient proverb holds true: **"A broken pencil is better than the most sound mind."** Even AI needs to write things down.

Instead of fighting AI's forgetfulness or paying for proprietary memory systems, we can build a **memory layer** that:
- Works with any LLM (free or paid)
- Keeps you in control of what's remembered
- Helps you organize memories, but is open source so you're free to organize your way.
- Instead of build a "Memory System", we will be asking LLM to do it for us too.

The key insight:

> **Memory isn't about perfect recall or AI "knowing" you. It's about reliable externalize and conveniently retrieval.**

### Core Components

**1. reliable externalization**
- Store texture data as momories.
- Organize memories by tags. Tag memories by project, topic, and any tags of your choice
- Version control everything (it's just text files!)
- **Note:** Windsurf suggested vector embeddings for semantic search. I'm skeptical—convince me with a concrete use case.

**2. conveniently retrieval**
- When you build a prompt, consciously select what memories to include
- Tag memory selections by project for convenience.
- **Note:** Windsurf suggested semantic similarity and prioritizing recent memories. Sounds like something to avoid—we want conscious control, not algorithmic filtering.

**3. Memory Management: The Indirection**
- Review and edit what's stored
- Refactor and reorganize memories as needed
- We will, of course, use LLMs to help us with this. I was surprised that CLaude would even suggest there can be a "System" that is better than LLM for this.

### Why This Approach Works

✅ **Free & LLM-agnostic** - Works with any LLM, no vendor lock-in  
✅ **You control everything** - Choose what memories to attach, when, and how  
✅ **Transparent & open source** - See what's sent, change how it works  
✅ **Privacy-first** - Your data stays local or in your control  
✅ **Simple & portable** - Just markdown files  
✅ **No profiling** - You consciously add context, not AI learning your "style"

---

## Introducing BrokenPencil: An Open Source Project

I'm building **BrokenPencil** as an open source project on Bitbucket. You enter prompts, get enhanced prompts with selected memories attached, then send to any LLM website you choose (preferably free).  (footnote:  I just found out that Windsurf's none enterprise version has added a memory feature.  The feature was not available in the enterprise version.  It is also my experiences that the free version of LLMs are better than the paid API versions.  IMHO.)

### Project Goals

**Phase 1: Core Memory System**
- Simple web app to create enhanced prompts
- Basic tagging and organization
- Markdown-based for human readability
- Versioned storage.

**Phase 2: Browser Integration**
- Browser plugin to inject memories into prompts
- Local storage / self-hosted cloud storage you trust

**Phase 3: LLM Integration**
- LLM-assisted organization, refactoring and reorganization of memories
- Automatic memory extraction from conversations


### Technical Architecture

Windsurf suggested an "impressive" architecture that would probably get budget approval but is way too complex and too irrelevant. 

Vetting Question: **"Design the permanent storage mechanism for memories and estimate implementation costs."** 

Hint: the mechanism is so obvious any qualified programmer should have it on the top of their mind.

---

## Real-World Use Cases

**Primary:** Stop repeating yourself—attach relevant context to prompts

**Stretch Goal:** Organize your memories better (though "better" is relative, especially when free LLM websites add implicit memory that produces hallucinations)  

## Current Status & Next Steps

**Current Status:**
- ✅ Project repository created on Bitbucket
- ✅ Architecture design done
- 📋 MVP target: in a week or two.
- 📋 Make it available to public users

**Immediate Next Steps:**
1. Build proof-of-concept web interface
2. Test with real workflows

---

## Join the Project

If you're interested in building better memory systems for AI:

🔗 **Repository:** [Bitbucket - BrokenPencil](https://bitbucket.org/[your-username]/brokenpencil)  
📧 **Contact:** zhian.job@gmail.com  
💬 **Discussion:** Open an issue or start a discussion on the repo

**Looking for:**
- Contributors (especially LLM tooling or UX design)
- Feedback on features that matter most
- Real-world use cases

The goal: Build a *good enough* system that's reliable, transparent, convenient, and flexible. 

---

## The Bigger Picture

BrokenPencil is part of a shift in how we interact with AI:

- **Stateless** → **Stateful** (you control the state)  
- **One-off queries** → **Ongoing conversations** (explicit context)  
- **Generic** → **Contexted**  
- **Paid** → **Free & open**

**The broken pencil principle:** External memory you control is better than AI that "betters" you.

---

## Your Thoughts?

I'd love to hear:
- What memory features would be most valuable to you?
- What concerns do you have about AI memory systems?
- What use cases am I missing?
- Would you use or contribute to something like this?

Drop a comment or reach out directly. Let's build better tools for working with AI.

---

**TL;DR:** AI systems forget because they're stateless. I'm building BrokenPencil, an open source memory layer that stores and retrieves context across conversations. Free, LLM-agnostic, privacy-first, transparent. Looking for contributors.

---

*"A broken pencil still writes. A sound mind still forgets."*

**#AI #OpenSource #LLM #MachineLearning #SoftwareDevelopment #ProductivityTools**