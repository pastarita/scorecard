"use client";

import { useState } from "react";
import type { ScorecardData, Hole } from "@/types/scorecard";
import { STATUS_CONFIG, calculateTotals } from "@/types/scorecard";
import { useScorecardLayout } from "../hooks/useScorecardLayout";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { ResponsiveHeader } from "./ResponsiveHeader";
import { ResponsiveLadder } from "./ResponsiveLadder";
import { ResponsiveHoleGrid } from "./ResponsiveHoleGrid";
import { HolePlanView } from "../HorizontalScorecardBar";
import { HoleColumn } from "../HoleColumn";

interface ResponsiveScorecardBarProps {
  data: ScorecardData;
}

type ViewMode = "front9" | "back9";

/**
 * ResponsiveScorecardBar - Responsive version of HorizontalScorecardBar
 * 
 * Purpose: Provides responsive scorecard layout with breakpoint handling
 * Semantic Domain: responsive/scorecard
 * 
 * Features:
 * - Responsive grid (3/5/9 columns)
 * - Collapsible ladder on mobile
 * - Stacked header on mobile
 * - Proper height propagation
 * - Breakpoint-aware layout
 */
export function ResponsiveScorecardBar({ data }: ResponsiveScorecardBarProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("front9");
  const [hoveredHole, setHoveredHole] = useState<number | null>(null);

  const layout = useScorecardLayout();
  const [holesContainerRef] = useResizeObserver<HTMLDivElement>();

  const front9 = data.course.holes.slice(0, 9);
  const back9 = data.course.holes.slice(9, 18);
  const currentHoles = viewMode === "front9" ? front9 : back9;

  const front9Totals = calculateTotals(front9);
  const back9Totals = calculateTotals(back9);
  const overallTotals = calculateTotals(data.course.holes);

  const currentTotals = viewMode === "front9" ? front9Totals : back9Totals;
  const progress = overallTotals.completion;

  return (
    <div className="bg-[#faf8f3] border-b-2 border-[#8b956d] shadow-sm h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="px-4 py-3 flex-shrink-0">
        <ResponsiveHeader
          title={
            <h2 className="scorecard-title text-base font-bold text-[#3d4a21]">
              HYPERDIMENSIONAL GOLF SCORECARD
            </h2>
          }
          toggle={
            <div className="flex items-center gap-2 bg-white border border-[#8b956d] rounded p-1">
              <button
                onClick={() => setViewMode("front9")}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  viewMode === "front9"
                    ? "bg-[#c8e0c8] text-[#3d4a21] font-semibold"
                    : "text-[#6b7a4a] hover:text-[#3d4a21]"
                }`}
              >
                FRONT 9
              </button>
              <div className="w-px h-4 bg-[#8b956d]" />
              <button
                onClick={() => setViewMode("back9")}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  viewMode === "back9"
                    ? "bg-[#c8e0c8] text-[#3d4a21] font-semibold"
                    : "text-[#6b7a4a] hover:text-[#3d4a21]"
                }`}
              >
                BACK 9
              </button>
            </div>
          }
          totals={
            <>
              <div className="text-[#556b2f]">
                <span className="font-semibold">{viewMode === "front9" ? "OUT" : "IN"}:</span>{" "}
                <span className="font-bold text-[#3d4a21]">{currentTotals.actual}</span>
              </div>
              <div className="text-[#556b2f]">
                <span className="font-semibold">TOTAL:</span>{" "}
                <span className="font-bold text-[#3d4a21]">{overallTotals.actual}</span>
              </div>
              <div className="text-[#556b2f]">
                <span className="font-semibold">Progress:</span>{" "}
                <span className="font-bold text-[#3d4a21]">{progress}%</span>
              </div>
              <div className="w-24 h-2 bg-white border border-[#8b956d] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#6b9d5b] via-[#4a7c2c] to-[#556b2f] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          }
        />
      </div>

      {/* Holes Display with Ladder - Responsive */}
      <div
        ref={holesContainerRef}
        className="relative flex items-stretch gap-2 flex-1 overflow-hidden"
        style={{ minHeight: 0 }}
      >
        {/* Responsive Ladder */}
        {layout.showLadder && (
          <ResponsiveLadder
            holes={currentHoles}
            activeHole={hoveredHole}
            onHoleHover={setHoveredHole}
            viewMode={viewMode}
          />
        )}

        {/* Responsive Hole Grid - Uses HoleColumn abstraction for alignment */}
        <ResponsiveHoleGrid className="flex-1">
          {currentHoles.map((hole) => (
            <HoleColumn
              key={hole.number}
              hole={hole}
              holeView={
                <HolePlanView
                  hole={hole}
                  isActive={hoveredHole === hole.number}
                  onHover={() => setHoveredHole(hole.number)}
                />
              }
              isActive={hoveredHole === hole.number}
              onHover={() => setHoveredHole(hole.number)}
            />
          ))}
        </ResponsiveHoleGrid>
      </div>
    </div>
  );
}

