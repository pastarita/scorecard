"use client";

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
 */
export default function IDEExtensionPrototypePage() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#1e1e1e]">
      <ResponsiveIDEPrototype data={SAMPLE_SCORECARD} />
    </div>
  );
}

