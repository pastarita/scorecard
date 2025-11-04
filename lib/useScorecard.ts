/**
 * React hooks for scorecard data management
 */

import { useState, useCallback, useEffect } from "react";
import type { ScorecardData, Hole, Shot } from "@/types/scorecard";
import { exportToJSON, exportToCSV } from "./calculations";

const STORAGE_KEY = "hyperdimensional-golf-scorecard";

/**
 * Hook for managing scorecard data with local storage persistence
 */
export function useScorecard(initialData: ScorecardData) {
  const [data, setData] = useState<ScorecardData>(() => {
    // Try to load from localStorage first
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error("Failed to parse stored scorecard data:", e);
        }
      }
    }
    return initialData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data]);

  /**
   * Update a hole's information
   */
  const updateHole = useCallback((holeNumber: number, updates: Partial<Hole>) => {
    setData((prev) => ({
      ...prev,
      course: {
        ...prev.course,
        holes: prev.course.holes.map((hole) =>
          hole.number === holeNumber ? { ...hole, ...updates } : hole
        ),
      },
    }));
  }, []);

  /**
   * Add a shot to a hole
   */
  const addShot = useCallback((holeNumber: number, shot: Shot) => {
    setData((prev) => ({
      ...prev,
      course: {
        ...prev.course,
        holes: prev.course.holes.map((hole) =>
          hole.number === holeNumber
            ? { ...hole, shots: [...hole.shots, shot] }
            : hole
        ),
      },
    }));
  }, []);

  /**
   * Update a shot within a hole
   */
  const updateShot = useCallback(
    (holeNumber: number, shotNumber: number, updates: Partial<Shot>) => {
      setData((prev) => ({
        ...prev,
        course: {
          ...prev.course,
          holes: prev.course.holes.map((hole) =>
            hole.number === holeNumber
              ? {
                  ...hole,
                  shots: hole.shots.map((shot) =>
                    shot.number === shotNumber ? { ...shot, ...updates } : shot
                  ),
                }
              : hole
          ),
        },
      }));
    },
    []
  );

  /**
   * Remove a shot from a hole
   */
  const removeShot = useCallback((holeNumber: number, shotNumber: number) => {
    setData((prev) => ({
      ...prev,
      course: {
        ...prev.course,
        holes: prev.course.holes.map((hole) =>
          hole.number === holeNumber
            ? {
                ...hole,
                shots: hole.shots.filter((shot) => shot.number !== shotNumber),
              }
            : hole
        ),
      },
    }));
  }, []);

  /**
   * Import data from JSON string
   */
  const importData = useCallback((jsonString: string) => {
    try {
      const imported = JSON.parse(jsonString) as ScorecardData;
      setData(imported);
      return { success: true, message: "Data imported successfully" };
    } catch (e) {
      return { success: false, message: `Import failed: ${e}` };
    }
  }, []);

  /**
   * Export data as JSON
   */
  const exportJSON = useCallback(() => {
    return exportToJSON(data);
  }, [data]);

  /**
   * Export data as CSV
   */
  const exportCSV = useCallback(() => {
    return exportToCSV(data);
  }, [data]);

  /**
   * Download data as JSON file
   */
  const downloadJSON = useCallback(() => {
    const json = exportToJSON(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scorecard-${data.project.product.replace(/\s+/g, "-")}-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [data]);

  /**
   * Download data as CSV file
   */
  const downloadCSV = useCallback(() => {
    const csv = exportToCSV(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scorecard-${data.project.product.replace(/\s+/g, "-")}-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [data]);

  /**
   * Reset to initial data
   */
  const reset = useCallback(() => {
    setData(initialData);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [initialData]);

  /**
   * Clear all data
   */
  const clear = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    data,
    setData,
    updateHole,
    addShot,
    updateShot,
    removeShot,
    importData,
    exportJSON,
    exportCSV,
    downloadJSON,
    downloadCSV,
    reset,
    clear,
  };
}

/**
 * Hook for file upload handling
 */
export function useFileUpload(onImport: (data: string) => void) {
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onImport(content);
      };
      reader.readAsText(file);
    },
    [onImport]
  );

  return { handleFileUpload };
}

/**
 * Hook for managing tab state with URL persistence
 */
export function useTabState(defaultTab: string) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    // Read from URL on mount
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const setTab = useCallback((tab: string) => {
    setActiveTab(tab);
    // Update URL
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  return [activeTab, setTab] as const;
}

