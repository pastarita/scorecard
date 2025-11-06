/**
 * Multi-Step Transformation Pipeline
 * 
 * Defines the clear, multi-step process for building aerial shots:
 * 1. Build flat pattern SVG (2D geometry)
 * 2. Transform to aerial shot perspective (3D transformation)
 * 3. Draw shot arc animation (grounded arcs)
 * 
 * This pipeline ensures proper grounding and centering of all elements.
 */

import type { Hole, Shot } from "@/types/scorecard";
import { buildCourseGeometry, type CourseGeometryLayout } from "./GeometryFoundation";
import { ArcPlacementBuilder, type ArcTrajectory } from "./ArcPlacement";
import type { PerspectiveConfig } from "../perspectiveTransform";
import { projectPoint, transformPath } from "../perspectiveTransform";
import type { TransformationDescriptor } from "../perspectiveLanguage";
import { descriptorToConfig, createDepthFunction } from "../perspectiveLanguage";

/**
 * Pipeline Stage 1: Flat Pattern SVG
 * 
 * Builds the 2D geometry layout using bounding boxes and semantic zones
 */
export interface FlatPatternStage {
  /** Course geometry layout with bounding boxes */
  geometry: CourseGeometryLayout;
  /** Fairway path in normalized coordinates */
  fairwayPath: string;
  /** Shot landing positions in normalized coordinates */
  shotPositions: Array<{
    position: { x: number; y: number; z: number };
    shot: Shot;
    zone: string;
    bounds: string; // semanticId
  }>;
}

/**
 * Pipeline Stage 2: Aerial Shot Perspective
 * 
 * Transforms the flat pattern into 3D perspective view
 */
export interface PerspectiveStage {
  /** Transformed fairway path */
  fairwayPath: string;
  /** Transformed bounding boxes */
  transformedBounds: Map<string, { x: number; y: number; z: number }>;
  /** Perspective configuration used */
  perspectiveConfig: PerspectiveConfig;
}

/**
 * Pipeline Stage 3: Shot Arc Animation
 * 
 * Adds grounded arc trajectories to the transformed view
 */
export interface ArcAnimationStage {
  /** Arc trajectories in transformed space */
  arcs: Array<{
    /** Arc trajectory definition */
    trajectory: ArcTrajectory;
    /** Transformed start point (canvas coordinates) */
    startCanvas: { x: number; y: number };
    /** Transformed end point (canvas coordinates) */
    endCanvas: { x: number; y: number };
    /** Transformed control points (canvas coordinates) */
    controlPointsCanvas: Array<{ x: number; y: number }>;
    /** SVG path data for rendering */
    svgPath: string;
    /** Shot data */
    shot: Shot;
  }>;
}

/**
 * Complete Pipeline Result
 * 
 * Contains all stages of the transformation pipeline
 */
export interface PipelineResult {
  stage1: FlatPatternStage;
  stage2: PerspectiveStage;
  stage3: ArcAnimationStage;
  /** Final canvas dimensions */
  canvas: { width: number; height: number };
}

/**
 * Execute the complete transformation pipeline
 * 
 * This is the main entry point for building an aerial shot
 */
