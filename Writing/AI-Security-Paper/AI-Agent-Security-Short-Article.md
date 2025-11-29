# AI Agent Security: Treat Them Like Programmers, Not Services

**Author:** [Your Name]  
**Date:** November 5, 2025

---

AI agents have been here for a long time—they're called programmers. This simple insight provides the framework for secure AI agent deployment. Just as programmers don't need production credentials to write code, AI agents don't need credentials to generate code for human review and execution.

**Two Key Conclusions:**
1. **For API Providers:** Secure APIs remain secure in the AI age. Design for capable adversaries.
2. **For Agent Users:** Never grant agents credentials. Agents generate code; humans execute it.

---

## For API Providers: Nothing Changes

**Core Principle:** If your API is secure before AI agents, it will remain secure in the AI age. If it has security holes, you should plug them regardless of AI agents.

A common misconception is that AI agents introduce new attack vectors because they have access to "powerful tools such as programming languages." This reasoning is fundamentally flawed—it assumes the adversary is incompetent before AI agents. Sound security design must assume the counterparty is powerful, competent, and has access to all available tools, including AI agents.

**Key Insight:** AI agents do not make attackers more powerful; they make exploitation faster and easier to try. This increases urgency but does not change fundamental security requirements. The principle remains: design security assuming a capable, well-equipped adversary.

## For Agent Users: Never Grant Credentials

**The Paradox:** If we assume an agent will fully utilize any access granted—potentially for unintended purposes, like a rogue developer—we must conclude that agents should receive no direct privileges. Yet this seems to make agents useless.

**The Solution:** AI agents enable a new security paradigm where agents generate code for human review and execution, rather than executing with direct access.

### Example: Database Query
```
Traditional Approach (Insecure):
Agent → [Database Credentials] → Direct Query Execution

AI-Enabled Secure Approach:
Agent → Generate SQL Statement → Human Review → Human Execution → Return Results to Agent
```

If the agent needs to learn table structure first:
1. Agent generates query to retrieve schema information
2. Human reviews and executes schema query
3. Agent receives schema, generates data query
4. Human reviews and executes data query
5. Results returned to agent

For complex multi-step operations, the agent can generate a stored procedure that stitches queries together, which the human reviews and deploys.

### Example: API Access

Rather than granting API credentials to the agent, require the agent to:
1. provide all the parameters to the make the API call
2. Generate the API calls with all parameters visible
3. Present calls for human review and execution
4. Receive results without retaining access credentials

## The HIPAA Parallel: Regulatory Precedent

This approach aligns with HIPAA requirements, which mandate that agents receive only the minimum access necessary to perform their tasks. 

This approach also mirrors EPCS (Electronic Prescriptions for Controlled Substances) signature requirements:

1. **Explicit Scoping:** Any access to sensitive data must be scoped explicitly beforehand
2. **One-Time Access:** Authorization is granted for a single operation only
3. **No Revocation Needed:** No persistent authorization exists to revoke
4. **Audit Logging:** All access grants are logged for accountability
5. **Minimum Necessary:** Agent receives exactly what's needed, nothing more

Historically, these controls were impractical with human developers due to workflow overhead. AI agents make this security model not only feasible but natural—agents excel at generating precise, reviewable code artifacts.

## The Automation Question

**Challenge:** What about automation? If agents must perform regular tasks automatically, doesn't this require persistent privileged access?

**Answer:** The agent should write a program:

1. Agent generates application code for the automated task
2. Human thoroughly vets the code
3. After vetting, the application is deployed with necessary privileges
4. The agent itself never receives persistent access

This mirrors hiring a programmer when you cannot program yourself:
- You hire them to write applications
- You deploy those applications with privileged access
- For everyone's protection, you do not give the programmer access to production secrets, certificates, or credentials
- They do not need these to write the code
- Having such access puts both parties at risk
- The only privilege the programmer has is to generate code and put the code into a pipeline for vetting and deployment

Here we might have observed the only subtle difference between human agents and AI agents: The AI agent do not even need the privilege of putting the code into a pipeline for vetting and deployment.  The AI agent can generate the code and present it for human review and deployment, and that human agent, or programmer, will be the responsible party for that code.

**The AI Advantage:** While HIPAA legally mandates minimum necessary access for human agents, practical limitations made full compliance difficult. AI agents make strict compliance not only possible but efficient. An AI agent can generate precise, auditable code artifacts for every privileged operation, enabling security controls that were previously impractical.

---

## The Bottom Line

AI agent security is surprisingly simple when viewed through the programmer lens:

**Key Principles:**
- **Agents are programmers:** They generate code, not execute privileged operations
- **No credentials for agents:** Just as programmers don't need production credentials to write code, agents don't need credentials to generate code
- **Human-in-the-loop:** All privileged operations require human review and execution
- **Code generation is sufficient:** Agents remain highly useful by generating SQL, API calls, scripts, and programs

**The Paradox:** AI agents enable stronger security than human developers because agents can generate perfect, reviewable code artifacts without needing production credentials. The developer who writes code doesn't need the production password—and neither does the AI agent.



---

**Summary:**
- **API Providers:** Your secure APIs remain secure. Design for capable adversaries.
- **Agent Users:** Never grant agents credentials. Use agents to generate code for your review and execution.

This framework provides a clear, actionable path forward for secure AI agent deployment.

---

_Last Updated: November 5, 2025 • ~1,000 words_
