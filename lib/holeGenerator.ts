/**
 * Hole Generator System
 * 
 * Generates top-down SVG hole representations based on development progress.
 * These are "retrospective maquettes" - created during development to visualize
 * the path taken through hyperdimensional space.
 * 
 * Uses XGG Builder pattern principles for SVG structure generation.
 */

import type { Hole, Shot } from "@/types/scorecard";
import { getTerrainForConfidence, TERRAIN_CONFIG } from "@/types/scorecard";

export interface HoleLayout {
  // Fairway configuration
  fairway: {
    path: string; // SVG path data
    width: number;
    curvature: number; // 0-1, how curved the path is
  };
  
  // Green configuration
  green: {
    x: number;
    y: number;
    radius: number;
  };
  
  // Tee configuration
  tee: {
    x: number;
    y: number;
    radius: number;
  };
  
  // Hazards
  hazards: {
    water: Array<{ x: number; y: number; width: number; height: number }>;
    bunkers: Array<{ x: number; y: number; radius: number }>;
  };
  
  // Shot trajectory points
  trajectory: Array<{ x: number; y: number; shot: Shot; terrain: string }>;
  
  // Yardage markers (metaphorical - represents confidence milestones)
  markers: Array<{ x: number; y: number; confidence: number; label: string }>;
}

/**
 * Generate hole layout based on archetype and development progress
 */
export function generateHoleLayout(
  hole: Hole,
  width: number = 200,
  height: number = 150
): HoleLayout {
  const archetype = hole.archetype;
  const hasShots = hole.shots.length > 0;
  
  // Base configuration by archetype
  const archetypeConfig = {
    Precision: {
      fairwayWidth: 60,
      greenRadius: 25,
      curvature: 0.2, // Nearly straight
      hasHazards: false,
      complexity: 1,
    },
    Convergent: {
      fairwayWidth: 50,
      greenRadius: 20,
      curvature: 0.4, // Moderate curve
      hasHazards: hole.shots.some(s => s.type === "recovery"),
      complexity: 2,
    },
    Explorer: {
      fairwayWidth: 40,
      greenRadius: 18,
      curvature: 0.7, // Highly curved
      hasHazards: true,
      complexity: 3,
    },
    Creative: {
      fairwayWidth: 35,
      greenRadius: 15,
      curvature: 0.8, // Very curved, artistic
      hasHazards: true,
      complexity: 4,
    },
  }[archetype];

  // Tee position (start)
  const teeX = width * 0.1;
  const teeY = height * 0.5;
  const teeRadius = 8;

  // Green position (goal)
  const greenX = width * 0.9;
  const greenY = height * 0.5;
  const greenRadius = archetypeConfig.greenRadius;

  // Calculate fairway path based on curvature
  const controlPoint1X = teeX + (greenX - teeX) * 0.3;
  const controlPoint1Y = teeY - height * archetypeConfig.curvature * 0.3;
  const controlPoint2X = teeX + (greenX - teeX) * 0.7;
  const controlPoint2Y = greenY + height * archetypeConfig.curvature * 0.2;

  const fairwayPath = `M ${teeX} ${teeY} 
    Q ${controlPoint1X} ${controlPoint1Y} ${width * 0.5} ${height * 0.4}
    T ${greenX} ${greenY}`;

  // Generate hazards based on archetype and recovery shots
  const hazards = {
    water: [] as Array<{ x: number; y: number; width: number; height: number }>,
    bunkers: [] as Array<{ x: number; y: number; radius: number }>,
  };

  if (archetypeConfig.hasHazards) {
    // Water hazard for Explorer/Creative
    if (archetype === "Explorer" || archetype === "Creative") {
      hazards.water.push({
        x: width * 0.4,
        y: height * 0.2,
        width: 40,
        height: 30,
      });
    }

    // Bunker near green (if over par)
    if (hole.actual > hole.par) {
      hazards.bunkers.push({
        x: greenX - 15,
        y: greenY - 15,
        radius: 8,
      });
    }

    // Bunker along fairway for complex archetypes
    if (archetypeConfig.complexity >= 3) {
      hazards.bunkers.push({
        x: width * 0.5,
        y: height * 0.25,
        radius: 6,
      });
    }

    // Additional hazards for recovery shots
    const recoveryShots = hole.shots.filter(s => s.type === "recovery");
    recoveryShots.forEach((_, idx) => {
      hazards.bunkers.push({
        x: width * 0.3 + idx * 10,
        y: height * 0.35 + idx * 5,
        radius: 5,
      });
    });
  }

  // Generate shot trajectory points
  const trajectory: Array<{ x: number; y: number; shot: Shot; terrain: string }> = [];
  
  if (hasShots) {
    hole.shots.forEach((shot, index) => {
      const progress = (index + 1) / (hole.shots.length + 1);
      
      // Interpolate along fairway
      const baseX = teeX + (greenX - teeX) * progress * 0.85;
      const baseY = teeY + (greenY - teeY) * progress * 0.85;
      
      // Add variance based on confidence (lower confidence = more variance)
      // Use deterministic "pseudo-random" based on shot number and hole number
      const variance = (1 - shot.confidence) * 15;
      const seed = (hole.number * 100 + shot.number * 10 + index);
      const pseudoRandom1 = (seed * 9301 + 49297) % 233280 / 233280;
      const pseudoRandom2 = (seed * 9301 + 49297 * 2) % 233280 / 233280;
      const offsetX = (pseudoRandom1 - 0.5) * variance;
      const offsetY = (pseudoRandom2 - 0.5) * variance;
      
      const terrain = getTerrainForConfidence(shot.confidence);
      
      trajectory.push({
        x: baseX + offsetX,
        y: baseY + offsetY,
        shot,
        terrain,
      });
    });
  }

  // Generate confidence markers (yardage markers)
  const markers: Array<{ x: number; y: number; confidence: number; label: string }> = [
    { x: teeX, y: teeY - 10, confidence: 0.0, label: "0%" },
    { x: width * 0.3, y: height * 0.2, confidence: 0.3, label: "30%" },
    { x: width * 0.6, y: height * 0.2, confidence: 0.6, label: "60%" },
    { x: greenX, y: greenY - greenRadius - 10, confidence: 0.9, label: "90%" },
  ];

  return {
    fairway: {
      path: fairwayPath,
      width: archetypeConfig.fairwayWidth,
      curvature: archetypeConfig.curvature,
    },
    green: {
      x: greenX,
      y: greenY,
      radius: greenRadius,
    },
    tee: {
      x: teeX,
      y: teeY,
      radius: teeRadius,
    },
    hazards,
    trajectory,
    markers,
  };
}

