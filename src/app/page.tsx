import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Building2,
  Briefcase,
  CheckCircle2,
  Users,
  ShieldCheck,
  TrendingUp,
  BrainCircuit,
  Award,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-foreground">
                Academia<span className="text-primary">Industry</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                Collaboration Portal
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#portals" className="hover:text-foreground transition-colors">
              Stakeholder Portals
            </Link>
            <Link href="#capabilities" className="hover:text-foreground transition-colors">
              Capabilities
            </Link>
            <Link href="#architecture" className="hover:text-foreground transition-colors">
              Architecture
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="text-xs">
                Sign In
              </Button>
            </Link>
            <Link href="/student/dashboard">
              <Button size="sm" className="gap-1.5 text-xs shadow-md shadow-primary/20">
                Launch Portal <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 border-b border-border/40">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="mx-auto max-w-5xl px-6 text-center space-y-8">
          <Badge variant="outline" className="px-3 py-1 gap-2 text-xs border-primary/30 bg-primary/5 text-primary">
            <BrainCircuit className="h-3.5 w-3.5" /> Next-Generation Academia–Industry Employability Infrastructure
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Bridging the Chasm Between <br />
            <span className="bg-gradient-to-r from-primary via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Higher Education & Industry Demands
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            A cohesive, multi-tenant enterprise portal unifying students, faculty, college placement cells,
            and corporate recruiters. Featuring verified skill telemetry, recruitment drive orchestration, and
            AI-driven compatibility scoring.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/student/dashboard">
              <Button size="lg" className="gap-2 text-sm px-6 h-11 shadow-lg shadow-primary/25">
                <GraduationCap className="h-4 w-4" /> Enter as Student
              </Button>
            </Link>
            <Link href="/industry/dashboard">
              <Button size="lg" variant="outline" className="gap-2 text-sm px-6 h-11">
                <Briefcase className="h-4 w-4" /> Recruiter Console
              </Button>
            </Link>
            <Link href="/college/dashboard">
              <Button size="lg" variant="secondary" className="gap-2 text-sm px-6 h-11">
                <Building2 className="h-4 w-4" /> College TPO Hub
              </Button>
            </Link>
          </div>

          {/* Social Proof / Metrics Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border/60 max-w-4xl mx-auto">
            <div className="space-y-1">
              <p className="text-3xl font-extrabold text-foreground tracking-tight">120+</p>
              <p className="text-xs text-muted-foreground font-medium">Partner Colleges & Universities</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold text-primary tracking-tight">94.2%</p>
              <p className="text-xs text-muted-foreground font-medium">Placement Conversion Rate</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold text-foreground tracking-tight">350+</p>
              <p className="text-xs text-muted-foreground font-medium">Verified Enterprise Recruiters</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">18,500+</p>
              <p className="text-xs text-muted-foreground font-medium">Faculty-Verified Skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Stakeholder Portals Showcase */}
      <section id="portals" className="py-20 bg-muted/20 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6 space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="secondary" className="text-xs">Dedicated Workflows</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Engineered for Every Stakeholder
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Role-based isolation and specialized interfaces tailored for each key actor in the recruitment lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Student */}
            <Card className="hover:border-primary/40 transition-all hover:shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Student Portal</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Manage academic credentials, submit skills for faculty verification, explore internships, and track applications.
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Verified Skill Badges</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> AI Skill Gap Analysis</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 1-Click Campus & Off-Campus Apply</li>
                </ul>
                <Link href="/student/dashboard" className="block pt-2">
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                    Launch Student View <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Faculty */}
            <Card className="hover:border-primary/40 transition-all hover:shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Faculty Portal</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Review and endorse student skill claims with academic proof, monitor department performance, and mentor students.
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Skill Verification Queue</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Department Skill Heatmaps</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Mentorship Logs</li>
                </ul>
                <Link href="/faculty/dashboard" className="block pt-2">
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                    Launch Faculty View <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* College Admin / TPO */}
            <Card className="hover:border-primary/40 transition-all hover:shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Placement Officer (TPO)</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Orchestrate campus recruitment drives, track department placement rates, manage company relationships and MOUs.
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> Recruitment Drive Scheduler</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> CTC Package Distributions</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> Industry MOU Tracking</li>
                </ul>
                <Link href="/college/dashboard" className="block pt-2">
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                    Launch TPO View <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Industry Recruiter */}
            <Card className="hover:border-primary/40 transition-all hover:shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Industry Recruiter</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Post roles, discover verified candidates, evaluate skill match compatibility scores, and schedule candidate interviews.
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-purple-600" /> Semantic Skill Matching</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-purple-600" /> Pipeline Kanban & Interview Tool</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-purple-600" /> Joint Lab Proposals</li>
                </ul>
                <Link href="/industry/dashboard" className="block pt-2">
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                    Launch Recruiter View <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Super Admin */}
            <Card className="hover:border-primary/40 transition-all hover:shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Super Administrator</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Verify institutional tenants, govern system-wide security, audit logs, and monitor platform-wide telemetry.
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-rose-600" /> College & Corporate Verification</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-rose-600" /> Comprehensive Audit Logging</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-rose-600" /> Cross-Tenant Governance</li>
                </ul>
                <Link href="/admin/dashboard" className="block pt-2">
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                    Launch Admin View <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Future AI Microservice Boundary */}
            <Card className="hover:border-primary/40 transition-all hover:shadow-md border-primary/20 bg-primary/[0.02]">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Python FastAPI AI Engine</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Clean decoupled integration boundary prepared for AI resume parsing, semantic embedding matching, and gap analysis.
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-sky-600" /> Async JSON API Contracts</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-sky-600" /> Vector Skill Compatibility Index</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-sky-600" /> Tailored Curricular Recommendations</li>
                </ul>
                <div className="pt-2">
                  <Badge variant="outline" className="w-full justify-center text-xs py-1.5 bg-sky-500/10 text-sky-600 border-sky-500/20">
                    Integration Boundary Documented
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card text-xs text-muted-foreground mt-auto">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Academia–Industry Connect. Production Architecture Foundation.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-foreground">About Platform</Link>
            <Link href="/colleges" className="hover:text-foreground">Colleges</Link>
            <Link href="/companies" className="hover:text-foreground">Companies</Link>
            <span className="text-primary font-medium">Next.js 16 • Prisma • Clerk • Tailwind</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
