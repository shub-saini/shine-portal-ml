import * as React from "react";
import { getCurrentUser } from "@/lib/auth/server-auth";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { UserRole } from "@prisma/client";

interface DashboardShellProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export async function DashboardShell({ children, requiredRole }: DashboardShellProps) {
  const user = await getCurrentUser();

  const activeRole = requiredRole || user?.role || UserRole.STUDENT;
  const userProfile = {
    firstName: user?.firstName || "Demo",
    lastName: user?.lastName || "User",
    email: user?.email || "user@academiaindustry.org",
    role: activeRole,
    avatarUrl: user?.avatarUrl,
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar
        role={activeRole}
        userName={`${userProfile.firstName} ${userProfile.lastName}`}
        userEmail={userProfile.email}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader user={userProfile} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <Breadcrumbs />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
