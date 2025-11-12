/**
 * Perspective Transformation Engine
 * 
 * Transforms 2D golf course plans into 3D axonometric perspective views.
 * Provides a comprehensive system for creating spatial transformations that
 * make the course appear to move "up and to the right" in 3D space.
 * 
 * This engine implements axonometric projection (specifically isometric/trimetric)
 * to create the depth illusion seen in the development-golf-perspective.svg diagram.
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface PerspectiveConfig {
  // Axonometric projection angles (in degrees)
  xAngle: number; // Rotation around X-axis (default: 30° for isometric)
  yAngle: number; // Rotation around Y-axis (default: 0°)
  zAngle: number; // Rotation around Z-axis (default: 0°)
  
  // Scale factors for depth illusion
  depthScale: number; // How much Z affects Y position (default: 0.5)
  perspectiveFactor: number; // Additional perspective scaling (default: 1.0)
  
  // View configuration
  viewOffset: Point2D; // Translation offset for the view
  viewScale: number; // Overall scale of the view
  
  // Transformation mode
  mode: 'isometric' | 'trimetric' | 'custom';
}

/**
 * Default perspective configuration matching the SVG diagram style
 * Creates the "moving up to the right" effect
 */
export const DEFAULT_PERSPECTIVE: PerspectiveConfig = {
  xAngle: 30, // Rotate 30° around X-axis
  yAngle: 0,
  zAngle: -45, // Rotate -45° around Z-axis to create the diagonal movement
  depthScale: 0.6, // Z affects Y position at 60%
  perspectiveFactor: 1.0,
  viewOffset: { x: 0, y: 0 },
  viewScale: 1.0,
  mode: 'isometric',
};

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Transform a 2D point with implicit Z=0 into 3D space
 * and project it using axonometric projection
 */
export function projectPoint(
  point: Point2D,
  z: number = 0,
  config: PerspectiveConfig = DEFAULT_PERSPECTIVE
): Point2D {
  const { xAngle, yAngle, zAngle, depthScale, perspectiveFactor, viewOffset, viewScale } = config;
  
  // Convert to radians
  const xRad = toRadians(xAngle);
  const yRad = toRadians(yAngle);
  const zRad = toRadians(zAngle);
  
  // Apply rotations in order: Z, Y, X (standard rotation order)
  // Start with point in 3D space (x, y, z)
  let x3d = point.x;
  let y3d = point.y;
  let z3d = z;
  
  // Rotation around Z-axis (affects X and Y)
  const cosZ = Math.cos(zRad);
  const sinZ = Math.sin(zRad);
  const xZ = x3d * cosZ - y3d * sinZ;
  const yZ = x3d * sinZ + y3d * cosZ;
  const zZ = z3d;
  
  // Rotation around Y-axis (affects X and Z)
  const cosY = Math.cos(yRad);
  const sinY = Math.sin(yRad);
  const xY = xZ * cosY + zZ * sinY;
  const yY = yZ;
  const zY = -xZ * sinY + zZ * cosY;
  
  // Rotation around X-axis (affects Y and Z)
  const cosX = Math.cos(xRad);
  const sinX = Math.sin(xRad);
  const xFinal = xY;
  const yFinal = yY * cosX - zY * sinX;
  const zFinal = yY * sinX + zY * cosX;
  
  // Axonometric projection: project 3D to 2D
  // In axonometric, we ignore Z for the final projection but use it for depth scaling
  const projectedX = xFinal * viewScale + viewOffset.x;
  const projectedY = (yFinal - zFinal * depthScale) * viewScale + viewOffset.y;
  
  return {
    x: projectedX * perspectiveFactor,
    y: projectedY * perspectiveFactor,
  };
}

/**
 * Transform a path (SVG path string) using perspective transformation
 * Assumes the path uses absolute coordinates
 */
