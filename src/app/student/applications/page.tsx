import { UserRole, ApplicationStatus } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_APPLICATIONS } from "@/lib/db/demo-data";

export default function StudentApplicationsPage() {
  return (
    <DashboardShell requiredRole={UserRole.STUDENT}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">My Applications</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Track recruitment status, interview invitations, and offers.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active Submissions</CardTitle>
            <CardDescription className="text-xs">
              Direct and campus placement drive applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Company & Role</TableHead>
                  <TableHead className="text-xs">Role Type</TableHead>
                  <TableHead className="text-xs">Applied Date</TableHead>
                  <TableHead className="text-xs">AI Match</TableHead>
                  <TableHead className="text-xs">Current Stage</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DEMO_APPLICATIONS.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-xs text-foreground">{app.job.title}</p>
                        <p className="text-[11px] text-muted-foreground">{app.job.company.name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{app.job.type}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{app.appliedAt}</TableCell>
                    <TableCell className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {app.matchScore}%
                    </TableCell>
                    <TableCell className="text-xs text-primary font-medium">{app.currentRound}</TableCell>
                    <TableCell>
                      <Badge
                        variant={app.status === ApplicationStatus.INTERVIEWING ? "warning" : "secondary"}
                        className="text-[10px]"
                      >
                        {app.status}
                      </Badge>
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
