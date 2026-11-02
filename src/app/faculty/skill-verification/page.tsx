import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ExternalLink, Award } from "lucide-react";
import Link from "next/link";

export default function FacultySkillVerificationPage() {
  const pendingClaims = [
    {
      id: "clm_1",
      studentName: "Aarav Patel",
      rollNo: "22CSE042",
      skill: "PostgreSQL",
      level: "Intermediate",
      submittedDate: "Oct 28, 2026",
      proof: "Database Indexing & ACID Transactions Capstone Lab",
      proofUrl: "https://github.com/aaravpatel/db-lab",
    },
    {
      id: "clm_2",
      studentName: "Priya Nair",
      rollNo: "22CSE018",
      skill: "React",
      level: "Advanced",
      submittedDate: "Oct 29, 2026",
      proof: "Full-Stack E-Commerce Mini-Project with Custom State Store",
      proofUrl: "https://github.com/priyanair/ecommerce-react",
    },
    {
      id: "clm_3",
      studentName: "Rohan Gupta",
      rollNo: "22CSE089",
      skill: "Docker",
      level: "Intermediate",
      submittedDate: "Oct 30, 2026",
      proof: "Microservices Orchestration Lab Report",
      proofUrl: "https://github.com/rohangupta/docker-compose-lab",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.FACULTY}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Skill Verification Center</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Review student claims, evaluate attached artifacts, and issue cryptographic or institutional endorsements.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Verifications (3)</CardTitle>
            <CardDescription className="text-xs">
              Verified skills directly influence student placement readiness metrics and recruiter filtering.
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border/60">
            {pendingClaims.map((claim) => (
              <div key={claim.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-xs text-foreground">{claim.studentName}</h4>
                    <span className="text-[11px] text-muted-foreground">({claim.rollNo})</span>
                    <Badge variant="outline" className="text-[10px] font-semibold text-primary">
                      {claim.skill}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">Level: {claim.level}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Project Proof: <span className="text-foreground">{claim.proof}</span>
                  </p>
                  <Link href={claim.proofUrl} target="_blank" className="text-[11px] text-primary hover:underline inline-flex items-center gap-1">
                    Inspect Repository Artifact <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button size="sm" variant="outline" className="h-8 text-xs text-rose-600 hover:bg-rose-500/10 border-rose-500/20 gap-1">
                    <XCircle className="h-3.5 w-3.5" /> Reject / Revision
                  </Button>
                  <Button size="sm" className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1 shadow-sm">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Endorse Skill
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
