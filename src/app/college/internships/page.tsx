import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_JOBS } from "@/lib/db/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function CollegeInternshipsPage() {
  const internships = DEMO_JOBS.filter((j) => j.type === "INTERNSHIP");

  return (
    <DashboardShell requiredRole={UserRole.COLLEGE_ADMIN}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Internship Tracking & Governance</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Monitor active industrial internships, corporate stipends, and student attendance credits.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active Corporate Internships</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Company</TableHead>
                  <TableHead className="text-xs">Role Title</TableHead>
                  <TableHead className="text-xs">Location</TableHead>
                  <TableHead className="text-xs">Stipend</TableHead>
                  <TableHead className="text-xs">Openings</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {internships.map((int) => (
                  <TableRow key={int.id}>
                    <TableCell className="font-semibold text-xs text-foreground">{int.company.name}</TableCell>
                    <TableCell className="text-xs">{int.title}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{int.location}</TableCell>
                    <TableCell className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {int.stipendMonthly ? `${formatCurrency(int.stipendMonthly)} / mo` : "N/A"}
                    </TableCell>
                    <TableCell className="text-xs">{int.openings} Slots</TableCell>
                    <TableCell>
                      <Badge variant="success" className="text-[10px]">{int.status}</Badge>
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
