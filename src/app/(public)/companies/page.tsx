import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEMO_COMPANIES } from "@/lib/db/demo-data";

export default function CompaniesDirectoryPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <Link href="/sign-up">
            <Button size="sm" className="text-xs">Join as Hiring Partner</Button>
          </Link>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Enterprise Hiring Partners</h1>
          <p className="text-sm text-muted-foreground">
            Companies partnering with academic institutions for talent recruitment, internships, and curriculum collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEMO_COMPANIES.map((company) => (
            <Card key={company.id} className="hover:border-primary/40 transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-foreground">{company.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="h-3 w-3" />
                        <span>{company.headquarters}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="success" className="text-[10px]">Verified Partner</Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">{company.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                  <Badge variant="outline" className="text-[10px] font-normal">{company.industry}</Badge>
                  <Link href={company.website} target="_blank" className="text-primary flex items-center gap-1 hover:underline">
                    Company Site <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
