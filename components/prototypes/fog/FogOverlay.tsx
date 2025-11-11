"use client";

import { useMemo, useState, useEffect } from "react";

export type FogIntensity = "none" | "light" | "medium" | "heavy" | "dense";
export type WeatherCondition = "clear" | "windy" | "rainy" | "stormy";
export type WindDirection = "north" | "south" | "east" | "west" | "northeast" | "northwest" | "southeast" | "southwest" | "none";

interface FogOverlayProps {
  fogIntensity: FogIntensity;
  weatherCondition: WeatherCondition;
  windDirection: WindDirection;
  windStrength: number; // 0-1, where 0 is no wind, 1 is strong wind
  clarity: number; // 0-1, where 0 is completely foggy, 1 is completely clear
  seed?: number; // Seed for deterministic random generation (e.g., hole number)
  className?: string;
}

/**
 * Seeded random number generator for deterministic fog particles
 * Ensures SSR and client render the same values
 */
function seededRandom(seed: number): () => number {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

/**
 * FogOverlay - Visual representation of uncertainty and clarity
 * 
 * Purpose: Represents the "fog of uncertainty" around a feature/implementation
 * Semantic Domain: fog/visualization
 * 
 * Metaphor:
 * - Fog = Uncertainty about the feature/implementation
 * - Weather = External factors affecting implementation
 * - Wind = Direction and strength of understanding
 * - Clarity = How well we understand the feature (0 = foggy, 1 = clear)
 * 
 * As implementation progresses (more shots, higher confidence), fog clears
 * Interactive component allows contemplation and prompt shaping
 */
export function FogOverlay({
  fogIntensity,
  weatherCondition,
  windDirection,
  windStrength,
  clarity,
  seed = 0,
  className = "",
}: FogOverlayProps) {
  // Track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate fog opacity based on clarity (inverse relationship)
  // Round to 3 decimal places to ensure SSR/client consistency
  const fogOpacity = useMemo(() => {
    // Clarity 1.0 = no fog (opacity 0), Clarity 0.0 = dense fog (opacity 0.8)
    const opacity = Math.max(0, 0.8 * (1 - clarity));
    return Math.round(opacity * 1000) / 1000; // Round to 3 decimal places
  }, [clarity]);

  // Calculate weather opacity (lighter than fog)
  const weatherOpacity = useMemo(() => {
    if (weatherCondition === "clear") return 0;
    const opacity = Math.max(0, 0.4 * (1 - clarity));
    return Math.round(opacity * 1000) / 1000; // Round to 3 decimal places
  }, [weatherCondition, clarity]);

  // Wind visualization
  const windOpacity = useMemo(() => {
    if (windDirection === "none" || windStrength === 0) return 0;
    const opacity = Math.max(0, 0.3 * windStrength * (1 - clarity));
    return Math.round(opacity * 1000) / 1000; // Round to 3 decimal places
  }, [windDirection, windStrength, clarity]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Fog Layer - Represents uncertainty */}
      {fogOpacity > 0 && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60"
          style={{
            opacity: fogOpacity,
            mixBlendMode: "overlay",
          }}
        >
          {/* Fog particles effect - Using seeded random for SSR consistency */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <filter id={`fog-filter-${seed}`}>
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
            </defs>
            {useMemo(() => {
              // Don't render particles during SSR
              if (!isMounted || fogOpacity <= 0) return null;
              
              const random = seededRandom(seed);
              // Use fixed maximum count to ensure deterministic array length
              const maxParticles = 20;
              // Round particle count to ensure consistency
              const particleCount = Math.floor(maxParticles * Math.round(fogOpacity * 100) / 100);
              
              // Pre-generate all particles deterministically
              const particles: Array<{ cx: number; cy: number; r: number; opacity: number }> = [];
              for (let i = 0; i < particleCount; i++) {
                const cx = random() * 100;
                const cy = random() * 100;
                const r = random() * 3 + 1;
                const opacity = 0.3 * fogOpacity;
                particles.push({
                  cx: Math.round(cx * 100) / 100, // Round to 2 decimal places
                  cy: Math.round(cy * 100) / 100,
                  r: Math.round(r * 100) / 100,
                  opacity: Math.round(opacity * 1000) / 1000,
                });
              }
              
              return particles.map((particle, i) => (
                <circle
                  key={`fog-${seed}-${i}`}
                  cx={`${particle.cx}%`}
                  cy={`${particle.cy}%`}
                  r={particle.r}
                  fill="white"
                  opacity={particle.opacity}
                  filter={`url(#fog-filter-${seed})`}
                />
              ));
            }, [fogOpacity, seed, isMounted])}
          </svg>
        </div>
      )}

      {/* Weather Layer - Rain/Storm effects */}
      {weatherCondition !== "clear" && weatherOpacity > 0 && (
        <div
          className="absolute inset-0"
          style={{ opacity: weatherOpacity }}
        >
          {weatherCondition === "rainy" && (
            <svg className="absolute inset-0 w-full h-full">
              {useMemo(() => {
                // Don't render rain during SSR
                if (!isMounted) return null;
                
                const random = seededRandom(seed + 1000); // Different seed for rain
                const maxRain = 30;
                const rainCount = Math.floor(maxRain * weatherOpacity);
                
                // Pre-generate all rain lines deterministically
                const rainLines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
                for (let i = 0; i < rainCount; i++) {
                  rainLines.push({
                    x1: random() * 100,
                    y1: random() * 100,
                    x2: random() * 100,
                    y2: random() * 100 + 5,
                  });
                }
                
                return rainLines.map((line, i) => (
                  <line
                    key={`rain-${seed}-${i}`}
                    x1={`${line.x1}%`}
                    y1={`${line.y1}%`}
                    x2={`${line.x2}%`}
                    y2={`${line.y2}%`}
                    stroke="#87ceeb"
                    strokeWidth={1}
                    opacity={0.5}
                  />
                ));
              }, [weatherOpacity, seed, isMounted])}
            </svg>
          )}
          {weatherCondition === "stormy" && (
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800/20 via-gray-900/30 to-gray-800/20" />
          )}
        </div>
      )}

      {/* Wind Layer - Directional understanding */}
      {windDirection !== "none" && windOpacity > 0 && (
        <div
          className="absolute inset-0"
          style={{ opacity: windOpacity }}
        >
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <marker
                id={`wind-arrow-${seed}`}
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L9,3 z" fill="#87ceeb" opacity="0.6" />
              </marker>
            </defs>
            {useMemo(() => {
              // Don't render wind during SSR
              if (!isMounted) return null;
              
              const random = seededRandom(seed + 2000); // Different seed for wind
              const angle = getWindAngle(windDirection);
              const maxWind = 15;
              const windCount = Math.floor(maxWind * windStrength);
              
              // Pre-generate all wind lines deterministically
              const windLines: Array<{ x: number; y: number; length: number }> = [];
              for (let i = 0; i < windCount; i++) {
                windLines.push({
                  x: random() * 100,
                  y: random() * 100,
                  length: 10 + random() * 10,
                });
              }
              
              return windLines.map((wind, i) => (
                <line
                  key={`wind-${seed}-${i}`}
                  x1={`${wind.x}%`}
                  y1={`${wind.y}%`}
                  x2={`${wind.x + Math.cos(angle) * wind.length}%`}
                  y2={`${wind.y + Math.sin(angle) * wind.length}%`}
                  stroke="#87ceeb"
                  strokeWidth={1}
                  opacity={0.4}
                  markerEnd={`url(#wind-arrow-${seed})`}
                />
              ));
            }, [windDirection, windStrength, seed, isMounted])}
          </svg>
        </div>
      )}

      {/* Clarity Indicator - Visual feedback */}
      {clarity > 0.5 && (
        <div
          className="absolute top-1 right-1 text-xs font-medium text-[#556b2f] bg-white/80 px-1 rounded"
          style={{ opacity: clarity }}
        >
          {Math.round(clarity * 100)}% clear
        </div>
      )}
    </div>
  );
}

function getWindAngle(direction: WindDirection): number {
  const angles: Record<WindDirection, number> = {
    north: -Math.PI / 2,
    south: Math.PI / 2,
    east: 0,
    west: Math.PI,
    northeast: -Math.PI / 4,
    northwest: -3 * Math.PI / 4,
    southeast: Math.PI / 4,
    southwest: 3 * Math.PI / 4,
    none: 0,
  };
  return angles[direction];
}

