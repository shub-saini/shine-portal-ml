import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Briefcase } from "lucide-react";
import { DEMO_COLLEGE } from "@/lib/db/demo-data";

export default function CollegePlacementsPage() {
  const drives = [
    {
      id: "drv_1",
      company: "Nexus Cloud Innovations",
      role: "Full-Stack Cloud Engineer (FTE)",
      driveDate: "Nov 12, 2026",
      package: "₹ 14 - 22 LPA",
      registered: 94,
      offersIssued: 5,
      status: "Scheduled",
    },
    {
      id: "drv_2",
      company: "QuantumEdge Robotics",
      role: "Autonomous Robotics AI Engineer Intern",
      driveDate: "Nov 18, 2026",
      package: "₹ 40,000 / mo",
      registered: 68,
      offersIssued: 4,
      status: "Registration Open",
    },
    {
      id: "drv_3",
      company: "InfraScale Systems",
      role: "Site Reliability Engineer",
      driveDate: "Oct 15, 2026",
      package: "₹ 12 LPA",
      registered: 82,
      offersIssued: 12,
      status: "Completed",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.COLLEGE_ADMIN}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Campus Placement Drives</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Coordinate on-campus recruitment, student eligibility criteria, and offer distribution.
            </p>
          </div>
          <Button size="sm" className="gap-1.5 text-xs shadow-sm bg-amber-600 hover:bg-amber-700 text-white">
            <PlusCircle className="h-3.5 w-3.5" /> Create New Drive
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recruitment Drives Master Log</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Company & Role</TableHead>
                  <TableHead className="text-xs">Drive Date</TableHead>
                  <TableHead className="text-xs">Offered CTC / Stipend</TableHead>
                  <TableHead className="text-xs">Eligible Registrations</TableHead>
                  <TableHead className="text-xs">Offers Released</TableHead>
                  <TableHead className="text-xs">Drive Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drives.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-xs text-foreground">{d.company}</p>
                        <p className="text-[11px] text-muted-foreground">{d.role}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{d.driveDate}</TableCell>
                    <TableCell className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {d.package}
                    </TableCell>
                    <TableCell className="text-xs font-medium">{d.registered} Students</TableCell>
                    <TableCell className="text-xs font-bold text-primary">{d.offersIssued}</TableCell>
                    <TableCell>
                      <Badge
                        variant={d.status === "Completed" ? "success" : "warning"}
                        className="text-[10px]"
                      >
                        {d.status}
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
