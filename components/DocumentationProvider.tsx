"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { DocumentationSidebar } from "./DocumentationSidebar";
import { DocumentationCommandMenu } from "./DocumentationCommandMenu";
import { FloatingDocumentationButton } from "./FloatingDocumentationButton";
import type { DocumentationSection } from "@/lib/documentation-structure";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<DocumentationSection | null>(null);

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

  const handleSelectSection = (section: DocumentationSection) => {
    setSelectedSection(section);
    setSidebarOpen(true);
    // In the future, this could navigate to the documentation page
    // or load the content dynamically
  };

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
        onSelect={handleSelectSection}
      />
      <DocumentationCommandMenu
        open={commandMenuOpen}
        onOpenChange={setCommandMenuOpen}
        onSelect={handleSelectSection}
      />
    </DocumentationContext.Provider>
  );
}

