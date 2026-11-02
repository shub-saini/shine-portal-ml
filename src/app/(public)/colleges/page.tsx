import Link from "next/link";
import { ArrowLeft, Building2, MapPin, CheckCircle, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEMO_COLLEGE } from "@/lib/db/demo-data";

export default function CollegesDirectoryPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <Link href="/sign-up">
            <Button size="sm" className="text-xs">Register Institution</Button>
          </Link>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Partner Institutions</h1>
          <p className="text-sm text-muted-foreground">
            Accredited colleges and universities participating in verified skill mapping and campus recruitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:border-primary/40 transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-lg">
                    {DEMO_COLLEGE.code}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-foreground">{DEMO_COLLEGE.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="h-3 w-3" />
                      <span>{DEMO_COLLEGE.city}, {DEMO_COLLEGE.state}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="success" className="text-[10px]">Verified</Badge>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Premier technical institution with specialized centers of excellence in Cloud Computing, AI, and Autonomous Robotics.
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                <span className="text-muted-foreground">2 Active Departments</span>
                <Link href={DEMO_COLLEGE.website} target="_blank" className="text-primary flex items-center gap-1 hover:underline">
                  Visit Website <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
