# MCP with PHI Access is HIPAA Violation. What to Do?

## The Problem: MCP's Design Conflicts with HIPAA

The Model Context Protocol (MCP) is supposed to be the standard to provide access for AI agents to data sources and tools.  Anthropic even claimed that it was designed for safety.  However, by its very design, MCP is a HIPAA violation when given access to Protected Health Information (PHI). 

## 1. MCP is Inherently HIPAA-Incompatible with PHI Access

**The fundamental problem:** If any discoverable API has access to PHI or PII data, allowing an agent to have access to it is already a HIPAA violation. There is no guarantee that an agent will not use the access except when it is absolutely necessary.

### Why MCP + PHI Creates Immediate HIPAA Violations

**1. The "Minimum Necessary" Principle Violation**

HIPAA's Privacy Rule (45 CFR § 164.502) requires that PHI access be limited to the "minimum necessary" to accomplish a specific purpose. An MCP-enabled agent that can discover and access PHI-containing APIs violates this principle **by design**—there's no guarantee it will only access data when "absolutely necessary."

From the HIPAA Journal: *"Under the HIPAA Security Rule, only those employees who have a need to access and use PHI as part of their roles should be given access to it."* An agent with broad discoverability is effectively a user with unscoped permissions, which is in itself a violation.

**2. Improper Access Controls (Technical Safeguard Failure)**

HIPAA's Security Rule (45 CFR § 164.312) requires technical safeguards that precisely control access. MCP's standardized discovery doesn't enforce:
- Role-based access scoped to specific patient records
- Contextual necessity checks before each PHI access
- Identity verification of the agent's user for each request

This creates the risk: an agent could access PHI "just in case" it might be needed, or worse, access it inadvertently through a misinterpreted user query.


With the agent being intelligent, one simply cannot demonstrate compliance during an OCR audit.

### The Discoverability Problem Is Real

When an MCP server advertises its capabilities (tools/resources), it effectively broadcasts the existence of PHI-containing APIs to any agent connected to that server. This creates two violations:

1. **Unauthorized Disclosure of PHI's Location**: Even if the agent never calls the API, the discovery metadata (e.g., "tool name: get_patient_medical_history") reveals that PHI exists in that system, which can be a Privacy Rule violation.

2. **Overbroad Authorization**: HIPAA requires access grants to be specific. An agent with a blanket credential to an "MCP server" that hosts 20 tools (5 of which touch PHI) is not minimum necessary—it's akin to giving a staff member access to the entire EHR when they only need appointment data.

**The uncomfortable truth:** MCP is not HIPAA-compliant for PHI access because of its very design. No amount of additional controls will make it compliant.

## 2. The Only Compliant Path: Restrict PHI/PII Access

Important thing should be repeated:  There's no middle ground here. To make MCP HIPAA-compliant, you have exactly one option:

**Do NOT allow MCP servers to access PHI or PII APIs.  It is required by HIPPA.**

- HIPAA requires "minimum necessary" access - MCP's broad access patterns violate this
- HIPAA requires access controls tied to specific purposes - MCP's flexible nature makes this impossible to enforce

## What Would Make MCP access to PHI/PII HIPAA-Compliant?

Nothing.  In fact, be alartmed if you heard the word "Guardrails".  Many "security" vendors will claim their "guardrails" make MCP HIPAA-compliant.  Know that MCP is not HIPAA-compliant by design and no amount of guardrails can make it HIPAA-compliant. Period.  So instead of patch your MCP up and trying to convience yourself and the regulators that it has become safe enough for PHI, simply STOP. 

For example, some vendor will suggest that one can make use of an Authorization Gateway where expensive and complex rules and capabilities are used. Again, simply STOP.

## 3. Solutions Already Exist: Use Proven Security Measures

### Introducing Joe Doe #1.

AI Agent should not be allowed to access PHI/PII data.  The good news is that it does not need to either.  To start with, any information that goes MCP and AI Agent must be de-identified.  For two systems that must communicate about the same patient, a common id should be used.  The ID can and only can be de-identified within each system and PII should never across the wire that is MCP.

