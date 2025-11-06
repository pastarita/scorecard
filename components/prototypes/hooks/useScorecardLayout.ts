"use client";

import { useMemo } from "react";
import { useBreakpoint, type Breakpoint } from "./useBreakpoint";

interface ScorecardLayout {
  gridCols: number;
  showLadder: boolean;
  ladderWidth: string;
  headerLayout: "stacked" | "horizontal";
  actionPaneVisible: boolean;
  summaryGridCols: number;
}

const SCORECARD_BREAKPOINTS = {
  // Grid columns
  mobileGridCols: 3,
  tabletGridCols: 5,
  desktopGridCols: 9,
  
  // Ladder visibility
  mobileLadderVisible: false,
  tabletLadderVisible: true,
  desktopLadderVisible: true,
  
  // Ladder width
  mobileLadderWidth: "0px",
  tabletLadderWidth: "24px",  // w-6
  desktopLadderWidth: "32px",  // w-8
  
  // Header layout
  mobileHeaderLayout: "stacked" as const,
  tabletHeaderLayout: "horizontal" as const,
  desktopHeaderLayout: "horizontal" as const,
  
  // Action pane
  mobileActionPaneVisible: false,
  tabletActionPaneVisible: true,
  desktopActionPaneVisible: true,
  
  // Summary grid columns
  mobileSummaryGridCols: 3,
  tabletSummaryGridCols: 5,
  desktopSummaryGridCols: 9,
} as const;

/**
 * useScorecardLayout - Hook to get responsive layout configuration
 * 
 * Purpose: Provides responsive layout configuration for scorecard components
 * Semantic Domain: hooks/responsive
 * 
 * Returns layout configuration based on current breakpoint:
 * - gridCols: Number of columns for hole grid (3/5/9)
 * - showLadder: Whether to show ladder component
 * - ladderWidth: Width of ladder component
 * - headerLayout: Header layout style (stacked/horizontal)
 * - actionPaneVisible: Whether action pane is visible
 * - summaryGridCols: Number of columns for summary grid (3/5/9)
 * 
 * Uses useBreakpoint hook to determine current breakpoint
 */
export function useScorecardLayout(): ScorecardLayout {
  const { breakpoint, isMobile, isTablet, isDesktop } = useBreakpoint();

  return useMemo(() => {
    if (isMobile) {
      return {
        gridCols: SCORECARD_BREAKPOINTS.mobileGridCols,
        showLadder: SCORECARD_BREAKPOINTS.mobileLadderVisible,
        ladderWidth: SCORECARD_BREAKPOINTS.mobileLadderWidth,
        headerLayout: SCORECARD_BREAKPOINTS.mobileHeaderLayout,
        actionPaneVisible: SCORECARD_BREAKPOINTS.mobileActionPaneVisible,
        summaryGridCols: SCORECARD_BREAKPOINTS.mobileSummaryGridCols,
      };
    } else if (isTablet) {
      return {
        gridCols: SCORECARD_BREAKPOINTS.tabletGridCols,
        showLadder: SCORECARD_BREAKPOINTS.tabletLadderVisible,
        ladderWidth: SCORECARD_BREAKPOINTS.tabletLadderWidth,
        headerLayout: SCORECARD_BREAKPOINTS.tabletHeaderLayout,
        actionPaneVisible: SCORECARD_BREAKPOINTS.tabletActionPaneVisible,
        summaryGridCols: SCORECARD_BREAKPOINTS.tabletSummaryGridCols,
      };
    } else {
      // Desktop
      return {
        gridCols: SCORECARD_BREAKPOINTS.desktopGridCols,
        showLadder: SCORECARD_BREAKPOINTS.desktopLadderVisible,
        ladderWidth: SCORECARD_BREAKPOINTS.desktopLadderWidth,
        headerLayout: SCORECARD_BREAKPOINTS.desktopHeaderLayout,
        actionPaneVisible: SCORECARD_BREAKPOINTS.desktopActionPaneVisible,
        summaryGridCols: SCORECARD_BREAKPOINTS.desktopSummaryGridCols,
      };
    }
  }, [breakpoint, isMobile, isTablet, isDesktop]);
}

