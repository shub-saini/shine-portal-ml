import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Globe, MapPin, Save, ShieldCheck } from "lucide-react";
import { DEMO_COMPANIES } from "@/lib/db/demo-data";

export default function IndustryCompanyProfilePage() {
  const company = DEMO_COMPANIES[0];

  return (
    <DashboardShell requiredRole={UserRole.INDUSTRY_RECRUITER}>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Company Profile</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage enterprise branding, headquarters, and partner institution visibility.
            </p>
          </div>
          <Button size="sm" className="gap-1.5 text-xs shadow-sm bg-purple-600 hover:bg-purple-700 text-white">
            <Save className="h-3.5 w-3.5" /> Save Changes
          </Button>
        </div>

        <Card>
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 font-bold">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">{company.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{company.industry}</p>
                </div>
              </div>
              <Badge variant="success" className="text-xs gap-1">
                <ShieldCheck className="h-3 w-3" /> Verified Partner
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Company Name</label>
                <Input defaultValue={company.name} className="h-9 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Industry Sector</label>
                <Input defaultValue={company.industry} className="h-9 text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Website</label>
                <Input defaultValue={company.website} className="h-9 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Headquarters</label>
                <Input defaultValue={company.headquarters} className="h-9 text-xs" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Corporate Overview</label>
              <Textarea defaultValue={company.description} rows={3} className="text-xs" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
