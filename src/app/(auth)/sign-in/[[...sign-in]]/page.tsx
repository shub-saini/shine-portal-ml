"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, GraduationCap, BookOpen, Building2, Briefcase, ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@prisma/client";

export default function SignInPage() {
  const router = useRouter();
  const [loadingRole, setLoadingRole] = React.useState<UserRole | null>(null);

  async function handleQuickLogin(role: UserRole) {
    setLoadingRole(role);
    try {
      const res = await fetch("/api/auth/demo-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (data.redirectUrl) {
        router.push(data.redirectUrl);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRole(null);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-muted/20">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-foreground">
              Academia<span className="text-primary">Industry</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground">Sign in to your collaboration portal</p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg">Select Stakeholder Role</CardTitle>
            <CardDescription className="text-xs">
              Choose your role to launch the specialized role-isolated dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-between h-12 px-4 hover:border-blue-500/50 hover:bg-blue-500/5"
              onClick={() => handleQuickLogin(UserRole.STUDENT)}
              disabled={loadingRole !== null}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground">Student Portal</p>
                  <p className="text-[10px] text-muted-foreground">Aarav Patel (CSE, Batch 2026)</p>
                </div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between h-12 px-4 hover:border-emerald-500/50 hover:bg-emerald-500/5"
              onClick={() => handleQuickLogin(UserRole.FACULTY)}
              disabled={loadingRole !== null}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground">Faculty Member</p>
                  <p className="text-[10px] text-muted-foreground">Dr. Anita Sharma (CSE Labs)</p>
                </div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between h-12 px-4 hover:border-amber-500/50 hover:bg-amber-500/5"
              onClick={() => handleQuickLogin(UserRole.COLLEGE_ADMIN)}
              disabled={loadingRole !== null}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground">College TPO / Admin</p>
                  <p className="text-[10px] text-muted-foreground">Prof. Vikram Malhotra (Apex Inst.)</p>
                </div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between h-12 px-4 hover:border-purple-500/50 hover:bg-purple-500/5"
              onClick={() => handleQuickLogin(UserRole.INDUSTRY_RECRUITER)}
              disabled={loadingRole !== null}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground">Industry Recruiter</p>
                  <p className="text-[10px] text-muted-foreground">Siddharth Sen (Nexus Cloud)</p>
                </div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between h-12 px-4 hover:border-rose-500/50 hover:bg-rose-500/5"
              onClick={() => handleQuickLogin(UserRole.SUPER_ADMIN)}
              disabled={loadingRole !== null}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground">Super Administrator</p>
                  <p className="text-[10px] text-muted-foreground">Platform Governance Console</p>
                </div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-primary hover:underline font-medium">
                  Register new account
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
