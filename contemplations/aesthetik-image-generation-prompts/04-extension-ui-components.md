# Extension UI Components Prompts
## IDE Extension Interface Elements

---

## 1. Horizontal Scorecard Bar

### Prompt: Scorecard Bar Layout

```
A horizontal scorecard bar interface for IDE extension. Top of screen, thin horizontal bar. Title: "HYPERDIMENSIONAL GOLF SCORECARD" 
at left. Two sections: "FRONT 9" and "BACK 9" separated by divider. Each section shows 9 holes as small squares. Front 9: 
holes 1-9, Back 9: holes 10-18. Each hole square shows status: ○ (not started, gray), → (in progress, blue/green), ✓ (complete, 
green). Below: "OUT: 36" and "IN: 36" with "TOTAL: 72". Progress indicator: "Progress: 45%" with progress bar. Handicap: 
"+2.3". Minimal footprint, clean design, golf color scheme. Background: subtle gradient or solid color. Aspect ratio 16:1 
(wide bar), high detail, UI design style.
```

**Use Case**: Extension main interface, scorecard display

---

### Prompt: Compact Scorecard Bar

```
A compact version of the scorecard bar showing only essential information. Horizontal bar at top of IDE. Only shows hole 
status symbols (○ → ✓) in sequence. Totals: "OUT: 36 IN: 36 TOTAL: 72" in small text. Progress: thin progress bar. 
Minimal design, maximum information density. Background: transparent or subtle. Clean, minimal, unobtrusive. Aspect ratio 
16:1 (wide bar), high detail, UI design style.
```

**Use Case**: Minimal mode, auto-hide mode, compact display

---

## 2. Hole Detail View

### Prompt: Hole Detail Panel

```
A detailed hole view panel showing individual hole information. Hole number: "Hole 1" at top. Feature name: "Authentication" 
in large text. Metrics: Par: 4, Actual: 3, Status: "Under Par -1 ✓". Shots list: ● Driver (exploratory), ◐ Iron (refinement), 
◑ Wedge (precision). Terrain visualization: color gradient from blue (rough) through green (fairway) to yellow (approach) to 
orange (green). Confidence level: 0.85 (Good). Progress bar showing trajectory. Notes section at bottom. Background: 
subtle gradient. Clean, organized, informative. Aspect ratio 3:4, high detail, UI design style.
```

**Use Case**: Hole detail modal, expanded view, detailed information

---

## 3. Theme Selection UI

### Prompt: Theme Settings Panel

```
A theme settings panel interface. Title: "Hyperdimensional Golf - Theme Settings" at top. Current theme dropdown: 
"Golf Classic" with preview thumbnail. Below: radio button list of available themes: ○ Golf Classic (traditional, beige/green 
thumbnail), ○ Golf Ethereal (mystical, rainbow/space thumbnail), ○ Golf Cliffside (academic, parchment/brown thumbnail), 
○ Golf Space Planet (futuristic, space/blue thumbnail), ○ Golf Knots (mathematical, gray/abstract thumbnail). Each theme 
has small preview showing characteristic colors. Buttons: [Preview] [Apply] [Reset]. Background: neutral light gray. Clean, 
organized, professional. Aspect ratio 4:3, high detail, UI design style.
```

**Use Case**: Extension settings, theme selection, configuration

---

## 4. Shot Tracker Component

### Prompt: Shot Tracker Interface

```
A shot tracking interface showing recent shots. Title: "Recent Shots" at top. List of shots with icons: ● Driver (exploratory, 
blue), ◐ Iron (refinement, green), ◑ Wedge (precision, yellow), ○ Putter (polish, orange), ↺ Recovery (correction, gray). 
Each shot shows: timestamp, club type, confidence level, terrain position, description. Color coding: blue for rough, green 
for fairway, yellow for approach, orange for green. Scrollable list. Background: subtle gradient. Clean, organized, informative. 
Aspect ratio 3:4, high detail, UI design style.
```

**Use Case**: Shot history, tracking display, progress visualization

---

## 5. Prompt Intensity Display

### Prompt: Prompt Intensity Indicator

```
A visual indicator showing prompt intensity and semantic clamp. Circular gauge showing intensity level (0.0-1.0). Current 
value: 0.6 (medium intensity). Color gradient: purple (low) to green (high). Semantic clamp visualization: circular region 
showing constraint radius. Club selector: buttons for Putter (low), Wedge (medium-low), Iron (medium), Driver (high). 
Visual feedback showing clamp radius for each club. Background: dark space (#0a0e27). Interactive, informative, visual. 
Aspect ratio 1:1, high detail, UI design style.
```

**Use Case**: Interactive learning component, prompt intensity visualization

---

## 6. Club Selection Interface

### Prompt: Golf Club Rack Interface

```
A horizontal golf club rack interface for club selection. Four clubs arranged horizontally: Putter (shortest, low intensity), 
Wedge (short, medium-low intensity), Iron (medium, medium intensity), Driver (longest, high intensity). Each club shows length 
visually, hover/click to select. Visual feedback: selected club highlighted, shows prompt intensity level and semantic clamp 
magnitude. Below: explanation text for each club. Background: subtle gradient. Clean, intuitive, skeuomorphic. Aspect ratio 
16:3, high detail, UI design style.
```

**Use Case**: Interactive learning, club selection, prompt intensity control

---

## 7. Terrain Position Indicator

### Prompt: Terrain Position Visualization

```
A terrain position indicator showing current position in semantic space. Color-coded zones: Rough (blue #1A5F7A), Fairway 
(green #2D5016), Approach (yellow #B8860B), Green (orange #CC5500), Hole (red #8B0000). Current position marker showing 
where user is in the journey. Progress path showing trajectory from rough to hole. Confidence level: 0.75 (Good). Terrain 
texture visualization showing undulation. Background: subtle gradient. Clean, informative, visual. Aspect ratio 16:9, high 
detail, UI design style.
```

