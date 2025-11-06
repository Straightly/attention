# Security of AI Agents: But Agents have been here for a long time, they are called programmers.

**Author:** [Your Name]  
**Date:** October 16, 2025  
**Status:** Draft

---

## Abstract

The emergence of AI agents capable of autonomous decision-making and action execution introduces fundamental security challenges that existing authentication and authorization frameworks were not designed to address. This paper analyzes the security implications of AI agents interacting with privileged systems, particularly focusing on how agents should assist with confidential information and privileged actions. We argue that AI agents must NOT be deployed as services with credentials—neither independent credentials nor delegated credentials. Instead, agents should generate code artifacts for human review and execution, maintaining a strict separation between agent intelligence and privileged access.

We presented simple framework to evalute AI agent security considering them as programmers. We reached two straightforward, actionable conclusions: (1) API providers need not change their security posture—secure APIs remain secure in the AI age; (2) Agent users must never grant agents direct access to credentials or deploy agents as services with authentication tokens. Instead, agents should generate code for human review and execution. This paper demonstrates how AI agents paradoxically enable stronger security controls than were practical with human developers alone—precisely because agents never hold credentials.

**Keywords:** AI agents, security, zero-trust, code generation, human-in-the-loop, credential-free agents, no agent authentication

---

## 1. Executive Summary: Two Perspectives on Agent Security

### 1.1 For API Providers: Nothing New Under the Sun

**Core Principle:** If your API is secure before AI agents, it will remain secure in the AI age. If it has security holes, you should plug them regardless of AI agents.

A common misconception is that AI agents introduce new attack vectors because they have access to "powerful tools such as programming languages." This reasoning is fundamentally flawed—it assumes the adversary is incompetent before AI agents. Sound security design must assume the counterparty is powerful, competent, and has access to all available tools, including AI agents.

**Key Insight:** AI agents do not make attackers more powerful; they make exploitation faster and easier to attempt. This increases urgency but does not change fundamental security requirements. The principle remains: design security assuming a capable, well-equipped adversary.

### 1.2 For Agent Users: Zero Direct Privilege Access

**The Paradox:** If we assume an agent will fully utilize any access granted—potentially for unintended purposes, like a rogue developer—we must conclude that agents should receive no direct privileges. Yet this seems to make agents useless.

**The Solution:** AI agents enable a new security paradigm where agents generate code for human review and execution, rather than executing with direct access.

**Example: Database Query**
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

**Example: API Access**

Rather than granting API credentials to the agent, require the agent to:
1. provide all the parameters to the make the API call
2. Generate the API calls with all parameters visible
3. Present calls for human review and execution
4. Receive results without retaining access credentials

### 1.3 The HIPAA Parallel: Regulatory Precedent for Agent Security

This approach aligns with HIPAA requirements, which mandate that agents receive only the minimum access necessary to perform their tasks. 

This approach also mirrors EPCS (Electronic Prescriptions for Controlled Substances) signature requirements:

1. **Explicit Scoping:** Any access to sensitive data must be scoped explicitly beforehand
2. **One-Time Access:** Authorization is granted for a single operation only
3. **No Revocation Needed:** No persistent authorization exists to revoke
4. **Audit Logging:** All access grants are logged for accountability
5. **Minimum Necessary:** Agent receives exactly what's needed, nothing more

Historically, these controls were impractical with human developers due to workflow overhead. AI agents make this security model not only feasible but natural—agents excel at generating precise, reviewable code artifacts.

### 1.4 The Automation Question: When Agents Need Persistent Access

**Challenge:** What about automation? If agents must perform regular tasks automatically, doesn't this require persistent privileged access?

**Answer:** The agent should write a program. The workflow becomes:

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

**The AI Advantage:** While HIPAA legally mandates minimum necessary access for human agents, practical limitations made full compliance difficult. AI agents make strict compliance not only possible but efficient. An AI agent can generate precise, auditable code artifacts for every privileged operation, enabling security controls that were previously impractical.

---

## 2. Background and Related Work

This paper addresses the following questions:
- Why should AI agents never authenticate themselves to services?
- How can agents be useful without receiving credentials or authorization?
- What security model ensures agents assist without executing privileged operations?
- Why are both two-legged and three-legged token systems inappropriate for agents?

