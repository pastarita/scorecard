---
title: "Hybrid Segmentation Fermi Estimate"
branch: "contemplations/semantic-motifs"
status: "Exploratory · Fermi Analysis"
date: "2025-11-11"
---

# Hybrid Segmentation Fermi Estimate

Quick, order-of-magnitude reasoning about computational cost and potential accuracy gains when combining SLIC+k-means with an LVLM-guided refinement loop.

---

## Baseline Numbers

| Component                    | Approx. Runtime (per 1024×1024 PNG) | Hardware Assumption              |
|-----------------------------|--------------------------------------|----------------------------------|
| SLIC Superpixels            | ~80 ms                               | CPU (Apple M-series)             |
| K-Means on ~200 superpixels | ~10 ms                               | CPU                              |
| Geometry extraction (arcs)  | ~5 ms                                | CPU                              |
| Total deterministic pass    | **~100 ms**                          |                                  |

Accuracy proxy: assume deterministic superpixels yield ~85% correct region boundaries (based on visual inspection, not ground-truth IoU).

---

## Hybrid Additions (Per Iteration)

| Stage                                 | Estimated Cost                 | Notes |
|---------------------------------------|--------------------------------|-------|
| Paint-by-number render + prep         | 20 ms                          | CPU  |
| LVLM inference (GPT-4o mini / similar)| 1.0 s                          | Remote API; vision prompt       |
| Parsing LVLM directives               | 10 ms                          | CPU  |
| Deterministic refinement (merge/split)| 50 ms                          | CPU  |
| **Incremental iteration total**       | **~1.08 s**                    |       |

Assume we run 2 iterations (initial classification + one refinement) → ~2.2 s extra.

---

## Accuracy Uplift Guess

Set baseline segmentation quality \( Q_0 = 0.85 \) (normalized to 1.0 = perfect).  
Assumptions:

1. LVLM correctly identifies missing/merged regions 60% of the time.
2. For each successful correction, local IoU improves by ~10%.
3. Each iteration addresses ~20% of the image area (most ambiguous sections).

Impact per iteration:
\[
\Delta Q \approx 0.60 \times 0.10 \times 0.20 = 0.012
\]

After 2 iterations:  
\[
Q \approx 0.85 + 2 \times 0.012 = 0.874
\]

*Fermi caveat*: numbers are coarse; real gains could be higher if LVLM reliably declares high-level semantics (e.g., "upper-right card is putter" leading to targeted corrections).

Upper-bound scenario: LVLM catches 90% of mistakes, each correction worth 15% IoU on 30% of area.  
\[
\Delta Q_{\text{high}} \approx 0.90 \times 0.15 \times 0.30 = 0.0405 \text{ per iteration}
\]
Two iterations → \( Q \approx 0.85 + 0.081 = 0.931 \).

---

## Efficiency Trade-Off

- Pure deterministic: 0.1 s, quality 0.85.
- Hybrid (2 iterations): 2.3 s, quality 0.87〜0.93.
- Fully LVLM-based (no SLIC): assume ~1.5 s with 0.75〜0.80 quality (LLMs have difficulty tracing boundaries precisely without deterministic support).
- Fully SAM2 (local GPU, no LVLM): ~0.5 s (model inference) + post-processing, quality 0.90〜0.95 if prompts are tuned; but requires heavy model downloads & hardware.

**Efficiency ratio**: hybrid is ~20× slower than deterministic baseline per image, but still interactive (<3 s). Running on batches (e.g., 50 reference shots) yields ~2 minutes, acceptable for tooling pipelines.

---

## Sensitivity Levers

- **LVLM call latency** dominates cost; local LVLM or caching may cut runtime.
- **Iteration count**: quality gains diminish after 1–2 passes; strict convergence criteria keep costs bounded.
- **Deterministic refinement complexity**: we assumed simple merge/split. Advanced operations (graph cuts, curve fitting) could add 100–200 ms.

---

## Overall Takeaways

- Plan for ~2–3 seconds per image when hybrid loop is engaged (vs. 0.1 s baseline).
- Expected quality boost: +2〜8 percentage points in IoU-like metrics, situationally higher if LVLM brings meaningful semantic priors.
- Gains justify cost when: (a) reference images are few but high-value (UI motif canonicalization), (b) manual cleanup is expensive, or (c) we need LVLM-derived annotations (labels, ontology tags) alongside geometric accuracy.

---

## Open Questions

- Can we parallelize LVLM calls or distill prompts to reduce latency?
- How to measure actual IoU without dense ground truth — synthetic testbeds?
- What threshold of LVLM confidence should trigger deterministic overrides?
- Could we share LVLM reasoning across similar motifs (few-shot caching)?

Use this as a starting envelope; real-world benchmarks will refine the priors as we prototype the hybrid loop. 