There are cases where one must match the identity of the subject in two different systems.  This must be done out the the MCP and AI agent workflows.  This is no different in a court case where Joe Doe #1 is known to be a certain person by the judge, the prosecutor, and the defense attorney.  But who Joe Doe #1 is can be kept as a secret and only known to the judge, prosecutor, and defense attorney and person who need to know.

### Treat AI Agents Like Programmers

**Core Principle:** AI agents should generate code and the code should be vetted before execution, not created and executed with direct access.

Just as programmers don't need production credentials to write code, AI agents don't need credentials to generate code. Then the generated code will be executed with the privileged accessThis isn't a workaround—it's the correct security model.

**The AI Advantage:**
While HIPAA legally mandates minimum necessary access for human agents, practical limitations sometimes made full compliance difficult. As it turns out, AI agents can make strict compliance not only possible but more efficient. An AI agent can generate precise, auditable code artifacts for every privileged operation, enabling security controls that were previously impractical.

### What About Automation?

**Challenge:** If agents must perform regular tasks automatically, doesn't this require persistent privileged access?

**Answer:** The agent should write a program:

1. Agent generates application code for the automated task
2. Human thoroughly vets the code
3. After vetting, the application is deployed with necessary privileges
4. The agent itself never receives persistent access

This mirrors hiring a programmer:
- You hire them to write applications
- You deploy those applications with privileged access
- For everyone's protection, you do not give the programmer access to production secrets, certificates, or credentials
- They do not need these to write the code
- The AI agent generates the code and presents it for human review and deployment

## 4. Reject Arguments for "Flexibility"

You will hear arguments like:
- *"But restricting AI access limits its usefulness!"*
- *"We need to give agents more flexibility to be truly intelligent!"*
- *"HIPAA compliance will slow down AI innovation!"*

**These arguments must be promptly rejected. Here's why:**

### The Flexibility Fallacy
- **False choice**: Security and intelligence are not mutually exclusive
- **Proven wrong**: Many healthcare AI systems are both secure AND effective
- **Dangerous precedent**: "Move fast and break things" doesn't apply to patient privacy

### The Innovation Excuse
- HIPAA has been around since 1996 - it's not new
- Healthcare has innovated successfully within HIPAA constraints for decades
- True innovation means solving problems within constraints, not ignoring them

### The Real Cost of Non-Compliance
- **Financial**: HIPAA violations can cost $100 to $50,000 per violation, up to $1.5M per year
- **Legal**: Criminal penalties include fines up to $250,000 and 10 years in prison
- **Reputational**: Data breaches destroy patient trust permanently
- **Ethical**: We have a moral obligation to protect patient privacy

## What You Should Do Right Now

### If you're building AI systems with healthcare data:

1. **Audit your MCP implementations immediately**
   - Document all PHI/PII access points
   - Identify HIPAA compliance gaps
   - Create remediation plan

2. **Implement strict access controls**
   - No direct PHI access for AI agents
   - Use API gateways with HIPAA-compliant logging
   - Enforce minimum necessary access

3. **Adopt proven security patterns**
   - Use de-identification layers
   - Implement human-in-the-loop for PHI access
   - Deploy RAG with strict guardrails

4. **Document everything**
   - Maintain detailed audit logs
   - Document consent verification processes
   - Create incident response plans

5. **Get legal review**
   - Have HIPAA compliance experts review your architecture
   - Conduct regular security audits
   - Update Business Associate Agreements (BAAs)

## The Bottom Line

**MCP is a powerful tool, but it was not designed for HIPAA compliance.** Using it with PHI access is a violation waiting to be discovered.

The path forward is clear:
- Keep MCP away from PHI/PII
- Use existing, proven security measures
- Reject arguments that prioritize flexibility over compliance
- Build AI systems that are both intelligent AND secure

**Patient privacy is not negotiable.** The technology to build compliant AI systems already exists. We just need the discipline to use it correctly.

---

**What's your organization doing to ensure HIPAA compliance with AI agents? Let's discuss in the comments.**

#HIPAA #AIethics #HealthcareSecurity #MCP #DataPrivacy #AICompliance #HealthcareIT #PatientPrivacy

---

**Note**: This post reflects technical and regulatory considerations as of November 2025. Always consult with legal counsel and HIPAA compliance experts for your specific situation.
