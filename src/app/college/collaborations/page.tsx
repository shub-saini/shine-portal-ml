import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Handshake, ExternalLink, Calendar, Users } from "lucide-react";
import { DEMO_COLLABORATIONS } from "@/lib/db/demo-data";

export default function CollegeCollaborationsPage() {
  return (
    <DashboardShell requiredRole={UserRole.COLLEGE_ADMIN}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Industry Collaborations & MOUs</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Institutional partnerships, Centers of Excellence (CoE), and sponsored academic programs.
            </p>
          </div>
          <Button size="sm" className="gap-1.5 text-xs shadow-sm bg-amber-600 hover:bg-amber-700 text-white">
            <PlusCircle className="h-3.5 w-3.5" /> Initiate Collaboration
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEMO_COLLABORATIONS.map((c) => (
            <Card key={c.id} className="hover:border-primary/40 transition-all flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-[10px] mb-1">{c.company.name}</Badge>
                    <CardTitle className="text-base">{c.title}</CardTitle>
                  </div>
                  <Badge variant="success" className="text-xs">{c.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/60 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Duration: 1 Year MOU</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    <span>{c.studentsTrained} Students Benefited</span>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    View MOU Terms
                  </Button>
                  <Button size="sm" className="h-7 text-xs">
                    Curriculum Electives
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
