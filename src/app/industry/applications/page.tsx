import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_APPLICATIONS } from "@/lib/db/demo-data";

export default function IndustryApplicationsPage() {
  return (
    <DashboardShell requiredRole={UserRole.INDUSTRY_RECRUITER}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Application Pipeline</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage incoming applications, review resumes, and advance candidates through recruitment stages.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Incoming Candidate Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Applicant Name</TableHead>
                  <TableHead className="text-xs">Applied Role</TableHead>
                  <TableHead className="text-xs">Submission Date</TableHead>
                  <TableHead className="text-xs">Compatibility Score</TableHead>
                  <TableHead className="text-xs">Pipeline Stage</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DEMO_APPLICATIONS.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-xs text-foreground">
                          {app.student.user.firstName} {app.student.user.lastName}
                        </p>
                        <p className="text-[11px] text-muted-foreground">Roll: {app.student.rollNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{app.job.title}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{app.appliedAt}</TableCell>
                    <TableCell className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {app.matchScore}%
                    </TableCell>
                    <TableCell>
                      <Badge variant="warning" className="text-[10px]">{app.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          Review
                        </Button>
                        <Button size="sm" className="h-7 text-xs bg-purple-600 hover:bg-purple-700 text-white">
                          Schedule
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
