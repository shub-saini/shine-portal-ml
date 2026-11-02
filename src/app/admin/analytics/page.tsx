import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, GraduationCap, Building2, Server } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <DashboardShell requiredRole={UserRole.SUPER_ADMIN}>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Platform-Wide Ecosystem Analytics</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Cross-tenant traffic, verified skills volume, recruitment drive throughput, and system health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">System Throughput & Telemetry</CardTitle>
              <CardDescription className="text-xs">Database transaction and query latency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {[
                { metric: "API Response P95", value: "42 ms", status: "Optimal" },
                { metric: "Database Connection Pool", value: "14 / 50 Active", status: "Healthy" },
                { metric: "Audit Event Ingestion Rate", value: "320 events / min", status: "Normal" },
                { metric: "Clerk Session Token Verification", value: "99.99% Success", status: "Optimal" },
              ].map((m) => (
                <div key={m.metric} className="p-3 rounded-lg border border-border flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-foreground">{m.metric}</p>
                    <p className="text-[11px] text-muted-foreground">{m.value}</p>
                  </div>
                  <Badge variant="success" className="text-[10px]">{m.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Ecosystem Growth Ratios</CardTitle>
              <CardDescription className="text-xs">Month-over-month tenant expansion</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-foreground">College Tenant Onboarding</span>
                  <span className="font-bold text-primary">↑ 18% MoM</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "78%" }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-foreground">Corporate Hiring Partners</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">↑ 24% MoM</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: "84%" }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-foreground">Student Skill Verification Velocity</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">↑ 31% MoM</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: "91%" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
