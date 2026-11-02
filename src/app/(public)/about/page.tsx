import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </Link>

        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
            About Academia–Industry Connect
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A unified higher-education infrastructure engineered to eliminate the gap between collegiate curricula and modern industry expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="font-semibold text-base text-foreground">The Academic Challenge</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Colleges struggle with disparate placement spreadsheets, unverified student resume claims, and disconnected industry partnerships. Students often graduate without transparent metrics on where their technical skills stand against live industry job requirements.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="font-semibold text-base text-foreground">The Enterprise Solution</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our platform provides centralized skill telemetry where faculty vouch for student proficiencies based on coursework, lab performance, and capstones. Corporate recruiters access pre-verified talent pools with deterministic compatibility scores.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-base text-foreground">Core System Architecture</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Next.js 16 App Router & React 19
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Multi-tenant RBAC with Strict Isolation
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> PostgreSQL & Prisma Relational Schema
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Decoupled Python FastAPI AI Service Boundary
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
