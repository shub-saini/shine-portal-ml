import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  icon: Icon,
  iconColor = "text-primary bg-primary/10",
}: StatCardProps) {
  return (
    <Card className="hover:border-primary/40 transition-all hover:shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", iconColor)}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline justify-between">
          <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
          {change && (
            <span
              className={cn(
                "inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded",
                isPositive
                  ? "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400"
                  : "text-rose-600 bg-rose-500/10 dark:text-rose-400"
              )}
            >
              {isPositive ? "↑ " : "↓ "}
              {change}
            </span>
          )}
        </div>
        {subtitle && <p className="mt-1 text-[11px] text-muted-foreground">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
