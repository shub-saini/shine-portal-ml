import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Handshake, Building2 } from "lucide-react";
import { DEMO_COLLABORATIONS } from "@/lib/db/demo-data";

export default function IndustryCollaborationsPage() {
  return (
    <DashboardShell requiredRole={UserRole.INDUSTRY_RECRUITER}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Academic Institution Partnerships</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Joint labs, capstone grants, and campus curriculum sponsorship with partner universities.
            </p>
          </div>
          <Button size="sm" className="gap-1.5 text-xs shadow-sm bg-purple-600 hover:bg-purple-700 text-white">
            <PlusCircle className="h-3.5 w-3.5" /> Propose Institutional Lab
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEMO_COLLABORATIONS.map((c) => (
            <Card key={c.id} className="hover:border-primary/40 transition-all flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="text-[10px] mb-1">{c.college.name}</Badge>
                    <CardTitle className="text-base">{c.title}</CardTitle>
                  </div>
                  <Badge variant="success" className="text-xs">{c.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{c.studentsTrained} Students Trained</span>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    Manage Program
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
