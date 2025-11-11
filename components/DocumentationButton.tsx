"use client";

import { useDocumentation } from "./DocumentationProvider";

export function DocumentationButton() {
  const { openSidebar, openCommandMenu } = useDocumentation();

  return (
    <button
      onClick={openSidebar}
      onDoubleClick={openCommandMenu}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] transition-colors text-xs font-medium scorecard-font-serif"
      title="Open Documentation (⌘K to search)"
    >
      <span>📚</span>
      <span>Docs</span>
    </button>
  );
}

