"use client";

import Link from "next/link";
import { DocumentationButton } from "@/components/DocumentationButton";
import { ShotSelectionPrototype } from "@/components/prototypes/shot-selection/ShotSelectionPrototype";

export default function ShotSelectionPage() {
  return (
    <div className="bg-[#f0ede2]">
      <nav className="relative z-10 border-b border-[#8b956d]/40 bg-[#f7f4eb]/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-3 text-xs text-[#556b2f]">
          <Link
            href="/prototypes"
            className="inline-flex items-center gap-2 rounded bg-[#556b2f] px-3 py-1.5 font-medium text-white transition-colors hover:bg-[#3d4a21]"
          >
            <span>←</span>
            <span>Back to Prototypes</span>
          </Link>
          <span className="scorecard-font-mono uppercase tracking-[0.3em] text-[#8b956d]">
            Shot Selection Interface
          </span>
          <div className="ml-auto inline-flex items-center gap-2">
            <DocumentationButton />
          </div>
        </div>
      </nav>

      <ShotSelectionPrototype />
    </div>
  );
}


