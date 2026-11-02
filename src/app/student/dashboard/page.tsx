import Link from "next/link";
import { UserRole, VerificationStatus, ApplicationStatus } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  Briefcase,
  CalendarDays,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileCheck,
} from "lucide-react";
import {
  DEMO_STUDENT,
  DEMO_STUDENT_SKILLS,
  DEMO_APPLICATIONS,
  DEMO_JOBS,
  DEMO_INTERVIEWS,
} from "@/lib/db/demo-data";

export default async function StudentDashboardPage() {
  const verifiedSkillsCount = DEMO_STUDENT_SKILLS.filter(
    (s) => s.verificationStatus === VerificationStatus.VERIFIED
  ).length;

  return (
    <DashboardShell requiredRole={UserRole.STUDENT}>
      <div className="space-y-6">
        {/* Welcome & Profile Summary Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                  Student Console • Batch 2026
                </Badge>
                <Badge variant="success" className="text-xs">
                  Academic Standing: Good (CGPA: {DEMO_STUDENT.cgpa})
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Welcome back, {DEMO_STUDENT.user.firstName}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
                {DEMO_STUDENT.headline}
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end space-y-2 bg-card/80 backdrop-blur-sm p-4 rounded-xl border border-border shrink-0">
              <div className="flex items-center justify-between w-full sm:w-44 text-xs">
                <span className="text-muted-foreground font-medium">Profile Score</span>
                <span className="font-bold text-primary">85%</span>
              </div>
              <Progress value={85} className="h-2 w-full sm:w-44" />
              <Link href="/student/profile" className="text-[11px] text-primary hover:underline font-medium inline-flex items-center gap-1">
                Complete Certifications (+15%) <ArrowRight className="h-2.5 w-2.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Verified Skills"
            value={`${verifiedSkillsCount} / ${DEMO_STUDENT_SKILLS.length}`}
            change="1 Pending"
            isPositive={true}
            subtitle="Faculty Endorsed Skills"
            icon={Award}
            iconColor="text-emerald-600 bg-emerald-500/10"
          />
          <StatCard
            title="Active Applications"
            value={DEMO_APPLICATIONS.length}
            change="In Pipeline"
            isPositive={true}
            subtitle="1 Shortlisted for Interview"
            icon={Briefcase}
            iconColor="text-blue-600 bg-blue-500/10"
          />
          <StatCard
            title="Upcoming Interviews"
            value={DEMO_INTERVIEWS.length}
            change="Next 4 Days"
            isPositive={true}
            subtitle="Technical Round 1"
            icon={CalendarDays}
            iconColor="text-amber-600 bg-amber-500/10"
          />
          <StatCard
            title="Avg Skill Match"
            value="88%"
            change="↑ 6% this month"
            isPositive={true}
            subtitle="AI Job Compatibility"
            icon={Sparkles}
            iconColor="text-purple-600 bg-purple-500/10"
          />
        </div>

        {/* Upcoming Interview Alert Box */}
        {DEMO_INTERVIEWS.length > 0 && (
          <Card className="border-amber-500/30 bg-amber-500/[0.04]">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-semibold text-foreground">
                      Upcoming Interview: {DEMO_INTERVIEWS[0].jobTitle}
                    </h4>
                    <Badge variant="warning" className="text-[10px]">Scheduled</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {DEMO_INTERVIEWS[0].companyName} • With {DEMO_INTERVIEWS[0].interviewer} • 45 mins
                  </p>
                </div>
              </div>
              <Link href={DEMO_INTERVIEWS[0].meetingUrl} target="_blank">
                <Button size="sm" className="text-xs gap-1.5 bg-amber-600 hover:bg-amber-700 text-white shadow-sm">
                  Join Google Meet <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Main Grid: Skills & Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 spans): Verified Skills & Application Tracker */}
          <div className="lg:col-span-2 space-y-6">
            {/* Verified Skills */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base">Skill Endorsements & Proof</CardTitle>
                  <CardDescription className="text-xs">
                    Academic verification status endorsed by department faculty
                  </CardDescription>
                </div>
                <Link href="/student/skills">
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    Manage Skills
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="divide-y divide-border/60">
                  {DEMO_STUDENT_SKILLS.map((item) => (
                    <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-foreground">{item.skill.name}</span>
                          <Badge variant="outline" className="text-[10px] font-normal">
                            {item.level}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">({item.skill.category})</span>
                        </div>
                        {item.remarks && (
                          <p className="text-[11px] text-muted-foreground italic">&ldquo;{item.remarks}&rdquo;</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.verificationStatus === VerificationStatus.VERIFIED && (
                          <Badge variant="success" className="text-[10px] gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Verified by {item.verifiedBy?.split(" ")[1]}
                          </Badge>
                        )}
                        {item.verificationStatus === VerificationStatus.PENDING && (
                          <Badge variant="warning" className="text-[10px] gap-1">
                            <Clock className="h-3 w-3" /> Pending Review
                          </Badge>
                        )}
                        {item.verificationStatus === VerificationStatus.UNVERIFIED && (
                          <Badge variant="outline" className="text-[10px] text-muted-foreground">
                            Self Claimed
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Applications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base">Application Tracker</CardTitle>
                  <CardDescription className="text-xs">
                    Real-time status of your internship and recruitment submissions
                  </CardDescription>
                </div>
                <Link href="/student/applications">
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-primary hover:underline">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border/60">
                  {DEMO_APPLICATIONS.map((app) => (
                    <div key={app.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-foreground">{app.job.title}</h4>
                          <Badge variant="outline" className="text-[10px]">
                            {app.job.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {app.job.company.name} • Applied on {app.appliedAt}
                        </p>
                        <p className="text-[11px] text-primary font-medium">Stage: {app.currentRound}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[10px] text-muted-foreground block">AI Match</span>
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            {app.matchScore}%
                          </span>
                        </div>
                        <Badge
                          variant={
                            app.status === ApplicationStatus.INTERVIEWING
                              ? "warning"
                              : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {app.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column (1 span): AI Skill Gap & Job Recommendations */}
          <div className="space-y-6">
            {/* AI Skill Gap Card */}
            <Card className="border-primary/30 bg-primary/[0.02]">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm font-semibold">AI Skill Gap Analysis</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Target: Full-Stack Cloud Engineer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  You match <strong>92%</strong> of the required core stack. Bridging these key competencies will maximize your recruiter outreach:
                </p>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg border border-border bg-background space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">Docker / Containerization</span>
                      <Badge variant="warning" className="text-[9px]">Gap: Intermediate</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Target role mandates multi-stage Docker builds.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg border border-border bg-background space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">Microservices System Design</span>
                      <Badge variant="info" className="text-[9px]">Recommended</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Strengthen event-driven caching patterns.
                    </p>
                  </div>
                </div>

                <Link href="/student/skill-gap" className="block pt-1">
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1">
                    Run Custom Gap Analysis <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Opportunities Feed */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Recommended Openings</CardTitle>
                <CardDescription className="text-xs">
                  Matched via verified skill profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {DEMO_JOBS.slice(1, 3).map((job) => (
                  <div key={job.id} className="p-3 rounded-lg border border-border hover:border-primary/40 transition-colors space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-foreground leading-tight">{job.title}</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{job.company.name}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] shrink-0">
                        {job.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[11px] text-muted-foreground">{job.location}</span>
                      <Link href={`/student/opportunities`}>
                        <Button variant="ghost" size="sm" className="h-6 text-[11px] text-primary p-0 hover:underline">
                          View Role →
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
