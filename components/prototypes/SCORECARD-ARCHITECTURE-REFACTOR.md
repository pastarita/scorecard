# Scorecard Architecture Refactoring Plan
## Code-Component-Container Dependency Tree & Responsive Refactoring

**Author**: Patrick Astarita  
**Date**: November 2025  
**Purpose**: Recapitulate current architecture and propose responsive refactoring for resizability and breakpoints

---

## 📋 Current Code-Component-Container Dependency Tree

### Level 1: IDE Prototype (Top-Level Container)
```
IDEPrototype
├── State: panelSizes (sidebar, editor, terminal, scorecard, scorecardHeight)
├── Resize Handlers: sidebar, terminal, scorecard (width), scorecardHeight (height)
└── Container Structure:
    ├── Scorecard Container (flex, w-full, height: scorecardHeight | auto)
    │   ├── Scorecard Section (95% width default)
    │   │   └── HorizontalScorecardBar
    │   └── Action Pane (5% width default)
    │       └── ActionPane
    └── Main IDE Content (flex-1)
        ├── SidebarPanel
        ├── EditorPanel
        └── TerminalPanel
```

**Issues at Level 1:**
- Fixed percentage widths (95%/5%) don't adapt to breakpoints
- No responsive breakpoint handling
- Height resizing works but width constraints are rigid

---

### Level 2: Horizontal Scorecard Bar (Main Scorecard Component)
```
HorizontalScorecardBar
├── State: viewMode (front9 | back9), hoveredHole
├── Resize Observer: holesContainerRef (tracks container size)
└── Container Structure:
    ├── Header Section (flex-shrink-0)
    │   ├── Title: "HYPERDIMENSIONAL GOLF SCORECARD"
    │   ├── ViewModeToggle (Front 9 / Back 9)
    │   └── ScorecardTotals (OUT, TOTAL, Progress)
    │
    ├── Holes Display Container (flex-1, minHeight: 0)
    │   ├── Resize Observer: holesContainerRef
    │   ├── Ladder Container (w-8, flex-shrink-0, h-full)
    │   │   └── Ladder Component
    │   │       ├── Vertical Line (absolute, left-0, top-0, bottom-0)
    │   │       └── Rungs Container (flex flex-col justify-center)
    │   │           └── Rung Items (×9)
    │   │               ├── Horizontal Dash (w-3, h-0.5)
    │   │               ├── Number Label
    │   │               └── Active Indicator (conditional)
    │   │
    │   └── HolePlanViewContainer (flex-1, grid grid-cols-9)
    │       ├── Grid Container (height: 100%, minHeight: 0)
    │       │   └── Grid Items (×9, h-full, w-full, minHeight: 0)
    │       │       └── HolePlanView
    │       │           ├── Resize Observer: frameRef
    │       │           ├── HoleFrame (w-full, h-full, flex flex-col)
    │       │           │   └── SVG (w-full, h-full, flex-1, min-h-0)
    │       │           │       ├── Rotated Content (rotate(-90 50 40))
    │       │           │       │   ├── Background (rough)
    │       │           │       │   ├── Water Hazards
    │       │           │       │   ├── Fairway
    │       │           │       │   ├── Bunkers
    │       │           │       │   ├── Shot Trajectory
    │       │           │       │   ├── Green (with red flag)
    │       │           │       │   └── Tee Box
    │       │           │       └── Overlays
    │       │           │           ├── Hole Number Overlay
    │       │           │           ├── Par/Actual Overlay
    │       │           │           └── Shot Count Badge
    │       │           └── Hover Tooltip
    │
    └── Summary Boxes (flex-shrink-0, grid grid-cols-9)
        └── Summary Box Items (×9)
```

**Issues at Level 2:**
- Fixed 9-column grid doesn't adapt to smaller screens
- Ladder always visible (takes space on mobile)
- Header doesn't stack on narrow screens
- No breakpoint-specific layouts
- Grid container height issues (was 68.44px, now fixed but not responsive)

---

### Level 3: Individual Components

#### HoleFrame Component
```
HoleFrame
├── Props: children, isActive, className
└── Structure:
    └── div (w-full, h-full, border-2, rounded, flex flex-col)
        └── children (SVG + Overlays)
```

**Issues:**
- No responsive sizing logic
- Fixed border/rounded styles don't adapt
- No breakpoint-specific styling

