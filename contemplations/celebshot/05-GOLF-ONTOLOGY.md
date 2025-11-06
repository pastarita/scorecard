# CelebShot - Golf Ontology Integration

**Document**: Golf Ontology Integration Contemplation  
**Related**: [00-OVERVIEW.md](./00-OVERVIEW.md), [01-ARCHITECTURE.md](./01-ARCHITECTURE.md)

---

## ⛳ Golf Ontology Overview

The CelebShot app leverages the existing golf ontology from the scorecard project to frame development problems as golf holes, enabling visual representation and expert matching.

### Core Ontology Concepts

The golf ontology maps development concepts to golf terminology:

- **Project** → **Course**: The overall development project
- **Problem** → **Hole**: A specific development problem or task
- **Solution Approach** → **Shot**: A method or strategy to solve the problem
- **Problem Type** → **Hole Type (Archetype)**: Classification of problem nature
- **Difficulty** → **Par**: Expected complexity/difficulty
- **Problem Space** → **Terrain**: Characteristics of the problem domain
- **Confidence** → **Terrain Progression**: How close to solution

---

## 🏌️ Hole Types (Archetypes)

### Precision (Par 3)
**Development Equivalent**: Clear goal, direct path

**Characteristics**:
- Well-defined problem
- Known solution approach
- Minimal exploration needed
- Straightforward implementation

**Example Problems**:
- "Fix specific bug in login function"
- "Add button to existing form"
- "Update text in UI component"
- "Change API endpoint URL"

**Expert Match**: Expert with specific technology/domain knowledge

**Shot Type**: Usually "putter" or "wedge" (high precision)

**Visualization**: Short, direct hole with clear path to green

---

### Convergent (Par 4)
**Development Equivalent**: Iterative refinement toward known target

**Characteristics**:
- Clear end goal
- Multiple possible approaches
- Requires iteration and refinement
- Progressive constraints

**Example Problems**:
- "Implement feature according to spec"
- "Build component with specific requirements"
- "Integrate API with existing system"
- "Refactor code to improve performance"

**Expert Match**: Expert with implementation experience in domain

**Shot Type**: Usually "iron" or "wedge" (medium to high precision)

**Visualization**: Medium-length hole with fairway approach

---

### Explorer (Par 5)
**Development Equivalent**: Discovery and search

**Characteristics**:
- Unclear solution path
- Requires research and exploration
- Multiple possible solutions
- Broad problem space

**Example Problems**:
- "Research best approach for feature X"
- "Investigate options for architecture Y"
- "Design system for requirement Z"
- "Explore frameworks for project"

**Expert Match**: Expert with broad knowledge and research skills

**Shot Type**: Usually "driver" or "iron" (exploratory to refined)

**Visualization**: Long hole with rough terrain, multiple paths

---

### Creative (Par 6)
**Development Equivalent**: Subjective, artistic

**Characteristics**:
- Subjective requirements
- Artistic/design focus
- Iterative refinement
- Multiple valid solutions

**Example Problems**:
- "Design visual system for app"
- "Craft UX flow for feature"
- "Create brand identity"
- "Develop creative solution for problem"

**Expert Match**: Expert with design/creative expertise

**Shot Type**: Usually "driver" to "iron" (exploratory to refined)

**Visualization**: Complex hole with artistic elements

---

## 🎯 Shot Types

### Driver
**Development Equivalent**: Broad exploratory approach

**Characteristics**:
- Large variance, exploratory
- Low confidence (< 0.6)
- Rough terrain
- Wide variance cone

**Use Cases**:
- Initial problem exploration
- Research phase
- Architecture design
- High-level strategy

**Expert Guidance**: Broad overview, multiple options, research direction

**Visualization**: Long, wide shot trajectory from rough

---

### Iron
**Development Equivalent**: Medium control, refinement

**Characteristics**:
- Medium control, refinement
- Medium confidence (0.6-0.8)
- Fairway terrain
- Medium variance cone

**Use Cases**:
- Implementation planning
- Feature design
- System integration
- Refinement phase

**Expert Guidance**: Structured approach, best practices, implementation details

**Visualization**: Medium-length shot on fairway

---

### Wedge
**Development Equivalent**: High precision, details

