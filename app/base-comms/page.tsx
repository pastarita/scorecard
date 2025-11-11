"use client";

import { useState } from "react";
import Link from "next/link";
import { DocumentationButton } from "@/components/DocumentationButton";
import { AudienceLevelPresentation } from "@/components/base-comms/AudienceLevelPresentation";
import { audienceLevels } from "@/lib/base-comms/audience-content";

export default function BaseCommsPage() {
  const [selectedLevel, setSelectedLevel] = useState(0);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header - Traditional Golf Scorecard Style */}
      <header className="scorecard-page-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="scorecard-title text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-3xl">📡</span>
                <span>BASE COMMUNICATIONS</span>
              </h1>
              <p className="scorecard-font-serif text-base text-[#556b2f]">
                Hyperdimensional Vector Space Golf Scorekeeping · Multi-Audience Presentation
              </p>
            </div>
            <div className="text-right text-sm scorecard-font-mono">
              <div className="mb-1">
                <span className="text-[#6b7a4a]">MODE:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">
                  {audienceLevels[selectedLevel].name}
                </span>
              </div>
              <div className="text-xs text-[#6b7a4a]">
                {audienceLevels[selectedLevel].subtitle}
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
              href="/intro"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>🎥</span>
              <span>Intro Video</span>
            </Link>
            <Link
              href="/diagrams"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>📐</span>
              <span>Diagrams</span>
            </Link>
            <DocumentationButton />
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Audience Level Selector */}
        <div className="bg-white border-2 border-[#8b956d] rounded-lg p-6 mb-6">
          <h2 className="scorecard-title text-xl mb-4">Select Your Audience Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {audienceLevels.map((level, index) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(index)}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200
                  ${
                    selectedLevel === index
                      ? "border-[#556b2f] bg-[#d4e8d4] shadow-lg transform scale-105"
                      : "border-[#8b956d] bg-[#faf8f3] hover:bg-[#f5f0e8] hover:border-[#556b2f]"
                  }
                `}
              >
                <div className="text-3xl mb-2">{level.icon}</div>
                <div className="scorecard-font-serif font-semibold text-[#3d4a21] mb-1">
                  {level.name}
                </div>
                <div className="text-xs text-[#6b7a4a]">{level.subtitle}</div>
                <div className="mt-2 text-xs scorecard-font-mono text-[#9aa589]">
                  {level.contextLabel}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Presentation Content */}
        <AudienceLevelPresentation level={audienceLevels[selectedLevel]} />

        {/* Navigation Helper */}
        <div className="mt-8 bg-[#faf8f3] border border-[#8b956d] rounded-lg p-6">
          <h3 className="scorecard-font-serif font-semibold text-[#3d4a21] mb-3">
            💡 Navigation Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#556b2f]">
            <div>
              <strong>Beginner:</strong> Start here if you're new to the concept. Learn
              through familiar analogies.
            </div>
            <div>
              <strong>Intermediate:</strong> Developer-focused. See how this applies to
              LLM-assisted coding.
            </div>
            <div>
              <strong>Advanced:</strong> Mathematical foundations. Understand the
              semantic topology.
            </div>
            <div>
              <strong>Expert:</strong> Category theory and formal structure. Complete
              theoretical framework.
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
