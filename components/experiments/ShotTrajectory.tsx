"use client";

import type { Hole, Shot } from "@/types/scorecard";
import { SHOT_TYPE_CONFIG, TERRAIN_CONFIG, getTerrainForConfidence } from "@/types/scorecard";

interface ShotTrajectoryProps {
  hole: Hole;
}

function VarianceCone({ shot, index, total }: { shot: Shot; index: number; total: number }) {
  const config = SHOT_TYPE_CONFIG[shot.type];
  const xPos = (index / (total - 1)) * 100;
  
  const coneWidth = {
    wide: 40,
    medium: 25,
    tight: 15,
    minimal: 8,
  }[config.varianceCone];

  return (
    <g>
      {/* Variance cone */}
      <path
        d={`
          M ${xPos} 50
          L ${xPos + coneWidth / 2} 80
          L ${xPos - coneWidth / 2} 80
          Z
        `}
        fill={config.color}
        fillOpacity="0.1"
        stroke={config.color}
        strokeWidth="0.5"
        strokeOpacity="0.3"
      />
      
      {/* Shot point */}
      <circle
        cx={xPos}
        cy={50}
        r={4}
        fill={config.color}
        stroke="white"
        strokeWidth="1"
      />
      
      {/* Confidence text */}
      <text
        x={xPos}
        y={95}
        textAnchor="middle"
        className="text-[6px] fill-gray-600 dark:fill-gray-400"
      >
        {(shot.confidence * 100).toFixed(0)}%
      </text>
    </g>
  );
}

export function ShotTrajectory({ hole }: ShotTrajectoryProps) {
  if (hole.shots.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        No shots recorded yet
      </div>
    );
  }

  // Calculate path through terrain
  const pathData = hole.shots
    .map((shot, i) => {
      const x = (i / (hole.shots.length - 1)) * 100;
      const y = 50;
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="space-y-4">
      {/* Shot trajectory visualization */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Shot Trajectory: {hole.name}
        </h3>
        
        <svg viewBox="0 0 100 100" className="w-full h-64">
          {/* Terrain background gradient */}
          <defs>
            <linearGradient id="terrainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={TERRAIN_CONFIG.rough.color} stopOpacity="0.1" />
              <stop offset="33%" stopColor={TERRAIN_CONFIG.fairway.color} stopOpacity="0.1" />
              <stop offset="66%" stopColor={TERRAIN_CONFIG.approach.color} stopOpacity="0.1" />
              <stop offset="100%" stopColor={TERRAIN_CONFIG.green.color} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Background terrain */}
          <rect width="100" height="100" fill="url(#terrainGradient)" />
          
          {/* Terrain labels */}
          <text x="10" y="10" className="text-[6px] fill-gray-500">Rough</text>
          <text x="40" y="10" className="text-[6px] fill-gray-500">Fairway</text>
          <text x="70" y="10" className="text-[6px] fill-gray-500">Approach</text>
          <text x="90" y="10" className="text-[6px] fill-gray-500" textAnchor="end">Green</text>
          
          {/* Shot path */}
          <path
            d={pathData}
            stroke="#3B82F6"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Variance cones and shot points */}
          {hole.shots.map((shot, i) => (
            <VarianceCone
              key={i}
              shot={shot}
              index={i}
              total={hole.shots.length}
            />
          ))}
          
          {/* Goal marker */}
          <circle
            cx="100"
            cy="50"
            r="6"
            fill={TERRAIN_CONFIG.hole.color}
            stroke="white"
            strokeWidth="1.5"
          />
          <text x="100" y="53" textAnchor="middle" className="text-[8px] fill-white font-bold">
            ⛳
          </text>
        </svg>
      </div>

      {/* Shot details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {hole.shots.map((shot) => {
          const config = SHOT_TYPE_CONFIG[shot.type];
          const terrain = getTerrainForConfidence(shot.confidence);
          const terrainConfig = TERRAIN_CONFIG[terrain];
          
          return (
            <div
              key={shot.number}
              className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl" style={{ color: config.color }}>
                    {config.symbol}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Shot {shot.number}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                      {shot.type}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-mono font-bold" style={{ color: terrainConfig.color }}>
                    {(shot.confidence * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                    {terrain}
                  </div>
                </div>
              </div>
              
              {shot.description && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  {shot.description}
                </p>
              )}
              
              {shot.prompt && (
                <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs font-mono text-gray-600 dark:text-gray-400">
                  {shot.prompt.slice(0, 60)}
                  {shot.prompt.length > 60 && "..."}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

