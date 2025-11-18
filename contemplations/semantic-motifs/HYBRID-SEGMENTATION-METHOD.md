---
title: "Hybrid Deterministic–LVLM Segmentation Method Proposal"
branch: "contemplations/semantic-motifs"
status: "Proposal · Inception"
date: "2025-11-11"
---

# Hybrid Deterministic–LVLM Segmentation Method

Proposal for a segmentation workflow that fuses deterministic superpixel analysis with large vision-language model (LVLM) reasoning to produce high-fidelity, semantically annotated motif reconstructions.

---

## 1. Context & Goals

- **Problem**: Deterministic segmentation (e.g., SLIC + k-means) is fast and reproducible but struggles to tag semantic entities or correct tricky boundaries. Pure LVLM approaches understand semantics but lack pixel-level precision.
- **Objective**: Combine both approaches into a loop that delivers:
  - Deterministic geometry + palette accuracy.
  - LVLM-driven semantic labeling, validation, and targeted refinements.
  - Efficient runtime (<3 s per image) with audit-friendly outputs.
- **Scope**: Applied first to the shot selection interface reference images; generalizable to other flat-motif UI assets.

---

## 2. System Overview

```
         ┌─────────────────┐
         │ Reference Image │
         └────────┬────────┘
                  │
          Deterministic Seed (SLIC + k-means)
                  │
        Superpixel map + palette stats
                  │
         Paint-by-number canvas
                  │
        ┌─────────┴─────────┐
        │ LVLM Prompt Pack  │
        └─────────┬─────────┘
                  │ LVLM response (tags, directives)
                  ▼
       Controller & Refinement Engine
                  │
        Updated masks + annotations
                  │ (iterate until convergence)
                  ▼
          Final segmentation bundle
```

---

## 3. Detailed Workflow

### 3.1 Deterministic Seed

1. **SLIC Superpixels**  
   - Parameters: `n_segments ~ 200`, `compactness ~ 12`, `sigma ≈ 1`.  
   - Output: label map `L(x,y)` with superpixel IDs.

2. **Superpixel Statistics**  
   - For each ID: mean LAB color, area, centroid, polygon boundary.
   - Construct adjacency graph (neighboring superpixel IDs).

3. **K-Means Clustering**  
   - Feature vector per superpixel: `[mean_L, mean_a, mean_b, area_norm]`.
   - `k = 4–6`, resulting clusters labeled heuristically:
     - Highest lightness → background.
     - Highest chroma → accent strokes.
     - Lowest lightness → text/borders.

4. **Initial Geometry Extraction**  
   - Fit arcs or splines (least squares) on accent clusters.
   - Store data in JSON manifest (`bounds`, `palette`, `arc params`).

### 3.2 Paint-by-Number Canvas

1. Render boundaries (thin lines) on a transparent layer.  
2. Fill each superpixel with a unique, solid color (ID-coded).  
3. Export supporting assets:
   - `paint_canvas.png` (IDs encoded as colors).  
   - `boundary_overlay.png` (to visualize superpixel edges).  
   - Optional `vector_bounds.svg`.

### 3.3 LVLM Prompt Pack

- Inputs provided to LVLM (e.g., GPT-4o, Gemini):
  - Raw reference image.  
  - Paint-by-number canvas.  
  - JSON summary (per-ID stats: color, area, adjacency, heuristics).  
  - Task instructions: identify semantic regions, suggest merges/splits, attach ontology tags, highlight ambiguous zones.
- Response schema (JSON):
  ```json
  {
    "regions": [
      {
        "id": [12, 37],
        "label": "driver_chord",
        "confidence": 0.78,
        "actions": ["merge"]
      }
    ],
    "new_segments": [
      {
        "hint_bbox": [x0, y0, x1, y1],
        "label": "badge_highlight"
      }
    ],
    "notes": "...reasoning..."
  }
  ```

### 3.4 Controller & Refinement Engine

- Parses LVLM directives and translates them into deterministic operations:
  - **Merge**: union masks for specified IDs.
  - **Split**: run local SLIC or edge detection within target region, seeded by LVLM hints.
  - **Reclassify**: update metadata labels without geometry change.
  - **New segment**: use LVLM bounding box to seed GrabCut/graph-cut or SAM patch inference; integrate result.
- Maintains iteration log:
  - Input assets (images, JSON).
  - LVLM responses.
  - Actions taken.
  - Quality metrics (edge adherence, color variance).

### 3.5 Convergence Criteria

