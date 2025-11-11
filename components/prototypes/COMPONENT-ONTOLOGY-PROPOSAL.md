# Component Ontology Proposal
## Horizontal Scorecard Bar - Refactoring Structure Options

**Author**: Patrick Astarita  
**Date**: November 2025  
**Purpose**: Propose multiple component tree structures for re-ontologizing the horizontal scorecard bar with semantic referability

---

## 📋 Current Structure Analysis

### Current Component Hierarchy
```
HorizontalScorecardBar (main component)
├── HolePlanView (inline component)
│   ├── SVG Golf Hole Plan View
│   ├── Hole Number Overlay
│   ├── Par/Actual Overlay
│   ├── Shot Count Badge
│   └── Hover Tooltip
├── Ladder (inline component)
│   ├── Vertical Line
│   ├── Rungs with Hole Numbers
│   └── Active Indicator
└── Main Layout
    ├── Header Section
    ├── View Mode Toggle
    ├── Totals Display
    ├── Holes Grid
    └── Summary Boxes
```

### Issues with Current Structure
- Components are inline functions, not separate files
- Mixed concerns (layout, visualization, interaction)
- Limited semantic referability
- Difficult to test and maintain
- No clear separation of concerns

---

## 🎯 Proposed Component Tree Structures

### Option 1: Domain-Driven Structure (Recommended)
**Philosophy**: Organize by domain concepts (Golf, Course, Hole, Shot)

```
components/prototypes/scorecard/
├── HorizontalScorecardBar.tsx          # Main container component
│   └── Orchestrates all sub-components
│
├── header/
│   ├── ScorecardHeader.tsx              # Title and branding
│   ├── ViewModeToggle.tsx               # Front 9 / Back 9 switcher
│   └── ScorecardTotals.tsx              # OUT/IN/TOTAL/Progress display
│
├── navigation/
│   └── HoleLadder.tsx                   # Vertical ladder with hole numbers
│       ├── LadderLine.tsx               # Vertical line element
│       ├── LadderRung.tsx               # Individual rung with number
│       └── LadderActiveIndicator.tsx    # Active hole indicator
│
├── holes/
│   ├── HoleGrid.tsx                     # 9-hole grid container
│   └── HolePlanViewContainer.tsx        # Individual hole container
│       └── HolePlanView.tsx             # SVG hole visualization
│           ├── HolePlanSVG.tsx          # SVG rendering
│           │   ├── TerrainLayer.tsx     # Fairway, rough, hazards
│           │   ├── ShotTrajectoryLayer.tsx  # Shot paths and markers
│           │   ├── GreenLayer.tsx       # Green with flag
│           │   └── TeeLayer.tsx         # Tee box
│           ├── HoleOverlays.tsx         # Number, par/actual, shot count
│           └── HoleTooltip.tsx          # Hover tooltip
│
├── summary/
│   └── HoleSummaryGrid.tsx              # Summary boxes below holes
│       └── HoleSummaryBox.tsx           # Individual summary box
│
└── types/
    ├── scorecard-view.types.ts          # View-specific types
    └── hole-plan-view.types.ts          # Plan view types
```

**Semantic Referability**:
- `scorecard/header/` - All header-related components
- `scorecard/navigation/` - Navigation and selection components
- `scorecard/holes/` - Hole visualization components
- `scorecard/summary/` - Summary and metadata components

---

### Option 2: Layer-Based Structure
**Philosophy**: Organize by visual/functional layers (Presentation, Logic, Data)

