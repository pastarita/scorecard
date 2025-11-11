"use client";

import type { ReactNode } from "react";
import type { Hole } from "@/types/scorecard";
import { HoleFrame } from "../HoleFrame";
import { FogOverlay } from "./FogOverlay";
import { FogController } from "./FogController";
import { useFogState } from "./useFogState";

interface FoggedHoleFrameProps {
  hole: Hole;
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  isEditable?: boolean;
}

/**
 * FoggedHoleFrame - HoleFrame with fog/weather overlay
 * 
 * Purpose: Wraps HoleFrame with fog visualization and control
 * Semantic Domain: fog/frame
 * 
 * Features:
 * - Shows fog/weather overlay based on hole implementation state
 * - Fog clears as understanding improves (more shots, higher confidence)
 * - Interactive fog controller for contemplation and prompt shaping
 * - Visual metaphor: fog = uncertainty, clarity = understanding
 * 
 * Metaphor:
 * - Initial implementation = dense fog (uncertainty)
 * - Each iteration (shot) = clearing fog (gaining clarity)
 * - Higher confidence = clearer understanding
 * - Interactive control = contemplation tool for prompt shaping
 */
export function FoggedHoleFrame({
  hole,
  children,
  isActive = false,
  className = "",
  isEditable = true,
}: FoggedHoleFrameProps) {
  const [fogState, setFogState] = useFogState(hole);

  return (
    <HoleFrame isActive={isActive} className={`relative ${className}`}>
      {children}
      
      {/* Fog Overlay - Use hole number as seed for deterministic rendering */}
      <FogOverlay
        fogIntensity={fogState.fogIntensity}
        weatherCondition={fogState.weatherCondition}
        windDirection={fogState.windDirection}
        windStrength={fogState.windStrength}
        clarity={fogState.clarity}
        seed={hole.number}
      />

      {/* Fog Controller - Interactive editing */}
      {isEditable && (
        <FogController
          fogState={fogState}
          onFogStateChange={setFogState}
          isEditable={isEditable}
        />
      )}
    </HoleFrame>
  );
}

