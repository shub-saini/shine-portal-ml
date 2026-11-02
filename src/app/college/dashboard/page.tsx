import Link from "next/link";
import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Briefcase,
  TrendingUp,
  Handshake,
  CalendarDays,
  Users,
  GraduationCap,
  ArrowRight,
  PlusCircle,
  ExternalLink,
} from "lucide-react";
import {
  DEMO_COLLEGE_ADMIN,
  DEMO_COLLEGE,
  DEMO_DEPARTMENTS,
  DEMO_COLLABORATIONS,
} from "@/lib/db/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function CollegeAdminDashboardPage() {
  const upcomingDrives = [
    {
      company: "Nexus Cloud Innovations",
      role: "Cloud Software Engineer (FTE)",
      date: "Nov 12, 2026",
      package: "₹ 14 - 22 LPA",
      eligibility: "CSE / ECE • CGPA >= 7.5",
      registeredCount: 94,
      status: "Upcoming",
    },
    {
      company: "QuantumEdge Robotics",
      role: "Robotics AI Engineer Intern",
      date: "Nov 18, 2026",
      package: "₹ 40,000 / mo",
      eligibility: "CSE / ECE • CGPA >= 7.0",
      registeredCount: 68,
      status: "Upcoming",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.COLLEGE_ADMIN}>
      <div className="space-y-6">
        {/* TPO Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                  {DEMO_COLLEGE_ADMIN.title}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {DEMO_COLLEGE.name} ({DEMO_COLLEGE.code})
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Placement & Industry Relations Hub 🏛️
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
                Coordinate institutional recruitment drives, track department-wide placement ratios, and foster enterprise collaborations.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/college/placements">
                <Button size="sm" className="gap-1.5 text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20">
                  <PlusCircle className="h-4 w-4" /> Schedule Recruitment Drive
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Placement Conversion"
            value="86.4%"
            change="↑ 5.2% YoY"
            isPositive={true}
            subtitle="Batch 2026 Graduating Class"
            icon={TrendingUp}
            iconColor="text-emerald-600 bg-emerald-500/10"
          />
          <StatCard
            title="Average CTC Package"
            value="₹ 11.2 LPA"
            change="↑ ₹ 1.8 LPA"
            isPositive={true}
            subtitle="Highest Offer: ₹ 34 LPA"
            icon={Briefcase}
            iconColor="text-blue-600 bg-blue-500/10"
          />
          <StatCard
            title="Scheduled Drives"
            value="4 Drives"
            change="Next 30 Days"
            isPositive={true}
            subtitle="Tier-1 Enterprise Partners"
            icon={CalendarDays}
            iconColor="text-amber-600 bg-amber-500/10"
          />
          <StatCard
            title="Industry MOUs"
            value="8 Active"
            change="2 CoEs"
            isPositive={true}
            subtitle="Joint Labs & Sponsoring"
            icon={Handshake}
            iconColor="text-purple-600 bg-purple-500/10"
          />
        </div>

        {/* Upcoming Campus Placement Drives */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base">Campus Placement Drives Schedule</CardTitle>
              <CardDescription className="text-xs">
                Upcoming on-campus and virtual recruitment sessions
              </CardDescription>
            </div>
            <Link href="/college/placements">
              <Button variant="ghost" size="sm" className="h-7 text-xs text-primary hover:underline">
                View All Drives
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border/60">
              {upcomingDrives.map((drive) => (
                <div key={drive.company} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-xs text-foreground">{drive.company}</h4>
                      <Badge variant="outline" className="text-[10px]">{drive.role}</Badge>
                      <Badge variant="warning" className="text-[10px]">{drive.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Drive Date: <span className="font-medium text-foreground">{drive.date}</span> • Package: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{drive.package}</span>
                    </p>
                    <p className="text-[11px] text-muted-foreground">Criteria: {drive.eligibility}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-bold text-primary">{drive.registeredCount}</span>
                      <span className="text-[10px] text-muted-foreground block">Eligible Students</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-8 text-xs">
                      Manage Roster
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Ratios & Industry Collaborations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Department Placement Comparison</CardTitle>
              <CardDescription className="text-xs">Current batch offer conversion rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-foreground">Computer Science & Engineering</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">92% Placed (136 / 148)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "92%" }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-foreground">Electronics & Communication Engineering</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">81% Placed (97 / 120)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: "81%" }} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Active Corporate Collaborations</CardTitle>
              <CardDescription className="text-xs">Joint research and lab sponsorship programs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {DEMO_COLLABORATIONS.map((collab) => (
                <div key={collab.id} className="p-3 rounded-lg border border-border space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">{collab.title}</p>
                    <Badge variant="success" className="text-[10px]">{collab.status}</Badge>
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed line-clamp-1">
                    {collab.description}
                  </p>
                  <div className="flex justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                    <span>Partner: {collab.company.name}</span>
                    <span className="text-primary font-medium">{collab.studentsTrained} Students Trained</span>
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
