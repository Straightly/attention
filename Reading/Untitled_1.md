# Untitled

Yes — you’re wise to raise that concern.

What you’re describing could absolutely raise red flags, depending on how your AI app is framed, used, and integrated into clinical decision-making.

Let’s unpack both the regulatory and ethical implications — and then I’ll show how to build it safely.

# **🔍 Your App’s Intended Function:**

# 🧠 AI to assist providers in checking for “gaps” or evidence that may refute or support a diagnosis — post-diagnosis — by scanning the patient’s records.

This can be framed in two very different ways:

| **Perspective** | **Framing** | **Risk Level** |
| --- | --- | --- |
| ✅ Clinical validation | “Help clinicians catch mistakes or oversights” | Low |
| ⚠️ Revenue optimization | “Help increase risk scores or identify undocumented diagnoses” | High |

# **⚠️ Why It Could Be Seen as**

# **Upcoding Pressure**

# **:**

If your app:

- Suggests adding diagnoses with higher Hierarchical Condition Category (HCC) weights
- Focuses on capturing more billable codes
- Is used after the fact, not during clinical care
- Is funded or directed by payers or revenue teams, not clinical teams

…then yes, it could be construed as collusion or pressure to upcode, particularly under:

- DOJ scrutiny of Medicare Advantage fraud
- False Claims Act implications
- CMS RADV (Risk Adjustment Data Validation) audits

# **🛡️ How to Make It Legally & Ethically Safe**

To reduce risk while preserving functionality:

**✅**

**Frame it as a Clinical Safety/QA Tool**

- “Helps providers avoid underdiagnosis or incorrect documentation”
- Emphasize medical appropriateness, not revenue

**✅**

**Include Refutation and Confirmation**

- Don’t just suggest what to add — also highlight where existing diagnoses may not be supported
- This is key: a balanced tool is more defensible

**✅**

**Use Transparent Logic**

- Document what evidence the AI uses (e.g., lab value X + note Y = suggest Z)
- Let the provider decide; don’t auto-populate diagnoses

**✅**

**Auditability**

- Keep a log of all AI suggestions vs. final provider decisions
- Let compliance/auditors track how AI impacted outcomes

**✅**

**Integrate with Clinical Workflow**

- Embed in EHR or at the point of care, not in billing backend
- Have it used by clinicians, not by coders or risk teams alone

# **📘 Example of Safe Messaging:**

# “AI Assistant to help validate or refine clinical diagnoses based on full patient history, reducing both overdiagnosis and underdiagnosis for improved quality of care.”

vs.

# ❌ “AI tool to ensure maximum risk-adjusted reimbursement from Medicare Advantage plans.”

# **🧠 Final Word:**

You’re smart to ask early. The same app could either:

- Be seen as a quality tool, if developed with clinical integrity
- Or as a fraud accelerator, if tied to revenue-focused usage without safeguards

If you’d like, I can help sketch out a compliance-friendly design doc or a or a terms-of-use disclaimer tailored for provider-facing AI tools.