"use client";

import Link from "next/link";
import { ResponsiveIDEPrototype } from "@/components/prototypes/responsive/ResponsiveIDEPrototype";
import { SAMPLE_SCORECARD } from "@/lib/sample-data";

/**
 * IDE Extension Prototype - Responsive Version
 * 
 * Route: /ide-ext
 * 
 * Purpose: Responsive IDE prototype with breakpoint handling
 * Features:
 * - Responsive grid (3/5/9 columns)
 * - Collapsible ladder on mobile
 * - Stacked header on mobile
 * - Mobile-friendly layout
 * - Proper height propagation
 * - Fog/weather visualization
 */
export default function IDEExtensionPrototypePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0b1f14] text-[#f1f5ec]">
      <header className="border-b border-[#184229] bg-[#102d18] shadow-[0_2px_12px_rgba(11,31,20,0.45)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/prototypes"
              className="inline-flex items-center gap-2 rounded-full border border-[#1f4d2f] px-3 py-1.5 text-xs font-medium text-[#f1f5ec] transition-colors hover:border-[#8b956d] hover:bg-[#143b23] hover:text-[#d1f7c4]"
            >
              <span className="text-base leading-none">←</span>
              <span className="scorecard-font-serif uppercase tracking-[0.16em]">
                Back
              </span>
            </Link>
            <div className="hidden text-[10px] uppercase tracking-[0.28em] text-[#a5b59c] sm:block scorecard-font-mono">
              Hyperdimensional Vector Space Golf
            </div>
          </div>
          <div className="text-right text-[11px] leading-tight text-[#d9e4d5] scorecard-font-mono">
            <div className="font-semibold text-[#f6fff0] uppercase tracking-[0.2em]">
              IDE Extension Prototype
            </div>
            <div className="text-[#8b956d]">Branch: prototypes/ide-extension</div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <ResponsiveIDEPrototype data={SAMPLE_SCORECARD} />
      </main>
    </div>
  );
}

