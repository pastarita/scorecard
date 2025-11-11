import manifest from "@/lib/shotSelectionManifest.json";
import type { ShotSelectionDeckConfig } from "@/types/shot-selection";

const CLUB_COPY = {
  driver: {
    shotType: "Launch Vector · Distance Bias",
    loft: "10.5° Loft",
    description:
      "Opening the hole with maximum leverage, prioritizing semantic breadth over precision.",
  },
  iron: {
    shotType: "Trajectory Compression",
    loft: "24° Loft",
    description: "Flattened arc to keep the semantic load disciplined while maintaining forward momentum.",
  },
  wedge: {
    shotType: "Precision Loft",
    loft: "56° Loft",
    description: "Pin-point lift maneuver to position semantic detail directly onto the target contour.",
  },
  putter: {
    shotType: "Contour Reading",
    loft: "3° Loft",
    description: "Final calibration stroke that resolves residual semantic gradients into precise execution.",
  },
} as const;

const layers: ShotSelectionDeckConfig["layers"] = [
  {
    id: "space-backdrop",
    label: "Spatial Backdrop",
    layer: "backdrop",
    description:
      "Sets the ambient foundation with golf palette hues, radial gradient, and soft noise for texture.",
  },
  {
    id: "primary-lattice",
    label: "Primary Container Lattice",
    layer: "container",
    description: "Defines the max-width grid and card gutter rhythm that anchors the deck.",
  },
  {
    id: "copy-system",
    label: "Typography & Copy Modules",
    layer: "typography",
    description:
      "Establishes serif headline blocks, mono metadata ribbons, and supporting body text.",
  },
  {
    id: "club-motifs",
    label: "Graphical Motif Stratum",
    layer: "motif",
    description:
      "Pairs each club specification to segmentation-derived chord geometry and color palette.",
  },
  {
    id: "interactive-overlay",
    label: "Interaction Overlay",
    layer: "interaction",
    description:
      "Encapsulates hover, focus, and selection affordances without mutating structural layers.",
  },
];

const clubs: ShotSelectionDeckConfig["clubs"] = manifest.clubs.map((club) => {
  const copy = CLUB_COPY[club.id as keyof typeof CLUB_COPY];
  return {
    id: club.id,
    name: club.name,
    shotType: copy?.shotType ?? "",
    loft: copy?.loft ?? "",
    description: copy?.description ?? "",
    bounds: {
      x0: club.bounds.x0,
      y0: club.bounds.y0,
      x1: club.bounds.x1,
      y1: club.bounds.y1,
    },
    motif: {
      backgroundColor: club.background_color,
      accentColor: club.accent_color,
      textColor: club.text_color,
      accent: {
        centerX: club.accent.center_x,
        centerY: club.accent.center_y,
        radius: club.accent.radius,
        startAngleDeg: club.accent.start_angle_deg,
        endAngleDeg: club.accent.end_angle_deg,
        strokeWidth: club.accent.stroke_width,
      },
    },
  };
});

export const SHOT_SELECTION_DECK_CONFIG: ShotSelectionDeckConfig = {
  layers,
  clubs,
};

export const SHOT_SELECTION_MANIFEST_META = {
  generatedAt: manifest.generatedAt,
  sourceImage: manifest.sourceImage,
};

