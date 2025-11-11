# Vibe Programming: A Personal Journey
## Part 3: Patterns, Insights, and Best Practices

---

## 4. Patterns and Insights from 107 Prompts

### 4.1 The Autonomy Spectrum

My prompts naturally fell along Karpathy's "autonomy slider":

**Minimal Autonomy (Tab-level):**
- "Please fix this typo"
- "Did you remember to journal my prompts?"

**Moderate Autonomy (Cmd+K level):**
- "Can you add a section to explain this confusion?"
- "Please trim 122 characters from this LinkedIn post"

**High Autonomy (Cmd+L level):**
- "Create a paper on Security of Using AI... analyze authentication and authorization flows"
- "Scan through all my writings, copy relevant contents, and fill in the md file"

**Maximum Autonomy (Agent mode):**
- "Organize 405 files from Notion backup into Reading/Writing/Journal/ToDos folders"
- "Please create my app in a subfolder called ToDoApp"

**Observation**: Higher autonomy prompts were more productive but required more verification time.

### 4.2 The Verification Loop

Karpathy emphasizes: "Make verification EASY and FAST. Agents are overrated. An agent generating 1000 lines of code is of no use to me if I have to read through them and verify it."

**My verification patterns:**

1. **Incremental changes**: Most prompts requested single, concrete changes
2. **Immediate testing**: "Everything seemed to working fine, except..." (Prompt 14)
3. **Iterative refinement**: "I made more changes. I notice there are still a lot of duplications. Please revise." (Prompt 101)
4. **Fast feedback loops**: Average time between prompts in active sessions: 5-10 minutes

**Critical insight**: Vibe programming works best with **small, verifiable increments**, not large autonomous agents.

### 4.3 The Ambition Gradient

My prompts showed increasing ambition over time:

**Week 1 (Oct 16-17)**: Tactical requests
- "Can you create a journal.md file at the root and record all my prompts?"
- "I want to create a list of todos..."

**Week 2 (Oct 19-22)**: Strategic requests
- "I want to write a paper title 'General Interface to AI'. Please create folder, add starter paper, list sections, scan folders, copy relevant contents, and incorporate all content you can from my writings into the paper."

**Week 3 (Oct 25-26)**: Conceptual requests
- "Create another article that will be suitable to post to LinkedIn... Make it NOT about the philosophy but about creating a memory saving and retrieving mechanism that can be used with LLM."

**Pattern**: As trust in the AI grew, prompts became more ambitious and conceptual.

### 4.4 The Forgetting Problem

**The most persistent pattern**: Reminders to journal prompts appeared in 15+ prompts:
- "Did you forget to append to my journal again?" (Prompt 22)
- "Please remember to journal all my prompts." (Prompts 32, 38, 57, 65, 73, 85)
- "Did you remember to journal my prompts?" (Prompts 40, 48, 82, 98)

This became a research topic itself, leading to the "Habits for Agents" and "Broken Pencil" writings.

**Key insight**: AI systems exhibit **human-like forgetting patterns**, despite having instructions in `.cascade/instructions.md`. This reveals fundamental limitations in current AI architectures around habit formation and persistent behavior.

---

## 5. Benefits Observed

### 5.1 Rapid Prototyping

**Example**: Complete ToDoApp with GitHub integration, authentication, and deployment—created in one evening through conversational prompts.

**Traditional approach**: Would require:
- Setting up project structure
- Writing HTML/CSS/JS boilerplate
- Implementing GitHub API integration
- Debugging authentication flows
- Creating deployment pipeline

**Estimated time savings**: 8-10 hours → 2 hours

### 5.2 Cross-Domain Capability

I successfully used vibe programming for:
- **Web development** (JavaScript, HTML, CSS)
- **Academic writing** (research papers, essays)
- **Content creation** (LinkedIn posts, philosophical writings)
- **DevOps** (deployment scripts, git automation)
- **System administration** (proxy setup, environment configuration)

**Key insight**: Vibe programming removes the barrier of domain expertise. I didn't need to be an expert in GitHub API, OAuth flows, or Markdown formatting—I just needed to describe what I wanted.

### 5.3 Conceptual-Level Programming

**Example (Prompt 71):**
> "I want to write a paper title 'General Interface to AI'. Please create folder, and add a starter paper, list the sections you think I should include, and scan my folders and copy all relevant contents into the folder, and finally incorporate all the content you can from my writings into the paper."

This single prompt resulted in:
- Folder structure creation
- 301-line comprehensive paper
- Reference materials copied from 6 different sources
- Content synthesis from multiple writings
- Section structure proposal

**Traditional approach**: This would be multiple separate tasks requiring explicit file operations, content analysis, and manual synthesis.

### 5.4 Iterative Refinement

Vibe programming excels at refinement:
- "I made a few changes... would please replicate that to the formatted version?" (Prompt 106)
- "Please edit my writing... I intend to post this to my LinkedIn account." (Prompt 25)
- "Linked in says my article is 122 characters too long. Can you help trimming it?" (Prompt 32)

Each refinement was conversational, contextual, and required no code.

---

## 6. Limitations and Challenges

### 6.1 The Verification Bottleneck

