"use client";

import { SVGViewer } from "@/components/SVGViewer";
import svgManifestData from "@/lib/svg-manifest.json";

// Type assertion for the manifest
const svgManifest = svgManifestData as {
  diagrams: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    path: string;
    tags: string[];
  }>;
  metadata: {
    version: string;
    created: string;
    description: string;
    categories: string[];
  };
};

export default function DiagramsPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header - Traditional Golf Scorecard Style */}
      <header className="scorecard-page-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="scorecard-title text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-3xl">📐</span>
                <span>SVG DIAGRAMS VIEWER</span>
              </h1>
              <p className="scorecard-font-serif text-base text-[#556b2f]">
                Hyperdimensional Vector Space Golf Visualizations
              </p>
            </div>
            <div className="text-right text-sm scorecard-font-mono">
              <div className="mb-1">
                <span className="text-[#6b7a4a]">DIAGRAMS:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">{svgManifest.diagrams.length}</span>
              </div>
              <div>
                <a
                  href="/"
                  className="text-[#556b2f] hover:text-[#3d4a21] underline"
                >
                  ← Back to Scorecard
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8 bg-[#faf8f3]">
        <SVGViewer manifest={svgManifest} />
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

