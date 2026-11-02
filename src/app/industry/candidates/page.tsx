import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, CheckCircle2 } from "lucide-react";

export default function IndustryCandidatesPage() {
  const candidates = [
    {
      name: "Aarav Patel",
      college: "Apex Inst. (CSE)",
      cgpa: 8.84,
      verifiedSkills: ["TypeScript (Adv)", "React (Adv)", "PostgreSQL (Int)"],
      compatibilityScore: 92,
      availability: "May 2026",
    },
    {
      name: "Priya Nair",
      college: "Apex Inst. (CSE)",
      cgpa: 9.12,
      verifiedSkills: ["React (Adv)", "TypeScript (Int)", "Python (Int)"],
      compatibilityScore: 88,
      availability: "May 2026",
    },
    {
      name: "Vikram Sengupta",
      college: "Apex Inst. (ECE)",
      cgpa: 8.65,
      verifiedSkills: ["C++ (Adv)", "Embedded Linux (Adv)", "Python (Int)"],
      compatibilityScore: 84,
      availability: "Immediate",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.INDUSTRY_RECRUITER}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Verified Candidate Discovery</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Directly query pre-endorsed student talent pools across partner academic institutions.
            </p>
          </div>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by skill, college, or keyword..." className="pl-9 h-9 text-xs" />
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Eligible Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Candidate</TableHead>
                  <TableHead className="text-xs">College & Dept</TableHead>
                  <TableHead className="text-xs">CGPA</TableHead>
                  <TableHead className="text-xs">Faculty Endorsed Skills</TableHead>
                  <TableHead className="text-xs">Compatibility</TableHead>
                  <TableHead className="text-xs text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((c) => (
                  <TableRow key={c.name}>
                    <TableCell className="font-semibold text-xs text-foreground">{c.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.college}</TableCell>
                    <TableCell className="text-xs font-bold text-primary">{c.cgpa}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {c.verifiedSkills.map((sk) => (
                          <Badge key={sk} variant="secondary" className="text-[10px]">
                            {sk}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {c.compatibilityScore}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Shortlist
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
