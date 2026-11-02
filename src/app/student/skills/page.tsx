import { UserRole, VerificationStatus } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, CheckCircle2, Clock, Award, AlertCircle } from "lucide-react";
import { DEMO_STUDENT_SKILLS, DEMO_SKILLS } from "@/lib/db/demo-data";

export default function StudentSkillsPage() {
  return (
    <DashboardShell requiredRole={UserRole.STUDENT}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Skills & Endorsements</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Add technical competencies and submit proof for departmental faculty verification.
            </p>
          </div>
          <Button size="sm" className="gap-1.5 text-xs shadow-sm">
            <PlusCircle className="h-3.5 w-3.5" /> Claim New Skill
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-emerald-500/20 bg-emerald-500/[0.03]">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-xs text-muted-foreground">Verified Skills</p>
                <p className="text-xl font-bold text-foreground">3 Competencies</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-amber-500/20 bg-amber-500/[0.03]">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="text-xs text-muted-foreground">Pending Faculty Review</p>
                <p className="text-xl font-bold text-foreground">1 Submission</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-primary/20 bg-primary/[0.03]">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Skill Verification Rate</p>
                <p className="text-xl font-bold text-foreground">75% Endorsed</p>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Claimed Skills Roster</CardTitle>
            <CardDescription className="text-xs">
              Every verified skill boosts your AI match score when recruiters search for candidates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border/60">
              {DEMO_STUDENT_SKILLS.map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">{item.skill.name}</span>
                      <Badge variant="outline" className="text-xs">{item.level}</Badge>
                      <Badge variant="secondary" className="text-[10px]">{item.skill.category}</Badge>
                    </div>
                    {item.remarks && (
                      <p className="text-xs text-muted-foreground">Endorsement: &ldquo;{item.remarks}&rdquo;</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {item.verificationStatus === VerificationStatus.VERIFIED && (
                      <Badge variant="success" className="text-xs gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Verified by {item.verifiedBy}
                      </Badge>
                    )}
                    {item.verificationStatus === VerificationStatus.PENDING && (
                      <Badge variant="warning" className="text-xs gap-1">
                        <Clock className="h-3.5 w-3.5" /> Under Review
                      </Badge>
                    )}
                    {item.verificationStatus === VerificationStatus.UNVERIFIED && (
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Request Verification
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