```
components/prototypes/scorecard/
├── HorizontalScorecardBar.tsx           # Main container
│
├── presentation/
│   ├── ScorecardHeader.tsx              # Visual header
│   ├── ViewModeToggle.tsx               # UI toggle
│   ├── ScorecardTotals.tsx               # Totals display
│   ├── HoleLadder.tsx                    # Ladder visualization
│   ├── HoleGrid.tsx                      # Grid layout
│   ├── HolePlanView.tsx                  # Hole visualization
│   └── HoleSummaryGrid.tsx              # Summary grid
│
├── visualization/
│   ├── HolePlanSVG.tsx                   # SVG rendering
│   ├── TerrainVisualization.tsx         # Terrain layers
│   ├── ShotTrajectoryVisualization.tsx  # Shot paths
│   ├── GreenVisualization.tsx            # Green and flag
│   └── TeeVisualization.tsx              # Tee box
│
├── interaction/
│   ├── HoleHoverHandler.tsx              # Hover interactions
│   ├── HoleSelectionHandler.tsx          # Selection logic
│   └── ViewModeHandler.tsx               # View switching
│
└── data/
    ├── ScorecardDataProvider.tsx          # Data context
    └── HoleDataTransformer.tsx           # Data transformations
```

**Semantic Referability**:
- `presentation/` - UI components
- `visualization/` - SVG/visual rendering
- `interaction/` - User interaction handlers
- `data/` - Data management

---

### Option 3: Feature-Based Structure
**Philosophy**: Organize by features/capabilities (Header, Navigation, Visualization, Summary)

```
components/prototypes/scorecard/
├── HorizontalScorecardBar.tsx           # Main container
│
├── features/
│   ├── header/
│   │   ├── ScorecardHeader.tsx
│   │   ├── ViewModeToggle.tsx
│   │   └── ScorecardTotals.tsx
│   │
│   ├── navigation/
│   │   ├── HoleLadder.tsx
│   │   ├── LadderLine.tsx
│   │   ├── LadderRung.tsx
│   │   └── LadderActiveIndicator.tsx
│   │
│   ├── visualization/
│   │   ├── HoleGrid.tsx
│   │   ├── HolePlanView.tsx
│   │   ├── HolePlanSVG.tsx
│   │   ├── TerrainLayer.tsx
│   │   ├── ShotTrajectoryLayer.tsx
│   │   ├── GreenLayer.tsx
│   │   └── TeeLayer.tsx
│   │
│   └── summary/
│       ├── HoleSummaryGrid.tsx
│       └── HoleSummaryBox.tsx
│
└── shared/
    ├── HoleTooltip.tsx
    ├── HoleOverlays.tsx
    └── types/
        ├── scorecard-view.types.ts
        └── hole-plan-view.types.ts
```

**Semantic Referability**:
- `features/header/` - Header feature
- `features/navigation/` - Navigation feature
- `features/visualization/` - Visualization feature
- `features/summary/` - Summary feature
- `shared/` - Shared utilities

---

### Option 4: Atomic Design Structure
**Philosophy**: Organize by component size/complexity (Atoms, Molecules, Organisms)

```
components/prototypes/scorecard/
├── HorizontalScorecardBar.tsx           # Organism
│
├── atoms/
│   ├── HoleNumber.tsx                   # Single hole number
│   ├── ParActual.tsx                    # Par/Actual display
│   ├── StatusSymbol.tsx                 # Status icon
│   ├── LadderLine.tsx                   # Vertical line
│   ├── LadderRung.tsx                   # Horizontal dash
│   └── FlagIcon.tsx                     # Flag SVG
│
├── molecules/
│   ├── ViewModeToggle.tsx               # Toggle buttons
│   ├── ScorecardTotals.tsx              # Totals display
│   ├── HoleOverlay.tsx                  # Number + Par/Actual
│   ├── LadderRungWithLabel.tsx          # Rung + Number
│   ├── GreenWithFlag.tsx                # Green + Flag
│   └── ShotMarker.tsx                   # Shot circle + number
│
├── organisms/
│   ├── ScorecardHeader.tsx              # Header section
│   ├── HoleLadder.tsx                   # Complete ladder
│   ├── HolePlanView.tsx                 # Complete hole view
│   ├── HoleGrid.tsx                     # 9-hole grid
│   └── HoleSummaryGrid.tsx              # Summary grid
│
└── templates/
    └── HorizontalScorecardLayout.tsx    # Layout template
```

