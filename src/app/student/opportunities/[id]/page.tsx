import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { DEMO_JOBS } from "@/lib/db/demo-data";
import { formatCurrency } from "@/lib/utils";

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = DEMO_JOBS.find((j) => j.id === id) || DEMO_JOBS[0];

  return (
    <DashboardShell requiredRole={UserRole.STUDENT}>
      <div className="space-y-6 max-w-4xl">
        <Link href="/student/opportunities" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Opportunities
        </Link>

        <Card>
          <CardHeader className="space-y-3 pb-4 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <Badge variant="outline" className="text-xs mb-2">{job.type}</Badge>
                <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" /> {job.company.name} • <MapPin className="h-3.5 w-3.5" /> {job.location}
                </p>
              </div>
              <Button size="sm" className="h-9 text-xs px-5 shadow-sm">
                Apply with Verified Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6 text-sm">
            <div>
              <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">Compensation</h3>
              <p className="text-base font-bold text-foreground">
                {job.stipendMonthly ? `${formatCurrency(job.stipendMonthly)} / month` : "Competitive CTC"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">Role Overview</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{job.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">Requirements</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{job.requirements}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">Required Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {job.skillsRequired.map((sr) => (
                  <Badge key={sr.skill.id} variant="secondary" className="text-xs py-1 px-2.5">
                    {sr.skill.name} • Level: {sr.requiredLevel}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