**Characteristics**:
- High precision, details
- High confidence (0.8-0.95)
- Approach terrain
- Tight variance cone

**Use Cases**:
- Detailed implementation
- Code review
- Performance optimization
- Bug fixing

**Expert Guidance**: Specific solutions, code examples, detailed recommendations

**Visualization**: Short, precise shot approaching green

---

### Putter
**Development Equivalent**: Minimal variance, polish

**Characteristics**:
- Minimal variance, polish
- Very high confidence (> 0.95)
- Green terrain
- Minimal variance cone

**Use Cases**:
- Final polish
- Bug fixes
- Text updates
- Simple changes

**Expert Guidance**: Precise solution, exact code, minimal changes

**Visualization**: Very short shot on green to hole

---

### Recovery
**Development Equivalent**: Course correction

**Characteristics**:
- Course correction
- Variable confidence
- Any terrain
- Wide variance cone

**Use Cases**:
- Fixing mistakes
- Changing approach
- Pivoting strategy
- Recovering from errors

**Expert Guidance**: Alternative approach, correction strategy, recovery plan

**Visualization**: Curved shot trajectory, course correction

---

## 🗺️ Terrain Mapping

### Rough
**Confidence**: 0.0 - 0.6  
**Development Phase**: Exploration Phase

**Characteristics**:
- Unclear problem space
- Multiple possible paths
- High uncertainty
- Exploration needed

**Visualization**: Rough, uneven terrain, multiple obstacles

---

### Fairway
**Confidence**: 0.6 - 0.8  
**Development Phase**: Refinement Phase

**Characteristics**:
- Clearer direction
- Defined approach
- Some uncertainty
- Refinement needed

**Visualization**: Smooth fairway, clear path forward

---

### Approach
**Confidence**: 0.8 - 0.95  
**Development Phase**: Precision Phase

**Characteristics**:
- Close to solution
- Specific details needed
- High confidence
- Fine-tuning required

**Visualization**: Approach area near green, precise targeting

---

### Green
**Confidence**: 0.95 - 0.99  
**Development Phase**: Convergence Phase

**Characteristics**:
- Very close to solution
- Final polish needed
- Very high confidence
- Minimal changes

**Visualization**: Green surface, very close to hole

---

### Hole
**Confidence**: 0.99 - 1.0  
**Development Phase**: Completion

**Characteristics**:
- Problem solved
- Solution complete
- Maximum confidence
- No further work needed

**Visualization**: Ball in hole, completion

---

## 🎨 Visualization Integration

### SVG Hole Generation

**Reuse Existing Components**:
- `holeGenerator` from `lib/holeGenerator.ts`
- SVG rendering from `components/prototypes/HorizontalScorecardBar.tsx`
- Hole visualization patterns from scorecard

**Adaptation for CelebShot**:
- Generate hole based on problem ontology
- Add emoji building blocks for problem elements
- Display shot trajectories for solution paths
- Show course context for project overview

### Emoji Building Block System

**Problem Element Emojis**:
- 🐛 Bug/Error
- 🔧 Tool/Technology
- 📊 Data/Analytics
- 🎨 Design/UI
- 💻 Code/Implementation
- 🗄️ Database/Storage
- 🌐 Web/Network
- 📱 Mobile/App
- 🔐 Security/Auth
- ⚡ Performance/Optimization

**Solution Type Emojis**:
- ⚡ Quick Fix
- 🔄 Refactor
- 🚀 Optimize
- 🎯 Target/Focus
- 🔍 Research/Explore
- ✨ Polish/Enhance

**Status Emojis**:
- ✅ Complete
- ⏳ In Progress
- ❌ Blocked
- 🔄 Iterating
- 🎯 On Target

### Visualization Data Structure

```typescript
interface ProblemVisualization {
  hole: {
    type: ScorecardArchetype;
    par: number;
    layout: HoleLayout; // From holeGenerator
  };
  terrain: {
    current: Terrain;
    progression: Terrain[]; // Confidence progression
  };
  emojiBlocks: {
    position: { x: number; y: number };
    emoji: string;
    label: string;
    category: 'problem' | 'solution' | 'status';
  }[];
  shots: {
    type: ShotType;
    trajectory: Point[];
    confidence: number;
    description: string;
  }[];
  course: {
    name: string;
    context: string;
    holes: number; // Total problems in project
  };
}
```

