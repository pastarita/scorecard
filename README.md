# Hyperdimensional Vector Space Golf Scorecard

**A Next.js application for tracking software development through the lens of golf metaphors and category theory**

Version: 0.1.0  
Author: Patrick Astarita  
Date: November 2025

---

## 🎯 Overview

This application implements the **Hyperdimensional Vector Space Golf** framework, providing a visual and analytical tool for tracking development progress through the metaphor of navigating hyperdimensional space (ℝⁿ) as if playing golf.

### Core Concept

> Development with LLMs is navigation through high-dimensional possibility space. Golf provides the perfect metaphor because both are about iteratively converging toward a goal in complex terrain using strategic shot selection.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at `http://localhost:3000`

---

## 📊 Features

### 7 Visualization Experiments

1. **💡 Insights Dashboard** - Analytics, metrics, and recommendations
2. **📊 Scorecard** - Traditional golf scorecard view with Front 9 / Back 9
3. **🌐 Manifold Projection** - Hyperdimensional space (ℝⁿ) projected to 2D
4. **📈 Timeline** - 18-hole course progression visualization
5. **🗺️ Heatmap** - Confidence levels across all tasks
6. **⊗ Archetypes** - Distribution analysis of task types
7. **⛳ Hole Details** - Individual hole analysis with shot trajectories

### Key Capabilities

- **Real-time tracking** of development progress
- **Shot-level detail** for each iteration/prompt
- **Confidence visualization** showing semantic certainty
- **Archetype classification** (Precision, Convergent, Explorer, Creative)
- **Performance analytics** (efficiency, handicap, velocity)
- **Terrain mapping** (Rough → Fairway → Approach → Green → Hole)
- **Data export** to JSON and CSV formats

---

## 🎨 The Visual System

### Color Mapping (Position in Space)

```
ROUGH  →  FAIRWAY  →  APPROACH  →  GREEN  →  HOLE
Blue   →  Green    →  Yellow    →  Orange →  Red
∞      →  Manifold →  ε-ball   →  Near   →  Goal
```

### Shot Type Symbols

```
● Driver   - Large variance, exploratory (Rough)
◐ Iron     - Medium control, refinement (Fairway)
◑ Wedge    - High precision, details (Approach)
○ Putter   - Minimal variance, polish (Green)
↺ Recovery - Course correction, return to path
```

### The Four Archetypes

```
⊕ PRECISION     Par 3    Clear goal, direct path
⊗ CONVERGENT    Par 4    Iterative refinement
⊛ EXPLORER      Par 5+   Discovery and search
⊜ CREATIVE      Par 6+   Subjective, artistic
```

---

## 🏗️ Architecture

### Tech Stack

```yaml
Framework: Next.js 16 (App Router)
Language: TypeScript 5
Styling: TailwindCSS 4
Fonts: Inter, JetBrains Mono (Google Fonts)
```

### Project Structure

```
scorecard/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page with tab navigation
│   └── globals.css         # Global styles
│
├── components/
│   ├── TabNavigation.tsx   # Tab component + hooks
│   └── experiments/        # Visualization components
│       ├── ArchetypeDistribution.tsx
│       ├── ConfidenceHeatmap.tsx
│       ├── HoleDetails.tsx
│       ├── InsightsDashboard.tsx
│       ├── ManifoldProjection.tsx
│       ├── ProgressTimeline.tsx
│       ├── ScorecardTable.tsx
│       └── ShotTrajectory.tsx
│
├── lib/
│   ├── sample-data.ts      # Sample scorecard data
│   ├── calculations.ts     # Analytics and calculations
│   └── useScorecard.ts     # React hooks for data management
│
├── types/
│   └── scorecard.ts        # TypeScript type definitions
│
└── public/                 # Static assets
```

---

## 📐 Type System

### Core Types

