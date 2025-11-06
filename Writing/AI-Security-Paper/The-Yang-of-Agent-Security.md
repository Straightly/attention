# The Yang of Agent Security: Building Applications with LLM Capabilities

**Author:** [Your Name]  
**Date:** November 5, 2025

---

While our companion article "AI Agent Security: Treat Them Like Programmers, Not Services" focuses on the Yin (granting of authority)—establishing that agents should never receive credentials—this article addresses the Yang (use of privileges): how to build applications that securely leverage LLM and agentic capabilities.

**Core Principle:** The application holds all credentials and executes all privileged operations. The LLM/agent is a code generation tool within the application's security boundary.

---

## Terminology: Agent vs. Agentic Application

### The Confusion in the Literature

In AI literature, the term "agent" is commonly used to describe what we call an "agentic application"—a complete system that uses LLM capabilities to perform intelligent tasks. This creates confusion when discussing security because it conflates two distinct components with very different security requirements.

### Critical Distinction

**Agent (LLM Component):**
- The language model itself (GPT-4, Claude, Llama, etc.)
- Generates code, queries, and API calls
- **Never holds credentials**
- **Never executes privileged operations**
- Operates as a code generation tool
- Can be compromised without exposing credentials

**Agentic Application:**
- The complete application system that leverages an LLM
- Authenticates users
- **Holds all credentials**
- **Executes all privileged operations**
- Invokes the agent/LLM for intelligence
- Presents generated code to users for review
- Maintains the security boundary

### Why This Distinction Matters

The security model depends entirely on maintaining this separation:

```
WRONG Mental Model:
"Agent" = Single entity with credentials and LLM capabilities
         ↓
      Security risk: LLM compromise exposes credentials

CORRECT Mental Model:
"Agentic Application" = Secure wrapper + Agent (LLM)
                        ↓                    ↓
                  Holds credentials    Generates code
                  Executes operations  No credentials
                        ↓
      Security: LLM compromise doesn't expose credentials
```

### Example: A Database Query Application

**What people call "an agent":**
An application that can answer questions about your database using natural language.

**What it actually is:**
- **Agentic Application:** The web app with authentication, database credentials, and execution logic
- **Agent (LLM):** The language model that generates SQL queries

**Security Implication:**
- The agentic application is the Yang (uses privileges)
- The agent/LLM is just a tool (no privileges)
- Credentials stay in the agentic application
- LLM compromise doesn't breach the database

### Naming Convention for This Article

To maintain clarity, we use:
- **"Agent"** or **"LLM"** - The language model component (no credentials)
- **"Agentic Application"** - The complete system (holds credentials)
- **"Application"** - Short form for agentic application when context is clear

When you see "AI agent" in other literature, mentally translate it to "agentic application" to understand the security implications correctly.

---

## Understanding Yin and Yang in Security

### The Yang: Use of Privileges

The use of privileges represents the "Yang" of a security system—the active, outward-facing aspect. In dealing with Yang in any system, we must assume that privileges will be used to their fullest extent. For example, we must assume that any agent, when required and able, will declare whatever origin domain it possesses to access a privileged service (such as through CORS mechanisms).

**Key Principle:** In a secured system, the verification of authority is the mechanism to stop unauthorized use of Yang. This is the process people are familiar with and understand well—the enforcement layer.

### The Yin: Granting of Authorities

The granting of authorities represents the "Yin" of security—where Yang is kept in check. This is the foundational layer that determines what privileges exist and to whom they are granted.

**Key Principle:** The granting phase must be carefully controlled, as it sets the boundaries for all subsequent actions.

### Application to AI Agents

For AI agents, the Yin and Yang framework reveals the critical insight:
- **Yang (Enforcement):** Agents should never attempt privileged actions, so there is nothing to enforce at the agent level. Enforcement happens when humans execute agent-generated code.
- **Yin (Granting):** Agents should never be granted authority. The granting of authority remains exclusively with humans who review and execute agent-generated code.

**Key Insight:** The security problem disappears when agents never receive credentials. There is no Yang to enforce and no Yin to grant at the agent level.

---

## The Yang of Building LLM-Enabled Applications

