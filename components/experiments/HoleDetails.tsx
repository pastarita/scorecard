"use client";

import { useState } from "react";
import type { ScorecardData, Hole } from "@/types/scorecard";
import { ShotTrajectory } from "./ShotTrajectory";
import { ARCHETYPE_CONFIG, STATUS_CONFIG } from "@/types/scorecard";

interface HoleDetailsProps {
  data: ScorecardData;
}

export function HoleDetails({ data }: HoleDetailsProps) {
  const [selectedHole, setSelectedHole] = useState<Hole>(data.course.holes[0]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Hole Details
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Detailed view of individual development tasks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hole selector */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Select Hole
            </h3>
            
            <div className="space-y-1 max-h-[600px] overflow-y-auto">
              {data.course.holes.map((hole) => {
                const archetype = ARCHETYPE_CONFIG[hole.archetype];
                const status = STATUS_CONFIG[hole.status];
                const isSelected = selectedHole.number === hole.number;

                return (
                  <button
                    key={hole.number}
                    onClick={() => setSelectedHole(hole)}
                    className={`
                      w-full text-left p-3 rounded-lg transition-colors
                      ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-transparent"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        {hole.number}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {hole.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {archetype.symbol} Par {hole.par}
                          {hole.actual > 0 && ` · ${hole.actual} shots`}
                        </div>
                      </div>
                      
                      <div className="text-lg flex-shrink-0" style={{ color: status.color }}>
                        {status.symbol}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hole details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Hole {selectedHole.number}
                  </h3>
                  <span
                    className="text-3xl"
                    style={{ color: ARCHETYPE_CONFIG[selectedHole.archetype].color }}
                  >
                    {ARCHETYPE_CONFIG[selectedHole.archetype].symbol}
                  </span>
                </div>
                <h4 className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                  {selectedHole.name}
                </h4>
                {selectedHole.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {selectedHole.description}
                  </p>
                )}
              </div>

              <div className="text-right">
                <div
                  className="text-4xl mb-1"
                  style={{ color: STATUS_CONFIG[selectedHole.status].color }}
                >
                  {STATUS_CONFIG[selectedHole.status].symbol}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {STATUS_CONFIG[selectedHole.status].description}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Par</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedHole.par}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Actual</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedHole.actual || "-"}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Variance</div>
                <div
                  className={`text-2xl font-bold ${
                    selectedHole.actual === 0
                      ? "text-gray-400"
                      : selectedHole.actual < selectedHole.par
                      ? "text-blue-600 dark:text-blue-400"
                      : selectedHole.actual === selectedHole.par
                      ? "text-green-600 dark:text-green-400"
                      : "text-orange-600 dark:text-orange-400"
                  }`}
                >
                  {selectedHole.actual === 0
                    ? "-"
                    : selectedHole.actual === selectedHole.par
                    ? "E"
                    : (selectedHole.actual > selectedHole.par ? "+" : "") +
                      (selectedHole.actual - selectedHole.par)}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Shots</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedHole.shots.length}
                </div>
              </div>
            </div>

            {/* Archetype info */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{
                  backgroundColor:
                    ARCHETYPE_CONFIG[selectedHole.archetype].color + "20",
                  color: ARCHETYPE_CONFIG[selectedHole.archetype].color,
                }}
              >
                <span className="text-2xl">
                  {ARCHETYPE_CONFIG[selectedHole.archetype].symbol}
                </span>
                <div>
                  <div className="font-semibold">{selectedHole.archetype}</div>
                  <div className="text-xs opacity-90">
                    {ARCHETYPE_CONFIG[selectedHole.archetype].description}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <strong>Strategy:</strong>{" "}
                {ARCHETYPE_CONFIG[selectedHole.archetype].strategy}
              </div>
            </div>

            {/* Notes */}
            {selectedHole.notes && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Notes
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedHole.notes}
                </p>
              </div>
            )}
          </div>

          {/* Shot trajectory */}
          {selectedHole.shots.length > 0 && (
            <ShotTrajectory hole={selectedHole} />
          )}

          {/* No shots message */}
          {selectedHole.shots.length === 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
              <div className="text-6xl text-gray-300 dark:text-gray-700 mb-4">
                ○
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No shots recorded
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                This hole hasn't been started yet. Shots will appear here as development progresses.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