**Observation**: As AI capability increased, verification became the bottleneck.

**Example (Prompt 84):**
> "I noticed that in my ToDoApp, After I entered a todo item in Chinese, it was displayed correctly. However, later, when I load the todo list again, it was showing garbage."

The AI fixed the encoding issue, but I had to:
1. Test the fix
2. Verify it worked for existing items
3. Understand if old data needed re-entry

**Challenge**: Even with correct code, understanding **why** something broke and **how** the fix works requires domain knowledge.

### 6.2 The Context Window Problem

**Observation**: The AI frequently "forgot" to journal prompts despite explicit instructions.

**Root cause**: Limited context window and stateless processing mean:
- Instructions must compete with task content for attention
- Secondary tasks (like journaling) get deprioritized
- No persistent memory between interactions

**Attempted solutions**:
- `.cascade/instructions.md` file (inconsistent)
- Pre-commit hooks (mechanical, not learned)
- Repeated reminders (effective but manual)

**Key insight**: Current AI architectures struggle with **persistent background behaviors**.

### 6.3 The Ambiguity Problem

**Example (Prompt 12):**
> "I think you misunderstood me. I want the app to read only one file. ToDos/List.json, and add/remove items from that file also. Can you please change?"

Natural language is inherently ambiguous. The AI initially misunderstood my intent.

**Pattern**: Approximately 10-15% of prompts were clarifications or corrections.

### 6.4 The Trust Problem

**Question**: When should I trust AI-generated code I don't fully understand?

**My approach**:
- **Low-stakes projects**: Full trust (ToDoApp, personal writings)
- **High-stakes projects**: Verification required (security papers, production code)
- **Learning mode**: Request explanations and API docs

**Unresolved tension**: True vibe programming means accepting code without full understanding—but professional responsibility requires verification.

---

## 7. Best Practices Emerged

### 7.1 Prompt Design Principles

**Be specific about intent, not implementation:**
- ❌ "Change the id field to accept both long and string"
- ✅ "Change the API to import data from these two sources... Merge results to preserve important fields and remove duplicates"

**Provide context and examples:**
- ❌ "Add tagging to the app"
- ✅ "I would like to, optionally, add tags like work, idea, apartment, family etc. Then display the tags on top so items below can be toggled to show items with or without these tags."

**Request incremental changes:**
- ❌ "Build a complete todo app with all features"
- ✅ "I want to create a list of todos... currently only display the list, allow me to check off items and add new items"

### 7.2 Verification Strategies

**Test immediately:**
- Don't accumulate multiple changes before testing
- Verify each increment works before moving forward

**Request explanations when needed:**
- "Can you add a section to explain this confusion?"
- "Pull up API docs, ask for explanations"

**Keep changes reversible:**
- Use git commits after each successful increment
- "I messed up accepting/rejecting the changes... I have revert it to the previous version. Can you try again?" (Prompt 27)

### 7.3 Iteration Patterns

**The refinement loop:**
1. Initial prompt with broad intent
2. Review generated output
3. Identify issues or improvements
4. Conversational refinement: "I made more changes... Please revise"
5. Repeat until satisfied

**The exploration pattern:**
- "What would you suggest how I enter tags for an item?" (Prompt 94)
- Let AI propose approaches
- Select and refine

### 7.4 Managing AI Limitations

**Explicit reminders for persistent behaviors:**
- "Please remember to journal my prompts" (repeated as needed)

**Clarification when misunderstood:**
- "I think you misunderstood me..." (Prompt 12)

**Break complex tasks into steps:**
- Instead of one massive prompt, use conversational progression

---

## 8. Comparison with Traditional Programming

### 8.1 Development Workflow

**Traditional Programming:**
1. Break problem into implementable chunks
2. Write code for each chunk
3. Debug syntax and logic errors
4. Integrate components
5. Test and refine

**Vibe Programming:**
1. Describe desired outcome in natural language
2. Review generated code/content
3. Test functionality
4. Refine through conversational iteration
5. Verify and commit

**Key difference**: Focus shifts from **implementation** to **specification and verification**.

### 8.2 Skill Requirements

**Traditional Programming:**
- Language syntax and semantics
- Algorithm design
- Data structure knowledge
- Debugging techniques
- Framework/library APIs

**Vibe Programming:**
- Clear communication of intent
- Domain knowledge (what to build)
- Verification skills (testing, review)
- Prompt engineering
- Iterative refinement

**Key difference**: **Communication skills** become more important than **coding skills**.

### 8.3 Productivity Metrics

Based on my 25-day experience:

| Metric | Traditional | Vibe Programming | Improvement |
|--------|-------------|------------------|-------------|
| Time to first prototype | 4-8 hours | 30-60 minutes | 5-10x faster |
| Lines of code written | 100% manual | 0% manual | N/A |
| Iteration speed | Slow (rewrite code) | Fast (refine prompts) | 3-5x faster |
| Cross-domain capability | Limited by expertise | Limited by description | Significant expansion |
| Verification time | Low (wrote it myself) | High (need to understand) | 2-3x slower |

**Net result**: Faster development, broader capability, but higher verification overhead.
