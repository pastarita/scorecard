"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SAMPLE_SCORECARD } from "@/lib/sample-data";
import { DocumentationButton } from "@/components/DocumentationButton";
import type { Hole } from "@/types/scorecard";
import {
  TRANSFORMATION_VOCABULARY,
  type TransformationDescriptor,
  describeTransformation,
} from "@/lib/perspectiveLanguage";
import { AerialShotView } from "@/components/prototypes/AerialShotView";
import { AerialCSSMotif } from "@/components/prototypes/AerialCSSMotif";

type EngineMode = "svg" | "css";

export default function AerialEnginePage() {
  const [selectedHole, setSelectedHole] = useState<Hole>(
    SAMPLE_SCORECARD.course.holes.find((h) => h.shots.length > 0) ||
      SAMPLE_SCORECARD.course.holes[0]
  );
  const [transformation, setTransformation] =
    useState<keyof typeof TRANSFORMATION_VOCABULARY>("standard");
  const [engineMode, setEngineMode] = useState<EngineMode>("svg");
  const [debugBounds, setDebugBounds] = useState(false);

  const transformationDescriptor: TransformationDescriptor = useMemo(
    () => TRANSFORMATION_VOCABULARY[transformation](),
    [transformation]
  );

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <header className="scorecard-page-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="scorecard-title text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-3xl">🧪</span>
                <span>AERIAL ENGINE PROTOTYPE</span>
              </h1>
              <p className="scorecard-font-serif text-base text-[#556b2f]">
                CSS & SVG Projection Engine for Aerial Shot Motifs
              </p>
            </div>
            <div className="text-right text-sm scorecard-font-mono space-y-1">
              <div>
                <span className="text-[#6b7a4a]">PROTOTYPE:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">
                  Aerial Engine • Motif System
                </span>
              </div>
              <div>
                <span className="text-[#6b7a4a]">BRANCH:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">
                  prototypes/aerial-engine
                </span>
              </div>
            </div>
          </div>

          <nav className="mt-4 flex items-center flex-wrap gap-3 border-t border-[#8b956d] pt-3">
            <Link
              href="/prototypes"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>←</span>
              <span>Back to Prototypes</span>
            </Link>
            <Link
              href="/aerial-view"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8b956d] text-white rounded hover:bg-[#556b2f] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>📐</span>
              <span>Aerial Shot</span>
            </Link>
            <Link
              href="/ide-ext"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8b956d] text-white rounded hover:bg-[#556b2f] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>💻</span>
              <span>IDE Extension</span>
            </Link>
            <DocumentationButton />
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 bg-[#faf8f3]">
        <section className="mb-8 p-6 bg-white border-2 border-[#8b956d] rounded-lg">
          <h2 className="text-xl font-bold text-[#556b2f] mb-4 scorecard-font-serif">
            Engine Overview
          </h2>
          <div className="space-y-3 text-sm text-[#3d4a21]">
            <p>
              The aerial engine explores layered projection techniques for the aerial shot motif.
              It runs the geometry pipeline once and renders the scene through either the
              original SVG projection or a CSS transform-based motif.
            </p>
            <ul className="list-disc list-inside text-xs text-[#6b7a4a] space-y-1 ml-4">
              <li>Geometry foundation built from bounding boxes and semantic zones</li>
              <li>Pipeline stages: flat pattern → perspective transform → arc animation</li>
              <li>Motif engine compares SVG projection with CSS transform approach</li>
              <li>Debug mode overlays bounding boxes to study spatial grounding</li>
            </ul>
          </div>
        </section>

        <section className="mb-8 p-6 bg-white border-2 border-[#556b2f] rounded-lg">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#556b2f] mb-2">
                Select Hole
              </label>
              <select
                value={selectedHole.number}
                onChange={(e) => {
                  const hole = SAMPLE_SCORECARD.course.holes.find(
                    (h) => h.number === parseInt(e.target.value)
                  );
                  if (hole) setSelectedHole(hole);
                }}
                className="w-full px-3 py-2 border border-[#8b956d] rounded bg-white text-[#3d4a21] focus:outline-none focus:ring-2 focus:ring-[#556b2f]"
              >
                {SAMPLE_SCORECARD.course.holes.map((hole) => (
                  <option key={hole.number} value={hole.number}>
                    Hole {hole.number}: {hole.name} ({hole.shots.length} shots)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#556b2f] mb-2">
                Transformation
              </label>
              <select
                value={transformation}
                onChange={(e) =>
                  setTransformation(
                    e.target.value as keyof typeof TRANSFORMATION_VOCABULARY
                  )
                }
                className="w-full px-3 py-2 border border-[#8b956d] rounded bg-white text-[#3d4a21] focus:outline-none focus:ring-2 focus:ring-[#556b2f]"
              >
                {Object.keys(TRANSFORMATION_VOCABULARY).map((key) => (
                  <option key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-[#6b7a4a]">
                {describeTransformation(transformationDescriptor)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#556b2f] mb-2">
                Engine Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setEngineMode("svg")}
                  className={`flex-1 px-3 py-2 rounded border text-sm font-medium ${
                    engineMode === "svg"
                      ? "border-[#556b2f] bg-[#cfe0c4] text-[#2f3d25]"
                      : "border-[#8b956d] text-[#556b2f] hover:bg-[#e6eddc]"
                  }`}
                >
                  SVG Projection
                </button>
                <button
                  onClick={() => setEngineMode("css")}
                  className={`flex-1 px-3 py-2 rounded border text-sm font-medium ${
                    engineMode === "css"
                      ? "border-[#556b2f] bg-[#cfe0c4] text-[#2f3d25]"
                      : "border-[#8b956d] text-[#556b2f] hover:bg-[#e6eddc]"
                  }`}
                >
                  CSS Motif
                </button>
              </div>
              <label className="mt-3 inline-flex items-center gap-2 text-xs text-[#3d4a21]">
                <input
                  type="checkbox"
                  className="rounded border-[#8b956d] text-[#556b2f] focus:ring-[#556b2f]"
                  checked={debugBounds}
                  onChange={(e) => setDebugBounds(e.target.checked)}
                />
                Show debug bounding boxes
              </label>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-white border-2 border-[#556b2f] rounded-lg p-6">
            <h2 className="text-lg font-bold text-[#556b2f] mb-4 scorecard-font-serif">
              Aerial Engine Output: {selectedHole.name}
            </h2>
            <div className="flex flex-col items-center gap-6">
              {engineMode === "svg" ? (
                <AerialShotView
                  hole={selectedHole}
                  width={1000}
                  height={700}
                  transformation={transformationDescriptor}
                  showShotArcs={true}
                  showLabels={true}
                />
              ) : (
                <AerialCSSMotif
                  hole={selectedHole}
                  width={1000}
                  height={700}
                  transformation={transformationDescriptor}
                  showShotArcs={true}
                  debugBounds={debugBounds}
                />
              )}
              <p className="text-xs text-[#6b7a4a]">
                Mode: {engineMode === "svg" ? "SVG projection pipeline" : "CSS motif transform"}
              </p>
            </div>
          </div>
        </section>

        <section className="p-6 bg-white border-2 border-[#8b956d] rounded-lg">
          <h2 className="text-xl font-bold text-[#556b2f] mb-4 scorecard-font-serif">
            Motif Notes
          </h2>
          <div className="space-y-3 text-sm text-[#3d4a21]">
            <p>
              The CSS motif constructs the course using layered <code>div</code> elements that are
              positioned and rotated via CSS transforms. Shot arcs are approximated using dotted
              quarter-circle borders whose scale and curvature respond to shot confidence.
            </p>
            <p className="text-xs text-[#6b7a4a]">
              This approach enables quick experimentation with perspective cues using standard CSS,
              while the SVG pipeline provides precise geometric projection. Both modes share the same
              underlying geometry and arc trajectory data produced by the pipeline.
            </p>
          </div>
        </section>
      </main>

      <footer className="scorecard-page-footer mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-sm text-[#556b2f]">
            <p className="scorecard-font-serif font-semibold">
              Aerial Engine Prototype · Hyperdimensional Vector Space Golf · 2025
            </p>
            <p className="mt-1 text-xs text-[#6b7a4a]">
              Comparative projection motifs for aerial shot visualization
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