#### Ladder Component
```
Ladder
├── Props: holes, activeHole, onHoleHover, viewMode
└── Structure:
    └── div (relative, w-full, h-full, flex items-center)
        ├── Vertical Line (absolute, left-0, top-0, bottom-0)
        └── Rungs Container (flex flex-col justify-center)
            └── Rung Items (×9)
```

**Issues:**
- Always visible, no mobile collapse
- Fixed width (w-8) doesn't adapt
- Vertical centering works but doesn't scale well

---

## 🚨 Critical Responsiveness Issues

### 1. **Fixed Grid Layout**
- **Problem**: `grid-cols-9` is always 9 columns, regardless of screen size
- **Impact**: On mobile (< 640px), holes become too small to be useful
- **Current**: No breakpoint handling

### 2. **Ladder Visibility**
- **Problem**: Ladder always takes 32px (w-8) of horizontal space
- **Impact**: On narrow screens, reduces available space for holes
- **Current**: No collapse/hide option

### 3. **Header Layout**
- **Problem**: Header elements (title, toggle, totals) don't stack on mobile
- **Impact**: Header becomes cramped on small screens
- **Current**: All elements in single row

### 4. **Container Height Constraints**
- **Problem**: Grid container was constrained to 68.44px (now fixed but not responsive)
- **Impact**: Hole frames don't scale proportionally
- **Current**: Fixed with inline styles but needs responsive approach

### 5. **Action Pane Width**
- **Problem**: Fixed 5% width becomes unusable on narrow screens
- **Impact**: Action pane too small to interact with on mobile
- **Current**: No breakpoint handling

---

## 🎯 Proposed Refactored Architecture

### Responsive Container Hierarchy

```
IDEPrototype (Responsive Container)
├── Breakpoint Hooks: useBreakpoint(), useContainerSize()
├── Responsive State: 
│   ├── isMobile (< 640px)
│   ├── isTablet (640px - 1024px)
│   └── isDesktop (> 1024px)
└── Container Structure:
    ├── Scorecard Container (Responsive)
    │   ├── Mobile: Full width, stacked layout
    │   ├── Tablet: 95% width, side-by-side
    │   └── Desktop: 95% width, side-by-side
    │
    └── Main IDE Content (Responsive)
        ├── Mobile: Stacked panels
        ├── Tablet: Sidebar + Editor/Terminal
        └── Desktop: Sidebar + Editor + Terminal
```

### Responsive Scorecard Bar

```
HorizontalScorecardBar (Responsive)
├── Breakpoint Hooks: useScorecardBreakpoint()
├── Responsive Layout:
│   ├── Mobile (< 640px):
│   │   ├── Header: Stacked (title, toggle, totals)
│   │   ├── Ladder: Hidden or collapsible
│   │   ├── Holes: 3-column grid (scrollable)
│   │   └── Summary: 3-column grid
│   │
│   ├── Tablet (640px - 1024px):
│   │   ├── Header: Horizontal (title + toggle, totals)
│   │   ├── Ladder: Visible, w-8
│   │   ├── Holes: 5-column grid
│   │   └── Summary: 5-column grid
│   │
│   └── Desktop (> 1024px):
│       ├── Header: Full horizontal
│       ├── Ladder: Visible, w-8
│       ├── Holes: 9-column grid
│       └── Summary: 9-column grid
│
└── Responsive Components:
    ├── ResponsiveHeader
    ├── ResponsiveLadder (collapsible on mobile)
    ├── ResponsiveHoleGrid (dynamic columns)
    └── ResponsiveSummaryGrid
```

---

## 🔧 Implementation Plan

### Phase 1: Create Responsive Hooks

**File**: `hooks/useBreakpoint.ts`
```typescript
export function useBreakpoint() {
  // Returns: { isMobile, isTablet, isDesktop, breakpoint }
  // Uses: window.matchMedia or ResizeObserver
}
```

**File**: `hooks/useContainerSize.ts`
```typescript
export function useContainerSize<T extends HTMLElement>() {
  // Returns: [ref, { width, height }]
  // Uses: ResizeObserver (already exists, enhance it)
}
```

**File**: `hooks/useScorecardLayout.ts`
```typescript
export function useScorecardLayout() {
  // Returns: { 
  //   gridCols, 
  //   showLadder, 
  //   headerLayout, 
  //   ladderWidth 
  // }
  // Uses: useBreakpoint()
}
```

