import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, FolderGit2, ExternalLink, Code2 } from "lucide-react";

export default function StudentProjectsPage() {
  return (
    <DashboardShell requiredRole={UserRole.STUDENT}>
      <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Projects & Certifications</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Showcase technical capstones and verified credentials to campus hiring partners.
            </p>
          </div>
          <Button size="sm" className="gap-1.5 text-xs shadow-sm">
            <PlusCircle className="h-3.5 w-3.5" /> Add Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">Distributed Task Orchestrator</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Academic Capstone • CSE Dept</p>
                </div>
                <Badge variant="outline" className="text-[10px]">Completed</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <p className="text-muted-foreground leading-relaxed">
                High-throughput background job queue built with Go and PostgreSQL, featuring exponential backoff, worker pooling, and dead-letter queues.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="secondary" className="text-[10px]">TypeScript</Badge>
                <Badge variant="secondary" className="text-[10px]">PostgreSQL</Badge>
                <Badge variant="secondary" className="text-[10px]">Docker</Badge>
              </div>
              <div className="pt-2 border-t border-border/60 flex items-center gap-4 text-primary">
                <span className="flex items-center gap-1 cursor-pointer hover:underline">
                  <Code2 className="h-3.5 w-3.5" /> Source Code
                </span>
                <span className="flex items-center gap-1 cursor-pointer hover:underline">
                  <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