When building applications that leverage LLM capabilities, the Yang—the active use of privileges—shifts entirely to the application layer. The application becomes the security boundary that:
1. Authenticates users
2. Holds all credentials
3. Invokes the LLM/agent for intelligence
4. Executes privileged operations
5. Manages audit trails

---

## Architecture: The Secure Approach

**The Question:** How do you securely add AI agent capabilities to an existing application?

**The Answer:** The application holds the credentials, not the LLM/agent.

### Basic Architecture
```
User → Authenticated Application → LLM/Agent (no credentials)
                ↓
    Application executes privileged operations
                ↓
    Results shared with LLM/Agent for processing
```

### Key Principles

1. **Application Authentication:** Your application authenticates users and holds all credentials
2. **Agent as Tool:** The LLM/agent is invoked as a tool within your application's authenticated context
3. **Code Generation Flow:**
   - User makes request through your application
   - Application passes context to LLM/agent (without credentials)
   - Agent generates code/queries/API calls
   - Application presents generated code to user for review
   - User approves or rejects
   - Application executes approved operations with its own credentials
   - Results returned to user and optionally shared with agent

4. **No Direct Agent Access:** The agent never receives:
   - Database connection strings
   - API keys or tokens
   - User credentials
   - Direct access to privileged systems

---

## Practical Examples

### Example 1: Adding AI to a Web Application

**Traditional (Insecure) Approach:**
```
User → Web App → [Gives credentials to Agent] → Agent accesses DB/APIs
```
Problem: Agent has direct access to credentials and can execute operations autonomously.

**Secure Approach:**
```
User → Web App → Agent generates SQL/API calls → Web App shows to user
     ↓
User approves → Web App executes with its credentials → Results to user
```
Benefit: Agent provides intelligence; application maintains security boundary.

### Example 2: Database Query with LLM

**Workflow:**
1. User requests: "Show me sales data for Q4"
2. Application passes request to LLM (without DB credentials)
3. LLM generates SQL: `SELECT * FROM sales WHERE quarter = 'Q4' AND year = 2024`
4. Application displays SQL to user for review
5. User approves
6. Application executes query with its own DB credentials
7. Results returned to user
8. User optionally shares results with LLM for further analysis

**Security Benefits:**
- LLM never has database connection string
- User reviews exact query before execution
- Audit log shows user executed query, not LLM
- LLM compromise doesn't expose database

### Example 3: API Integration with LLM

**Workflow:**
1. User requests: "Create a new customer record"
2. Application passes request to LLM
3. LLM generates API call:
   ```
   POST /api/customers
   {
     "name": "Acme Corp",
     "email": "contact@acme.com",
     "tier": "enterprise"
   }
   ```
4. Application displays API call to user
5. User reviews and approves
6. Application executes API call with its own credentials
7. Result returned to user

**Security Benefits:**
- LLM never has API keys
- User sees exactly what will be created
- Application enforces rate limits and permissions
- Clear accountability trail

---

## Implementation Patterns

### Pattern 1: The Secure Wrapper

Your application becomes a secure wrapper that:
1. **Handles all authentication and authorization**
   - User login/session management
   - Credential storage and rotation
   - Permission verification

2. **Invokes the agent for intelligence/code generation**
   - Passes sanitized context (no credentials)
   - Receives generated code artifacts
   - Validates generated code format

3. **Presents agent outputs to users for review**
   - Clear display of what will be executed
   - Explanation of the operation
   - Approval/rejection interface

4. **Executes approved operations**
   - Uses application's own credentials
   - Enforces rate limits and quotas
   - Handles errors and retries

5. **Manages all credentials and privileged access**
   - Secure credential storage
   - Audit logging
   - Access control enforcement

### Pattern 2: Multi-Step Operations

For complex operations requiring multiple steps:

1. **Agent generates a workflow:**
   ```
   Step 1: Query customer data
   Step 2: Calculate discount
   Step 3: Update customer record
   Step 4: Send notification
   ```

2. **Application presents entire workflow to user**

3. **User approves workflow**

4. **Application executes each step:**
   - Uses its credentials for each operation
   - Logs each step
   - Handles failures gracefully
   - Reports progress to user

5. **Results shared with agent for next iteration (if needed)**

