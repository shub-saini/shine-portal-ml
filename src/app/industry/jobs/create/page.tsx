import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DEMO_SKILLS } from "@/lib/db/demo-data";

export default function CreateJobPage() {
  return (
    <DashboardShell requiredRole={UserRole.INDUSTRY_RECRUITER}>
      <div className="space-y-6 max-w-4xl">
        <Link href="/industry/jobs" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Job Postings
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Post New Role or Internship</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Publish recruitment requirements across partner colleges with mandatory and preferred technical competencies.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Role Specifications</CardTitle>
            <CardDescription className="text-xs">
              Semantic skill vectors will be generated to match eligible students automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Job Title</label>
              <Input placeholder="e.g. Distributed Systems Engineer / Backend Cloud Intern" className="h-9 text-xs" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Opportunity Type</label>
                <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs">
                  <option value="INTERNSHIP">Internship</option>
                  <option value="FULL_TIME">Full-Time (Graduate / FTE)</option>
                  <option value="PART_TIME">Part-Time</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Location & Workplace Model</label>
                <Input placeholder="e.g. Bengaluru (Hybrid) / Remote" className="h-9 text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Monthly Stipend / Annual CTC</label>
                <Input placeholder="e.g. ₹ 45,000 / month or ₹ 14 LPA" className="h-9 text-xs" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Open Positions</label>
                <Input type="number" defaultValue={3} className="h-9 text-xs" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Job Description</label>
              <Textarea rows={4} placeholder="Core responsibilities, team scope, technologies..." className="text-xs" />
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-medium text-foreground block">Required Competencies (Select Core Skills)</label>
              <div className="flex flex-wrap gap-2">
                {DEMO_SKILLS.map((sk) => (
                  <Badge key={sk.id} variant="outline" className="cursor-pointer hover:bg-primary/10 text-xs py-1 px-2.5">
                    + {sk.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end gap-3">
              <Link href="/industry/jobs">
                <Button variant="outline" size="sm" className="h-9 text-xs">
                  Cancel
                </Button>
              </Link>
              <Button size="sm" className="h-9 text-xs bg-purple-600 hover:bg-purple-700 text-white shadow-sm">
                Publish Opportunity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
