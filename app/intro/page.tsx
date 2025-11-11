"use client";

import Link from "next/link";
import { DocumentationButton } from "@/components/DocumentationButton";

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header - Traditional Golf Scorecard Style */}
      <header className="scorecard-page-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="scorecard-title text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-3xl">🎥</span>
                <span>INTRO VIDEO</span>
              </h1>
              <p className="scorecard-font-serif text-base text-[#556b2f]">
                Hyperdimensional Vector Space Golf Introduction
              </p>
            </div>
            <div className="text-right text-sm scorecard-font-mono">
              <div className="mb-1">
                <span className="text-[#6b7a4a]">VIDEO:</span>{" "}
                <span className="font-semibold text-[#3d4a21]">Introduction</span>
              </div>
              <div>
                <a
                  href="https://youtu.be/VdgFaL9Kp3E"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#556b2f] hover:text-[#3d4a21] underline"
                >
                  Watch on YouTube →
                </a>
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
              href="/prototypes"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
            >
              <span>🧪</span>
              <span>Prototypes</span>
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
            <DocumentationButton />
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8 bg-[#faf8f3]">
        <div className="bg-white border-2 border-[#8b956d] rounded-lg p-6 md:p-8">
          <div className="aspect-video w-full max-w-5xl mx-auto">
            <iframe
              src="https://www.youtube.com/embed/VdgFaL9Kp3E"
              title="Hyperdimensional Vector Space Golf - Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
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

