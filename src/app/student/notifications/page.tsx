import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Clock, Award, Briefcase } from "lucide-react";

export default function StudentNotificationsPage() {
  const notifications = [
    {
      title: "Interview Scheduled with Nexus Cloud",
      message: "Technical Round 1 scheduled for Full-Stack Cloud Engineer Intern role on Nov 4, 2026.",
      time: "10 mins ago",
      type: "interview",
    },
    {
      title: "Skill Claim Endorsed by Faculty",
      message: "Dr. Anita Sharma reviewed and verified your TypeScript advanced competency claim.",
      time: "2 hours ago",
      type: "skill",
    },
    {
      title: "Job Recommendation Match",
      message: "QuantumEdge Robotics published Autonomous Robotics AI Engineer Intern (84% profile match).",
      time: "Yesterday",
      type: "job",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.STUDENT}>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Notifications & Alerts</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Audit log of all recruitment updates, interview invitations, and faculty verifications.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity Log</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border/60">
            {notifications.map((n) => (
              <div key={n.title} className="py-4 flex items-start gap-3">
                <div className="mt-1">
                  {n.type === "interview" && <Clock className="h-4 w-4 text-amber-500" />}
                  {n.type === "skill" && <Award className="h-4 w-4 text-emerald-500" />}
                  {n.type === "job" && <Briefcase className="h-4 w-4 text-primary" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-foreground">{n.title}</p>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