**Semantic Referability**:
- `atoms/` - Smallest reusable components
- `molecules/` - Composed components
- `organisms/` - Complex feature components
- `templates/` - Layout structures

---

### Option 5: Builder Pattern Structure (Recommended for Scalability)
**Philosophy**: Organize by builder pattern layers (Data, Builder, Renderer, Interaction)

```
components/prototypes/scorecard/
├── HorizontalScorecardBar.tsx           # Main container
│
├── builders/
│   ├── HoleLayoutBuilder.tsx            # Builds hole layout data
│   ├── ShotTrajectoryBuilder.tsx        # Builds trajectory data
│   └── TerrainBuilder.tsx               # Builds terrain data
│
├── renderers/
│   ├── HolePlanRenderer.tsx             # Renders hole plan view
│   ├── SVG/
│   │   ├── TerrainRenderer.tsx          # Renders terrain layers
│   │   ├── ShotTrajectoryRenderer.tsx   # Renders shot paths
│   │   ├── GreenRenderer.tsx            # Renders green + flag
│   │   └── TeeRenderer.tsx              # Renders tee box
│   └── Overlays/
│       ├── HoleOverlayRenderer.tsx      # Renders overlays
│       └── TooltipRenderer.tsx          # Renders tooltip
│
├── containers/
│   ├── ScorecardHeader.tsx              # Header container
│   ├── HoleGrid.tsx                     # Grid container
│   ├── HoleLadder.tsx                   # Ladder container
│   └── HoleSummaryGrid.tsx              # Summary container
│
├── interactions/
│   ├── HoleHoverHandler.tsx             # Hover logic
│   ├── HoleSelectionHandler.tsx         # Selection logic
│   └── ViewModeHandler.tsx              # View switching
│
└── types/
    ├── builder.types.ts                 # Builder interfaces
    ├── renderer.types.ts                # Renderer interfaces
    └── interaction.types.ts             # Interaction types
```

**Semantic Referability**:
- `builders/` - Data structure builders
- `renderers/` - Visual rendering components
- `containers/` - Layout containers
- `interactions/` - Interaction handlers

---

## 🎨 Recommended Structure: Option 1 (Domain-Driven) + Option 5 (Builder Pattern)

### Hybrid Approach - Best of Both Worlds

