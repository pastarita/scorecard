/**
 * Base Communications: Multi-Level Audience Content
 * Hyperdimensional Vector Space Golf Scorekeeping
 */

export interface Concept {
  icon: string;
  title: string;
  description: string;
  example?: string;
}

export interface Metaphor {
  from: string;
  to: string;
  explanation: string;
}

export interface Application {
  title: string;
  description: string;
}

export interface TechnicalDetail {
  title: string;
  description: string;
  formula?: string;
}

export interface NextStep {
  action: string;
  description: string;
}

export interface AudienceLevel {
  id: string;
  name: string;
  subtitle: string;
  contextLabel: string;
  icon: string;
  overview: string;
  concepts: Concept[];
  metaphors?: Metaphor[];
  applications: Application[];
  technicalDetails?: TechnicalDetail[];
  keyTakeaways: string[];
  nextSteps: NextStep[];
}

export const audienceLevels: AudienceLevel[] = [
  // BEGINNER LEVEL
  {
    id: "beginner",
    name: "Beginner",
    subtitle: "Visual Metaphor Introduction",
    contextLabel: "For those new to the framework",
    icon: "🌱",
    overview:
      "Imagine building software like playing a round of golf. You start far from your goal (the hole), and with each attempt (shot), you get closer. Some terrain is easy (the fairway), some is challenging (the rough). Hyperdimensional Vector Space Golf Scorekeeping tracks your journey through this landscape, helping you understand where you are and how to reach your destination efficiently.",
    concepts: [
      {
        icon: "🏌️",
        title: "The Golf Course = Your Solution Space",
        description:
          "The entire golf course represents all possible solutions to your problem. Just like a golf course has 18 different holes, your project has different challenges to navigate.",
        example:
          "If you're building a website, the 'course' includes all possible designs, features, and code structures you could create.",
      },
      {
        icon: "⛳",
        title: "The Hole = Your Goal",
        description:
          "The hole on each green is where you're trying to land. It represents your desired outcome—the working feature, the solved bug, or the completed task.",
        example:
          "Your goal might be 'Create a login page that works smoothly and looks professional.'",
      },
      {
        icon: "🎯",
        title: "Each Shot = One Attempt",
        description:
          "Every time you try something—write code, test an idea, or refine a feature—that's one shot. Some shots move you closer to the hole, others might land in rough terrain.",
        example:
          "Writing a function, testing it, finding a bug, and fixing it are all separate 'shots' toward your goal.",
      },
      {
        icon: "🌿",
        title: "Terrain Types = Clarity Levels",
        description:
          "Different areas of the course represent how clear your path is. The fairway is smooth and direct. The rough is uncertain. The green means you're very close to finishing.",
        example:
          "Rough = 'I'm not sure what approach to take.' Fairway = 'I have a good direction.' Green = 'Just small tweaks needed.'",
      },
    ],
    metaphors: [
      {
        from: "Par (expected shots)",
        to: "Task complexity",
        explanation:
          "A par-3 hole is simple (3 expected shots). A par-5 is complex (5 expected shots). Similarly, some tasks are quick wins, others require many iterations.",
      },
      {
        from: "Club selection",
        to: "Strategy choice",
        explanation:
          "Choosing a driver (long distance) vs. putter (precision) is like choosing between broad exploration vs. focused refinement when solving problems.",
      },
      {
        from: "Scorecard tracking",
        to: "Progress documentation",
        explanation:
          "Just as golfers track their score, you track your development journey—how many attempts, which strategies worked, what terrain you encountered.",
      },
    ],
    applications: [
      {
        title: "Track Your Learning Journey",
        description:
          "Use the metaphor to understand where you are in mastering a new skill. Are you still in the rough (exploring), on the fairway (making progress), or on the green (almost there)?",
      },
      {
        title: "Estimate Task Difficulty",
        description:
          "Before starting work, estimate the 'par'—how many iterations you expect to need. This helps set realistic expectations.",
      },
      {
        title: "Reflect on Progress",
        description:
          "At the end of a session, review your 'scorecard' to see what worked, what didn't, and how you can improve your approach.",
      },
      {
        title: "Communicate with Teams",
        description:
          "Tell your team 'I'm in the rough on this feature' or 'We're on the green, just polishing now' to quickly convey status.",
      },
    ],
    keyTakeaways: [
      "Software development is a journey through a landscape of possibilities",
      "Each attempt (shot) moves you through different terrain types",
      "Some paths are clearer (fairway) than others (rough)",
      "Tracking your journey helps you improve over time",
      "The metaphor makes complex progress easier to visualize and discuss",
    ],
    nextSteps: [
      {
        action: "Watch the Intro Video",
        description: "See the visual metaphor in action with examples",
      },
      {
        action: "Explore Diagrams",
        description: "View the ontological mapping between golf and development",
      },
      {
        action: "Try Intermediate Level",
        description: "Learn how this applies specifically to LLM-assisted coding",
      },
    ],
  },

  // INTERMEDIATE LEVEL
  {
    id: "intermediate",
    name: "Intermediate",
    subtitle: "Developer-Focused Application",
    contextLabel: "For developers using LLMs",
    icon: "💻",
    overview:
      "When working with AI coding assistants, each prompt-response cycle is like a golf shot navigating semantic space. The AI operates in high-dimensional vector space (ℝⁿ), where your prompts steer toward solutions. Hyperdimensional Vector Space Golf Scorekeeping tracks these iterations, helping you understand prompt effectiveness, convergence patterns, and when to change strategies.",
    concepts: [
      {
        icon: "🔮",
        title: "Semantic Space = Vector Embedding Space",
        description:
          "LLMs represent meanings as high-dimensional vectors. Your prompts navigate this space, moving from underspecified regions (rough) toward precise solutions (green).",
        example:
          "The prompt 'make a button' exists in rough terrain (many interpretations). 'Create a blue 48px rounded button with hover effect using Tailwind' is on the green.",
      },
      {
        icon: "🎪",
        title: "Iterative Refinement = Shot Sequence",
        description:
          "Each prompt-response cycle refines your position in semantic space. Early prompts explore broadly (driver shots). Later prompts make precise adjustments (putts).",
        example:
          "Shot 1: 'Build a dashboard.' Shot 2: 'Add metrics cards.' Shot 3: 'Make cards responsive.' Shot 4: 'Adjust padding to 16px.'",
      },
      {
        icon: "🧭",
        title: "Confidence Variance = Terrain Undulation",
        description:
          "How 'bumpy' the semantic space is. Low variance (smooth green) means small prompt changes produce consistent results. High variance (rough) means unpredictable outputs.",
        example:
          "On the green: tweaking colors produces predictable results. In the rough: vague requests produce wildly different code each time.",
      },
      {
        icon: "🎯",
        title: "Convergence = Reaching the Green",
        description:
          "You've converged when further refinements produce minimal changes. The solution is stable, meeting requirements within acceptable tolerances.",
        example:
          "When your prompts go from 'add feature X' to 'adjust margin by 2px,' you're converging toward the final solution.",
      },
    ],
    metaphors: [
      {
        from: "Driver shot",
        to: "Exploratory broad prompt",
        explanation:
          "Use when starting fresh or exploring new territory. Accepts high variance for maximum coverage of possibility space.",
      },
      {
        from: "Iron shot",
        to: "Directional refinement prompt",
        explanation:
          "Use when you have general direction but need to narrow the path. Balances exploration with constraint.",
      },
      {
        from: "Wedge shot",
        to: "Precision approach prompt",
        explanation:
          "Use when close to solution. Highly constrained prompts that make specific adjustments.",
      },
      {
        from: "Putter",
        to: "Final polish prompt",
        explanation:
          "Use for micro-adjustments when solution is nearly complete. Minimal semantic distance traveled.",
      },
    ],
    applications: [
      {
        title: "Choose Prompt Strategy by Terrain",
        description:
          "In rough terrain (unclear requirements), use exploratory prompts. On the green (clear goal), use precise constraints.",
      },
      {
        title: "Track Convergence Metrics",
        description:
          "Monitor how much your code changes with each iteration. Decreasing changes signal convergence.",
      },
      {
        title: "Recognize When to Switch Clubs",
        description:
          "If detailed prompts in rough terrain produce chaos, switch to broader exploration. If exploration on the green wastes time, tighten constraints.",
      },
      {
        title: "Document Iteration Patterns",
        description:
          "Keep a 'scorecard' of your prompt sequence. Identify which strategies worked best for different task types.",
      },
      {
        title: "Estimate Par for Tasks",
        description:
          "Based on experience, predict how many prompt cycles a feature will require. Use this for sprint planning.",
      },
    ],
    technicalDetails: [
      {
        title: "Semantic Distance Metrics",
        description:
          "Measure progress using cosine similarity between successive code states. Large distances = rough terrain. Small distances = approaching convergence.",
        formula: "d(σ₁, σ₂) = 1 - cos(θ) where θ = angle between embedding vectors",
      },
      {
        title: "Confidence Variance Thresholds",
        description:
          "Define terrain types by variance: Rough (σ² > 0.6), Fairway (0.2 < σ² < 0.6), Green (σ² < 0.2).",
        formula: "Var[T(σ)] = E[(T(σ) - μ)²] over local neighborhood",
      },
    ],
    keyTakeaways: [
      "LLM coding is navigation through high-dimensional semantic space",
      "Different prompt strategies (clubs) work better in different terrains",
      "Convergence is measurable through iteration delta tracking",
      "The scorecard metaphor makes LLM iteration patterns visible and improvable",
      "Terrain awareness helps you choose appropriate prompt precision levels",
    ],
    nextSteps: [
      {
        action: "View Scorecard Dashboard",
        description: "See real project data visualized through the golf metaphor",
      },
      {
        action: "Explore IDE Extension",
        description: "Use integrated scorecard tracking during development",
      },
      {
        action: "Read Advanced Level",
        description: "Understand the mathematical foundations of semantic topology",
      },
    ],
  },

  // ADVANCED LEVEL
  {
    id: "advanced",
    name: "Advanced",
    subtitle: "Mathematical Foundations",
    contextLabel: "For researchers and architects",
    icon: "📊",
    overview:
      "Hyperdimensional Vector Space Golf formalizes LLM-assisted development as navigation on a semantic manifold embedded in ℝⁿ. The golf metaphor provides an intuitive ontology for reasoning about manifold topology, geodesic optimization, and convergence guarantees. This level explores the mathematical structures underlying the framework.",
    concepts: [
      {
        icon: "🌐",
        title: "Semantic Manifold M ⊂ ℝⁿ",
        description:
          "The space of semantically valid states forms a manifold—a locally Euclidean space embedded in high-dimensional vector space. Terrain types correspond to manifold curvature and local variance.",
        example:
          "Valid React components form a manifold in code-embedding space. Invalid syntax lies outside this manifold.",
      },
      {
        icon: "📏",
        title: "Metric Space (S, d)",
        description:
          "Semantic distance is defined by a metric function d: S × S → ℝ₊. Common choices: cosine distance, edit distance, or learned semantic similarity.",
        example:
          "d(code₁, code₂) might combine AST edit distance with embedding cosine similarity, weighted by semantic importance.",
      },
      {
        icon: "🛤️",
        title: "Trajectory Γ = (σ₀, σ₁, ..., σₖ)",
        description:
          "A development session is a path through semantic space. Trajectory length L[Γ] = Σᵢ d(σᵢ, σᵢ₊₁) measures total semantic distance traveled.",
        example:
          "An efficient trajectory approaches the geodesic (shortest path). Inefficient trajectories have high curvature or backtracking.",
      },
      {
        icon: "🎲",
        title: "Transformation Morphisms T: S → S",
        description:
          "Each prompt-response cycle is a morphism in the category of semantic states. Shot types (driver, iron, wedge, putter) are natural transformations with different variance properties.",
        example:
          "Driver transformation: high variance, broad exploration. Putter transformation: low variance, local refinement.",
      },
      {
        icon: "🎯",
        title: "ε-Convergence: d(σ, g) < ε",
        description:
          "A state σ has converged to goal g when within tolerance ε. The ε-ball G_ε = {σ ∈ S : d(σ, g) < ε} is the 'hole' on the green.",
        example:
          "For UI tasks, ε might be 0.05 in normalized embedding space, representing 'visually indistinguishable from target.'",
      },
    ],
    metaphors: [
      {
        from: "Rough terrain",
        to: "High-curvature manifold regions",
        explanation:
          "Regions where geodesics are difficult to compute. Local variance is high, meaning nearby states have unpredictable semantic relationships.",
      },
      {
        from: "Fairway",
        to: "Low-curvature geodesic corridor",
        explanation:
          "Well-behaved manifold regions where gradient descent reliably approaches the goal. Semantic interpolation is stable.",
      },
      {
        from: "Green",
        to: "ε-neighborhood of goal",
        explanation:
          "The target region where convergence criteria are satisfied. Further refinement has diminishing returns.",
      },
      {
        from: "Par",
        to: "Expected geodesic length",
        explanation:
          "The minimum number of transformations needed to traverse from starting state to goal, assuming optimal strategy selection.",
      },
    ],
    applications: [
      {
        title: "Geodesic Optimization",
        description:
          "Use manifold curvature estimates to predict optimal transformation sequences. Avoid high-curvature regions when possible.",
      },
      {
        title: "Variance-Based Strategy Selection",
        description:
          "Measure local variance Var[T(σ)] to choose transformation type. High variance → broad exploration. Low variance → precise refinement.",
      },
      {
        title: "Trajectory Analysis",
        description:
          "Post-session analysis of trajectory curvature, backtracking, and efficiency. Identify patterns for future optimization.",
      },
      {
        title: "Convergence Prediction",
        description:
          "Monitor rate of distance decrease: d(σₙ, g) / d(σₙ₋₁, g). Predict convergence timing based on historical gradients.",
      },
      {
        title: "Manifold Mapping",
        description:
          "Build empirical maps of semantic space topology. Identify reliable fairways, dangerous rough, and efficient approach angles.",
      },
    ],
    technicalDetails: [
      {
        title: "Manifold Curvature κ(σ)",
        description:
          "Local curvature indicates terrain difficulty. High curvature regions require more cautious navigation with smaller step sizes.",
        formula:
          "κ(σ) ≈ ‖∇²d(σ, g)‖ / ‖∇d(σ, g)‖ (discrete approximation via finite differences)",
      },
      {
        title: "Transformation Variance Profile",
        description:
          "Each shot type has characteristic variance: σ²_driver > σ²_iron > σ²_wedge > σ²_putter",
        formula: "Var[T_τ(σ)] = E[(T_τ(σ) - E[T_τ(σ)])²] for transformation type τ",
      },
      {
        title: "Geodesic Approximation",
        description:
          "Approximate geodesic distance using embedded Euclidean metric plus learned correction factor for manifold curvature.",
        formula: "d_geodesic(σ₁, σ₂) ≈ d_euclidean(σ₁, σ₂) · (1 + α·κ_avg)",
      },
      {
        title: "Convergence Rate λ",
        description:
          "Exponential convergence: d(σₙ, g) ≈ d(σ₀, g) · e^(-λn). Higher λ indicates more efficient approach to goal.",
        formula: "λ = -ln(d(σₙ, g) / d(σ₀, g)) / n",
      },
    ],
    keyTakeaways: [
      "Semantic space has manifold structure with measurable geometric properties",
      "Golf terrain types map directly to manifold curvature and variance metrics",
      "Trajectory optimization reduces to geodesic approximation on learned manifolds",
      "Shot type selection is variance-guided strategy optimization",
      "The framework provides formal foundations for reasoning about LLM iteration patterns",
    ],
    nextSteps: [
      {
        action: "Read Expert Level",
        description: "Explore category-theoretic formalization and compositional semantics",
      },
      {
        action: "View Aerial Visualizations",
        description: "See manifold structure and trajectories in 3D interactive space",
      },
      {
        action: "Analyze Real Trajectories",
        description: "Use the dashboard to measure curvature and convergence rates",
      },
    ],
  },

  // EXPERT LEVEL
  {
    id: "expert",
    name: "Expert",
    subtitle: "Category Theory & Formal Structure",
    contextLabel: "For theorists and framework designers",
    icon: "🔬",
    overview:
      "At the highest level of abstraction, Hyperdimensional Vector Space Golf is a categorical framework for compositional semantic navigation. We define a category 𝒮ℯ𝓂 of semantic states with typed morphisms, natural transformations for shot archetypes, and functors between the golf metaphor and formal semantics. This enables rigorous reasoning about compositionality, equivalence, and optimization.",
    concepts: [
      {
        icon: "📐",
        title: "Category 𝒮ℯ𝓂 of Semantic States",
        description:
          "Objects are semantic states σ ∈ S. Morphisms are transformations f: σ₁ → σ₂ induced by prompt-response cycles. Composition is sequential refinement. Identity is the no-op transformation.",
        example:
          "A development trajectory is a chain of morphisms σ₀ → σ₁ → ... → σₖ where composition preserves semantic coherence.",
      },
      {
        icon: "🎭",
        title: "Natural Transformations η_τ",
        description:
          "Shot types (driver, iron, wedge, putter) are natural transformations between variance functors. Each preserves semantic structure while modulating exploration-exploitation trade-offs.",
        example:
          "η_driver: Exploration → Exploration is a natural transformation mapping exploratory states to broader exploratory states.",
      },
      {
        icon: "🔗",
        title: "Functor F: Golf → 𝒮ℯ𝓂",
        description:
          "The golf ontology is formalized as a functor from the category of golf concepts to semantic states. Terrain types, shot selections, and par values map to formal semantic properties.",
        example:
          "F(rough) = high-variance regions. F(fairway) = geodesic corridors. F(par-n) = expected morphism chain length.",
      },
      {
        icon: "⚡",
        title: "Monoidal Structure on Trajectories",
        description:
          "Trajectories form a monoidal category where tensor product is parallel development and composition is sequential refinement. This enables compositional reasoning about multi-agent or multi-feature work.",
        example:
          "Two parallel features Γ₁ ⊗ Γ₂ can be reasoned about independently, then merged via coherent composition laws.",
      },
      {
        icon: "🌀",
        title: "Adjunction: Abstraction ⊣ Concretization",
        description:
          "Moving from concrete code to abstract intent and back forms an adjoint pair. The unit represents semantic lifting, the counit represents grounding.",
        example:
          "Abstraction extracts invariants from concrete implementations. Concretization generates specific code from abstract specifications.",
      },
    ],
    metaphors: [
      {
        from: "Golf course",
        to: "Indexed category of semantic subspaces",
        explanation:
          "Each hole is a category fiber over task specifications. The course is a fibration where terrain types are indexed by local curvature.",
      },
      {
        from: "Scorecard",
        to: "Trajectory functor to ℕ",
        explanation:
          "The scorecard is a functor F: 𝒮ℯ𝓂 → ℕ counting morphisms (shots) to convergence, preserving compositional structure.",
      },
      {
        from: "Club selection",
        to: "Natural transformation selection",
        explanation:
          "Choosing a club is selecting which natural transformation to apply, each with different variance and distance characteristics.",
      },
      {
        from: "Par optimization",
        to: "Geodesic minimization in ∞-category",
        explanation:
          "Finding par is computing minimal morphism chain length, which generalizes to geodesic optimization in higher categories.",
      },
    ],
    applications: [
      {
        title: "Compositional Verification",
        description:
          "Prove trajectory properties compositionally. If Γ₁ and Γ₂ both converge, their composition Γ₁ ; Γ₂ preserves convergence under certain coherence conditions.",
      },
      {
        title: "Equivalence Classes",
        description:
          "Define semantic equivalence via isomorphisms in 𝒮ℯ𝓂. Two states are equivalent if there exist inverse morphisms between them with identity composition.",
      },
      {
        title: "Universal Properties",
        description:
          "Characterize optimal trajectories via universal properties. The geodesic is the unique trajectory satisfying a universal mapping property.",
      },
      {
        title: "Functorial Semantics",
        description:
          "Define semantics of the golf metaphor as functors to various target categories: metric spaces, probabilistic spaces, temporal logics.",
      },
      {
        title: "Higher-Order Optimization",
        description:
          "Optimize over categories of strategies, not just individual trajectories. Meta-learning becomes functor optimization in functor categories.",
      },
      {
        title: "Compositional Multi-Agent Systems",
        description:
          "Model multiple developers or agents as parallel trajectories in monoidal categories. Coordination is ensured by coherence laws.",
      },
    ],
    technicalDetails: [
      {
        title: "Morphism Composition Law",
        description:
          "For morphisms f: σ₁ → σ₂ and g: σ₂ → σ₃, composition g ∘ f: σ₁ → σ₃ satisfies associativity and identity laws.",
        formula: "h ∘ (g ∘ f) = (h ∘ g) ∘ f and id_σ ∘ f = f = f ∘ id_σ₁",
      },
      {
        title: "Natural Transformation Naturality",
        description:
          "For shot type τ, the naturality square commutes: η_τ(g ∘ f) = η_τ(g) ∘ η_τ(f)",
        formula:
          "The diagram F(σ₁) →[F(f)] F(σ₂) →[η_σ₂] G(σ₂) equals F(σ₁) →[η_σ₁] G(σ₁) →[G(f)] G(σ₂)",
      },
      {
        title: "Functor Preservation",
        description:
          "The golf ontology functor F: Golf → 𝒮ℯ𝓂 preserves composition and identities.",
        formula:
          "F(g ∘ f) = F(g) ∘ F(f) and F(id_X) = id_{F(X)} for all golf concepts X",
      },
      {
        title: "Adjunction Unit-Counit",
        description:
          "Abstraction L and concretization R form adjunction L ⊣ R with unit η: Id → R∘L and counit ε: L∘R → Id satisfying triangle identities.",
        formula: "ε_L ∘ L(η) = id_L and R(ε) ∘ η_R = id_R",
      },
      {
        title: "Monoidal Coherence",
        description:
          "Parallel trajectories satisfy pentagon and triangle coherence diagrams for associativity and unit isomorphisms.",
        formula:
          "α: (Γ₁ ⊗ Γ₂) ⊗ Γ₃ ≅ Γ₁ ⊗ (Γ₂ ⊗ Γ₃) and λ: I ⊗ Γ ≅ Γ ≅ Γ ⊗ I :ρ",
      },
    ],
    keyTakeaways: [
      "The golf metaphor is not mere analogy—it's a functorial mapping to formal semantic structures",
      "Category theory provides the language for compositional reasoning about LLM iteration",
      "Natural transformations formalize shot type selection with provable properties",
      "Adjunctions capture the abstraction-concretization cycle inherent in development",
      "Monoidal structure enables rigorous multi-agent and parallel development reasoning",
      "The framework is fully compositional: properties of parts compose to properties of wholes",
    ],
    nextSteps: [
      {
        action: "Implement Custom Functors",
        description:
          "Extend the framework with domain-specific functors for your application area",
      },
      {
        action: "Formalize New Shot Types",
        description: "Define additional natural transformations for specialized strategies",
      },
      {
        action: "Research Applications",
        description:
          "Apply categorical methods to prove convergence, optimality, and compositionality theorems",
      },
    ],
  },
];
