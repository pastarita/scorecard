"use client";

import { useState, useMemo, useEffect } from "react";
import type { Hole } from "@/types/scorecard";
import type { FogIntensity, WeatherCondition, WindDirection } from "./FogOverlay";

export interface FogState {
  fogIntensity: FogIntensity;
  weatherCondition: WeatherCondition;
  windDirection: WindDirection;
  windStrength: number; // 0-1
  clarity: number; // 0-1
}

/**
 * useFogState - Hook to manage fog state based on hole implementation
 * 
 * Purpose: Calculates fog state from hole data (shots, confidence, status)
 * Semantic Domain: fog/state
 * 
 * Logic:
 * - Clarity increases with more shots (implementation iterations)
 * - Clarity increases with higher confidence
 * - Fog clears as clarity increases
 * - Weather/wind represent external factors
 * 
 * Returns fog state and update function
 */
export function useFogState(hole: Hole): [FogState, (state: FogState) => void] {
  // Calculate clarity from hole data
  const calculatedClarity = useMemo(() => {
    const hasShots = hole.shots.length > 0;
    const isComplete = hole.status === "complete";
    const isInProgress = hole.status === "in_progress";

    if (isComplete) {
      // Complete holes are fully clear
      return 1.0;
    }

    if (!hasShots) {
      // No shots = completely foggy
      return 0.0;
    }

    // Calculate average confidence from shots
    const avgConfidence = hole.shots.reduce((sum, shot) => sum + (shot.confidence || 0.5), 0) / hole.shots.length;

    // Clarity increases with:
    // - Number of shots (more iterations = more clarity)
    // - Average confidence (higher confidence = more clarity)
    const shotClarity = Math.min(1.0, hole.shots.length * 0.2); // Each shot adds 20% clarity, max 100%
    const confidenceClarity = avgConfidence; // Confidence directly contributes

    // Combine factors
    const baseClarity = (shotClarity + confidenceClarity) / 2;

    // In progress gets a boost
    const progressBoost = isInProgress ? 0.1 : 0;

    return Math.min(1.0, baseClarity + progressBoost);
  }, [hole.shots, hole.status]);

  // Calculate fog intensity from clarity
  const calculatedFogIntensity = useMemo((): FogIntensity => {
    if (calculatedClarity >= 0.9) return "none";
    if (calculatedClarity >= 0.7) return "light";
    if (calculatedClarity >= 0.5) return "medium";
    if (calculatedClarity >= 0.3) return "heavy";
    return "dense";
  }, [calculatedClarity]);

  // Initial state based on hole data
  const [fogState, setFogState] = useState<FogState>(() => ({
    fogIntensity: calculatedFogIntensity,
    weatherCondition: "clear",
    windDirection: "none",
    windStrength: 0,
    clarity: calculatedClarity,
  }));

  // Update clarity when hole data changes
  useEffect(() => {
    setFogState((prev) => ({
      ...prev,
      clarity: calculatedClarity,
      fogIntensity: calculatedFogIntensity,
    }));
  }, [calculatedClarity, calculatedFogIntensity]);

  return [fogState, setFogState];
}

