import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { DEMO_INTERVIEWS } from "@/lib/db/demo-data";

export default function IndustryInterviewsPage() {
  return (
    <DashboardShell requiredRole={UserRole.INDUSTRY_RECRUITER}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Interview Schedules</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Upcoming virtual and campus technical evaluations.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Scheduled Evaluation Rounds</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Candidate / Role</TableHead>
                  <TableHead className="text-xs">Scheduled Time</TableHead>
                  <TableHead className="text-xs">Duration</TableHead>
                  <TableHead className="text-xs">Panel Interviewer</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs text-right">Meeting Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DEMO_INTERVIEWS.map((int) => (
                  <TableRow key={int.id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-xs text-foreground">Aarav Patel</p>
                        <p className="text-[11px] text-muted-foreground">{int.jobTitle}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{new Date(int.scheduledAt).toLocaleString()}</TableCell>
                    <TableCell className="text-xs">{int.durationMinutes} mins</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{int.interviewer}</TableCell>
                    <TableCell>
                      <Badge variant="warning" className="text-[10px]">{int.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={int.meetingUrl} target="_blank">
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-primary">
                          Join Call <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
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
