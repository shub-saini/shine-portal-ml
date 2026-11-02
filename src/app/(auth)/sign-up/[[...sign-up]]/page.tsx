"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
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
          <p className="text-xs text-muted-foreground">Register your account or institutional tenant</p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg">Create Your Account</CardTitle>
            <CardDescription className="text-xs">
              Join the verified academia-industry talent network
            </CardDescription>
          </CardHeader>

          <CardContent>
            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                <h4 className="font-semibold text-sm">Account Registration Initiated</h4>
                <p className="text-xs text-muted-foreground">
                  Verification email sent. If testing locally, you can switch directly via Demo Mode.
                </p>
                <Link href="/sign-in" className="block pt-2">
                  <Button size="sm" className="w-full text-xs">Proceed to Sign In</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">First Name</label>
                    <Input placeholder="John" required className="h-9 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Last Name</label>
                    <Input placeholder="Doe" required className="h-9 text-xs" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Official Email</label>
                  <Input type="email" placeholder="name@domain.edu / .com" required className="h-9 text-xs" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Account Type</label>
                  <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm">
                    <option value="STUDENT">Student Candidate</option>
                    <option value="FACULTY">Faculty Member</option>
                    <option value="COLLEGE_ADMIN">College Placement Officer (TPO)</option>
                    <option value="INDUSTRY_RECRUITER">Enterprise Recruiter</option>
                  </select>
                </div>

                <Button type="submit" className="w-full h-10 text-xs shadow-md shadow-primary/20">
                  Register Account <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>

                <div className="pt-2 text-center">
                  <span className="text-[11px] text-muted-foreground">
                    Already registered?{" "}
                    <Link href="/sign-in" className="text-primary hover:underline font-medium">
                      Sign in here
                    </Link>
                  </span>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
