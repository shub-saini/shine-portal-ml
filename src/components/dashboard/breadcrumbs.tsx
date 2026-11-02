"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav className="flex items-center space-x-1.5 text-xs text-muted-foreground mb-4 select-none">
      <Link href="/" className="flex items-center hover:text-foreground transition-colors">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const formattedTitle = segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return (
          <React.Fragment key={href}>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
            {isLast ? (
              <span className="font-semibold text-foreground">{formattedTitle}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {formattedTitle}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
