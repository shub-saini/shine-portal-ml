import { UserRole } from "@prisma/client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Clock } from "lucide-react";

export default function StudentLearningPage() {
  const modules = [
    {
      title: "Advanced TypeScript & Type-Level Programming",
      provider: "Internal College Lab Module",
      duration: "12 Hours",
      level: "Advanced",
      status: "In Progress (65%)",
    },
    {
      title: "High-Performance PostgreSQL Indexing & Optimization",
      provider: "Nexus Cloud Sponsored Curriculum",
      duration: "18 Hours",
      level: "Intermediate",
      status: "Enrolled",
    },
    {
      title: "Containerization with Docker & Kubernetes Basics",
      provider: "Cloud Native Foundation",
      duration: "24 Hours",
      level: "Beginner to Intermediate",
      status: "Recommended via Skill Gap",
    },
  ];

  return (
    <DashboardShell requiredRole={UserRole.STUDENT}>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Curated Learning Hub</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Targeted training modules and electives designed to bridge identified skill gaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((m) => (
            <Card key={m.title} className="flex flex-col justify-between hover:border-primary/40 transition-all">
              <CardHeader className="pb-3">
                <Badge variant="outline" className="w-fit text-[10px] mb-2">{m.level}</Badge>
                <CardTitle className="text-sm font-semibold leading-snug">{m.title}</CardTitle>
                <CardDescription className="text-xs">{m.provider}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {m.duration}
                  </span>
                  <span className="font-medium text-primary text-[11px]">{m.status}</span>
                </div>
                <Button size="sm" variant="outline" className="w-full text-xs gap-1">
                  Access Courseware <ExternalLink className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
