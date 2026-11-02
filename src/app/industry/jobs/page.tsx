import Link from "next/link";
import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Briefcase, MapPin } from "lucide-react";
import { DEMO_JOBS, DEMO_COMPANIES } from "@/lib/db/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function IndustryJobsPage() {
  const companyJobs = DEMO_JOBS.filter((j) => j.companyId === DEMO_COMPANIES[0].id);

  return (
    <DashboardShell requiredRole={UserRole.INDUSTRY_RECRUITER}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Job & Internship Postings</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage live vacancies, candidate applications, and hiring pipeline stages.
            </p>
          </div>
          <Link href="/industry/jobs/create">
            <Button size="sm" className="gap-1.5 text-xs bg-purple-600 hover:bg-purple-700 text-white shadow-sm">
              <PlusCircle className="h-3.5 w-3.5" /> Post New Role
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companyJobs.map((job) => (
            <Card key={job.id} className="hover:border-primary/40 transition-all flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-[10px]">{job.type}</Badge>
                    <CardTitle className="text-base">{job.title}</CardTitle>
                  </div>
                  <Badge variant="success" className="text-[10px]">{job.status}</Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                  <MapPin className="h-3 w-3" />
                  <span>{job.location}</span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {job.stipendMonthly ? `${formatCurrency(job.stipendMonthly)} / mo` : formatCurrency(job.salaryMin || 0) + " LPA"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{job.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                  <span className="text-muted-foreground">12 Active Applicants</span>
                  <Link href={`/industry/jobs/${job.id}`}>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      View Pipeline →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
