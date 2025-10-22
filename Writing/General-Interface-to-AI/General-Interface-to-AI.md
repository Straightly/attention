# General Interface to AI

**Author:** [Your Name]  
**Date:** October 22, 2025  
**Status:** Draft  

---

## Abstract

As artificial intelligence transitions from a tool for code generation to a fundamental computing paradigm, the question of how humans, systems, and agents interface with AI becomes critical. This paper explores the evolution of human-computer interfaces—from assembly language to high-level programming languages to natural language—and proposes a framework for understanding the emerging "general interface" to AI systems. Drawing on Andrej Karpathy's concept of Software 3.0 and recent developments in AI agents, we examine the architectural, philosophical, and practical implications of treating AI not as a code translator, but as a collaborative partner in problem-solving.

---

## 1. Introduction: the assumptions.

We assume that AI is smart, very smart.  In particular, it is very knowledgeable.  We assumed that it will be a disservice to ourselves and to our customers if we do not use AI as much as we can.  So the goal of an UI to AI is help ourselves to take full advantage of AI.  We are not trying to build a better model, nor that we have the resources of $trillions to contribute to the model's betterment.

OTOH, we are also assume that AI is limited in many ways.  We are not building an interface to the Singularity.  We know Singularity has not be attained yet, and know all our efforts will be rendered useless we it is attained.  We are hoping to build an interface to AI to make our life easier than without.

### 1.1 From Machine Code to Natural Language

Software development has undergone three major paradigm shifts:

- **Software 1.0**: Computer code (Assembly, C, Java, Python) where humans write explicit instructions
- **Software 2.0**: Neural network weights where models learn patterns from data
- **Software 3.0**: Prompts where humans describe intent in natural language

As Karpathy observes, "the hottest new programming language is English." Yet most developers still use AI as a *translator*—converting English specifications into traditional code—rather than as a fundamentally different computing substrate.

### 1.2 The Interface Problem

A lot of software was written to interface between computers and humans. Because computers could ONLY handle structured data, we painstakingly formatted our data and logic into something even a computer could "understand." With the advent of Large Language Models (LLMs), this constraint has dissolved. The language of the day is now English.

Yet we face a paradox: **we're using AI to write code in languages designed for machines that can't understand natural language**. This reveals a deeper question: What should the interface to AI actually look like?

---

## 2. The Three Categories of Digital Information Consumers

Karpathy identifies a fundamental shift in how digital information is consumed and manipulated:

1. **Humans** (through GUI)
2. **Computers** (through APIs)
3. **NEW: Agents** ← computers... but human-like, speaks English

This third category represents a hybrid: systems that consume structured data like computers but interact through natural language like humans. This duality creates unique interface requirements.

---

## 3. Beyond Code Translation: Rethinking Ambition

### 3.1 The Narrow Prompt Problem

Consider a typical developer prompt:

> "Expand the id field in this API to allow both long and string."

This prompt reflects decades of training: break problems down until they're small enough to code. The developer knows they need to merge data from two sources (one using long IDs, another using UUID strings) but frames the solution in terms of code changes.

### 3.2 The Ambitious Alternative

A more ambitious prompt might be:

> "Change the API to import data from these two sources, whose formats are X and Y. Here are examples. Merge the results to preserve all important fields and remove duplicates."

This shift—from *implementation* to *intent*—represents the core opportunity of AI interfaces. We're no longer constrained by what we can explicitly code; we're constrained only by how clearly we can articulate goals.

### 3.3 The Ultimate Question

As software developers, when AI can write code for us, what should we be doing? The answer isn't "write better code with AI's help"—that's still thinking within the old paradigm. The real question is:

> **What problems become solvable when we stop thinking in terms of code?**

---

## 4. Architectural Implications: From Logic Engines to Behavior Orchestrators

### 4.1 Traditional Architecture: Closed Systems

Traditional software is deterministic:
- Built from modular components (APIs, databases, UI layers)
- Data and logic are strictly separated
- Flow follows linear pipelines: *input → processing → output*
- Success means **precision, predictability, and repeatability**

### 4.2 AI-Based Architecture: Open Ecosystems

AI-based systems are probabilistic:
- Center on "black box" AI models
- Rely on prompt engineering, RAG (Retrieval-Augmented Generation), and fine-tuning
- Flow is nonlinear: *user query → context retrieval → AI generation → validation → output*
- Success means **relevance, coherence, and creativity**

### 4.3 The Hybrid Future

The future lies in hybrid systems:
- Traditional code for safety-critical logic (e.g., transferring funds)
- AI for open-ended interaction (e.g., explaining financial concepts)
- **The interface layer** that mediates between these two worlds

---

## 5. The General Interface: Key Components

### 5.1 Context Packaging

Before calling an LLM, the system must package relevant state into a context window. This includes:
- User intent and history
- Relevant code, documents, or data
- System constraints and capabilities
- Domain-specific knowledge

### 5.2 Model Orchestration

Modern AI applications don't use a single model but orchestrate multiple:
- Embedding models for semantic search
- Chat models for generation
- Specialized models for specific tasks (diff application, code analysis, etc.)

The interface must abstract this complexity from the user.

### 5.3 The Autonomy Slider

Karpathy describes an "autonomy slider" in tools like Cursor:
- **Tab**: Autocomplete (minimal autonomy)
- **Cmd+K**: Inline edit (moderate autonomy)
- **Cmd+L**: Chat mode (high autonomy)
- **Cmd+I**: Agent mode (maximum autonomy)

