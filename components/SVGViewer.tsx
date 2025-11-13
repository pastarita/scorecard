"use client";

import { useState, useRef, useEffect } from "react";

interface Diagram {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  tags: string[];
}

interface Manifest {
  diagrams: Diagram[];
  metadata: {
    version: string;
    created: string;
    description: string;
    categories: string[];
  };
}

interface SVGViewerProps {
  manifest: Manifest;
}

export function SVGViewer({ manifest }: SVGViewerProps) {
  const [selectedDiagram, setSelectedDiagram] = useState<Diagram | null>(
    manifest.diagrams[0] || null
  );
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  // Filter diagrams by category
  const filteredDiagrams =
    selectedCategory === "all"
      ? manifest.diagrams
      : manifest.diagrams.filter((d) => d.category === selectedCategory);

  // Reset zoom and pan when switching diagrams
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [selectedDiagram?.id]);

  // Prevent body scroll when in full screen mode
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullScreen]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle keyboard shortcuts when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Toggle full screen with F key
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        setIsFullScreen((prev) => !prev);
        return;
      }

      // Exit full screen with Escape
      if (e.key === "Escape" && isFullScreen) {
        e.preventDefault();
        setIsFullScreen(false);
        return;
      }

      // Only handle navigation/controls when in full screen or when not in input
      if (isFullScreen || (!(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement))) {
        // Navigate diagrams with Left/Right arrows
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (e.shiftKey) {
            // Shift + Left: Pan left
            setPan((p) => ({ ...p, x: p.x + 50 }));
          } else {
            // Left: Previous diagram
            const currentIndex = filteredDiagrams.findIndex(
              (d) => d.id === selectedDiagram?.id
            );
            if (currentIndex > 0) {
              setSelectedDiagram(filteredDiagrams[currentIndex - 1]);
            }
          }
          return;
        }

        if (e.key === "ArrowRight") {
          e.preventDefault();
          if (e.shiftKey) {
            // Shift + Right: Pan right
            setPan((p) => ({ ...p, x: p.x - 50 }));
          } else {
            // Right: Next diagram
            const currentIndex = filteredDiagrams.findIndex(
              (d) => d.id === selectedDiagram?.id
            );
            if (currentIndex < filteredDiagrams.length - 1) {
              setSelectedDiagram(filteredDiagrams[currentIndex + 1]);
            }
          }
          return;
        }

        // Pan with Shift + Up/Down arrows
        if (e.key === "ArrowUp" && e.shiftKey) {
          e.preventDefault();
          setPan((p) => ({ ...p, y: p.y + 50 }));
          return;
        }

        if (e.key === "ArrowDown" && e.shiftKey) {
          e.preventDefault();
          setPan((p) => ({ ...p, y: p.y - 50 }));
          return;
        }

        // Zoom with +/- keys
        if (e.key === "+" || e.key === "=") {
          e.preventDefault();
          setZoom((z) => Math.min(5, z + 0.2));
          return;
        }

        if (e.key === "-" || e.key === "_") {
          e.preventDefault();
          setZoom((z) => Math.max(0.1, z - 0.2));
          return;
        }

        // Zoom with Up/Down arrows (when not holding Shift)
        if (e.key === "ArrowUp" && !e.shiftKey) {
          e.preventDefault();
          setZoom((z) => Math.min(5, z + 0.2));
          return;
        }

        if (e.key === "ArrowDown" && !e.shiftKey) {
          e.preventDefault();
          setZoom((z) => Math.max(0.1, z - 0.2));
          return;
        }

        // Reset view with R key
        if (e.key === "r" || e.key === "R") {
          e.preventDefault();
          setZoom(1);
          setPan({ x: 0, y: 0 });
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen, selectedDiagram, filteredDiagrams]);

  // Handle mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = Math.max(0.1, Math.min(5, zoom + delta));
      setZoom(newZoom);
    }
  };

  // Handle panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      // Left mouse button
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Reset view
  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Zoom controls
  const zoomIn = () => setZoom((z) => Math.min(5, z + 0.2));
  const zoomOut = () => setZoom((z) => Math.max(0.1, z - 0.2));

  // Toggle full screen
  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  // Get SVG path - paths in manifest are already relative to public directory
  // Files are now in public/diagrams/, so paths like "/diagrams/file.svg" work directly
  const getSVGPath = (path: string) => {
    // Paths in manifest are already in format "/diagrams/..."
    // Just return as-is since Next.js serves public directory at root
    return path;
  };

  return (
    <div
      className={`flex flex-col lg:flex-row gap-6 ${
        isFullScreen
          ? "fixed inset-0 z-[9999] bg-[#f5f0e8] p-0"
          : "h-[calc(100vh-300px)]"
      }`}
    >
      {/* Sidebar - Diagram List */}
      {!isFullScreen && (
        <aside className="w-full lg:w-80 bg-white rounded-lg shadow-lg p-4 overflow-y-auto border border-[#8b956d]">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#3d4a21] mb-2 scorecard-font-serif">
            Diagrams
          </h2>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-[#8b956d] rounded text-sm scorecard-font-mono"
          >
            <option value="all">All Categories</option>
            {manifest.metadata.categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          {filteredDiagrams.map((diagram) => (
            <button
              key={diagram.id}
              onClick={() => setSelectedDiagram(diagram)}
              className={`
                w-full text-left p-3 rounded border transition-all
                ${
                  selectedDiagram?.id === diagram.id
                    ? "bg-[#d4e8d4] border-[#556b2f] shadow-md"
                    : "bg-[#faf8f3] border-[#8b956d] hover:bg-[#f5f0e8] hover:border-[#556b2f]"
                }
              `}
            >
              <div className="font-semibold text-sm text-[#3d4a21] mb-1 scorecard-font-serif">
                {diagram.title}
              </div>
              <div className="text-xs text-[#6b7a4a] mb-2 line-clamp-2">
                {diagram.description}
              </div>
              <div className="flex flex-wrap gap-1">
                {diagram.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-[#e8f0e8] text-[#556b2f] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </aside>
      )}

      {/* Main Viewer */}
      <div
        className={`flex-1 flex flex-col ${
          isFullScreen
            ? "bg-[#f5f0e8] border-0 shadow-none rounded-none"
            : "bg-white rounded-lg shadow-lg border border-[#8b956d]"
        } overflow-hidden`}
      >
        {/* Viewer Header */}
        {!isFullScreen && (
          <div className="p-4 border-b border-[#8b956d] bg-[#faf8f3]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-[#3d4a21] scorecard-font-serif">
                {selectedDiagram?.title || "No diagram selected"}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={zoomOut}
                  className="px-3 py-1 bg-[#8b956d] text-white rounded hover:bg-[#556b2f] text-sm"
                  aria-label="Zoom out"
                >
                  −
                </button>
                <span className="text-sm text-[#6b7a4a] scorecard-font-mono w-16 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={zoomIn}
                  className="px-3 py-1 bg-[#8b956d] text-white rounded hover:bg-[#556b2f] text-sm"
                  aria-label="Zoom in"
                >
                  +
                </button>
                <button
                  onClick={resetView}
                  className="px-3 py-1 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] text-sm"
                  aria-label="Reset view"
                >
                  Reset
                </button>
                <button
                  onClick={toggleFullScreen}
                  className="px-3 py-1 bg-[#3d4a21] text-white rounded hover:bg-[#2d3b16] text-sm"
                  aria-label="Enter full screen"
                >
                  ⛶ Full Screen
                </button>
              </div>
            </div>
            {selectedDiagram && (
              <p className="text-sm text-[#6b7a4a]">{selectedDiagram.description}</p>
            )}
          </div>
        )}

        {/* Full Screen Header Bar */}
        {isFullScreen && (
          <div className="absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm text-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-bold scorecard-font-serif">
                {selectedDiagram?.title || "No diagram selected"}
              </h3>
              {selectedDiagram && (
                <span className="text-sm text-gray-300">
                  {filteredDiagrams.findIndex((d) => d.id === selectedDiagram.id) + 1} / {filteredDiagrams.length}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-300 scorecard-font-mono">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={toggleFullScreen}
                className="px-4 py-2 bg-[#556b2f] text-white rounded hover:bg-[#3d4a21] text-sm"
                aria-label="Exit full screen"
              >
                Exit (Esc)
              </button>
            </div>
          </div>
        )}

        {/* SVG Container with Zoom and Pan */}
        <div
          ref={containerRef}
          className={`flex-1 overflow-hidden relative bg-[#f9f9f9] ${
            isFullScreen ? "h-screen" : ""
          }`}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {selectedDiagram ? (
            <div
              ref={svgRef}
              className="w-full h-full flex items-center justify-center"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                cursor: isPanning ? "grabbing" : "grab",
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={getSVGPath(selectedDiagram.path)}
                  alt={selectedDiagram.title}
                  className="max-w-full max-h-full object-contain select-none"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                  onError={(e) => {
                    // Fallback if image doesn't load
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement;
                    if (parent) {
                      target.style.display = "none";
                      const errorDiv = document.createElement("div");
                      errorDiv.className = "text-center p-8 text-[#6b7a4a] max-w-2xl";
                      errorDiv.innerHTML = `
                        <p class="text-lg font-semibold mb-2 text-[#cc0000]">SVG not found</p>
                        <p class="text-sm scorecard-font-mono mb-2">Path: ${selectedDiagram.path}</p>
                        <p class="text-xs mt-4">Please ensure the SVG file exists in the public directory</p>
                      `;
                      parent.appendChild(errorDiv);
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-[#6b7a4a]">
              <p>Select a diagram from the sidebar to view it</p>
            </div>
          )}

          {/* Zoom Instructions */}
          {!isFullScreen && (
            <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded shadow text-xs text-[#6b7a4a] scorecard-font-mono">
              <div>Ctrl/Cmd + Scroll: Zoom</div>
              <div>Click + Drag: Pan</div>
            </div>
          )}

          {/* Full Screen Keyboard Instructions */}
          {isFullScreen && (
            <div 
              className="absolute bottom-4 left-4 group"
              onMouseEnter={() => setShowKeyboardHelp(true)}
              onMouseLeave={() => setShowKeyboardHelp(false)}
            >
              {/* Small hover trigger - very subtle by default, more visible on hover */}
              <div
                className="w-1.5 h-1.5 bg-white/10 rounded-full opacity-30 group-hover:opacity-100 group-hover:bg-white/40 transition-all cursor-pointer"
                onClick={() => setShowKeyboardHelp((prev) => !prev)}
                aria-label="Show keyboard controls"
              />
              
              {/* Expanded help panel */}
              {showKeyboardHelp && (
                <div
                  className="absolute bottom-0 left-0 mb-2 bg-black/80 backdrop-blur-sm text-white px-4 py-3 rounded shadow-lg text-xs scorecard-font-mono min-w-[280px]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-sm">Keyboard Controls:</div>
                    <button
                      onClick={() => setShowKeyboardHelp(false)}
                      className="text-white/60 hover:text-white text-lg leading-none"
                      aria-label="Close help"
                    >
                      ×
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div><kbd className="px-1.5 py-0.5 bg-white/20 rounded">F</kbd> / <kbd className="px-1.5 py-0.5 bg-white/20 rounded">Esc</kbd> - Toggle Full Screen</div>
                    <div><kbd className="px-1.5 py-0.5 bg-white/20 rounded">←</kbd> / <kbd className="px-1.5 py-0.5 bg-white/20 rounded">→</kbd> - Navigate Diagrams</div>
                    <div><kbd className="px-1.5 py-0.5 bg-white/20 rounded">+</kbd> / <kbd className="px-1.5 py-0.5 bg-white/20 rounded">-</kbd> or <kbd className="px-1.5 py-0.5 bg-white/20 rounded">↑</kbd> / <kbd className="px-1.5 py-0.5 bg-white/20 rounded">↓</kbd> - Zoom</div>
                    <div><kbd className="px-1.5 py-0.5 bg-white/20 rounded">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-white/20 rounded">←→↑↓</kbd> - Pan</div>
                    <div><kbd className="px-1.5 py-0.5 bg-white/20 rounded">R</kbd> - Reset View</div>
                    <div className="mt-2 pt-2 border-t border-white/20">Ctrl/Cmd + Scroll: Zoom | Click + Drag: Pan</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

