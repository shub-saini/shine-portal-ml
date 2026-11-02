import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, BrainCircuit, CheckCircle2, ArrowRight, BookOpen, AlertTriangle } from "lucide-react";

export default function SkillGapPage() {
  return (
    <DashboardShell requiredRole={UserRole.STUDENT}>
      <div className="space-y-6 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">AI Skill Gap Analysis</h1>
              <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                <BrainCircuit className="h-3 w-3 mr-1" /> Vector Model
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Real-time semantic comparison of your verified credentials against enterprise job market requirements.
            </p>
          </div>
          <Button size="sm" className="gap-1.5 text-xs shadow-sm">
            <Sparkles className="h-3.5 w-3.5" /> Re-analyze Profile
          </Button>
        </div>

        {/* Target Benchmark Overview */}
        <Card className="border-primary/20 bg-primary/[0.02]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Target Benchmark: Cloud & Full-Stack Systems Engineer</CardTitle>
                <CardDescription className="text-xs">Based on current Tier-1 hiring demands</CardDescription>
              </div>
              <Badge variant="success" className="text-xs">Overall Compatibility: 88%</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={88} className="h-2.5" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-3 rounded-lg border border-border bg-background">
                <span className="text-muted-foreground block text-[11px]">Matched Strengths</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm">TypeScript, React, PostgreSQL</span>
              </div>
              <div className="p-3 rounded-lg border border-border bg-background">
                <span className="text-muted-foreground block text-[11px]">Core Skill Gap</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400 text-sm">Docker Containerization</span>
              </div>
              <div className="p-3 rounded-lg border border-border bg-background">
                <span className="text-muted-foreground block text-[11px]">Recommended Next Step</span>
                <span className="font-semibold text-primary text-sm">Complete Microservices Lab</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Competency Breakdown */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-foreground">Semantic Competency Matrix</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Docker & Containerization</CardTitle>
                  <Badge variant="warning" className="text-[10px]">Moderate Gap</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <p className="text-muted-foreground">
                  Your current verified level is <strong>Beginner</strong>. Target enterprise roles require <strong>Intermediate</strong> (multi-stage builds, orchestration).
                </p>
                <div className="p-2.5 rounded-lg bg-muted/40 border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>Recommended Course: Docker Deep Dive</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 text-[11px] text-primary p-0">Enroll →</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Distributed Caching (Redis)</CardTitle>
                  <Badge variant="info" className="text-[10px]">Recommended Elective</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <p className="text-muted-foreground">
                  Identified in 73% of high-package full-stack roles. Adding this will increase your match score by +6%.
                </p>
                <div className="p-2.5 rounded-lg bg-muted/40 border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>Module: Caching Strategies in Next.js</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 text-[11px] text-primary p-0">Enroll →</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
