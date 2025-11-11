"use client";

import { useMemo } from "react";
import type { Hole } from "@/types/scorecard";
import { executePipeline } from "@/lib/geometry/Pipeline";
import {
  type TransformationDescriptor,
  TRANSFORMATION_VOCABULARY,
} from "@/lib/perspectiveLanguage";
import { getRecommendedTransformation } from "@/lib/perspectiveHoleGenerator";

interface AerialCSSMotifProps {
  hole: Hole;
  width?: number;
  height?: number;
  transformation?: TransformationDescriptor | keyof typeof TRANSFORMATION_VOCABULARY;
  showShotArcs?: boolean;
  debugBounds?: boolean;
}

interface CSSBounds {
  left: string;
  top: string;
  width: string;
  height: string;
}

function boundsToCSS(bounds: { x: number; y: number; width: number; height: number }): CSSBounds {
  return {
    left: `${bounds.x * 100}%`,
    top: `${bounds.y * 100}%`,
    width: `${bounds.width * 100}%`,
    height: `${bounds.height * 100}%`,
  };
}

export function AerialCSSMotif({
  hole,
  width = 800,
  height = 600,
  transformation = "standard",
  showShotArcs = true,
  debugBounds = false,
}: AerialCSSMotifProps) {
  const transformationDescriptor: TransformationDescriptor = useMemo(() => {
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

  const pipeline = useMemo(
    () => executePipeline(hole, width, height, transformationDescriptor),
    [hole, width, height, transformationDescriptor]
  );

  const geometry = pipeline.stage1.geometry;
  const shotPositions = pipeline.stage1.shotPositions;
  const arcs = pipeline.stage3.arcs;

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width,
    height,
    borderRadius: "32px",
    overflow: "hidden",
    background: "linear-gradient(180deg, #f4f1e3 0%, #ece6d5 100%)",
    boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
  };

  const baseLayerStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  };

  const teeBounds = geometry.bounds.tee;
  const greenBounds = geometry.bounds.green;

  return (
    <div style={containerStyle} className="aerial-css-motif">
      {/* Rough Layer */}
      <div
        style={{
          ...baseLayerStyle,
          background:
            "radial-gradient(circle at 50% 30%, rgba(212, 204, 170, 0.8), rgba(181, 170, 134, 0.9))",
          filter: "blur(20px)",
        }}
      />

      {/* Fairway Segments */}
      {geometry.bounds.fairway.map((segment, idx) => {
        const prev = idx === 0 ? teeBounds : geometry.bounds.fairway[idx - 1];
        const next =
          idx === geometry.bounds.fairway.length - 1
            ? greenBounds
            : geometry.bounds.fairway[idx + 1];

        const prevCenter = geometry.builder.getCenter(prev);
        const nextCenter = geometry.builder.getCenter(next);
        const segmentCenter = geometry.builder.getCenter(segment);

        const angle = Math.atan2(
          nextCenter.y - prevCenter.y,
          nextCenter.x - prevCenter.x
        );
        const rotation = `${(angle * 180) / Math.PI}deg`;

        const size = {
          width: segment.width * 100,
          height: segment.width * 220,
        };

        return (
          <div
            key={`fairway-${idx}`}
            style={{
              position: "absolute",
              left: `${segmentCenter.x * 100}%`,
              top: `${segmentCenter.y * 100}%`,
              width: `${size.width}%`,
              height: `${size.height}%`,
              transform: `translate(-50%, -50%) rotate(${rotation}) scaleY(0.6)` ,
              background: "linear-gradient(90deg, #5e8f57 0%, #6d9f67 100%)",
              borderRadius: "45%",
              opacity: 0.95,
              filter: "drop-shadow(0 8px 12px rgba(44, 61, 33, 0.25))",
            }}
          />
        );
      })}

      {/* Tee Marker */}
      <div
        style={{
          position: "absolute",
          left: `${(teeBounds.x + teeBounds.width / 2) * 100}%`,
          top: `${(teeBounds.y + teeBounds.height / 2) * 100}%`,
          transform: "translate(-50%, -50%)",
          width: `${teeBounds.width * 120}%`,
          height: `${teeBounds.height * 120}%`,
          background: "linear-gradient(180deg, #94d084 0%, #6eb35b 100%)",
          borderRadius: "50%",
          boxShadow: "0 8px 12px rgba(47, 87, 40, 0.25)",
        }}
      >
        {debugBounds && (
          <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 text-[10px] text-[#2e4123]">
            Tee
          </span>
        )}
      </div>

      {/* Green Marker */}
      <div
        style={{
          position: "absolute",
          left: `${(greenBounds.x + greenBounds.width / 2) * 100}%`,
          top: `${(greenBounds.y + greenBounds.height / 2) * 100}%`,
          transform: "translate(-50%, -50%)",
          width: `${greenBounds.width * 160}%`,
          height: `${greenBounds.height * 100}%`,
          background: "linear-gradient(180deg, #7bc96b 0%, #5fa553 100%)",
          borderRadius: "60%",
          boxShadow: "0 12px 18px rgba(47, 87, 40, 0.35)",
        }}
      >
        {showShotArcs && hole.status === "complete" && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -80%)",
              width: "4px",
              height: "40px",
              background: "#c41e3a",
              borderRadius: "4px",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: "-20px",
                transform: "translateX(-50%)",
                width: "24px",
                height: "16px",
                background: "#c41e3a",
                clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
              }}
            />
          </div>
        )}
        {debugBounds && (
          <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 text-[10px] text-[#2e4123]">
            Green
          </span>
        )}
      </div>

      {/* Shot arcs as CSS transforms */}
      {showShotArcs &&
        arcs.map((arc, idx) => {
          const start = arc.trajectory.start;
          const end = arc.trajectory.end;
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          const avgConfidence = arc.shot.confidence;
          const heightFactor = (1 - avgConfidence) * 0.2 + 0.05;
          const arcHeight = distance * heightFactor;

          const color =
            avgConfidence < 0.3
              ? "#ff4444"
              : avgConfidence < 0.6
              ? "#ff8833"
              : avgConfidence < 0.9
              ? "#ffbb44"
              : "#66dd66";

          const topOffset = Math.max(start.y - arcHeight, 0);

          return (
            <div
              key={`arc-css-${idx}`}
              style={{
                position: "absolute",
                left: `${start.x * 100}%`,
                top: `${topOffset * 100}%`,
                width: `${distance * 100}%`,
                height: `${arcHeight * 100}%`,
                transformOrigin: "left bottom",
                transform: `rotate(${(angle * 180) / Math.PI}deg)` ,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderTop: `3px dotted ${color}`,
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "none",
                  borderTopLeftRadius: "120%",
                  borderTopRightRadius: "120%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "-6px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: color,
                  border: "2px solid white",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.15)",
                }}
              />
            </div>
          );
        })}

      {/* Shot landing markers */}
      {showShotArcs &&
        shotPositions.map((shotPos, idx) => (
          <div
            key={`shot-${idx}`}
            style={{
              position: "absolute",
              left: `${shotPos.position.x * 100}%`,
              top: `${shotPos.position.y * 100}%`,
              transform: "translate(-50%, -50%)",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "white",
              border: "2px solid rgba(60, 90, 50, 0.8)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          />
        ))}

      {/* Debug bounding boxes */}
      {debugBounds && (
        <>
          <div
            style={{
              position: "absolute",
              left: `${teeBounds.x * 100}%`,
              top: `${teeBounds.y * 100}%`,
              width: `${teeBounds.width * 100}%`,
              height: `${teeBounds.height * 100}%`,
              border: "1px dashed rgba(0,0,0,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${greenBounds.x * 100}%`,
              top: `${greenBounds.y * 100}%`,
              width: `${greenBounds.width * 100}%`,
              height: `${greenBounds.height * 100}%`,
              border: "1px dashed rgba(0,0,0,0.2)",
            }}
          />
        </>
      )}
    </div>
  );
}

