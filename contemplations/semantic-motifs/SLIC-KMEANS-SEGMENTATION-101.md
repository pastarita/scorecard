---
title: "SLIC + K-Means Segmentation 101"
branch: "contemplations/semantic-motifs"
status: "Reference · Learning Surface"
date: "2025-11-11"
---

# SLIC + K-Means Segmentation 101

This guide explains the classical SLIC superpixel + k-means color clustering pipeline we used to reconstruct the shot-selection UI. It orients you across the math, workflow, tooling, and next-step questions so you can deepen or adapt the technique confidently.

---

## 1. Why Superpixels?

- **Motivation**: Raw pixels are noisy and numerous. Superpixels group them into perceptually uniform regions, shrinking the problem size while respecting edges.
- **Benefits for UI reconstruction**:
  - Smooth, flat design motifs become single superpixels.
  - Downstream clustering/geometry fits (chords, badges) become reliable.
  - Less brittle than hard thresholding; more lightweight than neural segmentation.

---

## 2. SLIC Fundamentals

- **SLIC** = Simple Linear Iterative Clustering.
- **Core idea**: Run k-means in a 5D space `[L, a, b, x, y]` (CIELAB color + spatial coordinates).
  - `n_segments`: desired number of superpixels.
  - `compactness`: balances color adherence vs. spatial regularity.
- **Algorithm Steps**:
  1. Initialize cluster centers on a grid.
  2. For each center, examine a local 2× region (accelerates vs. vanilla k-means).
  3. Assign pixels based on combined color/spatial distance.
  4. Update centers; repeat until convergence.
- **Outputs**: Label map (same size as image) where each pixel holds a superpixel id.

### Practical Parameters

| Parameter     | Effect                                | Typical Range |
|---------------|----------------------------------------|---------------|
| `n_segments`  | Coarse vs. fine segmentation           | 100–400       |
| `compactness` | 1=follow color, 30=grid-like regularity | 5–20 (UI art) |
| `sigma`       | Gaussian pre-smoothing                 | 0–2           |

---

## 3. K-Means on Superpixels

- **Why**: Superpixels provide dozens of regions; k-means groups them into semantic layers (background, accent chord, text).
- **Pipeline**:
  1. Compute feature vectors per superpixel (e.g., mean LAB color, area, centroid).
  2. Normalize if mixing scales.
  3. Run k-means with small `k` (3–6).
  4. Inspect resulting clusters; assign semantics manually or heuristically (e.g., highest lightness → background).
- **Outputs**: A cluster id per superpixel; can aggregate statistics or fit geometry (circle arcs) per cluster.

### Heuristic Mapping

| Heuristic                      | Use Case                        |
|--------------------------------|----------------------------------|
| Highest mean L (lightness)     | Background surfaces              |
| Maximum chroma (sqrt(a²+b²))   | Accent strokes or visuals        |
| Lowest lightness               | Text / shadows / outlines        |

---

## 4. Geometry Extraction From Clusters

Once clusters map to motif parts:

1. **Bounding Boxes**: `np.where(cluster_mask)` → min/max to align containers.
2. **Circle / Arc Fit**: Solve a least-squares circle using cluster coordinates.
3. **Stroke Width Estimate**: Inspect radial standard deviation from center.
4. **SVG Path Rebuild**: Convert center, radius, start/end angles into arc commands for React/SVG components.

This creates data-driven UI rebuilds faithful to reference art.

---

## 5. Tooling Stack

- **Python**: `numpy`, `scikit-image` (SLIC), `Pillow` (I/O), `json`.
- **Script**: `scripts/segment_shot_selection.py` (see repo) encapsulates:
  - Loading reference PNG.
  - Running SLIC (`skimage.segmentation.slic`).
  - LAB conversion (`skimage.color.rgb2lab`).
  - K-means for cluster consolidation.
  - Circle fitting (`np.linalg.lstsq`).
  - JSON export consumed by the React prototype.

---

## 6. Variation Landscape

### Classical Alternatives
- **Quickshift**: density-based, better for textured regions.
- **Felzenszwalb**: graph-based hierarchy; adjustable threshold.
- **Watershed**: requires markers; strong for separating touching shapes.
- **Mean Shift**: no k selection, slower.

### Model-Based Alternatives
- **Segment Anything (SAM/SAM2)**: zero-shot, promptable transformer; heavy compute but high fidelity.
- **Mask R-CNN / U-Net**: trainable with labeled datasets; best for large-scale production pipelines.
- **GrabCut / Graph Cut**: energy minimization with user prompts; precise but interactive.

### Color Heuristics
- Good for limited palettes: threshold on Hue/Saturation, region grow, Canny edges + morphology.

---

## 7. Quality Considerations

- **Lighting & Noise**: SLIC may split gradients; adjust `compactness` or smooth with `sigma`.
- **Oversegmentation**: Increase `n_segments`; merge with k-means afterwards.
- **Undersegmentation**: Decrease `compactness` or run a second pass on problematic regions.
- **Post-Processing**: Remove tiny areas, enforce convexity, smooth boundaries.

---

## 8. Implementation Checklist

1. Load RGB → convert to Lab (`rgb2lab`).
2. Run SLIC with tuned parameters.
3. Extract per-superpixel statistics.
4. Cluster superpixels with k-means.
5. Map clusters to motif semantics.
6. Fit geometry & export metrics.
7. Use metrics to drive UI components (colors, arcs, layout).

---

## 9. Surface Area for Further Inquiry

- **Parameter Sensitivity**: How to auto-tune `n_segments` and `compactness` based on image entropy?
- **Cluster Validation**: Can we score cluster quality (silhouette, Davies–Bouldin) to auto-select k?
- **Hybrid Pipelines**: Combine SAM masks as prompts for SLIC refinement.
- **Temporal Consistency**: If processing multiple frames, how to ensure stable superpixel ids?
- **Vectorization**: Methods for converting cluster masks into spline-based SVGs for crisp exports.
- **Color Palette Mapping**: Integrate with design system tokens (e.g., map extracted hex to the canonical palette in `VISUAL-MOTIF-REFERENCE.md`).
- **Automation**: Build CLI that watches a reference directory, re-runs segmentation, updates manifests, and runs snapshot tests against the React prototype.

---

## 10. Further Reading

- Achanta et al., “SLIC Superpixels Compared to State-of-the-Art Superpixel Methods” (2012).
- Scikit-Image docs: [`skimage.segmentation.slic`](https://scikit-image.org/docs/stable/api/skimage.segmentation.html#skimage.segmentation.slic).
- Meta AI, “Segment Anything” paper & GitHub (for deep-learning comparison).
- “Superpixel Benchmark” (Neubert & Protzel, 2012) for a survey of algorithms and metrics.

---

Keep iterating: run the `segment_shot_selection.py` script after any change in reference imagery, inspect the generated `lib/shotSelectionManifest.json`, and compare the React output to confirm fidelity. This loop makes the UI reproducible, auditable, and ready for deeper experimentation. 


