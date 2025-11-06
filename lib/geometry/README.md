# Geometry Foundation System

## Architecture Overview

This system provides a first-principles approach to building golf course geometry for aerial shot visualization. It replaces the "random geometry protocol" with a structured, ontology-driven system using bounding boxes and semantic zones.

## Core Concepts

### 1. Bounding Boxes
- **Purpose**: Provide spatial grounding for all geometric elements
- **Coordinate Space**: Normalized (0-1) for semantic layout, then converted to canvas space
- **Properties**: Position (x, y), size (width, height), depth (z), semantic identifier

### 2. Semantic Zones
- **Purpose**: Map conceptual zones (rough, fairway, approach, green) to geometric regions
- **Properties**: Zone type, bounding box, confidence level, depth progression function

### 3. Geometry Builder
- **Purpose**: Build geometry from first principles using semantic primitives
- **Features**:
  - Define bounding boxes in normalized space
  - Convert to canvas coordinates
  - Apply human-centered design constraints
  - Find zones containing points

### 4. Arc Placement Builder
- **Purpose**: Properly situate shot arcs within the transformed geometry
- **Features**:
  - Calculate landing positions based on shot confidence and progression
  - Ground arcs in course geometry (not floating)
  - Build arc trajectories that follow the course structure

## Multi-Step Pipeline

### Stage 1: Flat Pattern SVG
1. Build course geometry using bounding boxes
2. Define semantic zones
3. Calculate shot landing positions (grounded in geometry)
4. Generate flat 2D SVG paths

### Stage 2: Aerial Shot Perspective
1. Transform fairway path using perspective transformation
2. Transform all bounding boxes to 3D space
3. Apply depth progression based on zones
4. Project 3D coordinates to 2D canvas

### Stage 3: Shot Arc Animation
1. Build arc trajectories in normalized space
2. Convert to canvas coordinates
3. Apply perspective transformation
4. Generate SVG paths for rendering

## Key Differences from Previous System

### Old System (Random Geometry)
- Used random coordinate generation
- Arcs were calculated independently of geometry
- No grounding or bounding boxes
- Arcs appeared floating above course

### New System (First Principles)
- Uses bounding boxes for all elements
- Arcs are grounded in course geometry
- Proper semantic zones with depth progression
- Human-centered design constraints
- Clear pipeline: flat → transform → arcs

## Usage

```typescript
import { executePipeline } from './Pipeline';
import { TRANSFORMATION_VOCABULARY } from '../perspectiveLanguage';

const result = executePipeline(
  hole,
  1000,
  700,
  TRANSFORMATION_VOCABULARY.standard()
);

// Access pipeline stages
const flatPattern = result.stage1; // Flat 2D geometry
const perspective = result.stage2; // Transformed 3D view
const arcs = result.stage3; // Grounded arc trajectories
```

## Human-Centered Design

The system includes constraints to ensure:
- Minimum visibility: Elements are at least 5% of canvas size
- Maximum boundaries: Elements don't exceed 90% of canvas
- Proper spacing: Elements are positioned within valid bounds
- Perceptual clarity: Geometry is sized for human perception

## Future Enhancements

- Enhanced SVG path parsing for better curve preservation
- Animation system for arc trajectories
- Multiple hole visualization
- Export functionality (SVG, PNG, PDF)
- Interactive editing of bounding boxes

