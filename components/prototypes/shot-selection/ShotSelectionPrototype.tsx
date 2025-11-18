"use client";

import { SHOT_SELECTION_DECK_CONFIG, SHOT_SELECTION_MANIFEST_META } from "@/lib/shotSelectionConfig";
import { ShotSelectionBackdrop } from "./ShotSelectionBackdrop";
import { ShotSelectionHeader } from "./ShotSelectionHeader";
import { ShotSelectionDeck } from "./ShotSelectionDeck";

/**
 * ShotSelectionPrototype
 *
 * Compose structural layers from backdrop to motif deck.
 * Exposes configuration-driven rendering so future iterations can swap motifs
 * without touching the composition.
 */
export function ShotSelectionPrototype() {
  const { layers, clubs } = SHOT_SELECTION_DECK_CONFIG;

  return (
    <ShotSelectionBackdrop>
      <ShotSelectionHeader layers={layers} manifestMeta={SHOT_SELECTION_MANIFEST_META} />
      <ShotSelectionDeck clubs={clubs} />
    </ShotSelectionBackdrop>
  );
}