```typescript
// Archetype classification
type ScorecardArchetype = "Precision" | "Convergent" | "Explorer" | "Creative";

// Shot types (club selection)
type ShotType = "driver" | "iron" | "wedge" | "putter" | "recovery";

// Development status
type HoleStatus = "not_started" | "in_progress" | "complete" | "blocked" | "cancelled";

// Individual shot/iteration
interface Shot {
  number: number;
  type: ShotType;
  confidence: number;      // 0.0 - 1.0
  description?: string;
  prompt?: string;
  timestamp?: string;
}

// Feature/task (hole)
interface Hole {
  number: number;
  name: string;
  archetype: ScorecardArchetype;
  par: number;
  actual: number;
  status: HoleStatus;
  shots: Shot[];
  notes?: string;
}

// Complete scorecard
interface ScorecardData {
  metadata: { version: string; created: string; author: string };
  project: { product: string; developer: string; /* ... */ };
  course: { name: string; difficulty: string; holes: Hole[] };
}
```

---

## 🔧 Usage

### Creating a Scorecard

1. **Define your project** (18 features/holes)
2. **Classify each as an archetype**:
   - Precision (Par 3): Clear, direct tasks
   - Convergent (Par 4): Iterative refinement
   - Explorer (Par 5+): Discovery work
   - Creative (Par 6+): Subjective/artistic

3. **Track shots** as you develop:
   - Driver: Broad exploration (low confidence)
   - Iron: Adding constraints (medium confidence)
   - Wedge: Detail refinement (high confidence)
   - Putter: Final polish (very high confidence)
   - Recovery: Course correction

4. **Mark progress**: ○ → → ✓

### Example Data Structure

```json
{
  "project": {
    "product": "User Dashboard MVP",
    "developer": "Patrick Astarita",
    "dateStart": "2025-11-01",
    "dateEnd": "2025-11-30"
  },
  "course": {
    "holes": [
      {
        "number": 1,
        "name": "Authentication",
        "archetype": "Convergent",
        "par": 4,
        "actual": 3,
        "status": "complete",
        "shots": [
          {
            "number": 1,
            "type": "driver",
            "confidence": 0.4,
            "description": "Initial architecture"
          },
          {
            "number": 2,
            "type": "iron",
            "confidence": 0.7,
            "description": "Implementation"
          },
          {
            "number": 3,
            "type": "putter",
            "confidence": 0.98,
            "description": "Polish and tests"
          }
        ]
      }
      // ... 17 more holes
    ]
  }
}
```

---

## 📊 Analytics Provided

### Metrics

- **Efficiency**: (Par / Actual) × 100
- **Handicap**: Average variance per completed hole
- **Velocity**: Holes completed per day
- **Completion**: Percentage of holes finished
- **Confidence**: Average across all shots

### Insights Generated

- Performance trends by archetype
- Shot type distribution analysis
- Recovery rate warnings
- Velocity-based completion estimates
- Archetype-specific recommendations

---

## 🎓 Theoretical Foundation

### Category Theory Mapping

```
Category 𝒮ℯ𝓂 (Semantic Transformations):
- Objects: states σ in embedding space S ⊆ ℝⁿ
- Morphisms: shots f: σ → σ' (prompt iterations)
- Composition: sequential refinements
- Functors: projections to visualization
```

### Ontology

| Golf Element | Mathematical Reality | Development Practice |
|--------------|---------------------|---------------------|
| Course | Semantic space ℝⁿ | All possible outputs |
| Rough | Flattened embedding | Underspecified prompts |
| Fairway | Manifold path | Iterative refinement |
| Green | ε-ball near goal | Near-convergence |
| Hole | Target point g | Acceptable solution |
| Shot | Transform σ → σ' | Prompt → response |
| Par | E[shots] | Expected iterations |

### Dimensional Collapse

```
ℝ∞ (Rough) → ℝ¹⁰⁰ (Fairway) → ℝ¹⁰ (Approach) → ℝ¹ (Green) → Point (Hole)
```

---

## 🔌 API / Hooks

### useScorecard Hook

