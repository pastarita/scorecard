"use client";

import { useState } from "react";
import type { Hole } from "@/types/scorecard";
import { useScorecardLayout } from "../hooks/useScorecardLayout";
import { Ladder, type LadderProps } from "../HorizontalScorecardBar";

interface ResponsiveLadderProps {
  holes: Hole[];
  activeHole: number | null;
  onHoleHover: (holeNumber: number) => void;
  viewMode: "front9" | "back9";
}

/**
 * ResponsiveLadder - Ladder that collapses on mobile, adapts width on tablet
 * 
 * Purpose: Provides responsive ladder navigation for hole selection
 * Semantic Domain: responsive/navigation
 * 
 * Breakpoints:
 * - Mobile (< 640px): Hidden or collapsible button
 * - Tablet (640px - 1024px): w-6 (24px)
 * - Desktop (> 1024px): w-8 (32px)
 * 
 * On mobile, provides a collapse button to show/hide the ladder
 */
export function ResponsiveLadder({
  holes,
  activeHole,
  onHoleHover,
  viewMode,
}: ResponsiveLadderProps) {
  const { showLadder, ladderWidth } = useScorecardLayout();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // On mobile, if ladder is hidden, show collapse button
  if (!showLadder && !isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(true)}
        className="relative w-6 flex-shrink-0 h-full flex items-center justify-center bg-[#faf8f3] border-r border-[#8b956d] hover:bg-[#f0ede0] transition-colors"
        aria-label="Show hole navigation"
      >
        <div className="w-0.5 h-full bg-[#8b956d]" />
        <span className="absolute text-xs text-[#556b2f] font-bold">⋯</span>
      </button>
    );
  }

  // If collapsed on mobile, show full ladder
  if (!showLadder && isCollapsed) {
    return (
      <div className="relative flex-shrink-0 h-full" style={{ width: ladderWidth || "32px" }}>
        <button
          onClick={() => setIsCollapsed(false)}
          className="absolute top-0 right-0 z-10 w-4 h-4 flex items-center justify-center bg-[#8b956d] text-white text-xs hover:bg-[#556b2f] transition-colors"
          aria-label="Hide hole navigation"
        >
          ×
        </button>
        <Ladder holes={holes} activeHole={activeHole} onHoleHover={onHoleHover} viewMode={viewMode} />
      </div>
    );
  }

  // Normal display (tablet/desktop)
  return (
    <div className="relative flex-shrink-0 h-full" style={{ width: ladderWidth }}>
      <Ladder holes={holes} activeHole={activeHole} onHoleHover={onHoleHover} viewMode={viewMode} />
    </div>
  );
}

