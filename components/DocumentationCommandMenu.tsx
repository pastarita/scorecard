"use client";

import { useState, useEffect } from "react";
import { Command } from "cmdk";
import { searchDocumentation, flattenDocumentation, type DocumentationSection } from "@/lib/documentation-structure";

interface DocumentationCommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect?: (section: DocumentationSection) => void;
}

export function DocumentationCommandMenu({
  open,
  onOpenChange,
  onSelect,
}: DocumentationCommandMenuProps) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<DocumentationSection[]>([]);

  useEffect(() => {
    if (search.trim()) {
      const searchResults = searchDocumentation(search);
      setResults(searchResults);
    } else {
      setResults(flattenDocumentation().slice(0, 10)); // Show top 10 by default
    }
  }, [search]);

  const handleSelect = (section: DocumentationSection) => {
    onSelect?.(section);
    onOpenChange(false);
    setSearch("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/20" onClick={() => onOpenChange(false)} />
      <Command
        className="relative z-50 w-full max-w-2xl bg-white border-2 border-[#556b2f] rounded-lg shadow-xl overflow-hidden"
        label="Documentation Search"
      >
        <div className="p-4 border-b border-[#8b956d]">
          <Command.Input
            placeholder="Search documentation... (e.g., 'golf ontology', 'components', 'API')"
            value={search}
            onValueChange={setSearch}
            className="w-full px-4 py-2 text-sm border border-[#8b956d] rounded focus:outline-none focus:ring-2 focus:ring-[#556b2f] scorecard-font-mono"
            autoFocus
          />
        </div>
        <Command.List className="max-h-[400px] overflow-y-auto p-2">
          <Command.Empty className="py-8 text-center text-sm text-[#6b7a4a]">
            No documentation found.
          </Command.Empty>
          {results.map((section) => (
            <Command.Item
              key={section.path}
              value={`${section.title} ${section.description || ""} ${section.path} ${section.tags?.join(" ") || ""}`}
              onSelect={() => handleSelect(section)}
              className="px-4 py-3 rounded cursor-pointer hover:bg-[#f0f8f0] transition-colors aria-selected:bg-[#f0f8f0]"
            >
              <div className="flex items-start gap-3">
                {section.icon && (
                  <span className="text-xl mt-0.5">{section.icon}</span>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#556b2f] scorecard-font-serif">
                      {section.title}
                    </span>
                    {section.tags && section.tags.length > 0 && (
                      <span className="text-xs text-[#6b7a4a] scorecard-font-mono">
                        {section.tags.join(", ")}
                      </span>
                    )}
                  </div>
                  {section.description && (
                    <p className="text-sm text-[#3d4a21] mt-1">
                      {section.description}
                    </p>
                  )}
                  <p className="text-xs text-[#8b956d] mt-1 scorecard-font-mono">
                    {section.path}
                  </p>
                </div>
              </div>
            </Command.Item>
          ))}
        </Command.List>
        <div className="p-2 border-t border-[#8b956d] bg-[#faf8f3]">
          <div className="flex items-center justify-between text-xs text-[#6b7a4a] scorecard-font-mono">
            <span>Press Esc to close</span>
            <span>↑↓ to navigate, Enter to select</span>
          </div>
        </div>
      </Command>
    </div>
  );
}

