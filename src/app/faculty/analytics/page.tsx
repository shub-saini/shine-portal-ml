import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Award, Briefcase } from "lucide-react";

export default function FacultyAnalyticsPage() {
  return (
    <DashboardShell requiredRole={UserRole.FACULTY}>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Cohort Skill Analytics</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Aggregate skill heatmaps, curriculum performance, and placement telemetry for Computer Science & Engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Skill Endorsement Velocity</CardTitle>
              <CardDescription className="text-xs">Monthly faculty verifications completed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { month: "August 2026", count: 28, percent: 60 },
                { month: "September 2026", count: 45, percent: 90 },
                { month: "October 2026", count: 52, percent: 100 },
              ].map((m) => (
                <div key={m.month} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-foreground">{m.month}</span>
                    <span className="text-muted-foreground font-semibold">{m.count} Claims Endorsed</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${m.percent}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Emerging Domain Distribution</CardTitle>
              <CardDescription className="text-xs">Student elective & capstone specializations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {[
                { domain: "Cloud & Distributed Systems", students: 58, percent: 39 },
                { domain: "Artificial Intelligence & ML", students: 52, percent: 35 },
                { domain: "Autonomous Robotics & Edge AI", students: 38, percent: 26 },
              ].map((d) => (
                <div key={d.domain} className="p-3 rounded-lg border border-border flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-foreground">{d.domain}</p>
                    <p className="text-[11px] text-muted-foreground">{d.students} Students Specializing</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{d.percent}% of Cohort</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
