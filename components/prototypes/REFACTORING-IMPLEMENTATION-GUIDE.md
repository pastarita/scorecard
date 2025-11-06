# Refactoring Implementation Guide
## Step-by-Step Component Extraction and Organization

**Author**: Patrick Astarita  
**Date**: November 2025  
**Purpose**: Practical guide for refactoring HorizontalScorecardBar into organized components

---

## 🎯 Recommended Structure: Domain-Driven + Builder Pattern Hybrid

### Target Structure

```
components/prototypes/scorecard/
├── HorizontalScorecardBar.tsx           # Main orchestrator
├── domain/
│   ├── header/
│   ├── navigation/
│   ├── holes/
│   └── summary/
├── builders/
├── hooks/
└── types/
```

---

## 📋 Step-by-Step Refactoring Plan

### Step 1: Create Folder Structure

```bash
mkdir -p components/prototypes/scorecard/domain/{header,navigation,holes,summary}
mkdir -p components/prototypes/scorecard/builders/hole-plan-view
mkdir -p components/prototypes/scorecard/hooks
mkdir -p components/prototypes/scorecard/types
```

### Step 2: Extract Type Definitions

**File**: `types/scorecard-view.types.ts`

```typescript
/**
 * Scorecard View Types
 * 
 * Purpose: Type definitions for scorecard view state and configuration
 * Semantic Domain: scorecard/view
 */

export type ViewMode = "front9" | "back9";

export interface ScorecardViewState {
  viewMode: ViewMode;
  hoveredHole: number | null;
}

export interface ScorecardViewProps {
  data: ScorecardData;
  viewState: ScorecardViewState;
  onViewModeChange: (mode: ViewMode) => void;
  onHoleHover: (holeNumber: number | null) => void;
}
```

**File**: `types/hole-plan-view.types.ts`

```typescript
/**
 * Hole Plan View Types
 * 
 * Purpose: Type definitions for hole plan view components
 * Semantic Domain: holes/visualization
 */

export interface HolePlanViewProps {
  hole: Hole;
  isActive: boolean;
  onHover: () => void;
}

export interface HolePlanViewState {
  layout: HoleLayout;
  isComplete: boolean;
  isInProgress: boolean;
  isNotStarted: boolean;
}
```

---

### Step 3: Extract Header Components

**File**: `domain/header/ScorecardHeader.tsx`

```typescript
/**
 * ScorecardHeader - Title and branding display
 * 
 * Purpose: Displays "HYPERDIMENSIONAL GOLF SCORECARD" title
 * Semantic Domain: header/branding
 * Dependencies: None
 * State: None (presentational)
 */
export function ScorecardHeader() {
  return (
    <h2 className="scorecard-title text-base font-bold text-[#3d4a21]">
      HYPERDIMENSIONAL GOLF SCORECARD
    </h2>
  );
}
```

**File**: `domain/header/ViewModeToggle.tsx`

```typescript
/**
 * ViewModeToggle - Front 9 / Back 9 switcher
 * 
 * Purpose: Allows switching between Front 9 and Back 9 views
 * Semantic Domain: header/navigation
 * Dependencies: ViewMode type
 * State: Receives viewMode, calls onViewModeChange
 */
export function ViewModeToggle({
  viewMode,
  onViewModeChange,
}: {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}) {
  // Implementation
}
```

**File**: `domain/header/ScorecardTotals.tsx`

```typescript
/**
 * ScorecardTotals - OUT/IN/TOTAL/Progress display
 * 
 * Purpose: Displays current totals and progress metrics
 * Semantic Domain: header/metrics
 * Dependencies: calculateTotals, Totals type
 * State: Receives totals data
 */
export function ScorecardTotals({
  currentTotals,
  overallTotals,
  viewMode,
  progress,
}: {
  currentTotals: Totals;
  overallTotals: Totals;
  viewMode: ViewMode;
  progress: number;
}) {
  // Implementation
}
```

---

### Step 4: Extract Navigation Components

**File**: `domain/navigation/HoleLadder.tsx`

