/**
 * 3D Arc Trajectory Generator
 * 
 * Generates 3D arc trajectories for shot paths in the perspective-transformed space.
 * These arcs represent the path of development iterations through the hyperdimensional
 * embedding space, rendered as curved 3D paths that follow the perspective transformation.
 */

import type { Point2D, Point3D, PerspectiveConfig } from './perspectiveTransform';
import { projectPoint } from './perspectiveTransform';
import type { Shot } from '@/types/scorecard';

export interface ShotArcPoint {
  /** 2D projected position */
  position: Point2D;
  /** Original 3D position before projection */
  position3D: Point3D;
  /** Progress along the arc (0 to 1) */
  progress: number;
  /** Confidence at this point */
  confidence: number;
  /** Terrain zone at this point */
  terrain: 'rough' | 'fairway' | 'approach' | 'green';
}

export interface ShotArc {
  /** Start point */
  start: ShotArcPoint;
  /** End point */
  end: ShotArcPoint;
  /** All points along the arc */
  points: ShotArcPoint[];
  /** SVG path data for the arc */
  pathData: string;
  /** Shot data */
  shot: Shot;
  /** Arc height (peak of the arc in 3D space) */
  arcHeight: number;
}

export interface ArcTrajectoryConfig {
  /** Number of segments in the arc */
  segments: number;
  /** Maximum arc height (as percentage of distance) */
  maxArcHeight: number;
  /** Arc style */
  style: 'parabolic' | 'ballistic' | 'gentle' | 'steep';
  /** Whether to include 3D depth in the arc */
  includeDepth: boolean;
  /** Base Z level for the arc */
  baseZ: number;
  /** Perspective configuration */
  perspective: PerspectiveConfig;
}

/**
 * Default arc trajectory configuration
 */
export const DEFAULT_ARC_CONFIG: ArcTrajectoryConfig = {
  segments: 20,
  maxArcHeight: 0.15, // 15% of distance
  style: 'parabolic',
  includeDepth: true,
  baseZ: 0,
  perspective: {
    xAngle: 30,
    yAngle: 0,
    zAngle: -45,
    depthScale: 0.6,
    perspectiveFactor: 1.0,
    viewOffset: { x: 0, y: 0 },
    viewScale: 1.0,
    mode: 'isometric',
  },
};

/**
 * Calculate arc height based on confidence and style
 * Lower confidence = higher arc (more uncertainty/variance)
 */
function calculateArcHeight(
  distance: number,
  confidence: number,
  style: ArcTrajectoryConfig['style'],
  maxArcHeight: number
): number {
  // Inverse relationship: lower confidence = higher arc
  const confidenceFactor = 1 - confidence;
  
  let styleMultiplier = 1.0;
  switch (style) {
    case 'ballistic':
      styleMultiplier = 1.5;
      break;
    case 'steep':
      styleMultiplier = 1.2;
      break;
    case 'gentle':
      styleMultiplier = 0.6;
      break;
    case 'parabolic':
    default:
      styleMultiplier = 1.0;
  }
  
  return distance * maxArcHeight * confidenceFactor * styleMultiplier;
}

/**
 * Generate 3D arc trajectory between two points
 */
