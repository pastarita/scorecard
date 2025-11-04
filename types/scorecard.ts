/**
 * Core type definitions for Hyperdimensional Vector Space Golf Scorecard
 * Based on scorecard-data-template.json schema
 */

export type ScorecardArchetype = "Precision" | "Convergent" | "Explorer" | "Creative";

export type ShotType = "driver" | "iron" | "wedge" | "putter" | "recovery";

export type HoleStatus = "not_started" | "in_progress" | "complete" | "blocked" | "cancelled";

export interface Shot {
  number: number;
  type: ShotType;
  confidence: number; // 0.0 - 1.0
  description?: string;
  prompt?: string;
  timestamp?: string;
}

export interface Hole {
  number: number;
  name: string;
  description?: string;
  archetype: ScorecardArchetype;
  par: number;
  actual: number;
  status: HoleStatus;
  shots: Shot[];
  notes?: string;
}

export interface Project {
  product: string;
  developer: string;
  team?: string;
  dateStart: string;
  dateEnd: string;
  description?: string;
}

export interface Course {
  name: string;
  difficulty: "easy" | "medium" | "hard";
  totalPar: number;
  holes: Hole[];
}

export interface ScorecardData {
  metadata: {
    version: string;
    created: string;
    author: string;
  };
  project: Project;
  course: Course;
}

export interface Totals {
  par: number;
  actual: number;
  variance: number;
  completion: number; // percentage
}

export interface ArchetypeConfig {
  par: number;
  description: string;
  examples: string[];
  strategy: string;
  color: string;
  symbol: string;
}

export interface ShotTypeConfig {
  symbol: string;
  description: string;
  terrain: string;
  confidenceRange: string;
  color: string;
  varianceCone: "wide" | "medium" | "tight" | "minimal";
}

export interface StatusConfig {
  symbol: string;
  color: string;
  description: string;
}

// Configuration maps
export const ARCHETYPE_CONFIG: Record<ScorecardArchetype, ArchetypeConfig> = {
  Precision: {
    par: 3,
    description: "Clear goal, direct path",
    examples: ["Fix specific bug", "Add button", "Update text"],
    strategy: "Direct approach",
    color: "#9C27B0",
    symbol: "⊕"
  },
  Convergent: {
    par: 4,
    description: "Iterative refinement toward known target",
    examples: ["Implement feature with spec", "Build component", "API integration"],
    strategy: "Progressive constraints",
    color: "#2196F3",
    symbol: "⊗"
  },
  Explorer: {
    par: 5,
    description: "Discovery and search",
    examples: ["Research best approach", "Investigate options", "Architecture design"],
    strategy: "Broad first shots",
    color: "#FF9800",
    symbol: "⊛"
  },
  Creative: {
    par: 6,
    description: "Subjective, artistic",
    examples: ["Design visual system", "Craft UX flow", "Brand identity"],
    strategy: "Iterative refinement",
    color: "#E91E63",
    symbol: "⊜"
  }
};

export const SHOT_TYPE_CONFIG: Record<ShotType, ShotTypeConfig> = {
  driver: {
    symbol: "●",
    description: "Large variance, exploratory",
    terrain: "Rough",
    confidenceRange: "< 0.6",
    color: "#1A5F7A",
    varianceCone: "wide"
  },
  iron: {
    symbol: "◐",
    description: "Medium control, refinement",
    terrain: "Fairway",
    confidenceRange: "0.6-0.8",
    color: "#2D5016",
    varianceCone: "medium"
  },
  wedge: {
    symbol: "◑",
    description: "High precision, details",
    terrain: "Approach",
    confidenceRange: "0.8-0.95",
    color: "#B8860B",
    varianceCone: "tight"
  },
  putter: {
    symbol: "○",
    description: "Minimal variance, polish",
    terrain: "Green",
    confidenceRange: "> 0.95",
    color: "#CC5500",
    varianceCone: "minimal"
  },
  recovery: {
    symbol: "↺",
    description: "Course correction",
    terrain: "Any",
    confidenceRange: "Variable",
    color: "#666666",
    varianceCone: "wide"
  }
};

export const STATUS_CONFIG: Record<HoleStatus, StatusConfig> = {
  not_started: {
    symbol: "○",
    color: "#CCCCCC",
    description: "Not yet begun"
  },
  in_progress: {
    symbol: "→",
    color: "#6B9BD1",
    description: "Currently working"
  },
  complete: {
    symbol: "✓",
    color: "#4CAF50",
    description: "Finished successfully"
  },
  blocked: {
    symbol: "⊗",
    color: "#FF9800",
    description: "Waiting on dependency"
  },
  cancelled: {
    symbol: "×",
    color: "#999999",
    description: "No longer needed"
  }
};

// Utility types for terrain and confidence
export type Terrain = "rough" | "fairway" | "approach" | "green" | "hole";

export interface TerrainConfig {
  name: Terrain;
  color: string;
  confidenceMin: number;
  confidenceMax: number;
  description: string;
}

export const TERRAIN_CONFIG: Record<Terrain, TerrainConfig> = {
  rough: {
    name: "rough",
    color: "#1A5F7A",
    confidenceMin: 0.0,
    confidenceMax: 0.6,
    description: "Rough - Exploration Phase"
  },
  fairway: {
    name: "fairway",
    color: "#2D5016",
    confidenceMin: 0.6,
    confidenceMax: 0.8,
    description: "Fairway - Refinement Phase"
  },
  approach: {
    name: "approach",
    color: "#B8860B",
    confidenceMin: 0.8,
    confidenceMax: 0.95,
    description: "Approach - Precision Phase"
  },
  green: {
    name: "green",
    color: "#CC5500",
    confidenceMin: 0.95,
    confidenceMax: 0.99,
    description: "Green - Convergence Phase"
  },
  hole: {
    name: "hole",
    color: "#8B0000",
    confidenceMin: 0.99,
    confidenceMax: 1.0,
    description: "Hole - Completion"
  }
};

// Helper functions
export function calculateVariance(par: number, actual: number): string {
  if (actual === 0) return "-";
  const diff = actual - par;
  if (diff === 0) return "E";
  return (diff > 0 ? "+" : "") + diff;
}

export function calculateCompletion(holes: Hole[]): number {
  const completed = holes.filter(h => h.status === "complete").length;
  return Math.round((completed / holes.length) * 100);
}

export function calculateTotals(holes: Hole[]): Totals {
  const par = holes.reduce((sum, h) => sum + h.par, 0);
  const actual = holes.reduce((sum, h) => sum + h.actual, 0);
  return {
    par,
    actual,
    variance: actual - par,
    completion: calculateCompletion(holes)
  };
}

export function getTerrainForConfidence(confidence: number): Terrain {
  if (confidence < 0.6) return "rough";
  if (confidence < 0.8) return "fairway";
  if (confidence < 0.95) return "approach";
  if (confidence < 0.99) return "green";
  return "hole";
}

export function getSuggestedShotType(confidence: number): ShotType {
  if (confidence < 0.6) return "driver";
  if (confidence < 0.8) return "iron";
  if (confidence < 0.95) return "wedge";
  return "putter";
}

