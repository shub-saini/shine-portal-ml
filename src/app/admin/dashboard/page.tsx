import Link from "next/link";
import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldAlert,
  GraduationCap,
  Building2,
  Users,
  CheckCircle2,
  XCircle,
  Activity,
  ShieldCheck,
  Server,
  Lock,
} from "lucide-react";
import { DEMO_SUPER_ADMIN, DEMO_COLLEGE, DEMO_COMPANIES } from "@/lib/db/demo-data";

export default function SuperAdminDashboardPage() {
  const pendingTenants = [
    {
      id: "ten_col_1",
      name: "St. Xavier Institute of Advanced Tech",
      type: "COLLEGE",
      location: "Pune, Maharashtra",
      submittedDate: "Oct 29, 2026",
      officialEmail: "registrar@sxiat.edu.in",
      accreditationDoc: "NAAC_A_Plus_Certification.pdf",
    },
    {
      id: "ten_comp_2",
      name: "CerebralAI Systems Inc.",
      type: "COMPANY",
      location: "Bengaluru, Karnataka",
      submittedDate: "Oct 30, 2026",
      officialEmail: "hiring@cerebralai.io",
      accreditationDoc: "CIN_Incorporation_Certificate.pdf",
    },
  ];

  const auditLogs = [
    {
      id: "aud_1",
      action: "SKILL_VERIFIED",
      actor: "Dr. Anita Sharma (FACULTY)",
      entity: "StudentSkill: PostgreSQL",
      time: "12 mins ago",
      ip: "10.0.14.82",
    },
    {
      id: "aud_2",
      action: "JOB_PUBLISHED",
      actor: "Siddharth Sen (RECRUITER)",
      entity: "Job: Cloud Engineer Intern",
      time: "48 mins ago",
      ip: "192.168.1.104",
    },
    {
      id: "aud_3",
      action: "TENANT_AUTHENTICATED",
      actor: "Prof. Vikram Malhotra (TPO)",
      entity: "Session: Clerk JWT Auth",
      time: "2 hours ago",
      ip: "10.0.4.12",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.SUPER_ADMIN}>
      <div className="space-y-6">
        {/* Super Admin Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent border border-rose-500/20 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20">
                  Platform Governance & Security
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Global Tenant Registry
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Super Admin Command Center 🛡️
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
                System telemetry, cross-tenant isolation enforcement, institutional accreditation review, and security audit logs.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/admin/settings">
                <Button size="sm" className="gap-1.5 text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20">
                  <Lock className="h-4 w-4" /> Platform Policies
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Verified Colleges"
            value="128 Colleges"
            change="2 Pending"
            isPositive={true}
            subtitle="Accredited Academic Tenants"
            icon={GraduationCap}
            iconColor="text-blue-600 bg-blue-500/10"
          />
          <StatCard
            title="Hiring Partners"
            value="352 Companies"
            change="↑ 14 This Month"
            isPositive={true}
            subtitle="Enterprise Hiring Organizations"
            icon={Building2}
            iconColor="text-purple-600 bg-purple-500/10"
          />
          <StatCard
            title="Total Candidates"
            value="42,600"
            change="Active Pool"
            isPositive={true}
            subtitle="Verified Skill Records"
            icon={Users}
            iconColor="text-emerald-600 bg-emerald-500/10"
          />
          <StatCard
            title="System Telemetry"
            value="99.98%"
            change="Optimal"
            isPositive={true}
            subtitle="Tenant Isolation Active"
            icon={Server}
            iconColor="text-rose-600 bg-rose-500/10"
          />
        </div>

        {/* Institutional Tenant Verification Queue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base">Institutional Accreditation Queue</CardTitle>
              <CardDescription className="text-xs">
                Review legal certificates and official credentials before issuing platform verified status
              </CardDescription>
            </div>
            <Badge variant="warning" className="text-xs">2 Pending Approvals</Badge>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border/60">
              {pendingTenants.map((tenant) => (
                <div key={tenant.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-xs text-foreground">{tenant.name}</h4>
                      <Badge variant="outline" className="text-[10px]">{tenant.type}</Badge>
                      <span className="text-[11px] text-muted-foreground">• {tenant.location}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Official Contact: {tenant.officialEmail}</p>
                    <p className="text-[11px] text-primary">Attached: {tenant.accreditationDoc}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button size="sm" variant="outline" className="h-8 text-xs text-rose-600 hover:bg-rose-500/10 border-rose-500/20 gap-1">
                      <XCircle className="h-3.5 w-3.5" /> Reject Registration
                    </Button>
                    <Button size="sm" className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1 shadow-sm">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve & Issue Tenant Key
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Audit Log */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Real-time Platform Audit Log</CardTitle>
            <CardDescription className="text-xs">Cryptographic audit trail of high-privilege server operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border/60 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px] font-mono">{log.action}</Badge>
                      <span className="font-semibold text-foreground">{log.actor}</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">{log.entity} • Origin IP: {log.ip}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
