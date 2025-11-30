# PaceLeader Mini Program Project Plan

## Overview

Build two WeChat Mini Programs that share the existing PaceLeader Cloudflare backend:
- **Pacer Mini Program**: configure runs for the next 7 days.
- **Runner Mini Program**: view runs and sign up.

All run data continues to live in the existing Cloudflare Pages/Workers backend (`/api/pacer/runs`, KV).

---

## Phase 0: Prerequisites (Accounts, Backend, and Tools)

**Goal:** Ensure all external accounts and backend pieces needed by the Mini Programs are in place.

- **Tasks**
  - [ ] Confirm the existing PaceLeader backend (Cloudflare Pages + KV) is deployed and reachable over HTTPS.
  - [ ] Verify `wrangler.toml` and KV binding (`PACELEADER_KV`) are correct and production-ready.
  - [ ] Ensure you have a **WeChat personal developer account** with permission to create Mini Programs.
  - [ ] Install and log in to **WeChat DevTools** on your development machine.
  - [ ] Decide that identity mapping for Mini Program users will use **WeChat `openid`** as the primary key.
  - [ ] Decide you will collect **basic profile** (nickname, avatar) via `wx.getUserProfile` when needed.
  - [ ] Decide you will enforce **group-based access** by inferring `openGId` from group share cards using `shareTicket + wx.getShareInfo`.

- **Time Estimate:** 1–2 hours (mostly one-time setup/verification).

---

## Phase 1: Environment & Accounts

**Goal:** Be ready to build & run Mini Programs locally.

- **Tasks**
  - [ ] Install **WeChat DevTools**.
  - [ ] Create **two Mini Program projects** in the WeChat console (one for Pacer, one for Runner) or a single project with two pages (decide structure).
  - [ ] Obtain **AppID**(s) and configure in DevTools.
  - [ ] Verify a default hello‑world Mini Program runs on your phone.

- **Time Estimate:** 2–4 hours.

---

## Phase 2: Backend Integration (Reuse Cloudflare)

**Goal:** Allow Mini Programs to call the existing PaceLeader APIs.

- **Tasks**
  - [ ] Identify the **public base URL** of the PaceLeader backend (e.g., `https://paceleader.pages.dev`).
  - [ ] In WeChat Mini Program settings, configure **合法域名** (request legal domains) to include the backend origin.
  - [ ] Define a **minimal API client module** for Mini Programs:
    - [ ] `getRunsByDate(date)` → calls `/api/pacer/runs` with `{ mode: 'getByDate', date }`.
    - [ ] `upsertRun(payload)` → calls `/api/pacer/runs` with `{ mode: 'upsert', ... }`.
    - [ ] `runnerSelect(payload)` → calls `/api/pacer/runs` with `{ mode: 'runnerSelect', ... }`.
  - [ ] Decide identity scheme:
    - Option A (simplest): use **WeChat `openid`** directly as `runnerId`/`pacerId` fields in KV, parallel to or instead of email.
    - Option B: keep PaceLeader’s **email‑based model** and introduce a mapping from `openid → email` (more work).
  - [ ] (Optional now, later if needed) Add a small **compatibility layer** to the Cloudflare backend if you don’t want to change existing KV schema.

- **Time Estimate:** 3–5 hours.

---

## Phase 3: Pacer Mini Program

**Goal:** Implement a Pacer‑only Mini Program that mirrors `pacer.html` behavior.

- **Tasks**
  - [ ] Create `pages/pacer/index` with:
    - [ ] WXML layout showing **next 7 days**, each row representing a date.
    - [ ] Inputs for **start time**, **pace**, **start place**.
    - [ ] Display of **runner count** per run.
    - [ ] Buttons for **add run**, **soft delete / re‑add**, and **view runners (eye)**.
  - [ ] Implement data loading:
    - [ ] On page load, compute next 7 dates (same logic as `pacer.html`).
    - [ ] For each date, call `getRunsByDate` and derive per‑row state.
  - [ ] Implement run editing:
    - [ ] On blur / confirm of time/pace/place inputs, call `upsertRun`.
    - [ ] Ensure defaults (time, pace, place) match PaceLeader web app.
  - [ ] Implement **soft delete / restore**:
    - [ ] Toggle `removed` flag using `upsertRun`.
    - [ ] Reflect state in UI (e.g., button text `X` vs `Re Add`).
  - [ ] Implement **view signed‑up runners**:
    - [ ] Eye button opens a panel listing current `signedUpRunners`.
  - [ ] Implement **custom quit dialog**:
    - [ ] If there are other runners signed up, show overlay with:
      - Primary button: `Pace, not quit.` (closes dialog, no change).
      - Secondary button: `Quit anyway` (performs soft delete).
  - [ ] Test flows on DevTools and phone.

- **Time Estimate:** 7–10 hours.

---

## Phase 4: Runner Mini Program

**Goal:** Implement a Runner‑only Mini Program that mirrors `runner.html` behavior.

