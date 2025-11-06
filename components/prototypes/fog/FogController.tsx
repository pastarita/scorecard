"use client";

import { useState } from "react";
import type { FogIntensity, WeatherCondition, WindDirection } from "./FogOverlay";

interface FogState {
  fogIntensity: FogIntensity;
  weatherCondition: WeatherCondition;
  windDirection: WindDirection;
  windStrength: number; // 0-1
  clarity: number; // 0-1
}

interface FogControllerProps {
  fogState: FogState;
  onFogStateChange: (state: FogState) => void;
  isEditable?: boolean;
}

/**
 * FogController - Interactive component for editing fog/weather conditions
 * 
 * Purpose: Allows contemplation and shaping of prompt understanding
 * Semantic Domain: fog/interaction
 * 
 * Features:
 * - Edit fog intensity (none to dense)
 * - Edit weather conditions (clear to stormy)
 * - Edit wind direction and strength
 * - Adjust clarity (how well we understand the feature)
 * - Clear fog as understanding improves
 * 
 * Used as a contemplation tool to visualize and shape understanding
 */
export function FogController({
  fogState,
  onFogStateChange,
  isEditable = true,
}: FogControllerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const fogIntensities: FogIntensity[] = ["none", "light", "medium", "heavy", "dense"];
  const weatherConditions: WeatherCondition[] = ["clear", "windy", "rainy", "stormy"];
  const windDirections: WindDirection[] = [
    "none",
    "north",
    "south",
    "east",
    "west",
    "northeast",
    "northwest",
    "southeast",
    "southwest",
  ];

  const updateFogState = (updates: Partial<FogState>) => {
    onFogStateChange({ ...fogState, ...updates });
  };

  const clearFog = () => {
    updateFogState({
      fogIntensity: "none",
      weatherCondition: "clear",
      windDirection: "none",
      windStrength: 0,
      clarity: 1.0,
    });
  };

  const increaseClarity = () => {
    const newClarity = Math.min(1.0, fogState.clarity + 0.1);
    updateFogState({ clarity: newClarity });
  };

  const decreaseClarity = () => {
    const newClarity = Math.max(0.0, fogState.clarity - 0.1);
    updateFogState({ clarity: newClarity });
  };

  if (!isEditable) {
    return null;
  }

  return (
    <div className="absolute bottom-1 left-1 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#3d4a21] text-white text-xs px-2 py-1 rounded hover:bg-[#556b2f] transition-colors shadow-md"
        title="Edit fog/weather conditions"
      >
        {isOpen ? "✕" : "🌫️"}
      </button>

      {/* Control Panel */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 bg-white border-2 border-[#8b956d] rounded p-3 shadow-lg min-w-[200px]">
          <div className="text-xs font-semibold text-[#3d4a21] mb-2">
            Fog & Weather Control
          </div>

          {/* Clarity Slider */}
          <div className="mb-3">
            <label className="text-xs text-[#556b2f] mb-1 block">
              Clarity: {Math.round(fogState.clarity * 100)}%
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseClarity}
                className="w-6 h-6 flex items-center justify-center bg-[#8b956d] text-white rounded hover:bg-[#556b2f] transition-colors"
              >
                −
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={fogState.clarity}
                onChange={(e) => updateFogState({ clarity: parseFloat(e.target.value) })}
                className="flex-1"
              />
              <button
                onClick={increaseClarity}
                className="w-6 h-6 flex items-center justify-center bg-[#8b956d] text-white rounded hover:bg-[#556b2f] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Fog Intensity */}
          <div className="mb-3">
            <label className="text-xs text-[#556b2f] mb-1 block">Fog Intensity</label>
            <select
              value={fogState.fogIntensity}
              onChange={(e) => updateFogState({ fogIntensity: e.target.value as FogIntensity })}
              className="w-full text-xs border border-[#8b956d] rounded px-2 py-1"
            >
              {fogIntensities.map((intensity) => (
                <option key={intensity} value={intensity}>
                  {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Weather Condition */}
          <div className="mb-3">
            <label className="text-xs text-[#556b2f] mb-1 block">Weather</label>
            <select
              value={fogState.weatherCondition}
              onChange={(e) => updateFogState({ weatherCondition: e.target.value as WeatherCondition })}
              className="w-full text-xs border border-[#8b956d] rounded px-2 py-1"
            >
              {weatherConditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition.charAt(0).toUpperCase() + condition.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Wind Direction */}
          <div className="mb-3">
            <label className="text-xs text-[#556b2f] mb-1 block">Wind Direction</label>
            <select
              value={fogState.windDirection}
              onChange={(e) => updateFogState({ windDirection: e.target.value as WindDirection })}
              className="w-full text-xs border border-[#8b956d] rounded px-2 py-1"
            >
              {windDirections.map((direction) => (
                <option key={direction} value={direction}>
                  {direction.charAt(0).toUpperCase() + direction.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Wind Strength */}
          <div className="mb-3">
            <label className="text-xs text-[#556b2f] mb-1 block">
              Wind Strength: {Math.round(fogState.windStrength * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={fogState.windStrength}
              onChange={(e) => updateFogState({ windStrength: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Clear Fog Button */}
          <button
            onClick={clearFog}
            className="w-full bg-[#6b9d5b] text-white text-xs px-2 py-1 rounded hover:bg-[#4a7c2c] transition-colors"
          >
            Clear All Fog
          </button>
        </div>
      )}
    </div>
  );
}

