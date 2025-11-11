/**
 * Arc Placement System
 * 
 * Properly situates shot arcs within the transformed geometry.
 * This ensures arcs are grounded in the course geometry rather than floating
 * above it.
 * 
 * Architecture:
 * 1. Arcs are defined in normalized space relative to bounding boxes
 * 2. Arc trajectories follow the fairway path structure
 * 3. Arc landing zones are calculated based on shot confidence and progression
 * 4. Arcs are then transformed along with the geometry
 */

import type { BoundingBox, SemanticZone, CourseGeometryLayout } from "./GeometryFoundation";
import type { Point2D, Point3D } from "../perspectiveTransform";
import type { Shot } from "@/types/scorecard";

/**
 * Arc Trajectory Definition
 * 
 * Defines an arc trajectory in the geometric space
 */
export interface ArcTrajectory {
  /** Start point (in normalized coordinates) */
  start: { x: number; y: number; z: number };
  /** End point (in normalized coordinates) */
  end: { x: number; y: number; z: number };
  /** Control points for the arc curve */
  controlPoints: Array<{ x: number; y: number; z: number }>;
  /** Shot data associated with this arc */
  shot: Shot;
  /** Zone where the arc lands */
  landingZone: SemanticZone;
  /** Progress along the course (0-1) */
  progress: number;
}

/**
 * Arc Placement Builder
 * 
 * Builds properly grounded arc trajectories
 */
export class ArcPlacementBuilder {
  private geometry: CourseGeometryLayout;

  constructor(geometry: CourseGeometryLayout) {
    this.geometry = geometry;
  }

  /**
   * Calculate shot landing position
   * 
   * Determines where a shot lands based on:
   * - Course progression (which segment of the fairway)
   * - Shot confidence (affects accuracy/placement)
   * - Course geometry (stays within appropriate bounds)
   */
  calculateLandingPosition(
    shot: Shot,
    shotIndex: number,
    totalShots: number
  ): {
    position: { x: number; y: number; z: number };
    zone: SemanticZone;
    bounds: BoundingBox;
  } {
    // Calculate progress along course (0-1)
    const progress = shotIndex / Math.max(totalShots - 1, 1);

    // Find the fairway segment closest to this progress
    const fairwaySegments = this.geometry.bounds.fairway;
    const segmentIndex = Math.floor(progress * (fairwaySegments.length - 1));
    const segment = fairwaySegments[Math.min(segmentIndex, fairwaySegments.length - 1)];

    // Get segment center
    const segmentCenter = this.geometry.builder.getCenter(segment);

    // Calculate variance based on confidence
    // Lower confidence = more variance from ideal path
    const variance = (1 - shot.confidence) * 0.15; // Up to 15% variance

    // Apply variance (perpendicular to course direction)
    const prevSegment =
      segmentIndex > 0
        ? fairwaySegments[segmentIndex - 1]
        : this.geometry.bounds.tee;
    const nextSegment =
      segmentIndex < fairwaySegments.length - 1
        ? fairwaySegments[segmentIndex + 1]
        : this.geometry.bounds.green;

    const prevCenter = this.geometry.builder.getCenter(prevSegment);
    const nextCenter = this.geometry.builder.getCenter(nextSegment);

    // Course direction vector
    const direction = {
      x: nextCenter.x - prevCenter.x,
      y: nextCenter.y - prevCenter.y,
    };
    const dirLength = Math.sqrt(direction.x ** 2 + direction.y ** 2);
    const normalized = {
      x: direction.x / dirLength,
      y: direction.y / dirLength,
    };

    // Perpendicular vector (for variance)
    const perpendicular = {
      x: -normalized.y,
      y: normalized.x,
    };

    // Apply variance (random but deterministic based on shot)
    const seed = shot.number * 1000 + shotIndex;
    const random = (seed * 9301 + 49297) % 233280 / 233280;
    const varianceAmount = (random - 0.5) * 2 * variance;

    // Final position
    const position = {
      x: segmentCenter.x + perpendicular.x * varianceAmount,
      y: segmentCenter.y + perpendicular.y * varianceAmount,
      z: segment.z ?? progress * 100,
    };

    // Find containing zone
    const zone =
      this.geometry.builder.findZoneAtPoint(position.x, position.y) ||
      this.geometry.zones[0];

    // Get appropriate bounds (use segment bounds, or zone bounds if shot is off-course)
    const bounds =
      Math.abs(varianceAmount) < segment.width / 2
        ? segment
        : zone.bounds;

    return {
      position,
      zone,
      bounds,
    };
  }

