import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Mail } from "lucide-react";
import { DEMO_FACULTY } from "@/lib/db/demo-data";

export default function CollegeFacultyDirectoryPage() {
  const facultyList = [
    {
      id: "fac_1",
      name: "Dr. Anita Sharma",
      dept: "Computer Science & Engineering",
      designation: "Associate Professor & Head of Labs",
      verifiedSkillsCount: 42,
      email: "dr.anita.sharma@aist.edu.in",
    },
    {
      id: "fac_2",
      name: "Prof. Rajesh Verma",
      dept: "Electronics & Communication Engineering",
      designation: "Professor & Embedded Systems Lead",
      verifiedSkillsCount: 36,
      email: "rajesh.verma@aist.edu.in",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.COLLEGE_ADMIN}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Faculty Directory & Evaluators</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Authorized academic faculty members responsible for evaluating and endorsing student competencies.
            </p>
          </div>
          <Button size="sm" className="gap-1.5 text-xs shadow-sm bg-amber-600 hover:bg-amber-700 text-white">
            <PlusCircle className="h-3.5 w-3.5" /> Invite Faculty Member
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Institutional Faculty Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Faculty Name</TableHead>
                  <TableHead className="text-xs">Department</TableHead>
                  <TableHead className="text-xs">Designation</TableHead>
                  <TableHead className="text-xs">Skills Verified</TableHead>
                  <TableHead className="text-xs">Email</TableHead>
                  <TableHead className="text-xs text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facultyList.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="font-semibold text-xs text-foreground">{f.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{f.dept}</TableCell>
                    <TableCell className="text-xs">{f.designation}</TableCell>
                    <TableCell className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {f.verifiedSkillsCount} Verified
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{f.email}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="success" className="text-[10px]">Active Evaluator</Badge>
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
