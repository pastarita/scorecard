"use client";

/**
 * Aerial Shot View Component
 * 
 * Uses the new geometry foundation pipeline to render properly grounded
 * aerial shots with correctly positioned arcs.
 * 
 * Pipeline:
 * 1. Build flat pattern SVG (2D geometry with bounding boxes)
 * 2. Transform to aerial shot perspective (3D transformation)
 * 3. Draw shot arc animation (grounded arcs)
 */

import type { Hole } from "@/types/scorecard";
import { executePipeline, type PipelineResult } from "@/lib/geometry/Pipeline";
import {
  type TransformationDescriptor,
  TRANSFORMATION_VOCABULARY,
  describeTransformation,
} from "@/lib/perspectiveLanguage";
import { useMemo } from "react";
import { getRecommendedTransformation } from "@/lib/perspectiveHoleGenerator";

interface AerialShotViewProps {
  hole: Hole;
  width?: number;
  height?: number;
  transformation?: TransformationDescriptor | keyof typeof TRANSFORMATION_VOCABULARY;
  showShotArcs?: boolean;
  showLabels?: boolean;
}

/**
 * Aerial Shot View Component
 * 
 * Renders an aerial shot using the geometry foundation pipeline
 */
export function AerialShotView({
  hole,
  width = 1000,
  height = 700,
  transformation = "standard",
  showShotArcs = true,
  showLabels = true,
}: AerialShotViewProps) {
  // Resolve transformation descriptor
  const transformationDescriptor: TransformationDescriptor = useMemo(() => {
    if (transformation === undefined) {
      return getRecommendedTransformation(hole.archetype);
    }
    if (typeof transformation === "string") {
      if (transformation in TRANSFORMATION_VOCABULARY) {
        return TRANSFORMATION_VOCABULARY[
          transformation as keyof typeof TRANSFORMATION_VOCABULARY
        ]();
      }
      return getRecommendedTransformation(hole.archetype);
    }
    return transformation;
  }, [transformation, hole.archetype]);

  // Execute the pipeline
  const pipelineResult: PipelineResult = useMemo(
    () => executePipeline(hole, width, height, transformationDescriptor),
    [hole, width, height, transformationDescriptor]
  );

  // Calculate view bounds
  const viewBox = useMemo(() => {
    const padding = Math.max(width, height) * 0.2;
    return `-${padding} -${padding} ${width + padding * 2} ${height + padding * 2}`;
  }, [width, height]);

  // Get transformed elements from pipeline
  const { stage2, stage3 } = pipelineResult;
  const teeBounds = stage2.transformedBounds.get("tee");
  const greenBounds = stage2.transformedBounds.get("green");

  return (
    <div className="aerial-shot-view">
      {showLabels && (
        <div className="mb-4 text-sm text-[#556b2f]">
          <p className="font-semibold">
            Transformation: {describeTransformation(transformationDescriptor)}
          </p>
          <p className="text-xs text-[#6b7a4a] mt-1">
            Pipeline: Flat Pattern → Perspective Transform → Arc Animation
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
          d={stage2.fairwayPath}
          stroke="url(#fairwayGrad)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
          filter="url(#shadow)"
        />

        {/* Fairway fill (wider) */}
        <path
          d={stage2.fairwayPath}
          stroke="none"
          fill="url(#fairwayGrad)"
          fillOpacity="0.3"
          strokeWidth="28"
        />

        {/* Shot arcs - properly grounded */}
        {showShotArcs &&
          stage3.arcs.map((arc, arcIndex) => (
            <g key={`arc-${arcIndex}`} className="shot-arc">
              {/* Arc path */}
              <path
                d={arc.svgPath}
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

              {/* Start marker */}
              <circle
                cx={arc.startCanvas.x}
                cy={arc.startCanvas.y}
                r="6"
                fill={
                  arc.shot.confidence < 0.3
                    ? "#ff4444"
                    : arc.shot.confidence < 0.6
                    ? "#ff8833"
                    : arc.shot.confidence < 0.9
                    ? "#ffbb44"
                    : "#66dd66"
                }
                stroke="#fff"
                strokeWidth="1.5"
              />

              {/* End marker */}
              <circle
                cx={arc.endCanvas.x}
                cy={arc.endCanvas.y}
                r="8"
                fill={
                  arc.shot.confidence < 0.3
                    ? "#ff4444"
                    : arc.shot.confidence < 0.6
                    ? "#ff8833"
                    : arc.shot.confidence < 0.9
                    ? "#ffbb44"
                    : "#66dd66"
                }
                stroke="#fff"
                strokeWidth="2"
              />

              {/* Control point markers (optional, for debugging) */}
              {false && // Set to true for debugging
                arc.controlPointsCanvas.map((cp, idx) => (
                  <circle
                    key={`cp-${idx}`}
                    cx={cp.x}
                    cy={cp.y}
                    r="3"
                    fill="#ff00ff"
                    opacity="0.5"
                  />
                ))}
            </g>
          ))}

        {/* Green */}
        {greenBounds && (
          <>
            <ellipse
              cx={greenBounds.x}
              cy={greenBounds.y}
              rx="35"
              ry="18"
              fill="url(#greenGrad)"
              stroke="#5a6a4d"
              strokeWidth="1.5"
              opacity="0.98"
              filter="url(#shadow)"
            />

            {/* Hole */}
            <circle
              cx={greenBounds.x}
              cy={greenBounds.y}
              r="6"
              fill="#0a0a0a"
              stroke="#1a1a1a"
              strokeWidth="1"
            />

            {/* Flag */}
            {hole.status === "complete" && (
              <g>
                <line
                  x1={greenBounds.x}
                  y1={greenBounds.y}
                  x2={greenBounds.x}
                  y2={greenBounds.y - 35}
                  stroke="#c41e3a"
                  strokeWidth="2.5"
                />
                <path
                  d={`M ${greenBounds.x} ${greenBounds.y - 35} L ${greenBounds.x + 20} ${greenBounds.y - 25} L ${greenBounds.x} ${greenBounds.y - 18} Z`}
                  fill="#c41e3a"
                />
              </g>
            )}
          </>
        )}

        {/* Tee */}
        {teeBounds && (
          <>
            <ellipse
              cx={teeBounds.x}
              cy={teeBounds.y}
              rx="25"
              ry="15"
              fill="#7bc96b"
              stroke="#5a8a4d"
              strokeWidth="2"
              filter="url(#shadow)"
            />

            {showLabels && (
              <text
                x={teeBounds.x}
                y={teeBounds.y + 30}
                textAnchor="middle"
                fontSize="11"
                fill="#1a1a1a"
                fontWeight="bold"
              >
                TEE
              </text>
            )}
          </>
        )}

        {showLabels && greenBounds && (
          <>
            {/* Green label */}
            <text
              x={greenBounds.x}
              y={greenBounds.y - 50}
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

