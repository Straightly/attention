---
title: What should I do to prepare for the interview with Heathe...
date: 2025-10-19
tags: #idea #raw-thought
context: Captured via web app
status: raw-idea
---

## Initial Spark

What should I do to prepare for the interview with Heather Lane?  
Should I be extremely humble or patronizing? Or should I be more composed?  How much should I show off?  Bashing Elon Musk?

## Key Concepts

- To listen.  If she does not say anything, be patient and ready to ask more questions.
- Do not show off.  Only offer knowledge and ideas when asked.  Even when asked, be composed and patient and do not get overly excited.
- To be composed.  
- To be patient.  
- To be ready.  Try to prepare for quenctions so you can answer them with confidence.

## Questions to Explore

What ideas do I have to offer?  Or how can you help with our AI strategy?

- The VP for fulfillments.  He described his achievements and has gone a long way to make a very best first impressions for our software.
  - Opportunity for AI includes automation of configuration, automation of validation, automation of running smoketests, automatiion of check connectivity.
  - RAG and "Augumenting queries" are necessary.  How to do it in a scaled way"  We have a POC for a chatBot and a POC for chartAssistant and they run into speed and scale issue even for POC.  I, I wish I was in the Architectural group, as this is not an AI problem, this is a scalability system building problem which has been solved many times before, but Athena has decided to use Athena way to not using them.

- Chris for Security.  He was in your VAT meeting for a few times.  Your have called on having somebody to investigate the different scenarios to identify the security needs.  Agentic AI and/or MCP servives are not all the same.  MCP server for developers and MCP server for customers are totally different thing.  It is also very different between Customer facing agents and devloper helpts to improve developer productivity, such as making writing Athena policy conforming code.  Their security needs are totally different.  Even their architecture is very different.  One is exposeing a lot of development life cycles to LLM.  Another one is trying to get LLM into our providers' workflow to help them to be more profecient and accurate. Not even clear on what kind of MCP server are we building there:  To support partners accessing athenaNet data or to support AthenaNet Application to access LLM capabilities?  The security considerations are totally different.  I wish I was on your team so I have the opportunities to learn from you and do this kind of work.
- Even the A3 training.  I wish I had the time to read more of these topics and even finish the exercises.
- The Indian Teams are doing all kinds of POCs and I simply whish it is within my scope of work to even to attend the meetings and offer my advices and helps.  Quite honestly, I felt a little frustrated.  I believe I do have a lot ot offer, but my current position literally does not allow me to do so.
- The gateway is our window for Athenistats to access LLM.  It should be built up as a service and make it very esasy to use by any Athena team who want to access LLM in any of their workflows.  As a service, it should only do that.  For example, 
  - it should allow the user to simply choose what model to use
  - it should tally the cost of each team/POC so the user know the expenses.
  - Any POC team should be able to use it, simpler than using LLMs itself by signing on to their APIs. 
- There are so many teams working on or off with POCs.  Code fests and hackathons even overlap with each other.  Many efforts are duplicated and the teams ends up spending a lot of their time building the foundattions to use LLM, instead of just use LLM.  Our gateway should be able to allow them to use LLMs very easily and also provide a platform where they can share their ideas and experiences, and avoid re-inventing the wheel.

## Potential Connections

- Your AI Security paper in Writing/AI-Security-Paper/ (authentication, authorization, agent identity)
- MCP security considerations you've been thinking about
- Your experience with system scalability vs. "Athena way"

---
**[AI-GENERATED CONTENT BELOW - Added 2025-10-20]**

## Interview Preparation Suggestions

### Questions You Should Be Ready to Answer

**About Your Vision:**
1. "What's your vision for AI strategy at athenahealth?"
2. "How would you prioritize AI initiatives across the organization?"
3. "What's the biggest AI opportunity you see for us right now?"
4. "What's the biggest AI risk we're not addressing?"

**About Technical Leadership:**
5. "How do you balance innovation with security and compliance in healthcare?"
6. "Tell me about a time you had to advocate for a different technical approach"
7. "How would you handle conflicting priorities between multiple teams doing AI POCs?"
8. "What's your approach to building scalable AI infrastructure vs. quick POCs?"

**About Collaboration:**
9. "How would you work with teams that have different levels of AI maturity?"
10. "How do you handle situations where you see technical problems but aren't in a position to fix them?"
11. "Tell me about your experience mentoring or leading technical teams"