---

## 🔄 Problem Canonicalization

### Process: Natural Language → Golf Ontology

**Step 1: Problem Analysis**
- Extract keywords from problem description
- Identify technical domains
- Determine problem complexity
- Assess solution clarity

**Step 2: Ontology Classification**
- Classify as Precision/Convergent/Explorer/Creative
- Set par based on complexity
- Determine terrain based on confidence
- Identify shot type needed

**Step 3: Visualization Generation**
- Generate hole layout using holeGenerator
- Add emoji blocks for problem elements
- Create shot trajectories
- Build course context

**Step 4: Expert Matching**
- Match ontology to expert specializations
- Score expert fit based on hole type
- Consider shot type expertise
- Rank experts by match score

### Example Canonicalization

**Input Problem**:
> "I'm building a React app and need to implement user authentication. I'm not sure whether to use JWT tokens or session-based auth, and I need to integrate with a backend API."

**Canonicalization**:
- **Hole Type**: Explorer (Par 5) - Research and exploration needed
- **Terrain**: Rough - Low confidence, multiple options
- **Shot Type**: Driver - Broad exploratory guidance needed
- **Emoji Blocks**: 🔐 (auth), 💻 (code), 🌐 (web), 🔍 (research)
- **Course Context**: React app project, authentication feature

**Expert Match**: Expert with authentication expertise, React experience, API integration knowledge

**Visualization**: Long hole (Par 5) with rough terrain, multiple path options, research emoji blocks

---

## 🎯 Expert Matching via Ontology

### Matching Algorithm

**Factors**:
1. **Hole Type Match** (40% weight)
   - Expert's experience with hole type
   - Past shots in similar hole types
   - Success rate for hole type

2. **Shot Type Expertise** (30% weight)
   - Expert's proficiency with shot type
   - Quality ratings for shot type
   - Delivery time for shot type

3. **Domain Specialization** (20% weight)
   - Keyword match with expert specializations
   - Technical domain alignment
   - Problem domain experience

4. **Reputation** (10% weight)
   - Overall expert rating
   - Number of completed shots
   - User reviews and feedback

### Scoring Example

**Problem**: Explorer (Par 5), Driver shot, React/Auth domain

**Expert A**:
- Hole Type: 80% match (strong Explorer experience)
- Shot Type: 90% match (excellent Driver shots)
- Domain: 100% match (React + Auth specialist)
- Reputation: 4.8 stars, 50 shots
- **Total Score**: 87%

**Expert B**:
- Hole Type: 60% match (some Explorer experience)
- Shot Type: 70% match (good Driver shots)
- Domain: 80% match (React specialist, some Auth)
- Reputation: 4.5 stars, 30 shots
- **Total Score**: 68%

**Result**: Expert A ranked higher, suggested first

---

## 📊 Ontology-Based Analytics

### Problem Distribution
- Track hole type distribution
- Analyze par distribution
- Monitor terrain progression
- Identify common problem patterns

### Expert Performance
- Success rate by hole type
- Quality ratings by shot type
- Average delivery time by ontology
- Expert specialization effectiveness

### Marketplace Insights
- Most requested hole types
- Most valuable shot types
- Expert supply/demand by ontology
- Pricing trends by ontology

---

## 🔧 Implementation Integration

### Reuse Existing Code

**From Scorecard Project**:
```typescript
// Types
import type {
  ScorecardArchetype,
  ShotType,
  Terrain,
  Hole,
  Shot
} from '@/types/scorecard';

// Generators
import { generateHole } from '@/lib/holeGenerator';

// Visualization
import { HolePlanView } from '@/components/prototypes/...';
```

### New CelebShot Components

```typescript
// Problem Canonicalization
lib/celebshot/ontology/problemCanonicalizer.ts

// Visualization Builder
lib/celebshot/ontology/visualizationBuilder.ts

// Expert Matcher
lib/celebshot/matching/expertMatcher.ts

// Emoji Builder
lib/celebshot/visualization/emojiBuilder.ts
```

---

**Next Steps**: Review CELO integration document and begin technical implementation planning.

