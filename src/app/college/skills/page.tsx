import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_SKILLS } from "@/lib/db/demo-data";

export default function CollegeSkillsPage() {
  return (
    <DashboardShell requiredRole={UserRole.COLLEGE_ADMIN}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Institutional Skill Catalog</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Curricular skills tracked across Computer Science and Electronics departments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_SKILLS.map((sk) => (
            <Card key={sk.id} className="hover:border-primary/40 transition-all">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-foreground">{sk.name}</h4>
                  <Badge variant="outline" className="text-[10px]">{sk.category}</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground">{sk.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