```typescript
const {
  data,              // Current scorecard data
  setData,           // Update entire scorecard
  updateHole,        // Update specific hole
  addShot,           // Add shot to hole
  updateShot,        // Update specific shot
  removeShot,        // Remove shot
  importData,        // Import from JSON
  exportJSON,        // Export to JSON string
  exportCSV,         // Export to CSV string
  downloadJSON,      // Download JSON file
  downloadCSV,       // Download CSV file
  reset,             // Reset to initial data
  clear,             // Clear localStorage
} = useScorecard(initialData);
```

### Calculation Functions

```typescript
import {
  calculateEfficiency,
  calculateHandicap,
  calculateVelocity,
  estimateCompletionDate,
  generateInsights,
  calculateArchetypeMetrics,
  // ... more in lib/calculations.ts
} from "@/lib/calculations";
```

---

## 🎯 Customization

### Adding New Experiments

1. Create component in `components/experiments/`
2. Import in `app/page.tsx`
3. Add to `TABS` array
4. Add conditional render in main content

Example:

```typescript
// 1. Create MyExperiment.tsx
export function MyExperiment({ data }: { data: ScorecardData }) {
  // Your visualization
}

// 2. Import and add to tabs
const TABS: Tab[] = [
  // ... existing tabs
  {
    id: "myexperiment",
    label: "My Experiment",
    icon: "🔬",
    description: "My custom visualization"
  }
];

// 3. Add render
{activeTab === "myexperiment" && (
  <MyExperiment data={SAMPLE_SCORECARD} />
)}
```

### Customizing Colors

Update `types/scorecard.ts`:

```typescript
export const TERRAIN_CONFIG: Record<Terrain, TerrainConfig> = {
  rough: { color: "#YourColor", /* ... */ },
  // ... etc
};
```

---

## 🧪 Sample Data

The app includes comprehensive sample data (`lib/sample-data.ts`) demonstrating:

- 18-hole course structure
- Front 9 (Core Features) + Back 9 (Enhancements)
- Multiple shots per hole with varying confidence
- All four archetypes represented
- Different hole statuses
- Recovery shot examples

---

## 📝 Data Format

### JSON Schema

See `/scorecard-data-template.json` in the parent directory for the complete schema with examples and documentation.

### CSV Export Format

```csv
Hole,Name,Archetype,Par,Actual,Variance,Status,Shots,Avg Confidence,Notes
1,"Authentication",Convergent,4,3,-1,complete,3,0.69,"Came in under par!"
...
```

---

## 🚧 Roadmap

### Phase 1 (Current)
- ✅ Complete TypeScript refactoring
- ✅ 7 visualization experiments
- ✅ Analytics and insights
- ✅ Data export functionality

### Phase 2 (Next)
- [ ] Data import UI
- [ ] Editable scorecards
- [ ] Real-time shot tracking
- [ ] Multiple project support

### Phase 3 (Future)
- [ ] 3D trajectory visualization
- [ ] AI-powered par suggestions
- [ ] Team collaboration features
- [ ] Historical trend analysis

---

## 📚 Related Documentation

- [TALK-2-FRAMEWORK.md](../files/TALK-2-FRAMEWORK.md) - Complete theoretical foundation
- [SCORECARD-MOTIF-DEVELOPMENT.md](../SCORECARD-MOTIF-DEVELOPMENT.md) - Design system
- [VISUAL-MOTIF-REFERENCE.md](../VISUAL-MOTIF-REFERENCE.md) - Visual specifications
- [QUICK-REFERENCE.md](../QUICK-REFERENCE.md) - One-page usage guide

---

## 🤝 Contributing

This is part of the Hyperdimensional Vector Space Golf project. Contributions welcome!

### Development

```bash
# Run development server with hot reload
npm run dev

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

---

## 📄 License

Part of the Panopticode project by Patrick Astarita.

---

## 🌟 Philosophy

> Create thinking tools that help humans navigate vast possibility spaces opened by AI, using timeless spatial metaphors and precise mathematical foundations.

The scorecard is not just a tracking tool—it's an externalized cognitive artifact that helps us think better about the development process itself.

**Practice spatial thinking. Track your journey. Improve your game.** ⛳

---

**Last Updated**: November 2025  
**Version**: 0.1.0  
**Status**: Active Development
