"use client";

import type { ReactNode } from "react";

interface ResponsiveHoleGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * ResponsiveHoleGrid - Grid container that never wraps holes to new line
 * 
 * Purpose: Provides grid layout for hole plan views that always stays in single row
 * Semantic Domain: responsive/containers
 * 
 * Features:
 * - Always 9 columns (never wraps)
 * - Horizontal scroll if needed on smaller screens
 * - Ensures proper height propagation for proportional resizing
 * - All holes stay in a single row regardless of screen size
 */
export function ResponsiveHoleGrid({ children, className = "" }: ResponsiveHoleGridProps) {
  return (
    <div
      className={`grid gap-2 h-full overflow-x-auto ${className}`}
      style={{
        gridTemplateColumns: `repeat(9, minmax(0, 1fr))`,
        gridTemplateRows: "1fr",
        height: "100%",
        minHeight: 0,
        gridAutoFlow: "column",
      }}
    >
      {children}
    </div>
  );
}

