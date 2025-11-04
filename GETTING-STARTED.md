# Getting Started with Hyperdimensional Golf Scorecard

**Quick start guide for the scorecard application**

---

## 🚀 Installation & Setup

### 1. Install Dependencies

```bash
cd /Users/Patmac/Desktop/Hyperdimensional_Vector_Space_Golf_dev/scorecard
npm install
```

This will install:
- Next.js 16
- React 19
- TypeScript 5
- TailwindCSS 4
- Vitest (for testing)

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Explore the Application

The app will open to the **Insights Dashboard** by default. Use the tab navigation at the top to explore all 7 visualization experiments.

---

## 📱 Navigation

### Tab Bar Overview

| Tab | Icon | What You'll See |
|-----|------|-----------------|
| **Insights** | 💡 | Key metrics, analytics, and recommendations |
| **Scorecard** | 📊 | Traditional golf scorecard with Front 9 & Back 9 |
| **Manifold** | 🌐 | Hyperdimensional space projection (ℝⁿ → ℝ²) |
| **Timeline** | 📈 | 18-hole progression visualization |
| **Heatmap** | 🗺️ | Confidence levels across all tasks |
| **Archetypes** | ⊗ | Task type distribution analysis |
| **Hole Details** | ⛳ | Deep dive into individual holes with trajectories |

---

## 🎯 Key Concepts

### The Four Archetypes

```
⊕ PRECISION     Par 3    Clear goal, direct path
                         Example: "Fix this specific bug"

⊗ CONVERGENT    Par 4    Iterative refinement toward target
                         Example: "Build user dashboard"

⊛ EXPLORER      Par 5+   Discovery and search
                         Example: "Research best architecture"

⊜ CREATIVE      Par 6+   Subjective, artistic work
                         Example: "Design brand identity"
```

### Shot Types (Club Selection)

```
● Driver   - Rough (< 60% confidence)
             Broad exploration, many possibilities

◐ Iron     - Fairway (60-80% confidence)
             Adding constraints, refinement

◑ Wedge    - Approach (80-95% confidence)
             Detail work, precision

○ Putter   - Green (> 95% confidence)
             Final polish, minimal changes

↺ Recovery - Any terrain
             Course correction when off-track
```

### The Journey

```
ROUGH  →  FAIRWAY  →  APPROACH  →  GREEN  →  HOLE
Blue   →  Green    →  Yellow    →  Orange →  Red
∞-D    →  100-D    →  10-D      →  1-D    →  Point
```

---

## 🎮 Sample Data Walkthrough

The app comes with sample data showing a "User Dashboard MVP" project. Let's walk through it:

### Front 9 (Core Features)

1. **Authentication** (Hole 1) - ⊗ Convergent, Par 4
   - Completed in 3 shots (under par!)
   - Shot 1: Driver (0.4 confidence) - Architecture exploration
   - Shot 2: Iron (0.7 confidence) - Implementation
   - Shot 3: Putter (0.98 confidence) - Polish and tests

2. **User Profile** (Hole 2) - ⊕ Precision, Par 3
   - Completed at par (3 shots)
   - Straightforward implementation

3. **Dashboard Layout** (Hole 3) - ⊜ Creative, Par 6
   - Completed in 5 shots (under par)
   - Multiple exploration shots needed for creative work

4. **Data Visualization** (Hole 4) - ⊗ Convergent, Par 4
   - Took 5 shots (over par)
   - Included recovery shot for data issues

5. **API Integration** (Hole 5) - ⊗ Convergent, Par 4
   - Currently in progress (→)
   - 3 shots so far, on track for par

### Exploring the Data

