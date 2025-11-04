"use client";

import type { ScorecardData } from "@/types/scorecard";
import { TERRAIN_CONFIG, ARCHETYPE_CONFIG } from "@/types/scorecard";
import { getTerrainForConfidence } from "@/types/scorecard";

interface ManifoldProjectionProps {
  data: ScorecardData;
}

/**
 * Manifold Projection Visualization
 * Shows the hyperdimensional space projected onto a 2D plane
 * Visualizes the journey from Rough (∞-dimensional) to Hole (singular point)
 */
export function ManifoldProjection({ data }: ManifoldProjectionProps) {
  // Calculate positions for each hole based on completion and confidence
  const holePositions = data.course.holes.map((hole, idx) => {
    const avgConfidence = hole.shots.length > 0
      ? hole.shots.reduce((sum, s) => sum + s.confidence, 0) / hole.shots.length
      : 0;
    
    // X position: progress through course (0-100)
    const x = ((idx + 1) / data.course.holes.length) * 100;
    
    // Y position: confidence level (inverted, higher confidence = lower Y)
    const y = 100 - (avgConfidence * 80) - 10;
    
    // Size based on variance
    const variance = hole.actual > 0 ? Math.abs(hole.actual - hole.par) : 0;
    const size = 3 + variance * 1.5;
    
    return {
      hole,
      x,
      y,
      size,
      avgConfidence,
      terrain: getTerrainForConfidence(avgConfidence)
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Manifold Projection
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Hyperdimensional space (ℝⁿ) projected to 2D visualization
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          X-axis: Course progress · Y-axis: Confidence / Dimensionality
        </p>
      </div>

      {/* Main projection visualization */}
      <div className="bg-gradient-to-b from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <svg viewBox="0 0 100 100" className="w-full h-[500px]">
          <defs>
            {/* Gradient representing dimensional collapse */}
            <linearGradient id="dimensionalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={TERRAIN_CONFIG.rough.color} stopOpacity="0.3" />
              <stop offset="25%" stopColor={TERRAIN_CONFIG.fairway.color} stopOpacity="0.3" />
              <stop offset="50%" stopColor={TERRAIN_CONFIG.approach.color} stopOpacity="0.3" />
              <stop offset="75%" stopColor={TERRAIN_CONFIG.green.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={TERRAIN_CONFIG.hole.color} stopOpacity="0.3" />
            </linearGradient>

            {/* Radial gradient for convergence */}
            <radialGradient id="convergenceGradient">
              <stop offset="0%" stopColor={TERRAIN_CONFIG.hole.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={TERRAIN_CONFIG.hole.color} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background terrain zones */}
          <rect width="100" height="100" fill="url(#dimensionalGradient)" />

          {/* Dimensionality indicators */}
          <g className="opacity-20">
            {/* ℝ∞ - Rough */}
            <text x="5" y="15" className="text-[4px] fill-current">
              ℝ<tspan className="text-[3px]" baselineShift="super">∞</tspan>
            </text>
            <text x="5" y="20" className="text-[3px] fill-current">
              Rough
            </text>

            {/* ℝ¹⁰⁰ - Fairway */}
            <text x="30" y="15" className="text-[4px] fill-current">
              ℝ<tspan className="text-[3px]" baselineShift="super">100</tspan>
            </text>
            <text x="30" y="20" className="text-[3px] fill-current">
              Fairway
            </text>

            {/* ℝ¹⁰ - Approach */}
            <text x="55" y="15" className="text-[4px] fill-current">
              ℝ<tspan className="text-[3px]" baselineShift="super">10</tspan>
            </text>
            <text x="55" y="20" className="text-[3px] fill-current">
              Approach
            </text>

            {/* ℝ¹ - Green */}
            <text x="80" y="15" className="text-[4px] fill-current">
              ℝ<tspan className="text-[3px]" baselineShift="super">1</tspan>
            </text>
            <text x="80" y="20" className="text-[3px] fill-current">
              Green
            </text>

            {/* Point - Hole */}
            <text x="95" y="15" className="text-[4px] fill-current" textAnchor="end">
              Point
            </text>
            <text x="95" y="20" className="text-[3px] fill-current" textAnchor="end">
              Goal
            </text>
          </g>

          {/* Manifold surface (curved path through space) */}
          <path
            d={`M 0 70 Q 25 60, 50 40 T 100 20`}
            stroke="#94A3B8"
            strokeWidth="0.5"
            strokeDasharray="1,1"
            fill="none"
            className="opacity-30"
          />

          {/* Connection lines between holes */}
          {holePositions.slice(0, -1).map((pos, idx) => {
            const nextPos = holePositions[idx + 1];
            return (
              <line
                key={`line-${idx}`}
                x1={pos.x}
                y1={pos.y}
                x2={nextPos.x}
                y2={nextPos.y}
                stroke="#3B82F6"
                strokeWidth="0.3"
                strokeOpacity="0.4"
              />
            );
          })}

          {/* Hole markers */}
          {holePositions.map((pos) => {
            const terrainConfig = TERRAIN_CONFIG[pos.terrain];
            const archetypeConfig = ARCHETYPE_CONFIG[pos.hole.archetype];
            const isComplete = pos.hole.status === "complete";
            const isInProgress = pos.hole.status === "in_progress";

            return (
              <g key={pos.hole.number}>
                {/* Glow effect for active holes */}
                {isInProgress && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={pos.size * 2}
                    fill={archetypeConfig.color}
                    opacity="0.2"
                  />
                )}

                {/* Hole marker */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={pos.size}
                  fill={isComplete ? terrainConfig.color : "#CBD5E1"}
                  stroke={archetypeConfig.color}
                  strokeWidth="0.5"
                  opacity={isComplete ? 1 : 0.4}
                  className="cursor-pointer transition-all hover:stroke-width-2"
                >
                  <title>
                    {pos.hole.name} (Hole {pos.hole.number})
                    {'\n'}Par: {pos.hole.par}, Actual: {pos.hole.actual || '-'}
                    {'\n'}Confidence: {(pos.avgConfidence * 100).toFixed(0)}%
                    {'\n'}Terrain: {pos.terrain}
                  </title>
                </circle>

                {/* Hole number */}
                <text
                  x={pos.x}
                  y={pos.y + 1}
                  textAnchor="middle"
                  className="text-[3px] fill-white font-bold pointer-events-none"
                >
                  {pos.hole.number}
                </text>

                {/* Archetype symbol */}
                <text
                  x={pos.x}
                  y={pos.y - pos.size - 2}
                  textAnchor="middle"
                  className="text-[4px] pointer-events-none"
                  fill={archetypeConfig.color}
                >
                  {archetypeConfig.symbol}
                </text>
              </g>
            );
          })}

          {/* Goal marker */}
          <circle
            cx="98"
            cy="15"
            r="4"
            fill={TERRAIN_CONFIG.hole.color}
            stroke="white"
            strokeWidth="0.5"
          />
          <text
            x="98"
            y="17"
            textAnchor="middle"
            className="text-[6px] fill-white font-bold"
          >
            ⛳
          </text>
        </svg>
      </div>

      {/* Dimensional explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border-2 p-4" style={{ borderColor: TERRAIN_CONFIG.rough.color }}>
          <div className="text-3xl mb-2" style={{ color: TERRAIN_CONFIG.rough.color }}>∞</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Rough (ℝ<sup>∞</sup>)</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Infinite dimensional space. All possibilities exist. High entropy, low constraints.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border-2 p-4" style={{ borderColor: TERRAIN_CONFIG.fairway.color }}>
          <div className="text-3xl mb-2" style={{ color: TERRAIN_CONFIG.fairway.color }}>10³</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Fairway (ℝ<sup>100</sup>)</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Manifold emerges. Plausible paths become visible. Medium constraints.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border-2 p-4" style={{ borderColor: TERRAIN_CONFIG.approach.color }}>
          <div className="text-3xl mb-2" style={{ color: TERRAIN_CONFIG.approach.color }}>10</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Approach (ℝ<sup>10</sup>)</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            ε-ball around goal. High confidence, tight constraints. Near convergence.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border-2 p-4" style={{ borderColor: TERRAIN_CONFIG.hole.color }}>
          <div className="text-3xl mb-2" style={{ color: TERRAIN_CONFIG.hole.color }}>●</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Hole (Point)</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Singular point. Goal achieved. Complete dimensional collapse to solution.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Dimensional Analysis
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(TERRAIN_CONFIG).slice(0, 4).map(([key, terrain]) => {
            const count = holePositions.filter(p => p.terrain === key).length;
            const percentage = (count / holePositions.length) * 100;
            
            return (
              <div key={key}>
                <div className="text-2xl font-bold mb-1" style={{ color: terrain.color }}>
                  {count}
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100 capitalize mb-1">
                  {terrain.name}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: terrain.color
                    }}
                  />
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {percentage.toFixed(0)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Theory Note */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🎓 Category Theory Perspective
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          This visualization shows the <strong>Functor F: 𝒮ℯ𝓂 → ℝ²</strong>, projecting 
          the hyperdimensional semantic space onto a 2D plane. Each shot is a morphism 
          <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded text-xs">σ → σ'</code>, 
          and the composition of shots forms a trajectory through the manifold toward the goal.
        </p>
      </div>
    </div>
  );
}

