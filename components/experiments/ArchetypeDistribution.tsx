"use client";

import type { ScorecardData, ScorecardArchetype } from "@/types/scorecard";
import { ARCHETYPE_CONFIG } from "@/types/scorecard";

interface ArchetypeDistributionProps {
  data: ScorecardData;
}

export function ArchetypeDistribution({ data }: ArchetypeDistributionProps) {
  // Calculate distribution
  const distribution = Object.keys(ARCHETYPE_CONFIG).reduce((acc, archetype) => {
    const holes = data.course.holes.filter(
      (h) => h.archetype === archetype
    );
    const completed = holes.filter((h) => h.status === "complete");
    
    return {
      ...acc,
      [archetype]: {
        total: holes.length,
        completed: completed.length,
        inProgress: holes.filter((h) => h.status === "in_progress").length,
        notStarted: holes.filter((h) => h.status === "not_started").length,
        totalPar: holes.reduce((sum, h) => sum + h.par, 0),
        totalActual: holes.reduce((sum, h) => sum + h.actual, 0),
      },
    };
  }, {} as Record<string, any>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Archetype Distribution
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Analysis of task types and their characteristics
        </p>
      </div>

      {/* Archetype cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(ARCHETYPE_CONFIG).map(([key, config]) => {
          const stats = distribution[key];
          const completionRate = stats.total > 0
            ? (stats.completed / stats.total) * 100
            : 0;

          return (
            <div
              key={key}
              className="bg-white dark:bg-gray-900 rounded-lg border-2 p-6"
              style={{ borderColor: config.color }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl" style={{ color: config.color }}>
                  {config.symbol}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stats.total}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    holes
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {key}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {config.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Par {config.par}</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    {config.strategy}
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-gray-900 dark:text-gray-100 font-semibold">
                      {completionRate.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${completionRate}%`,
                        backgroundColor: config.color,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                  <div>
                    <div className="text-green-600 dark:text-green-400 font-semibold">
                      {stats.completed}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Done</div>
                  </div>
                  <div>
                    <div className="text-blue-600 dark:text-blue-400 font-semibold">
                      {stats.inProgress}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Active</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 font-semibold">
                      {stats.notStarted}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Todo</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Efficiency analysis */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Efficiency Analysis
        </h3>
        
        <div className="space-y-3">
          {Object.entries(ARCHETYPE_CONFIG).map(([key, config]) => {
            const stats = distribution[key];
            const variance = stats.totalActual - stats.totalPar;
            const avgVariance = stats.completed > 0 ? variance / stats.completed : 0;
            
            return (
              <div key={key} className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: config.color + "20", color: config.color }}
                >
                  {config.symbol}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {key}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {stats.totalActual} / {stats.totalPar} shots
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, (stats.totalActual / stats.totalPar) * 100)}%`,
                          backgroundColor:
                            variance < 0
                              ? "#10B981"
                              : variance === 0
                              ? "#F59E0B"
                              : "#EF4444",
                        }}
                      />
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        variance < 0
                          ? "text-blue-600 dark:text-blue-400"
                          : variance === 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-orange-600 dark:text-orange-400"
                      }`}
                    >
                      {variance === 0 ? "E" : (variance > 0 ? "+" : "") + variance}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

