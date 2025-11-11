/**
 * Perspective Hole Generator
 * 
 * Extends the hole generation system to work with perspective transformations.
 * This integrates the perspective transformation engine with the existing hole
 * layout generation to produce 3D axonometric views.
 */

import type { Hole, Shot } from "@/types/scorecard";
import { generateHoleLayout, type HoleLayout } from "./holeGenerator";
import type {
  PerspectiveConfig,
  Point2D,
} from "./perspectiveTransform";
import {
  transformPath,
  transformPoints,
  projectPoint,
} from "./perspectiveTransform";
import type { TransformationDescriptor } from "./perspectiveLanguage";
import { descriptorToConfig, createDepthFunction } from "./perspectiveLanguage";
import type { ShotArc, ArcTrajectoryConfig } from "./shotArc3D";
import {
  generateShotSequence,
  getArcStyleForShot,
  DEFAULT_ARC_CONFIG,
} from "./shotArc3D";

export interface PerspectiveHoleLayout extends HoleLayout {
  // Transformed elements
  transformed: {
    fairway: {
      path: string;
      points: Point2D[];
    };
    green: Point2D;
    tee: Point2D;
    hazards: {
      water: Array<{ point: Point2D; original: { x: number; y: number; width: number; height: number } }>;
      bunkers: Array<{ point: Point2D; original: { x: number; y: number; radius: number } }>;
    };
  };
  
  // Shot arcs in 3D perspective
  shotArcs: ShotArc[];
  
  // Perspective configuration used
  perspectiveConfig: PerspectiveConfig;
  
  // Transformation descriptor
  transformationDescriptor: TransformationDescriptor;
}

/**
 * Generate a perspective-transformed hole layout
 */
export function generatePerspectiveHoleLayout(
  hole: Hole,
  width: number = 800,
  height: number = 600,
  transformation: TransformationDescriptor | "standard" | "dogleg" | "birdEye" | "flat" | "dramatic" = "standard"
): PerspectiveHoleLayout {
  // Generate base layout
  const baseLayout = generateHoleLayout(hole, width * 0.8, height * 0.8);
  
  // Resolve transformation descriptor
  let transformationDescriptor: TransformationDescriptor;
  if (typeof transformation === "string") {
    const vocabularies: Record<string, () => TransformationDescriptor> = {
      standard: () => ({
        viewType: "isometric",
        orientation: "diagonal-up-right",
        depthEffect: "receding",
        zoneDepths: { rough: 0, fairway: 20, approach: 40, green: 60 },
      }),
      dogleg: () => ({
        viewType: "trimetric",
        orientation: "diagonal-up-right",
        depthEffect: "receding",
        zoneDepths: { rough: 0, fairway: 15, approach: 35, green: 55 },
      }),
      birdEye: () => ({
        viewType: "bird-eye",
        orientation: "diagonal-up-right",
        depthEffect: "receding",
      }),
      flat: () => ({
        viewType: "isometric",
        orientation: "vertical-up",
        depthEffect: "flat",
      }),
      dramatic: () => ({
        viewType: "trimetric",
        orientation: "diagonal-up-right",
        depthEffect: "rising",
        zoneDepths: { rough: -30, fairway: 10, approach: 50, green: 80 },
      }),
    };
    transformationDescriptor = vocabularies[transformation]();
  } else {
    transformationDescriptor = transformation;
  }
  
  // Convert to perspective config
  const perspectiveConfig = descriptorToConfig(transformationDescriptor);
  
  // Create depth progression
  const depthProgression = createDepthFunction(transformationDescriptor);
  
  // Transform fairway path
  const transformedFairwayPath = transformPath(
    baseLayout.fairway.path,
    0,
    (t) => depthProgression(t),
    perspectiveConfig
  );
  
  // Transform fairway points (for reference)
  const fairwayPoints = extractPathPoints(baseLayout.fairway.path);
  const transformedFairwayPoints = transformPoints(
    fairwayPoints,
    0,
    (t) => depthProgression(t),
    perspectiveConfig
  );
  
  // Transform green
  const greenDepth =
    transformationDescriptor.zoneDepths?.green || depthProgression(1);
  const transformedGreen = projectPoint(
    { x: baseLayout.green.x, y: baseLayout.green.y },
    greenDepth,
    perspectiveConfig
  );
  
  // Transform tee
  const teeDepth =
    transformationDescriptor.zoneDepths?.rough || depthProgression(0);
  const transformedTee = projectPoint(
    { x: baseLayout.tee.x, y: baseLayout.tee.y },
    teeDepth,
    perspectiveConfig
  );
  
  // Transform hazards
  const transformedHazards = {
    water: baseLayout.hazards.water.map((water) => ({
      point: projectPoint(
        { x: water.x, y: water.y },
        depthProgression(0.5),
        perspectiveConfig
      ),
      original: water,
    })),
    bunkers: baseLayout.hazards.bunkers.map((bunker) => ({
      point: projectPoint(
        { x: bunker.x, y: bunker.y },
        depthProgression(0.6),
        perspectiveConfig
      ),
      original: bunker,
    })),
  };
  
  // Generate shot arcs
  const shotArcs: ShotArc[] = [];
  if (baseLayout.trajectory.length > 0) {
    const shotPoints = baseLayout.trajectory.map((point, index) => {
      const progress = index / (baseLayout.trajectory.length - 1 || 1);
      const z = depthProgression(progress);
      
      // Determine zone depth
      let zoneZ = z;
      if (transformationDescriptor.zoneDepths) {
        if (point.terrain === "rough") {
          zoneZ = transformationDescriptor.zoneDepths.rough;
        } else if (point.terrain === "fairway") {
          zoneZ = transformationDescriptor.zoneDepths.fairway;
        } else if (point.terrain === "approach") {
          zoneZ = transformationDescriptor.zoneDepths.approach;
        } else {
          zoneZ = transformationDescriptor.zoneDepths.green;
        }
      }
      
      return {
        point: { x: point.x, y: point.y },
        z: zoneZ,
        confidence: point.shot.confidence,
        shot: point.shot,
      };
    });
    
    // Generate arcs for each shot segment
    for (let i = 0; i < shotPoints.length - 1; i++) {
      const start = shotPoints[i];
      const end = shotPoints[i + 1];
      
      const arcStyle = getArcStyleForShot(
        start.shot.type,
        start.confidence
      );
      
      const arcConfig: ArcTrajectoryConfig = {
        ...DEFAULT_ARC_CONFIG,
        style: arcStyle,
        perspective: perspectiveConfig,
        baseZ: start.z,
        includeDepth: transformationDescriptor.depthEffect !== "flat",
      };
      
      const sequence = generateShotSequence([start, end], arcConfig);
      if (sequence.length > 0) {
        sequence[0].shot = start.shot;
        shotArcs.push(sequence[0]);
      }
    }
  }
  
  return {
    ...baseLayout,
    transformed: {
      fairway: {
        path: transformedFairwayPath,
        points: transformedFairwayPoints,
      },
      green: transformedGreen,
      tee: transformedTee,
      hazards: transformedHazards,
    },
    shotArcs,
    perspectiveConfig,
    transformationDescriptor,
  };
}

