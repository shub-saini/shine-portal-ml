import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Briefcase, Building2 } from "lucide-react";

export default function CollegeAnalyticsPage() {
  return (
    <DashboardShell requiredRole={UserRole.COLLEGE_ADMIN}>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Placement & Hiring Analytics</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Longitudinal trends across annual recruitment drives, salary packages, and employer retention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Annual Package Distribution (LPA)</CardTitle>
              <CardDescription className="text-xs">CTC brackets for Batch 2026 offers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { range: "Above ₹ 18 LPA", count: 24, percent: 18 },
                { range: "₹ 12 - 18 LPA", count: 68, percent: 50 },
                { range: "₹ 7 - 12 LPA", count: 32, percent: 24 },
                { range: "₹ 5 - 7 LPA", count: 11, percent: 8 },
              ].map((bracket) => (
                <div key={bracket.range} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-foreground">{bracket.range}</span>
                    <span className="text-muted-foreground font-semibold">{bracket.count} Offers ({bracket.percent}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${bracket.percent * 1.8}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Top Recruiting Industry Sectors</CardTitle>
              <CardDescription className="text-xs">Volume of offers by sector</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {[
                { sector: "Enterprise Cloud & SaaS", offers: 54, share: "40%" },
                { sector: "Autonomous AI & Robotics", offers: 36, share: "26%" },
                { sector: "FinTech & Distributed Ledgers", offers: 28, share: "20%" },
                { sector: "VLSI & Semiconductor", offers: 18, share: "14%" },
              ].map((s) => (
                <div key={s.sector} className="p-3 rounded-lg border border-border flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-foreground">{s.sector}</p>
                    <p className="text-[11px] text-muted-foreground">{s.offers} Total Placements</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{s.share}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
