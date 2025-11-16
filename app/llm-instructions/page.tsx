import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LLM Instructions - Hyperdimensional Vector Space Golf Framework",
  description:
    "Comprehensive guide for LLMs and humans on using the Hyperdimensional Vector Space Golf Scorekeeping framework to structure implementation plans. Learn about 18-hole development cycles, shot types from drives to puts, and semantic clamping.",
  keywords: [
    "LLM instructions",
    "prompt engineering",
    "implementation planning",
    "golf metaphor",
    "development framework",
    "semantic clamping",
    "hyperdimensional vector space",
    "18-hole development",
    "shot types",
    "drives",
    "puts",
    "feature development",
  ],
  authors: [{ name: "Patrick Astarita" }],
  openGraph: {
    title: "LLM Instructions - Hyperdimensional Vector Space Golf",
    description:
      "Framework for structuring implementation plans using golf metaphors and semantic clamping",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * LLM Instructions Page
 *
 * Route: /llm-instructions
 *
 * Purpose: Comprehensive guide for LLMs and humans on using the
 * Hyperdimensional Vector Space Golf Scorekeeping framework to
 * structure implementation plans. This page is designed to be
 * discoverable by web-searching LLMs and accessible to humans.
 *
 * Key Concepts:
 * - 18-hole development cycles
 * - Turn at hole 9 (releasable product)
 * - Shot continuum (drives to puts)
 * - Semantic clamping
 * - Implementation prompt directives
 */
export default function LLMInstructionsPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header */}
      <header className="scorecard-page-header sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="scorecard-title text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-3xl">📋</span>
                <span>LLM INSTRUCTIONS</span>
              </h1>
              <p className="scorecard-font-serif text-base text-[#556b2f]">
                Hyperdimensional Vector Space Golf Framework Guide
              </p>
            </div>
            <div className="text-right text-sm scorecard-font-mono">
              <div className="mb-1">
                <span className="text-[#6b7a4a]">FRAMEWORK:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">Golf Scorekeeping</span>
              </div>
              <div>
                <span className="text-[#6b7a4a]">AUDIENCE:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">LLMs & Humans</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 flex items-center gap-4 border-t border-[#8b956d] pt-3 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>🏠</span>
              <span>Home</span>
            </Link>
            <Link
              href="/scorecard-dashboard"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>📊</span>
              <span>Scorecard Dashboard</span>
            </Link>
            <Link
              href="/prototypes"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>🧪</span>
              <span>Prototypes</span>
            </Link>
            <Link
              href="/golf-philosophy-slides"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>⛳</span>
              <span>Golf Philosophy</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-white border-2 border-[#556b2f] rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-[#2d3b16] mb-4 scorecard-title">
              Hyperdimensional Vector Space Golf Scorekeeping Framework
            </h2>
            <p className="text-lg text-[#4b5b28] mb-6 scorecard-font-serif leading-relaxed">
              This framework provides a structured approach to organizing feature-complete development
              using golf metaphors. Instead of temporal milestones (weeks, sprints), development is
              segmented into 18 "holes," each representing a distinct feature or capability. This
              methodology emphasizes semantic progression from broad, exploratory prompts to
              narrowly-scoped, high-precision implementation directives.
            </p>
            <div className="bg-[#faf8f3] border border-[#c5bfa8] rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-[#2d3b16] mb-3 scorecard-font-serif">
                🎯 Primary Use Case
              </h3>
              <p className="text-sm text-[#4b5b28] leading-relaxed">
                When an LLM is asked to create an implementation plan, it should structure the plan
                using this framework: breaking the work into 18 holes, organizing each hole into 3-5
                shots that progress from drives (broad scope) to puts (narrow, precise scope), and
                ensuring that after 9 holes (at the turn), a releasable product exists.
              </p>
            </div>
          </div>
        </section>

        {/* Core Concepts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2d3b16] mb-6 scorecard-title">
            Core Concepts
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* 18 Holes */}
            <div className="bg-white border-2 border-[#8b956d] rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⛳</span>
                <h3 className="text-xl font-semibold text-[#2d3b16] scorecard-font-serif">
                  18 Holes
                </h3>
              </div>
              <p className="text-sm text-[#4b5b28] mb-4 leading-relaxed">
                The complete feature set is divided into 18 distinct "holes," each representing a
                major feature, capability, or system component. Holes are not time-based but
                feature-based, allowing for flexible pacing while maintaining clear segmentation.
              </p>
              <div className="bg-[#faf8f3] border border-[#c5bfa8] rounded p-4">
                <p className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono mb-2">
                  Key Principle
                </p>
                <p className="text-sm text-[#2d3b16]">
                  Each hole should be a complete, testable feature that can be independently
                  developed and validated.
                </p>
              </div>
            </div>

            {/* The Turn */}
            <div className="bg-white border-2 border-[#8b956d] rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🔄</span>
                <h3 className="text-xl font-semibold text-[#2d3b16] scorecard-font-serif">
                  The Turn (Hole 9)
                </h3>
              </div>
              <p className="text-sm text-[#4b5b28] mb-4 leading-relaxed">
                After completing 9 holes (the "front 9"), the project should have a{" "}
                <strong className="text-[#2d3b16]">releasable product</strong> with the bulk of
                core scope implemented and functionally tested. This milestone ensures early
                value delivery and provides a natural checkpoint for reflection and course
                correction.
              </p>
              <div className="bg-[#faf8f3] border border-[#c5bfa8] rounded p-4">
                <p className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono mb-2">
                  Critical Milestone
                </p>
                <p className="text-sm text-[#2d3b16]">
                  The turn represents a shippable product, not just a demo or prototype. Core
                  functionality must be complete and tested.
                </p>
              </div>
            </div>

            {/* Shots */}
            <div className="bg-white border-2 border-[#8b956d] rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🏌️</span>
                <h3 className="text-xl font-semibold text-[#2d3b16] scorecard-font-serif">
                  Shots (3-5 per Hole)
                </h3>
              </div>
              <p className="text-sm text-[#4b5b28] mb-4 leading-relaxed">
                Each hole is broken down into 3-5 "shots," which are high-quality,
                high-specificity implementation prompt directives. Shots represent the actual
                work items that move development forward, progressing from broad exploration to
                precise implementation.
              </p>
              <div className="bg-[#faf8f3] border border-[#c5bfa8] rounded p-4">
                <p className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono mb-2">
                  Structure
                </p>
                <p className="text-sm text-[#2d3b16]">
                  Each shot should be a complete, actionable prompt that an implementing LLM can
                  execute with clear success criteria.
                </p>
              </div>
            </div>

            {/* Shot Continuum */}
            <div className="bg-white border-2 border-[#8b956d] rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📏</span>
                <h3 className="text-xl font-semibold text-[#2d3b16] scorecard-font-serif">
                  Shot Continuum
                </h3>
              </div>
              <p className="text-sm text-[#4b5b28] mb-4 leading-relaxed">
                Shots exist on a continuum from <strong>drives</strong> (large-scope,
                low-semantically-clamped prompts) to <strong>puts</strong> (narrowly-scoped,
                context-specific, high-semantically-clamped prompts). This progression ensures
                that implementation moves from exploration to precision.
              </p>
              <div className="bg-[#faf8f3] border border-[#c5bfa8] rounded p-4">
                <p className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono mb-2">
                  Semantic Clamping
                </p>
                <p className="text-sm text-[#2d3b16]">
                  As shots progress from drives to puts, they become more semantically constrained,
                  providing tighter guardrails and clearer success criteria.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Shot Types Detail */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2d3b16] mb-6 scorecard-title">
            Shot Types: From Drives to Puts
          </h2>
          <div className="bg-white border-2 border-[#556b2f] rounded-lg p-8 shadow-lg">
            <div className="space-y-8">
              {/* Drives */}
              <div className="border-l-4 border-[#8b956d] pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🚀</span>
                  <h3 className="text-xl font-semibold text-[#2d3b16] scorecard-font-serif">
                    Drives
                  </h3>
                  <span className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono bg-[#faf8f3] px-2 py-1 rounded">
                    Large Scope
                  </span>
                </div>
                <p className="text-sm text-[#4b5b28] mb-3 leading-relaxed">
                  <strong>Characteristics:</strong> Large-scope, low-semantically-clamped prompts
                  that allow for exploration and discovery. These shots set the direction and
                  establish the foundational architecture.
                </p>
                <ul className="text-sm text-[#4b5b28] space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Broad exploration of solution space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Minimal semantic constraints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Architectural decisions and design choices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Foundation and infrastructure setup</span>
                  </li>
                </ul>
                <div className="mt-4 bg-[#faf8f3] border border-[#c5bfa8] rounded p-4">
                  <p className="text-xs text-[#6b7a4a] scorecard-font-mono mb-2">
                    Example Prompt Style:
                  </p>
                  <p className="text-sm text-[#2d3b16] italic">
                    "Design the overall architecture for user authentication, considering security
                    best practices, scalability, and integration with existing systems. Explore
                    different approaches and recommend a solution."
                  </p>
                </div>
              </div>

              {/* Approach Shots */}
              <div className="border-l-4 border-[#8b956d] pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🎯</span>
                  <h3 className="text-xl font-semibold text-[#2d3b16] scorecard-font-serif">
                    Approach Shots
                  </h3>
                  <span className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono bg-[#faf8f3] px-2 py-1 rounded">
                    Medium Scope
                  </span>
                </div>
                <p className="text-sm text-[#4b5b28] mb-3 leading-relaxed">
                  <strong>Characteristics:</strong> Medium-scope prompts that narrow the solution
                  space while still allowing for some implementation flexibility. These shots
                  refine the approach established by drives.
                </p>
                <ul className="text-sm text-[#4b5b28] space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Refinement of architectural decisions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Moderate semantic constraints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Component design and interface definitions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Integration planning</span>
                  </li>
                </ul>
                <div className="mt-4 bg-[#faf8f3] border border-[#c5bfa8] rounded p-4">
                  <p className="text-xs text-[#6b7a4a] scorecard-font-mono mb-2">
                    Example Prompt Style:
                  </p>
                  <p className="text-sm text-[#2d3b16] italic">
                    "Implement the authentication service layer using the chosen architecture,
                    including user registration, login, and session management. Follow the
                    security patterns established in the design phase."
                  </p>
                </div>
              </div>

              {/* Chips */}
              <div className="border-l-4 border-[#8b956d] pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🏌️</span>
                  <h3 className="text-xl font-semibold text-[#2d3b16] scorecard-font-serif">
                    Chips
                  </h3>
                  <span className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono bg-[#faf8f3] px-2 py-1 rounded">
                    Narrow Scope
                  </span>
                </div>
                <p className="text-sm text-[#4b5b28] mb-3 leading-relaxed">
                  <strong>Characteristics:</strong> Narrowly-scoped prompts that focus on specific
                  implementation details. These shots have clear boundaries and success criteria.
                </p>
                <ul className="text-sm text-[#4b5b28] space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Specific feature implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>High semantic constraints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Clear success criteria</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Integration with existing components</span>
                  </li>
                </ul>
                <div className="mt-4 bg-[#faf8f3] border border-[#c5bfa8] rounded p-4">
                  <p className="text-xs text-[#6b7a4a] scorecard-font-mono mb-2">
                    Example Prompt Style:
                  </p>
                  <p className="text-sm text-[#2d3b16] italic">
                    "Add password reset functionality to the authentication service, including
                    email verification, secure token generation, and expiration handling. Use the
                    existing email service interface and follow the established error handling
                    patterns."
                  </p>
                </div>
              </div>

              {/* Puts */}
              <div className="border-l-4 border-[#556b2f] pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">⛳</span>
                  <h3 className="text-xl font-semibold text-[#2d3b16] scorecard-font-serif">
                    Puts
                  </h3>
                  <span className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono bg-[#faf8f3] px-2 py-1 rounded">
                    Maximum Precision
                  </span>
                </div>
                <p className="text-sm text-[#4b5b28] mb-3 leading-relaxed">
                  <strong>Characteristics:</strong> Narrowly-scoped, context-specific,
                  high-semantically-clamped prompts that steer the implementing LLM to finish the
                  feature implementation with high compliance to requirements and attestable quality.
                </p>
                <ul className="text-sm text-[#4b5b28] space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Maximum semantic clamping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Context-specific implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Precise success criteria and validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Quality assurance and testing requirements</span>
                  </li>
                </ul>
                <div className="mt-4 bg-[#faf8f3] border border-[#c5bfa8] rounded p-4">
                  <p className="text-xs text-[#6b7a4a] scorecard-font-mono mb-2">
                    Example Prompt Style:
                  </p>
                  <p className="text-sm text-[#2d3b16] italic">
                    "Fix the password reset token validation bug in AuthService.resetPassword() at
                    line 142. The token should expire after 1 hour, validate the format
                    (UUID-v4), and return AUTH_TOKEN_EXPIRED error code when expired. Add unit
                    tests covering expiration edge cases and update the error handling to match the
                    existing pattern in AuthService.login()."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LLM Usage Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2d3b16] mb-6 scorecard-title">
            Guide for LLMs: How to Use This Framework
          </h2>
          <div className="bg-white border-2 border-[#556b2f] rounded-lg p-8 shadow-lg">
            <div className="space-y-6">
              <div className="bg-[#faf8f3] border border-[#c5bfa8] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#2d3b16] mb-4 scorecard-font-serif">
                  When to Apply This Framework
                </h3>
                <p className="text-sm text-[#4b5b28] mb-4 leading-relaxed">
                  Use this framework when asked to create an implementation plan, development roadmap,
                  or feature breakdown. The framework is particularly useful for:
                </p>
                <ul className="text-sm text-[#4b5b28] space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Breaking down large features into manageable work items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Creating structured implementation prompts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Organizing development work without temporal constraints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Ensuring early value delivery (releasable product at hole 9)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#2d3b16] mb-4 scorecard-font-serif">
                  Step-by-Step Process
                </h3>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#556b2f] text-white rounded-full flex items-center justify-center font-bold text-sm scorecard-font-serif">
                      1
                    </span>
                    <div>
                      <h4 className="font-semibold text-[#2d3b16] mb-2">
                        Identify the Complete Feature Set
                      </h4>
                      <p className="text-sm text-[#4b5b28] leading-relaxed">
                        Break down the project into 18 distinct features, capabilities, or system
                        components. Each hole should represent a complete, testable feature.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#556b2f] text-white rounded-full flex items-center justify-center font-bold text-sm scorecard-font-serif">
                      2
                    </span>
                    <div>
                      <h4 className="font-semibold text-[#2d3b16] mb-2">
                        Organize Holes for Early Value
                      </h4>
                      <p className="text-sm text-[#4b5b28] leading-relaxed">
                        Ensure that holes 1-9 (the front 9) contain the core functionality needed
                        for a releasable product. The turn should represent a meaningful milestone
                        with the bulk of core scope implemented and tested.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#556b2f] text-white rounded-full flex items-center justify-center font-bold text-sm scorecard-font-serif">
                      3
                    </span>
                    <div>
                      <h4 className="font-semibold text-[#2d3b16] mb-2">
                        Break Each Hole into 3-5 Shots
                      </h4>
                      <p className="text-sm text-[#4b5b28] leading-relaxed">
                        For each hole, create 3-5 shots that progress from drives (broad, exploratory)
                        to puts (narrow, precise). Each shot should be a complete, actionable
                        implementation prompt directive.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#556b2f] text-white rounded-full flex items-center justify-center font-bold text-sm scorecard-font-serif">
                      4
                    </span>
                    <div>
                      <h4 className="font-semibold text-[#2d3b16] mb-2">
                        Apply Semantic Clamping Progression
                      </h4>
                      <p className="text-sm text-[#4b5b28] leading-relaxed">
                        Structure shots so that early shots (drives) have low semantic clamping
                        (allow exploration), while later shots (puts) have high semantic clamping
                        (precise requirements, clear success criteria, context-specific).
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#556b2f] text-white rounded-full flex items-center justify-center font-bold text-sm scorecard-font-serif">
                      5
                    </span>
                    <div>
                      <h4 className="font-semibold text-[#2d3b16] mb-2">
                        Write High-Quality Shot Prompts
                      </h4>
                      <p className="text-sm text-[#4b5b28] leading-relaxed">
                        Each shot should be a high-quality, high-specificity implementation prompt
                        that an implementing LLM can execute. Include context, requirements, success
                        criteria, and quality attestation requirements.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-[#faf8f3] border border-[#c5bfa8] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#2d3b16] mb-4 scorecard-font-serif">
                  Key Principles for Shot Prompts
                </h3>
                <ul className="text-sm text-[#4b5b28] space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#556b2f] mt-1 font-bold">→</span>
                    <div>
                      <strong className="text-[#2d3b16]">Drives:</strong> Focus on exploration,
                      architecture, and direction-setting. Allow for multiple valid approaches.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#556b2f] mt-1 font-bold">→</span>
                    <div>
                      <strong className="text-[#2d3b16]">Approach Shots:</strong> Narrow the
                      solution space while maintaining some flexibility. Refine architectural
                      decisions.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#556b2f] mt-1 font-bold">→</span>
                    <div>
                      <strong className="text-[#2d3b16]">Chips:</strong> Specify implementation
                      details with clear boundaries. Include integration requirements.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#556b2f] mt-1 font-bold">→</span>
                    <div>
                      <strong className="text-[#2d3b16]">Puts:</strong> Provide maximum precision
                      with context-specific requirements, exact success criteria, and quality
                      validation steps.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Example Structure */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2d3b16] mb-6 scorecard-title">
            Example Structure
          </h2>
          <div className="bg-white border-2 border-[#8b956d] rounded-lg p-8 shadow-md">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#2d3b16] mb-4 scorecard-font-serif">
                  Example: Hole 1 - User Authentication System
                </h3>
                <div className="bg-[#faf8f3] border border-[#c5bfa8] rounded-lg p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono bg-white px-2 py-1 rounded">
                        Drive
                      </span>
                      <span className="text-sm font-semibold text-[#2d3b16]">Shot 1</span>
                    </div>
                    <p className="text-sm text-[#4b5b28] italic">
                      "Design the overall architecture for user authentication, considering security
                      best practices, scalability requirements, and integration with existing user
                      management systems. Explore OAuth2, JWT, and session-based approaches, and
                      recommend a solution with rationale."
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono bg-white px-2 py-1 rounded">
                        Approach
                      </span>
                      <span className="text-sm font-semibold text-[#2d3b16]">Shot 2</span>
                    </div>
                    <p className="text-sm text-[#4b5b28] italic">
                      "Implement the authentication service layer using the chosen architecture,
                      including user registration, login, password hashing, and session management.
                      Follow the security patterns established in the design phase and integrate
                      with the existing user database schema."
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono bg-white px-2 py-1 rounded">
                        Chip
                      </span>
                      <span className="text-sm font-semibold text-[#2d3b16]">Shot 3</span>
                    </div>
                    <p className="text-sm text-[#4b5b28] italic">
                      "Add password reset functionality to the authentication service, including
                      email verification, secure token generation (UUID-v4), and expiration
                      handling (1-hour TTL). Use the existing email service interface and follow
                      the established error handling patterns."
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono bg-white px-2 py-1 rounded">
                        Put
                      </span>
                      <span className="text-sm font-semibold text-[#2d3b16]">Shot 4</span>
                    </div>
                    <p className="text-sm text-[#4b5b28] italic">
                      "Fix the password reset token validation bug in AuthService.resetPassword()
                      at line 142. The token must expire after exactly 1 hour (3600 seconds),
                      validate UUID-v4 format using the regex pattern from TokenValidator, return
                      AUTH_TOKEN_EXPIRED error code (matching AuthError enum), and add unit tests
                      covering expiration edge cases (3599s, 3600s, 3601s) following the test
                      pattern in AuthServiceTest.login()."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Semantic Clamping Explanation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2d3b16] mb-6 scorecard-title">
            Understanding Semantic Clamping
          </h2>
          <div className="bg-white border-2 border-[#556b2f] rounded-lg p-8 shadow-lg">
            <p className="text-sm text-[#4b5b28] mb-6 leading-relaxed">
              <strong className="text-[#2d3b16]">Semantic clamping</strong> refers to the degree
              to which a prompt constrains the solution space and specifies requirements. It's a
              continuum from low (broad, exploratory) to high (narrow, precise).
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-[#faf8f3] border border-[#c5bfa8] rounded-lg p-6">
                <h3 className="text-base font-semibold text-[#2d3b16] mb-3 scorecard-font-serif">
                  Low Semantic Clamping (Drives)
                </h3>
                <ul className="text-sm text-[#4b5b28] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Allows multiple valid approaches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Exploratory and discovery-oriented</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Minimal constraints on implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Focus on "what" and "why"</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#faf8f3] border border-[#c5bfa8] rounded-lg p-6">
                <h3 className="text-base font-semibold text-[#2d3b16] mb-3 scorecard-font-serif">
                  High Semantic Clamping (Puts)
                </h3>
                <ul className="text-sm text-[#4b5b28] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Specifies exact approach and implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Context-specific with precise requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Clear success criteria and validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#556b2f] mt-1">•</span>
                    <span>Focus on "how" with exact specifications</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-[#eae3d3] border border-[#c5bfa8] rounded-lg p-6">
              <p className="text-sm text-[#2d3b16] leading-relaxed">
                <strong>Progression Principle:</strong> As you move through shots in a hole, each
                subsequent shot should have higher semantic clamping than the previous one. This
                ensures that implementation moves from broad exploration to precise execution,
                maintaining momentum while increasing precision.
              </p>
            </div>
          </div>
        </section>

        {/* Quality and Attestation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2d3b16] mb-6 scorecard-title">
            Quality and Attestation
          </h2>
          <div className="bg-white border-2 border-[#8b956d] rounded-lg p-8 shadow-md">
            <p className="text-sm text-[#4b5b28] mb-6 leading-relaxed">
              Each shot prompt should include requirements for quality attestation. As shots
              progress from drives to puts, the quality requirements should become more specific
              and measurable.
            </p>
            <div className="space-y-4">
              <div className="bg-[#faf8f3] border border-[#c5bfa8] rounded-lg p-5">
                <h3 className="text-base font-semibold text-[#2d3b16] mb-3 scorecard-font-serif">
                  Quality Requirements by Shot Type
                </h3>
                <ul className="text-sm text-[#4b5b28] space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#556b2f] mt-1 font-bold">Drives:</span>
                    <span>Documentation of decisions, rationale, and trade-offs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#556b2f] mt-1 font-bold">Approach Shots:</span>
                    <span>Code review checklist, integration tests, architectural compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#556b2f] mt-1 font-bold">Chips:</span>
                    <span>Unit tests, integration tests, error handling validation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#556b2f] mt-1 font-bold">Puts:</span>
                    <span>Comprehensive test coverage, edge case validation, performance benchmarks,
                    code quality metrics, and explicit success criteria verification</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2d3b16] mb-6 scorecard-title">
            Additional Resources
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/golf-philosophy-slides"
              className="bg-white border-2 border-[#8b956d] rounded-lg p-6 hover:border-[#556b2f] transition-colors shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">⛳</span>
                <h3 className="text-lg font-semibold text-[#2d3b16] scorecard-font-serif">
                  Golf Philosophy Slides
                </h3>
              </div>
              <p className="text-sm text-[#4b5b28]">
                Explore the 10 shot archetypes with detailed visualizations, prompt examples, and
                heuristic definitions.
              </p>
            </Link>
            <Link
              href="/scorecard-dashboard"
              className="bg-white border-2 border-[#8b956d] rounded-lg p-6 hover:border-[#556b2f] transition-colors shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📊</span>
                <h3 className="text-lg font-semibold text-[#2d3b16] scorecard-font-serif">
                  Scorecard Dashboard
                </h3>
              </div>
              <p className="text-sm text-[#4b5b28]">
                View live project data, insights, trajectories, and manifold visualizations using
                the scorecard framework.
              </p>
            </Link>
            <Link
              href="/prototypes"
              className="bg-white border-2 border-[#8b956d] rounded-lg p-6 hover:border-[#556b2f] transition-colors shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🧪</span>
                <h3 className="text-lg font-semibold text-[#2d3b16] scorecard-font-serif">
                  Prototypes
                </h3>
              </div>
              <p className="text-sm text-[#4b5b28]">
                Explore working implementations and experimental features built using this
                framework.
              </p>
            </Link>
            <Link
              href="/diagrams"
              className="bg-white border-2 border-[#8b956d] rounded-lg p-6 hover:border-[#556b2f] transition-colors shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📐</span>
                <h3 className="text-lg font-semibold text-[#2d3b16] scorecard-font-serif">
                  Diagrams
                </h3>
              </div>
              <p className="text-sm text-[#4b5b28]">
                Navigate ontology-first diagrams, including semantic manifolds and archetype
                terrains.
              </p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="scorecard-page-footer mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="text-center text-sm text-[#556b2f]">
            <p className="scorecard-font-serif font-semibold">
              LLM Instructions · Hyperdimensional Vector Space Golf · 2025
            </p>
            <p className="mt-1 text-xs text-[#6b7a4a]">
              Framework for structuring implementation plans using golf metaphors and semantic
              clamping
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

