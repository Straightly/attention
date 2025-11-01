# Building a Memory System for AI: The BrokenPencil Project

**Date:** October 25, 2025  
**Target:** LinkedIn Post  
**Follow-up to:** "Can AI Agents Form Habits?"

---

## Breaking News: Claude's Memory System (And Why I'm Building My Own)

Claude just announced a memory system! Exciting, right? Except... It wants to keep your memory and you have to pay for it.

I also read somewhere that AI agents, as new as they are, are already outdated. The new buzzword is "AI clones"—digital representations of yourself that are supposedly "more you than you realize yourself." Is that even possible? But I digress.

### What Memory Systems Do (And Why That's Good)

At its core, a memory system keeps a bunch of texts and facts which, when attached to your prompt, help AI generate better responses. That's genuinely useful.

### But Here's What Bothers Me

**First: Its my memory.  How should I use it is me.  I trust Claude, but it is not me.**
AI is great and AI, trust me, has become way smarter than I am. It is also not that I do not trust Claude that it will use my memory to build an AI army to ensclave humanity as Elon Musk tried to sacre people with for his huge paypackage.  None of that.  It simply that It is my memory.  How and when to use it is really what makes me who I am.  "I think therefore I am".  AI and Claude are smarter than I am, but I would like to think for myself, thank you.

**Second: The Cost Problem**

I don't like to pay. It's not just the money—It is not I simply do not want to be forced into a way of thinking.  I do not want to make a commitment to think in a way prescribed to me by making a commitment to a service.  Indeed, I am committed to not to be pigeon holded into anything, Memory System from Claude included.

**Third: The Autonomy Problem**

The little information I have about Claude's memory sends chills down my spine. I quote: "bio, tone, style, etc." My immediate reaction: Why would I want that?

It's NOT that I don't trust Claude or fear this information will be abused. Well, not only that.  It's that I refuse to let anybody—Claude and AI included—produce anything dictated by my bio, tone, style, or any profiling. 

I may want to add a humorous tone to my writings. I may even want to do that using a formal style. But that's what **I**—this conscious self that is I—want to do. I want Claude to help me achieve my goals and have my experiences, not to have the experiences for me.

**Third: The Control Problem**

At the practical level, memory systems are scary because how information gets used is not decided by me. What to use and what not to use in producing a response isn't just about what's in the memory—it's also a value assessment. What needs to be added to my prompts should be a conscious decision that shouldn't be delegated to AI.

**Finally: The Philosophical Problem**

This goes against my understanding of AI. My understanding is that the interface to LLMs is just text: a string in and another string out. Why am I spending time and money learning how to use a system that hides the LLM from me?

Being a programmer, I believe in David Wheeler's principle: "Any problem can be solved by another layer of indirection." I cannot see why a memory system can't be just a bunch of strings I keep somewhere and can conveniently add to my prompt before sending it to an LLM at a free website.

**So I'm starting an open source project: BrokenPencil.**

---

## The Problem: AI That Forgets (And Why That's Actually Okay)

In my last post, I shared my experience teaching an AI coding assistant to journal my prompts. The results were... inconsistent. The AI kept forgetting, apologizing, and forgetting again.

But here's what I realized: **This isn't a bug. It's a feature.**

Modern AI systems operate with:
- **Limited context windows** (like human short-term memory)
- **Stateless processing** (each conversation starts fresh)
- **No persistent memory** across sessions

But that is not a bug.  It is a feature because LLM is supposed to be a smart with vast knowledge and acute reasoning capabilities.

The ancient proverb holds true: **"A broken pencil is better than the most sound mind."** Even AI needs to write things down.

---

## The Solution: External Memory You Control

Instead of fighting AI's forgetfulness or paying for proprietary memory systems, we can build a **memory layer** that:
- Works with any LLM (free or paid)
- Keeps you in control of what's remembered.
-- It helps you to organize what's remembered, but it is open sourced so you are free to organize your memory any way yo like

The key insight:

> **Memory isn't about perfect recall or AI "knowing" you. It's about reliable externalization and conscious retrieval.**

### Core Components

