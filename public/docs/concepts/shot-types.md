# Development-as-Golf Shot Playbook (v4)

The shot playbook is the canonical reference for aligning prompting technique with the development-as-golf metaphor. It pairs each shot archetype with its visual motif and the instructional guidance captured in `devolopment-as-golf_dev/golf-philosophy-talk-v4.md`.

![Course Overview](/diagrams/devolopment-as-golf_dev/files/development-as-golf.svg)

## How to Use This Document

- Treat every section as a self-contained learning card inside the documentation sidebar container.
- Each shot includes its SVG motif, operational framing, and a didactic case that can be reused in prototypes or walkthroughs.
- Apply the quick-reference table when selecting clubs inside IDE Explorer flows or during facilitation sessions.

## Quick Reference

| Shot | Confidence Window | Semantic Distance | Primary Intent | SVG |
| --- | --- | --- | --- | --- |
| Putter | 95-100% | 1-5% | Precision finishing | `/diagrams/devolopment-as-golf_dev/shot-visualizations/01-putter.svg` |
| Driver | 40-70% | 50-80% | Broad exploration | `/diagrams/devolopment-as-golf_dev/shot-visualizations/02-driver.svg` |
| Iron | 60-80% | 30-50% | Steady build | `/diagrams/devolopment-as-golf_dev/shot-visualizations/03-iron.svg` |
| Wedge | 70-90% | 20-40% | Vertical specificity | `/diagrams/devolopment-as-golf_dev/shot-visualizations/04-wedge.svg` |
| Recovery | 30-60% | Safety reset | Return to playable | `/diagrams/devolopment-as-golf_dev/shot-visualizations/05-recovery.svg` |
| Chip | 85-95% | 5-15% | Green entry | `/diagrams/devolopment-as-golf_dev/shot-visualizations/06-chip.svg` |
| Curve | 60-80% | 30-50% | Constraint-aware reroute | `/diagrams/devolopment-as-golf_dev/shot-visualizations/07-curve.svg` |
| Drop | Reset | Backtrack | Known-good revert | `/diagrams/devolopment-as-golf_dev/shot-visualizations/08-drop.svg` |
| Layup | 60-80% | Intentional short | Optimal positioning | `/diagrams/devolopment-as-golf_dev/shot-visualizations/09-layup.svg` |
| Punch | 60-80% | 30-50% | Low trajectory, constraint compliance | `/diagrams/devolopment-as-golf_dev/shot-visualizations/10-punch.svg` |

---

## Putter — Precision Finishing

![Putter Shot Visualization](/diagrams/devolopment-as-golf_dev/shot-visualizations/01-putter.svg)

**Use when** you are already on the semantic green and only need micro-adjustments.

- Heuristic: keep change within 5% semantic distance and target a single attribute.
- Practice motif: perform micro copy edits, color adjustments, or pixel nudges without introducing new scope.

---

## Driver — Expansion & Coverage

![Driver Shot Visualization](/diagrams/devolopment-as-golf_dev/shot-visualizations/02-driver.svg)

**Use when** starting from the tee or rebasing broad problem areas with low certainty.

- Heuristic: accept variance to gain 50-80% distance toward the feature or narrative arc.
- Practice motif: generate first-pass flows (checkout, auth scaffolding, documentation skeletons) knowing follow-up shots will refine.

---

## Iron — Workhorse Progression

![Iron Shot Visualization](/diagrams/devolopment-as-golf_dev/shot-visualizations/03-iron.svg)

**Use when** advancing the main line with predictable constraints and moderate confidence.

- Heuristic: add 2-4 concrete constraints per iteration to maintain steady momentum.
- Practice motif: hook up API endpoints, add structured fields, or flesh out reusable components where coverage and correctness balance.

---

## Wedge — Vertical Specificity

![Wedge Shot Visualization](/diagrams/devolopment-as-golf_dev/shot-visualizations/04-wedge.svg)

**Use when** you are near the hole but must deepen quality, resilience, or polish before finishing.

- Heuristic: drive depth (error handling, accessibility, edge validation) without widening scope.
- Practice motif: add comprehensive validation, async safeguards, or fallback UI that set up the final putt.

---

## Recovery — Back to Playable Terrain

![Recovery Shot Visualization](/diagrams/devolopment-as-golf_dev/shot-visualizations/05-recovery.svg)

**Use when** the current line has drifted into semantic rough or scope creep.

- Heuristic: pick the cheapest safe path back to the fairway; progress loss beats compounding errors.
- Practice motif: acknowledge misaligned iterations, restate the last known-good checkpoint, and restart from clarified intent.

---

## Chip — Green-Edge Finesse

![Chip Shot Visualization](/diagrams/devolopment-as-golf_dev/shot-visualizations/06-chip.svg)

**Use when** you sit just off the green and need controlled placement for the finishing putt.

- Heuristic: operate in the 85-95% confidence band with subtle layout, interaction, or responsive adjustments.
- Practice motif: align elements, add hover states, or adjust responsive breakpoints to land on the green.

---

## Curve — Intentional Trajectory Shift

![Curve Shot Visualization](/diagrams/devolopment-as-golf_dev/shot-visualizations/07-curve.svg)

**Use when** the straight path collides with constraints or alternative perspectives are required.

- Heuristic: name the obstacle and describe the redirected semantic path explicitly.
- Practice motif: reframe prompts to adopt functional vs. OOP approaches, prioritize mobile-first strategies, or adjust to stakeholder context.

---

## Drop — Penalty Reset

![Drop Shot Visualization](/diagrams/devolopment-as-golf_dev/shot-visualizations/08-drop.svg)

**Use when** the only viable move is a controlled revert to a known-good baseline.

- Heuristic: compare future cost of continuation against reverting; take the drop when restart is cheaper.
- Practice motif: use version control checkpoints or prompt history to resume from a validated iteration.

---

## Layup — Strategic Positioning

![Layup Shot Visualization](/diagrams/devolopment-as-golf_dev/shot-visualizations/09-layup.svg)

**Use when** direct hero shots risk hazards and a staging position offers higher overall EV.

- Heuristic: prioritize risk mitigation and set up a friendly next shot, even if progress is modest.
- Practice motif: ship an MVP slice, adopt baseline libraries first, or validate assumptions before costly refinements.

---

## Punch — Constraint Compliance

![Punch Shot Visualization](/diagrams/devolopment-as-golf_dev/shot-visualizations/10-punch.svg)

**Use when** overhead constraints prevent large swings, yet purposeful distance is necessary.

- Heuristic: treat constraints as design parameters, maintaining controlled output while honoring legacy or platform limits.
- Practice motif: adapt features inside rigid architectures, stay within API quotas, or support older client versions without refactors.

---

## Embedding in the Documentation Tab

- Place this markdown under `/docs/concepts/shot-types` in the documentation navigation to provide a standalone learning container for IDE and presentation contexts.
- Pair each shot section with interactive components (e.g., `ShotTrajectory` or `PerspectiveHoleView`) when extending prototypes for guided study.
- Reference the same SVG assets in demo components to maintain visual parity between documentation and live tooling.