### Pattern 3: Stored Procedures and Scripts

For automation, the agent generates deployable code:

1. **Agent generates stored procedure or script**
2. **Human thoroughly vets the code**
3. **After vetting, code is deployed with necessary privileges**
4. **The agent itself never receives persistent access**

This mirrors hiring a programmer:
- You hire them to write applications
- You deploy those applications with privileged access
- For everyone's protection, you do not give the programmer access to production secrets, certificates, or credentials
- They do not need these to write the code
- Having such access puts both parties at risk

---

## Security Benefits

### 1. Agent Provides Intelligence Without Security Risk
- LLM generates optimal queries and operations
- No credential exposure to LLM
- LLM compromise doesn't breach systems

### 2. All Privileged Operations Remain Within Application Security Boundary
- Application enforces authentication
- Application manages authorization
- Application controls rate limiting
- Application handles credential rotation

### 3. Clear Audit Trail
- Application executes operations (not agent)
- User approval logged
- Generated code preserved
- Attribution to authenticated human

### 4. User Maintains Control Through Review and Approval
- Visibility into all operations
- Explicit approval required
- Ability to reject or modify
- Understanding of what will happen

### 5. Defense in Depth
- Multiple layers of security
- Agent compromise doesn't cascade
- Application security remains intact
- User as final gatekeeper

---

## Common Pitfalls to Avoid

### ❌ Pitfall 1: Giving Agent Direct Database Access
```python
# WRONG
agent = LLM(db_connection_string=DB_URL)
result = agent.query("Show me sales data")
```

### ✅ Correct Approach:
```python
# CORRECT
agent = LLM()  # No credentials
sql = agent.generate_query("Show me sales data")
display_to_user(sql)
if user_approves(sql):
    result = db.execute(sql)  # App executes with its credentials
```

### ❌ Pitfall 2: Giving Agent API Keys
```python
# WRONG
agent = LLM(api_key=STRIPE_KEY)
agent.process_payment(amount=100)
```

### ✅ Correct Approach:
```python
# CORRECT
agent = LLM()  # No API key
api_call = agent.generate_api_call("process payment of $100")
display_to_user(api_call)
if user_approves(api_call):
    result = stripe_client.execute(api_call)  # App uses its key
```

### ❌ Pitfall 3: Auto-Executing Agent Output
```python
# WRONG
code = agent.generate_code(user_request)
exec(code)  # Dangerous!
```

### ✅ Correct Approach:
```python
# CORRECT
code = agent.generate_code(user_request)
display_to_user(code)
if user_approves(code):
    result = safe_execute(code)  # With proper sandboxing
```

---

## Applicability

This pattern works for any application adding AI capabilities:
- **Web applications:** User interfaces with review/approval flows
- **Mobile apps:** In-app review before execution
- **Enterprise systems:** Workflow approval mechanisms
- **Automation platforms:** Human-in-the-loop for initial deployment
- **CLI tools:** Display and confirm before execution
- **APIs:** Require explicit approval endpoints

---

## Handling PHI and PII: Data Minimization for LLMs

### The Challenge

When building agentic applications that process sensitive data—Protected Health Information (PHI), Personally Identifiable Information (PII), or other confidential data—a critical question arises: **What data should be shared with the LLM?**

The LLM component should receive only the minimum necessary information to generate useful code, while the agentic application retains full access to sensitive data.

### Core Principle: Data Minimization

**The LLM never needs to see the actual sensitive data—it only needs to understand the structure and context.**

### Practical Strategies

#### Strategy 1: Schema-Only Access

Instead of sharing actual patient records, share the schema:

```
❌ WRONG - Sharing PHI with LLM:
User: "Analyze John Doe's lab results"
App → LLM: {patient: "John Doe", SSN: "123-45-6789", 
            labs: {glucose: 180, A1C: 8.2}}

✅ CORRECT - Schema only:
User: "Analyze this patient's lab results"
App → LLM: {schema: {patient_id: "string", 
            labs: {glucose: "number", A1C: "number"}},
            context: "diabetes screening"}
LLM generates: SELECT glucose, A1C FROM labs WHERE patient_id = ?
App executes with actual patient ID
```

