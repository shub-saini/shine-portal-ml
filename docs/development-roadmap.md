# Academia–Industry Connect: Development Roadmap

## Phase Progress Checklist

### ✅ PHASE 1: Project Foundation (Completed)
- [x] Workspace inspection and Next.js 16 App Router configuration
- [x] TypeScript strict mode (`tsconfig.json`)
- [x] Tailwind CSS (v4) with shadcn/ui design tokens and CSS variables
- [x] Complete Prisma relational schema with 25+ models and 14 enums
- [x] Prisma Client generation (`@prisma/client` v6.19.3)
- [x] Comprehensive database seed script (`prisma/seed.ts`)
- [x] Environment variable definitions and documentation (`.env.example`)
- [x] Centralized project folder structure under `src/`

### ✅ PHASE 2: Authentication & Authorization (Completed)
- [x] Clerk authentication integration with webhook synchronization
- [x] Centralized RBAC permissions system (`src/lib/authorization/permissions.ts`)
- [x] Server-side authorization helpers (`requireAuth`, `requireRole`, `requirePermission`, `requireCollegeAccess`, `requireCompanyAccess`)
- [x] Multi-tenant isolation logic for colleges and enterprise companies
- [x] Interactive role switcher for rapid developer/evaluator preview
- [x] Protected dashboard routes and role redirection matrix

### ✅ PHASE 3: Application Shell & UI Design System (Completed)
- [x] Reusable shadcn/ui component library (Button, Card, Badge, Dialog, Sheet, Table, Progress, Tabs, DropdownMenu, Avatar, Input, Textarea, Separator, Skeleton)
- [x] Modern enterprise theme with dark/light mode switching (`next-themes`)
- [x] Unified responsive dashboard shell (`src/components/dashboard/dashboard-shell.tsx`)
- [x] Role-aware dynamic sidebar with active state highlights and collapsible navigation
- [x] Dashboard top header with global search, notifications drawer, and user menu
- [x] Breadcrumb navigation trail

### ✅ PHASE 4: Initial Functional Stakeholder Dashboards (Completed)
- [x] Public Landing Page with stakeholder portal showcase, metrics, and value propositions
- [x] Student Dashboard (verified skills, application pipeline, AI skill gap alerts, upcoming interviews)
- [x] Faculty Dashboard (skill verification queue, department skill telemetry, student mentee cohort)
- [x] College Admin / TPO Dashboard (campus recruitment drives, department placement rates, corporate MOUs)
- [x] Industry Recruiter Dashboard (job postings, candidate discovery, pipeline tracking, interview schedule)
- [x] Super Admin Dashboard (platform telemetry, institutional accreditation review, security audit log)
- [x] Full set of sub-pages across all 5 roles (skills, applications, profiles, candidates, drives, settings)

---

## 🔮 Future Milestone Phases

### PHASE 5: Live Database Migration & External Clerk Connection
- [ ] Spin up hosted or local PostgreSQL database instance (`createdb academia_industry`)
- [ ] Run `bun run db:push` or `bun run db:migrate` to instantiate tables and foreign keys
- [ ] Execute `bun run db:seed` to populate initial demo college, companies, and students
- [ ] Configure live Clerk project keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`)

### PHASE 6: Python FastAPI AI Engine Implementation
- [ ] Implement FastAPI microservice repository with Uvicorn
- [ ] Integrate PyPDF / pdfplumber for resume parsing and text extraction
- [ ] Implement Sentence Transformers (`all-MiniLM-L6-v2`) for semantic skill embeddings
- [ ] Connect Next.js server actions to FastAPI endpoint for real-time compatibility score computation

### PHASE 7: Advanced Collaboration & Recruitment Workflows
- [ ] WebRTC video interview integration
- [ ] PDF Offer Letter generation with digital signatures
- [ ] Multi-party MOU contract workflows between university deans and corporate VPs
- [ ] Automated email and WhatsApp alerts for campus recruitment drives
