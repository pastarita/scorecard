"use client";

import type { ReactNode } from "react";
import type { Hole } from "@/types/scorecard";
import { STATUS_CONFIG } from "@/types/scorecard";

interface HoleColumnProps {
  hole: Hole;
  holeView: ReactNode;
  isActive: boolean;
  onHover: () => void;
  onClick?: () => void;
  className?: string;
}

/**
 * HoleColumn - Abstraction container that aligns hole frame with summary box
 * 
 * Purpose: Ensures proper vertical alignment between hole frame and summary box
 * Semantic Domain: holes/container
 * 
 * This container wraps both:
 * - Hole frame (top)
 * - Summary box (bottom)
 * 
 * Ensures they are perfectly aligned vertically, regardless of ladder width
 */
export function HoleColumn({
  hole,
  holeView,
  isActive,
  onHover,
  onClick,
  className = "",
}: HoleColumnProps) {
  const statusConfig = STATUS_CONFIG[hole.status];

  return (
    <div className={`flex flex-col gap-2 h-full min-w-0 ${className}`}>
      {/* Hole Frame Container - Expands to fill available space */}
      <div className="flex-1 min-h-0 overflow-hidden w-full min-w-0">
        <div
          className="h-full w-full cursor-pointer"
          onMouseEnter={onHover}
          onClick={onClick}
        >
          {holeView}
        </div>
      </div>

      {/* Summary Box - Aligned directly below hole frame, fixed height */}
      <div
        className="h-8 bg-white border border-[#8b956d] rounded flex items-center justify-center text-xs font-medium text-[#556b2f] hover:bg-[#f0f8f0] transition-colors cursor-pointer flex-shrink-0 w-full min-w-0"
        onMouseEnter={onHover}
        onClick={onClick}
        onMouseLeave={() => {}}
      >
        <span style={{ color: statusConfig.color }}>
          {statusConfig.symbol}
        </span>
        <span className="ml-1 text-[#3d4a21] truncate">
          {hole.name.split(" ")[0]}
        </span>
      </div>
    </div>
  );
}

