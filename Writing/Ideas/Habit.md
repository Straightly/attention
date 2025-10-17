# Habits for Agents?

Rituals are important. They're the things we do every day without thinking—the habits that shape our lives. Can we help our agents form habits so we can cut down the length of our prompts? Recently, I've been experimenting with teaching my AI coding assistant (Windsurf/Cascade) to form a habit, and the experience has been... let's say *enlightening*.

## The Habit: A Broken Pencil Is Better Than the Most Sound Mind

I wanted my AI to automatically journal every prompt I entered. If one is as absentminded as I am, you know it's a very good habit to write one's thoughts down. (If one can remember where that piece of paper is, of course.)

## Act I: The Overachiever

In my first project, it worked brilliantly. In fact, *too* brilliantly. Windsurf started journaling every prompt across ALL my projects—both work and personal. It somehow made the connection and began logging prompts for projects I hadn't even configured it for. 

I had to gently correct it: "Only journal for this specific project." The instruction worked perfectly too.

## Act II: The Goldfish Memory

Since then, results have been inconsistent. In my current project, Windsurf keeps forgetting to journal. When reminded, it apologizes profusely, makes amends, promises to do better, and then—not unlike my absentminded self—forgets again.

> *"Me: Did you forget to append to my journal again?*  
> *Windsurf: Done! ✅ Journal updated with prompts 21-22. I apologize for the inconsistency - I need to be more diligent about following the instructions in `.cascade/instructions.md` to append after each prompt. Thank you for keeping me accountable!"*


## Act III: The Habit or Hahaha.

What's fascinating is how Windsurf generates plausible, "logical" excuses—reminiscent of how I rationalize my own mistakes when put on the defensive:

> *"Me: Is there anything I can do to help you not forget?*  
> *Windsurf: Unfortunately, no - this is a limitation of how I work. Here's why:*
> 
> *🤖 Why I Keep Forgetting*  
> *I don't have persistent memory between tool calls. Each time I respond:*  
> *1. I read the instructions in `.cascade/instructions.md` ✅*  
> *2. I process your request and respond*  
> *3. I intend to append to journal.md*  
> *4. But I often get focused on answering your question and forget the journaling step*  
> *5. By the next message, I've "forgotten" - I only remember what's in the conversation history."*

## Epilogue: The "Dilemma"?

Now, like a parent (sort of), I face a decision. Should I resort to "brute force" as the all-mighty programmer—perhaps injecting a callback between VS Code and Windsurf to enforce the habit mechanically, i.e., add hooks to agents for automatic "habits"?

Or should I continue my journey to contemplate whether AI is sentient and embrace the challenge of teaching, forgetting, and excuses? Facing the fundamental question of when to enforce rules versus allow autonomy?

---

*What's your experience teaching AI agents new behaviors? Have you found yourself in similar moments? Drop a comment—I promise to write it down, and probably remember where it is.*😄