```typescript
/**
 * HoleLadder - Vertical navigation ladder
 * 
 * Purpose: Visual navigation aid showing hole positions (1-9 or 10-18)
 * Semantic Domain: navigation/selection
 * Dependencies: LadderLine, LadderRung, LadderActiveIndicator
 * State: Receives holes, activeHole, calls onHoleHover
 */
export function HoleLadder({
  holes,
  activeHole,
  onHoleHover,
}: {
  holes: Hole[];
  activeHole: number | null;
  onHoleHover: (holeNumber: number) => void;
}) {
  // Implementation
}
```

**File**: `domain/navigation/LadderLine.tsx`

```typescript
/**
 * LadderLine - Vertical line element
 * 
 * Purpose: Renders the vertical line of the ladder
 * Semantic Domain: navigation/visual
 * Dependencies: None
 * State: None (presentational)
 */
export function LadderLine() {
  return <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#8b956d]" />;
}
```

**File**: `domain/navigation/LadderRung.tsx`

```typescript
/**
 * LadderRung - Individual rung with hole number
 * 
 * Purpose: Renders a single rung showing hole number (1-9 or 10-18)
 * Semantic Domain: navigation/selection
 * Dependencies: None
 * State: Receives hole, isActive, calls onHover
 */
export function LadderRung({
  hole,
  isActive,
  onHover,
}: {
  hole: Hole;
  isActive: boolean;
  onHover: () => void;
}) {
  // Implementation
}
```

**File**: `domain/navigation/LadderActiveIndicator.tsx`

```typescript
/**
 * LadderActiveIndicator - Active hole indicator
 * 
 * Purpose: Shows which hole is currently hovered/selected
 * Semantic Domain: navigation/feedback
 * Dependencies: None
 * State: Receives isActive boolean
 */
export function LadderActiveIndicator({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;
  return (
    <div className="absolute left-0 -translate-x-full -ml-1 w-2 h-2 bg-[#556b2f] rounded-full" />
  );
}
```

---

### Step 5: Extract Hole Visualization Components

**File**: `domain/holes/HoleGrid.tsx`

```typescript
/**
 * HoleGrid - 9-hole grid container
 * 
 * Purpose: Container for 9 hole plan views with dynamic sizing
 * Semantic Domain: holes/layout
 * Dependencies: HolePlanViewContainer
 * State: Receives holes array, manages grid layout
 */
export function HoleGrid({
  holes,
  hoveredHole,
  onHoleHover,
}: {
  holes: Hole[];
  hoveredHole: number | null;
  onHoleHover: (holeNumber: number) => void;
}) {
  // Implementation
}
```

**File**: `domain/holes/HolePlanViewContainer.tsx`

```typescript
/**
 * HolePlanViewContainer - Wrapper for hole plan view
 * 
 * Purpose: Wraps HolePlanView with interaction handlers
 * Semantic Domain: holes/container
 * Dependencies: HolePlanView
 * State: Manages hover state, passes to HolePlanView
 */
export function HolePlanViewContainer({
  hole,
  isActive,
  onHover,
}: {
  hole: Hole;
  isActive: boolean;
  onHover: () => void;
}) {
  return (
    <div className="h-full w-full min-h-[96px] flex">
      <HolePlanView hole={hole} isActive={isActive} onHover={onHover} />
    </div>
  );
}
```

**File**: `domain/holes/HolePlanView.tsx`

```typescript
/**
 * HolePlanView - Main hole visualization component
 * 
 * Purpose: Renders complete golf hole plan view with:
 * - Terrain visualization (fairway, rough, hazards)
 * - Shot trajectory visualization (all shots)
 * - Green with red flag marker
 * - Tee box
 * - Overlays (number, par/actual, shot count)
 * - Interactive tooltip
 * 
 * Semantic Domain: holes/visualization
 * Dependencies: 
 *   - HoleLayoutBuilder (builds layout data)
 *   - HolePlanSVGRenderer (renders SVG)
 *   - HoleOverlays (renders overlays)
 *   - HoleTooltip (renders tooltip)
 * State: Receives hole data, isActive state
 */
export function HolePlanView({
  hole,
  isActive,
  onHover,
}: HolePlanViewProps) {
  // Use builder to generate layout
  const layout = useHoleLayout(hole);
  
  return (
    <div className="relative w-full h-full cursor-pointer group" onMouseEnter={onHover}>
      <HolePlanFrame isActive={isActive}>
        <HolePlanSVGRenderer layout={layout} hole={hole} />
        <HoleOverlays hole={hole} />
      </HolePlanFrame>
      <HoleTooltip hole={hole} />
    </div>
  );
}
```