#### Strategy 2: De-identified Samples

For complex queries, provide de-identified examples:

```
User: "Find patients with similar conditions"
App → LLM: Sample data (anonymized):
  {age_range: "50-60", diagnosis_codes: ["E11.9"], 
   medication_classes: ["metformin"]}
LLM generates query template
App executes with real PHI
```

#### Strategy 3: Aggregate Statistics Only

Share population-level data, never individual records:

```
User: "What's the average A1C for diabetic patients?"
App → LLM: "Database has diabetes_patients table with A1C column"
LLM generates: SELECT AVG(A1C) FROM diabetes_patients 
              WHERE diagnosis LIKE 'E11%'
App executes and returns: "Average A1C: 7.2"
```

#### Strategy 4: Tokenization and Placeholders

Replace sensitive values with tokens:

```
❌ WRONG:
App → LLM: "Patient Jane Smith, DOB 1985-03-15, needs refill"

✅ CORRECT:
App → LLM: "Patient [PATIENT_ID], DOB [DATE], needs refill"
LLM generates: INSERT INTO prescriptions (patient_id, date) 
              VALUES ([PATIENT_ID], [DATE])
App substitutes actual values before execution
```

#### Strategy 5: HIPAA Safe Harbor De-identification

Follow HIPAA Safe Harbor standards for removing 18 identifiers when sharing context with LLMs:

**Age Handling:**
```
❌ WRONG - Exact DOB:
App → LLM: "Patient born 1985-03-15, presenting with symptoms..."

✅ CORRECT - Age ranges per HIPAA:
For patients ≤ 89 years:
  - Infants (0-30 days): "15 days old"
  - Young children (31 days - 2 years): "8 weeks old" or "14 months old"
  - Children (2-18 years): "7 years old"
  - Adults (18-89 years): "42 years old"

For patients > 89 years:
  - Use aggregate: "90+ years old" (HIPAA requires aggregation)

Example:
App → LLM: {
  age: "42 years old",
  symptoms: ["fever", "cough"],
  context: "respiratory infection"
}
```

**Geographic Information:**
```
❌ WRONG - Specific addresses:
App → LLM: "Patient at 123 Main St, Springfield, IL 62701"

✅ CORRECT - County or major city only:
App → LLM: {
  location: "Sangamon County, IL",
  // or for major cities (population > 20,000):
  location: "Chicago, IL"
}

For rural areas:
  location: "Rural Illinois" // State only if county is too specific
```

**Complete De-identification Example:**
```
❌ WRONG - Full PHI:
{
  name: "John Smith",
  ssn: "123-45-6789",
  dob: "1982-06-15",
  address: "456 Oak Ave, Apt 3B, Smalltown, IL 62301",
  phone: "217-555-0123",
  email: "john.smith@email.com",
  mrn: "MRN-987654"
}

✅ CORRECT - De-identified per HIPAA Safe Harbor:
{
  patient_id: "[TOKEN_12345]",
  age: "42 years old",
  location: "Montgomery County, IL",
  // All other identifiers removed
  // LLM receives only what's needed for clinical context
}
```

**HIPAA Safe Harbor 18 Identifiers to Remove:**
When sharing data with LLMs, remove or generalize:
1. Names
2. Geographic subdivisions smaller than state (except county/city with population > 20,000)
3. Dates (except year) - use age instead
4. Telephone numbers
5. Fax numbers
6. Email addresses
7. Social Security numbers
8. Medical record numbers
9. Health plan beneficiary numbers
10. Account numbers
11. Certificate/license numbers
12. Vehicle identifiers and serial numbers
13. Device identifiers and serial numbers
14. Web URLs
15. IP addresses
16. Biometric identifiers
17. Full-face photos
18. Any other unique identifying number, characteristic, or code

### Healthcare-Specific Considerations

For HIPAA-compliant agentic applications:

**1. PHI Never Leaves the Application Boundary**
- LLM receives de-identified or structural information only
- Application holds all PHI and executes queries
- Results can be shared with LLM only after review and sanitization