/**
 * Generate SVG path for fairway with stroke and fill
 */
export function generateFairwaySVG(layout: HoleLayout, width: number, height: number): string {
  const { fairway } = layout;
  
  // Create wider path for fill
  const fillPath = `<path d="${fairway.path}" 
    stroke="none" 
    fill="#6b9d5b" 
    fill-opacity="0.3" 
    stroke-width="${fairway.width + 20}" />`;
  
  // Main fairway path
  const strokePath = `<path d="${fairway.path}" 
    stroke="#6b9d5b" 
    stroke-width="${fairway.width}" 
    fill="none" 
    stroke-linecap="round" 
    stroke-linejoin="round" />`;
  
  return fillPath + strokePath;
}

/**
 * Generate complete SVG for hole visualization
 */
export function generateHoleSVG(layout: HoleLayout, width: number, height: number): string {
  const { green, tee, hazards, trajectory, markers } = layout;
  
  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  
  // Background
  svg += `<rect width="${width}" height="${height}" fill="#f5f0e8" />`;
  
  // Water hazards
  hazards.water.forEach((water, idx) => {
    svg += `<ellipse cx="${water.x}" cy="${water.y}" rx="${water.width / 2}" ry="${water.height / 2}" 
      fill="#87ceeb" opacity="0.6" />`;
  });
  
  // Fairway (generated separately)
  svg += generateFairwaySVG(layout, width, height);
  
  // Bunkers
  hazards.bunkers.forEach((bunker, idx) => {
    svg += `<circle cx="${bunker.x}" cy="${bunker.y}" r="${bunker.radius}" 
      fill="#d2b48c" stroke="#b89a7a" stroke-width="1" />`;
  });
  
  // Shot trajectory
  if (trajectory.length > 0) {
    const pathData = trajectory.map((p, i) => 
      i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
    ).join(" ");
    
    svg += `<path d="${pathData}" 
      stroke="#3b82f6" 
      stroke-width="2" 
      stroke-dasharray="3,3" 
      fill="none" 
      opacity="0.6" />`;
    
    // Shot markers
    trajectory.forEach((point, idx) => {
      const terrainConfig = TERRAIN_CONFIG[point.terrain as keyof typeof TERRAIN_CONFIG];
      svg += `<circle cx="${point.x}" cy="${point.y}" r="4" 
        fill="${terrainConfig.color}" stroke="white" stroke-width="1" />`;
      svg += `<text x="${point.x}" y="${point.y - 8}" text-anchor="middle" 
        font-size="8" fill="${terrainConfig.color}" font-weight="bold">${idx + 1}</text>`;
    });
  }
  
  // Green
  svg += `<circle cx="${green.x}" cy="${green.y}" r="${green.radius}" 
    fill="#4a7c2c" stroke="#3d5a2c" stroke-width="2" />`;
  
  // Tee
  svg += `<circle cx="${tee.x}" cy="${tee.y}" r="${tee.radius}" 
    fill="#f0f8f0" stroke="#6b9d5b" stroke-width="1.5" />`;
  svg += `<text x="${tee.x}" y="${tee.y + 3}" text-anchor="middle" 
    font-size="10" fill="#556b2f" font-weight="bold">T</text>`;
  
  // Markers
  markers.forEach((marker) => {
    svg += `<text x="${marker.x}" y="${marker.y}" text-anchor="middle" 
      font-size="8" fill="#556b2f" font-weight="600">${marker.label}</text>`;
  });
  
  svg += `</svg>`;
  
  return svg;
}

/**
 * Calculate hole difficulty metrics
 */
export interface HoleDifficulty {
  risk: number; // 0-100
  complexity: number; // 0-100
  estimatedTime: number; // hours
}

export function calculateHoleDifficulty(hole: Hole): HoleDifficulty {
  const archetypeComplexity = {
    Precision: 20,
    Convergent: 40,
    Explorer: 70,
    Creative: 90,
  }[hole.archetype];

  const recoveryShots = hole.shots.filter(s => s.type === "recovery").length;
  const risk = Math.min(100, archetypeComplexity + recoveryShots * 15);

  const complexity = archetypeComplexity + (hole.par - 3) * 10;

  // Estimate time based on par (simplified: 1 hour per par)
  const estimatedTime = hole.par * 1.5;

  return {
    risk,
    complexity,
    estimatedTime,
  };
}

