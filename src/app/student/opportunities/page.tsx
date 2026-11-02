import Link from "next/link";
import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, MapPin, Search, Sparkles, Building2, ExternalLink } from "lucide-react";
import { DEMO_JOBS } from "@/lib/db/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function OpportunitiesPage() {
  return (
    <DashboardShell requiredRole={UserRole.STUDENT}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Explore Opportunities</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Internships, graduate roles, and campus drives matched with your skill profile.
            </p>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Filter by title, company, or required skill..." className="pl-9 h-9 text-xs" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEMO_JOBS.map((job) => (
            <Card key={job.id} className="hover:border-primary/40 transition-all flex flex-col justify-between">
              <CardHeader className="pb-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{job.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Building2 className="h-3 w-3" /> {job.company.name}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">{job.type}</Badge>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{job.location}</span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {job.stipendMonthly
                      ? `${formatCurrency(job.stipendMonthly)} / month`
                      : job.salaryMin
                      ? `${formatCurrency(job.salaryMin)} - ${formatCurrency(job.salaryMax || 0)} / year`
                      : "Competitive"}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-medium text-muted-foreground block">Required Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skillsRequired.map((sr) => (
                      <Badge key={sr.skill.id} variant="secondary" className="text-[10px]">
                        {sr.skill.name} ({sr.requiredLevel})
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-primary font-medium">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>88% Profile Compatibility</span>
                  </div>
                  <Button size="sm" className="h-8 text-xs shadow-sm">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