**2. Audit Trail Requirements**
```
Log entry:
- User: Dr. Smith (authenticated)
- Action: Generated query for patient diagnosis validation
- LLM Input: Schema + de-identified context
- LLM Output: SQL query (reviewed)
- Execution: Query executed by application
- PHI Accessed: Patient record #12345
- Result: Shared aggregate statistics with LLM for follow-up
```

**3. Clinical Decision Support Pattern**
```
User: "Validate diagnosis for this patient"
App → LLM: {
  diagnosis_code: "E11.9",
  available_data_types: ["labs", "medications", "vitals"],
  context: "Type 2 diabetes validation"
}
LLM generates validation query
App executes against real PHI
App shows results to provider
Provider decides what (if any) results to share back with LLM
```

### Example: Clinical Diagnosis Validator

**Compliant Architecture:**

```
1. Provider requests diagnosis validation
2. Application retrieves patient PHI (authenticated)
3. Application sends to LLM:
   - Diagnosis code (ICD-10)
   - Available data types (not actual values)
   - Clinical context
4. LLM generates queries to find supporting/contradicting evidence
5. Application displays queries to provider
6. Provider approves queries
7. Application executes against real PHI
8. Application shows results to provider
9. Provider decides: accept, modify, or reject AI suggestion
10. All actions logged with provider attestation
```

**Key Safeguards:**
- LLM never sees patient names, SSNs, or direct PHI
- Application maintains HIPAA compliance boundary
- Provider remains in control of all clinical decisions
- Full audit trail for regulatory review

### General PII Handling

The same principles apply to any sensitive data:

**Financial Data:**
- Share transaction patterns, not account numbers
- Provide schemas, not actual balances
- Generate queries with placeholders

**Personal Data:**
- Use anonymized examples for context
- Share data types and structures, not values
- Let application handle actual PII

**Confidential Business Data:**
- Provide aggregate statistics
- Share data models, not proprietary information
- Keep sensitive values in application layer

### The De-identification Requirement

From the raw materials: "Clone without PHI scale intelligence requires respecting privacy and de-identification."

When building intelligent systems that learn from data:
1. **Training data must be de-identified** before any LLM processing
2. **Runtime queries use schemas and structures**, not actual sensitive values
3. **Results are sanitized** before sharing with LLM for follow-up
4. **Application maintains the privacy boundary** at all times

### Benefits of This Approach

1. **Regulatory Compliance:** HIPAA, GDPR, CCPA compliance maintained
2. **Reduced Risk:** LLM compromise doesn't expose sensitive data
3. **Audit Trail:** Clear documentation of what data was processed
4. **User Trust:** Patients/customers know their data stays protected
5. **Flexibility:** LLM can still provide intelligent assistance

### Implementation Checklist

- [ ] Identify all PHI/PII in your system
- [ ] Create de-identified schemas for LLM context
- [ ] Implement tokenization for sensitive values
- [ ] Build sanitization layer for LLM inputs
- [ ] Add review step before sharing results with LLM
- [ ] Maintain comprehensive audit logs
- [ ] Document data flow for compliance review
- [ ] Train users on privacy-preserving workflows

---

## The AI Advantage

While HIPAA legally mandates minimum necessary access for human agents, practical limitations made full compliance difficult. AI agents make strict compliance not only possible but efficient:

- AI agents can generate precise, auditable code artifacts for every privileged operation
- No need for standing access to production systems
- Perfect documentation of every operation
- Enables security controls that were previously impractical with human developers

The subtle difference between human programmers and AI agents: The AI agent doesn't even need the privilege of putting code into a pipeline for vetting and deployment. The AI agent can generate the code and present it for human review and deployment, and that human agent, or programmer, will be the responsible party for that code.

---

## Conclusion

The Yang of agent security—the active use of privileges—belongs entirely to the application layer, not the agent. By building applications that:
1. Hold all credentials
2. Invoke LLMs as code generation tools
3. Present generated code for human review
4. Execute operations with application credentials
5. Maintain clear audit trails

You can leverage the power of AI agents while maintaining robust security. The agent provides intelligence; the application provides security; the human provides oversight.

**Remember:** The application is the Yang. The agent is just a tool within that Yang. Never give the tool its own privileges.

---

_Last Updated: November 5, 2025 • ~3,500 words_
