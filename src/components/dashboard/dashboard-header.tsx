"use client";

import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";
import { Search, LogOut, User as UserIcon, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { RoleSwitcher } from "@/components/shared/role-switcher";
import { NotificationsPopover } from "@/components/shared/notifications-popover";

interface DashboardHeaderProps {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string;
    role: UserRole;
    avatarUrl?: string | null;
  };
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter();
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "Demo User";
  const initials = (user.firstName?.[0] || "") + (user.lastName?.[0] || "U");

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      {/* Left: Global Search */}
      <div className="flex items-center gap-3 max-w-md w-full">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search skills, jobs, candidates, colleges..."
            className="h-9 w-full rounded-lg bg-muted/40 pl-8 text-xs focus:bg-background"
          />
        </div>
      </div>

      {/* Right: Tools & Profile */}
      <div className="flex items-center gap-3">
        {/* Interactive Role Switcher */}
        <RoleSwitcher currentRole={user.role} />

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Popover */}
        <NotificationsPopover />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
              <Avatar className="h-9 w-9 border border-border">
                {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={fullName} />}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-1">
            <DropdownMenuLabel className="font-normal px-2 py-1.5">
              <div className="flex flex-col space-y-1">
                <p className="text-xs font-semibold leading-none text-foreground">{fullName}</p>
                <p className="text-[11px] leading-none text-muted-foreground truncate">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs cursor-pointer">
              <UserIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs cursor-pointer">
              <Shield className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              <span>Role & Permissions</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-xs cursor-pointer text-destructive focus:text-destructive"
              onClick={() => {
                router.push("/sign-in");
              }}
            >
              <LogOut className="mr-2 h-3.5 w-3.5" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
