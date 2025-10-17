# Security of AI Agents: Authentication and Authorization in the Age of Autonomous Systems

**Author:** [Your Name]  
**Date:** October 16, 2025  
**Status:** Draft

---

## Abstract

The emergence of AI agents capable of autonomous decision-making and action execution introduces fundamental security challenges that existing authentication and authorization frameworks were not designed to address. This paper analyzes the security implications of spawning AI agents, particularly focusing on how agents retrieve confidential information and invoke privileged actions. We examine the critical gap in current two-legged token systems and propose a framework for agent security based on chain-of-trust principles, using Auth0 protocols as a reference implementation. We argue that AI agents must be treated as services that operate under delegated human authority, not as independent entities with their own credentials.

**Keywords:** AI agents, authentication, authorization, security, OAuth, Auth0, chain of trust, delegated authority

---

## 1. Introduction

### 1.1 The Rise of AI Agents

AI agents are rapidly evolving from simple chatbots to autonomous systems capable of executing complex tasks, accessing sensitive data, and making decisions that affect real-world outcomes. Unlike traditional software services, AI agents possess a degree of autonomy—they can "choose" actions based on their training and context, raising unprecedented security questions.

### 1.2 The Security Challenge

When an AI agent is spawned to perform tasks on behalf of a user, it must:
1. **Authenticate** its identity to services it accesses
2. **Authorize** actions it attempts to perform
3. **Maintain accountability** by tracing actions back to responsible humans
4. **Respect boundaries** of delegated authority

Current security frameworks, designed for human users and traditional services, are inadequate for this new paradigm.

### 1.3 Research Questions

This paper addresses the following questions:
- How should AI agents authenticate themselves to services?
- What authorization model ensures agents operate within appropriate boundaries?
- How can we maintain a chain of trust from human users to agent actions?
- What are the security implications of two-legged vs. three-legged token systems for agents?

---

## 2. Background and Related Work

Client-side validation is useless for security since anyone with the token can bypass it entirely—they could just use the GitHub API directly or modify the browser code.

Who are you protecting against?

Random internet users? → Don't share your app URL publicly
Malware on your computer? → If malware is running, your GitHub session is already compromised
Someone using your computer? → They can access your GitHub directly anyway
Yourself (accidental damage)? → Git history saves you

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

For AI agents, both aspects must be carefully considered:
- **Yang (Enforcement):** How do we verify an agent's authority when it attempts actions?
- **Yin (Granting):** How do we initially grant authority to an agent, and under what constraints?

---

## 4. The Fundamental Principle: Agents as Services

### 4.1 An Agent is a Service

**Core Thesis:** An AI agent should have security exactly like a service. However, unlike traditional services, agents must operate under a chain of trust that originates from an authenticated human being.

### 4.2 The Problem with Two-Legged Tokens

Current service-to-service authentication often relies on two-legged tokens (client credentials flow), where a service authenticates directly with its own credentials. This creates a critical security gap when applied to AI agents.

**The Gap:** Two-legged tokens grant authority to the service itself, not to any specific user. When an AI agent uses two-legged tokens, it operates with blanket authority that cannot be traced back to individual users or their specific permissions.

**Example Scenario:**
```
Traditional Service (Two-Legged):
Service A → [Client Credentials] → Service B
(Service A has full access to Service B's resources)

AI Agent (Problematic Two-Legged):
Agent → [Client Credentials] → User's Bank Account
(Agent has full access, regardless of which user spawned it)
```

### 4.3 Why Agents Cannot Have Independent Identity

**Question:** Does it make sense to treat an agent like a human and give an agent authorities like we give to a person?

**Answer:** No. What we must insist upon is that an agent can perform tasks on somebody's (or many people's) behalf. The authority with which the agent performs actions must come from somebody. Therefore, authorization must eventually be traced back to a person, and there should be no independent identity for an agent.

**Thought Experiment:** Should an agent be given authority to your bank account? No. Should an agent be given authority to make a specific purchase, including transferring $99.99 to Amazon for that purchase? Potentially yes, if properly delegated and scoped.

---

## 5. Proposed Framework: Chain of Trust Authentication

### 5.1 Three-Legged Token Requirement

When an agent is supposed to behave under a person's supervision, it needs credentials and authorization that establish a clear boundary. To properly honor this boundary, a new type of identity must be established—one that is "three-legged" because it must verify:

1. **The Human User:** The authenticated person who initiated the agent
2. **The Agent Service:** The service infrastructure running the agent
3. **The Target Resource:** The resource being accessed

### 5.2 Chain of Trust Principles

**Principle 1: Origin from Authenticated Human**
Every running agent service must be deployed with authorities obtained through a chain of trust originated from an authenticated human being.

**Principle 2: Instance-Level Authorization**
Every running instance of an agent service must obtain authorities through a chain of trust originated from the specific user who spawned it.

**Principle 3: Scope Limitation**
If an agent is going to have autonomy and may choose to do something of its own accord, then the service account must be limited to do ONLY things that the originating person(s) have the authority to do.

