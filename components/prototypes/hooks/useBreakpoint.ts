"use client";

import { useState, useEffect } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

interface BreakpointState {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

const BREAKPOINTS = {
  mobile: 640,   // sm
  tablet: 1024,  // lg
  desktop: 1280, // xl
} as const;

/**
 * useBreakpoint - Hook to detect current breakpoint
 * 
 * Purpose: Provides responsive breakpoint detection for components
 * Semantic Domain: hooks/responsive
 * 
 * Returns:
 * - breakpoint: Current breakpoint name (mobile/tablet/desktop)
 * - isMobile: Boolean for mobile (< 640px)
 * - isTablet: Boolean for tablet (640px - 1024px)
 * - isDesktop: Boolean for desktop (> 1024px)
 * - width: Current window width
 * 
 * Uses window.matchMedia for efficient breakpoint detection
 */
export function useBreakpoint(): BreakpointState {
  const [breakpointState, setBreakpointState] = useState<BreakpointState>(() => {
    // Initialize with current window size (SSR-safe)
    if (typeof window === "undefined") {
      return {
        breakpoint: "desktop",
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        width: 1280,
      };
    }

    const width = window.innerWidth;
    return {
      breakpoint: getBreakpoint(width),
      isMobile: width < BREAKPOINTS.mobile,
      isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
      isDesktop: width >= BREAKPOINTS.tablet,
      width,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const breakpoint = getBreakpoint(width);
      
      setBreakpointState({
        breakpoint,
        isMobile: width < BREAKPOINTS.mobile,
        isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
        isDesktop: width >= BREAKPOINTS.tablet,
        width,
      });
    };

    // Use matchMedia for efficient breakpoint detection
    const mobileQuery = window.matchMedia(`(max-width: ${BREAKPOINTS.mobile - 1}px)`);
    const tabletQuery = window.matchMedia(
      `(min-width: ${BREAKPOINTS.mobile}px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`
    );
    const desktopQuery = window.matchMedia(`(min-width: ${BREAKPOINTS.tablet}px)`);

    // Initial check
    handleResize();

    // Listen for changes
    mobileQuery.addEventListener("change", handleResize);
    tabletQuery.addEventListener("change", handleResize);
    desktopQuery.addEventListener("change", handleResize);

    // Fallback to resize event
    window.addEventListener("resize", handleResize);

    return () => {
      mobileQuery.removeEventListener("change", handleResize);
      tabletQuery.removeEventListener("change", handleResize);
      desktopQuery.removeEventListener("change", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpointState;
}

function getBreakpoint(width: number): Breakpoint {
  if (width < BREAKPOINTS.mobile) {
    return "mobile";
  } else if (width < BREAKPOINTS.tablet) {
    return "tablet";
  } else {
    return "desktop";
  }
}

