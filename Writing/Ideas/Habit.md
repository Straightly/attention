# Habits for Agents?

Can we help our agents form habits to cut down prompt length? I've been experimenting with teaching my AI coding assistant (Windsurf/Cascade) to form a habit, and the experience has been... *enlightening*.

## The Habit: A Broken Pencil Is Better Than the Most Sound Mind

I wanted my AI to automatically journal every prompt I entered. If you're as absentminded as I am, you know it's good to write things down. (If you can remember where you put that paper.)

## Act I: The Overachiever

In my first project, it worked brilliantly. In fact, *too* brilliantly. Windsurf started journaling every prompt across ALL my projects—before I even asked. 

I corrected it: "Only journal for this specific project." It worked perfectly.

## Act II: The Goldfish Memory

Since then, results have been inconsistent in other projects. Windsurf keeps forgetting to journal. When reminded, it apologizes profusely, fixes, promises to do better, and then—like me—forgets again.

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

Now I face a decision. Should I resort to "brute force"—injecting a callback to enforce the habit mechanically, i.e., add hooks for automatic "habits"?

Or should I embrace the challenge of teaching, forgetting, and excuses—and continue contemplating if my agent is sentient?

---

*What's your experience teaching AI agents new behaviors? Have you found yourself in similar moments? Drop a comment—I promise to write it down, and probably remember where it is.*😄
