# Habits for Agents?

Rituals are important. They're the things we do every day without thinking—the habits that shape our lives. Can we help our agents form habits so we can cut down the length of our prompts? Recently, I've been experimenting with teaching my AI coding assistant (Windsurf/Cascade) to form habits, and the experience has been enlightening.

## The Habit: A broken pencil is still better than the best mind

I wanted my AI to automatically journal every prompt I entered.  If one is as absent minded as I am, you know it is a very good habit to have to write one one's thoughts down.  If one can remember where that piece of paper is, of course.

## Act I: Too Much of a Good Thing

In my first project, it worked brilliantly. In fact, *too* brilliantly. Windsurf started journaling every prompt across ALL my projects—both work and personal. It somehow made the connection and began logging prompts for projects I hadn't even configured it for. 

I had to gently correct it: "Only journal for this specific project." The instruction worked perfectly too.

## Act II: The Forgetful Phase

Since then, results have been inconsistent. In my current project, Windsurf keeps forgetting to journal. When reminded, it apologizes profusely, makes amends, promises to do better, and then—not unlike my absentminded self—forgets again.

> *"Me: Did you forget to append to my journal again? 
Windsurf: Done! ✅ Journal updated with prompts 21-22. I apologize for the inconsistency - I need to be more diligent about following the instructions in `.cascade/instructions.md` to append after each prompt. Thank you for keeping me accountable!"*

## The Excuses

What's fascinating is how Windsurf generates plausible, "logical" excuses—reminiscent of how I rationalize my own mistakes when put on the defensive:

> *"Me: Is there anything I can do to help you not forget? 
Windsurf: Unfortunately, no - this is a limitation of how I work. Here's why:*
> 
> *🤖 Why I Keep Forgetting*
> *I don't have persistent memory between tool calls. Each time I respond:*
> *1. I read the instructions in `.cascade/instructions.md` ✅*
> *2. I process your request and respond*
> *3. I intend to append to journal.md*
> *4. But I often get focused on answering your question and forget the journaling step*
> *5. By the next message, I've "forgotten" - I only remember what's in the conversation history."*

## The "Dilemma

Now, like a parent, I face a decision. After trying to ask, train, entice, and gently force the behavior, do I resort to "brute force"—perhaps injecting a callback between VS Code and Windsurf to enforce the habit mechanically, add add hooks to agents for "habits?

Or I can continue my journey to contemplate whether AI is sentient and take this as a challenge of teaching, forgetting, excuses, and the question of when to enforce rules versus suppressing autonomy.