export function transformPath(
  pathData: string,
  baseZ: number = 0,
  zProgression: (t: number) => number = () => 0,
  config: PerspectiveConfig = DEFAULT_PERSPECTIVE
): string {
  // Parse SVG path and transform each point
  // This is a simplified parser - for production, consider using a proper SVG path parser
  const commands = pathData.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g) || [];
  
  let transformedPath = '';
  let currentPoint: Point2D = { x: 0, y: 0 };
  let pathLength = 0;
  
  // First pass: calculate total path length (approximate)
  // Second pass: transform points based on progress along path
  
  const points: Array<{ point: Point2D; progress: number }> = [];
  
  commands.forEach((cmd) => {
    const command = cmd[0];
    const coords = cmd.slice(1).trim().split(/[\s,]+/).map(parseFloat).filter((n) => !isNaN(n));
    
    if (command === 'M' || command === 'm') {
      // Move command
      if (coords.length >= 2) {
        const isRelative = command === 'm';
        const x = isRelative ? currentPoint.x + coords[0] : coords[0];
        const y = isRelative ? currentPoint.y + coords[1] : coords[1];
        currentPoint = { x, y };
        points.push({ point: currentPoint, progress: 0 });
      }
    } else if (command === 'L' || command === 'l') {
      // Line command
      if (coords.length >= 2) {
        const isRelative = command === 'l';
        const x = isRelative ? currentPoint.x + coords[0] : coords[0];
        const y = isRelative ? currentPoint.y + coords[1] : coords[1];
        currentPoint = { x, y };
        points.push({ point: currentPoint, progress: 0 });
      }
    } else if (command === 'Q' || command === 'q') {
      // Quadratic bezier
      if (coords.length >= 4) {
        const isRelative = command === 'q';
        const cp1x = isRelative ? currentPoint.x + coords[0] : coords[0];
        const cp1y = isRelative ? currentPoint.y + coords[1] : coords[1];
        const endx = isRelative ? currentPoint.x + coords[2] : coords[2];
        const endy = isRelative ? currentPoint.y + coords[3] : coords[3];
        currentPoint = { x: endx, y: endy };
        points.push({ point: { x: cp1x, y: cp1y }, progress: 0.5 });
        points.push({ point: currentPoint, progress: 1 });
      }
    } else if (command === 'C' || command === 'c') {
      // Cubic bezier
      if (coords.length >= 6) {
        const isRelative = command === 'c';
        const cp1x = isRelative ? currentPoint.x + coords[0] : coords[0];
        const cp1y = isRelative ? currentPoint.y + coords[1] : coords[1];
        const cp2x = isRelative ? currentPoint.x + coords[2] : coords[2];
        const cp2y = isRelative ? currentPoint.y + coords[3] : coords[3];
        const endx = isRelative ? currentPoint.x + coords[4] : coords[4];
        const endy = isRelative ? currentPoint.y + coords[5] : coords[5];
        currentPoint = { x: endx, y: endy };
        points.push({ point: { x: cp1x, y: cp1y }, progress: 0.33 });
        points.push({ point: { x: cp2x, y: cp2y }, progress: 0.67 });
        points.push({ point: currentPoint, progress: 1 });
      }
    } else if (command === 'Z' || command === 'z') {
      // Close path
      // points.push({ point: points[0]?.point || currentPoint, progress: 1 });
    }
  });
  
  // Transform points and rebuild path
  if (points.length === 0) return pathData;
  
  // Rebuild with transformed points
  // For simplicity, we'll convert to a polyline and transform
  // A full implementation would preserve the original curve commands
  
  const transformedPoints = points.map(({ point, progress }) => {
    const z = baseZ + zProgression(progress);
    return projectPoint(point, z, config);
  });
  
  if (transformedPoints.length > 0) {
    transformedPath = `M ${transformedPoints[0].x} ${transformedPoints[0].y}`;
    for (let i = 1; i < transformedPoints.length; i++) {
      transformedPath += ` L ${transformedPoints[i].x} ${transformedPoints[i].y}`;
    }
    if (pathData.includes('Z') || pathData.includes('z')) {
      transformedPath += ' Z';
    }
  }
  
  return transformedPath;
}

/**
 * Transform a simple path defined by points
 */
export function transformPoints(
  points: Point2D[],
  baseZ: number = 0,
  zProgression: (t: number) => number = () => 0,
  config: PerspectiveConfig = DEFAULT_PERSPECTIVE
): Point2D[] {
  return points.map((point, index) => {
    const progress = points.length > 1 ? index / (points.length - 1) : 0;
    const z = baseZ + zProgression(progress);
    return projectPoint(point, z, config);
  });
}

/**
 * Create a perspective configuration preset
 */
export function createPerspectivePreset(
  preset: 'isometric' | 'trimetric' | 'trimetric-diagonal' | 'bird-eye' | 'side-view'
): PerspectiveConfig {
  switch (preset) {
    case 'isometric':
      return {
        ...DEFAULT_PERSPECTIVE,
        xAngle: 30,
        zAngle: -45,
        mode: 'isometric',
      };
    case 'trimetric':
    case 'trimetric-diagonal':
      return {
        ...DEFAULT_PERSPECTIVE,
        xAngle: 35,
        yAngle: -10,
        zAngle: -40,
        depthScale: 0.7,
        mode: 'trimetric',
      };
    case 'bird-eye':
      return {
        ...DEFAULT_PERSPECTIVE,
        xAngle: 60,
        yAngle: 0,
        zAngle: -45,
        depthScale: 0.8,
        mode: 'trimetric',
      };
    case 'side-view':
      return {
        ...DEFAULT_PERSPECTIVE,
        xAngle: 90,
        yAngle: 0,
        zAngle: 0,
        depthScale: 1.0,
        mode: 'trimetric',
      };
    default:
      return DEFAULT_PERSPECTIVE;
  }
}

/**
 * Calculate depth progression function for a golf course
 * Courses appear to recede into the distance (higher Z values as you progress)
 */
export function createDepthProgression(
  startZ: number = 0,
  endZ: number = 100,
  curve: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' = 'ease-out'
): (t: number) => number {
  return (t: number) => {
    let easedT = t;
    
    switch (curve) {
      case 'ease-in':
        easedT = t * t;
        break;
      case 'ease-out':
        easedT = 1 - (1 - t) * (1 - t);
        break;
      case 'ease-in-out':
        easedT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        break;
      case 'linear':
      default:
        easedT = t;
    }
    
    return startZ + (endZ - startZ) * easedT;
  };
}

