MCP with PHI Access is a HIPAA Violation. What to do?

═══════════════════════════════════════

THE PROBLEM

The Model Context Protocol (MCP) is supposed to be the standard for AI agents to access data sources and tools. Anthropic even claimed that it was designed for safety. However, by its very design, MCP is a HIPAA violation when given access to Protected Health Information (PHI).

WHY MCP + PHI IS A HIPAA VIOLATION

The fundamental problem: If any discoverable API has access to PHI or PII data, allowing an agent to have access to it is already a HIPAA violation. There is no guarantee that an agent will not use the access except when it is absolutely necessary.

Three Immediate Violations:

1. Minimum Necessary Principle - HIPAA's Privacy Rule (45 CFR § 164.502) requires that PHI access be limited to the "minimum necessary." An MCP-enabled agent that can discover and access PHI-containing APIs violates this BY DESIGN.

2. Improper Access Controls - MCP's standardized discovery doesn't enforce role-based access, contextual necessity checks, or identity verification. An agent could access PHI "just in case" or inadvertently through a misinterpreted query.

3. Discoverability Problem - When an MCP server advertises its capabilities, it broadcasts the existence of PHI-containing APIs to any connected agent. This is unauthorized disclosure of PHI's location.

→ Do NOT allow MCP servers to access PHI or PII APIs. It is required by HIPAA.

═══════════════════════════════════════

BEWARE OF "GUARDRAILS"

Nothing can make MCP access to PHI/PII HIPAA-compliant. Be alarmed if you hear the word "Guardrails". Many security vendors will claim their "guardrails" make MCP HIPAA-compliant. Know that MCP is not HIPAA-compliant by design—no amount of guardrails can make it HIPAA-compliant. Period.

═══════════════════════════════════════

THE SOLUTION

De-identification: AI agents should not access PHI/PII data. Any information through MCP must be de-identified. Use common IDs (like "John Doe #1") that can only be de-identified within each system. PII should never cross the wire.

Treat AI Agents Like Programmers: AI agents should generate code that is vetted before execution, not execute with direct access. Just as programmers don't need production credentials to write code, AI agents don't need credentials to generate code. The generated code is then executed with privileged access. This isn't a workaround—it's the correct security model.

═══════════════════════════════════════

THE BOTTOM LINE

MCP is a powerful tool, but it is not HIPAA-compliant. Using it with PHI access is a violation.

Read the full analysis in my article: https://www.linkedin.com/pulse/mcp-phi-access-hipaa-violation-what-do-zhi-an-q7auc

#HIPAA #AIethics #HealthcareSecurity #MCP #DataPrivacy #AICompliance #HealthcareIT #PatientPrivacy