- **Tasks**
  - [ ] Create `pages/runner/index` with:
    - [ ] Date tabs for next 7 days.
    - [ ] Run list for the selected date, ordered by pacer.
    - [ ] Checkbox or selection control per run.
    - [ ] "My Coming Runs" summary section.
  - [ ] Implement data loading:
    - [ ] On load, prefetch runs for next 7 days via `getRunsByDate`.
    - [ ] Build two maps: all runs vs visible runs (excluding `removed`).
  - [ ] Implement run selection:
    - [ ] On select/deselect, call `runnerSelect` with date, pacer, runner ID.
    - [ ] Enforce **single‑run‑per‑day** behavior (as backend does now).
    - [ ] Refresh runs and summary after change.
  - [ ] Implement **My Coming Runs** summary:
    - [ ] Show date, time, pace, place, pacer display name.
    - [ ] Include soft‑deleted runs (with `removed === true`) but label them `Pacer Quited`.
  - [ ] Implement **display names for pacers**:
    - [ ] Use `pacerDisplayName` if provided by backend.
    - [ ] Fallback: local‑part of email or another readable identifier.
  - [ ] Test on DevTools and phone.

- **Time Estimate:** 6–9 hours.

---

## Phase 5: WeChat Login & Role Handling

**Goal:** Distinguish between pacers and runners and ensure only authorized users access each Mini Program.

- **Tasks**
  - [ ] Implement basic **WeChat login** in each Mini Program (`wx.login` on client, `code2session` on backend) to obtain `openid`.
  - [ ] Implement **basic profile collection** via `wx.getUserProfile` (with a clear prompt) and send `nickName`/`avatarUrl` to the backend for optional storage.
  - [ ] Design and implement backend contract for roles:
    - [ ] Maintain a `users` or `identities` table keyed by `openid`, with roles: `pacer`, `runner` (and possibly `admin` if needed later).
    - [ ] Optionally seed or sync this table from existing PaceLeader email lists, but prefer `openid` as primary key for the Mini Programs.
  - [ ] Add simple **role guard logic** in each Mini Program:
    - [ ] Pacer Mini Program: verify `role` includes `pacer`; otherwise show a blocking message (e.g., "You are not authorized as a pacer.").
    - [ ] Runner Mini Program: verify `role` includes `runner`.
  - [ ] Implement **group-based restriction** using `openGId`:
    - [ ] Enable sharing with `onShareAppMessage` and `withShareTicket: true` so group shares carry a `shareTicket`.
    - [ ] When opened from a **group share card**, call `wx.getShareInfo` with the `shareTicket` and send `encryptedData` + `iv` to the backend.
    - [ ] On the backend, decrypt using `session_key` to obtain `openGId`.
    - [ ] Maintain a mapping: `openGId → groupType` (e.g., `pacer-group`, `runner-group`).
    - [ ] For the **Pacer Mini Program**, only allow full functionality when `groupType === 'pacer-group'`; otherwise show a blocking message like: "Please open this Pacer Mini Program from the Pacer group chat."
    - [ ] For the **Runner Mini Program**, only allow full functionality when `groupType === 'runner-group'`; otherwise show a blocking message like: "Please open this Runner Mini Program from the Runner group chat."
    - [ ] Decide a safe fallback behavior when launched **outside** a group share (e.g., show read‑only info or block with instructions to open from the correct group).

- **Time Estimate:** 4–7 hours (group-based restriction, role guards, and profile storage).

---

## Phase 6: Polish, Error Handling, and Docs

**Goal:** Make both Mini Programs reliable and understandable.

- **Tasks**
  - [ ] Add loading indicators around network calls.
  - [ ] Show clear error messages on API failures (timeouts, network, backend errors).
  - [ ] Light UX polish (spacing, colors, button placement).
  - [ ] Write a short **README** in `PaceLeaderMiniProgram/`:
    - [ ] How to run in WeChat DevTools.
    - [ ] How to configure backend domain.
    - [ ] Known limitations.

- **Time Estimate:** 3–5 hours.

---

## Summary of Time Estimates

- **Phase 1: Environment & Accounts:** 2–4 hours
- **Phase 2: Backend Integration:** 3–5 hours
- **Phase 3: Pacer Mini Program:** 7–10 hours
- **Phase 4: Runner Mini Program:** 6–9 hours
- **Phase 5: Login & Roles:** 2–4 hours
- **Phase 6: Polish & Docs:** 3–5 hours

**Total Estimated Effort:** ~24–39 hours (including Phase 0 prerequisites)

---

## Next Steps

1. Confirm which identity model you want (email vs openid) for pacers/runners.
2. Set up WeChat DevTools and create the initial Mini Program project(s).
3. Implement Phase 2 (API client and domain configuration) so both apps can call the existing Cloudflare backend.
4. Build Pacer Mini Program (Phase 3) first, then Runner (Phase 4).
