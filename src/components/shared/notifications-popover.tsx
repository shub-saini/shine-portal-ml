"use client";

import * as React from "react";
import { Bell, CheckCircle2, Clock, Briefcase, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "application" | "interview" | "skill" | "system";
  isRead: boolean;
}

const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif_1",
    title: "Interview Scheduled",
    message: "Nexus Cloud scheduled Technical Round 1 for Cloud Engineer Intern.",
    time: "10 mins ago",
    type: "interview",
    isRead: false,
  },
  {
    id: "notif_2",
    title: "Skill Claim Verified",
    message: "Dr. Anita Sharma verified your advanced proficiency in TypeScript.",
    time: "2 hours ago",
    type: "skill",
    isRead: false,
  },
  {
    id: "notif_3",
    title: "New Job Opportunity Matching Your Profile",
    message: "QuantumEdge Robotics published Autonomous Robotics AI Engineer Intern (84% Match).",
    time: "Yesterday",
    type: "application",
    isRead: true,
  },
];

export function NotificationsPopover() {
  const [notifications, setNotifications] = React.useState(DEMO_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-base font-semibold">Notifications</SheetTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllRead}
                className="h-7 text-xs text-muted-foreground hover:text-foreground"
              >
                Mark all read
              </Button>
            )}
          </div>
          <SheetDescription className="text-xs">
            Real-time alerts for recruitment, verifications, and platform updates.
          </SheetDescription>
        </SheetHeader>
        <div className="divide-y divide-border overflow-y-auto max-h-[calc(100vh-140px)] py-2">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-lg transition-colors flex gap-3 text-sm ${
                item.isRead ? "opacity-75 hover:bg-muted/40" : "bg-primary/5 hover:bg-primary/10"
              }`}
            >
              <div className="mt-0.5">
                {item.type === "interview" && <Clock className="h-4 w-4 text-amber-500" />}
                {item.type === "skill" && <Award className="h-4 w-4 text-emerald-500" />}
                {item.type === "application" && <Briefcase className="h-4 w-4 text-blue-500" />}
                {item.type === "system" && <CheckCircle2 className="h-4 w-4 text-primary" />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-xs text-foreground">{item.title}</p>
                  <span className="text-[10px] text-muted-foreground">{item.time}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.message}</p>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
