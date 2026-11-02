"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";
import {
  GraduationCap,
  BookOpen,
  Building2,
  Briefcase,
  ShieldAlert,
  Check,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface RoleSwitcherProps {
  currentRole: UserRole;
  isDemo?: boolean;
}

const ROLE_CONFIG: Record<
  UserRole,
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  [UserRole.STUDENT]: {
    label: "Student",
    icon: GraduationCap,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  [UserRole.FACULTY]: {
    label: "Faculty",
    icon: BookOpen,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  [UserRole.COLLEGE_ADMIN]: {
    label: "College TPO / Admin",
    icon: Building2,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  [UserRole.INDUSTRY_RECRUITER]: {
    label: "Industry Recruiter",
    icon: Briefcase,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  [UserRole.SUPER_ADMIN]: {
    label: "Super Admin",
    icon: ShieldAlert,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  },
};

export function RoleSwitcher({ currentRole }: RoleSwitcherProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const currentConfig = ROLE_CONFIG[currentRole] || ROLE_CONFIG[UserRole.STUDENT];
  const CurrentIcon = currentConfig.icon;

  async function handleSwitchRole(targetRole: UserRole) {
    if (targetRole === currentRole) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/demo-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: targetRole }),
      });
      const data = await res.json();
      if (data.redirectUrl) {
        router.push(data.redirectUrl);
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to switch role:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 border-border/80 bg-background/50 backdrop-blur-sm px-2.5 text-xs font-medium hover:bg-accent"
          disabled={loading}
        >
          <CurrentIcon className="h-3.5 w-3.5 text-primary" />
          <span className="hidden sm:inline font-semibold">{currentConfig.label}</span>
          <Badge variant="outline" className={`ml-1 text-[10px] px-1.5 py-0 ${currentConfig.color}`}>
            Role
          </Badge>
          <ChevronDown className="h-3 w-3 text-muted-foreground ml-0.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-1">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal px-2 py-1.5">
          Switch User Role Perspective
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.entries(ROLE_CONFIG).map(([roleKey, config]) => {
          const role = roleKey as UserRole;
          const Icon = config.icon;
          const isSelected = role === currentRole;

          return (
            <DropdownMenuItem
              key={role}
              onClick={() => handleSwitchRole(role)}
              className="flex items-center justify-between cursor-pointer py-2 px-2.5 text-xs"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className={isSelected ? "font-semibold text-foreground" : "text-muted-foreground"}>
                  {config.label}
                </span>
              </div>
              {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
