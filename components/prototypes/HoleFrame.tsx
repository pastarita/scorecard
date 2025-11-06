"use client";

import type { ReactNode } from "react";

interface HoleFrameProps {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
}

/**
 * HoleFrame - Reusable frame component for golf hole displays
 * 
 * Purpose: Provides consistent styling and layout for hole plan views
 * Semantic Domain: holes/frame
 * 
 * This component wraps hole content (SVG, overlays, etc.) with:
 * - Traditional golf scorecard border styling
 * - Active/inactive state styling
 * - Vertically responsive container
 * - Overflow handling
 * 
 * Originally constructed in the root TraditionalScorecard implementation,
 * now extracted as a reusable component for the HorizontalScorecardBar.
 */
export function HoleFrame({ 
  children, 
  isActive = false,
  className = ""
}: HoleFrameProps) {
  return (
    <div 
      className={`w-full h-full border-2 rounded transition-all flex flex-col overflow-hidden ${
        isActive 
          ? "border-[#556b2f] bg-[#faf8f3] shadow-md" 
          : "border-[#8b956d] bg-white"
      } ${className}`}
    >
      {children}
    </div>
  );
}

