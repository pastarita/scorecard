/**
 * Shot Selection Prototype Types
 *
 * Defines structural abstractions for the shot selection interface.
 * Keeps data-driven rendering separate from visual components so motifs can
 * evolve independently of layout implementation.
 */

export type ShotSelectionSpaceLayer = "backdrop" | "container" | "typography" | "motif" | "interaction";

export interface ShotSelectionLayerSpec {
  id: string;
  label: string;
  layer: ShotSelectionSpaceLayer;
  description: string;
}

export interface ShotSelectionBounds {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export interface ShotSelectionAccentGeometry {
  centerX: number;
  centerY: number;
  radius: number;
  startAngleDeg: number;
  endAngleDeg: number;
  strokeWidth: number;
}

export interface ClubMotifVisual {
  backgroundColor: string;
  accentColor: string;
  textColor: string;
  accent: ShotSelectionAccentGeometry;
}

export interface ClubSpecification {
  id: string;
  name: string;
  shotType: string;
  loft: string;
  description: string;
  motif: ClubMotifVisual;
  bounds: ShotSelectionBounds;
}

export interface ShotSelectionDeckConfig {
  layers: ShotSelectionLayerSpec[];
  clubs: ClubSpecification[];
}