### Phase 2: Refactor Container Components

**File**: `containers/ResponsiveScorecardContainer.tsx`
```typescript
/**
 * ResponsiveScorecardContainer
 * 
 * Purpose: Wraps scorecard with responsive breakpoint handling
 * Handles: Mobile/Tablet/Desktop layouts
 * Manages: Container sizing, layout switching
 */
export function ResponsiveScorecardContainer({ children }) {
  const breakpoint = useBreakpoint();
  const layout = useScorecardLayout();
  
  return (
    <div className={responsiveContainerClasses(breakpoint)}>
      {children}
    </div>
  );
}
```

**File**: `containers/ResponsiveHoleGrid.tsx`
```typescript
/**
 * ResponsiveHoleGrid
 * 
 * Purpose: Grid container that adapts column count to breakpoints
 * Mobile: 3 columns
 * Tablet: 5 columns
 * Desktop: 9 columns
 */
export function ResponsiveHoleGrid({ holes, children }) {
  const { gridCols } = useScorecardLayout();
  
  return (
    <div 
      className={`grid gap-2 h-full overflow-hidden`}
      style={{ 
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        gridTemplateRows: '1fr',
        height: '100%',
        minHeight: 0
      }}
    >
      {children}
    </div>
  );
}
```

### Phase 3: Refactor Individual Components

**File**: `components/ResponsiveLadder.tsx`
```typescript
/**
 * ResponsiveLadder
 * 
 * Purpose: Ladder that collapses on mobile, adapts width on tablet
 * Mobile: Hidden or collapsible button
 * Tablet: w-6 (smaller)
 * Desktop: w-8 (full)
 */
export function ResponsiveLadder({ holes, activeHole, onHoleHover, viewMode }) {
  const { showLadder, ladderWidth } = useScorecardLayout();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  if (!showLadder && isCollapsed) {
    return <CollapsedLadderButton onClick={() => setIsCollapsed(false)} />;
  }
  
  return (
    <div 
      className="relative flex-shrink-0 h-full"
      style={{ width: ladderWidth }}
    >
      <Ladder holes={holes} activeHole={activeHole} onHoleHover={onHoleHover} viewMode={viewMode} />
    </div>
  );
}
```

**File**: `components/ResponsiveHeader.tsx`
```typescript
/**
 * ResponsiveHeader
 * 
 * Purpose: Header that stacks on mobile, horizontal on desktop
 * Mobile: Stacked layout (title, toggle, totals)
 * Desktop: Horizontal layout (title + toggle | totals)
 */
export function ResponsiveHeader({ title, toggle, totals }) {
  const { headerLayout } = useScorecardLayout();
  
  return (
    <div className={headerLayout === 'stacked' ? 'flex flex-col' : 'flex items-center justify-between'}>
      {/* Content */}
    </div>
  );
}
```

### Phase 4: Update HoleFrame for Responsiveness