### 2.1 Traditional Authentication and Authorization

**[TODO: Add literature review on OAuth 2.0, OpenID Connect, and traditional auth systems]**

### 2.2 Service-to-Service Authentication

**[TODO: Review existing service account and machine-to-machine authentication patterns]**

### 2.3 AI Agent Architectures

**[TODO: Review current AI agent frameworks and their security considerations]**

---

## 3. The Yin and Yang of Security

### 3.1 The Yang: Use of Privileges

The use of privileges represents the "Yang" of a security system—the active, outward-facing aspect. In dealing with Yang in any system, we must assume that privileges will be used to their fullest extent. For example, we must assume that any agent, when required and able, will declare whatever origin domain it possesses to access a privileged service (such as through CORS mechanisms).

**Key Principle:** In a secured system, the verification of authority is the mechanism to stop unauthorized use of Yang. This is the process people are familiar with and understand well—the enforcement layer.

### 3.2 The Yin: Granting of Authorities

The granting of authorities represents the "Yin" of security—where Yang is kept in check. This is the foundational layer that determines what privileges exist and to whom they are granted.

**Key Principle:** The granting phase must be carefully controlled, as it sets the boundaries for all subsequent actions.

### 3.3 Application to AI Agents

For AI agents, the Yin and Yang framework reveals the critical insight:
- **Yang (Enforcement):** Agents should never attempt privileged actions, so there is nothing to enforce at the agent level. Enforcement happens when humans execute agent-generated code.
- **Yin (Granting):** Agents should never be granted authority. The granting of authority remains exclusively with humans who review and execute agent-generated code.

**Key Insight:** The security problem disappears when agents never receive credentials. There is no Yang to enforce and no Yin to grant at the agent level.

---

## 4. The Fundamental Principle: Agents Are NOT Services

### 4.1 Agents Must Never Be Deployed as Services

**Core Thesis:** An AI agent must NEVER be deployed as a service with credentials. This is the critical mistake to avoid. Agents should not have security "like a service" because services hold credentials and execute operations. Agents should only generate code for human review and execution.

### 4.1.1 Historical Perspective: Developers as Agents

**Key Insight:** Agents have been here for a long time—they are called developers.

This observation provides crucial perspective on agent security. Human developers have always operated as "agents" on behalf of organizations and users. However, the critical distinction is:

**What Developers Do NOT Get:**
- Direct access to production credentials
- Passwords to privileged systems
- Private keys or certificates
- Unrestricted access to sensitive data

**What Developers DO:**
- Write code that is reviewed before deployment
- Generate scripts and programs for others to execute
- Propose changes that require approval
- Work in development environments, not production

The security frameworks we've developed for developers—code review, separation of development and production, principle of least privilege—provide the exact model for AI agent security. AI agents should be treated like junior developers who write code but never receive production credentials.

**Implication:** AI agents should follow the strictest developer security model: generate code, never hold credentials, always require human review and execution for privileged operations.

### 4.2 The Problem with Giving Agents Any Tokens

A common but dangerous approach is to give AI agents authentication tokens—either two-legged (service credentials) or three-legged (delegated user credentials). Both approaches are fundamentally flawed.

**Two-Legged Tokens (Service Credentials):**
```
WRONG Approach:
Agent Service → [Client Credentials] → Privileged API
(Agent has blanket access, cannot trace to individual users)
```
Problem: Agent operates with service-level authority, no user accountability.

**Three-Legged Tokens (Delegated User Credentials):**
```
WRONG Approach:
User → [Delegates Token] → Agent → [Uses Token] → Privileged API
(Agent holds user's delegated credentials)
```
Problem: Agent possesses credentials that can be misused, exfiltrated, or exploited.

**The Correct Approach: No Tokens**
```
CORRECT Approach:
User → Agent → [Generates Code] → User Reviews → User Executes → Result → Agent
(Agent never holds any credentials)
```

### 4.3 Why Agents Must Never Have Credentials

**Question:** Does it make sense to give an agent credentials—either its own or delegated from a user?

**Answer:** No. Agents should never possess credentials of any kind. The agent's role is to generate code that humans review and execute. The human holds the credentials and performs the privileged operations.