/**
 * Extract points from an SVG path (simplified parser)
 */
function extractPathPoints(pathData: string): Point2D[] {
  const points: Point2D[] = [];
  const commands = pathData.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g) || [];
  
  let currentPoint: Point2D = { x: 0, y: 0 };
  
  commands.forEach((cmd) => {
    const command = cmd[0];
    const coords = cmd
      .slice(1)
      .trim()
      .split(/[\s,]+/)
      .map(parseFloat)
      .filter((n) => !isNaN(n));
    
    if (command === "M" || command === "m") {
      if (coords.length >= 2) {
        const isRelative = command === "m";
        currentPoint = {
          x: isRelative ? currentPoint.x + coords[0] : coords[0],
          y: isRelative ? currentPoint.y + coords[1] : coords[1],
        };
        points.push(currentPoint);
      }
    } else if (command === "L" || command === "l") {
      if (coords.length >= 2) {
        const isRelative = command === "l";
        currentPoint = {
          x: isRelative ? currentPoint.x + coords[0] : coords[0],
          y: isRelative ? currentPoint.y + coords[1] : coords[1],
        };
        points.push(currentPoint);
      }
    } else if (command === "Q" || command === "q") {
      if (coords.length >= 4) {
        const isRelative = command === "q";
        const endX = isRelative ? currentPoint.x + coords[2] : coords[2];
        const endY = isRelative ? currentPoint.y + coords[3] : coords[3];
        // Sample quadratic bezier
        const cpX = isRelative ? currentPoint.x + coords[0] : coords[0];
        const cpY = isRelative ? currentPoint.y + coords[1] : coords[1];
        // Add control point and end point
        points.push({ x: cpX, y: cpY });
        currentPoint = { x: endX, y: endY };
        points.push(currentPoint);
      }
    } else if (command === "C" || command === "c") {
      if (coords.length >= 6) {
        const isRelative = command === "c";
        const cp1X = isRelative ? currentPoint.x + coords[0] : coords[0];
        const cp1Y = isRelative ? currentPoint.y + coords[1] : coords[1];
        const cp2X = isRelative ? currentPoint.x + coords[2] : coords[2];
        const cp2Y = isRelative ? currentPoint.y + coords[3] : coords[3];
        const endX = isRelative ? currentPoint.x + coords[4] : coords[4];
        const endY = isRelative ? currentPoint.y + coords[5] : coords[5];
        // Add control points and end point
        points.push({ x: cp1X, y: cp1Y });
        points.push({ x: cp2X, y: cp2Y });
        currentPoint = { x: endX, y: endY };
        points.push(currentPoint);
      }
    }
  });
  
  return points.length > 0 ? points : [{ x: 0, y: 0 }];
}

/**
 * Get transformation recommendation based on hole archetype
 */
export function getRecommendedTransformation(
  archetype: "Precision" | "Convergent" | "Explorer" | "Creative"
): TransformationDescriptor {
  switch (archetype) {
    case "Precision":
      return {
        viewType: "isometric",
        orientation: "diagonal-up-right",
        depthEffect: "receding",
        zoneDepths: { rough: 0, fairway: 15, approach: 35, green: 50 },
      };
    case "Convergent":
      return {
        viewType: "isometric",
        orientation: "diagonal-up-right",
        depthEffect: "receding",
        zoneDepths: { rough: 0, fairway: 20, approach: 40, green: 60 },
      };
    case "Explorer":
      return {
        viewType: "trimetric",
        orientation: "diagonal-up-right",
        depthEffect: "receding",
        zoneDepths: { rough: 0, fairway: 25, approach: 50, green: 75 },
      };
    case "Creative":
      return {
        viewType: "trimetric",
        orientation: "diagonal-up-right",
        depthEffect: "rising",
        zoneDepths: { rough: -30, fairway: 10, approach: 50, green: 80 },
      };
    default:
      return {
        viewType: "isometric",
        orientation: "diagonal-up-right",
        depthEffect: "receding",
      };
  }
}