export function executePipeline(
  hole: Hole,
  canvasWidth: number,
  canvasHeight: number,
  transformation: TransformationDescriptor
): PipelineResult {
  // ============================================
  // STAGE 1: Build Flat Pattern SVG
  // ============================================
  // Create geometry from first principles using bounding boxes
  const geometry = buildCourseGeometry(canvasWidth, canvasHeight, {
    teePosition: { x: 0.1, y: 0.7 },
    greenPosition: { x: 0.75, y: 0.15 },
    fairwayWidth: 0.15,
    curvature: hole.archetype === "Precision" ? 0.2 : 
               hole.archetype === "Convergent" ? 0.4 :
               hole.archetype === "Explorer" ? 0.7 : 0.8,
  });

  // Build arc placement system
  const arcBuilder = new ArcPlacementBuilder(geometry);

  // Calculate shot landing positions (grounded in geometry)
  const shotPositions = hole.shots.map((shot, index) => {
    const landing = arcBuilder.calculateLandingPosition(
      shot,
      index,
      hole.shots.length
    );
    return {
      position: landing.position,
      shot,
      zone: landing.zone.type,
      bounds: landing.bounds.semanticId,
    };
  });

  const stage1: FlatPatternStage = {
    geometry,
    fairwayPath: geometry.fairwayPath,
    shotPositions,
  };

  // ============================================
  // STAGE 2: Transform to Aerial Shot Perspective
  // ============================================
  // Get perspective configuration
  const perspectiveConfig = descriptorToConfig(transformation);
  const depthProgression = createDepthFunction(transformation);

  // Transform fairway path
  // The fairway path is already in canvas coordinates (from geometry builder)
  // Apply perspective transformation directly
  const transformedFairwayPath = transformPath(
    geometry.fairwayPath,
    0,
    (t) => depthProgression(t),
    perspectiveConfig
  );

  // Transform all bounding boxes
  const transformedBounds = new Map<string, { x: number; y: number; z: number }>();
  
  // Transform tee
  const teeBounds = geometry.bounds.tee;
  const teeCenter = geometry.builder.getCenter(teeBounds);
  const teeCanvas = geometry.builder.getCenterCanvas(teeBounds);
  const teeTransformed = projectPoint(
    teeCanvas,
    teeBounds.z ?? 0,
    perspectiveConfig
  );
  transformedBounds.set("tee", {
    x: teeTransformed.x,
    y: teeTransformed.y,
    z: teeBounds.z ?? 0,
  });

  // Transform green
  const greenBounds = geometry.bounds.green;
  const greenCanvas = geometry.builder.getCenterCanvas(greenBounds);
  const greenTransformed = projectPoint(
    greenCanvas,
    greenBounds.z ?? 100,
    perspectiveConfig
  );
  transformedBounds.set("green", {
    x: greenTransformed.x,
    y: greenTransformed.y,
    z: greenBounds.z ?? 100,
  });

  // Transform fairway segments
  geometry.bounds.fairway.forEach((segment, index) => {
    const segmentCanvas = geometry.builder.getCenterCanvas(segment);
    const segmentTransformed = projectPoint(
      segmentCanvas,
      segment.z ?? (index / geometry.bounds.fairway.length) * 100,
      perspectiveConfig
    );
    transformedBounds.set(`fairway_segment_${index}`, {
      x: segmentTransformed.x,
      y: segmentTransformed.y,
      z: segment.z ?? (index / geometry.bounds.fairway.length) * 100,
    });
  });

  const stage2: PerspectiveStage = {
    fairwayPath: transformedFairwayPath,
    transformedBounds,
    perspectiveConfig,
  };

  // ============================================
  // STAGE 3: Draw Shot Arc Animation
  // ============================================
  // Build arc trajectories (in normalized space)
  const arcTrajectories = arcBuilder.buildArcTrajectories(hole.shots);

  // Transform arcs to canvas coordinates and apply perspective
  const arcs = arcTrajectories.map((trajectory) => {
    // Convert trajectory points from normalized to canvas space
    const startCanvas = geometry.builder.getCenterCanvas({
      ...trajectory.start,
      width: 0,
      height: 0,
      semanticId: "arc_start",
    });

    const endCanvas = geometry.builder.getCenterCanvas({
      ...trajectory.end,
      width: 0,
      height: 0,
      semanticId: "arc_end",
    });

    const controlPointsCanvas = trajectory.controlPoints.map((cp) =>
      geometry.builder.getCenterCanvas({
        ...cp,
        width: 0,
        height: 0,
        semanticId: "arc_control",
      })
    );

    // Apply perspective transformation to all points
    const startTransformed = projectPoint(
      startCanvas,
      trajectory.start.z,
      perspectiveConfig
    );
    const endTransformed = projectPoint(
      endCanvas,
      trajectory.end.z,
      perspectiveConfig
    );
    const controlPointsTransformed = trajectory.controlPoints.map((cp, idx) =>
      projectPoint(controlPointsCanvas[idx], cp.z, perspectiveConfig)
    );

    // Build SVG path from transformed points
    const svgPath = buildArcSVGPath(
      startTransformed,
      endTransformed,
      controlPointsTransformed
    );

    return {
      trajectory,
      startCanvas: startTransformed,
      endCanvas: endTransformed,
      controlPointsCanvas: controlPointsTransformed,
      svgPath,
      shot: trajectory.shot,
    };
  });

  const stage3: ArcAnimationStage = { arcs };

  return {
    stage1,
    stage2,
    stage3,
    canvas: {
      width: canvasWidth,
      height: canvasHeight,
    },
  };
}


/**
 * Build SVG path for arc from transformed points
 * 
 * Creates a smooth bezier curve through the transformed arc points
 */
function buildArcSVGPath(
  start: { x: number; y: number },
  end: { x: number; y: number },
  controlPoints: Array<{ x: number; y: number }>
): string {
  if (controlPoints.length === 0) {
    // Simple line if no control points
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }

  if (controlPoints.length === 1) {
    // Quadratic bezier
    const cp = controlPoints[0];
    return `M ${start.x} ${start.y} Q ${cp.x} ${cp.y} ${end.x} ${end.y}`;
  }

  // Cubic bezier with multiple control points
  // Use first and last control points for cubic bezier
  const cp1 = controlPoints[0];
  const cp2 = controlPoints[controlPoints.length - 1];
  return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
}

