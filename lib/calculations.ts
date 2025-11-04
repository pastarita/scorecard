/**
 * Advanced calculations and analytics for scorecard data
 */

import type { Hole, Shot, ScorecardData, Totals, ScorecardArchetype } from "@/types/scorecard";
import { ARCHETYPE_CONFIG } from "@/types/scorecard";

/**
 * Calculate handicap for completed holes
 */
export function calculateHandicap(holes: Hole[]): number {
  const completed = holes.filter(h => h.status === "complete" && h.actual > 0);
  if (completed.length === 0) return 0;
  
  const totalVariance = completed.reduce((sum, h) => sum + (h.actual - h.par), 0);
  return Number((totalVariance / completed.length).toFixed(2));
}

/**
 * Calculate efficiency score (0-100, higher is better)
 */
export function calculateEfficiency(holes: Hole[]): number {
  const completed = holes.filter(h => h.status === "complete" && h.actual > 0);
  if (completed.length === 0) return 0;
  
  const totalPar = completed.reduce((sum, h) => sum + h.par, 0);
  const totalActual = completed.reduce((sum, h) => sum + h.actual, 0);
  
  // Efficiency = (par / actual) * 100
  // Cap at 100 for under-par performance
  return Math.min(100, Math.round((totalPar / totalActual) * 100));
}

/**
 * Calculate average confidence progression for a hole
 */
export function calculateConfidenceProgression(hole: Hole): number[] {
  if (hole.shots.length === 0) return [];
  return hole.shots.map(shot => shot.confidence);
}

/**
 * Calculate average confidence for all shots
 */
export function calculateAverageConfidence(holes: Hole[]): number {
  const allShots = holes.flatMap(h => h.shots);
  if (allShots.length === 0) return 0;
  
  const sum = allShots.reduce((acc, shot) => acc + shot.confidence, 0);
  return Number((sum / allShots.length).toFixed(3));
}

/**
 * Calculate shot type distribution
 */
export function calculateShotTypeDistribution(holes: Hole[]): Record<string, number> {
  const allShots = holes.flatMap(h => h.shots);
  const distribution: Record<string, number> = {
    driver: 0,
    iron: 0,
    wedge: 0,
    putter: 0,
    recovery: 0
  };
  
  allShots.forEach(shot => {
    distribution[shot.type]++;
  });
  
  return distribution;
}

/**
 * Calculate archetype performance metrics
 */
export interface ArchetypeMetrics {
  archetype: ScorecardArchetype;
  total: number;
  completed: number;
  totalPar: number;
  totalActual: number;
  averageVariance: number;
  efficiency: number;
}

export function calculateArchetypeMetrics(holes: Hole[]): ArchetypeMetrics[] {
  const archetypes = Object.keys(ARCHETYPE_CONFIG) as ScorecardArchetype[];
  
  return archetypes.map(archetype => {
    const archetypeHoles = holes.filter(h => h.archetype === archetype);
    const completed = archetypeHoles.filter(h => h.status === "complete" && h.actual > 0);
    
    const totalPar = archetypeHoles.reduce((sum, h) => sum + h.par, 0);
    const totalActual = completed.reduce((sum, h) => sum + h.actual, 0);
    const variance = totalActual - totalPar;
    const averageVariance = completed.length > 0 ? variance / completed.length : 0;
    const efficiency = totalActual > 0 ? (totalPar / totalActual) * 100 : 0;
    
    return {
      archetype,
      total: archetypeHoles.length,
      completed: completed.length,
      totalPar,
      totalActual,
      averageVariance: Number(averageVariance.toFixed(2)),
      efficiency: Math.round(efficiency)
    };
  });
}

/**
 * Predict par for a new hole based on archetype
 */
export function predictPar(archetype: ScorecardArchetype): number {
  return ARCHETYPE_CONFIG[archetype].par;
}

/**
 * Suggest shot type based on current confidence level
 */
export function suggestShotType(confidence: number): string {
  if (confidence < 0.6) return "driver";
  if (confidence < 0.8) return "iron";
  if (confidence < 0.95) return "wedge";
  return "putter";
}

/**
 * Calculate completion velocity (holes per day)
 */
export function calculateVelocity(data: ScorecardData): number {
  const completed = data.course.holes.filter(h => h.status === "complete").length;
  const start = new Date(data.project.dateStart);
  const end = new Date(data.project.dateEnd);
  const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  
  return Number((completed / days).toFixed(2));
}

/**
 * Calculate estimated completion date based on current velocity
 */
export function estimateCompletionDate(data: ScorecardData): Date {
  const completed = data.course.holes.filter(h => h.status === "complete").length;
  const remaining = data.course.holes.length - completed;
  const velocity = calculateVelocity(data);
  
  if (velocity === 0) {
    // If no progress, estimate based on remaining holes and average par
    const avgPar = data.course.holes.reduce((sum, h) => sum + h.par, 0) / data.course.holes.length;
    const daysNeeded = remaining * 2; // Rough estimate: 2 days per hole
    return new Date(Date.now() + daysNeeded * 24 * 60 * 60 * 1000);
  }
  
  const daysNeeded = Math.ceil(remaining / velocity);
  return new Date(Date.now() + daysNeeded * 24 * 60 * 60 * 1000);
}

