import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DEMO_STUDENT, DEMO_COLLEGE, DEMO_DEPARTMENTS } from "@/lib/db/demo-data";
import { GraduationCap, Building2, User, Globe, Code2, Link2, Save } from "lucide-react";

export default function StudentProfilePage() {
  return (
    <DashboardShell requiredRole={UserRole.STUDENT}>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Student Profile</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage your academic credentials, social portfolios, and career biography.
            </p>
          </div>
          <Button size="sm" className="gap-1.5 text-xs shadow-sm">
            <Save className="h-3.5 w-3.5" /> Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Academic Snapshot Card */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Academic Registry</CardTitle>
              <CardDescription className="text-xs">Institutional verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div>
                <span className="text-muted-foreground block text-[11px]">Institution</span>
                <span className="font-semibold text-foreground">{DEMO_COLLEGE.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Department</span>
                <span className="font-semibold text-foreground">{DEMO_DEPARTMENTS[0].name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Roll No</span>
                  <span className="font-semibold text-foreground">{DEMO_STUDENT.rollNumber}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Batch</span>
                  <span className="font-semibold text-foreground">{DEMO_STUDENT.batchYear}</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Cumulative CGPA</span>
                <span className="font-bold text-base text-primary">{DEMO_STUDENT.cgpa} / 10.0</span>
              </div>
            </CardContent>
          </Card>

          {/* Editable Profile Information */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">General Information</CardTitle>
              <CardDescription className="text-xs">Visible to hiring recruiters and verifying faculty</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Professional Headline</label>
                <Input defaultValue={DEMO_STUDENT.headline} className="h-9 text-xs" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Bio / Executive Summary</label>
                <Textarea defaultValue={DEMO_STUDENT.bio} rows={3} className="text-xs" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1">
                    <Globe className="h-3 w-3 text-muted-foreground" /> Portfolio
                  </label>
                  <Input defaultValue={DEMO_STUDENT.portfolioUrl} className="h-9 text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1">
                    <Code2 className="h-3 w-3 text-muted-foreground" /> GitHub
                  </label>
                  <Input defaultValue={DEMO_STUDENT.githubUrl} className="h-9 text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1">
                    <Link2 className="h-3 w-3 text-muted-foreground" /> LinkedIn
                  </label>
                  <Input defaultValue={DEMO_STUDENT.linkedinUrl} className="h-9 text-xs" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
