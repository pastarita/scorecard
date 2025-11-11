# Perspective Transformation Engine

A comprehensive engine for transforming 2D golf course plans into 3D axonometric perspective views, with support for 3D arc trajectories representing shot paths through hyperdimensional embedding space.

## Overview

The perspective transformation engine provides:
- **Axonometric Projection**: Transform 2D coordinates into 3D space with customizable viewing angles
- **Transformation Language**: A declarative vocabulary for describing perspective operations
- **3D Arc Generation**: Generate curved 3D trajectories for shot paths
- **Zone-Based Depth**: Different zones (rough, fairway, approach, green) can have different Z-depths

## Core Components

### 1. Perspective Transform (`perspectiveTransform.ts`)

Core transformation functions for projecting 2D/3D points into perspective views.

#### Key Functions

```typescript
// Project a 2D point with optional Z-depth into perspective space
projectPoint(point: Point2D, z?: number, config?: PerspectiveConfig): Point2D

// Transform an SVG path with depth progression
transformPath(pathData: string, baseZ: number, zProgression: (t: number) => number, config?: PerspectiveConfig): string

// Transform an array of 2D points
transformPoints(points: Point2D[], baseZ: number, zProgression: (t: number) => number, config?: PerspectiveConfig): Point2D[]

// Create a perspective preset
createPerspectivePreset(preset: 'isometric' | 'trimetric-diagonal' | 'bird-eye' | 'side-view'): PerspectiveConfig
```

#### Configuration

```typescript
interface PerspectiveConfig {
  xAngle: number;      // Rotation around X-axis (degrees)
  yAngle: number;      // Rotation around Y-axis (degrees)
  zAngle: number;      // Rotation around Z-axis (degrees)
  depthScale: number;  // How much Z affects Y position
  perspectiveFactor: number; // Additional perspective scaling
  viewOffset: Point2D; // Translation offset
  viewScale: number;   // Overall scale
  mode: 'isometric' | 'trimetric' | 'custom';
}
```

### 2. Transformation Language (`perspectiveLanguage.ts`)

A declarative language for describing perspective transformations.

#### Transformation Descriptors

```typescript
interface TransformationDescriptor {
  viewType: 'isometric' | 'trimetric' | 'bird-eye' | 'side-view' | 'custom';
  orientation: 'diagonal-up-right' | 'diagonal-up-left' | 'vertical-up' | 'horizontal-right' | 'diagonal-down-right' | 'diagonal-down-left';
  depthEffect: 'receding' | 'rising' | 'falling' | 'flat' | 'undulating';
  zoneDepths?: {
    rough: number;
    fairway: number;
    approach: number;
    green: number;
  };
  customConfig?: Partial<PerspectiveConfig>;
  description?: string;
}
```

#### Vocabulary

Pre-defined transformation types:

- `standard`: Standard isometric view with receding depth (matches SVG diagram)
- `dogleg`: Trimetric view for dogleg holes with moderate depth
- `birdEye`: Bird's eye perspective looking down on the course
- `flat`: Flat top-down view with no perspective transformation
- `dramatic`: Dramatic perspective with course rising into view

#### Usage

```typescript
import { TRANSFORMATION_VOCABULARY, descriptorToConfig } from '@/lib/perspectiveLanguage';

// Use a named transformation
const transformation = TRANSFORMATION_VOCABULARY.standard();
const config = descriptorToConfig(transformation);

// Create custom transformation
const customTransformation: TransformationDescriptor = {
  viewType: 'isometric',
  orientation: 'diagonal-up-right',
  depthEffect: 'receding',
  zoneDepths: {
    rough: 0,
    fairway: 20,
    approach: 40,
    green: 60,
  },
};
```

### 3. 3D Arc Generator (`shotArc3D.ts`)

Generates 3D arc trajectories for shot paths.

#### Key Functions

```typescript
// Generate a single shot arc
generateShotArc(
  start2D: Point2D,
  end2D: Point2D,
  startZ: number,
  endZ: number,
  confidence: number,
  config?: ArcTrajectoryConfig
): ShotArc

// Generate multiple arcs for a sequence of shots
generateShotSequence(
  shotPoints: Array<{ point: Point2D; z: number; confidence: number; shot: Shot }>,
  config?: ArcTrajectoryConfig
): ShotArc[]
```

#### Arc Styles

- `parabolic`: Smooth parabolic arc (default)
- `ballistic`: Dramatic ballistic arc (high uncertainty)
- `gentle`: Gentle, low arc (high confidence)
- `steep`: Steep arc (moderate uncertainty)

