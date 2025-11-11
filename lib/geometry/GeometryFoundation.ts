/**
 * Geometry Foundation System
 * 
 * Defines the ontology and first-principles approach for building golf course geometry.
 * This system establishes a semantic landscape for geometric construction with proper
 * bounding boxes, coordinate spaces, and human-centered design considerations.
 * 
 * Architecture Philosophy:
 * - Geometry is built from first principles using semantic primitives
 * - Bounding boxes provide spatial grounding for all elements
 * - Perspective transformation is applied to grounded geometry, not random coordinates
 * - Human-centered design considerations inform scale and positioning
 */

/**
 * Coordinate Space Ontology
 * 
 * We operate in multiple coordinate spaces:
 * 1. Normalized Space (0-1): Semantic space for layout planning
 * 2. Canvas Space: Pixel coordinates for SVG rendering
 * 3. Transformed Space: Post-perspective transformation coordinates
 * 4. World Space: 3D coordinates with depth (Z-axis)
 */

export interface BoundingBox {
  /** X position in normalized space (0-1) */
  x: number;
  /** Y position in normalized space (0-1) */
  y: number;
  /** Width in normalized space (0-1) */
  width: number;
  /** Height in normalized space (0-1) */
  height: number;
  /** Depth/Z coordinate for 3D positioning */
  z?: number;
  /** Semantic identifier for this bounding box */
  semanticId: string;
}

/**
 * Geometric Primitive Types
 * 
 * These define the building blocks of course geometry from first principles
 */
export type GeometricPrimitive =
  | "tee" // Starting point
  | "fairway_segment" // Linear path segment
  | "fairway_curve" // Curved path segment
  | "green" // Goal area
  | "rough" // Surrounding area
  | "hazard" // Water, bunkers, etc.
  | "shot_landing_zone"; // Area where a shot lands

/**
 * Semantic Zone Mapping
 * 
 * Maps conceptual zones to geometric regions with proper bounding
 */
export interface SemanticZone {
  /** Zone type identifier */
  type: "rough" | "fairway" | "approach" | "green";
  /** Bounding box defining the zone area */
  bounds: BoundingBox;
  /** Confidence level associated with this zone */
  confidence: number;
  /** Depth progression (how Z changes across this zone) */
  depthProgression: (t: number) => number;
}

/**
 * Geometry Builder - First Principles Approach
 * 
 * Builds geometry using semantic primitives and bounding boxes
 */
export class GeometryBuilder {
  private boundingBoxes: Map<string, BoundingBox> = new Map();
  private zones: SemanticZone[] = [];
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  /**
   * Define a bounding box in normalized space
   * 
   * This is the foundation - all geometry is positioned relative to bounding boxes
   */
  defineBoundingBox(
    semanticId: string,
    x: number,
    y: number,
    width: number,
    height: number,
    z?: number
  ): BoundingBox {
    const bounds: BoundingBox = {
      x,
      y,
      width,
      height,
      z,
      semanticId,
    };
    this.boundingBoxes.set(semanticId, bounds);
    return bounds;
  }