export function generateShotArc(
  start2D: Point2D,
  end2D: Point2D,
  startZ: number,
  endZ: number,
  confidence: number,
  config: ArcTrajectoryConfig = DEFAULT_ARC_CONFIG
): ShotArc {
  const { segments, style, includeDepth, baseZ, perspective } = config;
  
  // Calculate 2D distance
  const dx = end2D.x - start2D.x;
  const dy = end2D.y - start2D.y;
  const distance2D = Math.sqrt(dx * dx + dy * dy);
  
  // Calculate arc height
  const arcHeight = calculateArcHeight(
    distance2D,
    confidence,
    style,
    config.maxArcHeight
  );
  
  // Generate points along the arc
  const points: ShotArcPoint[] = [];
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    
    // Interpolate X and Y
    const x = start2D.x + dx * t;
    const y = start2D.y + dy * t;
    
    // Calculate Z (height of arc)
    let z: number;
    if (includeDepth) {
      // Parabolic arc in Z space
      const arcZ = arcHeight * (4 * t * (1 - t)); // Parabolic curve
      z = baseZ + startZ + (endZ - startZ) * t + arcZ;
    } else {
      z = baseZ + startZ + (endZ - startZ) * t;
    }
    
    // Project to 2D using perspective transformation
    const projected = projectPoint({ x, y }, z, perspective);
    
    // Determine terrain based on progress and confidence
    let terrain: 'rough' | 'fairway' | 'approach' | 'green';
    if (confidence < 0.3) {
      terrain = 'rough';
    } else if (confidence < 0.6) {
      terrain = 'fairway';
    } else if (confidence < 0.9) {
      terrain = 'approach';
    } else {
      terrain = 'green';
    }
    
    points.push({
      position: projected,
      position3D: { x, y, z },
      progress: t,
      confidence: confidence, // Could interpolate if needed
      terrain,
    });
  }
  
  // Generate SVG path data
  const pathData = generateArcPath(points, style);
  
  return {
    start: points[0],
    end: points[points.length - 1],
    points,
    pathData,
    shot: {
      number: 0, // Will be set by caller
      type: 'driver',
      confidence,
    } as Shot,
    arcHeight,
  };
}

/**
 * Generate SVG path data from arc points
 */
function generateArcPath(
  points: ShotArcPoint[],
  style: ArcTrajectoryConfig['style']
): string {
  if (points.length < 2) return '';
  
  // For smooth curves, use quadratic bezier segments
  if (style === 'gentle' || style === 'parabolic') {
    let path = `M ${points[0].position.x} ${points[0].position.y}`;
    
    // Use quadratic bezier curves between points for smoothness
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      
      if (i === 1) {
        // First segment: use current point as control
        path += ` Q ${prev.position.x} ${prev.position.y}, ${curr.position.x} ${curr.position.y}`;
      } else {
        // Subsequent segments: smooth curve
        const controlX = (prev.position.x + curr.position.x) / 2;
        const controlY = (prev.position.y + curr.position.y) / 2;
        path += ` T ${curr.position.x} ${curr.position.y}`;
      }
    }
    
    return path;
  } else {
    // For ballistic/steep: use cubic bezier for more dramatic curves
    let path = `M ${points[0].position.x} ${points[0].position.y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[Math.min(i + 1, points.length - 1)];
      
      // Control points for smooth cubic bezier
      const cp1x = prev.position.x + (curr.position.x - prev.position.x) * 0.3;
      const cp1y = prev.position.y + (curr.position.y - prev.position.y) * 0.3;
      const cp2x = curr.position.x - (next.position.x - curr.position.x) * 0.3;
      const cp2y = curr.position.y - (next.position.y - curr.position.y) * 0.3;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.position.x} ${curr.position.y}`;
    }
    
    return path;
  }
}

/**
 * Generate multiple shot arcs for a sequence of shots
 */
export function generateShotSequence(
  shotPoints: Array<{ point: Point2D; z: number; confidence: number; shot: Shot }>,
  config: ArcTrajectoryConfig = DEFAULT_ARC_CONFIG
): ShotArc[] {
  const arcs: ShotArc[] = [];
  
  for (let i = 0; i < shotPoints.length - 1; i++) {
    const start = shotPoints[i];
    const end = shotPoints[i + 1];
    
    const arc = generateShotArc(
      start.point,
      end.point,
      start.z,
      end.z,
      start.confidence,
      {
        ...config,
        baseZ: start.z,
      }
    );
    
    arc.shot = start.shot;
    arcs.push(arc);
  }
  
  return arcs;
}

/**
 * Determine arc style based on shot type and confidence
 */
export function getArcStyleForShot(
  shotType: string,
  confidence: number
): ArcTrajectoryConfig['style'] {
  if (confidence < 0.3) {
    return 'ballistic'; // High uncertainty = dramatic arc
  } else if (confidence < 0.6) {
    return 'steep';
  } else if (confidence < 0.9) {
    return 'parabolic';
  } else {
    return 'gentle'; // High confidence = smooth arc
  }
}

