# Building a Memory System for AI: The BrokenPencil Project

**Date:** October 25, 2025  
**Target:** LinkedIn Post  
**Follow-up to:** "Can AI Agents Form Habits?"

---

## Breaking News: Claude's Memory System (And Why I'm Building My Own)

Claude just announced a memory system! Exciting, right? Except... it's only for paid users.

I also read somewhere that AI agents, as new as they are, are already outdated. The new buzzword is "AI clones"—digital representations of yourself that are supposedly "more you than you realize yourself." Is that even possible? But I digress.

### What Memory Systems Do (And Why That's Good)

At its core, a memory system keeps a bunch of texts and facts which, when attached to your prompt, help the AI generate better responses. That's genuinely useful.

### But Here's What Bothers Me

**First: The Cost Problem**

I don't like to pay. It's not just the money—it's the mental overhead of wondering how much I'll have to pay to use all the different models and systems. Also, paying means I've made a choice asserting that this is better than the free alternatives, which I'm not ready or knowledgeable enough to make.  Of course, pay wall create a two tiered system of knowledge and is biased against the haven'ts, where I am.

**Second: The Autonomy Problem**

The little information I have about Claude's memory sends chills down my spine. I quote: "bio, tone, style, etc." My immediate reaction: Why would I want that?

It's NOT that I don't trust Claude or fear this information will be abused. Well, not only that.  It's that I refuse to let anybody—Claude and AI included—produce anything dictated by my bio, tone, style, or any profiling. 

I may want to add a humorous tone to my writings. I may even want to do that using a formal style. But that's what **I**—this conscious self that is I—want to do. I want Claude to help me achieve my goals and have my experiences, not to have the experiences for me.

**Third: The Control Problem**

At the practical level, memory systems are scary because how information gets used is not decided by me. What to use and what not to use in producing a response isn't just about what's in the memory—it's also a value assessment. What needs to be added to my prompts should be a conscious decision that shouldn't be delegated to AI.

**Finally: The Philosophical Problem**

This goes against my understanding of AI. My understanding is that the interface to LLMs is just text: a string in and another string out. Why am I spending time and money learning how to use a system that hides the LLM from me?

Being a programmer, I believe in David Wheeler's principle: "Any problem can be solved by another layer of indirection." I cannot see why a memory system can't be just a bunch of strings I keep somewhere and can conveniently add to my prompt before sending it to an LLM at a free website.

**So I'm building exactly that: BrokenPencil.**

---

## The Problem: AI That Forgets (And Why That's Actually Okay)

In my last post, I shared my experience teaching an AI coding assistant to journal my prompts. The results were... inconsistent. The AI kept forgetting, apologizing, and forgetting again.

But here's what I realized: **This isn't a bug in the AI. It's a fundamental architectural challenge.**

Modern AI systems operate with:
- **Limited context windows** (like human short-term memory)
- **Stateless processing** (each conversation starts fresh)
- **No persistent memory** across sessions

They have vast knowledge but no memory of *you*—your preferences, your projects, your history—unless it's explicitly written down and retrieved.

The ancient proverb holds true: **"A broken pencil is better than the most sound mind."** Even AI needs to write things down.

---

## The Solution: External Memory You Control

Instead of fighting AI's forgetfulness or paying for proprietary memory systems, we can build a **memory layer** that:
- Works with any LLM (free or paid)
- Keeps you in control of what's remembered
- Makes memory retrieval explicit and transparent

The key insight:

> **Memory isn't about perfect recall or AI "knowing" you. It's about reliable externalization and conscious retrieval.**

### Core Components

**1. Memory Storage**
- Store conversations, preferences, and context as structured data
- Windsurf suggested that one should use "Use vector embeddings for semantic search".  I am sure we do not need this for now and for a long while.  Convince me with any concrete use case if you may.
- Tag memories by project, topic, and any tags of your own choice.
- When on embarks on a new project, or issue prompts repeatedly against certain topics, areas etc. info, facts, and knowledge in the prompts are extracted properly tagged and stored.  
- Version control everything (it's just text files!)

**2. Smart Retrieval**
- When you start a conversation, automatically inject relevant memories into context
- Windsurf suggested that one should use "Use semantic similarity to find related past interactions".  I am sure we do not need this for now and for a long while.  Convince me with any concrete use case if you may. 
- Should we prioritize recent and frequently accessed memories? Or rather old/obsolete memories will be conciously removed?  
- Filter by project scope

**3. Memory Management**
- Let users review and edit what's stored
- Refactor and Reorganize memories as needed.

### Why This Approach Solves My Concerns

This addresses all the problems I mentioned:

✅ **Free to use** - Works with any LLM, including free ones  
✅ **LLM-agnostic** - No vendor lock-in.  In fact, it's agnostic to the LLM.  You could very well be sending the prompt to any expert, made by human biologically or artificially, conducting a reverse Turing test.  
✅ **You stay in control** - Explicitly choose what memories to attach to prompts  
✅ **Transparent** - You can see and edit what's remembered, and more importantly, you can see and edit what's sent to the LLM.  
✅ **Privacy-first** - Your data stays local or in your control.  "First funding plea:  I will like to host the storage in the cloud for some users with the funding." 
✅ **Portable** - Memories are just text md files displayed in a web interface. 
✅ **No profiling** - AI doesn't "learn" your style; you consciously add context  

---

## Introducing BrokenPencil: An Open Source Project

I'm building this as an open source project called **BrokenPencil** on Bitbucket. You use it to enter prompts and get responses from LLMs. As a result of using it, facts and knowledge are extracted and recorded into persistent storage. These facts and knowledge are organized so you can easily attach them to your prompt before it's sent to the LLM—at any free website you choose.

### Project Goals

**Phase 1: Core Memory System**
- Simple web app where one enter a prompt and get an enhanced prompt.  One can copy and paste the enhanced prompt to any LLM website, for free I assume.  If one is not free, go to the next one.
- Basic tagging and organization functionality
- Markdown-based storage for human readability

**Phase 2: Broser Integration**
- Chrome plugin to inject the enhanced prompt into the LLM website.

**Phase 2: LLM Integration**
- Automatic memory extraction from conversations
- Developing meta prompts to extract memories from prompts (and conversations?)
- Refactoring and reorganizing using LLM.

**Phase 3: Advanced Features**
- Scaling Intellegence using Agile approach. 
- Specification of software components/services where implementation is truly hidden from the consumers.  i.e. Memory of the other system that is needed by the consumers, not the momory needed to implement the system.

### Technical Architecture

Windsurf actually suggested a very "impressive" architecture which proabably would have gained a budgeting office's approval but is both way too complex and totally irrelevant.  I am soliciting programmers to help me build this system and my vetting question is:  "Designed me the permenant storage mechanism for the momories and estimate the implementation costs."  IMHO, the mechanism is so obvious, a qualified programmer should almost have it at the top of his mind. 

### Why Open Source?

1. **No subscription fees** - Free to use, forever
2. **Privacy matters** - You control your AI memories, not a corporation
3. **Transparency builds trust** - See exactly how it works, no black boxes
4. **Community innovation** - Better solutions emerge from collaboration
5. **Portability** - No vendor lock-in, use with any LLM
6. **Conscious control** - You decide what memories to use, not an algorithm

---

## Real-World Use Cases

### For human
- Customize LLM so you do not have to remind it of whatever you have to remind it repeatedly.
- Stretch goals: Customize LLM so your pormpts will solicit better responses from LLM.  Challege here is that "better" is a relative term, especially even the free LLM website has implicitly added memory, often to produce hulluciatinated responses.  