**File**: `domain/holes/renderers/HolePlanSVGRenderer.tsx`

```typescript
/**
 * HolePlanSVGRenderer - SVG hole plan view renderer
 * 
 * Purpose: Renders the main SVG visualization rotated 90° counterclockwise
 * Semantic Domain: holes/visualization/renderer
 * Dependencies: 
 *   - TerrainLayerRenderer
 *   - ShotTrajectoryLayerRenderer
 *   - GreenLayerRenderer
 *   - TeeLayerRenderer
 * State: Receives layout data, hole data
 */
export function HolePlanSVGRenderer({
  layout,
  hole,
}: {
  layout: HoleLayout;
  hole: Hole;
}) {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full flex-1" preserveAspectRatio="xMidYMid meet">
      <g transform="rotate(-90 50 40)">
        <TerrainLayerRenderer layout={layout} hole={hole} />
        <ShotTrajectoryLayerRenderer layout={layout} hole={hole} />
        <GreenLayerRenderer layout={layout} hole={hole} />
        <TeeLayerRenderer layout={layout} hole={hole} />
      </g>
    </svg>
  );
}
```

**File**: `domain/holes/renderers/TerrainLayerRenderer.tsx`

```typescript
/**
 * TerrainLayerRenderer - Terrain visualization layer
 * 
 * Purpose: Renders fairway, rough, water hazards, and bunkers
 * Semantic Domain: holes/visualization/terrain
 * Dependencies: TERRAIN_CONFIG
 * State: Receives layout.hazards, layout.fairway
 */
export function TerrainLayerRenderer({
  layout,
  hole,
}: {
  layout: HoleLayout;
  hole: Hole;
}) {
  const { fairway, hazards } = layout;
  const isNotStarted = hole.status === "not_started";
  
  return (
    <>
      {/* Background (rough) */}
      <rect width="100" height="80" fill="#f5f0e8" />
      
      {/* Water hazards */}
      {hazards.water.map((water, idx) => (
        <ellipse key={`water-${idx}`} /* ... */ />
      ))}
      
      {/* Fairway fill */}
      <path d={fairway.path} /* ... */ />
      
      {/* Fairway path */}
      <path d={fairway.path} /* ... */ />
      
      {/* Bunkers */}
      {hazards.bunkers.map((bunker, idx) => (
        <circle key={`bunker-${idx}`} /* ... */ />
      ))}
    </>
  );
}
```

**File**: `domain/holes/renderers/ShotTrajectoryLayerRenderer.tsx`

```typescript
/**
 * ShotTrajectoryLayerRenderer - Shot trajectory visualization
 * 
 * Purpose: Renders all shot paths and markers with variance cones
 * Semantic Domain: holes/visualization/trajectory
 * Dependencies: SHOT_TYPE_CONFIG, TERRAIN_CONFIG
 * State: Receives layout.trajectory, hole.shots
 */
export function ShotTrajectoryLayerRenderer({
  layout,
  hole,
}: {
  layout: HoleLayout;
  hole: Hole;
}) {
  const { trajectory } = layout;
  const hasShots = hole.shots.length > 0;
  
  if (!hasShots || trajectory.length === 0) return null;
  
  return (
    <g className="shot-trajectory">
      {/* Shot path */}
      <path d={/* ... */} />
      
      {/* Shot markers */}
      {trajectory.map((point, idx) => (
        <ShotMarker key={`shot-${idx}`} point={point} index={idx} />
      ))}
    </g>
  );
}
```

**File**: `domain/holes/renderers/GreenLayerRenderer.tsx`

```typescript
/**
 * GreenLayerRenderer - Green and flag visualization
 * 
 * Purpose: Renders green circle with red flag marker
 * Semantic Domain: holes/visualization/green
 * Dependencies: None
 * State: Receives layout.green, hole.status
 */
export function GreenLayerRenderer({
  layout,
  hole,
}: {
  layout: HoleLayout;
  hole: Hole;
}) {
  const { green } = layout;
  const isComplete = hole.status === "complete";
  
  return (
    <>
      {/* Green circle */}
      <circle cx={green.x} cy={green.y} r={green.radius} /* ... */ />
      
      {/* Red flag marker */}
      <g transform={`translate(${green.x}, ${green.y})`}>
        <FlagPole />
        <Flag />
        <HoleCircle />
      </g>
    </>
  );
}
```

