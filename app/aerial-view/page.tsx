"use client";

/**
 * Aerial Shot Prototype
 * 
 * Route: /aerial-view
 * 
 * Purpose: Standalone prototype for the isometric/aerial shot visualization
 * This prototype focuses on refining the perspective transformation engine
 * and building comprehensive 3D axonometric views of golf courses.
 * 
 * Architecture Overview:
 * - This is an extricable, standalone prototype separate from the IDE extension
 * - Focuses specifically on isometric perspective transformation and rendering
 * - Uses the perspective transformation engine to create "aerial shot" views
 * - All transformation logic lives in lib/perspectiveTransform.ts
 * - Transformation language defined in lib/perspectiveLanguage.ts
 * - 3D arc generation in lib/shotArc3D.ts
 * 
 * Key Concepts:
 * - "Aerial Shot": The isometric/axonometric view that shows the course from above
 *   at an angle, creating a 3D perspective effect. The course appears to move
 *   "up and to the right" in the visualization.
 * 
 * - "Normalized Branch": The transformation engine normalizes the 2D golf course
 *   plan into a standardized coordinate space before applying perspective
 *   transformations. This ensures consistent rendering regardless of hole
 *   archetype or layout.
 * 
 * - "Parallel View": The axonometric projection maintains parallel lines (unlike
 *   true perspective), creating the characteristic isometric appearance where
 *   distance doesn't affect scale.
 */

import { useState } from "react";
import Link from "next/link";
import { DocumentationButton } from "@/components/DocumentationButton";
import { SAMPLE_SCORECARD } from "@/lib/sample-data";
import { AerialShotView } from "@/components/prototypes/AerialShotView";
import type { Hole } from "@/types/scorecard";
import {
  TRANSFORMATION_VOCABULARY,
  type TransformationDescriptor,
  describeTransformation,
} from "@/lib/perspectiveLanguage";

