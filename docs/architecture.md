# Academia–Industry Connect: System Architecture

## 1. Executive Summary

**Academia–Industry Connect** is a production-grade collaboration platform engineered to bridge higher education curricula with enterprise industry demands. The platform unifies five core stakeholder roles:
- **Students**: Building verified professional profiles, tracking skill endorsements, and applying for internships.
- **Faculty**: Endorsing student skill claims via coursework artifacts and capstone reviews.
- **College Admins / Placement Officers (TPO)**: Orchestrating campus recruitment drives, monitoring placement rates, and managing institutional partnerships.
- **Industry Recruiters**: Sourcing verified talent, publishing opportunities, evaluating semantic match scores, and conducting interviews.
- **Super Administrators**: Governing platform-wide tenant accreditation, security telemetry, and cross-tenant isolation.

---

## 2. Architecture Style & Topology

The platform adopts a **Modular Monolith** architecture built on **Next.js 16 (App Router)** with **TypeScript**, **PostgreSQL**, **Prisma ORM**, and **Clerk**.

### Key Architectural Tenets:
1. **Server Components by Default**: Zero client bundle footprint for data fetching, server-side authorization, and template rendering.
2. **Decoupled AI Boundary**: Clean asynchronous contracts ready for an independent Python FastAPI microservice handling heavy resume parsing, semantic embedding extraction, and compatibility scoring.
3. **Strict Multi-Tenant Isolation**: Row-level tenant partitioning ensuring college administrators and faculty never leak or access data outside their assigned college ID, and recruiters only manage their company's pipeline.
4. **Resilient Demo Mode**: Built-in development fallback supporting full local evaluation and instant perspective switching between all five roles even prior to external service configuration.

---

## 3. High-Level System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Client Layer (Web Browser)                            │
│           Tailwind CSS (v4) • shadcn/ui • Radix UI • Lucide • Recharts      │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTPS / JSON / Server Actions
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Next.js 16 Full-Stack Application                        │
│                                                                             │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐   │
│  │   Public Portal      │  │  Stakeholder Consoles│  │ Server Auth API  │   │
│  │   /about, /colleges  │  │  Student, Faculty,   │  │ getCurrentUser() │   │
│  │   /companies         │  │  TPO, Recruiter, SA  │  │ requireRole()    │   │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────┘   │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                   Centralized RBAC Engine                             │  │
│  │         Permissions • Tenant Isolation • Route & Action Guards        │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└───────────────────────┬───────────────────────────────┬─────────────────────┘
                        │                               │
        Prisma ORM Client (v6)               REST / JSON Contract (Future)
                        │                               │
                        ▼                               ▼
       ┌─────────────────────────────────┐   ┌────────────────────────────────┐
       │      PostgreSQL Database        │   │    Python FastAPI AI Engine    │
       │    Identity, Institutions,      │   │   Sentence Transformers,       │
       │   Verified Skills, Jobs, Apps   │   │   Resume Parsing, Vector Gap   │
       └─────────────────────────────────┘   └────────────────────────────────┘
```

---

## 4. Module Boundaries

The application is decomposed into cohesive domain modules:

| Module | Core Responsibility | Primary Models / Services |
| :--- | :--- | :--- |
| **Identity & Access** | Clerk sync, user onboarding, session resolution | `User`, `permissions.ts`, `server-auth.ts` |
| **Colleges & Depts** | Institutional hierarchy, campuses, departments | `College`, `Department`, `CollegeAdminProfile` |
| **Student Profiles** | Academic records, portfolios, resumes, capstones | `StudentProfile`, `AcademicRecord`, `Project` |
| **Faculty & Review** | Faculty directories, skill claims, endorsements | `FacultyProfile`, `SkillVerification`, `Mentorship` |
| **Centralized Skills** | Normalized taxonomy across all technical domains | `Skill`, `StudentSkill`, `JobSkill` |
| **Jobs & Placement** | Opportunities, eligibility, campus drives | `Job`, `RecruitmentDrive`, `Placement` |
| **Application Pipeline** | Candidate tracking, interview scheduling | `Application`, `Interview` |
| **Collaborations** | Joint labs, centers of excellence, MOUs | `Collaboration`, `TrainingProgram` |
| **AI Integration** | Vector skill matching, gap analysis, parser | `SkillMatch`, `SkillGap`, `FastAPI contracts` |
| **Platform Governance**| Tenant accreditation, audit logs, invitations | `AuditLog`, `Invitation`, `Notification` |

---

## 5. Security & Threat Modeling

1. **Authorization at Data Layer**: Frontend navigation masking is never treated as a security boundary. All sensitive operations invoke `requireRole`, `requirePermission`, `requireCollegeAccess`, or `requireCompanyAccess` inside Server Actions and Route Handlers.
2. **Tenant ID Verification**: Any request involving college or company resources asserts that `authenticatedUser.collegeId === targetCollegeId` (or Super Admin privilege).
3. **Immutability of Role Upgrades**: Role elevation is restricted to super administrative commands and Clerk webhook claims. End users cannot pass a `role` field in profile update requests.
4. **Audit Trail**: High-consequence mutations (verifying skills, publishing jobs, issuing offers) generate immutable `AuditLog` records containing user ID, target entity, timestamp, and IP address.
