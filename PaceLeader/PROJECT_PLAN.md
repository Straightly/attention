# PaceLeader Project Plan

## Project Overview
PaceLeader is a web application with Google OAuth authentication and role-based access control, deployed on Cloudflare Pages.

---

## Phase 1: Setup & Deployment ✅ COMPLETED
**Status**: ✅ Complete  
**Estimated Time**: 2-3 hours  
**Actual Time**: ~2 hours

### Tasks
- [x] Create project structure (index.html, app.js, README.md)
- [x] Implement Google OAuth authentication UI
- [x] Add session persistence (localStorage)
- [x] Obtain Google OAuth Client ID
- [x] Configure Google Cloud Console credentials
- [x] Test locally (http://localhost:8000)
- [x] Deploy to Cloudflare Pages (https://paceleader.pages.dev)
- [x] Update Google OAuth with production URL
- [x] Verify authentication works in production

### Deliverables
- ✅ Login page with Google sign-in
- ✅ User info display after authentication
- ✅ Sign out functionality
- ✅ Deployed to production

---

## Phase 2: Backend Infrastructure & Authorization ✅ COMPLETED
**Status**: ✅ Complete  
**Estimated Time**: 3-4 hours  
**Actual Time**: ~1.5 hours (with AI assistance)

### Tasks
- [x] Create `functions/` directory for Pages Functions
- [x] Create authentication API endpoint (`functions/api/auth/verify.js`)
- [x] Implement Role-Based Access Control (RBAC) logic
- [x] Define user lists (Admins, Pacers, Runners)
- [x] Implement role checking logic
- [x] Handle multi-role users (Role Selection UI)
- [x] Create Frontend UI (Not Admitted, Role Selection, Dashboard)
- [x] Test locally with `wrangler pages dev`
- [x] Deploy to production

### Deliverables
- ✅ Backend API with role verification
- ✅ Role selection flow for multi-role users
- ✅ Access denial page for unauthorized users
- ✅ Hardcoded user lists

---

## Phase 3: User List Management with Cloudflare KV ✅ COMPLETED
**Status**: ✅ Complete  
**Estimated Time**: 2-3 hours  
**Actual Time**: ~1 hour (with AI assistance)

### Tasks
- [x] Create Cloudflare KV namespace
- [x] Create `wrangler.toml` configuration
- [x] Update `verify.js` to read from KV with auto-initialization
- [x] Implement hardcoded fallback mechanism
- [x] Bind KV namespace to Pages Functions
- [x] Test locally with KV
- [x] Deploy to production

### Deliverables
- ✅ KV namespace created and bound
- ✅ Auto-initialization on first request
- ✅ Fallback to hardcoded lists for reliability
- ✅ User lists stored in KV (admins, pacers, runners)

---

## Phase 4: Admin Dashboard ✅ COMPLETED
**Status**: ✅ Complete  
**Estimated Time**: 2-3 hours  
**Actual Time**: _Multiple short sessions with AI assistance_

### Tasks
- [x] Create admin dashboard page (`admin.html`)
- [x] Implement admin-only access control
  - [x] Check if user has 'admin' role
  - [x] Redirect non-admins to main dashboard
- [x] Create UI to display three user lists:
  - [x] Admins list section with add/delete controls
  - [x] Pacers list section with add/delete controls
  - [x] Runners list section with add/delete controls
- [x] For each list section, implement:
  - [x] Input field for Gmail address
  - [x] "Add" button
  - [x] Display current users
  - [x] Delete button next to each user (for own-role entries)
  - [x] Email validation (Gmail-only, case-insensitive)
- [x] Create backend endpoint:
  - [x] `POST /api/admin/get-lists` - Read lists from KV with normalization
  - [x] `POST /api/admin/update-lists` - Save modified lists to KV
- [x] Store users as `{id, email, displayName}` with inline editing
- [x] Implement UX-only role extension (admins also appear as pacers, pacers as runners) with derived entries read-only
- [x] Add helper title text and basic error/success feedback
- [x] Test locally and in production

### Deliverables
- ✅ Admin dashboard page with three list sections
- ✅ Add/edit/delete Gmail users per role (with display names)
- ✅ Structured user objects persisted in KV via dedicated admin APIs
- ✅ Access control (admin-only page)

---

## Phase 5: Pacer Dashboard ✅ COMPLETED
**Status**: ✅ Complete  
**Estimated Time**: 2-3 hours  
**Actual Time**: _Multiple short sessions with AI assistance_

### Tasks
- [x] Create pacer dashboard page (`pacer.html`)
- [x] Implement pacer-only access guard (role check + redirect)
- [x] Show next 7 days starting tomorrow with date/weekday labels
- [x] Allow pacer to configure runs per date:
  - [x] Start time (with default)
  - [x] Pace (with default)
  - [x] Starting place (with default)
  - [x] Runner count link
- [x] Implement run creation/upsert API (`/api/pacer/runs` upsert mode)
- [x] Persist runs in KV with fields: date, pacer, startTime, pace, startPlace, signedUpRunners, removed
- [x] Implement soft delete / restore of runs with `removed` flag
- [x] Ensure existing runs remain visible when soft-deleted (with proper controls)
- [x] Add eye button to view signed-up runners for a run
- [x] Add soft-delete warning when other runners are signed up, with custom dialog:
  - [x] Primary button: "Pace, not quit."
  - [x] Secondary button: "Quit anyway" (performs soft delete)
- [x] Test locally and in production

### Deliverables
- ✅ Pacer dashboard for configuring runs for the next 7 days
- ✅ Cloudflare KV-backed pacer runs API with upsert and soft delete
- ✅ UX to inspect signed-up runners and warn on quit

---

## Phase 6: Runner Dashboard ✅ COMPLETED
**Status**: ✅ Complete  
**Estimated Time**: 2-3 hours  
**Actual Time**: _Multiple short sessions with AI assistance_

### Tasks
- [x] Create runner dashboard page (`runner.html`)
- [x] Implement runner-only access guard (role check + redirect)
- [x] Show next 7 days starting tomorrow as selectable date tabs
- [x] Enable only dates that have pacer runs (via `/api/pacer/runs` getByDate)
- [x] Display runs for selected date ordered by pacer
- [x] Implement single-run-per-day selection per runner (enforced in backend)
- [x] Implement `runnerSelect` mode in `/api/pacer/runs` to add/remove a runner from a run
- [x] Add "My Coming Runs" summary section showing all runs the runner has signed up for
- [x] Keep soft-deleted runs visible in "My Coming Runs" with label "Pacer Quited"
- [x] Show pacer display names (not raw emails) in listings and summary
- [x] Add UX text and styling refinements per feedback
- [x] Test locally and in production

### Deliverables
- ✅ Runner dashboard for discovering runs and signing up
- ✅ Single-run-per-day constraint enforced in both UI and backend
- ✅ "My Coming Runs" summary that reflects current and soft-deleted runs

---

## Phase 7: Polish & Optimization
**Status**: 🔲 Not Started  
**Estimated Time**: 2-3 hours  
**Actual Time**: _[To be filled]_

### Tasks
- [ ] Add loading states and animations
- [ ] Implement error handling UI
- [ ] Add responsive design improvements
- [ ] Optimize performance (lazy loading, caching)
- [ ] Create user documentation
- [ ] Implement accessibility improvements (ARIA labels)
- [ ] Browser compatibility testing
- [ ] Mobile device testing

### Deliverables
- Polished UI/UX
- User documentation
- Performance optimizations
- Accessibility compliance

---

## Phase 8: Security Hardening
**Status**: 🔲 Not Started  
**Estimated Time**: 2-3 hours  
**Actual Time**: _[To be filled]_

### Tasks
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Set up Content Security Policy (CSP)
- [ ] Add input validation and sanitization
- [ ] Implement secure headers
- [ ] Add audit logging
- [ ] Security testing (OWASP top 10)

### Deliverables
- Security audit report
- Rate limiting implementation
- Secure headers configuration
- Audit logging system

---

## Technology Stack

### Frontend
- **HTML5/CSS3/JavaScript** (Vanilla JS)
- **Google Sign-In Library** (OAuth 2.0)
- **Responsive Design**

### Backend
- **Cloudflare Pages Functions** (Serverless API)
- **Wrangler CLI** (Deployment tool)

### Database
- **Cloudflare KV** (User list storage)

### Hosting
- **Cloudflare Pages** (Frontend + Backend)

### Authentication
- **Google OAuth 2.0**
- **Role-Based Access Control** (Admins, Pacers, Runners)

---

## Progress Summary

### Completed Phases
- ✅ **Phase 1**: Setup & Deployment (~2 hours)
- ✅ **Phase 2**: Backend Infrastructure & Authorization (~1.5 hours)
- ✅ **Phase 3**: User List Management with KV (~1 hour)
- ✅ **Phase 4**: Admin Dashboard (est. 2-3 hours)
- ✅ **Phase 5**: Pacer Dashboard (est. 2-3 hours)
- ✅ **Phase 6**: Runner Dashboard (est. 2-3 hours)

### Remaining Phases
- 🔲 **Phase 7**: Polish & Optimization (2-3 hours)
- 🔲 **Phase 8**: Security Hardening (2-3 hours)

**Total Time So Far**: _Several working sessions with AI assistance_  
**Estimated Remaining**: 4-6+ hours (polish and security)

---

**Live URL**: [https://paceleader.pages.dev](https://paceleader.pages.dev)  
**Last Updated**: November 29, 2025  
**Current Status**: Phases 1–6 Complete (Admin, Pacer, Runner dashboards implemented)
