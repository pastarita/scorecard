"use client";

import { useState } from "react";
import type { ScorecardData } from "@/types/scorecard";
import { calculateTotals } from "@/types/scorecard";
import { TurnContemplationModal } from "./TurnContemplationModal";

interface ActionPaneProps {
  data: ScorecardData;
}

// End Tally Up Component - shows final course completion summary
function EndTallyUp({ data }: { data: ScorecardData }) {
  const overallTotals = calculateTotals(data.course.holes);
  const allHolesComplete = data.course.holes.every(h => h.status === "complete");
  
  if (!allHolesComplete) return null;

  return (
    <div className="mt-4 w-full p-3 bg-white border-2 border-[#f4d03f] rounded-lg">
      <div className="text-xs font-bold text-[#3d4a21] mb-2 text-center">
        COURSE COMPLETE
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-[#6b7a4a]">Total:</span>
          <span className="font-bold text-[#3d4a21]">{overallTotals.actual}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6b7a4a]">Par:</span>
          <span className="font-bold text-[#3d4a21]">{overallTotals.par}</span>
        </div>
        <div className="flex justify-between border-t border-[#f4d03f] pt-2">
          <span className="text-[#6b7a4a]">Variance:</span>
          <span className={`font-bold ${
            overallTotals.variance <= 0 ? "text-[#4a7c2c]" : "text-[#cc5500]"
          }`}>
            {overallTotals.variance > 0 ? "+" : ""}{overallTotals.variance}
          </span>
        </div>
        <div className="text-center mt-3 pt-2 border-t border-[#f4d03f]">
          <span className="text-[#3d4a21] font-semibold">
            {overallTotals.completion}% Complete
          </span>
        </div>
      </div>
    </div>
  );
}

export function ActionPane({ data }: ActionPaneProps) {
  const [showTurnModal, setShowTurnModal] = useState(false);
  
  const front9 = data.course.holes.slice(0, 9);
  const front9Totals = calculateTotals(front9);
  const front9Completed = front9.filter(h => h.status === "complete").length === 9;
  const allHolesComplete = data.course.holes.every(h => h.status === "complete");

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center p-4 overflow-y-auto">
        {/* Turn Button - only show if Front 9 is complete but course is not complete */}
        {front9Completed && !allHolesComplete && (
          <button
            onClick={() => setShowTurnModal(true)}
            className="w-full py-6 px-4 rounded-lg text-sm font-medium transition-colors flex flex-col items-center justify-center gap-2 bg-[#f4d03f] text-[#3d4a21] hover:bg-[#f7dc6f] cursor-pointer border-2 border-[#f39c12]"
            title="Toolchain Contemplation Tool (Placeholder)"
          >
            <span className="text-2xl">⛳</span>
            <span className="font-bold">Turn</span>
            <span className="text-xs mt-1">Ready</span>
          </button>
        )}

        {/* Front 9 Summary - show when Front 9 is not complete */}
        {!front9Completed && (
          <div className="w-full text-center">
            <div className="text-xs font-semibold text-[#3d4a21] mb-2">
              Front 9 Progress
            </div>
            <div className="text-lg font-bold text-[#3d4a21]">
              {front9.filter(h => h.status === "complete").length}/9
            </div>
            <div className="text-xs text-[#7d6608] mt-1">
              OUT: {front9Totals.actual}
            </div>
          </div>
        )}

        {/* End Tally Up Component - shows when all holes are complete */}
        <EndTallyUp data={data} />
      </div>

      {/* Turn Contemplation Modal */}
      <TurnContemplationModal
        data={data}
        isOpen={showTurnModal}
        onClose={() => setShowTurnModal(false)}
        onComplete={() => {
          // Handle turn completion
        }}
      />
    </>
  );
}

