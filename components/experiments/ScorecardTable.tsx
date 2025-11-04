"use client";

import type { Hole, ScorecardData, Totals } from "@/types/scorecard";
import {
  ARCHETYPE_CONFIG,
  STATUS_CONFIG,
  calculateVariance,
  calculateTotals,
} from "@/types/scorecard";

interface ScorecardTableProps {
  data: ScorecardData;
}

function HoleRow({ hole }: { hole: Hole }) {
  const archetype = ARCHETYPE_CONFIG[hole.archetype];
  const status = STATUS_CONFIG[hole.status];
  const variance = calculateVariance(hole.par, hole.actual);

  const varianceColor =
    variance === "E"
      ? "text-green-600 dark:text-green-400"
      : variance.startsWith("+")
      ? "text-orange-600 dark:text-orange-400"
      : variance.startsWith("-")
      ? "text-blue-600 dark:text-blue-400"
      : "text-gray-400";

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-gray-100">
        {hole.number}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
        {hole.name}
      </td>
      <td className="px-4 py-3 text-center text-sm font-mono text-gray-900 dark:text-gray-100">
        {hole.par}
      </td>
      <td className="px-4 py-3 text-center text-sm font-mono text-gray-900 dark:text-gray-100">
        {hole.actual || "-"}
      </td>
      <td className={`px-4 py-3 text-center text-sm font-mono font-semibold ${varianceColor}`}>
        {variance}
      </td>
      <td className="px-4 py-3 text-center text-sm">
        <span style={{ color: status.color }} title={status.description}>
          {status.symbol}
        </span>
      </td>
      <td className="px-4 py-3 text-xs">
        <span
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full"
          style={{
            backgroundColor: archetype.color + "20",
            color: archetype.color,
          }}
        >
          <span>{archetype.symbol}</span>
          <span>{hole.archetype}</span>
        </span>
      </td>
    </tr>
  );
}

function TotalsRow({ label, totals }: { label: string; totals: Totals }) {
  const variance = calculateVariance(totals.par, totals.actual);
  const varianceColor =
    variance === "E"
      ? "text-green-600 dark:text-green-400"
      : variance.startsWith("+")
      ? "text-orange-600 dark:text-orange-400"
      : variance.startsWith("-")
      ? "text-blue-600 dark:text-blue-400"
      : "text-gray-400";

  return (
    <tr className="bg-gray-100 dark:bg-gray-800 font-semibold border-t-2 border-gray-300 dark:border-gray-600">
      <td className="px-4 py-3 text-sm font-mono" colSpan={2}>
        {label}
      </td>
      <td className="px-4 py-3 text-center text-sm font-mono">{totals.par}</td>
      <td className="px-4 py-3 text-center text-sm font-mono">{totals.actual}</td>
      <td className={`px-4 py-3 text-center text-sm font-mono ${varianceColor}`}>
        {variance}
      </td>
      <td className="px-4 py-3 text-center text-sm font-mono" colSpan={2}>
        {totals.completion}%
      </td>
    </tr>
  );
}

export function ScorecardTable({ data }: ScorecardTableProps) {
  const front9 = data.course.holes.slice(0, 9);
  const back9 = data.course.holes.slice(9, 18);
  const front9Totals = calculateTotals(front9);
  const back9Totals = calculateTotals(back9);
  const overallTotals = calculateTotals(data.course.holes);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b-2 border-gray-300 dark:border-gray-600 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span>⛳</span>
          <span>Hyperdimensional Vector Space Golf</span>
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Development Scorecard
        </p>
        <div className="mt-4 space-y-1 font-mono text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">PRODUCT:</span>{" "}
            <span className="text-gray-900 dark:text-gray-100">{data.project.product}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">DEVELOPER:</span>{" "}
            <span className="text-gray-900 dark:text-gray-100">{data.project.developer}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">DATE:</span>{" "}
            <span className="text-gray-900 dark:text-gray-100">
              {data.project.dateStart} - {data.project.dateEnd}
            </span>
          </div>
        </div>
      </div>

      {/* Front 9 */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          FRONT 9 (Core Features / MVP)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                  Hole
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                  Feature
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 dark:text-gray-400">
                  Par
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 dark:text-gray-400">
                  Actual
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 dark:text-gray-400">
                  +/-
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 dark:text-gray-400">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {front9.map((hole) => (
                <HoleRow key={hole.number} hole={hole} />
              ))}
              <TotalsRow label="OUT" totals={front9Totals} />
            </tbody>
          </table>
        </div>
      </div>

      {/* Back 9 */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          BACK 9 (Enhancement Features)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                  Hole
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                  Feature
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 dark:text-gray-400">
                  Par
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 dark:text-gray-400">
                  Actual
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 dark:text-gray-400">
                  +/-
                </th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 dark:text-gray-400">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {back9.map((hole) => (
                <HoleRow key={hole.number} hole={hole} />
              ))}
              <TotalsRow label="IN" totals={back9Totals} />
            </tbody>
          </table>
        </div>
      </div>

      {/* Overall Totals */}
      <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400">TOTAL SCORE</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {overallTotals.actual}
            </div>
            <div className="text-xs text-gray-500">Par: {overallTotals.par}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400">VARIANCE</div>
            <div
              className={`text-2xl font-bold ${
                overallTotals.variance === 0
                  ? "text-green-600 dark:text-green-400"
                  : overallTotals.variance > 0
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-blue-600 dark:text-blue-400"
              }`}
            >
              {calculateVariance(overallTotals.par, overallTotals.actual)}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400">COMPLETION</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {overallTotals.completion}%
            </div>
            <div className="text-xs text-gray-500">
              {data.course.holes.filter((h) => h.status === "complete").length} / 18 holes
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400">HANDICAP</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {overallTotals.actual > 0
                ? (overallTotals.variance / data.course.holes.filter((h) => h.actual > 0).length).toFixed(1)
                : "-"}
            </div>
            <div className="text-xs text-gray-500">Avg per hole</div>
          </div>
        </div>
      </div>
    </div>
  );
}

