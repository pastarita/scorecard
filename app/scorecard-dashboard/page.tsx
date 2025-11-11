"use client";

import { TabNavigation, useTabs, type Tab } from "@/components/TabNavigation";
import { ScorecardTable } from "@/components/experiments/ScorecardTable";
import { TraditionalScorecard } from "@/components/experiments/TraditionalScorecard";
import { ShotTrajectory } from "@/components/experiments/ShotTrajectory";
import { ConfidenceHeatmap } from "@/components/experiments/ConfidenceHeatmap";
import { ArchetypeDistribution } from "@/components/experiments/ArchetypeDistribution";
import { ProgressTimeline } from "@/components/experiments/ProgressTimeline";
import { HoleDetails } from "@/components/experiments/HoleDetails";
import { ManifoldProjection } from "@/components/experiments/ManifoldProjection";
import { InsightsDashboard } from "@/components/experiments/InsightsDashboard";
import { DocumentationButton } from "@/components/DocumentationButton";
import { SAMPLE_SCORECARD } from "@/lib/sample-data";

const TABS: Tab[] = [
  {
    id: "insights",
    label: "Insights",
    icon: "💡",
    description: "Analytics and recommendations",
  },
  {
    id: "scorecard",
    label: "Scorecard",
    icon: "📊",
    description: "Traditional scorecard view",
  },
  {
    id: "traditional",
    label: "Traditional",
    icon: "⛳",
    description: "Classic golf scorecard with SVG holes",
  },
  {
    id: "trajectory",
    label: "Trajectory",
    icon: "🏹",
    description: "Shot trajectory reconstruction",
  },
  {
    id: "manifold",
    label: "Manifold",
    icon: "🌐",
    description: "Hyperdimensional projection (ℝⁿ → ℝ²)",
  },
  {
    id: "timeline",
    label: "Timeline",
    icon: "📈",
    description: "Progress timeline visualization",
  },
  {
    id: "heatmap",
    label: "Heatmap",
    icon: "🗺️",
    description: "Confidence heatmap",
  },
  {
    id: "archetypes",
    label: "Archetypes",
    icon: "⊗",
    description: "Archetype distribution analysis",
  },
  {
    id: "holes",
    label: "Hole Details",
    icon: "⛏️",
    description: "Individual hole analysis",
  },
];

export default function ScorecardDashboardPage() {
  const { activeTab, setActiveTab } = useTabs("traditional");

  // Get the first hole with shots for trajectory demo
  const holeWithShots = SAMPLE_SCORECARD.course.holes.find(
    (hole) => hole.shots.length > 0
  );

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <header className="scorecard-page-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="scorecard-title text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-3xl">⛳</span>
                <span>HYPERDIMENSIONAL VECTOR SPACE GOLF</span>
              </h1>
              <p className="scorecard-font-serif text-base text-[#556b2f]">
                Development Scorecard System
              </p>
            </div>
            <div className="text-right text-sm scorecard-font-mono">
              <div className="mb-1">
                <span className="text-[#6b7a4a]">PRODUCT:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">
                  {SAMPLE_SCORECARD.project.product}
                </span>
              </div>
              <div className="mb-1">
                <span className="text-[#6b7a4a]">DEVELOPER:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">
                  {SAMPLE_SCORECARD.project.developer}
                </span>
              </div>
              <div>
                <span className="text-[#6b7a4a]">DATE:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">
                  {SAMPLE_SCORECARD.project.dateStart} -{" "}
                  {SAMPLE_SCORECARD.project.dateEnd}
                </span>
              </div>
            </div>
          </div>

          <nav className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#8b956d] pt-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>🏠</span>
              <span>Back to Landing</span>
            </a>
            <a
              href="/prototypes"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>🧪</span>
              <span>Prototypes</span>
            </a>
            <a
              href="/ide-ext"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>💻</span>
              <span>IDE Extension</span>
            </a>
            <a
              href="/diagrams"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>📐</span>
              <span>Diagrams</span>
            </a>
            <a
              href="/intro"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>🎥</span>
              <span>Intro Video</span>
            </a>
            <DocumentationButton />
          </nav>
        </div>

        <TabNavigation
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 bg-[#faf8f3]">
        {activeTab === "insights" && (
          <InsightsDashboard data={SAMPLE_SCORECARD} />
        )}

        {activeTab === "scorecard" && (
          <ScorecardTable data={SAMPLE_SCORECARD} />
        )}

        {activeTab === "traditional" && (
          <TraditionalScorecard data={SAMPLE_SCORECARD} />
        )}

        {activeTab === "trajectory" && holeWithShots ? (
          <ShotTrajectory hole={holeWithShots} />
        ) : null}

        {activeTab === "manifold" && (
          <ManifoldProjection data={SAMPLE_SCORECARD} />
        )}

        {activeTab === "timeline" && (
          <ProgressTimeline data={SAMPLE_SCORECARD} />
        )}

        {activeTab === "heatmap" && (
          <ConfidenceHeatmap data={SAMPLE_SCORECARD} />
        )}

        {activeTab === "archetypes" && (
          <ArchetypeDistribution data={SAMPLE_SCORECARD} />
        )}

        {activeTab === "holes" && (
          <HoleDetails data={SAMPLE_SCORECARD} />
        )}
      </main>

      <div className="max-w-7xl mx-auto px-4 pb-4">
        <a
          href="/diagrams"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-sm font-medium"
        >
          <span>📐</span>
          <span>View All Diagrams</span>
        </a>
      </div>

      <footer className="scorecard-page-footer mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-sm text-[#556b2f]">
            <p className="scorecard-font-serif font-semibold">
              Hyperdimensional Vector Space Golf Scorecard · Patrick Astarita ·
              2025
            </p>
            <p className="mt-1 text-xs text-[#6b7a4a]">
              Navigate development through ℝⁿ using golf metaphors and category
              theory
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