```
components/prototypes/scorecard/
├── HorizontalScorecardBar.tsx           # Main orchestrator
│   └── Purpose: Coordinates all sub-components, manages state
│
├── domain/
│   ├── header/
│   │   ├── ScorecardHeader.tsx
│   │   │   └── Purpose: Displays title and branding
│   │   ├── ViewModeToggle.tsx
│   │   │   └── Purpose: Switches between Front 9 / Back 9 views
│   │   └── ScorecardTotals.tsx
│   │       └── Purpose: Displays OUT/IN/TOTAL/Progress metrics
│   │
│   ├── navigation/
│   │   └── HoleLadder.tsx
│   │       ├── Purpose: Visual navigation aid showing hole positions
│   │       ├── LadderLine.tsx
│   │       │   └── Purpose: Vertical line element
│   │       ├── LadderRung.tsx
│   │       │   └── Purpose: Individual rung with hole number (1-9 or 10-18)
│   │       └── LadderActiveIndicator.tsx
│   │           └── Purpose: Shows currently hovered/selected hole
│   │
│   ├── holes/
│   │   ├── HoleGrid.tsx
│   │   │   └── Purpose: 9-hole grid container with dynamic sizing
│   │   └── HolePlanViewContainer.tsx
│   │       └── Purpose: Wrapper for individual hole with interactions
│   │       └── HolePlanView.tsx
│   │           └── Purpose: Main hole visualization component
│   │           ├── builders/
│   │           │   └── HoleLayoutBuilder.tsx
│   │           │       └── Purpose: Uses holeGenerator to build layout data
│   │           ├── renderers/
│   │           │   └── HolePlanSVGRenderer.tsx
│   │           │       └── Purpose: Renders SVG hole plan view
│   │           │       ├── TerrainLayerRenderer.tsx
│   │           │       │   └── Purpose: Renders fairway, rough, hazards
│   │           │       ├── ShotTrajectoryLayerRenderer.tsx
│   │           │       │   └── Purpose: Renders all shot paths and markers
│   │           │       ├── GreenLayerRenderer.tsx
│   │           │       │   └── Purpose: Renders green with red flag
│   │           │       └── TeeLayerRenderer.tsx
│   │           │           └── Purpose: Renders tee box
│   │           ├── overlays/
│   │           │   ├── HoleNumberOverlay.tsx
│   │           │   │   └── Purpose: Hole number badge
│   │           │   ├── ParActualOverlay.tsx
│   │           │   │   └── Purpose: Par/Actual score display
│   │           │   └── ShotCountBadge.tsx
│   │           │       └── Purpose: Shot count indicator
│   │           └── interactions/
│   │               └── HoleTooltip.tsx
│   │                   └── Purpose: Hover tooltip with hole details
│   │
│   └── summary/
│       ├── HoleSummaryGrid.tsx
│       │   └── Purpose: Grid container for summary boxes
│       └── HoleSummaryBox.tsx
│           └── Purpose: Individual summary box with status and name
│
├── builders/
│   └── hole-plan-view/
│       ├── HoleLayoutBuilder.tsx
│       │   └── Purpose: Builds hole layout using holeGenerator
│       ├── ShotTrajectoryBuilder.tsx
│       │   └── Purpose: Builds shot trajectory data from hole.shots
│       └── TerrainBuilder.tsx
│           └── Purpose: Builds terrain zones based on confidence
│
├── hooks/
│   ├── useScorecardView.ts
│   │   └── Purpose: Manages view mode state (Front 9 / Back 9)
│   ├── useHoleSelection.ts
│   │   └── Purpose: Manages hole hover/selection state
│   └── useHoleLayout.ts
│       └── Purpose: Generates hole layout data using builder
│
└── types/
    ├── scorecard-view.types.ts
    │   └── Purpose: View mode types, view state types
    ├── hole-plan-view.types.ts
    │   └── Purpose: Hole plan view props, layout types
    └── builder.types.ts
        └── Purpose: Builder interface types
```

---

## 📝 Component Naming Conventions

### Semantic Naming Rules

1. **Container Components**: `[Domain][Feature]Container.tsx`
   - Example: `HolePlanViewContainer.tsx`
   - Purpose: Wraps feature components with layout/state

2. **Feature Components**: `[Domain][Feature].tsx`
   - Example: `HolePlanView.tsx`, `HoleLadder.tsx`
   - Purpose: Main feature component

3. **Renderer Components**: `[Feature]Renderer.tsx` or `[Feature]LayerRenderer.tsx`
   - Example: `HolePlanSVGRenderer.tsx`, `TerrainLayerRenderer.tsx`
   - Purpose: Renders specific visual layer

4. **Builder Components**: `[Feature]Builder.tsx`
   - Example: `HoleLayoutBuilder.tsx`
   - Purpose: Builds data structures for rendering

5. **Overlay Components**: `[Feature]Overlay.tsx`
   - Example: `HoleNumberOverlay.tsx`
   - Purpose: UI overlays on visualizations

6. **Interaction Components**: `[Feature]Handler.tsx` or `[Feature]Tooltip.tsx`
   - Example: `HoleHoverHandler.tsx`, `HoleTooltip.tsx`
   - Purpose: Handles user interactions

---

## 🔗 Semantic Referability Guidelines

### Import Path Conventions