**1. Memory Storage**
- Store conversations, preferences, and context as structured data
- Windsurf suggested that one should use "Use vector embeddings for semantic search".  I am sure we do not want this, for now or forever.  Convince me with any concrete use case if you may.
- Tag memories by project, topic, and any tags of your own choice.
- Version control everything (it's just text files!)

**2. Conscious Retrieval**
- When you build a prompt, you can consciously select what memories to include.  
- When on embarks on a new project, the memory selection can be tagged by project for convenience.  
- Windsurf suggested that one should use "Use semantic similarity to find related past interactions".  I am sure we do not want this, for now or forever.  Convince me with any concrete use case if you may. 
- Windsurf suggested that one should " prioritize recent and frequently accessed memories?  Or remove old/obsolete memories."  Sounds like something we should try to avoid, right?  

**3. Memory Management**
- Let users review and edit what's stored but help them organize it
- Refactor and Reorganize memories as needed.  Are there better tools thank LLM in doing this?

### Why This Approach Solves My Concerns

This addresses all the problems I mentioned:

✅ **Free to use** - Works with any LLM, including free ones  
✅ **LLM-agnostic** - No vendor lock-in.  In fact, it's agnostic to the LLM.  You could very well be sending the prompt to any expert, made by human biologically or artificially, conducting a reverse Turing test.  
✅ **You stay in control** - Explicitly choose what memories to attach to prompts  
✅ **Transparent** - You can see and edit what's remembered, and more importantly, you can see and edit what's sent to the LLM.  Furthere and more important, it is open sourced so you can not only change the memory you keep, but also how you want to keep it.  If a broken pencil and a napkin is not good enough for you, get a pen and a notebook.  
✅ **Privacy-first** - Your data stays local or in your control.  
✅ **Portable** - Memories are just text md files displayed in a web interface. 
✅ **No profiling** - AI doesn't "learn" your style; you consciously add context.

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

## Current Status & Next Steps

**Current Status:**
- ✅ Project repository created on Bitbucket
- ✅ Architecture design done
- ✅ MVP in a week
- 📋 Make it aviable to public users

**Immediate Next Steps:**
1. Implement basic CLI for manual memory save/retrieve
2. Add semantic search with embeddings
3. Create simple tagging system
4. Build proof-of-concept integration with one AI tool

**Looking for:**
- **Contributors** - Especially those interested in LLM tooling, vector databases, or UX design
- **Feedback** - What features matter most to you?
- **Use cases** - How would you use this in your workflow?

---

## Join the Project

If you're interested in building better memory systems for AI:

🔗 **Repository:** [Bitbucket - BrokenPencil](https://bitbucket.org/[your-username]/brokenpencil)  
📧 **Contact:** [Your Email]  
💬 **Discussion:** Open an issue or start a discussion on the repo

The goal isn't to build the perfect memory system—it's to build a *good enough* system that's:
- **Reliable** (like a broken pencil that still writes)
- **Transparent** (you can see what's remembered)
- **Controllable** (you decide what matters)
- **Portable** (works with any LLM)

---

## The Bigger Picture

This project is part of a larger shift in how we interact with AI. But unlike proprietary memory systems, BrokenPencil keeps you in the driver's seat:

**Stateless interactions** → **Stateful relationships** (but you control the state)  
**One-off queries** → **Ongoing conversations** (with explicit context)  
**Generic responses** → **Personalized assistance** (through your chosen memories, not AI profiling)  
**Black box AI** → **Transparent augmentation** (you see what's added to prompts)  
**Paid subscriptions** → **Free, open tools** (works with any LLM)

The broken pencil principle applies: **External memory you control is better than AI that "knows" you.**

---

## Your Thoughts?

I'd love to hear:
- What memory features would be most valuable to you?
- What concerns do you have about AI memory systems?
- What use cases am I missing?
- Would you use or contribute to something like this?

Drop a comment or reach out directly. Let's build better tools for working with AI.

---

**TL;DR:** AI systems forget because they're stateless. I'm building BrokenPencil, an open source memory layer for LLMs that stores and retrieves context across conversations. It's LLM-agnostic, privacy-first, and transparent. Looking for contributors and feedback.

---

*"A broken pencil still writes. A sound mind still forgets. AI needs to write things down too."*

**#AI #OpenSource #LLM #MachineLearning #SoftwareDevelopment #ProductivityTools**