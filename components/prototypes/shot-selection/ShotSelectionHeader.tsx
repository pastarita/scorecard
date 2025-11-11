"use client";

import { type ShotSelectionLayerSpec } from "@/types/shot-selection";

interface ShotSelectionHeaderProps {
  layers: ShotSelectionLayerSpec[];
  manifestMeta?: {
    generatedAt: string;
    sourceImage: string;
  };
}

/**
 * ShotSelectionHeader
 *
 * Captures the typography/copy system. Communicates the reductionist layering
 * strategy so observers can trace structure back to motif decomposition.
 */
export function ShotSelectionHeader({ layers, manifestMeta }: ShotSelectionHeaderProps) {
  return (
    <header className="mb-12 rounded-2xl border border-[#8b956d] bg-white/80 backdrop-blur-sm shadow-[0_25px_60px_rgba(61,74,33,0.08)]">
      <div className="border-b border-[#8b956d]/60 px-8 py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="scorecard-font-mono text-xs uppercase tracking-[0.35em] text-[#8b956d]">
              prototypes/shot-selection
            </p>
            <h1 className="scorecard-title text-3xl font-semibold text-[#3d4a21] md:text-4xl">
              Shot Selection Interface
            </h1>
            <p className="scorecard-font-serif text-base text-[#556b2f] md:text-lg">
              Structural decomposition of the club motif deck from reference imagery.
            </p>
          </div>
          <div className="rounded-lg border border-[#8b956d]/50 bg-[#f7f4eb] px-4 py-3 text-right text-xs text-[#6b7a4a]">
            <p className="font-semibold text-[#3d4a21]">Branch</p>
            <p className="font-mono text-[11px]">prototypes/shot-selection-interface</p>
            <p className="mt-2 font-semibold text-[#3d4a21]">Derived From</p>
            <p className="font-mono text-[11px]">scorecard_dev_screenshots/club-selection.png</p>
            {manifestMeta && (
              <p className="mt-2 font-mono text-[11px] text-[#6b7a4a]">
                segmented {new Date(manifestMeta.generatedAt).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 px-8 py-6 md:grid-cols-2 lg:grid-cols-4">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className="rounded-xl border border-[#d8dcc5] bg-white/70 px-4 py-3 shadow-sm transition-transform duration-200 hover:-translate-y-1"
          >
            <p className="scorecard-font-mono text-[11px] uppercase tracking-[0.3em] text-[#8b956d]">
              {layer.layer}
            </p>
            <p className="mt-2 text-sm font-semibold text-[#3d4a21]">{layer.label}</p>
            <p className="mt-2 text-xs text-[#6b7a4a]">{layer.description}</p>
          </div>
        ))}
      </div>
    </header>
  );
}