```typescript
// Domain-based imports
import { ScorecardHeader } from '@/components/prototypes/scorecard/domain/header/ScorecardHeader';
import { HoleLadder } from '@/components/prototypes/scorecard/domain/navigation/HoleLadder';
import { HolePlanView } from '@/components/prototypes/scorecard/domain/holes/HolePlanView';

// Builder imports
import { HoleLayoutBuilder } from '@/components/prototypes/scorecard/builders/hole-plan-view/HoleLayoutBuilder';

// Renderer imports
import { TerrainLayerRenderer } from '@/components/prototypes/scorecard/domain/holes/renderers/TerrainLayerRenderer';

// Type imports
import type { ViewMode, ScorecardViewState } from '@/components/prototypes/scorecard/types/scorecard-view.types';
```

### Component Purpose Comments

Each component should have a clear purpose comment:

```typescript
/**
 * HolePlanView - Main hole visualization component
 * 
 * Purpose: Renders a single golf hole plan view with:
 * - Terrain visualization (fairway, rough, hazards)
 * - Shot trajectory visualization (all shots)
 * - Green with red flag marker
 * - Tee box
 * - Overlays (number, par/actual, shot count)
 * - Interactive tooltip
 * 
 * Semantic Domain: holes/visualization
 * Dependencies: HoleLayoutBuilder, holeGenerator
 * State: Receives hole data, manages hover state
 */
```

---

## 🎯 Implementation Strategy

### Phase 1: Extract Components (Week 1)
1. Extract `HolePlanView` to separate file
2. Extract `Ladder` to separate file
3. Extract header components
4. Extract summary components

### Phase 2: Organize by Domain (Week 2)
1. Create domain folder structure
2. Move components to appropriate domains
3. Update imports
4. Add purpose comments

### Phase 3: Extract Renderers (Week 3)
1. Extract SVG rendering logic
2. Create layer renderers
3. Implement builder pattern
4. Add type definitions

### Phase 4: Add Interactions (Week 4)
1. Extract interaction handlers
2. Create custom hooks
3. Add state management
4. Test interactions

---

## 📊 Component Dependency Graph

```
HorizontalScorecardBar
├── ScorecardHeader
│   ├── ViewModeToggle
│   └── ScorecardTotals
├── HoleLadder
│   ├── LadderLine
│   ├── LadderRung (×9)
│   └── LadderActiveIndicator
├── HoleGrid
│   └── HolePlanViewContainer (×9)
│       └── HolePlanView
│           ├── HoleLayoutBuilder
│           ├── HolePlanSVGRenderer
│           │   ├── TerrainLayerRenderer
│           │   ├── ShotTrajectoryLayerRenderer
│           │   ├── GreenLayerRenderer
│           │   └── TeeLayerRenderer
│           ├── HoleOverlays
│           │   ├── HoleNumberOverlay
│           │   ├── ParActualOverlay
│           │   └── ShotCountBadge
│           └── HoleTooltip
└── HoleSummaryGrid
    └── HoleSummaryBox (×9)
```

---

## ✅ Benefits of Refactoring

1. **Semantic Referability**: Clear component names and locations
2. **Maintainability**: Easier to find and modify components
3. **Testability**: Components can be tested in isolation
4. **Reusability**: Components can be reused across features
5. **Scalability**: Easy to add new features following patterns
6. **Documentation**: Purpose comments provide clear documentation
7. **Type Safety**: Clear type definitions for each component

---

## 🚀 Next Steps

1. **Choose Structure**: Select Option 1 (Domain-Driven) or Option 5 (Builder Pattern)
2. **Create Folders**: Set up folder structure
3. **Extract Components**: Move inline components to separate files
4. **Add Comments**: Add purpose comments to each component
5. **Update Imports**: Update all import paths
6. **Test**: Verify all functionality works
7. **Document**: Update component documentation

---

**Status**: Proposal complete  
**Recommendation**: Option 1 (Domain-Driven) for semantic clarity  
**Alternative**: Option 5 (Builder Pattern) for scalability  
**Hybrid**: Combine both for maximum benefit

