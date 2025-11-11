import Image from "next/image";
import Link from "next/link";

const entryPoints = [
  {
    title: "Scorecard Dashboard",
    description:
      "Tour the hyperdimensional scorecard with insights, trajectories, and manifold visualizations derived from live project data.",
    href: "/scorecard-dashboard",
    icon: "📊",
  },
  {
    title: "Prototype Gallery",
    description:
      "Inspect interactive experiments and motif explorations inside the prototypes workspace.",
    href: "/prototypes",
    icon: "🧪",
  },
  {
    title: "IDE Extension",
    description:
      "Review the integrated development assistant surface that instruments agents, prompts, and IDE affordances.",
    href: "/ide-ext",
    icon: "💻",
  },
  {
    title: "Diagram Presenter",
    description:
      "Navigate ontology-first diagrams, including the semantic manifolds and the four archetype terrains.",
    href: "/diagrams",
    icon: "📐",
  },
  {
    title: "Introductory Film",
    description:
      "Watch the narrative framing of Hyperdimensional Vector Space Golf and its builder rituals.",
    href: "/intro",
    icon: "🎥",
  },
  {
    title: "Motif Contemplations",
    description:
      "Trace the evolving semantic motifs and architectural contemplations that seed new prototypes.",
    href: "/contemplations/semantic-motifs",
    icon: "🌀",
  },
];

const semanticModes = [
  {
    name: "Convergent",
    summary:
      "Aim at a clearly scoped deliverable with tight guardrails; momentum drives toward a shared semantic pin.",
    signal:
      "Use when requirements are crisply bounded and the team needs to land refinement without drifting scope.",
  },
  {
    name: "Precision",
    summary:
      "Operate inside a narrow solution band; every variation is measured and instrumented for fidelity.",
    signal:
      "Invoke when verifying pipelines or tightening specifications, where the cost of variance outweighs speed.",
  },
  {
    name: "Explorer",
    summary:
      "Traverse ambiguous terrain to map possibilities, logging gradients, counterfactuals, and unforeseen hazards.",
    signal:
      "Adopt when a domain is under-specified and the goal is discovering viable semantic footholds before converging.",
  },
  {
    name: "Creative",
    summary:
      "Hold space for emergent interpretation, weaving narrative, aesthetic, and subjective resonance into the build.",
    signal:
      "Deploy when the output must evoke new intuition—ritual design, storytelling, or motif invention.",
  },
];

const ontologyStrands = [
  {
    title: "Ontology",
    description:
      "The scorecard encodes a layered golf metaphor that maps project vectors onto terrains, blades, and gradients.",
    highlights: [
      "Map semantic blades to knowledge pillars for explainable references.",
      "Use hyperdimensional fairways to show how contexts narrow toward the green.",
    ],
  },
  {
    title: "Methodology",
    description:
      "Builder rituals emphasize gradient preservation, analogy handoffs, and the avoidance of LLM flattening.",
    highlights: [
      "Run gradient audits when automated ideation compresses option space.",
      "Document analogy transitions to keep metaphoric framing inspectable.",
    ],
  },
  {
    title: "Application",
    description:
      "Each prototype instantiates motifs in a tangible interface, linking ontological insight to executable workflows.",
    highlights: [
      "Motif-driven UI gestures reinforce the semantic grounding of features.",
      "Dashboards surface archetype signals for faster state assessment.",
    ],
  },
];

