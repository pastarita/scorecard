# Hyperdimensional Vector Space Golf Scorecard

<div align="center">

**A Next.js application for tracking software development through the lens of golf metaphors and category theory**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black.svg)](https://nextjs.org/)

</div>

---

## 🎯 Overview

The **Hyperdimensional Vector Space Golf Scorecard** is a visual and analytical tool that frames software development as navigation through high-dimensional possibility space (ℝⁿ), using golf as an intuitive spatial metaphor. This application helps developers track their progress, understand their patterns, and improve their strategic approach to LLM-assisted development.

### Core Concept

> **Development with LLMs is navigation through high-dimensional possibility space. Golf provides the perfect metaphor because both are about iteratively converging toward a goal in complex terrain using strategic shot selection.**

### What This Tool Provides

- **📊 Visual Analytics**: 7 different visualization experiments to understand your development patterns
- **⛳ Golf Metaphor**: Intuitive spatial thinking about development progress
- **📈 Performance Tracking**: Metrics for efficiency, velocity, and confidence
- **🎯 Strategic Planning**: Archetype classification and shot type recommendations
- **📐 Mathematical Foundation**: Category theory and embedding space concepts made accessible

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm**, **yarn**, or **pnpm** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hyperdimensional-golf-scorecard.git
cd hyperdimensional-golf-scorecard

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

---

## 📊 Features

### 7 Visualization Experiments

1. **💡 Insights Dashboard** - Analytics, metrics, and AI-powered recommendations
2. **📊 Scorecard** - Traditional golf scorecard view with Front 9 & Back 9
3. **⛳ Traditional** - Classic golf scorecard with SVG hole visualizations
4. **🌐 Manifold Projection** - Hyperdimensional space (ℝⁿ) projected to 2D
5. **📈 Timeline** - 18-hole course progression visualization
6. **🗺️ Heatmap** - Confidence levels across all tasks
7. **⊗ Archetypes** - Distribution analysis of task types (Precision, Convergent, Explorer, Creative)
8. **⛳ Hole Details** - Individual hole analysis with shot trajectories

### Additional Features

- **📐 SVG Diagrams Viewer** - Browse and explore all 25+ conceptual diagrams with zoom and pan
- **📥 Data Export** - Export scorecards to JSON and CSV formats
- **💾 Local Storage** - Automatic persistence of scorecard data
- **🎨 Responsive Design** - Works on desktop, tablet, and mobile devices

---

## 🎨 The Visual System

### Color Journey (Terrain Mapping)

```
ROUGH → FAIRWAY → APPROACH → GREEN → HOLE
Blue  → Green   → Yellow   → Orange → Red
∞     → Manifold → ε-ball  → Convergence → Solution
```

### Shot Type Symbols

| Symbol | Club | Confidence | Use Case |
|--------|------|------------|----------|
| ● | Driver | < 60% | Broad exploration, many possibilities |
| ◐ | Iron | 60-80% | Adding constraints, refinement |
| ◑ | Wedge | 80-95% | Detail refinement, precision |
| ○ | Putter | > 95% | Final polish, minimal variance |
| ↺ | Recovery | Variable | Course correction, return to path |

### The Four Archetypes

| Archetype | Symbol | Par | Description | Example |
|-----------|--------|-----|-------------|---------|
| **Precision** | ⊕ | 3 | Clear goal, direct path | "Fix this specific bug" |
| **Convergent** | ⊗ | 4 | Iterative refinement toward target | "Build user dashboard" |
| **Explorer** | ⊛ | 5+ | Discovery and search | "Research best architecture" |
| **Creative** | ⊜ | 6+ | Subjective, artistic work | "Design brand identity" |

---

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4
- **Testing**: Vitest
- **Fonts**: Inter, JetBrains Mono, Playfair Display (Google Fonts)

### Project Structure

```
scorecard/
├── app/                    # Next.js app directory
│   ├── api/                # API routes
│   ├── diagrams/           # SVG diagrams viewer
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
│
├── components/             # React components
│   ├── experiments/        # Visualization components
│   ├── SVGViewer.tsx      # Diagrams viewer
│   └── TabNavigation.tsx   # Navigation component
│
├── lib/                    # Utilities and business logic
│   ├── calculations.ts     # Analytics calculations
│   ├── sample-data.ts      # Sample scorecard data
│   ├── svg-manifest.json   # SVG diagrams index
│   └── useScorecard.ts    # React hooks
│
├── public/                 # Static assets
│   └── diagrams/          # SVG diagram files
│
├── types/                  # TypeScript definitions
│   └── scorecard.ts
│
└── __tests__/              # Test files
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
```

---

## 🔧 Usage

### Creating a Scorecard

1. **Define your project** with 18 features/holes (Front 9 + Back 9)
2. **Classify each hole** by archetype:
   - **Precision** (Par 3): Clear, direct tasks
   - **Convergent** (Par 4): Iterative refinement
   - **Explorer** (Par 5+): Discovery work
   - **Creative** (Par 6+): Subjective/artistic
3. **Track shots** as you develop:
   - **Driver**: Broad exploration (confidence < 60%)
   - **Iron**: Adding constraints (confidence 60-80%)
   - **Wedge**: Detail refinement (confidence 80-95%)
   - **Putter**: Final polish (confidence > 95%)
   - **Recovery**: Course correction
4. **Mark progress**: ○ (not started) → → (in progress) → ✓ (complete)

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

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

---

## 🤝 Contributing

We welcome contributions! This project is open source and community-driven.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and add tests if applicable
4. **Ensure tests pass** (`npm test`)
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Contribution Guidelines

- **Code Style**: Follow the existing TypeScript/React patterns
- **Testing**: Add tests for new features
- **Documentation**: Update README and code comments as needed
- **Commit Messages**: Use clear, descriptive commit messages
- **Pull Requests**: Provide a clear description of changes

### Areas for Contribution

- **Visualizations**: New experiment components
- **Analytics**: Additional metrics and insights
- **Documentation**: Examples, tutorials, case studies
- **Design**: UI/UX improvements, accessibility
- **Performance**: Optimization and caching
- **Testing**: Additional test coverage

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Patrick Astarita

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**Patrick Astarita**

- Project: Hyperdimensional Vector Space Golf
- Part of the Panopticode research initiative

---

## 🙏 Acknowledgments

- Inspired by category theory and its applications to software development
- Built on the foundation of golf metaphors for spatial thinking
- Community feedback and contributions

---

## 🔗 Related Documentation

- [TALK-2-FRAMEWORK.md](../files/TALK-2-FRAMEWORK.md) - Complete theoretical foundation
- [SCORECARD-MOTIF-DEVELOPMENT.md](../SCORECARD-MOTIF-DEVELOPMENT.md) - Design system
- [VISUAL-MOTIF-REFERENCE.md](../VISUAL-MOTIF-REFERENCE.md) - Visual specifications
- [QUICK-REFERENCE.md](../QUICK-REFERENCE.md) - One-page usage guide

---

## 📈 Roadmap

### Phase 1 (Current) ✅
- Complete TypeScript refactoring
- 7 visualization experiments
- Analytics and insights
- Data export functionality
- SVG diagrams viewer

### Phase 2 (Next)
- Data import UI
- Editable scorecards
- Real-time shot tracking
- Multiple project support

### Phase 3 (Future)
- 3D trajectory visualization
- AI-powered par suggestions
- Team collaboration features
- Historical trend analysis

---

## 🌟 Philosophy

> **Create thinking tools that help humans navigate vast possibility spaces opened by AI, using timeless spatial metaphors and precise mathematical foundations.**

The scorecard is not just a tracking tool—it's an externalized cognitive artifact that helps us think better about the development process itself.

**Practice spatial thinking. Track your journey. Improve your game.** ⛳

---

<div align="center">

**Made with ⛳ by [Patrick Astarita](https://github.com/yourusername)**

[Report Bug](https://github.com/yourusername/hyperdimensional-golf-scorecard/issues) · [Request Feature](https://github.com/yourusername/hyperdimensional-golf-scorecard/issues) · [Documentation](https://github.com/yourusername/hyperdimensional-golf-scorecard/wiki)

</div>
