"use client";

import { IDEPrototype } from "@/components/prototypes/IDEPrototype";
import { SAMPLE_SCORECARD } from "@/lib/sample-data";

export default function IDEExtensionPrototypePage() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#1e1e1e]">
      <IDEPrototype data={SAMPLE_SCORECARD} />
    </div>
  );
}

