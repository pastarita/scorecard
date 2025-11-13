"use client";

import { useState, useEffect } from "react";
import { shotTypes, type ShotType } from "@/lib/shotTypesData";

interface GolfPhilosophySlideViewerProps {
  initialSlide?: number;
}

export function GolfPhilosophySlideViewer({ initialSlide = 0 }: GolfPhilosophySlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [showHelp, setShowHelp] = useState(false);

  const currentShot = shotTypes[currentSlide];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "ArrowRight":
          e.preventDefault();
          setCurrentSlide((prev) => (prev < shotTypes.length - 1 ? prev + 1 : prev));
          break;
        case "Home":
          e.preventDefault();
          setCurrentSlide(0);
          break;
        case "End":
          e.preventDefault();
          setCurrentSlide(shotTypes.length - 1);
          break;
        case "?":
          e.preventDefault();
          setShowHelp((prev) => !prev);
          break;
        case "Escape":
          e.preventDefault();
          setShowHelp(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scroll when in full screen
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f5f0e8] flex flex-col">
      {/* Header Bar */}
      <div className="bg-black/80 backdrop-blur-sm text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold scorecard-font-serif">
            Shot {currentShot.number}: {currentShot.name}
          </h1>
          <span className="text-sm text-gray-300 scorecard-font-mono">
            {currentSlide + 1} / {shotTypes.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] text-sm"
            aria-label="Show help"
          >
            {showHelp ? "Hide Help" : "Help (?)"}
          </button>
        </div>
      </div>

      {/* Main Content - 60/40 Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Text Content (60%) */}
        <div className="w-[60%] overflow-y-auto p-8 bg-white">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Artifact Definition */}
            <section>
              <h2 className="text-2xl font-bold text-[#2e7d32] mb-4 scorecard-font-serif border-b-2 border-[#81c784] pb-2">
                Artifact Definition
              </h2>
              <div className="bg-[#e8f5e9] border-l-4 border-[#66bb6a] rounded p-4 space-y-2">
                <div>
                  <strong className="text-[#1b5e20]">Shot Type:</strong> {currentShot.artifactDefinition.shotType}
                </div>
                <div>
                  <strong className="text-[#1b5e20]">When:</strong> {currentShot.artifactDefinition.when}
                </div>
                <div>
                  <strong className="text-[#1b5e20]">Distance:</strong> {currentShot.artifactDefinition.distance}
                </div>
                <div>
                  <strong className="text-[#1b5e20]">Purpose:</strong> {currentShot.artifactDefinition.purpose}
                </div>
              </div>
            </section>

            {/* Characteristics */}
            <section>
              <h2 className="text-2xl font-bold text-[#2e7d32] mb-4 scorecard-font-serif border-b-2 border-[#81c784] pb-2">
                Characteristics
              </h2>
              <p className="text-[#333] leading-relaxed">{currentShot.characteristics}</p>
            </section>

            {/* Example Prompts */}
            <section>
              <h2 className="text-2xl font-bold text-[#2e7d32] mb-4 scorecard-font-serif border-b-2 border-[#81c784] pb-2">
                Example Prompts
              </h2>
              <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-2">
                {currentShot.examplePrompts.map((prompt, idx) => (
                  <code
                    key={idx}
                    className="block text-[#81c784] font-mono text-sm py-2 px-3 bg-[#0a0a0a] rounded border-l-2 border-[#66bb6a]"
                  >
                    {prompt}
                  </code>
                ))}
              </div>
            </section>

            {/* Heuristics */}
            <section>
              <h2 className="text-2xl font-bold text-[#2e7d32] mb-4 scorecard-font-serif border-b-2 border-[#81c784] pb-2">
                Heuristic Definitions
              </h2>
              <div className="space-y-4">
                {currentShot.heuristics.map((heuristic, idx) => (
                  <div
                    key={idx}
                    className="bg-[#f1f8e9] border border-[#aed581] rounded-lg p-5 border-l-4 border-[#66bb6a]"
                  >
                    <h3 className="text-lg font-semibold text-[#1b5e20] mb-2 scorecard-font-serif">
                      {heuristic.title}
                    </h3>
                    <p className="text-[#333] leading-relaxed">{heuristic.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Strategic Note */}
            {currentShot.strategicNote && (
              <section>
                <div className="bg-[#f1f8e9] border border-[#aed581] border-l-4 border-[#7cb342] rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-[#1b5e20] mb-2 scorecard-font-serif">
                    Strategic Note
                  </h3>
                  <p className="text-[#333] leading-relaxed italic">{currentShot.strategicNote}</p>
                </div>
              </section>
            )}

            {/* Quick Reference */}
            <section>
              <h2 className="text-2xl font-bold text-[#2e7d32] mb-4 scorecard-font-serif border-b-2 border-[#81c784] pb-2">
                Quick Reference
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#e8f5e9] rounded-lg p-4">
                  <div className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono mb-1">
                    Confidence
                  </div>
                  <div className="text-lg font-bold text-[#2e7d32]">{currentShot.confidenceWindow}</div>
                </div>
                <div className="bg-[#e8f5e9] rounded-lg p-4">
                  <div className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono mb-1">
                    Distance
                  </div>
                  <div className="text-lg font-bold text-[#2e7d32]">{currentShot.semanticDistance}</div>
                </div>
                <div className="bg-[#e8f5e9] rounded-lg p-4">
                  <div className="text-xs uppercase tracking-wide text-[#6b7a4a] scorecard-font-mono mb-1">
                    Intent
                  </div>
                  <div className="text-lg font-bold text-[#2e7d32]">{currentShot.primaryIntent}</div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right: Visualization (40%) */}
        <div className="w-[40%] bg-[#fafafa] border-l border-[#e0e0e0] flex items-center justify-center p-8">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={currentShot.visualizationPath}
              alt={`${currentShot.name} Shot Visualization`}
              className="max-w-full max-h-full object-contain select-none"
              style={{ pointerEvents: "none", userSelect: "none" }}
              onError={(e) => {
                // Fallback if image doesn't load
                const target = e.target as HTMLImageElement;
                const parent = target.parentElement;
                if (parent) {
                  target.style.display = "none";
                  const errorDiv = document.createElement("div");
                  errorDiv.className = "text-center p-8 text-[#6b7a4a] max-w-2xl";
                  errorDiv.innerHTML = `
                    <p class="text-lg font-semibold mb-2 text-[#cc0000]">SVG not found</p>
                    <p class="text-sm scorecard-font-mono mb-2">Path: ${currentShot.visualizationPath}</p>
                    <p class="text-xs mt-4">Please ensure the SVG file exists in the public directory</p>
                  `;
                  parent.appendChild(errorDiv);
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-black/80 backdrop-blur-sm text-white p-3 flex items-center justify-between">
        <button
          onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev))}
          disabled={currentSlide === 0}
          className="px-4 py-2 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          ← Previous
        </button>
        <div className="flex gap-2">
          {shotTypes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide ? "bg-[#81c784] scale-125" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentSlide((prev) => (prev < shotTypes.length - 1 ? prev + 1 : prev))}
          disabled={currentSlide === shotTypes.length - 1}
          className="px-4 py-2 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Next →
        </button>
      </div>

      {/* Help Overlay */}
      {showHelp && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#2d3b16] scorecard-font-serif">Keyboard Controls</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="text-2xl text-[#6b7a4a] hover:text-[#2d3b16]"
                aria-label="Close help"
              >
                ×
              </button>
            </div>
            <div className="space-y-3 text-[#4b5b28] scorecard-font-mono">
              <div className="flex items-center gap-3">
                <kbd className="px-3 py-1.5 bg-[#e8f5e9] rounded border border-[#aed581] font-mono text-sm">
                  ←
                </kbd>
                <span>Previous slide</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-3 py-1.5 bg-[#e8f5e9] rounded border border-[#aed581] font-mono text-sm">
                  →
                </kbd>
                <span>Next slide</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-3 py-1.5 bg-[#e8f5e9] rounded border border-[#aed581] font-mono text-sm">
                  Home
                </kbd>
                <span>First slide</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-3 py-1.5 bg-[#e8f5e9] rounded border border-[#aed581] font-mono text-sm">
                  End
                </kbd>
                <span>Last slide</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-3 py-1.5 bg-[#e8f5e9] rounded border border-[#aed581] font-mono text-sm">
                  ?
                </kbd>
                <span>Toggle help</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-3 py-1.5 bg-[#e8f5e9] rounded border border-[#aed581] font-mono text-sm">
                  Esc
                </kbd>
                <span>Close help</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-[#d4ccb4]">
              <p className="text-sm text-[#6b7a4a]">
                Navigate through all 10 shot types using keyboard controls or the navigation buttons below.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

