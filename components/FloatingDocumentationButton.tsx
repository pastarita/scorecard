"use client";

import { useState } from "react";
import { useDocumentation } from "./DocumentationProvider";

export function FloatingDocumentationButton() {
  const { openSidebar, openCommandMenu } = useDocumentation();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-3 px-4 py-3 bg-[#556b2f] text-white text-sm rounded-lg shadow-xl scorecard-font-serif min-w-[200px] transition-opacity duration-200">
          <div className="font-bold mb-2 flex items-center gap-2">
            <span>📚</span>
            <span>Documentation</span>
          </div>
          <div className="text-[#f0f8f0] text-xs space-y-1">
            <div>Click to open sidebar</div>
            <div className="flex items-center gap-1">
              <span>Press</span>
              <kbd className="px-2 py-1 bg-[#3d4a21] rounded text-xs font-mono border border-[#8b956d]">
                ⌘K
              </kbd>
              <span>to search</span>
            </div>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[#556b2f]" />
        </div>
      )}

      {/* Floating Golf Ball Button */}
      <button
        onClick={openSidebar}
        onDoubleClick={openCommandMenu}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-[#556b2f] hover:bg-[#3d4a21] text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#556b2f] focus:ring-offset-2"
        aria-label="Open Documentation"
        title="Open Documentation (⌘K to search)"
      >
        <span className="text-3xl" role="img" aria-label="Golf ball">⛳</span>
      </button>
    </div>
  );
}

