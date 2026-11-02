import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Download, PlusCircle } from "lucide-react";
import { DEMO_STUDENT } from "@/lib/db/demo-data";

export default function CollegeStudentsPage() {
  const students = [
    {
      id: "stu_1",
      name: "Aarav Patel",
      roll: "22CSE042",
      dept: "CSE",
      cgpa: 8.84,
      skillsVerified: 3,
      status: "Interviewing (Nexus Cloud)",
    },
    {
      id: "stu_2",
      name: "Priya Nair",
      roll: "22CSE018",
      dept: "CSE",
      cgpa: 9.12,
      skillsVerified: 4,
      status: "Shortlisted (QuantumEdge)",
    },
    {
      id: "stu_3",
      name: "Rohan Gupta",
      roll: "22CSE089",
      dept: "CSE",
      cgpa: 8.42,
      skillsVerified: 2,
      status: "Under Review",
    },
    {
      id: "stu_4",
      name: "Ananya Desai",
      roll: "22CSE004",
      dept: "CSE",
      cgpa: 9.35,
      skillsVerified: 5,
      status: "Placed (₹ 18 LPA)",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.COLLEGE_ADMIN}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Institutional Student Registry</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Official student roster, CGPA standings, and corporate recruitment outcomes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
              <Download className="h-3.5 w-3.5" /> Export CSV
            </Button>
            <Button size="sm" className="h-8 text-xs gap-1.5 bg-amber-600 hover:bg-amber-700 text-white">
              <PlusCircle className="h-3.5 w-3.5" /> Import Batch
            </Button>
          </div>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search students by name, roll no, or skill..." className="pl-9 h-9 text-xs" />
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Batch 2026 Student Cohort</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Student Name</TableHead>
                  <TableHead className="text-xs">Roll No</TableHead>
                  <TableHead className="text-xs">Dept</TableHead>
                  <TableHead className="text-xs">CGPA</TableHead>
                  <TableHead className="text-xs">Endorsed Skills</TableHead>
                  <TableHead className="text-xs">Placement Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((stu) => (
                  <TableRow key={stu.id}>
                    <TableCell className="font-semibold text-xs text-foreground">{stu.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{stu.roll}</TableCell>
                    <TableCell className="text-xs">{stu.dept}</TableCell>
                    <TableCell className="text-xs font-bold text-primary">{stu.cgpa}</TableCell>
                    <TableCell className="text-xs">
                      <Badge variant="outline" className="text-[10px]">{stu.skillsVerified} Verified</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={stu.status.includes("Placed") ? "success" : "secondary"}
                        className="text-[10px]"
                      >
                        {stu.status}
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