This spectrum reflects a fundamental interface design principle: **users need control over how much agency they delegate to AI**.

### 5.4 The Verification Loop

The most critical component of AI interfaces is the verification loop:

1. **Make verification EASY and FAST**
2. **Keep AI "on a tight leash"** to increase probability of successful verification
3. **Agents are overrated**: An agent generating 1000 lines of code is useless if verification takes hours

The interface must be designed to make this loop as fast as possible. As Karpathy notes: "An agent generating 1000 lines of code is of no use to me if I have to read through them and verify it."

---

## 6. Interface Design Principles

### 6.1 Describe, Don't Prescribe

The interface should encourage users to describe *what* they want, not *how* to implement it. This requires:
- Natural language as first-class input
- Examples and demonstrations over specifications
- Iterative refinement over upfront completeness

### 6.2 Transparency and Explainability

Users must understand:
- What the AI is doing
- Why it made specific choices
- What assumptions it's making
- Where uncertainty exists

### 6.3 Incremental Progress

The AI-assisted workflow should be:
- Describe the single, next concrete, incremental change
- Don't ask for code, ask for approaches
- Pick an approach, draft code
- Review/learn: pull up API docs, ask for explanations
- Wind back, try a different approach
- Test, commit, repeat

### 6.4 Human-in-the-Loop by Default

Full autonomy should be opt-in, not default. The interface should:
- Show diffs clearly
- Allow easy rollback
- Provide supervision points
- Enable course correction

---

## 7. Toward a Generic Agent Interface

### 7.1 The Core Question

To build a truly general interface to AI, we must answer:
- What is the **data structure** for representing intent?
- What is the **protocol** for agent communication?
- What are the **security boundaries** for agent actions?
- How do we **compose** multiple agents?

### 7.2 Interface vs. Implementation

A general interface must separate:
- **What** the user wants (intent)
- **How** the AI achieves it (implementation)
- **Why** decisions were made (reasoning)
- **When** to ask for human input (uncertainty)

### 7.3 The Role of Standards

Just as HTTP standardized web communication and REST standardized APIs, we need standards for:
- Agent capability description
- Intent representation
- Context sharing
- Result verification

---

## 8. Case Study: The Evolution of This Paper

This paper itself demonstrates the interface challenge. It was created through:

1. **Natural language intent**: "I want to write a paper titled 'General Interface to AI'"
2. **Context gathering**: Scanning existing writings for relevant content
3. **Reference assembly**: Copying related materials into a references folder
4. **Content synthesis**: Incorporating ideas from multiple sources
5. **Iterative refinement**: (Ongoing)

The AI acted not as a code generator but as a **research assistant, synthesizer, and collaborator**—precisely the kind of interface we're describing.

---

## 9. Challenges and Open Questions

### 9.1 The Ambiguity Problem

Natural language is inherently ambiguous. How do we:
- Disambiguate user intent?
- Handle conflicting requirements?
- Resolve underspecified problems?

### 9.2 The Verification Bottleneck

As AI becomes more capable, verification becomes the bottleneck. How do we:
- Make verification faster than generation?
- Build trust without complete understanding?
- Handle emergent behaviors?

### 9.3 The Security Question

When agents can take actions on behalf of users:
- How do we authenticate agent identity?
- How do we authorize agent actions?
- How do we audit agent behavior?
- How do we prevent prompt injection and other attacks?

### 9.4 The Composition Problem

How do multiple agents:
- Discover each other's capabilities?
- Coordinate on shared tasks?
- Resolve conflicts?
- Share context efficiently?

---

## 10. Conclusion: The Decade of Interfaces

Karpathy says: "This is not the year for agents. This is the decade of agents." We would extend this: **This is the decade of interfaces to agents**.

The transition from Software 2.0 to Software 3.0 isn't just about better models—it's about fundamentally rethinking how humans and machines collaborate. The "general interface to AI" isn't a single API or protocol; it's a design philosophy that:

1. **Treats natural language as a first-class interface**
2. **Prioritizes intent over implementation**
3. **Balances autonomy with control**
4. **Makes verification fast and easy**
5. **Embraces hybrid human-AI workflows**

We're not building Iron Man robots with full autonomy. We're building Iron Man suits—**partial autonomy products with custom GUI and UX, fast generation-verification loops, and autonomy sliders**.

The question isn't whether AI will change how we build software. It's whether we'll design interfaces that unlock AI's full potential—or constrain it to merely translating our old ways of thinking into slightly faster code.

---

## References

See `references/` folder for source materials:
- Andrej Karpathy: Software is Changing Again
- Deep Seek on Software with/out AI
- My Version (on AI ambition)
- Idea Chat GPT Version
- Toward Generic Agent: The Interface
- Example of API Graph

---

## Next Steps

1. **Expand Section 7**: Propose concrete data structures and protocols for generic agent interfaces
2. **Add Security Section**: Deep dive into authentication, authorization, and agent security models
3. **Case Studies**: Add more real-world examples of effective AI interfaces
4. **Comparative Analysis**: Compare existing AI interface approaches (Cursor, Copilot, ChatGPT, etc.)
5. **Implementation Proposal**: Draft a reference implementation of a generic agent interface

---

**Note**: This is a living document. As AI capabilities evolve and interface patterns emerge, this paper should be updated to reflect new insights and practices.
