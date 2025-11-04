"use client";

import type { Hole, ScorecardData, Totals } from "@/types/scorecard";
import {
  ARCHETYPE_CONFIG,
  STATUS_CONFIG,
  calculateVariance,
  calculateTotals,
} from "@/types/scorecard";
import { HoleSVG, HoleSVGCompact } from "./HoleSVG";

interface TraditionalScorecardProps {
  data: ScorecardData;
}

/**
 * Traditional Golf Scorecard Component
 * 
 * Matches the aesthetic of traditional golf scorecards with:
 * - Beige/cream background
 * - Olive-green text and borders
 * - Light green headers
 * - Top-down SVG hole diagrams
 * - Handicap boxes
 * - Traditional layout
 */
export function TraditionalScorecard({ data }: TraditionalScorecardProps) {
  const front9 = data.course.holes.slice(0, 9);
  const back9 = data.course.holes.slice(9, 18);
  const front9Totals = calculateTotals(front9);
  const back9Totals = calculateTotals(back9);
  const overallTotals = calculateTotals(data.course.holes);

  // Calculate handicap values (simplified - in real golf these indicate hole difficulty)
  const calculateHandicap = (hole: Hole, index: number, isFront9: boolean) => {
    // Simplified: assign handicap based on par and position
    const baseHandicap = hole.par === 3 ? 15 : hole.par === 4 ? 10 : 5;
    const positionAdjustment = index % 3;
    return baseHandicap + positionAdjustment;
  };

  return (
    <div className="scorecard-container max-w-6xl mx-auto p-6 bg-[#faf8f3]">
      {/* Header */}
      <div className="scorecard-header px-6 py-4 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="scorecard-title text-3xl font-bold mb-2">
              HYPERDIMENSIONAL VECTOR SPACE GOLF
            </h1>
            <p className="scorecard-font-serif text-lg text-[#556b2f]">
              Development Scorecard
            </p>
          </div>
          <div className="text-right text-sm scorecard-font-mono">
            <div className="mb-1">
              <span className="text-[#6b7a4a]">PRODUCT:</span>{" "}
              <span className="font-semibold">{data.project.product}</span>
            </div>
            <div className="mb-1">
              <span className="text-[#6b7a4a]">DEVELOPER:</span>{" "}
              <span className="font-semibold">{data.project.developer}</span>
            </div>
            <div>
              <span className="text-[#6b7a4a]">DATE:</span>{" "}
              <span className="font-semibold">
                {data.project.dateStart} - {data.project.dateEnd}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Front 9 */}
      <div className="mb-8">
        <h2 className="scorecard-font-serif text-xl font-bold text-[#3d4a21] mb-4">
          FRONT 9 (CORE FEATURES / MVP)
        </h2>

        {/* Hole Diagrams Grid */}
        <div className="grid grid-cols-3 md:grid-cols-9 gap-2 mb-4">
          {front9.map((hole) => (
            <div key={hole.number} className="text-center">
              <div className="mb-1">
                <HoleSVGCompact hole={hole} />
              </div>
              <div className="text-xs font-semibold text-[#556b2f]">
                Hole {hole.number}
              </div>
            </div>
          ))}
        </div>

        {/* Scorecard Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="scorecard-table-header">
                <th className="px-3 py-2 text-left text-xs font-semibold border border-[#8b956d]">
                  Hole
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold border border-[#8b956d]">
                  Feature
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold border border-[#8b956d]">
                  Par
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold border border-[#8b956d]">
                  Actual
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold border border-[#8b956d]">
                  +/-
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold border border-[#8b956d]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {front9.map((hole, idx) => {
                const archetype = ARCHETYPE_CONFIG[hole.archetype];
                const status = STATUS_CONFIG[hole.status];
                const variance = calculateVariance(hole.par, hole.actual);

                return (
                  <tr
                    key={hole.number}
                    className="bg-white border-b border-[#d4d4c4] hover:bg-[#faf8f3]"
                  >
                    <td className="px-3 py-2 text-center text-sm font-bold text-[#3d4a21] border border-[#d4d4c4]">
                      {hole.number}
                    </td>
                    <td className="px-3 py-2 text-sm text-[#3d4a21] border border-[#d4d4c4]">
                      {hole.name}
                    </td>
                    <td className="px-3 py-2 text-center text-sm scorecard-font-mono font-semibold text-[#3d4a21] border border-[#d4d4c4]">
                      {hole.par}
                    </td>
                    <td className="px-3 py-2 text-center text-sm scorecard-font-mono text-[#3d4a21] border border-[#d4d4c4]">
                      {hole.actual || "-"}
                    </td>
                    <td className={`px-3 py-2 text-center text-sm scorecard-font-mono font-semibold border border-[#d4d4c4] ${
                      variance === "E"
                        ? "text-[#4a7c2c]"
                        : variance.startsWith("+")
                        ? "text-[#d4a574]"
                        : variance.startsWith("-")
                        ? "text-[#6b9d5b]"
                        : "text-[#9aa589]"
                    }`}>
                      {variance}
                    </td>
                    <td className="px-3 py-2 text-center text-sm border border-[#d4d4c4]">
                      <span
                        style={{ color: status.color }}
                        title={status.description}
                        className="text-lg"
                      >
                        {status.symbol}
                      </span>
                    </td>
                  </tr>
                );
              })}
              <TotalsRowTraditional label="OUT" totals={front9Totals} />
            </tbody>
          </table>
        </div>

        {/* Handicap Row */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm font-semibold text-[#556b2f]">HANDICAP:</span>
          <div className="flex gap-1">
            {front9.map((hole, idx) => (
              <div
                key={hole.number}
                className="handicap-box"
              >
                {calculateHandicap(hole, idx, true)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-[#8b956d] my-8"></div>

      {/* Back 9 */}
      <div className="mb-8">
        <h2 className="scorecard-font-serif text-xl font-bold text-[#3d4a21] mb-4">
          BACK 9 (ENHANCEMENT FEATURES)
        </h2>

        {/* Hole Diagrams Grid */}
        <div className="grid grid-cols-3 md:grid-cols-9 gap-2 mb-4">
          {back9.map((hole) => (
            <div key={hole.number} className="text-center">
              <div className="mb-1">
                <HoleSVGCompact hole={hole} />
              </div>
              <div className="text-xs font-semibold text-[#556b2f]">
                Hole {hole.number}
              </div>
            </div>
          ))}
        </div>

        {/* Scorecard Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="scorecard-table-header">
                <th className="px-3 py-2 text-left text-xs font-semibold border border-[#8b956d]">
                  Hole
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold border border-[#8b956d]">
                  Feature
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold border border-[#8b956d]">
                  Par
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold border border-[#8b956d]">
                  Actual
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold border border-[#8b956d]">
                  +/-
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold border border-[#8b956d]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {back9.map((hole, idx) => {
                const archetype = ARCHETYPE_CONFIG[hole.archetype];
                const status = STATUS_CONFIG[hole.status];
                const variance = calculateVariance(hole.par, hole.actual);

                return (
                  <tr
                    key={hole.number}
                    className="bg-white border-b border-[#d4d4c4] hover:bg-[#faf8f3]"
                  >
                    <td className="px-3 py-2 text-center text-sm font-bold text-[#3d4a21] border border-[#d4d4c4]">
                      {hole.number}
                    </td>
                    <td className="px-3 py-2 text-sm text-[#3d4a21] border border-[#d4d4c4]">
                      {hole.name}
                    </td>
                    <td className="px-3 py-2 text-center text-sm scorecard-font-mono font-semibold text-[#3d4a21] border border-[#d4d4c4]">
                      {hole.par}
                    </td>
                    <td className="px-3 py-2 text-center text-sm scorecard-font-mono text-[#3d4a21] border border-[#d4d4c4]">
                      {hole.actual || "-"}
                    </td>
                    <td className={`px-3 py-2 text-center text-sm scorecard-font-mono font-semibold border border-[#d4d4c4] ${
                      variance === "E"
                        ? "text-[#4a7c2c]"
                        : variance.startsWith("+")
                        ? "text-[#d4a574]"
                        : variance.startsWith("-")
                        ? "text-[#6b9d5b]"
                        : "text-[#9aa589]"
                    }`}>
                      {variance}
                    </td>
                    <td className="px-3 py-2 text-center text-sm border border-[#d4d4c4]">
                      <span
                        style={{ color: status.color }}
                        title={status.description}
                        className="text-lg"
                      >
                        {status.symbol}
                      </span>
                    </td>
                  </tr>
                );
              })}
              <TotalsRowTraditional label="IN" totals={back9Totals} />
            </tbody>
          </table>
        </div>

        {/* Handicap Row */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm font-semibold text-[#556b2f]">HANDICAP:</span>
          <div className="flex gap-1">
            {back9.map((hole, idx) => (
              <div
                key={hole.number}
                className="handicap-box"
              >
                {calculateHandicap(hole, idx, false)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-8 border-t-2 border-[#8b956d] pt-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white border-2 border-[#8b956d] p-4 rounded">
            <div className="text-xs text-[#6b7a4a] mb-1">TOTAL SCORE</div>
            <div className="text-2xl font-bold scorecard-font-mono text-[#3d4a21]">
              {overallTotals.actual || overallTotals.par}
            </div>
            <div className="text-xs text-[#9aa589] mt-1">
              Par: {overallTotals.par}
            </div>
          </div>
          <div className="bg-white border-2 border-[#8b956d] p-4 rounded">
            <div className="text-xs text-[#6b7a4a] mb-1">COMPLETION</div>
            <div className="text-2xl font-bold text-[#3d4a21]">
              {overallTotals.completion}%
            </div>
            <div className="text-xs text-[#9aa589] mt-1">
              {data.course.holes.filter((h) => h.status === "complete").length} / 18 holes
            </div>
          </div>
          <div className="bg-white border-2 border-[#8b956d] p-4 rounded">
            <div className="text-xs text-[#6b7a4a] mb-1">HANDICAP</div>
            <div className="text-2xl font-bold scorecard-font-mono text-[#3d4a21]">
              {overallTotals.actual > 0
                ? (overallTotals.variance / data.course.holes.filter((h) => h.actual > 0).length).toFixed(1)
                : "-"}
            </div>
            <div className="text-xs text-[#9aa589] mt-1 italic">
              {overallTotals.actual > 0 ? "Avg per hole" : "Calculate after completion"}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white border border-[#8b956d] p-4 rounded">
          <h3 className="text-sm font-semibold text-[#3d4a21] mb-3">LEGEND</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-xs">
            <div>
              <span className="font-semibold text-[#4a7c2c]">E</span> = Par (Even)
            </div>
            <div>
              <span className="font-semibold text-[#d4a574]">+</span> = Over par
            </div>
            <div>
              <span className="font-semibold text-[#6b9d5b]">-</span> = Under par
            </div>
            <div>
              <span className="text-lg text-[#4a7c2c]">✓</span> = Complete
            </div>
            <div>
              <span className="text-lg text-[#5a8c3c]">→</span> = In progress
            </div>
            <div>
              <span className="text-lg text-[#c0c0c0]">○</span> = Not started
            </div>
          </div>
        </div>

        {/* Administrative Fields */}
        <div className="mt-4 flex gap-6 text-sm">
          <div>
            <span className="text-[#6b7a4a]">Scorer:</span>{" "}
            <span className="text-[#3d4a21]">________________</span>
          </div>
          <div>
            <span className="text-[#6b7a4a]">Date:</span>{" "}
            <span className="text-[#3d4a21]">________________</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TotalsRowTraditional({ label, totals }: { label: string; totals: Totals }) {
  const variance = calculateVariance(totals.par, totals.actual);
  const varianceColor =
    variance === "E"
      ? "text-[#4a7c2c]"
      : variance.startsWith("+")
      ? "text-[#d4a574]"
      : variance.startsWith("-")
      ? "text-[#6b9d5b]"
      : "text-[#9aa589]";

  return (
    <tr className="scorecard-total-row font-semibold border-t-2 border-[#8b956d]">
      <td className="px-3 py-2 text-sm scorecard-font-mono font-bold border border-[#8b956d]" colSpan={2}>
        {label}
      </td>
      <td className="px-3 py-2 text-center text-sm scorecard-font-mono font-bold border border-[#8b956d]">
        {totals.par}
      </td>
      <td className="px-3 py-2 text-center text-sm scorecard-font-mono font-bold border border-[#8b956d]">
        {totals.actual}
      </td>
      <td className={`px-3 py-2 text-center text-sm scorecard-font-mono font-bold border border-[#8b956d] ${varianceColor}`}>
        {variance}
      </td>
      <td className="px-3 py-2 text-center text-sm scorecard-font-mono font-bold border border-[#8b956d]">
        {totals.completion}%
      </td>
    </tr>
  );
}

