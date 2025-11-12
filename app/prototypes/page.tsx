"use client";

import Link from "next/link";
import { DocumentationButton } from "@/components/DocumentationButton";
import { SAMPLE_SCORECARD } from "@/lib/sample-data";

/**
 * Prototypes Page
 * 
 * Route: /prototypes
 * 
 * Purpose: Central hub for all prototype implementations
 * Organizes prototypes according to the branch convention:
 * - contemplations/[contemplation-name]
 * - studies/[study-name]
 * - prototypes/[prototype-name]
 */
export default function PrototypesPage() {
  // Active prototypes (currently implemented)
  const activePrototypes = [
    {
      id: "shot-selection",
      name: "Shot Selection Interface",
      description: "Layered reduction of club selection motif with configurable SVG chords",
      route: "/shot-selection",
      status: "active",
      branch: "prototypes/shot-selection-interface",
      contemplation: "contemplations/semantic-motifs",
      features: [
        "Backdrop → container → typography → motif layering",
        "Config-driven club specifications and chord geometry",
        "Selectable club deck with SVG arc visualization",
        "Scorecard theme palette alignment",
      ],
    },
    {
      id: "ide-ext",
      name: "IDE Extension",
      description: "Responsive IDE prototype with breakpoint handling, fog visualization, and scorecard integration",
      route: "/ide-ext",
      status: "active",
      branch: "prototypes/ide-extension",
      contemplation: "contemplations/ide-extension",
      features: [
        "Responsive grid layout (3/5/9 columns)",
        "Collapsible ladder on mobile",
        "Fog/weather visualization",
        "Resizable panels",
        "Front 9 / Back 9 segmentation"
      ]
    },
    {
      id: "aerial-engine",
      name: "Aerial Engine",
      description: "CSS and SVG motif exploration for aerial shot visualization",
      route: "/aerial-engine",
      status: "active",
      branch: "prototypes/aerial-engine",
      contemplation: null,
      features: [
        "Shared geometry pipeline foundation",
        "SVG projection vs CSS motif comparison",
        "Debuggable bounding box overlays",
        "Layered CSS terrain rendering",
        "Confidence-responsive arc styling",
        "Perspective transformation vocabulary integration",
      ]
    },
    {
      id: "aerial-view",
      name: "Aerial Shot",
      description: "Isometric perspective transformation engine for 3D axonometric golf course visualization",
      route: "/aerial-view",
      status: "active",
      branch: "prototypes/aerial-shot",
      contemplation: null,
      features: [
        "Isometric/axonometric projection engine",
        "Normalized branch architecture",
        "3D arc trajectory generation",
        "Zone-based depth visualization",
        "Transformation language system",
        "Parallel view rendering",
        "Interactive transformation controls"
      ]
    },
    {
      id: "diagrams",
      name: "SVG Diagrams Viewer",
      description: "Interactive SVG diagram viewer with zoom, pan, and export capabilities",
      route: "/diagrams",
      status: "active",
      branch: "prototypes/diagrams-viewer",
      contemplation: null,
      features: [
        "SVG rendering",
        "Zoom and pan controls",
        "Export functionality",
        "Diagram navigation"
      ]
    }
  ];

  // Envisioned prototypes from contemplation branches
  const envisionedPrototypes = [
    // From contemplations/ide-extension
    {
      id: "ide-theme-system",
      name: "Theme System",
      description: "5 landscape-inspired themes (Golf Classic, Ethereal, Cliffside, Space Planet, Knots) with theme switching and customization",
      route: null,
      status: "planned",
      branch: "prototypes/theme-system",
      contemplation: "contemplations/ide-extension",
      phase: "Phase 2",
      features: [
        "5 landscape-inspired themes",
        "Theme switching UI",
        "Theme preview functionality",
        "Theme customization options",
        "Color profile management"
      ]
    },
    {
      id: "ide-prompt-tracking",
      name: "Prompt Tracking & Classification",
      description: "Automatic prompt detection, LLM interaction monitoring, shot classification, and ontology integration",
      route: null,
      status: "planned",
      branch: "prototypes/prompt-tracking",
      contemplation: "contemplations/ide-extension",
      phase: "Phase 3",
      features: [
        "LLM interaction monitoring (Cursor API, Copilot API)",
        "Automatic shot classification",
        "Terrain position calculation",
        "Shot history view",
        "Ontology integration",
        "Manual classification override"
      ]
    },
    {
      id: "ide-collaboration",
      name: "Collaboration Tools",
      description: "Quick feedback tool, prompt template generator, export functionality, and GitHub integration",
      route: null,
      status: "planned",
      branch: "prototypes/collaboration-tools",
      contemplation: "contemplations/ide-extension",
      phase: "Phase 6",
      features: [
        "Quick feedback tool",
        "Prompt template generator",
        "Export functionality (SVG, JSON, Markdown, PDF)",
        "GitHub integration (PR/Issue linking)",
        "Contribution templates"
      ]
    },
    {
      id: "ide-meditative",
      name: "Meditative Features",
      description: "Contemplative pauses, reflection prompts, retrospective generation, and strategic direction-setting",
      route: null,
      status: "planned",
      branch: "prototypes/meditative-features",
      contemplation: "contemplations/ide-extension",
      phase: "Phase 7",
      features: [
        "Contemplative pauses (Front 9/Back 9)",
        "Reflection prompts",
        "Retrospective generation",
        "Progress visualization",
        "Strategic direction-setting"
      ]
    },
    {
      id: "ide-gamification",
      name: "Gamification",
      description: "Achievement badges, progress celebrations, streak tracking, and leaderboards",
      route: null,
      status: "planned",
      branch: "prototypes/gamification",
      contemplation: "contemplations/ide-extension",
      phase: "Phase 8",
      features: [
        "Achievement badges",
        "Progress celebrations",
        "Streak tracking",
        "Leaderboards (team mode)"
      ]
    },
    // From contemplations/golf-hole-plan-view-art-generator
    {
      id: "golf-svg-generator",
      name: "Golf Hole Plan View Generator - Core",
      description: "SVG generation pipeline with builder pattern, data ingestion, terrain rendering, and shot trajectory visualization",
      route: null,
      status: "planned",
      branch: "prototypes/golf-hole-svg-generator",
      contemplation: "contemplations/golf-hole-plan-view-art-generator",
      phase: "Phase 4",
      features: [
        "Data ingestion pipeline",
        "Builder pattern architecture",
        "Basic terrain zone rendering",
        "Shot trajectory visualization",
        "SVG output generation",
        "Modality exploration (Engine vs LLM)"
      ]
    },
    {
      id: "golf-interactive-learning",
      name: "Interactive Learning Component",
      description: "Golf club analogy interactive learning with club selection, prompt intensity visualization, and semantic clamp visualization",
      route: null,
      status: "planned",
      branch: "prototypes/interactive-learning",
      contemplation: "contemplations/golf-hole-plan-view-art-generator",
      phase: "Phase 5",
      features: [
        "Club selection interface",
        "Prompt intensity visualization",
        "Semantic clamp visualization",
        "Code generation utilities by club type",
        "Interactive learning progression",
        "Golf club skeuomorphic analogy"
      ]
    },
    {
      id: "golf-enhanced-visualization",
      name: "Enhanced Visualization",
      description: "Enhanced ontological mapping SVG with interactive navigation, mathematical notation overlays, and user annotation system",
      route: null,
      status: "planned",
      branch: "prototypes/enhanced-visualization",
      contemplation: "contemplations/golf-hole-plan-view-art-generator",
      phase: "Phase 9",
      features: [
        "Enhanced ontological mapping SVG",
        "Interactive navigation",
        "Mathematical notation overlays",
        "User annotation system",
        "Feedback collection"
      ]
    },
    // From contemplations/aesthetik-llm-extension-visualization-prompts
    {
      id: "asset-generation",
      name: "Asset Generation System",
      description: "Image generation system using prompts for UI mockups, documentation visuals, marketing materials, and tutorial graphics",
      route: null,
      status: "planned",
      branch: "prototypes/asset-generation",
      contemplation: "contemplations/aesthetik-llm-extension-visualization-prompts",
      phase: "Phase 10",
      features: [
        "Extension UI visualizations",
        "Semantic space visualizations",
        "Theme skinning system",
        "Golf club analogy visuals",
        "Data collection visualizations",
        "Integration workflow diagrams",
        "Complete system overviews"
      ]
    },
    // From contemplations/celebshot
    {
      id: "celebshot",
      name: "CelebShot",
      description: "Development-as-Golf Celebrity Shot Hiring App Marketplace - Mini app on Farcaster with CELO payments connecting developers with expert prompters",
      route: null,
      status: "planned",
      branch: "prototypes/celebshot",
      contemplation: "contemplations/celebshot",
      phase: "Phase 1",
      features: [
        "Problem framing using golf ontology",
        "Expert marketplace with search and filtering",
        "Celebrity shot request system",
        "CELO blockchain payment integration",
        "SVG visualization with emoji building blocks",
        "Farcaster mini app deployment",
        "Escrow smart contract for payments",
        "Expert matching algorithm"
      ]
    }
  ];

  const prototypes = [...activePrototypes, ...envisionedPrototypes];

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header */}
      <header className="scorecard-page-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="scorecard-title text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-3xl">🧪</span>
                <span>PROTOTYPES</span>
              </h1>
              <p className="scorecard-font-serif text-base text-[#556b2f]">
                Development Prototypes & Experimental Features
              </p>
            </div>
            <div className="text-right text-sm scorecard-font-mono">
              <div className="mb-1">
                <span className="text-[#6b7a4a]">PROJECT:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">{SAMPLE_SCORECARD.project.product}</span>
              </div>
              <div>
                <span className="text-[#6b7a4a]">CONVENTION:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">Branch-Based Organization</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 flex items-center gap-4 border-t border-[#8b956d] pt-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>🏠</span>
              <span>Home</span>
            </Link>
            <Link
              href="/ide-ext"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>💻</span>
              <span>IDE Extension</span>
            </Link>
            <Link
              href="/diagrams"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>📐</span>
              <span>Diagrams</span>
            </Link>
            <Link
              href="/aerial-engine"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>🧪</span>
              <span>Aerial Engine</span>
            </Link>
            <Link
              href="/aerial-view"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>✈️</span>
              <span>Aerial Shot</span>
            </Link>
            <Link
              href="/intro"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>🎥</span>
              <span>Intro Video</span>
            </Link>
            <DocumentationButton />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 bg-[#faf8f3]">
        {/* Branch Convention Info */}
        <section className="mb-8 p-6 bg-white border-2 border-[#8b956d] rounded-lg">
          <h2 className="text-xl font-bold text-[#556b2f] mb-4 scorecard-font-serif">
            Branch Organization Convention
          </h2>
          <div className="space-y-3 text-sm text-[#3d4a21]">
            <div className="flex items-start gap-3">
              <span className="font-mono text-[#6b7a4a]">contemplations/</span>
              <div>
                <p className="font-semibold">Contemplations</p>
                <p className="text-xs text-[#6b7a4a]">High-level architectural thinking and planning</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-[#6b7a4a]">studies/</span>
              <div>
                <p className="font-semibold">Studies</p>
                <p className="text-xs text-[#6b7a4a]">Deep dives into specific implementations, variable studies, and research</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-[#6b7a4a]">prototypes/</span>
              <div>
                <p className="font-semibold">Prototypes</p>
                <p className="text-xs text-[#6b7a4a]">Working implementations and experimental features</p>
              </div>
            </div>
          </div>
        </section>

        {/* Active Prototypes */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#556b2f] mb-6 scorecard-font-serif">
            Active Prototypes
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {activePrototypes.map((prototype) => (
              <div
                key={prototype.id}
                className="bg-white border-2 border-[#556b2f] rounded-lg p-6 hover:border-[#3d4a21] transition-colors shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#556b2f] scorecard-font-serif">
                      {prototype.name}
                    </h3>
                    <p className="text-xs text-[#6b7a4a] font-mono mt-1">
                      {prototype.branch}
                    </p>
                    {prototype.contemplation && (
                      <p className="text-xs text-[#8b956d] mt-1">
                        from {prototype.contemplation}
                      </p>
                    )}
                  </div>
                  <span className="px-2 py-1 bg-[#556b2f] text-white text-xs rounded scorecard-font-serif">
                    {prototype.status}
                  </span>
                </div>
                
                <p className="text-sm text-[#3d4a21] mb-4">
                  {prototype.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-[#556b2f] mb-2">Features:</h4>
                  <ul className="text-xs text-[#3d4a21] space-y-1">
                    {prototype.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#556b2f]">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {prototype.route && (
                  <Link
                    href={prototype.route}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-sm font-medium scorecard-font-serif"
                  >
                    <span>→</span>
                    <span>View Prototype</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Envisioned Prototypes */}
        <section>
          <h2 className="text-xl font-bold text-[#556b2f] mb-6 scorecard-font-serif">
            Envisioned Prototypes
          </h2>
          <p className="text-sm text-[#6b7a4a] mb-6">
            Prototypes planned from contemplation branches, organized by implementation phase
          </p>
          
          {/* Group by contemplation */}
          {["contemplations/ide-extension", "contemplations/golf-hole-plan-view-art-generator", "contemplations/aesthetik-llm-extension-visualization-prompts", "contemplations/celebshot"].map((contemplation) => {
            const contemplationPrototypes = envisionedPrototypes.filter(p => p.contemplation === contemplation);
            if (contemplationPrototypes.length === 0) return null;
            
            return (
              <div key={contemplation} className="mb-8">
                <h3 className="text-lg font-semibold text-[#556b2f] mb-4 scorecard-font-serif border-b border-[#8b956d] pb-2">
                  {contemplation}
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {contemplationPrototypes.map((prototype) => (
                    <div
                      key={prototype.id}
                      className="bg-white border-2 border-[#8b956d] rounded-lg p-6 hover:border-[#556b2f] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-base font-bold text-[#556b2f] scorecard-font-serif">
                            {prototype.name}
                          </h4>
                          <p className="text-xs text-[#6b7a4a] font-mono mt-1">
                            {prototype.branch}
                          </p>
                          {prototype.phase && (
                            <p className="text-xs text-[#8b956d] mt-1 font-semibold">
                              {prototype.phase}
                            </p>
                          )}
                        </div>
                        <span className="px-2 py-1 bg-[#8b956d] text-white text-xs rounded scorecard-font-serif">
                          {prototype.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-[#3d4a21] mb-4">
                        {prototype.description}
                      </p>

                      <div className="mb-4">
                        <h5 className="text-xs font-semibold text-[#556b2f] mb-2">Features:</h5>
                        <ul className="text-xs text-[#3d4a21] space-y-1 max-h-32 overflow-y-auto">
                          {prototype.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#556b2f]">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {prototype.route ? (
                        <Link
                          href={prototype.route}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b956d] text-white rounded hover:bg-[#556b2f] transition-colors text-sm font-medium scorecard-font-serif"
                        >
                          <span>→</span>
                          <span>View Prototype</span>
                        </Link>
                      ) : (
                        <div className="text-xs text-[#6b7a4a] italic">
                          Planned for future implementation
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </main>

      {/* Footer */}
      <footer className="scorecard-page-footer mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-sm text-[#556b2f]">
            <p className="scorecard-font-serif font-semibold">
              Prototypes Hub · Hyperdimensional Vector Space Golf · 2025
            </p>
            <p className="mt-1 text-xs text-[#6b7a4a]">
              Organized by branch convention: contemplations/ | studies/ | prototypes/
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

