MCP with PHI Access is a HIPAA Violation. What to do?

═══════════════════════════════════════

THE PROBLEM: MCP's Design Conflicts with HIPAA

The Model Context Protocol (MCP) is supposed to be the standard to provide access for AI agents to data sources and tools. Anthropic even claimed that it was designed for safety. However, by its very design, MCP is a HIPAA violation when given access to Protected Health Information (PHI).

═══════════════════════════════════════

1. WHY MCP + PHI IS A HIPAA VIOLATION

The fundamental problem: If any discoverable API has access to PHI or PII data, allowing an agent to have access to it is already a HIPAA violation. There is no guarantee that an agent will not use the access except when it is absolutely necessary.

Three Immediate Violations:

1. The "Minimum Necessary" Principle Violation

HIPAA's Privacy Rule (45 CFR § 164.502) requires that PHI access be limited to the "minimum necessary" to accomplish a specific purpose. An MCP-enabled agent that can discover and access PHI-containing APIs violates this principle BY DESIGN.

From the HIPAA Journal: "Under the HIPAA Security Rule, only those employees who have a need to access and use PHI as part of their roles should be given access to it." An agent with broad discoverability is effectively a user with unscoped permissions, which is in itself a violation.

2. Improper Access Controls (Technical Safeguard Failure)

HIPAA's Security Rule (45 CFR § 164.312) requires that technical safeguards precisely control access. MCP's standardized discovery doesn't enforce:
• Role-based access scoped to specific patient records
• Contextual necessity checks before each PHI access
• Identity verification of the agent's user for each request

An agent could access PHI "just in case" it might be needed, or worse, access it inadvertently through a misinterpreted user query. With the agent being intelligent, one simply cannot demonstrate compliance during an OCR audit.

3. The Discoverability Problem

When an MCP server advertises its capabilities (tools/resources), it effectively broadcasts the existence of PHI-containing APIs to any agent connected to that server:

• Unauthorized Disclosure of PHI's Location: Even if the agent never calls the API, the discovery metadata (e.g., "tool name: get_patient_medical_history") reveals that PHI exists in that system, which can be a Privacy Rule violation.

• Overbroad Authorization: An agent with a blanket credential to an "MCP server" that hosts 20 tools (5 of which touch PHI) is not minimum necessary—it's akin to giving a staff member access to the entire EHR when they only need appointment data.

The Only Compliant Path:

→ Do NOT allow MCP servers to access PHI or PII APIs. It is required by HIPAA.

═══════════════════════════════════════

2. BEWARE OF "GUARDRAILS"

Nothing can make MCP access to PHI/PII HIPAA-compliant. Be alarmed if you hear the word "Guardrails". Many security vendors will claim their "guardrails" make MCP HIPAA-compliant. Know that MCP is not HIPAA-compliant by design—no amount of guardrails can make it HIPAA-compliant. Period.

For example, some vendors will suggest that you can make use of an Authorization Gateway to wrap your PHI APIs with expensive and complex checks. It may plug some holes, but not all of them. Simply STOP.

═══════════════════════════════════════

3. THE SOLUTION: De-identification and Code Generation

De-identification: Introducing John Doe #1

AI agents should not be allowed to access PHI/PII data. To start with, any information that goes through MCP and AI agents must be de-identified. For two systems that must communicate about the same patient, a common ID should be used. The ID can and only can be de-identified within each system, and PII should never cross the wire that is MCP.

There are cases where one must match the identity of the subject in two different systems. This must be done outside the MCP and AI agent dataflows. This is no different than in a court case where John Doe #1 is known to be a certain person by the judge, the prosecutor, and the defense attorney. But who John Doe #1 really is can be kept as a secret to people who need to know.

The good news is that AI agents do not need to access PHI/PII data either. An agent can analyze a case or prescribe a cure without the identity of any patient. It only needs to know the medical information of the patient separated from the patient's identity. 

Treat AI Agents Like Programmers

Core Principle: AI agents should generate code and the code should be vetted before execution, not created and executed with direct access.

Just as programmers don't need production credentials to write code, AI agents don't need credentials to generate code. Then the generated code will be executed with the privileged access. This isn't a workaround—it's the correct security model.

Why This Works:

While HIPAA legally mandates minimum necessary access for human agents, practical limitations sometimes made full compliance difficult. AI agents can make strict compliance not only possible but more efficient. An AI agent can generate precise, auditable code artifacts for every privileged operation, enabling security controls that were previously impractical.

For Automation: The AI agent generates application code for automated tasks. After human vetting, the application is deployed with necessary privileges. The agent itself never receives persistent access.

This mirrors hiring a programmer: you hire them to write applications, you deploy those applications with privileged access, but for everyone's protection, you do not give the programmer access to production secrets, certificates, or credentials—they do not need these to write the code.

═══════════════════════════════════════

THE BOTTOM LINE

MCP is a powerful tool, but it is not HIPAA-compliant. Using it with PHI access is a violation.

---

#HIPAA #AIethics #HealthcareSecurity #MCP #DataPrivacy #AICompliance #HealthcareIT #PatientPrivacy
