import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Building2, Users } from "lucide-react";
import { DEMO_DEPARTMENTS, DEMO_COLLEGE } from "@/lib/db/demo-data";

export default function CollegeDepartmentsPage() {
  const departmentsWithStats = [
    {
      id: DEMO_DEPARTMENTS[0].id,
      name: DEMO_DEPARTMENTS[0].name,
      code: DEMO_DEPARTMENTS[0].code,
      studentCount: 148,
      facultyCount: 14,
      placementRate: "92%",
    },
    {
      id: DEMO_DEPARTMENTS[1].id,
      name: DEMO_DEPARTMENTS[1].name,
      code: DEMO_DEPARTMENTS[1].code,
      studentCount: 120,
      facultyCount: 11,
      placementRate: "81%",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.COLLEGE_ADMIN}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Academic Departments</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage departments, curricular codes, and student-faculty ratios for {DEMO_COLLEGE.name}.
            </p>
          </div>
          <Button size="sm" className="gap-1.5 text-xs shadow-sm bg-amber-600 hover:bg-amber-700 text-white">
            <PlusCircle className="h-3.5 w-3.5" /> Add Department
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departmentsWithStats.map((dept) => (
            <Card key={dept.id} className="hover:border-primary/40 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
                      {dept.code}
                    </div>
                    <div>
                      <CardTitle className="text-base">{dept.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">Code: {dept.code}</p>
                    </div>
                  </div>
                  <Badge variant="success" className="text-xs">Active Dept</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/60 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Students</span>
                    <span className="font-bold text-foreground">{dept.studentCount}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Faculty</span>
                    <span className="font-bold text-foreground">{dept.facultyCount}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Placement</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{dept.placementRate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    View Faculty
                  </Button>
                  <Button size="sm" className="h-7 text-xs">
                    Manage Roster
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
