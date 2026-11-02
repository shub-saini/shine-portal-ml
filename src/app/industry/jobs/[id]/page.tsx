import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Briefcase } from "lucide-react";
import Link from "next/link";
import { DEMO_JOBS } from "@/lib/db/demo-data";

export default async function IndustryJobPipelinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = DEMO_JOBS.find((j) => j.id === id) || DEMO_JOBS[0];

  return (
    <DashboardShell requiredRole={UserRole.INDUSTRY_RECRUITER}>
      <div className="space-y-6 max-w-4xl">
        <Link href="/industry/jobs" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Job Postings
        </Link>

        <Card>
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="outline" className="text-xs mb-1">{job.type}</Badge>
                <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">{job.location} • {job.openings} Openings</p>
              </div>
              <Badge variant="success" className="text-xs">{job.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6 text-sm">
            <div>
              <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skillsRequired.map((sr) => (
                  <Badge key={sr.skill.id} variant="secondary" className="text-xs">
                    {sr.skill.name} • {sr.requiredLevel}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">Applicants in Pipeline (12)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Candidates ranked by semantic vector compatibility against these role criteria.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