- Stop when:
  - LVLM confidence falls below threshold for further changes.
  - Deterministic validation metrics plateau (change < ε).  
  - Max iterations reached (e.g., 2–3 loops).

### 3.6 Output Bundle

- Final mask set (PNG + vector).
- Semantic manifest (labels, hierarchies, palette descriptors).
- Geometry (arc parameters, bounding boxes).
- Provenance log for reproducibility.

---

## 4. Tooling & Infrastructure

- **Python Packages**: `numpy`, `scikit-image`, `opencv-python`, `Pillow`, optional `pycocotools`.
- **Segmentation Script**: extend `scripts/segment_shot_selection.py` into modular pipeline:
  - `segmentation/deterministic.py` (SLIC, stats).
  - `segmentation/lvlm_prompt.py` (prompt builder).
  - `segmentation/controller.py` (action executor).
  - CLI entry (`hybrid_segment.py`) with subcommands.
- **LVLM Access**: API client (OpenAI, Google, Anthropic). Include caching to avoid repeated calls for identical prompt packs.
- **Manifest Format**:  
  - `hybrid_manifest.json` storing per-region metadata, iteration history, references to derived assets.

---

## 5. Metrics & Evaluation

- **Geometric**:
  - Boundary adherence (gradient overlap).
  - Arc fit residuals.
  - Region smoothness (perimeter²/area).
- **Semantic**:
  - Ontology coverage (expected labels present/absent).
  - LVLM confidence calibration.
- **Efficiency**:
  - Per-image runtime (deterministic vs. hybrid).
  - LVLM call count/latency.
- **Quality**:
  - If ground truth available: IoU per class.
  - Otherwise: human review + spot-check via synthetic tests.

---

## 6. Phased Implementation Plan

1. **Phase 0 – Abstractions**  
   - Modularize existing deterministic script; add CLI scaffolding.  
   - Produce paint-by-number assets.

2. **Phase 1 – LVLM Prompting Prototype**  
   - Manual loop: call LVLM with prepared assets; collect directives.  
   - Implement controller actions for merge/relabel.

3. **Phase 2 – Automated Loop**  
   - Integrate LVLM API call, parse schema, execute directives, re-run deterministic refinement automatically.
   - Add convergence gating.

4. **Phase 3 – Metrics + Benchmarks**  
   - Build synthetic ground-truth dataset (procedurally generated motifs).  
   - Measure quality vs. runtime across baseline/hybrid variants.

5. **Phase 4 – Production Hardening**  
   - Improve error handling, caching, logging.  
   - Add config files for prompt templates, thresholds.  
   - Document runbooks and maintenance steps.

---

## 7. Risks & Mitigations

| Risk                                           | Mitigation                                               |
|------------------------------------------------|----------------------------------------------------------|
| LVLM hallucinations / inconsistent directives  | enforce schema validation, require confidence thresholds |
| High latency / cost of LVLM calls              | caching, smaller models, batch prompts                   |
| Feedback loop divergence (over-segmentation)   | cap iterations, monitor metrics, manual override entry   |
| Palette drift after merges                     | recompute colors; align with design tokens               |
| Dependence on API availability                 | allow offline path (skip LVLM stage)                     |

---

## 8. References

- **Deterministic Foundations**  
  - Achanta et al., “SLIC Superpixels Compared to State-of-the-Art Methods” (2012).  
  - Felzenszwalb & Huttenlocher, “Efficient Graph-Based Image Segmentation” (2004).  

- **Interactive/Hybrid Segmentation**  
  - Boykov & Jolly, “Graph Cuts with Interactive Foreground/Background” (2001).  
  - Rother et al., “GrabCut” (2004).  

- **LVLM Tool Use**  
  - OpenAI GPT-4o System Card (2024).  
  - Visual ChatGPT (Wu et al., 2023).  
  - Segment Anything / SAM2 papers (Meta, 2023/2024).

---

## 9. Next Steps

- Approve this method outline within `contemplations/semantic-motifs`.  
- Prioritize Phase 0 tasks (modularization + paint-by-number generator).  
- Draft LVLM prompt template referencing ontology labels from `VISUAL-MOTIF-REFERENCE.md`.  
- Schedule a follow-up experimentation branch (`studies/hybrid-segmentation`) once foundation is ready.

This method positions the team to achieve reliable geometry with richer semantic signal, unlocking future automation (e.g., auto-documenting motifs, generating code-ready components, cross-repo motif reuse). 


