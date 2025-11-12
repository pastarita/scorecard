"use client";

import {
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";

interface UseResizeObserverOptions {
  onResize?: (size: { width: number; height: number }) => void;
}

/**
 * useResizeObserver - Hook to watch for container size changes
 * 
 * Purpose: Observes element size changes and provides current dimensions
 * Semantic Domain: hooks/resize
 * 
 * Uses ResizeObserver API to watch for size changes in a container element.
 * Returns the current width and height of the observed element.
 * 
 * Useful for components that need to respond to container size changes,
 * such as the HoleFrame component that needs to proportionally resize
 * with the scorecard container height.
 */
export function useResizeObserver<T extends HTMLElement = HTMLDivElement>(
  options?: UseResizeObserverOptions
): [MutableRefObject<T | null>, { width: number; height: number }] {
  const elementRef = useRef<T | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Initialize size
    const updateSize = () => {
      const { width, height } = element.getBoundingClientRect();
      setSize({ width, height });
      options?.onResize?.({ width, height });
    };

    // Initial measurement
    updateSize();

    // Create ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
        options?.onResize?.({ width, height });
      }
    });

    // Start observing
    resizeObserver.observe(element);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [options]);

  return [elementRef, size];
}