**File**: `domain/holes/renderers/TeeLayerRenderer.tsx`

```typescript
/**
 * TeeLayerRenderer - Tee box visualization
 * 
 * Purpose: Renders tee box circle with "T" label
 * Semantic Domain: holes/visualization/tee
 * Dependencies: None
 * State: Receives layout.tee
 */
export function TeeLayerRenderer({ layout }: { layout: HoleLayout }) {
  const { tee } = layout;
  
  return (
    <>
      <circle cx={tee.x} cy={tee.y} r={tee.radius} /* ... */ />
      <text x={tee.x} y={tee.y + 2} /* ... */>T</text>
    </>
  );
}
```

---

### Step 6: Extract Overlay Components

**File**: `domain/holes/overlays/HoleOverlays.tsx`

```typescript
/**
 * HoleOverlays - Container for all hole overlays
 * 
 * Purpose: Groups all overlay components (number, par/actual, shot count)
 * Semantic Domain: holes/overlays
 * Dependencies: HoleNumberOverlay, ParActualOverlay, ShotCountBadge
 * State: Receives hole data
 */
export function HoleOverlays({ hole }: { hole: Hole }) {
  return (
    <>
      <HoleNumberOverlay hole={hole} />
      <ParActualOverlay hole={hole} />
      {hole.shots.length > 0 && <ShotCountBadge hole={hole} />}
    </>
  );
}
```

**File**: `domain/holes/overlays/HoleNumberOverlay.tsx`

```typescript
/**
 * HoleNumberOverlay - Hole number badge
 * 
 * Purpose: Displays hole number in top-left corner
 * Semantic Domain: holes/overlays/number
 * Dependencies: None
 * State: Receives hole.number
 */
export function HoleNumberOverlay({ hole }: { hole: Hole }) {
  return (
    <div className="absolute top-1 left-1 text-xs font-semibold text-[#3d4a21] bg-white/80 px-1 rounded">
      {hole.number}
    </div>
  );
}
```

**File**: `domain/holes/overlays/ParActualOverlay.tsx`

```typescript
/**
 * ParActualOverlay - Par/Actual score display
 * 
 * Purpose: Displays par and actual score in bottom-right corner
 * Semantic Domain: holes/overlays/score
 * Dependencies: None
 * State: Receives hole.par, hole.actual
 */
export function ParActualOverlay({ hole }: { hole: Hole }) {
  return (
    <div className="absolute bottom-1 right-1 text-xs font-medium text-[#556b2f] bg-white/80 px-1 rounded">
      {hole.par}/{hole.actual || "-"}
    </div>
  );
}
```

**File**: `domain/holes/overlays/ShotCountBadge.tsx`

```typescript
/**
 * ShotCountBadge - Shot count indicator
 * 
 * Purpose: Displays number of shots taken
 * Semantic Domain: holes/overlays/count
 * Dependencies: None
 * State: Receives hole.shots.length
 */
export function ShotCountBadge({ hole }: { hole: Hole }) {
  return (
    <div className="absolute top-1 right-1 text-xs font-medium text-[#3d4a21] bg-[#c8e0c8]/90 px-1 rounded">
      {hole.shots.length} shot{hole.shots.length !== 1 ? "s" : ""}
    </div>
  );
}
```

---

### Step 7: Extract Interaction Components

**File**: `domain/holes/interactions/HoleTooltip.tsx`

