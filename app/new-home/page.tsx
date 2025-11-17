import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hyperdimensional Vector Space Golf - Ontological Framework for AI Development",
  description:
    "An ontological framework connecting golf practices, mathematical structures, and LLM development. Discover how meditative golf strategies transfer to AI-assisted coding through semantic navigation and convergence.",
  keywords: [
    "golf metaphor",
    "LLM development",
    "mathematical ontology",
    "semantic navigation",
    "vector space",
    "category theory",
    "AI development",
    "prompt engineering",
    "meditative practice",
    "convergence",
  ],
  authors: [{ name: "Patrick Astarita" }],
};

/**
 * New Home Page
 *
 * Route: /new-home
 *
 * Purpose: Primary entry point that communicates the ontological framework
 * connecting Golf ↔ Mathematics ↔ LLM Development. This page proposes a
 * meditative strategy for how golf practices transfer to AI-Development and
 * provides didactic means for understanding the framework through audience-specific
 * paths and resources.
 *
 * Key Message: This has nothing and everything to do with actual golf.
 */
export default function NewHomePage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1f2a10]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#eae3d3] min-h-[600px] lg:min-h-[700px]">
        {/* Background Image - Composed.png */}
        <div className="absolute inset-0">
          <Image
            src="/composed.png"
            alt="Golfer in mid-swing aiming towards a cosmic vortex, representing navigation through semantic space"
            fill
            className="object-cover object-top-left"
            priority
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#eae3d3]/95 via-[#eae3d3]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#eae3d3]/60" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.3em] text-[#6b7a4a] scorecard-font-mono mb-4">
              Hyperdimensional Vector Space Golf
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold scorecard-title text-[#2d3b16] leading-tight mb-6 drop-shadow-lg">
              An Ontological Framework for
              <br />
              <span className="text-[#556b2f]">AI Development</span>
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-[#4b5b28] scorecard-font-serif mb-8 drop-shadow-md">
              Where golf practices, mathematical structures, and LLM development converge
              through semantic navigation and meditative strategy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/base-comms"
                className="inline-flex items-center gap-2 rounded-full bg-[#556b2f] px-6 py-3 text-white text-base font-medium hover:bg-[#3d4a21] transition-colors shadow-lg backdrop-blur-sm bg-opacity-90"
              >
                <span>📡</span>
                <span>Start Your Journey</span>
              </Link>
              <Link
                href="/llm-instructions"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#556b2f] px-6 py-3 text-base font-medium text-[#2d3b16] hover:bg-[#556b2f] hover:text-white transition-colors backdrop-blur-sm bg-white/80"
              >
                <span>📋</span>
                <span>LLM Instructions</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-16 lg:py-24 space-y-24">
        {/* The Paradox */}
        <section className="bg-white border-2 border-[#556b2f] rounded-3xl p-10 lg:p-12 shadow-xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2d3b16] mb-6 scorecard-title">
              The Paradox
            </h2>
            <p className="text-xl lg:text-2xl leading-relaxed text-[#4b5b28] scorecard-font-serif mb-8 italic">
              This framework has{" "}
              <strong className="text-[#2d3b16] not-italic">nothing</strong> and{" "}
              <strong className="text-[#2d3b16] not-italic">everything</strong> to do with actual
              golf.
            </p>
            <div className="grid gap-6 md:grid-cols-2 mt-10 text-left">
              <div className="bg-[#faf8f3] border border-[#c5bfa8] rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[#2d3b16] mb-3 scorecard-font-serif">
                  Nothing
                </h3>
                <p className="text-sm text-[#4b5b28] leading-relaxed">
                  You don't need to know golf. You don't need to play golf. The framework doesn't
                  require understanding of course layouts, club selection, or scoring rules. The
                  golf terminology is a scaffold—a familiar structure to hang complex ideas upon.
                </p>
              </div>
              <div className="bg-[#faf8f3] border border-[#c5bfa8] rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[#2d3b16] mb-3 scorecard-font-serif">
                  Everything
                </h3>
                <p className="text-sm text-[#4b5b28] leading-relaxed">
                  Golf embodies practices that transfer directly to AI development: reading terrain,
                  choosing strategy by context, managing variance, converging through iteration,
                  maintaining patience and precision. The meditative aspects of golf—its ritual,
                  its pacing, its acceptance of imperfection—map perfectly to working with LLMs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Three-Domain Ontology */}
        <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <div className="text-center mb-12 px-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2d3b16] mb-4 scorecard-title">
              The Three-Domain Ontology
            </h2>
            <p className="text-lg text-[#4b5b28] scorecard-font-serif max-w-3xl mx-auto">
              Three domains—Golf, Mathematics, and LLM Development—intertwine to form a coherent
              framework for understanding and navigating semantic space.
            </p>
          </div>

          {/* Background Image Container - Edge to Edge, Taller */}
          <div className="relative overflow-hidden shadow-2xl" style={{ minHeight: "900px" }}>
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/wide_cones_of_distance_metric_convergence.png"
                alt="Three converging cones representing Golf, Mathematics, and LLM Development domains"
                fill
                className="object-cover"
                priority
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content Overlay - Compacted by additional 35% (now ~23% of original) */}
            <div className="relative z-10 p-3 lg:p-4" style={{ minHeight: "900px" }}>
              <div className="grid gap-3 lg:grid-cols-3 max-w-4xl mx-auto pt-80 lg:pt-80">
                {/* Golf Domain */}
                <div className="bg-white/60 backdrop-blur-md border-2 border-white/40 rounded-lg p-2 shadow-xl hover:bg-white/75 transition-all">
                  <div className="text-center mb-2">
                    <span className="text-2xl mb-1 block">⛳</span>
                    <h3 className="text-base font-semibold text-[#2d3b16] scorecard-font-serif">
                      Golf
                    </h3>
                    <p className="text-[9px] uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono mt-0.5">
                      Intuitive Metaphor
                    </p>
                  </div>
                  <p className="text-[11px] text-[#4b5b28] mb-2 leading-tight">
                    Provides spatial narrative, pacing, and meditative practices. Golf offers an
                    accessible vocabulary for complex concepts: terrain types, shot selection, course
                    management, convergence toward goals.
                  </p>
                  <div className="bg-white/60 backdrop-blur-sm border border-[#c5bfa8]/40 rounded p-1.5">
                    <p className="text-[9px] uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono mb-0.5">
                      Core Units
                    </p>
                    <ul className="text-[9px] text-[#4b5b28] space-y-0 leading-tight">
                      <li>• Course · Hole · Shot</li>
                      <li>• Club · Terrain Zone</li>
                      <li>• Par · Scorecard</li>
                    </ul>
                  </div>
                </div>

                {/* Mathematics Domain - Translated Up */}
                <div className="bg-white/60 backdrop-blur-md border-2 border-white/40 rounded-lg p-2 shadow-xl hover:bg-white/75 transition-all -translate-y-4">
                  <div className="text-center mb-2">
                    <span className="text-2xl mb-1 block">📐</span>
                    <h3 className="text-base font-semibold text-[#2d3b16] scorecard-font-serif">
                      Mathematics
                    </h3>
                    <p className="text-[9px] uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono mt-0.5">
                      Formal Structure
                    </p>
                  </div>
                  <p className="text-[11px] text-[#4b5b28] mb-2 leading-tight">
                    Captures formal structure and transformation logic. Manifolds, metrics, gradients,
                    and category theory provide the mathematical substrate that makes the framework
                    rigorous and composable.
                  </p>
                  <div className="bg-white/60 backdrop-blur-sm border border-[#c5bfa8]/40 rounded p-1.5">
                    <p className="text-[9px] uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono mb-0.5">
                      Core Units
                    </p>
                    <ul className="text-[9px] text-[#4b5b28] space-y-0 leading-tight">
                      <li>• Manifold · Epsilon Ball</li>
                      <li>• Gradient Flow · Metric</li>
                      <li>• Category Morphism</li>
                    </ul>
                  </div>
                </div>

                {/* LLM Development Domain */}
                <div className="bg-white/60 backdrop-blur-md border-2 border-white/40 rounded-lg p-2 shadow-xl hover:bg-white/75 transition-all">
                  <div className="text-center mb-2">
                    <span className="text-2xl mb-1 block">💻</span>
                    <h3 className="text-base font-semibold text-[#2d3b16] scorecard-font-serif">
                      LLM Development
                    </h3>
                    <p className="text-[9px] uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono mt-0.5">
                      Implementation Practice
                    </p>
                  </div>
                  <p className="text-[11px] text-[#4b5b28] mb-2 leading-tight">
                    Grounds implementation tactics and agent behavior. Prompt patterns, constraint
                    profiles, iteration cadence, and review rituals operationalize the framework in
                    real development workflows.
                  </p>
                  <div className="bg-white/60 backdrop-blur-sm border border-[#c5bfa8]/40 rounded p-1.5">
                    <p className="text-[9px] uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono mb-0.5">
                      Core Units
                    </p>
                    <ul className="text-[9px] text-[#4b5b28] space-y-0 leading-tight">
                      <li>• Prompt Pattern</li>
                      <li>• Constraint Profile</li>
                      <li>• Iteration Cadence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Visualization */}
          <div className="mt-12 bg-[#faf8f3] border-2 border-[#c5bfa8] rounded-2xl p-8 max-w-6xl mx-auto px-6">
            <h3 className="text-xl font-semibold text-[#2d3b16] mb-6 text-center scorecard-font-serif">
              How They Connect
            </h3>
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="bg-white border border-[#d4ccb4] rounded-lg p-5">
                <h4 className="font-semibold text-[#2d3b16] mb-3">Intensity Translation</h4>
                <p className="text-sm text-[#4b5b28] leading-relaxed">
                  Golf club length maps to LLM constraint profile strictness, with convergent
                  checks against epsilon-ball radii. A driver (long club) = broad exploration. A
                  putter (short club) = precise refinement.
                </p>
              </div>
              <div className="bg-white border border-[#d4ccb4] rounded-lg p-5">
                <h4 className="font-semibold text-[#2d3b16] mb-3">Precision Binding</h4>
                <p className="text-sm text-[#4b5b28] leading-relaxed">
                  Terrain micro-topography ties to mathematical gradient flow stability, signaling
                  when LLM prompts must clamp variance. Rough terrain = high curvature = need for
                  cautious navigation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meditative Strategy */}
        <section className="bg-gradient-to-br from-[#faf8f3] via-white to-[#f1eddf] border-2 border-[#c5bfa8] rounded-3xl p-10 lg:p-12 shadow-xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2d3b16] mb-6 scorecard-title text-center">
              Meditative Strategy: How Golf Practices Transfer to AI Development
            </h2>
            <p className="text-lg text-[#4b5b28] scorecard-font-serif mb-10 text-center leading-relaxed">
              Golf is not just a sport—it's a meditative practice. These practices transfer directly
              to working with AI assistants, providing structure, patience, and wisdom for
              navigating semantic space.
            </p>

            <div className="space-y-8">
              {/* Practice 1 */}
              <div className="bg-white border border-[#c5bfa8] rounded-2xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">🧘</span>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2d3b16] mb-3 scorecard-font-serif">
                      Reading Terrain
                    </h3>
                    <p className="text-sm text-[#4b5b28] mb-4 leading-relaxed">
                      <strong className="text-[#2d3b16]">In Golf:</strong> Before each shot, a
                      golfer reads the terrain—wind, slope, hazards, green conditions. This
                      assessment determines strategy.
                    </p>
                    <p className="text-sm text-[#4b5b28] leading-relaxed">
                      <strong className="text-[#2d3b16]">In AI Development:</strong> Before each
                      prompt, assess the semantic terrain. Is the goal clear (green)? Are
                      requirements vague (rough)? Is the solution space well-mapped (fairway)?
                      This assessment determines prompt strategy—exploratory (driver) or precise
                      (putter).
                    </p>
                  </div>
                </div>
              </div>

              {/* Practice 2 */}
              <div className="bg-white border border-[#c5bfa8] rounded-2xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">🎯</span>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2d3b16] mb-3 scorecard-font-serif">
                      Club Selection by Context
                    </h3>
                    <p className="text-sm text-[#4b5b28] mb-4 leading-relaxed">
                      <strong className="text-[#2d3b16]">In Golf:</strong> You don't use a driver
                      on the green. You don't use a putter from the tee. Each club serves a
                      purpose based on distance, terrain, and precision needs.
                    </p>
                    <p className="text-sm text-[#4b5b28] leading-relaxed">
                      <strong className="text-[#2d3b16]">In AI Development:</strong> Match prompt
                      precision to semantic distance. Broad exploratory prompts (drivers) for
                      early exploration. Narrow, constrained prompts (putters) when close to
                      solution. The wrong "club" wastes iterations and creates frustration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Practice 3 */}
              <div className="bg-white border border-[#c5bfa8] rounded-2xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">⏳</span>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2d3b16] mb-3 scorecard-font-serif">
                      Patience and Acceptance
                    </h3>
                    <p className="text-sm text-[#4b5b28] mb-4 leading-relaxed">
                      <strong className="text-[#2d3b16]">In Golf:</strong> Golf teaches patience.
                      Not every shot is perfect. You accept bad shots, learn from them, and move
                      forward. The game rewards persistence over perfectionism.
                    </p>
                    <p className="text-sm text-[#4b5b28] leading-relaxed">
                      <strong className="text-[#2d3b16]">In AI Development:</strong> LLM outputs
                      aren't always perfect. Accept imperfect responses, refine through iteration,
                      and maintain patience. The framework rewards persistence and iterative
                      refinement over expecting perfect first attempts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Practice 4 */}
              <div className="bg-white border border-[#c5bfa8] rounded-2xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">📊</span>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2d3b16] mb-3 scorecard-font-serif">
                      Course Management
                    </h3>
                    <p className="text-sm text-[#4b5b28] mb-4 leading-relaxed">
                      <strong className="text-[#2d3b16]">In Golf:</strong> Smart golfers manage the
                      course strategically. They don't always go for the pin. Sometimes they play
                      safe, position for the next shot, and think multiple shots ahead.
                    </p>
                    <p className="text-sm text-[#4b5b28] leading-relaxed">
                      <strong className="text-[#2d3b16]">In AI Development:</strong> Manage the
                      development trajectory strategically. Don't always optimize for immediate
                      perfection. Sometimes accept "good enough" to maintain momentum, position
                      for the next iteration, and think about the overall trajectory toward the
                      goal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Practice 5 */}
              <div className="bg-white border border-[#c5bfa8] rounded-2xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">🔄</span>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2d3b16] mb-3 scorecard-font-serif">
                      Convergence Through Iteration
                    </h3>
                    <p className="text-sm text-[#4b5b28] mb-4 leading-relaxed">
                      <strong className="text-[#2d3b16]">In Golf:</strong> You don't reach the
                      hole in one shot. You converge through a sequence: drive, approach, chip,
                      putt. Each shot narrows the distance and increases precision.
                    </p>
                    <p className="text-sm text-[#4b5b28] leading-relaxed">
                      <strong className="text-[#2d3b16]">In AI Development:</strong> You don't
                      solve complex problems in one prompt. You converge through a sequence:
                      exploratory prompt (drive), directional refinement (approach), specific
                      implementation (chip), final polish (putt). Each iteration narrows semantic
                      distance and increases precision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Audience-Specific Paths */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2d3b16] mb-4 scorecard-title">
              Find Your Path
            </h2>
            <p className="text-lg text-[#4b5b28] scorecard-font-serif max-w-3xl mx-auto">
              The framework adapts to your level. Start where you're comfortable, and progress as
              understanding deepens.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/base-comms"
              className="group bg-white border-2 border-[#8b956d] rounded-2xl p-6 hover:border-[#556b2f] transition-all hover:shadow-xl"
            >
              <div className="text-center mb-4">
                <span className="text-4xl block mb-2">🌱</span>
                <h3 className="text-lg font-semibold text-[#2d3b16] scorecard-font-serif">
                  Beginner
                </h3>
                <p className="text-xs text-[#6b7a4a] scorecard-font-mono mt-1">
                  Visual Metaphor
                </p>
              </div>
              <p className="text-sm text-[#4b5b28] leading-relaxed mb-4">
                Start with intuitive golf metaphors. Learn through familiar analogies without
                mathematical complexity.
              </p>
              <span className="text-xs font-medium text-[#556b2f] group-hover:text-[#3d4a21]">
                Start here →
              </span>
            </Link>

            <Link
              href="/base-comms"
              className="group bg-white border-2 border-[#8b956d] rounded-2xl p-6 hover:border-[#556b2f] transition-all hover:shadow-xl"
            >
              <div className="text-center mb-4">
                <span className="text-4xl block mb-2">💻</span>
                <h3 className="text-lg font-semibold text-[#2d3b16] scorecard-font-serif">
                  Intermediate
                </h3>
                <p className="text-xs text-[#6b7a4a] scorecard-font-mono mt-1">
                  Developer-Focused
                </p>
              </div>
              <p className="text-sm text-[#4b5b28] leading-relaxed mb-4">
                See how this applies to LLM-assisted coding. Understand semantic space navigation
                and prompt strategy.
              </p>
              <span className="text-xs font-medium text-[#556b2f] group-hover:text-[#3d4a21]">
                Learn more →
              </span>
            </Link>

            <Link
              href="/base-comms"
              className="group bg-white border-2 border-[#8b956d] rounded-2xl p-6 hover:border-[#556b2f] transition-all hover:shadow-xl"
            >
              <div className="text-center mb-4">
                <span className="text-4xl block mb-2">📊</span>
                <h3 className="text-lg font-semibold text-[#2d3b16] scorecard-font-serif">
                  Advanced
                </h3>
                <p className="text-xs text-[#6b7a4a] scorecard-font-mono mt-1">
                  Mathematical Foundations
                </p>
              </div>
              <p className="text-sm text-[#4b5b28] leading-relaxed mb-4">
                Explore manifolds, metrics, geodesics, and convergence. Understand the formal
                mathematical structure.
              </p>
              <span className="text-xs font-medium text-[#556b2f] group-hover:text-[#3d4a21]">
                Dive deeper →
              </span>
            </Link>

            <Link
              href="/base-comms"
              className="group bg-white border-2 border-[#8b956d] rounded-2xl p-6 hover:border-[#556b2f] transition-all hover:shadow-xl"
            >
              <div className="text-center mb-4">
                <span className="text-4xl block mb-2">🔬</span>
                <h3 className="text-lg font-semibold text-[#2d3b16] scorecard-font-serif">
                  Expert
                </h3>
                <p className="text-xs text-[#6b7a4a] scorecard-font-mono mt-1">
                  Category Theory
                </p>
              </div>
              <p className="text-sm text-[#4b5b28] leading-relaxed mb-4">
                Explore categorical formalization, functors, natural transformations, and
                compositional semantics.
              </p>
              <span className="text-xs font-medium text-[#556b2f] group-hover:text-[#3d4a21]">
                Explore →
              </span>
            </Link>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/base-comms"
              className="inline-flex items-center gap-2 rounded-full bg-[#556b2f] px-6 py-3 text-white font-medium hover:bg-[#3d4a21] transition-colors shadow-lg"
            >
              <span>📡</span>
              <span>Explore Base Communications</span>
            </Link>
          </div>
        </section>

        {/* Key Resources */}
        <section>
          <h2 className="text-3xl font-bold text-[#2d3b16] mb-8 scorecard-title text-center">
            Key Resources
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/base-comms"
              className="group bg-white border-2 border-[#c5bfa8] rounded-2xl p-6 hover:border-[#556b2f] transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="text-3xl">📡</span>
                <span className="text-xs text-[#8b956d] scorecard-font-mono">resource</span>
              </div>
              <h3 className="text-lg font-semibold text-[#2d3b16] mb-2 scorecard-font-serif">
                Base Communications
              </h3>
              <p className="text-sm text-[#4b5b28] leading-relaxed">
                Multi-audience presentation system. Choose your level (Beginner to Expert) and learn
                the framework through audience-specific explanations.
              </p>
            </Link>

            <Link
              href="/llm-instructions"
              className="group bg-white border-2 border-[#c5bfa8] rounded-2xl p-6 hover:border-[#556b2f] transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="text-3xl">📋</span>
                <span className="text-xs text-[#8b956d] scorecard-font-mono">resource</span>
              </div>
              <h3 className="text-lg font-semibold text-[#2d3b16] mb-2 scorecard-font-serif">
                LLM Instructions
              </h3>
              <p className="text-sm text-[#4b5b28] leading-relaxed">
                Comprehensive guide for LLMs and humans on using the framework to structure
                implementation plans. Learn about 18-hole cycles and shot types.
              </p>
            </Link>

            <Link
              href="/scorecard-dashboard"
              className="group bg-white border-2 border-[#c5bfa8] rounded-2xl p-6 hover:border-[#556b2f] transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="text-3xl">📊</span>
                <span className="text-xs text-[#8b956d] scorecard-font-mono">resource</span>
              </div>
              <h3 className="text-lg font-semibold text-[#2d3b16] mb-2 scorecard-font-serif">
                Scorecard Dashboard
              </h3>
              <p className="text-sm text-[#4b5b28] leading-relaxed">
                Tour the hyperdimensional scorecard with insights, trajectories, and manifold
                visualizations derived from live project data.
              </p>
            </Link>

            <Link
              href="/golf-philosophy-slides"
              className="group bg-white border-2 border-[#c5bfa8] rounded-2xl p-6 hover:border-[#556b2f] transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="text-3xl">⛳</span>
                <span className="text-xs text-[#8b956d] scorecard-font-mono">resource</span>
              </div>
              <h3 className="text-lg font-semibold text-[#2d3b16] mb-2 scorecard-font-serif">
                Golf Philosophy Slides
              </h3>
              <p className="text-sm text-[#4b5b28] leading-relaxed">
                Explore the 10 shot archetypes with detailed visualizations, prompt examples, and
                heuristic definitions.
              </p>
            </Link>

            <Link
              href="/diagrams"
              className="group bg-white border-2 border-[#c5bfa8] rounded-2xl p-6 hover:border-[#556b2f] transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="text-3xl">📐</span>
                <span className="text-xs text-[#8b956d] scorecard-font-mono">resource</span>
              </div>
              <h3 className="text-lg font-semibold text-[#2d3b16] mb-2 scorecard-font-serif">
                Diagrams
              </h3>
              <p className="text-sm text-[#4b5b28] leading-relaxed">
                Navigate ontology-first diagrams, including semantic manifolds and the four
                archetype terrains.
              </p>
            </Link>

            <Link
              href="/prototypes"
              className="group bg-white border-2 border-[#c5bfa8] rounded-2xl p-6 hover:border-[#556b2f] transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="text-3xl">🧪</span>
                <span className="text-xs text-[#8b956d] scorecard-font-mono">resource</span>
              </div>
              <h3 className="text-lg font-semibold text-[#2d3b16] mb-2 scorecard-font-serif">
                Prototypes
              </h3>
              <p className="text-sm text-[#4b5b28] leading-relaxed">
                Inspect interactive experiments and motif explorations inside the prototypes
                workspace.
              </p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d4ccb4] bg-[#eae3d3] mt-24">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#6b7a4a] scorecard-font-mono mb-4">
              Hyperdimensional Vector Space Golf
            </p>
            <p className="text-base text-[#2d3b16] scorecard-font-serif mb-6">
              An ontological framework connecting golf practices, mathematical structures, and LLM
              development through semantic navigation and meditative strategy.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[#4b5b28]">
              <Link href="/base-comms" className="hover:text-[#2d3b16]">
                Base Communications
              </Link>
              <Link href="/llm-instructions" className="hover:text-[#2d3b16]">
                LLM Instructions
              </Link>
              <Link href="/scorecard-dashboard" className="hover:text-[#2d3b16]">
                Dashboard
              </Link>
              <Link href="/prototypes" className="hover:text-[#2d3b16]">
                Prototypes
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