export default function AerialViewPage() {
  const [selectedHole, setSelectedHole] = useState<Hole>(
    SAMPLE_SCORECARD.course.holes.find((h) => h.shots.length > 0) ||
      SAMPLE_SCORECARD.course.holes[0]
  );
  const [transformation, setTransformation] =
    useState<keyof typeof TRANSFORMATION_VOCABULARY>("standard");

  const transformationDescriptor = TRANSFORMATION_VOCABULARY[transformation]();

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header */}
      <header className="scorecard-page-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="scorecard-title text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-3xl">📐</span>
                <span>AERIAL SHOT PROTOTYPE</span>
              </h1>
              <p className="scorecard-font-serif text-base text-[#556b2f]">
                Isometric Perspective Transformation Engine
              </p>
            </div>
            <div className="text-right text-sm scorecard-font-mono">
              <div className="mb-1">
                <span className="text-[#6b7a4a]">PROTOTYPE:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">
                  Aerial View / Isometric Perspective
                </span>
              </div>
              <div>
                <span className="text-[#6b7a4a]">BRANCH:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">
                  prototypes/aerial-shot
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 flex items-center gap-4 border-t border-[#8b956d] pt-3">
            <Link
              href="/prototypes"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>←</span>
              <span>Back to Prototypes</span>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 bg-[#faf8f3]">
        {/* Architecture Overview */}
        <section className="mb-8 p-6 bg-white border-2 border-[#8b956d] rounded-lg">
          <h2 className="text-xl font-bold text-[#556b2f] mb-4 scorecard-font-serif">
            Architecture Overview
          </h2>
          <div className="space-y-4 text-sm text-[#3d4a21]">
            <div>
              <h3 className="font-semibold text-[#556b2f] mb-2">
                Normalized Branch Architecture
              </h3>
              <p className="text-xs text-[#6b7a4a] mb-2">
                The transformation engine uses a normalized coordinate system
                that standardizes all golf course layouts before applying
                perspective transformations. This ensures:
              </p>
              <ul className="list-disc list-inside text-xs text-[#6b7a4a] space-y-1 ml-4">
                <li>
                  Consistent rendering across different hole archetypes
                  (Precision, Convergent, Explorer, Creative)
                </li>
                <li>
                  Predictable transformation behavior regardless of course
                  layout complexity
                </li>
                <li>
                  Easy integration of new hole types without modifying core
                  transformation logic
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#556b2f] mb-2">
                Isometric Perspective Transformation
              </h3>
              <p className="text-xs text-[#6b7a4a] mb-2">
                The "aerial shot" uses axonometric projection (specifically
                isometric) to create the 3D effect:
              </p>
              <ul className="list-disc list-inside text-xs text-[#6b7a4a] space-y-1 ml-4">
                <li>
                  <strong>Parallel View:</strong> Lines remain parallel (unlike
                  true perspective), maintaining consistent scale
                </li>
                <li>
                  <strong>Diagonal Movement:</strong> Course appears to move
                  "up and to the right" creating depth illusion
                </li>
                <li>
                  <strong>Zone-Based Depth:</strong> Different zones (rough,
                  fairway, approach, green) have different Z-depths
                </li>
                <li>
                  <strong>3D Arc Trajectories:</strong> Shot paths are rendered
                  as curved 3D arcs through the transformed space
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#556b2f] mb-2">
                Transformation Pipeline
              </h3>
              <p className="text-xs text-[#6b7a4a]">
                The transformation follows this pipeline:
              </p>
              <ol className="list-decimal list-inside text-xs text-[#6b7a4a] space-y-1 ml-4 mt-2">
                <li>
                  <strong>Normalization:</strong> 2D hole layout generated via
                  holeGenerator.ts
                </li>
                <li>
                  <strong>Coordinate Transformation:</strong> Apply rotation
                  matrices (X, Y, Z axes) using perspectiveTransform.ts
                </li>
                <li>
                  <strong>Depth Application:</strong> Assign Z-values based on
                  zone progression and transformation descriptor
                </li>
                <li>
                  <strong>Projection:</strong> Project 3D coordinates to 2D
                  using axonometric projection
                </li>
                <li>
                  <strong>Arc Generation:</strong> Generate 3D shot trajectories
                  using shotArc3D.ts
                </li>
                <li>
                  <strong>Rendering:</strong> Render transformed SVG paths in
                  PerspectiveHoleView component
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="mb-8 p-6 bg-white border-2 border-[#556b2f] rounded-lg">
          <h2 className="text-lg font-bold text-[#556b2f] mb-4 scorecard-font-serif">
            Controls
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hole Selection */}
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

            {/* Transformation Selection */}
            <div>
              <label className="block text-sm font-semibold text-[#556b2f] mb-2">
                Transformation Type
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
          </div>
        </section>

        {/* Aerial Shot Visualization */}
        <section className="mb-8">
          <div className="bg-white border-2 border-[#556b2f] rounded-lg p-6">
            <h2 className="text-lg font-bold text-[#556b2f] mb-4 scorecard-font-serif">
              Aerial Shot: {selectedHole.name}
            </h2>
            <div className="flex items-center justify-center bg-[#faf8f3] rounded-lg p-8 overflow-auto">
              <AerialShotView
                hole={selectedHole}
                width={1000}
                height={700}
                transformation={transformationDescriptor}
                showShotArcs={true}
                showLabels={true}
              />
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="mb-8 p-6 bg-white border-2 border-[#8b956d] rounded-lg">
          <h2 className="text-xl font-bold text-[#556b2f] mb-4 scorecard-font-serif">
            Technical Implementation
          </h2>
          <div className="space-y-4 text-sm text-[#3d4a21]">
            <div>
              <h3 className="font-semibold text-[#556b2f] mb-2">
                Core Files
              </h3>
              <ul className="list-disc list-inside text-xs text-[#6b7a4a] space-y-1 ml-4">
                <li>
                  <code className="bg-[#f5f0e8] px-1 rounded">
                    lib/perspectiveTransform.ts
                  </code>
                  : Axonometric projection engine and coordinate transformations
                </li>
                <li>
                  <code className="bg-[#f5f0e8] px-1 rounded">
                    lib/perspectiveLanguage.ts
                  </code>
                  : Transformation language and descriptor system
                </li>
                <li>
                  <code className="bg-[#f5f0e8] px-1 rounded">
                    lib/shotArc3D.ts
                  </code>
                  : 3D arc trajectory generation for shot paths
                </li>
                <li>
                  <code className="bg-[#f5f0e8] px-1 rounded">
                    lib/perspectiveHoleGenerator.ts
                  </code>
                  : Integration layer for perspective-transformed layouts
                </li>
                <li>
                  <code className="bg-[#f5f0e8] px-1 rounded">
                    components/prototypes/PerspectiveHoleView.tsx
                  </code>
                  : React component for rendering aerial shots
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#556b2f] mb-2">
                Future Refinements
              </h3>
              <ul className="list-disc list-inside text-xs text-[#6b7a4a] space-y-1 ml-4">
                <li>
                  Enhanced SVG path parser for better curve preservation
                </li>
                <li>Animation support for shot trajectory playback</li>
                <li>Interactive transformation controls</li>
                <li>
                  Multiple hole visualization (entire course aerial view)
                </li>
                <li>Export functionality (SVG, PNG, PDF)</li>
                <li>
                  Performance optimization for complex hole geometries
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="scorecard-page-footer mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-sm text-[#556b2f]">
            <p className="scorecard-font-serif font-semibold">
              Aerial Shot Prototype · Hyperdimensional Vector Space Golf · 2025
            </p>
            <p className="mt-1 text-xs text-[#6b7a4a]">
              Isometric Perspective Transformation Engine
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

