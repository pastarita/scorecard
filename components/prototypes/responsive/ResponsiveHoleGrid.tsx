"use client";

import type { ReactNode } from "react";
import { useScorecardLayout } from "../hooks/useScorecardLayout";

interface ResponsiveHoleGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * ResponsiveHoleGrid - Grid container that adapts column count to breakpoints
 * 
 * Purpose: Provides responsive grid layout for hole plan views
 * Semantic Domain: responsive/containers
 * 
 * Breakpoints:
 * - Mobile (< 640px): 3 columns
 * - Tablet (640px - 1024px): 5 columns
 * - Desktop (> 1024px): 9 columns
 * 
 * Ensures proper height propagation for proportional resizing
 */
export function ResponsiveHoleGrid({ children, className = "" }: ResponsiveHoleGridProps) {
  const { gridCols } = useScorecardLayout();

  return (
    <div
      className={`grid gap-2 h-full overflow-hidden ${className}`}
      style={{
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        gridTemplateRows: "1fr",
        height: "100%",
        minHeight: 0,
      }}
    >
      {children}
    </div>
  );
}

