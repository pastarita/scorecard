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
    icon: "⛳",
    description: "Individual hole analysis",
  },
];

export default function Home() {
  const { activeTab, setActiveTab } = useTabs("traditional");
  
  // Get the first hole with shots for trajectory demo
  const holeWithShots = SAMPLE_SCORECARD.course.holes.find(h => h.shots.length > 0);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header - Traditional Golf Scorecard Style */}
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
                <span className="font-semibold text-[#3d4a21]">{SAMPLE_SCORECARD.project.product}</span>
              </div>
              <div className="mb-1">
                <span className="text-[#6b7a4a]">DEVELOPER:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">{SAMPLE_SCORECARD.project.developer}</span>
              </div>
              <div>
                <span className="text-[#6b7a4a]">DATE:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">
                  {SAMPLE_SCORECARD.project.dateStart} - {SAMPLE_SCORECARD.project.dateEnd}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - Traditional Golf Scorecard Style */}
        <TabNavigation
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </header>

      {/* Main content */}
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

      {/* Footer - Traditional Golf Scorecard Style */}
      <footer className="scorecard-page-footer mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-sm text-[#556b2f]">
            <p className="scorecard-font-serif font-semibold">
              Hyperdimensional Vector Space Golf Scorecard · Patrick Astarita · 2025
            </p>
            <p className="mt-1 text-xs text-[#6b7a4a]">
              Navigate development through ℝⁿ using golf metaphors and category theory
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
