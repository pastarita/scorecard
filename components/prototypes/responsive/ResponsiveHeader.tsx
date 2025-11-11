"use client";

import type { ReactNode } from "react";
import { useScorecardLayout } from "../hooks/useScorecardLayout";

interface ResponsiveHeaderProps {
  title: ReactNode;
  toggle: ReactNode;
  totals: ReactNode;
  className?: string;
}

/**
 * ResponsiveHeader - Header that stacks on mobile, horizontal on desktop
 * 
 * Purpose: Provides responsive header layout for scorecard
 * Semantic Domain: responsive/header
 * 
 * Breakpoints:
 * - Mobile (< 640px): Stacked layout (title, toggle, totals)
 * - Tablet/Desktop (>= 640px): Horizontal layout (title + toggle | totals)
 * 
 * Ensures header is readable and accessible on all screen sizes
 */
export function ResponsiveHeader({
  title,
  toggle,
  totals,
  className = "",
}: ResponsiveHeaderProps) {
  const { headerLayout } = useScorecardLayout();

  if (headerLayout === "stacked") {
    return (
      <div className={`flex flex-col gap-3 ${className}`}>
        <div className="flex items-center gap-4">
          {title}
          {toggle}
        </div>
        <div className="flex items-center justify-end">{totals}</div>
      </div>
    );
  }

  // Horizontal layout (tablet/desktop)
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-4">
        {title}
        {toggle}
      </div>
      <div className="flex items-center gap-4">{totals}</div>
    </div>
  );
}

