"use client";

import type { ScorecardData } from "@/types/scorecard";
import { TERRAIN_CONFIG, getTerrainForConfidence } from "@/types/scorecard";

interface ConfidenceHeatmapProps {
  data: ScorecardData;
}

export function ConfidenceHeatmap({ data }: ConfidenceHeatmapProps) {
  // Calculate average confidence for each hole
  const holeConfidences = data.course.holes.map((hole) => {
    if (hole.shots.length === 0) return null;
    const avgConfidence =
      hole.shots.reduce((sum, shot) => sum + shot.confidence, 0) / hole.shots.length;
    return {
      hole: hole.number,
      name: hole.name,
      confidence: avgConfidence,
      terrain: getTerrainForConfidence(avgConfidence),
      shotCount: hole.shots.length,
      status: hole.status,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Confidence Heatmap
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Visual representation of confidence levels across all development tasks
        </p>
      </div>

      {/* Heatmap grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {holeConfidences.map((holeData, idx) => {
          if (!holeData) {
            return (
              <div
                key={idx}
                className="aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-400">
                    {data.course.holes[idx].number}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Not started</div>
                </div>
              </div>
            );
          }

          const terrainConfig = TERRAIN_CONFIG[holeData.terrain];
          const opacity = 0.3 + holeData.confidence * 0.7;

          return (
            <div
              key={holeData.hole}
              className="aspect-square rounded-lg flex flex-col items-center justify-center p-3 cursor-pointer transition-transform hover:scale-105"
              style={{
                backgroundColor: terrainConfig.color,
                opacity,
              }}
              title={`${holeData.name}: ${(holeData.confidence * 100).toFixed(0)}% confidence`}
            >
              <div className="text-2xl font-bold text-white drop-shadow-md">
                {holeData.hole}
              </div>
              <div className="text-xs text-white font-semibold drop-shadow-md mt-1">
                {(holeData.confidence * 100).toFixed(0)}%
              </div>
              <div className="text-[10px] text-white/90 drop-shadow-md capitalize mt-1">
                {holeData.terrain}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Terrain Legend
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.values(TERRAIN_CONFIG).map((terrain) => (
            <div key={terrain.name} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: terrain.color }}
              />
              <div>
                <div className="text-xs font-medium text-gray-900 dark:text-gray-100 capitalize">
                  {terrain.name}
                </div>
                <div className="text-[10px] text-gray-600 dark:text-gray-400">
                  {(terrain.confidenceMin * 100).toFixed(0)}-
                  {(terrain.confidenceMax * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(TERRAIN_CONFIG).map(([key, terrain]) => {
          const count = holeConfidences.filter(
            (h) => h && h.terrain === key
          ).length;
          const percentage = holeConfidences.filter((h) => h !== null).length > 0
            ? (count / holeConfidences.filter((h) => h !== null).length) * 100
            : 0;

          return (
            <div
              key={key}
              className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
            >
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: terrain.color }}
              >
                {count}
              </div>
              <div className="text-sm text-gray-900 dark:text-gray-100 capitalize">
                {terrain.name}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {percentage.toFixed(0)}% of holes
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

