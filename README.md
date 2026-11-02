# Academia–Industry Connect

> **Next-Generation Academia–Industry Collaboration & Employability Platform**
> A cohesive, production-grade web application connecting students, faculty, college placement officers (TPOs), and corporate recruiters with verified skill telemetry, campus recruitment drives, and AI-driven skill mapping.

---

## 1. Technology Stack

- **Framework**: Next.js 16.4.3 (App Router, Turbopack, React Server Components)
- **Runtime & UI**: React 19.3.0, TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (v4) with shadcn/ui design tokens and CSS variables
- **Component Primitives**: Radix UI, Lucide React icons, next-themes (Light & Dark modes)
- **State & Forms**: React Hook Form, Zod validation, TanStack Query
- **Authentication**: Clerk Authentication & Webhook Sync with Custom Application-Level RBAC
- **Database & ORM**: PostgreSQL with Prisma ORM 6 (Generated client, migrations, relational integrity)
- **AI Integration**: Architectural boundary prepared for Python FastAPI microservice (resume parsing, vector semantic compatibility)

---

## 2. Key Features by Stakeholder Role

| Stakeholder Role | Core Capabilities | Primary Route |
| :--- | :--- | :--- |
| **Student** | Academic profile, skill claim submissions, faculty verification badges, job exploration, 1-click apply, AI skill gap analysis, learning modules | `/student/dashboard` |
| **Faculty** | Department student directory, interactive skill verification queue, endorse/reject proofs, department skill heatmaps | `/faculty/dashboard` |
| **College Admin (TPO)** | Institutional placement rate, recruitment drive scheduling, CTC brackets, department ratios, industry MOUs & joint labs | `/college/dashboard` |
| **Industry Recruiter** | Corporate profile, job vacancy publishing, candidate discovery with match scores, pipeline tracking, interview scheduling | `/industry/dashboard` |
| **Super Admin** | Platform-wide telemetry, college/company accreditation queue, cryptographic audit logs, multi-tenant security policies | `/admin/dashboard` |

---

## 3. Prerequisites

- **Bun** (v1.4+) or **Node.js** (v20.9.0+ LTS)
- **PostgreSQL** database (Local or cloud provider e.g. Neon, Supabase, AWS RDS)
- **Clerk Account** (Optional for live production auth; demo mode works locally without credentials)

---

## 4. Quick Start & Installation

### Step 1: Install Dependencies
```bash
bun install
# or
npm install
```

### Step 2: Configure Environment Variables
Copy the template and supply your credentials:
```bash
cp .env.example .env
```
Key variables documented in `.env.example`:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk public key
- `CLERK_SECRET_KEY`: Clerk secret key
- `NEXT_PUBLIC_ENABLE_DEMO_MODE="true"`: Enables the role switcher for local testing and evaluator preview
- `AI_SERVICE_URL="http://localhost:8000"`: Future Python FastAPI microservice URL

### Step 3: Database Migration & Seeding
Once PostgreSQL is running:
```bash
# Push schema to PostgreSQL database
bun run db:push

# Or run Prisma migrations
bun run db:migrate

# Seed realistic demonstration dataset
bun run db:seed
```

### Step 4: Run Development Server
```bash
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 5. Development & Build Commands

| Command | Action |
| :--- | :--- |
| `bun run dev` | Start Next.js development server with Turbopack |
| `bun run build` | Compile optimized production build and run TypeScript checks |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint verification |
| `bun run db:generate` | Regenerate Prisma Client (`@prisma/client`) |
| `bun run db:push` | Synchronize Prisma schema directly to PostgreSQL |
| `bun run db:migrate` | Create and apply database migrations |
| `bun run db:seed` | Seed demonstration college, students, faculty, jobs, and skills |
| `bun run db:studio` | Open Prisma Studio database GUI |

---

## 6. Architecture & Documentation Directory

Comprehensive architectural specifications are located in the `docs/` folder:
- [docs/architecture.md](docs/architecture.md): Topology, modular monolith decomposition, and security threat modeling
- [docs/database-design.md](docs/database-design.md): Full relational model, foreign key behaviors, and entity relationships
- [docs/rbac.md](docs/rbac.md): Role permissions matrix, server-side authorization API, and multi-tenant isolation
- [docs/api-contracts.md](docs/api-contracts.md): Next.js Route Handlers and Python FastAPI AI microservice contracts
- [docs/development-roadmap.md](docs/development-roadmap.md): Progress checklist and future milestones

---

## 7. Interactive Role Switcher in Demo Mode

When evaluating locally without active Clerk cloud keys:
1. Navigate to any page or click **"Launch Portal"** on the landing page.
2. The top navigation bar includes an interactive **Role Switcher** dropdown.
3. Switch instantly between **Student**, **Faculty**, **College TPO**, **Industry Recruiter**, and **Super Admin** to inspect the isolated interfaces and workflows.
