"use client";

import { useState } from "react";
import { DOCUMENTATION_STRUCTURE, type DocumentationSection } from "@/lib/documentation-structure";

interface DocumentationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPath?: string;
  onSelect?: (section: DocumentationSection) => void;
  selectedSection?: DocumentationSection | null;
  contentHtml?: string;
  isLoadingContent?: boolean;
  error?: string | null;
}

export function DocumentationSidebar({
  isOpen,
  onClose,
  selectedPath,
  onSelect,
  selectedSection,
  contentHtml,
  isLoadingContent = false,
  error = null,
}: DocumentationSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["getting-started", "concepts"])
  );

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const handleSelect = (section: DocumentationSection) => {
    onSelect?.(section);
  };

  const renderSection = (section: DocumentationSection, level = 0) => {
    const isExpanded = expandedSections.has(section.id);
    const hasChildren = section.children && section.children.length > 0;
    const isSelected = selectedPath === section.path;

    return (
      <div key={section.id} className="select-none">
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-colors ${
            isSelected
              ? "bg-[#556b2f] text-white"
              : "hover:bg-[#f0f8f0] text-[#3d4a21]"
          }`}
          style={{ paddingLeft: `${12 + level * 16}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleSection(section.id);
            }
            handleSelect(section);
          }}
        >
          {hasChildren && (
            <span className="text-xs w-4">
              {isExpanded ? "▼" : "▶"}
            </span>
          )}
          {!hasChildren && <span className="text-xs w-4">•</span>}
          {section.icon && <span>{section.icon}</span>}
          <span className="text-sm font-medium scorecard-font-serif flex-1">
            {section.title}
          </span>
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {section.children!.map((child) => renderSection(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  const activeTitle = selectedSection?.title ?? "Documentation";
  const hasContent = !!contentHtml;
  const showComingSoon = !isLoadingContent && !error && !hasContent && selectedSection;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full w-[min(100%,900px)] bg-white border-l-2 border-[#8b956d] z-50 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="p-4 border-b-2 border-[#8b956d] bg-[#faf8f3]">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-[#556b2f] scorecard-font-serif flex items-center gap-2">
                <span>📚</span>
                <span>{activeTitle}</span>
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-[#f0f8f0] transition-colors text-[#6b7a4a]"
                aria-label="Close documentation"
              >
                <span className="text-xl">×</span>
              </button>
            </div>
            <p className="text-xs text-[#6b7a4a] scorecard-font-mono">
              Press <kbd className="px-1.5 py-0.5 bg-white border border-[#8b956d] rounded text-xs">⌘K</kbd> to search
            </p>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
            {/* Navigation */}
            <nav className="max-h-[40vh] overflow-y-auto border-b border-[#e5ead9] p-2 lg:max-h-none lg:w-72 lg:border-b-0 lg:border-r">
              {DOCUMENTATION_STRUCTURE.map((section) => renderSection(section))}
            </nav>

            {/* Content */}
            <section className="flex-1 overflow-y-auto bg-[#fdfcf7] px-4 py-5">
              {isLoadingContent && (
                <div className="text-sm text-[#6b7a4a] scorecard-font-mono">
                  Loading documentation…
                </div>
              )}

              {error && (
                <div className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {showComingSoon && (
                <div className="rounded border border-[#8b956d] bg-white p-4 text-sm text-[#3d4a21]">
                  Documentation coming soon for this section.
                </div>
              )}

              {hasContent && !isLoadingContent && !error && (
                <article
                  className="doc-content"
                  dangerouslySetInnerHTML={{ __html: contentHtml! }}
                />
              )}
            </section>
          </div>
        </div>
      </aside>
    </>
  );
}