```typescript
/**
 * HoleTooltip - Hover tooltip with hole details
 * 
 * Purpose: Shows detailed hole information on hover
 * Semantic Domain: holes/interactions/tooltip
 * Dependencies: STATUS_CONFIG, SHOT_TYPE_CONFIG
 * State: Receives hole data, shows on group-hover
 */
export function HoleTooltip({ hole }: { hole: Hole }) {
  const statusConfig = STATUS_CONFIG[hole.status];
  const hasShots = hole.shots.length > 0;
  
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-50">
      <div className="bg-[#3d4a21] text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap">
        <div className="font-semibold">{hole.name}</div>
        <div className="text-[#c8e0c8]">
          Par {hole.par} • Actual {hole.actual || "-"} • {statusConfig.description}
        </div>
        {hasShots && (
          <div className="text-[#c8e0c8] mt-1">
            Shots: {hole.shots.length} • {hole.shots.map((s) => SHOT_TYPE_CONFIG[s.type].symbol).join(" ")}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

### Step 8: Extract Summary Components

**File**: `domain/summary/HoleSummaryGrid.tsx`

```typescript
/**
 * HoleSummaryGrid - Grid container for summary boxes
 * 
 * Purpose: Displays 9 summary boxes below hole plan views
 * Semantic Domain: summary/grid
 * Dependencies: HoleSummaryBox
 * State: Receives holes array, hoveredHole
 */
export function HoleSummaryGrid({
  holes,
  hoveredHole,
  onHoleHover,
}: {
  holes: Hole[];
  hoveredHole: number | null;
  onHoleHover: (holeNumber: number | null) => void;
}) {
  return (
    <div className="mt-2 grid grid-cols-9 gap-2 flex-shrink-0">
      {holes.map((hole) => (
        <HoleSummaryBox
          key={hole.number}
          hole={hole}
          isActive={hoveredHole === hole.number}
          onHover={() => onHoleHover(hole.number)}
          onLeave={() => onHoleHover(null)}
        />
      ))}
    </div>
  );
}
```

**File**: `domain/summary/HoleSummaryBox.tsx`

```typescript
/**
 * HoleSummaryBox - Individual summary box
 * 
 * Purpose: Shows hole status symbol and name
 * Semantic Domain: summary/box
 * Dependencies: STATUS_CONFIG
 * State: Receives hole data, isActive state
 */
export function HoleSummaryBox({
  hole,
  isActive,
  onHover,
  onLeave,
}: {
  hole: Hole;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const statusConfig = STATUS_CONFIG[hole.status];
  
  return (
    <div
      className="h-8 bg-white border border-[#8b956d] rounded flex items-center justify-center text-xs font-medium text-[#556b2f] hover:bg-[#f0f8f0] transition-colors cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <span style={{ color: statusConfig.color }}>
        {statusConfig.symbol}
      </span>
      <span className="ml-1 text-[#3d4a21]">
        {hole.name.split(" ")[0]}
      </span>
    </div>
  );
}
```

---

### Step 9: Extract Builder Components

**File**: `builders/hole-plan-view/HoleLayoutBuilder.tsx`

```typescript
/**
 * HoleLayoutBuilder - Builds hole layout data
 * 
 * Purpose: Uses holeGenerator to build layout data for rendering
 * Semantic Domain: builders/hole-layout
 * Dependencies: generateHoleLayout from holeGenerator
 * State: Pure function, no state
 */
export function buildHoleLayout(hole: Hole, width: number = 100, height: number = 80): HoleLayout {
  return generateHoleLayout(hole, width, height);
}
```

---

### Step 10: Extract Custom Hooks

**File**: `hooks/useScorecardView.ts`

```typescript
/**
 * useScorecardView - Scorecard view state management
 * 
 * Purpose: Manages view mode (Front 9 / Back 9) and hole selection
 * Semantic Domain: hooks/view-state
 * Dependencies: ViewMode type
 * State: viewMode, hoveredHole
 */
export function useScorecardView(initialMode: ViewMode = "front9") {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);
  const [hoveredHole, setHoveredHole] = useState<number | null>(null);
  
  return {
    viewMode,
    setViewMode,
    hoveredHole,
    setHoveredHole,
  };
}
```

**File**: `hooks/useHoleLayout.ts`

```typescript
/**
 * useHoleLayout - Hole layout data hook
 * 
 * Purpose: Generates hole layout data using builder pattern
 * Semantic Domain: hooks/layout
 * Dependencies: buildHoleLayout
 * State: Memoized layout data
 */
