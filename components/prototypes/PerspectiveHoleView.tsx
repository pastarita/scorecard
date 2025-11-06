"use client";

/**
 * Perspective Hole View Component
 * 
 * Renders a golf hole in 3D axonometric perspective using the perspective transformation engine.
 * This component demonstrates the transformation language and generates 3D arc trajectories
 * for shot paths.
 */

import type { Hole } from "@/types/scorecard";
import {
  generatePerspectiveHoleLayout,
  getRecommendedTransformation,
  type PerspectiveHoleLayout,
} from "@/lib/perspectiveHoleGenerator";
import {
  type TransformationDescriptor,
  TRANSFORMATION_VOCABULARY,
  describeTransformation,
} from "@/lib/perspectiveLanguage";
import { useMemo } from "react";

interface PerspectiveHoleViewProps {
  hole: Hole;
  width?: number;
  height?: number;
  transformation?: TransformationDescriptor | keyof typeof TRANSFORMATION_VOCABULARY;
  showShotArcs?: boolean;
  showLabels?: boolean;
}

/**
 * Perspective Hole View Component
 */
export function PerspectiveHoleView({
  hole,
  width = 800,
  height = 600,
  transformation = "standard",
  showShotArcs = true,
  showLabels = true,
}: PerspectiveHoleViewProps) {
  // Resolve transformation descriptor
  const transformationDescriptor: TransformationDescriptor = useMemo(() => {
    if (transformation === undefined) {
      return getRecommendedTransformation(hole.archetype);
    }
    if (typeof transformation === "string") {
      if (transformation in TRANSFORMATION_VOCABULARY) {
        return TRANSFORMATION_VOCABULARY[transformation as keyof typeof TRANSFORMATION_VOCABULARY]();
      }
      // Fallback to recommended
      return getRecommendedTransformation(hole.archetype);
    }
    return transformation;
  }, [transformation, hole.archetype]);

  // Generate perspective-transformed hole layout
  const layout = useMemo(
    () =>
      generatePerspectiveHoleLayout(
        hole,
        width,
        height,
        transformationDescriptor
      ),
    [hole, width, height, transformationDescriptor]
  );

  // Calculate view bounds and center
  const viewBox = useMemo(() => {
    // Expand viewBox to accommodate perspective transformation
    const padding = Math.max(width, height) * 0.2;
    return `-${padding} -${padding} ${width + padding * 2} ${height + padding * 2}`;
  }, [width, height]);

  return (
    <div className="perspective-hole-view">
      {showLabels && (
        <div className="mb-4 text-sm text-[#556b2f]">
          <p className="font-semibold">
            Transformation: {describeTransformation(transformationDescriptor)}
          </p>
        </div>
      )}

      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className="bg-[#f5f0e8]"
      >
        <defs>
          {/* Gradients for zones with depth */}
          <linearGradient id="roughGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#2d4a26" stopOpacity="1" />
            <stop offset="100%" stopColor="#4a6c3d" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="fairwayGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#4a7c3d" stopOpacity="1" />
            <stop offset="100%" stopColor="#6b9d5b" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="approachGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#6ba950" stopOpacity="1" />
            <stop offset="100%" stopColor="#8bc970" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="greenGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#7bc96b" stopOpacity="1" />
            <stop offset="100%" stopColor="#9be98b" stopOpacity="0.95" />
          </linearGradient>

          {/* Shadow filter for depth */}
          <filter id="shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Transformed fairway */}
        <path
          d={layout.transformed.fairway.path}
          stroke="url(#fairwayGrad)"
          strokeWidth={layout.fairway.width}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
          filter="url(#shadow)"
        />

        {/* Fairway fill (wider) */}
        <path
          d={layout.transformed.fairway.path}
          stroke="none"
          fill="url(#fairwayGrad)"
          fillOpacity="0.3"
          strokeWidth={layout.fairway.width + 20}
        />

        {/* Hazards */}
        {layout.transformed.hazards.water.map((water, idx) => {
          const original = water.original;
          return (
            <ellipse
              key={`water-${idx}`}
              cx={water.point.x}
              cy={water.point.y}
              rx={original.width / 2}
              ry={original.height / 2}
              fill="#87ceeb"
              opacity="0.6"
              filter="url(#shadow)"
            />
          );
        })}

        {layout.transformed.hazards.bunkers.map((bunker, idx) => {
          const original = bunker.original;
          return (
            <circle
              key={`bunker-${idx}`}
              cx={bunker.point.x}
              cy={bunker.point.y}
              r={original.radius}
              fill="#d2b48c"
              stroke="#b89a7a"
              strokeWidth="1"
              filter="url(#shadow)"
            />
          );
        })}

        {/* Shot arcs */}
        {showShotArcs && layout.shotArcs.map((arc, arcIndex) => (
          <g key={`arc-${arcIndex}`} className="shot-arc">
            {/* Arc path */}
            <path
              d={arc.pathData}
              stroke={
                arc.shot.confidence < 0.3
                  ? "#ff4444"
                  : arc.shot.confidence < 0.6
                  ? "#ff8833"
                  : arc.shot.confidence < 0.9
                  ? "#ffbb44"
                  : "#66dd66"
              }
              strokeWidth="3.5"
              strokeDasharray="10,5"
              fill="none"
              opacity="0.75"
              filter="url(#shadow)"
            />

            {/* Arc markers */}
            {arc.points
              .filter((_, i) => i % 5 === 0 || i === arc.points.length - 1)
              .map((point, pointIndex) => (
                <circle
                  key={`arc-point-${arcIndex}-${pointIndex}`}
                  cx={point.position.x}
                  cy={point.position.y}
                  r={pointIndex === 0 || pointIndex === arc.points.length - 1 ? 6 : 3}
                  fill={
                    point.confidence < 0.3
                      ? "#ff4444"
                      : point.confidence < 0.6
                      ? "#ff8833"
                      : point.confidence < 0.9
                      ? "#ffbb44"
                      : "#66dd66"
                  }
                  stroke="#fff"
                  strokeWidth="1.5"
                  opacity={pointIndex === 0 || pointIndex === arc.points.length - 1 ? 1 : 0.5}
                />
              ))}
          </g>
        ))}

        {/* Green */}
        <ellipse
          cx={layout.transformed.green.x}
          cy={layout.transformed.green.y}
          rx={layout.green.radius}
          ry={layout.green.radius * 0.5} // Flatten in perspective
          fill="url(#greenGrad)"
          stroke="#5a6a4d"
          strokeWidth="1.5"
          opacity="0.98"
          filter="url(#shadow)"
        />

        {/* Hole */}
        <circle
          cx={layout.transformed.green.x}
          cy={layout.transformed.green.y}
          r="6"
          fill="#0a0a0a"
          stroke="#1a1a1a"
          strokeWidth="1"
        />

        {/* Flag */}
        {hole.status === "complete" && (
          <g>
            <line
              x1={layout.transformed.green.x}
              y1={layout.transformed.green.y}
              x2={layout.transformed.green.x}
              y2={layout.transformed.green.y - 35}
              stroke="#c41e3a"
              strokeWidth="2.5"
            />
            <path
              d={`M ${layout.transformed.green.x} ${layout.transformed.green.y - 35} L ${layout.transformed.green.x + 20} ${layout.transformed.green.y - 25} L ${layout.transformed.green.x} ${layout.transformed.green.y - 18} Z`}
              fill="#c41e3a"
            />
          </g>
        )}

        {/* Tee */}
        <ellipse
          cx={layout.transformed.tee.x}
          cy={layout.transformed.tee.y}
          rx={layout.tee.radius}
          ry={layout.tee.radius * 0.6}
          fill="#7bc96b"
          stroke="#5a8a4d"
          strokeWidth="2"
          filter="url(#shadow)"
        />

        {showLabels && (
          <>
            {/* Tee label */}
            <text
              x={layout.transformed.tee.x}
              y={layout.transformed.tee.y + layout.tee.radius + 15}
              textAnchor="middle"
              fontSize="11"
              fill="#1a1a1a"
              fontWeight="bold"
            >
              TEE
            </text>

            {/* Green label */}
            <text
              x={layout.transformed.green.x}
              y={layout.transformed.green.y - layout.green.radius - 10}
              textAnchor="middle"
              fontSize="11"
              fill="#1a1a1a"
              fontWeight="bold"
            >
              GREEN
            </text>

            {/* Hole number */}
            <text
              x={width * 0.05}
              y={height * 0.95}
              fontSize="16"
              fill="#556b2f"
              fontWeight="bold"
              fontFamily="serif"
            >
              Hole {hole.number}
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

/**
 * Hook to get available transformations
 */
export function usePerspectiveTransformations() {
  return {
    vocabulary: TRANSFORMATION_VOCABULARY,
    getTransformation: (name: keyof typeof TRANSFORMATION_VOCABULARY) =>
      TRANSFORMATION_VOCABULARY[name](),
    describe: describeTransformation,
  };
}

