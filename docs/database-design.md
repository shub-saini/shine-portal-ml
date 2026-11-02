# Academia–Industry Connect: Database Design Document

## 1. Overview

The database is built on **PostgreSQL** using **Prisma ORM**. The schema is strictly relational, normalized to 3NF where appropriate, and equipped with foreign keys, cascade/restrict deletion constraints, unique constraints, and multi-column indexes.

---

## 2. Entity Relationship Model

```
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
     ┌───────────────┬───────┴───────┬────────────────┐
     ▼               ▼               ▼                ▼
┌──────────────┐┌──────────────┐┌──────────────┐┌────────────────┐
│StudentProfile││FacultyProfile││ CollegeAdmin ││ CompanyMember  │
└──────┬───────┘└──────┬───────┘└──────┬───────┘└───────┬────────┘
       │               │               │                │
       ▼               │               ▼                ▼
┌──────────────┐       │         ┌───────────┐    ┌───────────┐
│  Department  ├───────┴────────►│  College  │    │  Company  │
└──────────────┘                 └─────┬─────┘    └─────┬─────┘
                                       │                │
                                       ▼                ▼
                                 ┌────────────────────────────┐
                                 │       Collaboration        │
                                 │      RecruitmentDrive      │
                                 └────────────────────────────┘
```

---

## 3. Schema Models Reference

### 3.1. Identity & Institutional Tenancy

- **User**: Core identity model linked to Clerk via unique `clerkId`. Stores role, status, email, name, avatar, and relation to role profiles.
- **College**: Academic institution tenant. Contains name, code, slug, address, verified status, and relations to departments, students, faculty, and drives.
- **Department**: Sub-division within a college (e.g. CSE, ECE). Scoped uniquely per college via `@@unique([collegeId, code])`.
- **StudentProfile**: Student-specific attributes including roll number, batch year, semester, CGPA, bio, and portfolio links.
- **FacultyProfile**: Academic faculty designation, department association, and verified skill endorsements.
- **CollegeAdminProfile**: Institutional placement officer (TPO) or Dean details.
- **Company**: Enterprise hiring partner with industry sector, size, description, and job listings.
- **CompanyMember**: Recruiters and talent acquisition specialists scoped to a company.

### 3.2. Centralized Skills & Verification

- **Skill**: Centralized taxonomy of skills (e.g., TypeScript, PostgreSQL, Docker) with category classification. Prevents string fragmentation.
- **StudentSkill**: Many-to-many relationship linking a student to a skill, storing proficiency level (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`, `EXPERT`) and verification status (`UNVERIFIED`, `PENDING`, `VERIFIED`, `REJECTED`).
- **SkillVerification**: Audit record of an authorized faculty member evaluating a student skill claim with remarks, timestamp, and status.

### 3.3. Recruitment, Jobs & Applications

- **Job**: Internship or full-time position published by a company. Contains job type, status, compensation, location, and requirements.
- **JobSkill**: Normalized skills required by a job with minimum proficiency level and mandatory flag.
- **Application**: Student submission for a specific job, tracking status (`SUBMITTED`, `UNDER_REVIEW`, `SHORTLISTED`, `INTERVIEWING`, `OFFERED`, `ACCEPTED`, `REJECTED`).
- **Interview**: Scheduled evaluation rounds tied to an application with meeting URLs, feedback, and ratings.
- **Placement**: Formal job offer record tracking CTC package, offer letter URL, and acceptance status.
- **RecruitmentDrive**: On-campus or virtual recruitment events co-hosted by a college and an enterprise company.

### 3.4. AI-Ready Skill Mapping & Collaborations

- **LearningResource**: Educational modules, courses, and documentation linked to centralized skills.
- **LearningProgress**: Tracking student progress percentage and completion across learning resources.
- **SkillGap**: AI-computed gap analysis between a student's verified skills and a target job requirement.
- **SkillMatch**: Pre-computed semantic vector match score between a candidate profile and an active job opening.
- **Collaboration**: Institutional MOUs, centers of excellence, and curriculum sponsorship.
- **TrainingProgram**: Specific workshops conducted under an institutional collaboration.

### 3.5. Platform Governance

- **Notification**: Real-time stakeholder alerts for applications, interviews, and endorsements.
- **AuditLog**: Immutable security event logs with action, entity type, user ID, metadata, and IP address.
- **Invitation**: Cryptographic tokens for onboarding institutional faculty, students, or company recruiters.

---

## 4. Deletion & Referential Integrity Policies

| Relationship | Behavior | Architectural Rationale |
| :--- | :--- | :--- |
| `User` -> `StudentProfile` | `Cascade` | Deleting a user account cleans up their profile. |
| `College` -> `Department` | `Cascade` | Departments are sub-entities of a college. |
| `College` -> `StudentProfile` | `Restrict` | A college cannot be deleted if active students exist. |
| `Department` -> `StudentProfile` | `Restrict` | Prevents accidental deletion of active academic cohorts. |
| `StudentProfile` -> `Application` | `Cascade` | Applications are owned by student candidate. |
| `Job` -> `JobSkill` | `Cascade` | Job skill requirements are owned by the job posting. |
| `Skill` -> `StudentSkill` | `Restrict` | Normalized skills in the catalog cannot be deleted while referenced. |
| `Application` -> `Resume` | `SetNull` | Preserves application history if an old resume is replaced. |
