"use client";

import type { ScorecardData } from "@/types/scorecard";
import { STATUS_CONFIG, ARCHETYPE_CONFIG } from "@/types/scorecard";

interface ProgressTimelineProps {
  data: ScorecardData;
}

export function ProgressTimeline({ data }: ProgressTimelineProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Progress Timeline
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          18-hole course progression through hyperdimensional space
        </p>
      </div>

      {/* Timeline visualization */}
      <div className="relative">
        {/* Horizontal timeline */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700" />
        
        {/* Holes */}
        <div className="relative flex justify-between items-start">
          {data.course.holes.map((hole, idx) => {
            const archetype = ARCHETYPE_CONFIG[hole.archetype];
            const status = STATUS_CONFIG[hole.status];
            const isFront9 = hole.number <= 9;

            return (
              <div
                key={hole.number}
                className="flex flex-col items-center"
                style={{ width: `${100 / 18}%` }}
              >
                {/* Hole marker */}
                <div
                  className={`
                    w-16 h-16 rounded-full border-4 flex items-center justify-center
                    transition-all hover:scale-110 cursor-pointer relative z-10
                    ${
                      hole.status === "complete"
                        ? "bg-green-500 border-green-700"
                        : hole.status === "in_progress"
                        ? "bg-blue-500 border-blue-700"
                        : "bg-gray-300 dark:bg-gray-700 border-gray-400 dark:border-gray-600"
                    }
                  `}
                  title={hole.name}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {hole.number}
                    </div>
                    <div className="text-xs text-white/90">
                      {hole.actual > 0 ? `${hole.actual}/${hole.par}` : `P${hole.par}`}
                    </div>
                  </div>
                </div>

                {/* Archetype symbol */}
                <div
                  className="mt-2 text-2xl"
                  style={{ color: archetype.color }}
                  title={hole.archetype}
                >
                  {archetype.symbol}
                </div>

                {/* Hole name */}
                <div className="mt-1 text-xs text-center text-gray-700 dark:text-gray-300 font-medium px-1">
                  {hole.name.split(" ").slice(0, 2).join(" ")}
                </div>

                {/* Status */}
                <div className="mt-1 text-sm" style={{ color: status.color }}>
                  {status.symbol}
                </div>

                {/* Divider between Front 9 and Back 9 */}
                {hole.number === 9 && (
                  <div className="absolute left-full top-0 bottom-0 w-px bg-gray-400 dark:bg-gray-600 ml-2">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 px-2 py-1 text-xs font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      Turn
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Front 9 / Back 9 sections */}
      <div className="grid grid-cols-2 gap-6 mt-12">
        {/* Front 9 */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Front 9 (Core Features)
          </h3>
          
          <div className="space-y-2">
            {data.course.holes.slice(0, 9).map((hole) => {
              const archetype = ARCHETYPE_CONFIG[hole.archetype];
              const status = STATUS_CONFIG[hole.status];
              
              return (
                <div
                  key={hole.number}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-semibold text-sm">
                    {hole.number}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {hole.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {archetype.symbol} {hole.archetype} · Par {hole.par}
                      {hole.actual > 0 && ` · ${hole.actual} shots`}
                    </div>
                  </div>
                  
                  <div
                    className="text-lg flex-shrink-0"
                    style={{ color: status.color }}
                    title={status.description}
                  >
                    {status.symbol}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Back 9 */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Back 9 (Enhancements)
          </h3>
          
          <div className="space-y-2">
            {data.course.holes.slice(9, 18).map((hole) => {
              const archetype = ARCHETYPE_CONFIG[hole.archetype];
              const status = STATUS_CONFIG[hole.status];
              
              return (
                <div
                  key={hole.number}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-semibold text-sm">
                    {hole.number}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {hole.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {archetype.symbol} {hole.archetype} · Par {hole.par}
                      {hole.actual > 0 && ` · ${hole.actual} shots`}
                    </div>
                  </div>
                  
                  <div
                    className="text-lg flex-shrink-0"
                    style={{ color: status.color }}
                    title={status.description}
                  >
                    {status.symbol}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {data.course.holes.filter((h) => h.status === "complete").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Completed
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {data.course.holes.filter((h) => h.status === "in_progress").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            In Progress
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-3xl font-bold text-gray-600 dark:text-gray-400">
            {data.course.holes.filter((h) => h.status === "not_started").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Not Started
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {Math.round(
              (data.course.holes.filter((h) => h.status === "complete").length / 18) * 100
            )}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Complete
          </div>
        </div>
      </div>
    </div>
  );
}