/**
 * Calculate risk score for a hole (0-100, higher = riskier)
 */
export function calculateRiskScore(hole: Hole): number {
  let risk = 0;
  
  // Base risk on archetype
  const archetypeRisk = {
    Precision: 10,
    Convergent: 30,
    Explorer: 60,
    Creative: 80
  };
  risk += archetypeRisk[hole.archetype];
  
  // Adjust for recovery shots
  const recoveryShots = hole.shots.filter(s => s.type === "recovery").length;
  risk += recoveryShots * 15;
  
  // Adjust for variance
  if (hole.actual > 0) {
    const variance = hole.actual - hole.par;
    risk += variance * 5;
  }
  
  return Math.min(100, Math.max(0, risk));
}

/**
 * Generate insights from scorecard data
 */
export interface Insight {
  type: "success" | "warning" | "info";
  title: string;
  description: string;
}

export function generateInsights(data: ScorecardData): Insight[] {
  const insights: Insight[] = [];
  const completed = data.course.holes.filter(h => h.status === "complete");
  const efficiency = calculateEfficiency(data.course.holes);
  const handicap = calculateHandicap(data.course.holes);
  
  // Efficiency insights
  if (efficiency > 90) {
    insights.push({
      type: "success",
      title: "Excellent Efficiency",
      description: `You're performing at ${efficiency}% efficiency - consistently under par!`
    });
  } else if (efficiency < 70) {
    insights.push({
      type: "warning",
      title: "Efficiency Could Improve",
      description: `Current efficiency is ${efficiency}%. Consider reviewing shot strategies.`
    });
  }
  
  // Recovery shot insights
  const recoveryShots = completed.flatMap(h => h.shots).filter(s => s.type === "recovery");
  if (recoveryShots.length > 0) {
    const recoveryRate = (recoveryShots.length / completed.flatMap(h => h.shots).length) * 100;
    if (recoveryRate > 20) {
      insights.push({
        type: "warning",
        title: "High Recovery Rate",
        description: `${recoveryRate.toFixed(0)}% of shots are recoveries. Consider more careful planning.`
      });
    }
  }
  
  // Archetype performance
  const metrics = calculateArchetypeMetrics(data.course.holes);
  metrics.forEach(metric => {
    if (metric.completed > 0 && metric.efficiency > 95) {
      insights.push({
        type: "success",
        title: `${metric.archetype} Mastery`,
        description: `You're excelling at ${metric.archetype} tasks with ${metric.efficiency}% efficiency.`
      });
    }
  });
  
  // Velocity insights
  const velocity = calculateVelocity(data);
  if (velocity > 1) {
    insights.push({
      type: "success",
      title: "Strong Velocity",
      description: `Completing ${velocity} holes per day on average.`
    });
  } else if (velocity < 0.5) {
    insights.push({
      type: "info",
      title: "Steady Pace",
      description: `Current velocity is ${velocity} holes per day. Consider if timeline adjustments are needed.`
    });
  }
  
  return insights;
}

/**
 * Calculate confidence trajectory for visualization
 * Returns array of {x, y} points for plotting
 */
export function calculateConfidenceTrajectory(hole: Hole): Array<{x: number; y: number; shot: number}> {
  return hole.shots.map((shot, index) => ({
    x: index,
    y: shot.confidence,
    shot: shot.number
  }));
}

/**
 * Calculate variance cone width for a shot
 */
export function calculateVarianceCone(confidence: number): number {
  // Higher confidence = narrower cone
  // Maps confidence [0, 1] to cone width [40, 8] pixels
  return 40 - (confidence * 32);
}

/**
 * Calculate semantic distance (simplified model)
 * In real implementation, this would use actual embedding vectors
 */
export function calculateSemanticDistance(shot1: Shot, shot2: Shot): number {
  // Simplified: use confidence difference as proxy for semantic distance
  return Math.abs(shot1.confidence - shot2.confidence);
}

/**
 * Export scorecard to JSON
 */
export function exportToJSON(data: ScorecardData): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Export scorecard to CSV
 */
export function exportToCSV(data: ScorecardData): string {
  const headers = [
    "Hole",
    "Name",
    "Archetype",
    "Par",
    "Actual",
    "Variance",
    "Status",
    "Shots",
    "Avg Confidence",
    "Notes"
  ];
  
  const rows = data.course.holes.map(hole => {
    const variance = hole.actual > 0 ? hole.actual - hole.par : "";
    const avgConfidence = hole.shots.length > 0
      ? (hole.shots.reduce((sum, s) => sum + s.confidence, 0) / hole.shots.length).toFixed(2)
      : "";
    
    return [
      hole.number,
      `"${hole.name}"`,
      hole.archetype,
      hole.par,
      hole.actual || "",
      variance,
      hole.status,
      hole.shots.length,
      avgConfidence,
      `"${hole.notes || ""}"`
    ];
  });
  
  return [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");
}