**Thought Experiment:** Should an agent be given credentials to your bank account? Absolutely not. Should an agent be given delegated authority to make a specific purchase? Still no. Instead:
1. Agent generates the API call to make the purchase
2. Human reviews the generated code
3. Human executes the API call with their own credentials
4. Result is returned to agent for further processing

This maintains security while allowing the agent to be useful.

---

## 5. Proposed Framework: Code Generation Without Credentials

### 5.1 The No-Credential Requirement

Agents must never receive credentials. Instead, the security model is based on code generation and human execution:

1. **The Human User:** The authenticated person who holds all credentials
2. **The Agent:** Generates code artifacts but never receives credentials
3. **The Target Resource:** Accessed only by the authenticated human, never by the agent

### 5.2 Code Generation Principles

**Principle 1: Agents Generate, Humans Execute**
Agents produce code, scripts, API calls, or SQL statements. Humans review and execute these artifacts using their own credentials.

**Principle 2: No Persistent Agent Access**
Agents never receive credentials, tokens, or persistent access to any privileged system. Each operation requires fresh human review and execution.

**Principle 3: Explicit Scope Visibility**
All operations must be explicitly visible in generated code. No hidden operations, no credential storage, no autonomous execution.

**Principle 4: Audit Trail Through Code**
The generated code artifacts serve as the audit trail. What was reviewed is what was executed.

### 5.3 Implementation Architecture

**Correct Architecture:**
```
1. User authenticates to system (holds credentials)
2. User invokes agent for assistance
3. Agent analyzes requirements
4. Agent generates code artifact (SQL, API call, script)
5. Agent presents code to user for review
6. User reviews generated code
7. User executes code with their own credentials
8. System returns results to user
9. User shares results with agent (if needed for further processing)
10. Agent continues with next step (generating more code if needed)
```

**Key Point:** At no step does the agent ever possess credentials or execute privileged operations.

---

## 6. Why Standard Auth Protocols Don't Apply to Agents

### 6.1 OAuth/Auth0 Are for Credential Holders

Standard authentication protocols like OAuth 2.0, OpenID Connect, and Auth0 are designed for entities that will hold and use credentials:
- Authorization Code Flow: For users who will hold tokens
- Client Credentials Flow: For services that will hold service credentials
- Token Exchange: For delegating credentials from one holder to another

All of these assume the recipient will possess and use credentials. **This assumption is wrong for AI agents.**

### 6.2 Agents Don't Need Auth Protocols