**Use Case**: Position tracking, progress visualization, terrain display

---

## 8. Progress Visualization

### Prompt: Overall Progress Dashboard

```
A progress dashboard showing overall course completion. Title: "Course Progress" at top. Large progress circle showing 
completion percentage (80%). Below: statistics: "Holes Completed: 14/18", "Average Shots: 3.2", "Handicap: +0.5", 
"Efficiency: 92%". Color-coded sections: Front 9 (blue), Back 9 (green). Mini hole indicators showing status for each 
of 18 holes. Progress bars for each section. Background: subtle gradient. Clean, organized, informative. Aspect ratio 
4:3, high detail, UI design style.
```

**Use Case**: Progress dashboard, overview display, statistics

---

## 9. Retrospective Generation UI

### Prompt: Retrospective Generation Interface

```
A retrospective generation interface. Title: "Generate Retrospective" at top. Options: "After Front 9", "After Back 9", 
"After Course Complete". Selected: "After Course Complete". Preview area showing sample retrospective sections: "Patterns 
Emerging", "Shot Distribution", "Efficiency Metrics", "Strategic Insights". Generate button: [Generate Retrospective]. 
Export options: [Markdown] [PDF] [SVG]. Background: subtle gradient. Clean, organized, professional. Aspect ratio 4:3, high 
detail, UI design style.
```

**Use Case**: Retrospective generation, analysis interface, export options

---

## 10. Collaboration Tools UI

### Prompt: Quick Feedback Tool

```
A quick feedback tool interface. Title: "Give Feedback" at top. Form fields: "What hole are you working on?" (dropdown 1-18), 
"What's working well?" (text area), "What could be improved?" (text area), "Any blockers?" (text area). Submit button: 
[Submit Feedback]. GitHub integration option: "Submit as GitHub Issue" (checkbox). Preview: "This will create an issue in 
the repository." Background: subtle gradient. Clean, simple, accessible. Aspect ratio 4:3, high detail, UI design style.
```

**Use Case**: Feedback collection, collaboration tools, issue creation

---

## 11. Prompt Template Generator

### Prompt: Prompt Template Generator Interface

```
A prompt template generator interface. Title: "Generate Prompt Template" at top. Form fields: "Hole number" (dropdown 1-18), 
"Archetype" (dropdown: Precision/Convergent/Explorer/Creative), "Current terrain" (dropdown: Rough/Fairway/Approach/Green). 
Generated template preview showing structured prompt with context, goal, constraints, strategy. Copy button: [Copy Prompt]. 
Use button: [Use in LLM]. Background: subtle gradient. Clean, organized, helpful. Aspect ratio 4:3, high detail, UI design 
style.
```

**Use Case**: Prompt assistance, template generation, structured prompting

---

## 12. Export Functionality UI

### Prompt: Export Scorecard Interface

```
An export scorecard interface. Title: "Export Scorecard" at top. Export format options: ○ SVG visualization, ○ JSON data, 
○ Markdown summary, ○ PDF scorecard. Selected: SVG visualization. Preview area showing sample export. Options: Include 
images, Include styling, Include metadata. Export button: [Export]. Background: subtle gradient. Clean, organized, functional. 
Aspect ratio 4:3, high detail, UI design style.
```

**Use Case**: Export functionality, sharing options, format selection

---

## 13. Interactive Learning Component

### Prompt: Interactive Learning Interface

```
An interactive learning component interface. Title: "Golf Club Learning" at top. Club selector: Putter, Wedge, Iron, Driver 
(horizontal buttons). Selected: Iron. Display area showing: Club details (Iron, Medium intensity, Moderate clamp), 
Mathematical concept (Iterative refinement, path following), Code generation (Systematic improvements across components), 
LLM pattern (Structured prompts with iteration guidelines), Semantic space (Moderate exploration with direction). Example 
code snippet below. Interactive, educational, informative. Background: dark space (#0a0e27). Aspect ratio 16:9, high detail, 
UI design style.
```

**Use Case**: Interactive learning, educational component, club explanation

---

## 14. Settings Panel

### Prompt: Extension Settings Panel

```
An extension settings panel. Title: "Hyperdimensional Golf Settings" at top. Sections: "Display" (position: top/bottom/left/right, 
visibility: always/on hover/auto-hide), "Tracking" (auto-track prompts: enabled/disabled, classification: automatic/manual), 
"Theme" (current theme selector), "Integration" (GitHub integration, LLM integration). Each section collapsible. Save 
button: [Save Settings]. Reset button: [Reset to Defaults]. Background: neutral light gray. Clean, organized, comprehensive. 
Aspect ratio 4:3, high detail, UI design style.
```

**Use Case**: Extension settings, configuration, preferences

---

## 15. Command Palette Integration

### Prompt: Command Palette Interface

```
A command palette interface showing available golf commands. Filter box at top: "Type a command..." Search results showing 
commands: "Golf: New Scorecard", "Golf: Open Scorecard", "Golf: Track Shot", "Golf: Classify Prompt", "Golf: Switch Theme", 
"Golf: Export Scorecard", "Golf: Generate Retrospective", "Golf: Show Hole Details", "Golf: Toggle Scorecard". Each 
command shows keyboard shortcut. Selected command highlighted. Background: dark overlay with semi-transparent panel. Clean, 
familiar VS Code style. Aspect ratio 4:3, high detail, UI design style.
```

**Use Case**: Command palette, quick actions, keyboard shortcuts

---

**Next**: See [05-golf-course-visualizations.md](./05-golf-course-visualizations.md) for course layout prompts

