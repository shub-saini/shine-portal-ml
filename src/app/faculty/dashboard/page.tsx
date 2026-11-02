import Link from "next/link";
import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Building2,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { DEMO_FACULTY, DEMO_COLLEGE, DEMO_DEPARTMENTS } from "@/lib/db/demo-data";

export default function FacultyDashboardPage() {
  const pendingClaims = [
    {
      id: "clm_1",
      studentName: "Aarav Patel",
      rollNo: "22CSE042",
      skill: "PostgreSQL",
      level: "Intermediate",
      submittedDate: "Oct 28, 2026",
      proof: "Database Indexing & ACID Transactions Capstone Lab",
      proofUrl: "https://github.com/aaravpatel/db-lab",
    },
    {
      id: "clm_2",
      studentName: "Priya Nair",
      rollNo: "22CSE018",
      skill: "React",
      level: "Advanced",
      submittedDate: "Oct 29, 2026",
      proof: "Full-Stack E-Commerce Mini-Project with Custom State Store",
      proofUrl: "https://github.com/priyanair/ecommerce-react",
    },
    {
      id: "clm_3",
      studentName: "Rohan Gupta",
      rollNo: "22CSE089",
      skill: "Docker",
      level: "Intermediate",
      submittedDate: "Oct 30, 2026",
      proof: "Microservices Orchestration Lab Report",
      proofUrl: "https://github.com/rohangupta/docker-compose-lab",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.FACULTY}>
      <div className="space-y-6">
        {/* Faculty Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                  {DEMO_FACULTY.designation}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {DEMO_DEPARTMENTS[0].name}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Welcome, {DEMO_FACULTY.user.firstName}! 🎓
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
                Review student-submitted technical skill proofs, verify claims for corporate recruiters, and monitor department readiness.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/faculty/skill-verification">
                <Button size="sm" className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20">
                  <CheckCircle2 className="h-4 w-4" /> Open Verification Queue (3)
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Pending Verification"
            value="3 Claims"
            change="Action Required"
            isPositive={false}
            subtitle="Requires faculty sign-off"
            icon={Clock}
            iconColor="text-amber-600 bg-amber-500/10"
          />
          <StatCard
            title="Verified Skills"
            value="42 Skills"
            change="↑ 8 this week"
            isPositive={true}
            subtitle="Department CSE Cohort"
            icon={Award}
            iconColor="text-emerald-600 bg-emerald-500/10"
          />
          <StatCard
            title="Department Students"
            value="148 Students"
            change="Batch 2026"
            isPositive={true}
            subtitle="Enrolled in placement drives"
            icon={Users}
            iconColor="text-blue-600 bg-blue-500/10"
          />
          <StatCard
            title="Department Employability"
            value="92.4%"
            change="↑ 4.1% YoY"
            isPositive={true}
            subtitle="Placement Readiness Index"
            icon={TrendingUp}
            iconColor="text-purple-600 bg-purple-500/10"
          />
        </div>

        {/* Interactive Pending Verification Queue */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base">Pending Skill Claims Queue</CardTitle>
              <CardDescription className="text-xs">
                Inspect academic proof or GitHub artifacts submitted by students before endorsing
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">3 Unreviewed</Badge>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border/60">
              {pendingClaims.map((claim) => (
                <div key={claim.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-xs text-foreground">{claim.studentName}</h4>
                      <span className="text-[11px] text-muted-foreground">({claim.rollNo})</span>
                      <Badge variant="outline" className="text-[10px] font-semibold text-primary">
                        {claim.skill}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px]">Level: {claim.level}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Proof: <span className="text-foreground">{claim.proof}</span>
                    </p>
                    <Link href={claim.proofUrl} target="_blank" className="text-[11px] text-primary hover:underline inline-flex items-center gap-1">
                      Inspect Repository Artifact <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button size="sm" variant="outline" className="h-8 text-xs text-rose-600 hover:bg-rose-500/10 border-rose-500/20 gap-1">
                      <XCircle className="h-3.5 w-3.5" /> Reject / Notes
                    </Button>
                    <Button size="sm" className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1 shadow-sm">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Verify Skill Claim
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Skills Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Most Endorsed Technologies</CardTitle>
              <CardDescription className="text-xs">Department skill distribution (CSE)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "TypeScript / JavaScript", count: 112, percent: 85 },
                { name: "PostgreSQL & Database Systems", count: 98, percent: 74 },
                { name: "Python / Data Science", count: 91, percent: 69 },
                { name: "React / Modern Frontend", count: 86, percent: 65 },
                { name: "Docker & Cloud Native", count: 64, percent: 48 },
              ].map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-muted-foreground font-semibold">{item.count} Students ({item.percent}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Assigned Mentee Cohort</CardTitle>
              <CardDescription className="text-xs">Students requiring final-year placement mentoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Aarav Patel", roll: "22CSE042", cgpa: 8.84, target: "Nexus Cloud", status: "Interviewing" },
                { name: "Priya Nair", roll: "22CSE018", cgpa: 9.12, target: "QuantumEdge", status: "Shortlisted" },
                { name: "Rohan Gupta", roll: "22CSE089", cgpa: 8.42, target: "Nexus Cloud", status: "Skill Review" },
              ].map((mentee) => (
                <div key={mentee.roll} className="p-3 rounded-lg border border-border flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-foreground">{mentee.name}</p>
                    <p className="text-[11px] text-muted-foreground">Roll: {mentee.roll} • CGPA: {mentee.cgpa}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-[10px]">{mentee.status}</Badge>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{mentee.target}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