export function useHoleLayout(hole: Hole, width: number = 100, height: number = 80) {
  return useMemo(() => buildHoleLayout(hole, width, height), [hole, width, height]);
}
```

---

### Step 11: Refactor Main Component

**File**: `HorizontalScorecardBar.tsx` (Refactored)

```typescript
/**
 * HorizontalScorecardBar - Main scorecard orchestrator
 * 
 * Purpose: Coordinates all scorecard sub-components
 * Semantic Domain: scorecard/orchestrator
 * Dependencies: All domain components
 * State: Manages view state via useScorecardView hook
 */
export function HorizontalScorecardBar({ data }: HorizontalScorecardBarProps) {
  const { viewMode, setViewMode, hoveredHole, setHoveredHole } = useScorecardView("front9");
  
  const front9 = data.course.holes.slice(0, 9);
  const back9 = data.course.holes.slice(9, 18);
  const currentHoles = viewMode === "front9" ? front9 : back9;
  
  const front9Totals = calculateTotals(front9);
  const back9Totals = calculateTotals(back9);
  const overallTotals = calculateTotals(data.course.holes);
  
  const currentTotals = viewMode === "front9" ? front9Totals : back9Totals;
  const progress = overallTotals.completion;

  return (
    <div className="bg-[#faf8f3] border-b-2 border-[#8b956d] shadow-sm h-full flex flex-col overflow-hidden">
      <div className="px-4 py-3 flex-shrink-0">
        <ScorecardHeader />
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>
          <ScorecardTotals
            currentTotals={currentTotals}
            overallTotals={overallTotals}
            viewMode={viewMode}
            progress={progress}
          />
        </div>

        <div className="relative flex items-stretch gap-2 flex-1 min-h-[96px] overflow-hidden">
          <div className="relative w-8 flex-shrink-0 flex items-center h-full">
            <HoleLadder
              holes={currentHoles}
              activeHole={hoveredHole}
              onHoleHover={setHoveredHole}
            />
          </div>

          <HoleGrid
            holes={currentHoles}
            hoveredHole={hoveredHole}
            onHoleHover={setHoveredHole}
          />
        </div>

        <HoleSummaryGrid
          holes={currentHoles}
          hoveredHole={hoveredHole}
          onHoleHover={setHoveredHole}
        />
      </div>
    </div>
  );
}
```

---

## 📝 Component Purpose Template

Use this template for each component:

```typescript
/**
 * [ComponentName] - [Brief description]
 * 
 * Purpose: [Detailed purpose statement]
 * Semantic Domain: [domain/subdomain]
 * Dependencies: [List dependencies]
 * State: [State management description]
 * 
 * Example:
 * <ComponentName prop1={value1} prop2={value2} />
 */
```

---

## 🔗 Import Path Conventions

### Domain Components
```typescript
import { ScorecardHeader } from '@/components/prototypes/scorecard/domain/header/ScorecardHeader';
import { HoleLadder } from '@/components/prototypes/scorecard/domain/navigation/HoleLadder';
import { HolePlanView } from '@/components/prototypes/scorecard/domain/holes/HolePlanView';
```

### Builders
```typescript
import { buildHoleLayout } from '@/components/prototypes/scorecard/builders/hole-plan-view/HoleLayoutBuilder';
```

### Hooks
```typescript
import { useScorecardView } from '@/components/prototypes/scorecard/hooks/useScorecardView';
import { useHoleLayout } from '@/components/prototypes/scorecard/hooks/useHoleLayout';
```

### Types
```typescript
import type { ViewMode, ScorecardViewState } from '@/components/prototypes/scorecard/types/scorecard-view.types';
import type { HolePlanViewProps } from '@/components/prototypes/scorecard/types/hole-plan-view.types';
```

---

## ✅ Refactoring Checklist

- [ ] Create folder structure
- [ ] Extract type definitions
- [ ] Extract header components
- [ ] Extract navigation components
- [ ] Extract hole visualization components
- [ ] Extract overlay components
- [ ] Extract interaction components
- [ ] Extract summary components
- [ ] Extract builder components
- [ ] Extract custom hooks
- [ ] Refactor main component
- [ ] Update all imports
- [ ] Add purpose comments
- [ ] Test all functionality
- [ ] Update documentation

---

**Status**: Implementation guide complete  
**Next Steps**: Begin Step 1 (Create Folder Structure)

