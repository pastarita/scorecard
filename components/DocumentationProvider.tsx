"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { DocumentationSidebar } from "./DocumentationSidebar";
import { DocumentationCommandMenu } from "./DocumentationCommandMenu";
import { FloatingDocumentationButton } from "./FloatingDocumentationButton";
import {
  DOCUMENTATION_STRUCTURE,
  flattenDocumentation,
  type DocumentationSection,
} from "@/lib/documentation-structure";
import { renderMarkdown } from "@/lib/markdown";

interface DocumentationContextType {
  openSidebar: () => void;
  closeSidebar: () => void;
  openCommandMenu: () => void;
  isSidebarOpen: boolean;
  isCommandMenuOpen: boolean;
}

const DocumentationContext = createContext<DocumentationContextType | null>(null);

export function useDocumentation() {
  const context = useContext(DocumentationContext);
  if (!context) {
    throw new Error("useDocumentation must be used within DocumentationProvider");
  }
  return context;
}

interface DocumentationProviderProps {
  children: React.ReactNode;
}

export function DocumentationProvider({ children }: DocumentationProviderProps) {
  const initialSection = useMemo(
    () => flattenDocumentation(DOCUMENTATION_STRUCTURE).find((section) => section.content) ?? null,
    []
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<DocumentationSection | null>(initialSection);
  const [contentMarkdown, setContentMarkdown] = useState<string>("");
  const [contentHtml, setContentHtml] = useState<string>("");
  const [contentError, setContentError] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command K (Mac) or Ctrl K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandMenuOpen(true);
      }
      
      // Escape to close
      if (e.key === "Escape") {
        if (commandMenuOpen) {
          setCommandMenuOpen(false);
        } else if (sidebarOpen) {
          setSidebarOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandMenuOpen, sidebarOpen]);

  useEffect(() => {
    if (!sidebarOpen && !commandMenuOpen && !selectedSection) {
      return;
    }

    if (!selectedSection?.content) {
      setContentMarkdown("");
      setContentHtml("");
      setContentError(null);
      return;
    }

    const controller = new AbortController();
    let isMounted = true;

    setLoadingContent(true);
    setContentError(null);

    fetch(selectedSection.content, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load documentation (${response.status})`);
        }
        return response.text();
      })
      .then((markdown) => {
        if (isMounted) {
          setContentMarkdown(markdown);
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted && isMounted) {
          setContentMarkdown("");
          setContentHtml("");
          setContentError(error instanceof Error ? error.message : "Unknown error");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoadingContent(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [selectedSection, sidebarOpen, commandMenuOpen]);

  useEffect(() => {
    if (!contentMarkdown) {
      setContentHtml("");
      return;
    }

    setContentHtml(renderMarkdown(contentMarkdown));
  }, [contentMarkdown]);

  const handleSelectSection = (section: DocumentationSection) => {
    setSelectedSection(section);
    setSidebarOpen(true);
    // In the future, this could navigate to the documentation page
    // or load the content dynamically
  };

  useEffect(() => {
    if (sidebarOpen && !selectedSection && initialSection) {
      setSelectedSection(initialSection);
    }
  }, [sidebarOpen, selectedSection, initialSection]);

  const contextValue: DocumentationContextType = {
    openSidebar: () => setSidebarOpen(true),
    closeSidebar: () => setSidebarOpen(false),
    openCommandMenu: () => setCommandMenuOpen(true),
    isSidebarOpen: sidebarOpen,
    isCommandMenuOpen: commandMenuOpen,
  };

  return (
    <DocumentationContext.Provider value={contextValue}>
      {children}
      <FloatingDocumentationButton />
      <DocumentationSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        selectedPath={selectedSection?.path}
        selectedSection={selectedSection}
        onSelect={handleSelectSection}
        contentHtml={contentHtml}
        isLoadingContent={loadingContent}
        error={contentError}
      />
      <DocumentationCommandMenu
        open={commandMenuOpen}
        onOpenChange={setCommandMenuOpen}
        onSelect={handleSelectSection}
      />
    </DocumentationContext.Provider>
  );
}