  /**
   * Build arc trajectory between two shot positions
   * 
   * Creates a properly grounded arc that follows the course geometry
   */
  buildArcTrajectory(
    startShot: Shot,
    endShot: Shot,
    startIndex: number,
    endIndex: number,
    totalShots: number
  ): ArcTrajectory {
    const start = this.calculateLandingPosition(
      startShot,
      startIndex,
      totalShots
    );
    const end = this.calculateLandingPosition(endShot, endIndex, totalShots);

    // Calculate arc height based on confidence
    // Lower confidence = higher arc (more uncertainty)
    const avgConfidence = (startShot.confidence + endShot.confidence) / 2;
    const arcHeight = (1 - avgConfidence) * 0.1; // Up to 10% of course length

    // Distance between start and end
    const dx = end.position.x - start.position.x;
    const dy = end.position.y - start.position.y;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);

    // Calculate control points for smooth arc
    // Arc should peak at midpoint
    const midpoint = {
      x: (start.position.x + end.position.x) / 2,
      y: (start.position.y + end.position.y) / 2,
      z:
        (start.position.z + end.position.z) / 2 +
        arcHeight * 100, // Arc peaks above the ground
    };

    // Add intermediate control points for smoother curve
    const controlPoints = [
      {
        x: start.position.x + dx * 0.25,
        y: start.position.y + dy * 0.25,
        z: start.position.z + (midpoint.z - start.position.z) * 0.5,
      },
      midpoint,
      {
        x: start.position.x + dx * 0.75,
        y: start.position.y + dy * 0.75,
        z: end.position.z + (midpoint.z - end.position.z) * 0.5,
      },
    ];

    return {
      start: start.position,
      end: end.position,
      controlPoints,
      shot: startShot,
      landingZone: end.zone,
      progress: endIndex / Math.max(totalShots - 1, 1),
    };
  }

  /**
   * Build all arc trajectories for a sequence of shots
   */
  buildArcTrajectories(shots: Shot[]): ArcTrajectory[] {
    if (shots.length < 2) return [];

    const trajectories: ArcTrajectory[] = [];

    for (let i = 0; i < shots.length - 1; i++) {
      const trajectory = this.buildArcTrajectory(
        shots[i],
        shots[i + 1],
        i,
        i + 1,
        shots.length
      );
      trajectories.push(trajectory);
    }

    return trajectories;
  }

  /**
   * Convert arc trajectory to canvas coordinates
   * 
   * Transforms from normalized space to canvas space
   */
  trajectoryToCanvas(trajectory: ArcTrajectory): {
    start: Point2D;
    end: Point2D;
    controlPoints: Point2D[];
  } {
    const canvasStart = this.geometry.builder.getCenterCanvas({
      ...trajectory.start,
      width: 0,
      height: 0,
      semanticId: "arc_start",
    });

    const canvasEnd = this.geometry.builder.getCenterCanvas({
      ...trajectory.end,
      width: 0,
      height: 0,
      semanticId: "arc_end",
    });

    const canvasControls = trajectory.controlPoints.map((cp) =>
      this.geometry.builder.getCenterCanvas({
        ...cp,
        width: 0,
        height: 0,
        semanticId: "arc_control",
      })
    );

    return {
      start: canvasStart,
      end: canvasEnd,
      controlPoints: canvasControls,
    };
  }
}

