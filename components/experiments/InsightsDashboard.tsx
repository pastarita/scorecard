"use client";

import type { ScorecardData } from "@/types/scorecard";
import {
  generateInsights,
  calculateEfficiency,
  calculateHandicap,
  calculateVelocity,
  estimateCompletionDate,
  calculateArchetypeMetrics,
  calculateShotTypeDistribution,
  calculateAverageConfidence
} from "@/lib/calculations";
import { SHOT_TYPE_CONFIG, ARCHETYPE_CONFIG } from "@/types/scorecard";

interface InsightsDashboardProps {
  data: ScorecardData;
}

export function InsightsDashboard({ data }: InsightsDashboardProps) {
  const insights = generateInsights(data);
  const efficiency = calculateEfficiency(data.course.holes);
  const handicap = calculateHandicap(data.course.holes);
  const velocity = calculateVelocity(data);
  const estimatedCompletion = estimateCompletionDate(data);
  const archetypeMetrics = calculateArchetypeMetrics(data.course.holes);
  const shotDistribution = calculateShotTypeDistribution(data.course.holes);
  const avgConfidence = calculateAverageConfidence(data.course.holes);

  const completed = data.course.holes.filter(h => h.status === "complete").length;
  const inProgress = data.course.holes.filter(h => h.status === "in_progress").length;
  const notStarted = data.course.holes.filter(h => h.status === "not_started").length;

  const totalShots = data.course.holes.reduce((sum, h) => sum + h.shots.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Insights Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Analytics and recommendations for your development journey
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">⚡</span>
            <div className={`text-2xl font-bold ${
              efficiency > 90 ? "text-green-600" :
              efficiency > 70 ? "text-blue-600" :
              "text-orange-600"
            }`}>
              {efficiency}%
            </div>
          </div>
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Efficiency
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Par / Actual ratio
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🎯</span>
            <div className={`text-2xl font-bold font-mono ${
              handicap < 0 ? "text-blue-600" :
              handicap === 0 ? "text-green-600" :
              "text-orange-600"
            }`}>
              {handicap > 0 ? "+" : ""}{handicap.toFixed(1)}
            </div>
          </div>
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Handicap
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Avg variance per hole
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🚀</span>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {velocity}
            </div>
          </div>
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Velocity
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Holes per day
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">📊</span>
            <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              {(avgConfidence * 100).toFixed(0)}%
            </div>
          </div>
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Avg Confidence
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Across all shots
          </div>
        </div>
      </div>

      {/* Insights Cards */}
      {insights.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            💡 Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, idx) => (
              <div
                key={idx}
                className={`rounded-lg border-l-4 p-4 ${
                  insight.type === "success"
                    ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                    : insight.type === "warning"
                    ? "bg-orange-50 dark:bg-orange-900/20 border-orange-500"
                    : "bg-blue-50 dark:bg-blue-900/20 border-blue-500"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">
                    {insight.type === "success" ? "✅" :
                     insight.type === "warning" ? "⚠️" : "ℹ️"}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Overview */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          📈 Progress Overview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {completed}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Completed Holes
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-green-600"
                style={{ width: `${(completed / 18) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {inProgress}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              In Progress
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{ width: `${(inProgress / 18) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold text-gray-600 dark:text-gray-400 mb-2">
              {notStarted}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Not Started
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gray-600"
                style={{ width: `${(notStarted / 18) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Estimated Completion
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Based on current velocity
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {estimatedCompletion.toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {Math.ceil((estimatedCompletion.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shot Type Distribution */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          🏌️ Shot Type Distribution
        </h3>
        
        <div className="space-y-3">
          {Object.entries(shotDistribution).map(([type, count]) => {
            const config = SHOT_TYPE_CONFIG[type as keyof typeof SHOT_TYPE_CONFIG];
            const percentage = totalShots > 0 ? (count / totalShots) * 100 : 0;
            
            return (
              <div key={type}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" style={{ color: config.color }}>
                      {config.symbol}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                      {type}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {config.terrain}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {count} ({percentage.toFixed(0)}%)
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: config.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Archetype Performance Matrix */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          ⊗ Archetype Performance Matrix
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">
                  Archetype
                </th>
                <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">
                  Total
                </th>
                <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">
                  Completed
                </th>
                <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">
                  Par
                </th>
                <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">
                  Actual
                </th>
                <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">
                  Avg Δ
                </th>
                <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">
                  Efficiency
                </th>
              </tr>
            </thead>
            <tbody>
              {archetypeMetrics.map((metric) => {
                const config = ARCHETYPE_CONFIG[metric.archetype];
                return (
                  <tr key={metric.archetype} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span style={{ color: config.color }}>{config.symbol}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {metric.archetype}
                        </span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-3 text-gray-900 dark:text-gray-100">
                      {metric.total}
                    </td>
                    <td className="text-center py-3 px-3 text-gray-900 dark:text-gray-100">
                      {metric.completed}
                    </td>
                    <td className="text-center py-3 px-3 text-gray-900 dark:text-gray-100 font-mono">
                      {metric.totalPar}
                    </td>
                    <td className="text-center py-3 px-3 text-gray-900 dark:text-gray-100 font-mono">
                      {metric.totalActual}
                    </td>
                    <td className={`text-center py-3 px-3 font-mono font-semibold ${
                      metric.averageVariance < 0 ? "text-blue-600 dark:text-blue-400" :
                      metric.averageVariance === 0 ? "text-green-600 dark:text-green-400" :
                      "text-orange-600 dark:text-orange-400"
                    }`}>
                      {metric.averageVariance > 0 ? "+" : ""}{metric.averageVariance}
                    </td>
                    <td className="text-center py-3 px-3">
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className="text-sm font-semibold"
                          style={{ color: metric.efficiency > 90 ? "#10B981" : metric.efficiency > 70 ? "#3B82F6" : "#F59E0B" }}
                        >
                          {metric.efficiency}%
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-6">
        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
          🎯 Recommendations
        </h3>
        <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
          {efficiency < 80 && (
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Consider breaking down complex tasks into smaller holes to improve par estimation</span>
            </li>
          )}
          {velocity < 0.5 && (
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Current velocity is low - consider simplifying remaining holes or adjusting timeline</span>
            </li>
          )}
          {avgConfidence < 0.7 && (
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Average confidence is below 70% - more exploratory driver shots might help</span>
            </li>
          )}
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Track recovery shots to identify areas where planning could be improved</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Use intermediate representations (IRs) between shots to maintain coherence</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

