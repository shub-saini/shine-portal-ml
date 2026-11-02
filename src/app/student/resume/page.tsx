import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText, CheckCircle2, Sparkles, Download } from "lucide-react";

export default function StudentResumePage() {
  return (
    <DashboardShell requiredRole={UserRole.STUDENT}>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Resume Hub & ATS Score</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage uploaded resumes and view AI extracted technical competencies.
            </p>
          </div>
          <Button size="sm" className="gap-1.5 text-xs shadow-sm">
            <UploadCloud className="h-3.5 w-3.5" /> Upload New Resume
          </Button>
        </div>

        <Card className="border-primary/20 bg-primary/[0.02]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Aarav_Patel_SWE_Resume_2026.pdf</CardTitle>
                  <p className="text-[11px] text-muted-foreground">Primary Resume • Uploaded 12 days ago • 142 KB</p>
                </div>
              </div>
              <Badge variant="success" className="text-xs">Primary Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg border border-border bg-background space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> AI Parsed Skills Extraction
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">96% Parse Quality</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["TypeScript", "React", "Next.js", "PostgreSQL", "Docker", "REST APIs", "Git"].map((sk) => (
                  <Badge key={sk} variant="outline" className="text-[10px] bg-secondary/40">
                    <CheckCircle2 className="h-2.5 w-2.5 mr-1 text-emerald-500" /> {sk}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                <Download className="h-3.5 w-3.5" /> Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