**About Specific Challenges:**
12. "How would you approach the RAG scalability issues you mentioned?"
13. "What's your framework for deciding when to build vs. buy AI solutions?"
14. "How do you think about MCP server architecture for different use cases?"

### Questions You Should Ask Heather

#### 🌟 TOP 3 PRIORITY QUESTIONS 🌟

**1. "How do you see the balance between centralized AI infrastructure vs. team autonomy?"**
   - *Why this matters: Opens discussion about the architectural challenge you've observed. Shows you think strategically about the problem space.*

**2. "What's the plan for consolidating or coordinating the various AI POCs happening across teams?"**
   - *Why this matters: Demonstrates you understand the duplication problem. Invites her to share challenges and potentially opens door to collaboration.*

**3. "What are the biggest architectural challenges you're facing with AI initiatives right now?"**
   - *Why this matters: Shows genuine interest in learning from her expertise. Opens conversation about where help might be needed.*

---

#### Other Strong Questions to Consider

**About the Team & Opportunities:**
4. "What's the team structure? How does the architecture team collaborate with the various POC teams?"
5. "Are there opportunities for people to contribute to AI architecture work, even if they're not formally on the team?"
6. "What skills or perspectives do you think would be most valuable to add to the team?"

**About Strategy & Technical Direction:**
7. "What's your vision for AI infrastructure at athenahealth over the next 2-3 years?"
8. "Where do you see the biggest gaps in our current AI capabilities?"
9. "How are you thinking about MCP server strategy - developer tools vs. customer-facing?"
10. "Can you tell me more about the LLM gateway project and its roadmap?"

**About Collaboration & Learning:**
11. "How does the team handle the tension between innovation speed and healthcare compliance?"
12. "What opportunities are there for learning and contributing to AI architecture discussions?"
13. "How do you approach technical decision-making - is it collaborative or more centralized?"

**About Specific Challenges:**
14. "I've been thinking about the RAG scalability challenges - what approaches are you exploring?"
15. "How are you thinking about security models for different AI use cases?"

### Materials to Prepare

**Technical Deep Dives:**
- **RAG at Scale**: Research best practices for production RAG systems (vector databases, chunking strategies, retrieval optimization)
- **MCP Security Models**: Review MCP specification, think through authentication/authorization patterns for different use cases
- **LLM Gateway Architecture**: Research API gateway patterns, cost tracking, model routing, rate limiting
- **Healthcare AI Compliance**: HIPAA considerations, data privacy, audit trails

**Concrete Examples to Have Ready:**
1. **Automation wins**: Specific examples of configuration/validation/testing automation you've done or seen
2. **Scalability solutions**: How you've solved or would solve the chatBot/chartAssistant speed issues
3. **Security frameworks**: Your thinking on different security models for different AI use cases
4. **Service design**: Your vision for the LLM gateway as a self-service platform

**Your Value Proposition:**
Frame your interest positively:
- "I've been observing these challenges and thinking about potential approaches..."
- "I'm really interested in contributing to AI architecture work..."
- "I'd love to learn more about how you're approaching these problems..."

### Conversation Strategy

This is an exploratory conversation with a senior architect, not a formal interview. Your goals:
1. **Learn** about the team's work and challenges
2. **Share** your observations and ideas naturally
3. **Explore** if there are opportunities to contribute
4. **Build relationship** with someone doing work you're interested in

**DO:**
- Listen actively and ask thoughtful questions
- Share observations about challenges you've noticed (POC duplication, scalability issues)
- Show genuine curiosity about her architectural thinking
- Express interest in learning and potentially contributing
- Be collegial - you're a peer having a technical conversation

**DON'T:**
- Treat it like a job interview (don't ask about "the role")
- Criticize current approaches directly (frame as "interesting challenges")
- Show frustration about your current position
- Overwhelm with too many ideas at once
- Bash anyone (including Elon Musk - stay professional)
- Assume there's a position available

**The Right Tone:**
"I've been following the AI initiatives from the sidelines and thinking about some of these architectural challenges. I'd love to hear your perspective on [specific challenge] and learn more about how the team is approaching it. I'm really interested in this problem space and would love to find ways to contribute."

## Next Steps

- Review your AI Security paper for relevant frameworks to discuss
- Research 2-3 case studies of successful enterprise AI implementations
- Prepare 3 specific examples of your technical observations/contributions
- Think about how to naturally express interest in contributing without assuming there's a position
- Prepare thoughtful questions that show you've been paying attention to the organization's AI journey
- Frame this as a learning conversation and relationship-building opportunity

---
**[END AI-GENERATED CONTENT]**
