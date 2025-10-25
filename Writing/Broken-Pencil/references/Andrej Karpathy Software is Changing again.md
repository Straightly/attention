# Andrej Karpathy: Software is Changing again

Software 1.0:  computer code.  Languages, 

Software 2.0: weights (neural network models)

Software 3.0:  prompts

To do sentiment classification, one can write code to do that.  One can train a neural network to do that.  or One can ask LLM with a prompt.  The hottest new programming language is English.

Part I : How to think about LLMs.  “AI is the new electricity.”  but it is more like an operating systems where different models provides very similar functions but there are certain switching frictions like linux, iOS, and windows.  In this analogy, LLMs are in the mainframe era of computing as one LLM is shared by many people who access them through very thin terminals and through time sharing.  Also, it is still at the text input era where GUI hasn’t been implemented.  Even in multi-model LLM, images, audios, and videos are streamed into LLM as one input entity, albeit larger.  So it is high time for us to program them.

Part II: psychology.  Super smart with obvious shortcomings.  Key: avoid the shortcomings and find way to take advantage of its super intelligence.

Part III: Opportunities.

Anatomy of Cursor:  two parts.  One is the classic IDE while another is the LLM integration allow one do things that is bigger.  Three apsects:

1. Package state into a context window before calling LLM.
2. Orchestrate and call multiple models (embedding models, chat models, diff apply models).
3. Application spefic GUI.
4. Autonomy slider.  Tab → cmd+K →cmd+L →cmd+I(agent mode)
5. For perplexity, it was search → research → deep research.

How software will look like:  

- can an LLM “see” all the things the human can?
- Can an LLM “act” in all the ways a human can?
- How can human supervise and stay in the loop?
- How the diff looks like?
- An gui should be designed to make this circle go as fast as possible.
1. Make the verification EASY and FAST.  
2. Keep AI “on a tigh leash” to increase the probablity of successful verification.
3. Agents are over rated.  An agent generating 1000 lines of code is of no use to me if I have to read through them and verify it.

“AI-assisted coding” workflows (very rapidly evolving…)

- describe the single, next concrete, incremental change.
- don’t ask for code, ask for approaches
    - pick an approach, draft code
    - review/learn: pull up API docs, as for explanations, …
    - wind back, try a different approach
- Test
- git commit
- ask for suggestions on what could be implemented next.
- repeat.

This is the year for agents.  No, this is the decade of agents, it will take a long time for agents to come about.  

No Iron man robots, flashy demos of autonomous agents, AGI 2027

Do Iron Man Suites, partial automony products, Custom GUI and UIUX, Fast Generation - Verification loop, Autonomy slider.

There is a new category of consumer/manipulator of digital information:

1. Humans (through GUI)
2. Computers (through APIs)
3. NEW: Agents ← computers … but human-like, speaks English.

---

---