import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import { DEMO_STUDENT } from "@/lib/db/demo-data";

export default function FacultyStudentsDirectoryPage() {
  const students = [
    {
      id: "stu_1",
      name: "Aarav Patel",
      roll: "22CSE042",
      batch: 2026,
      cgpa: 8.84,
      verifiedSkills: 3,
      status: "Interviewing",
    },
    {
      id: "stu_2",
      name: "Priya Nair",
      roll: "22CSE018",
      batch: 2026,
      cgpa: 9.12,
      verifiedSkills: 4,
      status: "Shortlisted",
    },
    {
      id: "stu_3",
      name: "Rohan Gupta",
      roll: "22CSE089",
      batch: 2026,
      cgpa: 8.42,
      verifiedSkills: 2,
      status: "Under Review",
    },
    {
      id: "stu_4",
      name: "Ananya Desai",
      roll: "22CSE004",
      batch: 2026,
      cgpa: 9.35,
      verifiedSkills: 5,
      status: "Offer Accepted",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.FACULTY}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Department Students</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Monitor academic standing, verified competencies, and placement status for your department cohort.
            </p>
          </div>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by student name or roll number..." className="pl-9 h-9 text-xs" />
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">CSE Batch 2026 Roster</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Student Name</TableHead>
                  <TableHead className="text-xs">Roll Number</TableHead>
                  <TableHead className="text-xs">CGPA</TableHead>
                  <TableHead className="text-xs">Verified Skills</TableHead>
                  <TableHead className="text-xs">Placement Stage</TableHead>
                  <TableHead className="text-xs text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((stu) => (
                  <TableRow key={stu.id}>
                    <TableCell className="font-semibold text-xs text-foreground">{stu.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{stu.roll}</TableCell>
                    <TableCell className="text-xs font-bold text-primary">{stu.cgpa}</TableCell>
                    <TableCell className="text-xs">
                      <Badge variant="outline" className="text-[10px]">{stu.verifiedSkills} Skills Verified</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={stu.status === "Offer Accepted" ? "success" : "secondary"} className="text-[10px]">
                        {stu.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/faculty/students/${stu.id}`}>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-primary p-0">
                          View Dossier →
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
