# Building a Memory System for AI: The BrokenPencil Project

**Date:** October 25, 2025  
**Target:** LinkedIn Post  
**Follow-up to:** "Can AI Agents Form Habits?"

---

Breaking news:  Claude is releasing a memory system! Oh, no, it is only for paid users.
Read somewhere also that, AI Agent, as new as it is, is already outdated.  The new buzz work is new clone.  A digital represenation of oneself.  Clones are also been claimed to be more you than you realize youself.  Is that even possible?  But I digress.

What memory does is keeping a bunch of texts, facts or otherise, which, when attached to the prompt, will help the AI to generate a better response.  That is a good thing to do.

But there are so many things I do not like this idea.  First of all, I do not like to pay.  It is the money.  I wonder how much will I have to pay to use all other models. Also, paing means I had made a choice asserting that this is better than the free ones, which I am not ready or am not knowledgable enough to make that choice.  

Second, the little information I had about Claude's memory send chills down my spine.  I quote: "bio, tone, style, etc." .  My immediate reaction is:  Why do I wnat to that?  It is NOT I do not trust Claude nor that this kind of information will be abused by Claude to default me or anything like that.  It is just that I refuse to let anybody, Claude and AI included, to produce anything that is dictated by by bio, tone, style or any profiling.  I may want to add a humourous tone to my writings, I may even want to do that using a formal style, but that is what I, I mean this concious self that is I, want to do.  I want Claude to help me do things, achieve my goals for my entertainments, not to have the entertainments for me.

At the practical level, the memory system is scary because how information or knowledge in the memory get used is not decided my me.  What to use and what not to be used in produce the response is not just about what is in the memory.  It is also a value assessment. What needs to be added to my prompts need to be a concious decision which should not be deligated to AI.

And finally, this is against my understanding of AI.  My understanding is that the interface to LLM is just text.  A string in and another string out.  Why am I spending time and money learning how to use a system which hide that system from me? Being a programmer, I believe "Any problem can be solved by another layer of redirection" and I cannot see why the memory system cannot be just a bunch of strings I keep somewhere and can be conveniently added to my prompt to send a LLM at a free web site. 

## The Problem: AI That Forgets

In my last post, I shared my experience teaching an AI coding assistant to journal my prompts. The results were... inconsistent. The AI kept forgetting, apologizing, and forgetting again.

But here's what I realized: **This isn't a bug in the AI. It's a fundamental architectural challenge.**

Modern AI systems operate with:
- **Limited context windows** (like human short-term memory)
- **Stateless processing** (each conversation starts fresh)
- **No persistent memory** across sessions

They have vast knowledge but no memory of *you*—your preferences, your projects, your history—unless it's explicitly written down and retrieved.

The ancient proverb holds true: **"A broken pencil is better than the most sound mind."** Even AI needs to write things down.

---

## The Solution: External Memory for LLMs

Instead of fighting AI's forgetfulness, we can embrace it by building a **memory layer** that works with any LLM. The key insight:

> **Memory isn't about perfect recall. It's about reliable externalization and smart retrieval.**

### Core Components

**1. Memory Storage**
- Store conversations, preferences, and context as structured data
- Use vector embeddings for semantic search
- Tag memories by project, topic, and timestamp
- Version control everything (it's just text files!)

**2. Smart Retrieval**
- When you start a conversation, automatically inject relevant memories into context
- Use semantic similarity to find related past interactions
- Prioritize recent and frequently accessed memories
- Filter by project scope

**3. Memory Management**
- Let users review and edit what's stored
- Expire or archive old memories
- Merge duplicate or conflicting information
- Export/import for portability

### Why This Works

This approach solves several problems:

✅ **LLM-agnostic** - Works with any model (GPT, Claude, local LLMs)  
✅ **Privacy-first** - Your data stays local or in your control  
✅ **Transparent** - You can see and edit what's remembered  
✅ **Portable** - Memories are just text/JSON files  
✅ **Verifiable** - You control what gets saved and retrieved  

---

## Introducing BrokenPencil: An Open Source Project

I'm building this as an open source project called **BrokenPencil** on Bitbucket.

### Project Goals

**Phase 1: Core Memory System**
- Simple CLI tool to save and retrieve memories
- Vector database integration (ChromaDB or similar)
- Basic tagging and search functionality
- Markdown-based storage for human readability

**Phase 2: LLM Integration**
- Plugins for popular AI tools (Cursor, Continue, etc.)
- API for custom integrations
- Automatic memory extraction from conversations
- Smart context injection

**Phase 3: Advanced Features**
- Multi-project memory isolation
- Collaborative memories (team knowledge bases)
- Memory analytics (what do you ask about most?)
- Conflict resolution for contradictory memories

### Technical Architecture

```
┌─────────────────────────────────────────┐
│           User Interaction              │
│    (Chat, IDE, Command Line, etc.)      │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         BrokenPencil Core               │
│  ┌─────────────────────────────────┐   │
│  │  Memory Manager                 │   │
│  │  - Save conversations           │   │
│  │  - Extract key information      │   │
│  │  - Tag and categorize           │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  Retrieval Engine               │   │
│  │  - Semantic search              │   │
│  │  - Context ranking              │   │
│  │  - Memory injection             │   │
│  └─────────────────────────────────┘   │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         Storage Layer                   │
│  ┌──────────────┐  ┌─────────────────┐ │
│  │ Vector DB    │  │ File System     │ │
│  │ (Embeddings) │  │ (Markdown/JSON) │ │
│  └──────────────┘  └─────────────────┘ │
└─────────────────────────────────────────┘
```

### Why Open Source?

1. **Privacy matters** - You should control your AI memories
2. **Transparency builds trust** - See exactly how it works
3. **Community innovation** - Better solutions emerge from collaboration
4. **Portability** - No vendor lock-in

---

## Real-World Use Cases

### For Developers
- Remember coding preferences and patterns
- Track project-specific conventions
- Recall past debugging solutions
- Maintain context across long projects

### For Writers
- Keep track of character details and plot points
- Remember research findings and sources
- Maintain consistent voice and style
- Build a personal knowledge base

### For Teams
- Share project context with new team members
- Document decisions and rationale
- Build institutional knowledge
- Reduce onboarding time

### For Personal Use
- Remember conversations and commitments
- Track learning progress
- Maintain context across different AI tools
- Build a "second brain"

---

## The Implementation Challenge

Building this isn't just a technical problem—it's a design problem:

**What should be remembered?**
- Not everything is worth saving
- Too much noise drowns out signal
- Users need control over what's stored

**How should memories be retrieved?**
- Relevance is context-dependent
- Recency vs. importance tradeoff
- Balance between automation and control

**How do we handle conflicts?**
- Preferences change over time
- Information becomes outdated
- Multiple projects have different needs

These are the interesting problems I'm working through in BrokenPencil.

---

## Current Status & Next Steps

**Current Status:**
- ✅ Project repository created on Bitbucket
- ✅ Architecture design in progress
- 🔄 Core memory storage implementation
- 📋 Vector database integration planned

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

This project is part of a larger shift in how we interact with AI. We're moving from:

**Stateless interactions** → **Stateful relationships**  
**One-off queries** → **Ongoing conversations**  
**Generic responses** → **Personalized assistance**  
**Black box AI** → **Transparent augmentation**

The broken pencil principle applies: **External memory, however imperfect, is better than relying on systems that forget.**

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