const motifSignals = [
  {
    title: "Shot Fatness Gauge",
    detail:
      "Track how aggressively a swing rewrites the semantic base; thick arcs highlight ontology rewrites needing review.",
  },
  {
    title: "Analogy Ledger",
    detail:
      "Layer toggles across prototypes so observers can switch between golf, performance, or narrative perspectives.",
  },
  {
    title: "Knowledge Blades",
    detail:
      "Annotate fairway blades with citations and domain pillars, creating a navigable lattice of supporting references.",
  },
  {
    title: "Flattening Countermeasures",
    detail:
      "Surface risk zones where LLM contributions collapse gradients, prompting humans to reintroduce contour.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1f2a10]">
      <div className="relative overflow-hidden bg-[#eae3d3]">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#d8cfb8] via-transparent to-[#8b956d]/40" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24 flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="lg:w-3/5">
            <p className="text-sm uppercase tracking-[0.3em] text-[#6b7a4a] scorecard-font-mono">
              Hyperdimensional Vector Space Golf
            </p>
            <h1 className="mt-4 text-4xl lg:text-5xl font-bold scorecard-title text-[#2d3b16]">
              A semantic landing manifold for builders, analysts, and ontology stewards
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#4b5b28] scorecard-font-serif">
              This site is the primary onboarding surface—stitching ontology, methodology, and application artifacts into a navigable
              topology. Start here to align on vocabulary, uncover prototypes, and dive into the scorecard dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/scorecard-dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-[#556b2f] px-5 py-2.5 text-white text-sm font-medium hover:bg-[#3d4a21] transition-colors"
              >
                <span>📊</span>
                <span>Open the Scorecard Dashboard</span>
              </Link>
              <Link
                href="/prototypes"
                className="inline-flex items-center gap-2 rounded-full border border-[#556b2f] px-5 py-2.5 text-sm font-medium text-[#2d3b16] hover:bg-[#556b2f] hover:text-white transition-colors"
              >
                <span>🧪</span>
                <span>Review Prototypes</span>
              </Link>
              <Link
                href="/agents"
                className="inline-flex items-center gap-2 rounded-full border border-dashed border-[#8b956d] px-5 py-2.5 text-sm font-medium text-[#4b5b28] hover:bg-[#8b956d]/20 transition-colors"
              >
                <span>🤖</span>
                <span>Agent Protocols</span>
              </Link>
            </div>
          </div>
          <div className="lg:w-2/5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl bg-[#f9f5eb] p-6 shadow-[0_35px_120px_-40px_rgba(85,107,47,0.55)] ring-1 ring-[#c5bfa8]">
              <p className="text-xs uppercase tracking-[0.3em] text-[#6b7a4a] scorecard-font-mono">
                Archetype Terrain
              </p>
              <h2 className="mt-2 text-xl font-semibold text-[#2d3b16] scorecard-font-serif">
                Semantic Quadrants
              </h2>
              <p className="mt-3 text-sm text-[#4b5b28]">
                Each archetype carves a playable line between ambiguity and precision. Study the manifolds to align on campaign posture.
              </p>
              <div className="mt-6 rounded-2xl overflow-hidden border border-[#c5bfa8] bg-white">
                <Image
                  src="/diagrams/devolopment-as-golf_dev/files/golf-four-archetypes.svg"
                  alt="Semantic archetype terrains illustrating Convergent, Explorer, Precision, and Creative modes."
                  width={640}
                  height={520}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <Link
                href="/diagrams"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#556b2f] hover:text-[#3d4a21]"
              >
                <span>📐</span>
                <span>Open Diagram Presenter</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-16 lg:py-24 space-y-24">
        <section>
          <div className="flex items-baseline justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-3xl font-semibold text-[#2d3b16] scorecard-title">
                Entry Points Across the Manifold
              </h2>
              <p className="mt-2 text-base text-[#4b5b28] scorecard-font-serif">
                Move through documentation, prototypes, and dashboards with a shared semantic compass. Each surface is tuned to a distinct
                builder intention.
              </p>
            </div>
            <Link
              href="/docs"
              className="text-sm font-medium text-[#556b2f] hover:text-[#3d4a21] flex items-center gap-2"
            >
              <span>📚</span>
              <span>Documentation Index</span>
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {entryPoints.map((entry) => (
              <Link
                key={entry.title}
                href={entry.href}
                className="group rounded-3xl border border-[#c5bfa8] bg-[#faf8f3] p-6 shadow-[0_20px_60px_-40px_rgba(85,107,47,0.6)] transition-all hover:-translate-y-1.5 hover:shadow-[0_28px_80px_-45px_rgba(61,74,33,0.55)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-2xl">{entry.icon}</span>
                  <span className="text-sm text-[#8b956d] scorecard-font-mono">enter</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#2d3b16]">{entry.title}</h3>
                <p className="mt-3 text-sm text-[#4b5b28] leading-relaxed">{entry.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#556b2f] group-hover:text-[#3d4a21]">
                  <span>→</span>
                  <span>Navigate</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-start">
          <div>
            <h2 className="text-3xl font-semibold text-[#2d3b16] scorecard-title">
              Semantic Language Topology
            </h2>
            <p className="mt-3 text-base text-[#4b5b28] scorecard-font-serif">
              The four archetypes define the posture we assume when shaping prompts, code, or rituals. Each mode provides a shared verb set
              and evaluation lens so builders can align on intent as they traverse the manifold.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {semanticModes.map((mode) => (
                <div
                  key={mode.name}
                  className="rounded-3xl border border-[#c5bfa8] bg-gradient-to-br from-white via-[#faf8f3] to-[#f1eddf] p-6 shadow-[0_16px_45px_-30px_rgba(85,107,47,0.65)]"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#2d3b16]">{mode.name}</h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#8b956d] scorecard-font-mono">
                      archetype
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-[#4b5b28] leading-relaxed">{mode.summary}</p>
                  <div className="mt-4 rounded-2xl bg-white/70 p-4 border border-[#d4ccb4]">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#6b7a4a] scorecard-font-mono">
                      When to deploy
                    </p>
                    <p className="mt-2 text-sm text-[#2f3d18]">{mode.signal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[30px] border border-[#c5bfa8] bg-[#faf8f3] p-7 shadow-[0_28px_90px_-40px_rgba(45,59,22,0.55)]">
            <h3 className="text-xl font-semibold text-[#2d3b16] scorecard-font-serif">
              Converging Ontology, Methodology, Application
            </h3>
            <p className="mt-2 text-sm text-[#4b5b28]">
              Orient every initiative through three braided strands. The dashboard visualizes where we are, the methodology prescribes how
              we move, and the ontology reminds us why the terrain matters.
            </p>
            <ul className="mt-6 space-y-5">
              {ontologyStrands.map((strand) => (
                <li key={strand.title} className="rounded-2xl border border-[#d4ccb4] bg-white/80 p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-[#2d3b16]">{strand.title}</h4>
                    <span className="text-xs uppercase tracking-[0.25em] text-[#8b956d] scorecard-font-mono">
                      strand
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#4b5b28]">{strand.description}</p>
                  <ul className="mt-3 space-y-2">
                    {strand.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-sm text-[#2f3d18]">
                        <span className="mt-1 text-[#556b2f]">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h2 className="text-3xl font-semibold text-[#2d3b16] scorecard-title">
                Motif Signals to Reuse in Dashboards
              </h2>
              <p className="mt-2 text-base text-[#4b5b28] scorecard-font-serif">
                The legacy scorecard remains available as a motif library. Surface these signals inside future dashboards to keep
                continuity between analytics and narrative framing.
              </p>
            </div>
            <Link
              href="/scorecard-dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-[#556b2f] px-5 py-2.5 text-sm font-medium text-[#2d3b16] hover:bg-[#556b2f] hover:text-white transition-colors"
            >
              <span>⛳</span>
              <span>Visit Motif Library</span>
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {motifSignals.map((signal) => (
              <div
                key={signal.title}
                className="rounded-3xl border border-[#c5bfa8] bg-[#faf8f3] p-6 shadow-[0_22px_70px_-45px_rgba(61,74,33,0.5)]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#2d3b16]">{signal.title}</h3>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#8b956d] scorecard-font-mono">
                    motif
                  </span>
                </div>
                <p className="mt-3 text-sm text-[#4b5b28] leading-relaxed">{signal.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d4ccb4] bg-[#eae3d3]">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#6b7a4a] scorecard-font-mono">
              Hyperdimensional Vector Space Golf
            </p>
            <p className="mt-2 text-base text-[#2d3b16] scorecard-font-serif">
              Navigate development through ℝⁿ using golf metaphors, semantic motifs, and category theory.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-[#4b5b28]">
            <Link href="/docs" className="hover:text-[#2d3b16]">
              Documentation
            </Link>
            <Link href="/agents" className="hover:text-[#2d3b16]">
              Agent Protocols
            </Link>
            <Link href="/contact" className="hover:text-[#2d3b16]">
              Contact Builder
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