  /**
   * Convert normalized coordinates to canvas coordinates
   * 
   * This is the transformation from semantic space (0-1) to pixel space
   */
  normalizedToCanvas(bounds: BoundingBox): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    return {
      x: bounds.x * this.canvasWidth,
      y: bounds.y * this.canvasHeight,
      width: bounds.width * this.canvasWidth,
      height: bounds.height * this.canvasHeight,
    };
  }

  /**
   * Get center point of a bounding box in normalized space
   */
  getCenter(bounds: BoundingBox): { x: number; y: number } {
    return {
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2,
    };
  }

  /**
   * Get center point in canvas space
   */
  getCenterCanvas(bounds: BoundingBox): { x: number; y: number } {
    const canvas = this.normalizedToCanvas(bounds);
    return {
      x: canvas.x + canvas.width / 2,
      y: canvas.y + canvas.height / 2,
    };
  }

  /**
   * Define a semantic zone with proper bounding
   */
  defineZone(
    type: SemanticZone["type"],
    bounds: BoundingBox,
    confidence: number,
    depthProgression: (t: number) => number
  ): SemanticZone {
    const zone: SemanticZone = {
      type,
      bounds,
      confidence,
      depthProgression,
    };
    this.zones.push(zone);
    return zone;
  }

  /**
   * Get bounding box by semantic ID
   */
  getBounds(semanticId: string): BoundingBox | undefined {
    return this.boundingBoxes.get(semanticId);
  }

  /**
   * Find zone containing a point (in normalized coordinates)
   */
  findZoneAtPoint(x: number, y: number): SemanticZone | null {
    for (const zone of this.zones) {
      const bounds = zone.bounds;
      if (
        x >= bounds.x &&
        x <= bounds.x + bounds.width &&
        y >= bounds.y &&
        y <= bounds.y + bounds.height
      ) {
        return zone;
      }
    }
    return null;
  }

  /**
   * Calculate human-centered design constraints
   * 
   * Ensures geometry is sized and positioned appropriately for human perception
   */
  applyHumanCenteredConstraints(
    bounds: BoundingBox,
    minSize: number = 0.05, // Minimum 5% of canvas
    maxSize: number = 0.9 // Maximum 90% of canvas
  ): BoundingBox {
    // Ensure minimum visibility
    const constrainedWidth = Math.max(bounds.width, minSize);
    const constrainedHeight = Math.max(bounds.height, minSize);

    // Ensure maximum boundaries
    const finalWidth = Math.min(constrainedWidth, maxSize);
    const finalHeight = Math.min(constrainedHeight, maxSize);

    // Adjust position to keep within bounds
    const maxX = 1 - finalWidth;
    const maxY = 1 - finalHeight;
    const constrainedX = Math.max(0, Math.min(bounds.x, maxX));
    const constrainedY = Math.max(0, Math.min(bounds.y, maxY));

    return {
      ...bounds,
      x: constrainedX,
      y: constrainedY,
      width: finalWidth,
      height: finalHeight,
    };
  }
}

/**
 * Course Geometry Layout
 * 
 * Defines the complete geometric structure of a golf course hole
 * using bounding boxes and semantic zones
 */
export interface CourseGeometryLayout {
  /** Canvas dimensions */
  canvas: {
    width: number;
    height: number;
  };

  /** Bounding boxes for all elements */
  bounds: {
    tee: BoundingBox;
    green: BoundingBox;
    fairway: BoundingBox[];
    rough: BoundingBox;
    hazards: BoundingBox[];
  };

  /** Semantic zones */
  zones: SemanticZone[];

  /** Path data for fairway (in normalized space, before transformation) */
  fairwayPath: string;

  /** Geometry builder instance */
  builder: GeometryBuilder;
}

/**
 * Build course geometry from first principles
 * 
 * This function creates a principled geometric layout using bounding boxes
 * instead of random coordinate generation
 */