Agents don't authenticate because they don't execute privileged operations. Therefore:
- No Authorization Code Flow needed (agent doesn't hold user tokens)
- No Client Credentials Flow needed (agent doesn't hold service credentials)
- No Token Exchange needed (agent never receives tokens to exchange)
- No Refresh Token handling needed (agent has no tokens to refresh)

### 6.3 The Human Remains Authenticated

**Correct Flow:**
```
1. User authenticates via OAuth/Auth0 (user holds token)
2. User invokes agent through authenticated session
3. Agent generates code artifact
4. User reviews code in their authenticated session
5. User executes code using their existing authentication
6. Results returned to user
7. User optionally shares results with agent
```

**Key Point:** Only the human authenticates. The agent is just a code generation tool within the user's authenticated session.

---

## 7. Agent Operations Analysis

### 7.1 Invoking an Agent

**Security Requirements When User Invokes Agent:**
1. User must be authenticated (user holds credentials, not agent)
2. Agent operates within user's authenticated session
3. Agent has no credentials, no authority, no persistent access
4. All agent outputs are code artifacts for human review

**No "Spawning" with Credentials:** The agent is not "spawned" with any authority. It's simply invoked as a tool within the user's session.

### 7.2 Accessing Confidential Information

**Correct Approach:** Agent never retrieves confidential information directly.

**Workflow:**
1. Agent determines what information is needed
2. Agent generates query/API call to retrieve information
3. Agent presents generated code to user
4. User reviews and executes query with their credentials
5. User receives confidential information
6. User decides what subset (if any) to share with agent
7. Agent processes only what user explicitly provides

**Key Point:** The agent never has direct access to confidential information. The human is the gatekeeper.

### 7.3 Privileged Actions

**Correct Approach:** Agent never invokes privileged actions directly.

**Workflow:**
1. Agent determines what action is needed
2. Agent generates code to perform the action (API call, SQL statement, script)
3. Agent presents generated code to user with clear explanation
4. User reviews the code and its implications
5. User executes the code with their own credentials (or rejects it)
6. Action is attributed to the authenticated human, not the agent
7. Audit logs show human execution, not agent execution

**Example: Financial Transaction**
```
Agent: "To complete this purchase, execute this API call:
POST /api/transactions
{
  'amount': 99.99,
  'recipient': 'Amazon',
  'item': 'Book: AI Security'
}
Review carefully before executing."

User: [Reviews, decides to execute]
User: [Executes with their credentials]
System: [Logs transaction by User, not by Agent]
```

---

## 8. Security Boundaries and Constraints

### 8.1 Defining Agent Boundaries

**Question:** Where and what is the boundary for agent authority?

**Answer:** The boundary is absolute and simple: **agents have zero authority.**

**The Real Boundaries:**
- **Credential Boundary:** Agent never possesses credentials (absolute boundary)
- **Execution Boundary:** Agent never executes privileged operations (absolute boundary)
- **Access Boundary:** Agent never directly accesses protected resources (absolute boundary)
- **Code Generation Boundary:** Agent can only generate code for human review (permissive boundary)

### 8.2 Why Service Accounts for Agents Are Wrong

**Common Mistake:** Creating a service account for an agent with "limited" privileges.

**Why This Fails:**
- Any credentials given to an agent can be exfiltrated
- "Limited" privileges can often be escalated
- Agent compromise means credential compromise
- Audit trails become ambiguous (was it the agent or an attacker?)

**Correct Approach:** No service account for agents. Agents generate code; humans execute with their own accounts.

### 8.3 Preventing Privilege Escalation

**Traditional Concerns (Don't Apply):**
- ~~Agent attempting to access resources beyond delegation~~ → Agent has no delegation
- ~~Agent persisting credentials beyond intended lifetime~~ → Agent has no credentials to persist
- ~~Agent sharing credentials with other agents~~ → Agent has no credentials to share
- ~~Agent modifying its own authority scope~~ → Agent has no authority to modify

**Actual Security Concerns:**
- Agent generating malicious code that human doesn't catch in review
- Agent social engineering human into executing dangerous operations
- Agent exfiltrating information shared by human after execution

**Mitigations:**
- Clear code presentation and explanation
- User education on reviewing generated code
- Limiting what information is shared back to agent after execution

---

## 9. Case Studies

### 9.1 Case Study 1: AI Agent for Email Management

**[TODO: Analyze security requirements for an agent that:]**
- Reads user emails
- Categorizes and summarizes
- Drafts responses
- Sends emails on user's behalf

### 9.2 Case Study 2: AI Agent for Financial Transactions

**[TODO: Analyze security requirements for an agent that:]**
- Accesses bank account information
- Makes purchase decisions
- Executes transactions
- Manages budgets

### 9.3 Case Study 3: AI Agent for Healthcare Data

**[TODO: Analyze security requirements for an agent that:]**
- Accesses patient medical records
- Schedules appointments
- Communicates with healthcare providers
- Complies with HIPAA requirements

---

## 10. Implementation Challenges

### 10.1 Technical Challenges

**[TODO: Discuss:]**
- Token management complexity
- Performance implications of chain verification
- Scalability of audit systems
- Integration with existing auth infrastructure

### 10.2 Usability Challenges

**[TODO: Discuss:]**
- User experience for granting agent authority
- Transparency of agent actions
- User control and revocation mechanisms
- Balance between security and convenience

### 10.3 Organizational Challenges

**[TODO: Discuss:]**
- Policy development for agent usage
- Compliance with regulations
- Training and awareness
- Incident response procedures

---

## 11. Future Directions

### 11.1 Evolving Standards

**[TODO: Discuss emerging standards for agent authentication]**

### 11.2 AI-Specific Security Protocols

**[TODO: Propose areas for future research:]**
- Intent verification mechanisms
- Behavioral analysis for anomaly detection
- Multi-agent coordination security
- Federated agent identity systems

### 11.3 Regulatory Considerations

**[TODO: Discuss potential regulatory frameworks]**

---

## 12. Conclusion

AI agents represent a fundamental shift in how software systems operate, but the security approach is surprisingly simple: **agents must never receive credentials.** The key insights from this analysis are:

1. **Agents are NOT services:** They must never be deployed as services with credentials. Agents are code generation tools, not execution engines.

2. **No tokens for agents:** Neither two-legged (service) nor three-legged (delegated user) tokens should ever be given to agents. Both approaches are fundamentally insecure.

3. **Humans remain in control:** Every privileged operation must be reviewed and executed by an authenticated human. Agents generate code; humans execute it.

4. **Yin and Yang don't apply to agents:** There is no authority to grant (Yin) and no agent actions to enforce (Yang). The security model is simply: agents have zero credentials.

5. **Code generation is sufficient:** Agents can be highly useful by generating SQL, API calls, scripts, and programs—without ever executing them.

The framework proposed in this paper—based on zero agent credentials, mandatory human review, and code generation without execution—provides a foundation for secure AI agent deployment. This approach is simpler than traditional authentication frameworks precisely because it avoids the complexity of credential management for agents.

**The Paradox:** AI agents enable stronger security than human developers because agents can generate perfect, reviewable code artifacts without needing production credentials. The developer who writes code doesn't need the production password—and neither does the AI agent.

As AI agents become more prevalent and powerful, the security community must resist the temptation to give them credentials. The secure path is clear: agents generate, humans execute.

---

## References

**[TODO: Add formal references]**

1. OAuth 2.0 Framework - RFC 6749
2. OpenID Connect Core 1.0
3. Auth0 Documentation
4. [Your existing materials on agent security]
5. [Academic papers on AI security]
6. [Industry standards and best practices]

---

## Appendices

### Appendix A: Glossary

**Two-Legged Token:** Authentication mechanism where a service authenticates directly with its own credentials, without user context.

**Three-Legged Token:** Authentication mechanism that involves user, client application, and resource server, maintaining user context throughout.

**Chain of Trust:** A sequence of authentication and authorization steps that can be traced back to an originating authenticated entity.

**Delegated Authority:** Authority granted by a user to an agent to perform specific actions on their behalf.

### Appendix B: Your Original Notes

*[Preserving your original thinking for reference]*

**From "Id for an agent and the Ying and Yang of Security":**
> Security of a AI agent is very important. That goes without saying. But how should one secure an AI agent? We analyze the Ying and Yang of a security authority...

**From "InfoSec":**
> We have two legged tokens and we have three legs tokens. When agent is supposed to behave under a persons supervision, what credential does it need and what authorization does it have?

**From "Note on Service Accounts":**
> Service Account for an Agent? The answer is: Don't do it. If the Agent is going to have a mind and may choose to do something of its own mind, then the service account should and must be limited...

---

## Document Status and Next Steps

### Completed Sections
- ✅ Abstract (corrected: agents must NEVER receive credentials)
- ✅ Section 1: Executive Summary (Two Perspectives on Agent Security)
  - API provider perspective
  - Agent user perspective with practical examples
  - HIPAA parallel and regulatory precedent
  - Automation question addressed
- ✅ Section 2: Background and Related Work (streamlined, removed repetitive intro)
- ✅ Section 3: Yin and Yang framework (adapted for zero-credential model)
- ✅ Section 4: Fundamental principles - Agents Are NOT Services
- ✅ Section 5: Code Generation Without Credentials framework
- ✅ Section 6: Why Standard Auth Protocols Don't Apply
- ✅ Section 7: Agent Operations Analysis
- ✅ Section 8: Security Boundaries (agents have zero authority)

### Sections Needing Development
- ⏳ Literature review (Section 2 subsections)
- ⏳ Case studies (Section 9)
- ⏳ Implementation challenges (Section 10)
- ⏳ Future directions (Section 11)

### Research Needed
1. Existing AI agent security frameworks (for comparison/critique)
2. Industry case studies showing credential-based failures
3. Regulatory landscape analysis (expand HIPAA discussion)
4. Usability studies on human-in-the-loop workflows

### Writing Tasks
1. Develop case studies showing code generation approach (Section 9)
2. Discuss implementation challenges and usability (Section 10)
3. Create architecture diagrams for code generation workflow
4. Add more concrete code examples throughout
5. Expand on social engineering risks and mitigations

---

**Last Updated:** November 5, 2025  
**Word Count:** ~5,200 (target: 8,000-10,000 for full paper)
