---
title: "Three-Domain Ontology Recapitulation"
branch: "contemplations/semantic-motifs"
date: "2025-11-11"
status: "Mapping · Aesthetic Directive"
---

# Three-Domain Ontology Recapitulation

This contemplation formalizes the current three-domain ontological mapping—golf metaphor, mathematical substrate, and LLM development practice—so forthcoming SVG compositions stay aligned with the scorecard’s aesthetic LVLM prompts and global design system.

---

## Referenced Compositions

- `contemplations/semantic-motifs/README.md` — establishes motif vocabulary and semantic intake heuristics that govern cross-domain translations.
- `contemplations/celebshot/05-GOLF-ONTOLOGY.md` — enumerates the canonical golf-to-workflow ontology leveraged by downstream prototypes.
- `contemplations/golf-hole-plan-view-art-generator.md` — details JSON and TypeScript schemas for SVG mappings and interactive layering.
- `lib/svg-manifest.json` — lists existing ontological diagrams and their taxonomy, informing naming and tagging conventions.

---

## Baseline Domain Primitives

| Domain | Core Units | Semantic Role | UI Motif Hooks |
| --- | --- | --- | --- |
| Golf | Course · Hole · Shot · Club · Terrain Zone | Provides intuitive spatial narrative and pacing | Stroke weight modulation, par-length grids, blade forests |
| Mathematics | Manifold · Epsilon Ball · Gradient Flow · Category Morphism | Captures formal structure and transformation logic | Vector field overlays, convergence halos, tensor annotations |
| LLM Development | Prompt Pattern · Constraint Profile · Iteration Cadence · Review Ritual | Grounds implementation tactics and agent behavior | Prompt badge glyphs, checklist ribbons, gradient preservation indicators |

---

## Relationship Lattice

- **Intensity Translation**: `golf.club.length → llm.constraint-profile.strictness` (per plan-view generator schema) with convergent checks against `epsilon-ball` radii.
- **Precision Binding**: Terrain micro-topography ties to `mathematical.gradient-flow` stability, signaling when LVLM prompts must clamp variance.
- **Temporal Alignment**: Shot sequences sync with `iteration cadence` stages, ensuring storyboarded SVG frames reflect ritual checkpoints defined in `agents.md`.
- **Analogy Ledger Integration**: Each SVG layer flags its active analogy set so motif toggles can selectively reveal golf, math, or LLM annotations without cross-domain drift.

---

## SVG Variant Directives

1. **Perspective Trajectory Variant**  
   - Layer Stack: Terrain zones → shot arcs → convergence halos.  
   - Palette: Scorecard olive base (`#556b2f`) with accent gradients pulled from `ResponsiveHoleGrid`.  
   - Animation Cue: Stroke taper conveys fatness coefficient for each arc.

2. **Plan-View Mapping Variant**  
   - Grid Layout: Tri-panel layout aligning golf, math, LLM columns (per `ontological-mapping-diagram.svg`).  
   - Interaction Spec: Hover reveals JSON snippet (`mapping.relationships`) for the selected element.  
   - Iconography: Use blade glyphs to denote knowledge pillars anchoring each mapping.

3. **Integrated Ritual Variant**  
   - Narrative Flow: Tee-to-review ribbon tying `shot review ritual` checkpoints into the SVG timeline.  
   - Data Join: Embed `flatteningRisk` badges at nodes where LLM suggestions caused gradient compression.  
   - Export Tags: `["integrated","ritual","gradient-preservation"]` to extend `svg-manifest`.

---

## Production Notes

- Maintain Tailwind-compatible naming for future ingestion into `app/aerial-engine/page.tsx` dynamic loaders.
- Document any new glyphs or color tokens in `components/prototypes/AerialCSSMotif.tsx` so prototypes can surface the same visual language.
- Capture LVLM prompt snippets alongside SVG source to preserve the semantic intent of each variant.

---

## Next Moves

1. Draft LVLM prompt templates that mirror the three variants above and attach them to the diagram manifest.  
2. Extend the ontological manifest with stub entries for each new SVG export.  
3. Prototype a responsive gallery in `app/diagrams/page.tsx` that filters by analogy ledger state.



