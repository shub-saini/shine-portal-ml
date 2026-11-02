# Academia–Industry Connect: Role-Based Access Control (RBAC) Specification

## 1. Overview

The platform implements a multi-tier, zero-trust RBAC model. Authentication is managed by **Clerk**, while fine-grained permissions, tenant scoping, and authorization checks are enforced inside application server utilities and Prisma queries.

---

## 2. Roles Hierarchy & Permissions Matrix

### 2.1. STUDENT
- `student.profile.read` - Read own academic and personal profile
- `student.profile.update` - Update biography, portfolio URLs, and social links
- `student.skills.manage` - Add skill claims, attach coursework proofs
- `student.applications.read` - View status of submitted job applications
- `student.applications.create` - Submit applications for eligible openings
- `student.learning.read` - Access recommended courses and skill gap reports

### 2.2. FACULTY
- `faculty.students.read` - View students within assigned department
- `faculty.skills.verify` - Formally verify or reject submitted student skill claims
- `faculty.analytics.read` - Inspect departmental skill distributions and readiness metrics

### 2.3. COLLEGE_ADMIN (Placement Officer / Dean)
- `college.students.manage` - Manage student enrollment, eligibility, and batches
- `college.departments.manage` - Create and modify department structures
- `college.faculty.manage` - Authorize faculty evaluators and department heads
- `college.placements.manage` - Schedule recruitment drives and track placement offers
- `college.analytics.read` - Institutional analytics, CTC distribution, and sector reports
- `college.collaborations.manage` - Negotiate MOUs and joint lab programs with companies
- *Inherits: `faculty.students.read`, `faculty.analytics.read`*

### 2.4. INDUSTRY_RECRUITER
- `company.profile.manage` - Edit corporate profile, brand assets, and headquarters
- `company.jobs.manage` - Create, update, publish, and close job postings
- `company.candidates.read` - Search and view verified candidate profiles
- `company.applications.manage` - Review applicant pipeline and update stage status
- `company.interviews.manage` - Schedule evaluation rounds and input interviewer feedback
- `company.collaborations.manage` - Propose institutional collaborations and joint labs

### 2.5. SUPER_ADMIN
- `admin.users.manage` - Global user directory and role assignments
- `admin.colleges.manage` - Accredit and verify institutional college tenants
- `admin.companies.manage` - Verify and govern corporate hiring partners
- `admin.platform.manage` - Global configuration, security policies, and audit logs
- *Inherits: All platform permissions unconditionally*

---

## 3. Server-Side Authorization API

All sensitive operations must invoke the centralized authorization API located in `src/lib/auth/server-auth.ts`:

```typescript
import {
  getCurrentUser,
  requireAuth,
  requireRole,
  requirePermission,
  requireCollegeAccess,
  requireCompanyAccess,
} from "@/lib/auth/server-auth";
import { UserRole } from "@prisma/client";
import { PERMISSIONS } from "@/lib/authorization/permissions";

// 1. Enforce authentication
const user = await requireAuth();

// 2. Enforce role membership
await requireRole([UserRole.FACULTY, UserRole.COLLEGE_ADMIN]);

// 3. Enforce specific granular permission
await requirePermission(PERMISSIONS.FACULTY_SKILLS_VERIFY);

// 4. Enforce institutional tenant isolation
await requireCollegeAccess(studentProfile.collegeId);

// 5. Enforce corporate tenant isolation
await requireCompanyAccess(jobPosting.companyId);
```

---

## 4. Multi-Tenant Scoping Rules

1. **College Boundary**:
   Faculty and College Admins possess a `collegeId` attribute. Any server operation reading or mutating student data, departments, drives, or faculty rosters asserts:
   ```typescript
   if (user.role !== UserRole.SUPER_ADMIN && user.collegeId !== targetCollegeId) {
     throw new Error("FORBIDDEN: Cross-institution access violation.");
   }
   ```

2. **Company Boundary**:
   Industry Recruiters possess a `companyId` via `CompanyMember`. All job creation, candidate shortlisting, and interview scheduling operations assert:
   ```typescript
   if (user.role !== UserRole.SUPER_ADMIN && user.companyId !== targetCompanyId) {
     throw new Error("FORBIDDEN: Unauthorized company resource access.");
   }
   ```
