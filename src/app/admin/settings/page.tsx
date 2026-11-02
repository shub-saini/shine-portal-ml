import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, ShieldCheck, Database, Key } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <DashboardShell requiredRole={UserRole.SUPER_ADMIN}>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Platform Governance & Security Policies</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tenant isolation policies, session timeouts, encryption standards, and external service contracts.
          </p>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-semibold">Tenant Data Isolation Rules</CardTitle>
              </div>
              <CardDescription className="text-xs">Active PostgreSQL RLS and Prisma query middleware policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 rounded-lg border border-border bg-background space-y-1">
                <div className="flex justify-between font-semibold text-foreground">
                  <span>College Data Isolation</span>
                  <Badge variant="success" className="text-[10px]">Strictly Enforced</Badge>
                </div>
                <p className="text-muted-foreground">
                  Faculty and placement officers are bounded strictly to their authenticated College ID. Cross-tenant queries are blocked at the ORM layer.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-border bg-background space-y-1">
                <div className="flex justify-between font-semibold text-foreground">
                  <span>Company Recruiter Scoping</span>
                  <Badge variant="success" className="text-[10px]">Strictly Enforced</Badge>
                </div>
                <p className="text-muted-foreground">
                  Company members can only modify jobs, view candidate pipelines, and schedule interviews for their assigned corporate tenant.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-purple-600" />
                <CardTitle className="text-sm font-semibold">External Microservice Boundaries</CardTitle>
              </div>
              <CardDescription className="text-xs">Decoupled AI Engine integration configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="p-3 rounded-lg border border-border bg-background flex justify-between items-center">
                <div>
                  <p className="font-semibold text-foreground">Python FastAPI AI Engine Endpoint</p>
                  <p className="text-[11px] text-muted-foreground">http://localhost:8000 (Resume parsing & semantic vector scoring)</p>
                </div>
                <Badge variant="outline" className="text-[10px]">Configured via ENV</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
