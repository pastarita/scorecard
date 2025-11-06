"use client";

import { useState } from "react";
import type { ScorecardData, Hole } from "@/types/scorecard";
import { STATUS_CONFIG, TERRAIN_CONFIG, SHOT_TYPE_CONFIG } from "@/types/scorecard";
import { calculateTotals } from "@/types/scorecard";
import { generateHoleLayout } from "@/lib/holeGenerator";
import { HoleFrame } from "./HoleFrame";
import { FoggedHoleFrame } from "./fog/FoggedHoleFrame";
import { HoleColumn } from "./HoleColumn";
import { useResizeObserver } from "./hooks/useResizeObserver";

interface HorizontalScorecardBarProps {
  data: ScorecardData;
}

type ViewMode = "front9" | "back9";

export interface HolePlanViewProps {
  hole: Hole;
  isActive: boolean;
  onHover: () => void;
}

// Golf hole plan view component using builder pattern
export function HolePlanView({ hole, isActive, onHover }: HolePlanViewProps) {
  const statusConfig = STATUS_CONFIG[hole.status];
  const hasShots = hole.shots.length > 0;
  
  // Use the builder pattern to generate hole layout
  const layout = generateHoleLayout(hole, 100, 80);
  const { fairway, green, tee, hazards, trajectory } = layout;

  const isComplete = hole.status === "complete";
  const isInProgress = hole.status === "in_progress";
  const isNotStarted = hole.status === "not_started";

  // Watch for container size changes to ensure proportional SVG resizing
  const [frameRef, frameSize] = useResizeObserver<HTMLDivElement>();

  return (
    <div
      ref={frameRef}
      className="relative w-full h-full cursor-pointer group overflow-hidden"
      onMouseEnter={onHover}
    >
      {/* Hole Frame with Fog Overlay - Represents uncertainty/clarity */}
      <FoggedHoleFrame hole={hole} isActive={isActive} isEditable={true}>
        {/* SVG Golf Hole Plan View - Rotated 90 degrees counterclockwise */}
        {/* This SVG expands vertically to fill available height proportionally */}
        {/* Frame size: {frameSize.width}x{frameSize.height} */}
        <svg
          viewBox="0 0 100 80"
          className="w-full h-full flex-1 min-h-0"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Rotate entire content 90 degrees counterclockwise around center */}
          <g transform="rotate(-90 50 40)">
            {/* Background (rough) */}
            <rect width="100" height="80" fill="#f5f0e8" />
          
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
            fillOpacity={isNotStarted ? 0.2 : 0.3}
            strokeWidth={fairway.width + 20}
          />

          {/* Fairway path */}
          <path
            d={fairway.path}
            stroke="#6b9d5b"
            strokeWidth={fairway.width}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={isNotStarted ? 0.4 : isInProgress ? 0.6 : 0.8}
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

          {/* Shot trajectory - show all shots */}
          {hasShots && trajectory.length > 0 && (
            <g className="shot-trajectory">
              {/* Shot path connecting all shots */}
              <path
                d={`M ${trajectory[0].x} ${trajectory[0].y} ${trajectory
                  .slice(1)
                  .map((p) => `L ${p.x} ${p.y}`)
                  .join(" ")}`}
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeDasharray="2,2"
                fill="none"
                opacity="0.6"
              />

              {/* Shot markers - show all shots */}
              {trajectory.map((point, idx) => {
                const shotConfig = SHOT_TYPE_CONFIG[point.shot.type];
                const terrainConfig = TERRAIN_CONFIG[point.terrain as keyof typeof TERRAIN_CONFIG];

                return (
                  <g key={`shot-${idx}`}>
                    {/* Variance cone */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={4 + (1 - point.shot.confidence) * 6}
                      fill={terrainConfig.color}
                      fillOpacity="0.15"
                    />
                    
                    {/* Shot marker */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={3}
                      fill={shotConfig.color}
                      stroke="white"
                      strokeWidth="0.5"
                    />
                    
                    {/* Shot number (small) */}
                    <text
                      x={point.x}
                      y={point.y + 1}
                      textAnchor="middle"
                      fontSize="6"
                      fill="white"
                      fontWeight="bold"
                    >
                      {idx + 1}
                    </text>
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
            fill={isComplete ? "#4a7c2c" : "#6b9d5b"}
            stroke={isComplete ? "#3d4a21" : "#556b2f"}
            strokeWidth="1.5"
            opacity={isComplete ? 1 : 0.7}
          />

          {/* Green flag/hole marker - Red flag SVG */}
          <g transform={`translate(${green.x}, ${green.y})`}>
            {/* Flag pole */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-8"
              stroke="#8B0000"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* Flag */}
            <path
              d="M 0 -8 L 0 -8 L -4 -6 L 0 -4 Z"
              fill="#8B0000"
              stroke="white"
              strokeWidth="0.3"
            />
            {/* Hole circle */}
            <circle
              cx="0"
              cy="0"
              r="1.5"
              fill="#8B0000"
              stroke="white"
              strokeWidth="0.5"
            />
          </g>

          {/* Tee box */}
          <circle
            cx={tee.x}
            cy={tee.y}
            r={tee.radius}
            fill="#f0f8f0"
            stroke="#6b9d5b"
            strokeWidth="1"
          />
          <text
            x={tee.x}
            y={tee.y + 2}
            textAnchor="middle"
            fontSize="7"
            fill="#556b2f"
            fontWeight="bold"
          >
            T
          </text>
          </g>
        </svg>

        {/* Hole Number Overlay */}
        <div className="absolute top-1 left-1 text-xs font-semibold text-[#3d4a21] bg-white/80 px-1 rounded">
          {hole.number}
        </div>

        {/* Par/Actual Overlay */}
        <div className="absolute bottom-1 right-1 text-xs font-medium text-[#556b2f] bg-white/80 px-1 rounded">
          {hole.par}/{hole.actual || "-"}
        </div>

        {/* Shot Count Badge */}
        {hasShots && (
          <div className="absolute top-1 right-1 text-xs font-medium text-[#3d4a21] bg-[#c8e0c8]/90 px-1 rounded z-10">
            {hole.shots.length} shot{hole.shots.length !== 1 ? "s" : ""}
          </div>
        )}
      </FoggedHoleFrame>

      {/* Hover Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-50">
        <div className="bg-[#3d4a21] text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap">
          <div className="font-semibold">{hole.name}</div>
          <div className="text-[#c8e0c8]">
            Par {hole.par} • Actual {hole.actual || "-"} • {statusConfig.description}
          </div>
          {hasShots && (
            <div className="text-[#c8e0c8] mt-1">
              Shots: {hole.shots.length} • {hole.shots.map((s, i) => SHOT_TYPE_CONFIG[s.type].symbol).join(" ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Ladder component - shows 1-9 for Front 9, 10-18 for Back 9
export interface LadderProps {
  holes: Hole[];
  activeHole: number | null;
  onHoleHover: (holeNumber: number) => void;
  viewMode: ViewMode;
}

export function Ladder({ holes, activeHole, onHoleHover, viewMode }: LadderProps) {
  // Ladder is always on the left side for both Front 9 and Back 9
  // This component scales with the height of the HolePlanViewContainer
  // Since holes are displayed in a single row, all rungs align at the center
  // but are displayed in a compact vertical stack for visual reference
  
  return (
    <div className="relative w-full h-full flex items-center">
      {/* Vertical Line - always on left, scales with container height */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#8b956d]" />
      
      {/* Rungs Container - centered vertically, scales with container height */}
      <div className="relative w-full h-full flex flex-col justify-center items-start pl-0.5">
        {holes.map((hole, index) => {
          const isActive = activeHole === hole.number;
          
          return (
            <div
              key={hole.number}
              className="relative cursor-pointer group flex items-center mb-0.5 last:mb-0"
              onMouseEnter={() => onHoleHover(hole.number)}
            >
              {/* Rung - horizontal dash (shorter to push numbers further left) */}
              <div className={`w-3 h-0.5 bg-[#8b956d] ${
                isActive ? "bg-[#556b2f]" : ""
              } transition-colors`} />
              
              {/* Number Label - show actual hole number (1-9 or 10-18) */}
              <div className={`ml-1.5 text-xs font-medium text-[#556b2f] whitespace-nowrap ${
                isActive ? "font-bold" : ""
              }`}>
                {hole.number}
              </div>
              
              {/* Active Indicator - dot on left side of rung */}
              {isActive && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#556b2f] rounded-full" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function HorizontalScorecardBar({ data }: HorizontalScorecardBarProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("front9");
  const [hoveredHole, setHoveredHole] = useState<number | null>(null);
  
  const front9 = data.course.holes.slice(0, 9);
  const back9 = data.course.holes.slice(9, 18);
  const currentHoles = viewMode === "front9" ? front9 : back9;
  
  const front9Totals = calculateTotals(front9);
  const back9Totals = calculateTotals(back9);
  const overallTotals = calculateTotals(data.course.holes);
  
  const currentTotals = viewMode === "front9" ? front9Totals : back9Totals;
  const progress = overallTotals.completion;

  // Watch for holes container size changes to ensure proportional resizing
  const [holesContainerRef, holesContainerSize] = useResizeObserver<HTMLDivElement>();

  return (
    <div className="bg-[#faf8f3] border-b-2 border-[#8b956d] shadow-sm h-full flex flex-col overflow-hidden">
        <div className="px-4 py-3 flex-shrink-0">
          {/* Header with View Toggle */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <h2 className="scorecard-title text-base font-bold text-[#3d4a21]">
                HYPERDIMENSIONAL GOLF SCORECARD
              </h2>
              
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-white border border-[#8b956d] rounded p-1">
                <button
                  onClick={() => setViewMode("front9")}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    viewMode === "front9"
                      ? "bg-[#c8e0c8] text-[#3d4a21] font-semibold"
                      : "text-[#6b7a4a] hover:text-[#3d4a21]"
                  }`}
                >
                  FRONT 9
                </button>
                <div className="w-px h-4 bg-[#8b956d]" />
                <button
                  onClick={() => setViewMode("back9")}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    viewMode === "back9"
                      ? "bg-[#c8e0c8] text-[#3d4a21] font-semibold"
                      : "text-[#6b7a4a] hover:text-[#3d4a21]"
                  }`}
                >
                  BACK 9
                </button>
              </div>
            </div>

            {/* Totals and Progress */}
            <div className="flex items-center gap-4 text-xs">
              <div className="text-[#556b2f]">
                <span className="font-semibold">{viewMode === "front9" ? "OUT" : "IN"}:</span>{" "}
                <span className="font-bold text-[#3d4a21]">{currentTotals.actual}</span>
              </div>
              <div className="text-[#556b2f]">
                <span className="font-semibold">TOTAL:</span>{" "}
                <span className="font-bold text-[#3d4a21]">{overallTotals.actual}</span>
              </div>
              <div className="text-[#556b2f]">
                <span className="font-semibold">Progress:</span>{" "}
                <span className="font-bold text-[#3d4a21]">{progress}%</span>
              </div>
              <div className="w-24 h-2 bg-white border border-[#8b956d] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#6b9d5b] via-[#4a7c2c] to-[#556b2f] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Holes Display with Ladder - expands to fill available height */}
          {/* This container is vertically responsive to the horizontal bar resize */}
          {/* Watched by resize observer to ensure proportional resizing */}
          {/* Removed min-h clamp to allow proportional resizing */}
          {/* Flex container must properly stretch children to fill height */}
          <div 
            ref={holesContainerRef}
            className="relative flex items-stretch gap-2 flex-1 overflow-hidden"
            style={{ minHeight: 0 }}
          >
            {/* Ladder (on left side for both Front 9 and Back 9) */}
            <div className="relative w-8 flex-shrink-0 h-full">
              <Ladder
                holes={currentHoles}
                activeHole={hoveredHole}
                onHoleHover={setHoveredHole}
                viewMode={viewMode}
              />
            </div>

            {/* HolePlanViewContainer - Golf Hole Maps Container */}
            {/* This container wraps the hole graphics and is vertically responsive */}
            {/* Removed min-h clamp to allow proportional resizing */}
            {/* Grid container must fill available height to allow HoleFrames to expand */}
            {/* Uses HoleColumn abstraction to align holes with summary boxes */}
            {/* Each HoleColumn contains both hole frame and summary box for perfect alignment */}
            {/* Never wraps - always 9 columns in a single row with horizontal scroll if needed */}
            <div 
              className="flex-1 grid grid-cols-9 gap-2 overflow-x-auto"
              style={{ 
                gridTemplateRows: '1fr',
                height: '100%',
                minHeight: 0,
                gridAutoFlow: 'column',
                gridAutoColumns: 'minmax(0, 1fr)'
              }}
            >
              {currentHoles.map((hole) => (
                <HoleColumn
                  key={hole.number}
                  hole={hole}
                  holeView={
                    <HolePlanView
                      hole={hole}
                      isActive={hoveredHole === hole.number}
                      onHover={() => setHoveredHole(hole.number)}
                    />
                  }
                  isActive={hoveredHole === hole.number}
                  onHover={() => setHoveredHole(hole.number)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