**File**: `components/HoleFrame.tsx` (Enhanced)
```typescript
/**
 * HoleFrame - Enhanced for Responsiveness
 * 
 * Purpose: Frame that adapts border/rounded styles to breakpoints
 * Mobile: Smaller border, less rounded
 * Desktop: Full border, rounded
 */
export function HoleFrame({ children, isActive, className }) {
  const breakpoint = useBreakpoint();
  
  const borderClasses = breakpoint.isMobile 
    ? 'border border-[#8b956d] rounded-sm'
    : 'border-2 border-[#8b956d] rounded';
  
  return (
    <div 
      className={`w-full h-full ${borderClasses} transition-all flex flex-col overflow-hidden ${
        isActive 
          ? "border-[#556b2f] bg-[#faf8f3] shadow-md" 
          : "bg-white"
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

---

## 📐 Breakpoint Configuration

### Tailwind Breakpoints (Standard)
```typescript
const BREAKPOINTS = {
  mobile: 640,   // sm
  tablet: 1024,  // lg
  desktop: 1280, // xl
} as const;
```

### Scorecard-Specific Breakpoints
```typescript
const SCORECARD_BREAKPOINTS = {
  // Grid columns
  mobileGridCols: 3,
  tabletGridCols: 5,
  desktopGridCols: 9,
  
  // Ladder visibility
  mobileLadderVisible: false,
  tabletLadderVisible: true,
  desktopLadderVisible: true,
  
  // Ladder width
  mobileLadderWidth: 0,
  tabletLadderWidth: '24px',  // w-6
  desktopLadderWidth: '32px',  // w-8
  
  // Header layout
  mobileHeaderLayout: 'stacked',
  tabletHeaderLayout: 'horizontal',
  desktopHeaderLayout: 'horizontal',
  
  // Action pane
  mobileActionPaneVisible: false,
  tabletActionPaneVisible: true,
  desktopActionPaneVisible: true,
} as const;
```

---

## 🎨 Responsive CSS Classes

### Container Classes
```typescript
const responsiveContainerClasses = (breakpoint) => ({
  mobile: 'flex flex-col w-full',
  tablet: 'flex w-full',
  desktop: 'flex w-full',
});
```

### Grid Classes
```typescript
const responsiveGridClasses = (gridCols) => ({
  base: 'grid gap-2 h-full overflow-hidden',
  mobile: `grid-cols-${gridCols}`,
  tablet: `grid-cols-${gridCols}`,
  desktop: `grid-cols-${gridCols}`,
});
```

---

## ✅ Refactoring Checklist

### Phase 1: Foundation
- [ ] Create `useBreakpoint` hook
- [ ] Create `useContainerSize` hook (enhance existing)
- [ ] Create `useScorecardLayout` hook
- [ ] Define breakpoint constants
- [ ] Create responsive utility functions

### Phase 2: Container Refactoring
- [ ] Create `ResponsiveScorecardContainer`
- [ ] Create `ResponsiveHoleGrid`
- [ ] Update `IDEPrototype` to use responsive containers
- [ ] Update `HorizontalScorecardBar` to use responsive layout

### Phase 3: Component Refactoring
- [ ] Refactor `Ladder` → `ResponsiveLadder`
- [ ] Refactor Header → `ResponsiveHeader`
- [ ] Enhance `HoleFrame` for responsiveness
- [ ] Update `HolePlanView` for responsive sizing
- [ ] Create `ResponsiveSummaryGrid`

### Phase 4: Testing & Optimization
- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (640px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Test resize behavior
- [ ] Optimize performance
- [ ] Add accessibility features

---

## 🚀 Migration Strategy

### Step 1: Add Hooks (Non-Breaking)
- Add new hooks alongside existing code
- Test hooks independently
- No changes to existing components yet

### Step 2: Create Responsive Wrappers (Non-Breaking)
- Create responsive wrapper components
- Keep existing components intact
- Test wrappers independently

### Step 3: Gradual Migration (Breaking)
- Replace components one at a time
- Test after each replacement
- Keep old components as fallback

### Step 4: Cleanup (Breaking)
- Remove old non-responsive components
- Update all imports
- Final testing

---

## 📊 Expected Improvements

### Before Refactoring
- ❌ Fixed 9-column grid (breaks on mobile)
- ❌ Ladder always visible (wastes space)
- ❌ Header doesn't stack (cramped on mobile)
- ❌ No breakpoint handling
- ❌ Grid height issues (68.44px constraint)

### After Refactoring
- ✅ Responsive grid (3/5/9 columns)
- ✅ Collapsible ladder (hidden on mobile)
- ✅ Stacked header (mobile-friendly)
- ✅ Full breakpoint support
- ✅ Proper height propagation
- ✅ Better mobile UX
- ✅ Improved accessibility

---

## 🔗 Related Files

- `components/prototypes/HorizontalScorecardBar.tsx` - Main component to refactor
- `components/prototypes/HoleFrame.tsx` - Frame component to enhance
- `components/prototypes/hooks/useResizeObserver.ts` - Existing hook to enhance
- `components/prototypes/IDEPrototype.tsx` - Container to make responsive
- `components/prototypes/COMPONENT-ONTOLOGY-PROPOSAL.md` - Component structure proposal
- `components/prototypes/REFACTORING-IMPLEMENTATION-GUIDE.md` - Implementation guide

---

## 📝 Notes

- This refactoring addresses both **resizability** (vertical/horizontal) and **breakpoints** (mobile/tablet/desktop)
- The architecture maintains semantic referability while adding responsiveness
- All components remain testable and maintainable
- Migration can be done gradually without breaking existing functionality

