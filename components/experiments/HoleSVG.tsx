"use client";

import type { Hole, Shot } from "@/types/scorecard";
import { TERRAIN_CONFIG, getTerrainForConfidence, SHOT_TYPE_CONFIG } from "@/types/scorecard";
import { generateHoleLayout } from "@/lib/holeGenerator";

interface HoleSVGProps {
  hole: Hole;
  width?: number;
  height?: number;
  showShotTrajectory?: boolean;
  showLabels?: boolean;
}

/**
 * SVG Component for Top-Down Hole Visualization
 * 
 * Creates a 2D top-down view of a golf hole, similar to traditional golf scorecards.
 * Shows fairway, green, hazards, and shot trajectory through the development process.
 * 
 * This is a "retrospective maquette" - generated during development to visualize
 * the path taken through hyperdimensional space.
 */
export function HoleSVG({
  hole,
  width = 200,
  height = 150,
  showShotTrajectory = true,
  showLabels = true,
}: HoleSVGProps) {
  // Generate hole layout using the generator system
  const layout = generateHoleLayout(hole, width, height);
  const { fairway, green, tee, hazards, trajectory, markers } = layout;

  return (
    <div className="hole-svg-container inline-block">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        className="bg-white"
      >
        <defs>
          {/* Patterns for terrain */}
          <pattern
            id={`rough-pattern-${hole.number}`}
            patternUnits="userSpaceOnUse"
            width="8"
            height="8"
          >
            <path
              d="M0,4 Q2,2 4,4 T8,4"
              stroke="#8b956d"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />
          </pattern>

          <pattern
            id={`fairway-pattern-${hole.number}`}
            patternUnits="userSpaceOnUse"
            width="4"
            height="4"
          >
            <circle cx="2" cy="2" r="0.5" fill="#6b9d5b" opacity="0.2" />
          </pattern>

          {/* Gradient for green */}
          <radialGradient id={`green-gradient-${hole.number}`}>
            <stop offset="0%" stopColor="#4a7c2c" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6b9d5b" stopOpacity="0.6" />
          </radialGradient>
        </defs>

        {/* Background (rough) */}
        <rect width={width} height={height} fill="#f5f0e8" />

        {/* Water hazards */}
        {hazards.water.map((water, idx) => (
          <ellipse
            key={`water-${idx}`}
            cx={water.x}
            cy={water.y}
            rx={water.width / 2}
            ry={water.height / 2}
            fill="#87ceeb"
            opacity="0.6"
          />
        ))}

        {/* Fairway fill (wider) */}
        <path
          d={fairway.path}
          stroke="none"
          fill="#6b9d5b"
          fillOpacity="0.3"
          strokeWidth={fairway.width + 20}
        />

        {/* Fairway */}
        <path
          d={fairway.path}
          stroke="#6b9d5b"
          strokeWidth={fairway.width}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bunkers */}
        {hazards.bunkers.map((bunker, idx) => (
          <circle
            key={`bunker-${idx}`}
            cx={bunker.x}
            cy={bunker.y}
            r={bunker.radius}
            fill="#d2b48c"
            stroke="#b89a7a"
            strokeWidth="1"
          />
        ))}

        {/* Shot trajectory */}
        {showShotTrajectory && trajectory.length > 0 && (
          <g className="shot-trajectory">
            {/* Shot path */}
            <path
              d={`M ${trajectory[0].x} ${trajectory[0].y} ${trajectory
                .slice(1)
                .map((p) => `L ${p.x} ${p.y}`)
                .join(" ")}`}
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="3,3"
              fill="none"
              opacity="0.6"
            />

            {/* Shot markers */}
            {trajectory.map((point, idx) => {
              const shotConfig = SHOT_TYPE_CONFIG[point.shot.type];
              const terrainConfig = TERRAIN_CONFIG[point.terrain as keyof typeof TERRAIN_CONFIG];

              return (
                <g key={`shot-${idx}`}>
                  {/* Variance cone */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={8 + (1 - point.shot.confidence) * 12}
                    fill={terrainConfig.color}
                    fillOpacity="0.1"
                  />
                  
                  {/* Shot marker */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={4}
                    fill={shotConfig.color}
                    stroke="white"
                    strokeWidth="1"
                  />
                  
                  {/* Shot number */}
                  {showLabels && (
                    <text
                      x={point.x}
                      y={point.y - 8}
                      textAnchor="middle"
                      fontSize="8"
                      fill={shotConfig.color}
                      fontWeight="bold"
                    >
                      {idx + 1}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* Green */}
        <circle
          cx={green.x}
          cy={green.y}
          r={green.radius}
          fill={`url(#green-gradient-${hole.number})`}
          stroke="#4a7c2c"
          strokeWidth="2"
        />

        {/* Green flag/hole marker */}
        {hole.status === "complete" && (
          <g>
            <circle
              cx={green.x}
              cy={green.y}
              r={3}
              fill="#8B0000"
              stroke="white"
              strokeWidth="1"
            />
            <text
              x={green.x}
              y={green.y - green.radius - 5}
              textAnchor="middle"
              fontSize="12"
              fill="#8B0000"
              fontWeight="bold"
            >
              ⛳
            </text>
          </g>
        )}

        {/* Tee box */}
        <circle
          cx={tee.x}
          cy={tee.y}
          r={tee.radius}
          fill="#f0f8f0"
          stroke="#6b9d5b"
          strokeWidth="1.5"
        />
        <text
          x={tee.x}
          y={tee.y + 3}
          textAnchor="middle"
          fontSize="10"
          fill="#556b2f"
          fontWeight="bold"
        >
          T
        </text>

        {/* Yardage markers (confidence milestones) */}
        {showLabels && markers.map((marker, idx) => (
          <text
            key={`marker-${idx}`}
            x={marker.x}
            y={marker.y}
            textAnchor="middle"
            fontSize="8"
            fill="#556b2f"
            fontWeight="600"
          >
            {marker.label}
          </text>
        ))}

        {/* Par label */}
        {showLabels && (
          <text
            x={width * 0.5}
            y={height * 0.15}
            textAnchor="middle"
            fontSize="9"
            fill="#556b2f"
            fontWeight="600"
          >
            Par {hole.par}
          </text>
        )}

        {/* Hole number */}
        {showLabels && (
          <text
            x={width * 0.05}
            y={height * 0.95}
            fontSize="14"
            fill="#556b2f"
            fontWeight="bold"
            fontFamily="serif"
          >
            {hole.number}
          </text>
        )}
      </svg>
    </div>
  );
}

/**
 * Compact hole SVG for scorecard grid display
 */
export function HoleSVGCompact({ hole }: { hole: Hole }) {
  return <HoleSVG hole={hole} width={120} height={80} showLabels={false} />;
}

