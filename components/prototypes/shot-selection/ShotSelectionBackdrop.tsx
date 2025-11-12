"use client";

import type { PropsWithChildren } from "react";

/**
 * ShotSelectionBackdrop
 *
 * Semantic Domain: prototypes/shot-selection
 *
 * Establishes the ambient spatial layer that mirrors the reference motif.
 * Responsible only for macroscopic mood (color, gradient, texture) and gutter rhythm.
 */
export function ShotSelectionBackdrop({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[#f4f1e6]">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,149,109,0.55),_rgba(244,241,230,0))]" />
        <div className="absolute inset-0 mix-blend-multiply opacity-10 pointer-events-none bg-[radial-gradient(circle,_rgba(85,107,47,0.4)_0%,_rgba(85,107,47,0)_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-14 lg:py-16">
          {children}
        </div>
      </div>
    </div>
  );
}