Arc height is inversely related to confidence: lower confidence = higher arc.

### 4. Perspective Hole Generator (`perspectiveHoleGenerator.ts`)

Integration layer that combines hole layout generation with perspective transformation.

#### Key Functions

```typescript
// Generate a complete perspective-transformed hole layout
generatePerspectiveHoleLayout(
  hole: Hole,
  width?: number,
  height?: number,
  transformation?: TransformationDescriptor | string
): PerspectiveHoleLayout

// Get recommended transformation for hole archetype
getRecommendedTransformation(
  archetype: 'Precision' | 'Convergent' | 'Explorer' | 'Creative'
): TransformationDescriptor
```

## Usage Examples

### Basic Usage

```typescript
import { PerspectiveHoleView } from '@/components/prototypes/PerspectiveHoleView';

<PerspectiveHoleView
  hole={hole}
  width={800}
  height={600}
  transformation="standard"
  showShotArcs={true}
  showLabels={true}
/>
```

### Custom Transformation

```typescript
import { PerspectiveHoleView } from '@/components/prototypes/PerspectiveHoleView';
import type { TransformationDescriptor } from '@/lib/perspectiveLanguage';

const customTransformation: TransformationDescriptor = {
  viewType: 'trimetric',
  orientation: 'diagonal-up-right',
  depthEffect: 'rising',
  zoneDepths: {
    rough: -30,
    fairway: 10,
    approach: 50,
    green: 80,
  },
};

<PerspectiveHoleView
  hole={hole}
  transformation={customTransformation}
/>
```

### Direct API Usage

```typescript
import { generatePerspectiveHoleLayout } from '@/lib/perspectiveHoleGenerator';
import { TRANSFORMATION_VOCABULARY } from '@/lib/perspectiveLanguage';

const layout = generatePerspectiveHoleLayout(
  hole,
  800,
  600,
  TRANSFORMATION_VOCABULARY.dogleg()
);

// Access transformed elements
const transformedFairway = layout.transformed.fairway.path;
const shotArcs = layout.shotArcs;
```

## Transformation Language Reference

### View Types

- **isometric**: Standard isometric projection (30° X-axis, -45° Z-axis)
- **trimetric**: Trimetric projection with more dramatic angles
- **bird-eye**: High-angle view looking down (60° X-axis)
- **side-view**: Side-on view (90° X-axis)
- **custom**: Custom configuration with manual angle settings

### Orientations

- **diagonal-up-right**: Course moves up and to the right (default, matches SVG)
- **diagonal-up-left**: Course moves up and to the left
- **vertical-up**: Course moves straight up
- **horizontal-right**: Course moves horizontally to the right
- **diagonal-down-right**: Course moves down and to the right
- **diagonal-down-left**: Course moves down and to the left

### Depth Effects

- **receding**: Course appears to go into the distance (Z increases forward)
- **rising**: Course appears to rise up (Z increases upward, negative to positive)
- **falling**: Course appears to fall away (Z decreases)
- **flat**: No depth effect (Z constant, top-down view)
- **undulating**: Varying depth based on terrain zones

### Zone Depths

Different zones can have different Z-values to create layered depth:

```typescript
zoneDepths: {
  rough: 0,      // Front (closest to viewer)
  fairway: 20,   // Mid-front
  approach: 40,  // Mid-back
  green: 60,     // Back (furthest from viewer)
}
```

## Integration with Existing System

The perspective engine integrates seamlessly with the existing `holeGenerator.ts`:

1. Base layout is generated using `generateHoleLayout()`
2. Perspective transformation is applied to all elements
3. Shot arcs are generated with 3D trajectories
4. All transformed elements are returned in `PerspectiveHoleLayout`

## Performance Considerations

- Transformations are memoized in React components
- Path transformations use simplified parsers (consider full SVG parser for complex paths)
- Arc generation uses configurable segment counts (default: 20 segments per arc)

## Future Enhancements

- Full SVG path parser for better curve preservation
- Animation support for shot trajectories
- Interactive transformation controls
- Export to SVG with embedded transformations
- Support for more complex hole geometries (doglegs, water features)

## See Also

- `components/prototypes/PerspectiveHoleView.tsx` - React component implementation
- `components/experiments/HoleSVG.tsx` - Original 2D hole visualization
- `public/diagrams/devolopment-as-golf_dev/files/development-golf-perspective.svg` - Reference SVG diagram

