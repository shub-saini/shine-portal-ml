import Link from "next/link";
import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Users,
  CalendarDays,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Search,
  CheckCircle2,
  Building2,
  Filter,
} from "lucide-react";
import {
  DEMO_RECRUITER,
  DEMO_COMPANIES,
  DEMO_JOBS,
  DEMO_APPLICATIONS,
} from "@/lib/db/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function IndustryRecruiterDashboardPage() {
  const companyJobs = DEMO_JOBS.filter((j) => j.companyId === DEMO_COMPANIES[0].id);

  const candidatePipeline = [
    {
      name: "Aarav Patel",
      roll: "22CSE042 (Apex Inst.)",
      role: "Full-Stack Cloud Engineer Intern",
      score: 92,
      skills: ["TypeScript (Adv)", "React (Adv)", "PostgreSQL (Int)"],
      stage: "Technical Round 2",
    },
    {
      name: "Priya Nair",
      roll: "22CSE018 (Apex Inst.)",
      role: "Full-Stack Cloud Engineer Intern",
      score: 88,
      skills: ["React (Adv)", "TypeScript (Int)", "Next.js (Int)"],
      stage: "Under Review",
    },
    {
      name: "Vikram Sengupta",
      roll: "22CSE102 (Apex Inst.)",
      role: "Software Engineer (FTE)",
      score: 85,
      skills: ["System Design", "PostgreSQL", "Go"],
      stage: "Shortlisted",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.INDUSTRY_RECRUITER}>
      <div className="space-y-6">
        {/* Recruiter Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
                  {DEMO_RECRUITER.designation}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {DEMO_COMPANIES[0].name}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Recruiter Talent Console 💼
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
                Discover pre-verified engineering talent with faculty endorsements and AI semantic skill matching.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/industry/jobs/create">
                <Button size="sm" className="gap-1.5 text-xs bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20">
                  <PlusCircle className="h-4 w-4" /> Post New Opening
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Live Openings"
            value={`${companyJobs.length} Active`}
            change="5 Slots Open"
            isPositive={true}
            subtitle="Cloud & Distributed Systems"
            icon={Briefcase}
            iconColor="text-purple-600 bg-purple-500/10"
          />
          <StatCard
            title="Active Pipeline"
            value="18 Applicants"
            change="↑ 6 New Today"
            isPositive={true}
            subtitle="Campus & Direct"
            icon={Users}
            iconColor="text-blue-600 bg-blue-500/10"
          />
          <StatCard
            title="Scheduled Interviews"
            value="3 Interviews"
            change="Next 48 Hours"
            isPositive={true}
            subtitle="Technical Rounds 1 & 2"
            icon={CalendarDays}
            iconColor="text-amber-600 bg-amber-500/10"
          />
          <StatCard
            title="Match Accuracy"
            value="91.2%"
            change="Vector Semantic"
            isPositive={true}
            subtitle="Skill Alignment Index"
            icon={Sparkles}
            iconColor="text-emerald-600 bg-emerald-500/10"
          />
        </div>

        {/* Top Matched Candidates Discovery */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base">Top Matched Candidate Pipeline</CardTitle>
              <CardDescription className="text-xs">
                Ranked by faculty-verified skill compatibility and academic excellence
              </CardDescription>
            </div>
            <Link href="/industry/candidates">
              <Button variant="ghost" size="sm" className="h-7 text-xs text-primary hover:underline">
                Explore All Candidates
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border/60">
              {candidatePipeline.map((c) => (
                <div key={c.name} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-xs text-foreground">{c.name}</h4>
                      <span className="text-[11px] text-muted-foreground">{c.roll}</span>
                      <Badge variant="outline" className="text-[10px]">{c.stage}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Target Role: {c.role}</p>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {c.skills.map((sk) => (
                        <Badge key={sk} variant="secondary" className="text-[10px]">
                          <CheckCircle2 className="h-2.5 w-2.5 mr-1 text-emerald-500" />
                          {sk}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">{c.score}% Match</span>
                      <span className="text-[10px] text-muted-foreground">Skill Index</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 text-xs">
                        Review Dossier
                      </Button>
                      <Button size="sm" className="h-8 text-xs bg-purple-600 hover:bg-purple-700 text-white shadow-sm">
                        Schedule Interview
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Job Openings List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base">Active Postings for Nexus Cloud Innovations</CardTitle>
              <CardDescription className="text-xs">Manage requirements and application flows</CardDescription>
            </div>
            <Link href="/industry/jobs">
              <Button variant="ghost" size="sm" className="h-7 text-xs text-primary hover:underline">
                Manage All Openings
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border/60">
              {companyJobs.map((job) => (
                <div key={job.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold text-foreground">{job.title}</h4>
                      <Badge variant="outline" className="text-[10px]">{job.type}</Badge>
                      <Badge variant="success" className="text-[10px]">{job.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {job.location} • {job.stipendMonthly ? `${formatCurrency(job.stipendMonthly)} / mo` : formatCurrency(job.salaryMin || 0) + " LPA"} • {job.openings} Openings
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">12 Candidates Applied</span>
                    <Link href={`/industry/jobs/${job.id}`}>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        View Pipeline →
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
