import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Award } from "lucide-react";
import Link from "next/link";
import { DEMO_STUDENT, DEMO_STUDENT_SKILLS } from "@/lib/db/demo-data";

export default async function FacultyStudentDossierPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <DashboardShell requiredRole={UserRole.FACULTY}>
      <div className="space-y-6 max-w-4xl">
        <Link href="/faculty/students" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Students
        </Link>

        <Card>
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">{DEMO_STUDENT.user.firstName} {DEMO_STUDENT.user.lastName}</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Roll: {DEMO_STUDENT.rollNumber} • Batch: {DEMO_STUDENT.batchYear} • CGPA: {DEMO_STUDENT.cgpa}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">Academic Standing: Good</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6 text-sm">
            <div>
              <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">Verified Competencies</h3>
              <div className="divide-y divide-border/60">
                {DEMO_STUDENT_SKILLS.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-foreground mr-2">{item.skill.name}</span>
                      <Badge variant="secondary" className="text-[10px]">{item.level}</Badge>
                    </div>
                    <Badge variant={item.verificationStatus === "VERIFIED" ? "success" : "warning"} className="text-[10px]">
                      {item.verificationStatus}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
