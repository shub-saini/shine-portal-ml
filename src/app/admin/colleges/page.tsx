import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_COLLEGE } from "@/lib/db/demo-data";
import { CheckCircle2 } from "lucide-react";

export default function AdminCollegesPage() {
  const colleges = [
    {
      name: DEMO_COLLEGE.name,
      code: DEMO_COLLEGE.code,
      location: `${DEMO_COLLEGE.city}, ${DEMO_COLLEGE.state}`,
      status: "VERIFIED",
      studentsCount: 268,
      verifiedDate: "Sept 15, 2026",
    },
    {
      name: "St. Xavier Institute of Advanced Tech",
      code: "SXIAT",
      location: "Pune, Maharashtra",
      status: "PENDING_VERIFICATION",
      studentsCount: 0,
      verifiedDate: "Pending Review",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.SUPER_ADMIN}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">College Tenant Registry</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Accredit and manage institutional tenants on the collaboration platform.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Registered Academic Institutions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">College Name</TableHead>
                  <TableHead className="text-xs">Code</TableHead>
                  <TableHead className="text-xs">Location</TableHead>
                  <TableHead className="text-xs">Enrolled Students</TableHead>
                  <TableHead className="text-xs">Accreditation Status</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {colleges.map((c) => (
                  <TableRow key={c.code}>
                    <TableCell className="font-semibold text-xs text-foreground">{c.name}</TableCell>
                    <TableCell className="text-xs font-mono">{c.code}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.location}</TableCell>
                    <TableCell className="text-xs font-medium">{c.studentsCount} Students</TableCell>
                    <TableCell>
                      <Badge
                        variant={c.status === "VERIFIED" ? "success" : "warning"}
                        className="text-[10px]"
                      >
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Audit Tenant
                      </Button>
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
