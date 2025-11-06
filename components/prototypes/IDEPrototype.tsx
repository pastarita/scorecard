"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { ScorecardData } from "@/types/scorecard";
import { HorizontalScorecardBar } from "./HorizontalScorecardBar";
import { EditorPanel } from "./EditorPanel";
import { SidebarPanel } from "./SidebarPanel";
import { TerminalPanel } from "./TerminalPanel";
import { ActionPane } from "./ActionPane";

interface IDEPrototypeProps {
  data: ScorecardData;
}

interface PanelSizes {
  sidebar: number; // width in pixels
  editor: number; // width in pixels
  terminal: number; // height in pixels
  scorecard: number; // width percentage (default 95)
  scorecardHeight: number; // height in pixels (default auto)
}

export function IDEPrototype({ data }: IDEPrototypeProps) {
  const [panelSizes, setPanelSizes] = useState<PanelSizes>({
    sidebar: 250,
    editor: 600,
    terminal: 200,
    scorecard: 95, // percentage
    scorecardHeight: 0, // 0 means auto, will be set based on content
  });

  const [isResizing, setIsResizing] = useState<{
    type: "sidebar" | "terminal" | "scorecard" | "scorecardHeight" | null;
  }>({ type: null });

  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const handleSidebarResize = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const newWidth = e.clientX;
    const minWidth = 150;
    const maxWidth = containerRef.current.clientWidth * 0.4;
    setPanelSizes((prev) => ({
      ...prev,
      sidebar: Math.max(minWidth, Math.min(maxWidth, newWidth)),
    }));
  }, []);

  const handleTerminalResize = useCallback((e: MouseEvent) => {
    if (!mainContentRef.current) return;
    const containerHeight = mainContentRef.current.clientHeight;
    const containerTop = mainContentRef.current.getBoundingClientRect().top;
    const newHeight = containerHeight - (e.clientY - containerTop);
    const minHeight = 100;
    const maxHeight = containerHeight * 0.6;
    setPanelSizes((prev) => ({
      ...prev,
      terminal: Math.max(minHeight, Math.min(maxHeight, newHeight)),
    }));
  }, []);

  const handleScorecardResize = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    const newWidthPercent = (e.clientX / containerWidth) * 100;
    const minPercent = 50; // Minimum 50% for scorecard
    const maxPercent = 98; // Maximum 98% for scorecard
    setPanelSizes((prev) => ({
      ...prev,
      scorecard: Math.max(minPercent, Math.min(maxPercent, newWidthPercent)),
    }));
  }, []);

  const handleScorecardHeightResize = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.getBoundingClientRect().top;
    const newHeight = e.clientY - containerTop;
    const minHeight = 150; // Minimum height for scorecard
    const maxHeight = containerRef.current.clientHeight * 0.6; // Maximum 60% of container
    setPanelSizes((prev) => ({
      ...prev,
      scorecardHeight: Math.max(minHeight, Math.min(maxHeight, newHeight)),
    }));
  }, []);

  useEffect(() => {
    if (isResizing.type === "sidebar") {
      const handleMouseMove = (e: MouseEvent) => handleSidebarResize(e);
      const handleMouseUp = () => setIsResizing({ type: null });

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    } else if (isResizing.type === "terminal") {
      const handleMouseMove = (e: MouseEvent) => handleTerminalResize(e);
      const handleMouseUp = () => setIsResizing({ type: null });

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    } else if (isResizing.type === "scorecard") {
      const handleMouseMove = (e: MouseEvent) => handleScorecardResize(e);
      const handleMouseUp = () => setIsResizing({ type: null });

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    } else if (isResizing.type === "scorecardHeight") {
      const handleMouseMove = (e: MouseEvent) => handleScorecardHeightResize(e);
      const handleMouseUp = () => setIsResizing({ type: null });

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizing, handleSidebarResize, handleTerminalResize, handleScorecardResize, handleScorecardHeightResize]);

  const editorWidth = `calc(100% - ${panelSizes.sidebar}px)`;

  return (
    <div ref={containerRef} className="flex flex-col h-full w-full">
      {/* Scorecard Container - Super Ordinal Container */}
      <div 
        className="flex w-full relative overflow-hidden"
        style={{ 
          height: panelSizes.scorecardHeight > 0 
            ? `${panelSizes.scorecardHeight}px` 
            : 'auto',
          minHeight: '150px'
        }}
      >
        {/* Scorecard Section - 95% default */}
        <div 
          className="flex-shrink-0 overflow-hidden h-full"
          style={{ width: `${panelSizes.scorecard}%` }}
        >
          <HorizontalScorecardBar data={data} />
        </div>

        {/* Vertical Resizer */}
        <div
          className="w-1 bg-[#2d2d2d] hover:bg-[#3d3d3d] cursor-ew-resize transition-colors flex-shrink-0 z-10"
          onMouseDown={() => setIsResizing({ type: "scorecard" })}
        />

        {/* Generic Action Pane - 5% default, slightly yellow */}
        <div 
          className="flex-shrink-0 bg-[#fef9e7] border-l-2 border-[#f4d03f] overflow-hidden h-full"
          style={{ width: `${100 - panelSizes.scorecard}%` }}
        >
          <ActionPane data={data} />
        </div>
      </div>

      {/* Horizontal Resizer for Scorecard Height */}
      <div
        className="h-1 bg-[#2d2d2d] hover:bg-[#3d3d3d] cursor-ns-resize transition-colors flex-shrink-0 z-10"
        onMouseDown={() => setIsResizing({ type: "scorecardHeight" })}
      />

      {/* Main IDE Content */}
      <div ref={mainContentRef} className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="relative" style={{ width: `${panelSizes.sidebar}px` }}>
          <SidebarPanel />
          {/* Sidebar Resizer */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1 bg-[#2d2d2d] hover:bg-[#3d3d3d] cursor-ew-resize transition-colors z-10"
            onMouseDown={() => setIsResizing({ type: "sidebar" })}
          />
        </div>

        {/* Editor Area */}
        <div
          className="flex flex-col flex-1"
          style={{ width: editorWidth }}
        >
          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            <EditorPanel />
          </div>

          {/* Terminal Resizer */}
          <div
            className="h-1 bg-[#2d2d2d] hover:bg-[#3d3d3d] cursor-ns-resize transition-colors"
            onMouseDown={() => setIsResizing({ type: "terminal" })}
          />

          {/* Terminal */}
          <div style={{ height: `${panelSizes.terminal}px` }}>
            <TerminalPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

