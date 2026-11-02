"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@prisma/client";
import {
  LayoutDashboard,
  UserCheck,
  Award,
  FolderGit2,
  FileText,
  Briefcase,
  Send,
  Sparkles,
  BookOpenCheck,
  Users,
  Building2,
  GraduationCap,
  TrendingUp,
  Handshake,
  CalendarDays,
  PlusCircle,
  Search,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  role: UserRole;
  userName?: string;
  userEmail?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS_BY_ROLE: Record<UserRole, NavItem[]> = {
  [UserRole.STUDENT]: [
    { title: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { title: "My Profile", href: "/student/profile", icon: UserCheck },
    { title: "Skills & Badges", href: "/student/skills", icon: Award },
    { title: "Projects & Certs", href: "/student/projects", icon: FolderGit2 },
    { title: "Resume Hub", href: "/student/resume", icon: FileText },
    { title: "Explore Jobs", href: "/student/opportunities", icon: Briefcase },
    { title: "My Applications", href: "/student/applications", icon: Send, badge: "2" },
    { title: "Skill Gap AI", href: "/student/skill-gap", icon: Sparkles, badge: "AI" },
    { title: "Learning Modules", href: "/student/learning", icon: BookOpenCheck },
  ],

  [UserRole.FACULTY]: [
    { title: "Dashboard", href: "/faculty/dashboard", icon: LayoutDashboard },
    { title: "Department Students", href: "/faculty/students", icon: Users },
    { title: "Skill Verifications", href: "/faculty/skill-verification", icon: Award, badge: "3" },
    { title: "Cohort Analytics", href: "/faculty/analytics", icon: TrendingUp },
  ],

  [UserRole.COLLEGE_ADMIN]: [
    { title: "Executive Overview", href: "/college/dashboard", icon: LayoutDashboard },
    { title: "Student Registry", href: "/college/students", icon: GraduationCap },
    { title: "Departments", href: "/college/departments", icon: Building2 },
    { title: "Faculty Directory", href: "/college/faculty", icon: Users },
    { title: "Placement Drives", href: "/college/placements", icon: Briefcase },
    { title: "Internship Tracking", href: "/college/internships", icon: CalendarDays },
    { title: "Placement Analytics", href: "/college/analytics", icon: TrendingUp },
    { title: "Industry Partnerships", href: "/college/collaborations", icon: Handshake },
  ],

  [UserRole.INDUSTRY_RECRUITER]: [
    { title: "Recruiter Hub", href: "/industry/dashboard", icon: LayoutDashboard },
    { title: "Company Profile", href: "/industry/company-profile", icon: Building2 },
    { title: "Job Postings", href: "/industry/jobs", icon: Briefcase },
    { title: "Create Job Opening", href: "/industry/jobs/create", icon: PlusCircle },
    { title: "Candidate Search", href: "/industry/candidates", icon: Search },
    { title: "Application Pipeline", href: "/industry/applications", icon: Send, badge: "18" },
    { title: "Interviews", href: "/industry/interviews", icon: CalendarDays, badge: "1" },
    { title: "Campus Collaborations", href: "/industry/collaborations", icon: Handshake },
  ],

  [UserRole.SUPER_ADMIN]: [
    { title: "Platform Telemetry", href: "/admin/dashboard", icon: LayoutDashboard },
    { title: "User Directory", href: "/admin/users", icon: Users },
    { title: "College Verification", href: "/admin/colleges", icon: GraduationCap, badge: "2" },
    { title: "Company Verification", href: "/admin/companies", icon: Building2 },
    { title: "Ecosystem Analytics", href: "/admin/analytics", icon: TrendingUp },
    { title: "Platform Governance", href: "/admin/settings", icon: Settings },
  ],
};

export function DashboardSidebar({ role, userName, userEmail }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const items = NAV_ITEMS_BY_ROLE[role] || NAV_ITEMS_BY_ROLE[UserRole.STUDENT];

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-border bg-card/60 backdrop-blur-md transition-all duration-300 ease-in-out select-none",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-foreground">AcademiaIndustry</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Connect Portal</span>
            </div>
          </Link>
        )}

        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-md">
            <Sparkles className="h-4 w-4" />
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-7 w-7 text-muted-foreground hover:text-foreground hidden lg:flex"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </Button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="mb-2 px-2">
          {!collapsed && (
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {role.replace("_", " ")} MENU
            </p>
          )}
        </div>

        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm font-semibold shadow-primary/25"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
              title={collapsed ? item.title : undefined}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform group-hover:scale-105",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              {!collapsed && (
                <div className="flex flex-1 items-center justify-between">
                  <span>{item.title}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.2 text-[10px] font-semibold",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Profile Details */}
      <div className="border-t border-border p-3">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors",
            collapsed && "justify-center"
          )}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {!collapsed && <span>Public Portal</span>}
        </Link>
      </div>
    </aside>
  );
}