### 5.3 Implementation Architecture

**[TODO: Detailed architecture diagram showing:]**
- User authentication flow
- Agent spawning process
- Token delegation mechanism
- Authority verification at each step

---

## 6. Auth0 Protocol Analysis

### 6.1 Auth0 Authentication Flow

**[TODO: Analyze Auth0's authentication mechanisms:]**
- Authorization Code Flow with PKCE
- Client Credentials Flow (and its limitations for agents)
- Token Exchange mechanisms
- Refresh token handling

### 6.2 Adapting Auth0 for Agent Security

**[TODO: Propose modifications to Auth0 patterns:]**
- How to implement chain of trust in Auth0
- Token structure for agent delegation
- Scope management for agent actions
- Audit trail requirements

### 6.3 Example Implementation

**[TODO: Provide code examples showing:]**
```
User Login → Spawn Agent → Agent Requests Resource
[Detailed flow with Auth0 API calls]
```

---

## 7. Agent Operations Analysis

### 7.1 Spawning an Agent

**Security Requirements at Spawn Time:**
1. Capture authenticated user context
2. Define scope of agent authority
3. Establish time-to-live for agent credentials
4. Create audit trail entry

**[TODO: Detailed spawn protocol specification]**

### 7.2 Retrieving Confidential Information

**Challenge:** When an agent retrieves confidential information, how do we ensure:
- The agent has proper authorization from the user
- The information is only accessible for the intended purpose
- The retrieval is logged and auditable
- The information is not retained beyond necessary scope

**[TODO: Protocol for confidential data access]**

### 7.3 Invoking Privileged Actions

**Challenge:** When an agent invokes privileged actions (e.g., financial transactions, data modifications), how do we ensure:
- The action is within the user's granted authority
- The action is within the agent's delegated scope
- The action can be attributed to the responsible human
- The action can be audited and potentially reversed

**[TODO: Protocol for privileged action execution]**

---

## 8. Security Boundaries and Constraints

### 8.1 Defining Agent Boundaries

**Question:** Where and what is the boundary for agent authority?

**Proposed Framework:**
- **Temporal Boundary:** Time-limited credentials
- **Scope Boundary:** Explicit list of allowed actions
- **Resource Boundary:** Specific resources agent can access
- **Contextual Boundary:** Conditions under which agent can act

### 8.2 Service Account Limitations

**Critical Rule:** If an agent is going to have autonomy, the service account must be limited to do EVERYTHING (and ONLY everything) that the authorizing person/people have the authority to do.

**Logical Conclusion:** The agent gains authorities only to access resources that the originating user(s) can access, and only for the purposes delegated.

### 8.3 Preventing Privilege Escalation

**[TODO: Analyze attack vectors:]**
- Agent attempting to access resources beyond delegation
- Agent persisting credentials beyond intended lifetime
- Agent sharing credentials with other agents
- Agent modifying its own authority scope

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

AI agents represent a fundamental shift in how software systems operate, requiring a corresponding shift in how we approach authentication and authorization. The key insights from this analysis are:

1. **Agents are services, not users:** They must be treated as services but with special constraints that trace authority back to humans.

2. **Two-legged tokens are insufficient:** The traditional service-to-service authentication model creates unacceptable security gaps when applied to autonomous agents.

3. **Chain of trust is essential:** Every agent action must be traceable through a chain of trust back to an authenticated human user.

4. **Yin and Yang must balance:** Both the granting of authority (Yin) and the enforcement of boundaries (Yang) must be carefully designed for agent systems.

5. **Scope limitation is critical:** Agents must operate only within the explicitly delegated authority of their originating users.

The framework proposed in this paper—based on three-legged authentication, chain of trust, and strict scope limitation—provides a foundation for secure AI agent deployment. However, significant work remains to develop detailed protocols, implement reference systems, and establish industry standards.

As AI agents become more prevalent and powerful, the security community must move quickly to establish robust frameworks that enable innovation while protecting users and systems from the unique risks posed by autonomous software entities.

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
- ✅ Abstract
- ✅ Introduction
- ✅ Yin and Yang framework
- ✅ Fundamental principles
- ✅ Chain of trust concept
- ✅ Security boundaries

### Sections Needing Development
- ⏳ Literature review (Section 2)
- ⏳ Auth0 detailed analysis (Section 6)
- ⏳ Agent operations protocols (Section 7)
- ⏳ Case studies (Section 9)
- ⏳ Implementation challenges (Section 10)
- ⏳ Future directions (Section 11)

### Research Needed
1. Detailed Auth0 protocol documentation
2. Existing AI agent security frameworks
3. Industry case studies
4. Regulatory landscape analysis
5. Performance benchmarking data

### Writing Tasks
1. Expand technical specifications in Section 6
2. Develop detailed protocols in Section 7
3. Create architecture diagrams
4. Write case studies with real-world scenarios
5. Add code examples and implementation guides

---

**Last Updated:** October 16, 2025  
**Word Count:** ~2,500 (target: 8,000-10,000 for full paper)