export function buildCourseGeometry(
  canvasWidth: number,
  canvasHeight: number,
  holeConfig: {
    teePosition?: { x: number; y: number }; // Normalized (0-1)
    greenPosition?: { x: number; y: number }; // Normalized (0-1)
    fairwayWidth?: number; // Normalized (0-1)
    curvature?: number; // 0-1, how curved the path is
  }
): CourseGeometryLayout {
  const builder = new GeometryBuilder(canvasWidth, canvasHeight);

  // Default positions with human-centered spacing
  // Tee at bottom-left quadrant
  const teeX = holeConfig.teePosition?.x ?? 0.1;
  const teeY = holeConfig.teePosition?.y ?? 0.7;
  const teeSize = 0.08; // 8% of canvas

  // Green at top-right quadrant
  const greenX = holeConfig.greenPosition?.x ?? 0.75;
  const greenY = holeConfig.greenPosition?.y ?? 0.15;
  const greenSize = 0.12; // 12% of canvas

  // Define tee bounding box
  const teeBounds = builder.defineBoundingBox(
    "tee",
    teeX - teeSize / 2,
    teeY - teeSize / 2,
    teeSize,
    teeSize,
    0 // Z at start
  );

  // Define green bounding box
  const greenBounds = builder.defineBoundingBox(
    "green",
    greenX - greenSize / 2,
    greenY - greenSize / 2,
    greenSize,
    greenSize,
    100 // Z at end (receding into distance)
  );

  // Calculate fairway path using bounding boxes as anchors
  const teeCenter = builder.getCenter(teeBounds);
  const greenCenter = builder.getCenter(greenBounds);

  // Fairway width (normalized)
  const fairwayWidth = holeConfig.fairwayWidth ?? 0.15;

  // Build fairway segments with proper bounding
  const fairwayBounds: BoundingBox[] = [];
  const numSegments = 10;
  const curvature = holeConfig.curvature ?? 0.5;

  for (let i = 0; i < numSegments; i++) {
    const t = i / (numSegments - 1);
    
    // Interpolate position
    const x = teeCenter.x + (greenCenter.x - teeCenter.x) * t;
    const y = teeCenter.y + (greenCenter.y - teeCenter.y) * t;
    
    // Apply curvature (perpendicular offset)
    const perpendicular = {
      x: -(greenCenter.y - teeCenter.y),
      y: greenCenter.x - teeCenter.x,
    };
    const perpLength = Math.sqrt(
      perpendicular.x ** 2 + perpendicular.y ** 2
    );
    const normalized = {
      x: perpendicular.x / perpLength,
      y: perpendicular.y / perpLength,
    };
    
    // Curvature effect: maximum at midpoint
    const curveAmount = Math.sin(t * Math.PI) * curvature * 0.2;
    
    const curvedX = x + normalized.x * curveAmount;
    const curvedY = y + normalized.y * curveAmount;
    
    // Z depth progression
    const z = t * 100;
    
    // Create bounding box for this segment
    const segmentBounds = builder.defineBoundingBox(
      `fairway_segment_${i}`,
      curvedX - fairwayWidth / 2,
      curvedY - fairwayWidth / 2,
      fairwayWidth,
      fairwayWidth,
      z
    );
    
    fairwayBounds.push(segmentBounds);
  }

  // Define rough (surrounding area)
  const roughBounds = builder.defineBoundingBox(
    "rough",
    0,
    0,
    1,
    1,
    0 // Rough at base Z level
  );

  // Define semantic zones
  const zones: SemanticZone[] = [
    builder.defineZone(
      "rough",
      roughBounds,
      0.2,
      (t) => 0 // Rough stays at base level
    ),
    builder.defineZone(
      "fairway",
      fairwayBounds[Math.floor(fairwayBounds.length / 2)],
      0.5,
      (t) => 20 + t * 20 // Fairway at moderate depth
    ),
    builder.defineZone(
      "approach",
      fairwayBounds[Math.floor(fairwayBounds.length * 0.8)],
      0.8,
      (t) => 60 + t * 20 // Approach near green
    ),
    builder.defineZone(
      "green",
      greenBounds,
      0.95,
      (t) => 100 // Green at maximum depth
    ),
  ];

  // Build fairway path from segments (in canvas coordinates, not normalized)
  const pathPoints = fairwayBounds.map((bounds) => {
    const center = builder.getCenter(bounds);
    // Convert to canvas coordinates for SVG path
    return {
      x: center.x * canvasWidth,
      y: center.y * canvasHeight,
    };
  });
  const fairwayPath = buildPathFromPoints(pathPoints, fairwayWidth * canvasWidth);

  return {
    canvas: {
      width: canvasWidth,
      height: canvasHeight,
    },
    bounds: {
      tee: teeBounds,
      green: greenBounds,
      fairway: fairwayBounds,
      rough: roughBounds,
      hazards: [], // Can be added later
    },
    zones,
    fairwayPath,
    builder,
  };
}

/**
 * Build SVG path from points
 */
function buildPathFromPoints(
  points: Array<{ x: number; y: number }>,
  width: number
): string {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${points[0].y}`;

  // Use quadratic bezier for smooth curves
  for (let i = 1; i < points.length; i++) {
    if (i === 1) {
      // First segment: use current point
      path += ` Q ${points[i - 1].x} ${points[i - 1].y}, ${points[i].x} ${points[i].y}`;
    } else {
      // Subsequent segments: smooth continuation
      path += ` T ${points[i].x} ${points[i].y}`;
    }
  }

  return path;
}