**In Insights Dashboard**:
- See overall efficiency (how well you're hitting par)
- View handicap (average variance per hole)
- Check velocity (holes per day)
- Read AI-generated insights

**In Manifold Projection**:
- See all 18 holes positioned in 2D space
- Completed holes show their confidence color
- Visual representation of dimensional collapse

**In Hole Details**:
- Click on any hole to see detailed analysis
- View shot-by-shot trajectory
- See confidence progression
- Read notes and strategies

---

## 🔧 Customization

### Creating Your Own Scorecard

Edit `lib/sample-data.ts`:

```typescript
export const MY_PROJECT: ScorecardData = {
  metadata: {
    version: "1.0.0",
    created: "2025-11-04",
    author: "Patrick Astarita"
  },
  project: {
    product: "Your Product Name",
    developer: "Your Name",
    dateStart: "2025-11-01",
    dateEnd: "2025-11-30"
  },
  course: {
    name: "Your Course Name",
    difficulty: "medium",
    totalPar: 72,
    holes: [
      {
        number: 1,
        name: "Your First Feature",
        archetype: "Convergent",
        par: 4,
        actual: 0,
        status: "not_started",
        shots: []
      },
      // ... add 17 more holes
    ]
  }
};
```

Then update `app/page.tsx`:

```typescript
import { MY_PROJECT } from "@/lib/sample-data";

// Replace SAMPLE_SCORECARD with MY_PROJECT
<InsightsDashboard data={MY_PROJECT} />
```

---

## 💾 Data Management

### Exporting Your Scorecard

The app includes hooks for data management:

```typescript
import { useScorecard } from "@/lib/useScorecard";

function MyComponent() {
  const { data, downloadJSON, downloadCSV } = useScorecard(SAMPLE_SCORECARD);
  
  return (
    <>
      <button onClick={downloadJSON}>Download JSON</button>
      <button onClick={downloadCSV}>Download CSV</button>
    </>
  );
}
```

### Data Persistence

Data automatically saves to browser localStorage. It persists across page reloads.

To clear: Use the `clear()` function from `useScorecard` hook.

---

## 🧪 Running Tests

```bash
# Install test dependencies (if not already installed)
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

Tests are located in `__tests__/` directory.

---

## 📊 Understanding the Metrics

### Efficiency
```
Efficiency = (Total Par / Total Actual) × 100
```
- 100%: Perfect performance (at or under par)
- 80-99%: Good performance
- < 80%: Room for improvement

### Handicap
```
Handicap = Average variance per completed hole
```
- Negative: Consistently under par
- Zero: Exactly at par
- Positive: Over par on average

### Velocity
```
Velocity = Completed holes / Days elapsed
```
- > 1.0: More than one hole per day
- 0.5-1.0: One hole every 1-2 days
- < 0.5: Slower pace

---

## 🎨 Visual Guide

### Color Meanings

**By Confidence**:
- 🔵 Blue: Low confidence (< 60%) - Rough, exploration
- 🟢 Green: Medium (60-80%) - Fairway, refinement
- 🟡 Yellow: High (80-95%) - Approach, precision
- 🟠 Orange: Very high (> 95%) - Green, near complete
- 🔴 Red: Complete (99-100%) - Hole, done

**By Archetype**:
- 🟣 Purple: Precision tasks
- 🔵 Blue: Convergent tasks
- 🟠 Orange: Explorer tasks
- 🔴 Pink: Creative tasks

**By Status**:
- ⚪ Gray: Not started
- 🔵 Blue: In progress
- 🟢 Green: Complete

---

## 🚀 Next Steps

### For Daily Use
1. **Create your own scorecard** with your project's 18 features
2. **Track shots** as you work (add after each significant iteration)
3. **Update status** regularly (○ → → ✓)
4. **Review insights** at the end of each week

### For Development
1. **Explore the code** - Start with `types/scorecard.ts` for the data model
2. **Try calculations** - See `lib/calculations.ts` for analytics
3. **Customize colors** - Edit config objects in `types/scorecard.ts`
4. **Add new experiments** - Follow pattern in `components/experiments/`

### For Understanding
1. **Read the framework** - `../files/TALK-2-FRAMEWORK.md` for theory
2. **Study the design** - `../VISUAL-MOTIF-REFERENCE.md` for visual system
3. **Review the plan** - `../SCORECARD-MOTIF-DEVELOPMENT.md` for roadmap

---

## 💡 Tips & Tricks

### Getting Accurate Par Estimates

- **Precision tasks**: Usually Par 3
- **Standard features**: Usually Par 4
- **Research/exploration**: Par 5 or more
- **Creative work**: Par 6+
- **Add 1-2** for uncertainty

### Recording Shots Effectively

- **Don't track micro-iterations**: Only significant prompt rounds
- **Note confidence**: Estimate how certain you are (0.0-1.0)
- **Add descriptions**: Brief note about what you did
- **Mark recovery shots**: When you need to backtrack

### Using Insights

- Check **efficiency** to see if you're estimating par well
- Watch **velocity** to understand if timeline is realistic
- Review **archetype performance** to identify strengths
- Read **generated insights** for actionable recommendations

---

## 🆘 Troubleshooting

### App Won't Start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### TypeScript Errors
```bash
npx tsc --noEmit
```
Check for type errors and fix them.

### Styles Not Loading
Make sure TailwindCSS is properly configured in `tailwind.config.ts` and imported in `app/globals.css`.

### Data Not Saving
Check browser console for localStorage errors. Some browsers block it in private mode.

---

## 📚 Documentation Reference

| Document | Purpose |
|----------|---------|
| `README.md` | Complete application documentation |
| `IMPLEMENTATION-SUMMARY.md` | Technical implementation details |
| `GETTING-STARTED.md` | This quick start guide |
| `../TALK-2-FRAMEWORK.md` | Theoretical foundation |
| `../VISUAL-MOTIF-REFERENCE.md` | Design system specs |

---

## ✨ You're Ready!

You now have everything you need to start using the Hyperdimensional Golf Scorecard for your development projects.

**Remember**: This is a thinking tool, not just a tracker. Use it to:
- Plan before coding (away from computer)
- Reflect on progress (retrospectives)
- Improve estimation (learn your handicap)
- Communicate with team (visual progress)

**Happy golfing through hyperdimensional space!** ⛳

---

**Version**: 0.1.0  
**Last Updated**: November 4, 2025  
**Author**: Patrick Astarita

