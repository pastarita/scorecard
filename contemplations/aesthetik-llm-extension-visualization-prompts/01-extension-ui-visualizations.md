# Extension UI Visualizations
## IDE Extension Interface Components & Visualizations

---

## 1. Horizontal Scorecard Bar

### Prompt: Complete Scorecard Bar Interface

```
A horizontal scorecard bar interface for IDE extension positioned at the top of the screen. The bar displays "HYPERDIMENSIONAL GOLF SCORECARD" as the title on the left. The bar is divided into two sections: "FRONT 9" and "BACK 9" separated by a vertical divider. Each section shows 9 holes as small squares arranged horizontally. Front 9: holes 1-9, Back 9: holes 10-18. Each hole square shows status with symbols: ○ (not started, gray #CCCCCC), → (in progress, blue-green gradient #6B9BD1), ✓ (complete, green #4CAF50). Below the holes: "OUT: 36" and "IN: 36" with "TOTAL: 72". Progress indicator: "Progress: 45%" with a horizontal progress bar colored from Deep Ocean Blue (#1A5F7A) through Forest Green (#2D5016) to Golden Yellow (#B8860B). Handicap display: "+2.3". Minimal footprint, clean design, golf color scheme. Background: subtle gradient transitioning from Deep Ocean Blue (#1A5F7A) at top to Pale Blue (#E8F4F8) at bottom. Text: Dark Brown (#2C1810) in elegant serif font (Playfair Display style). Accents: Tan (#8B7355). Professional, traditional, elegant. Aspect ratio 16:1 (wide bar), high detail, UI design style.
```

**Use Case**: Extension main interface, scorecard display, theme preview

---

### Prompt: Compact Scorecard Bar

```
A compact version of the scorecard bar showing only essential information. Horizontal bar at top of IDE window. Only shows hole status symbols (○ → ✓) in sequence from left to right, 18 symbols total. Totals displayed in small text: "OUT: 36 IN: 36 TOTAL: 72". Progress: thin progress bar colored with golf terrain gradient (Deep Ocean Blue #1A5F7A → Forest Green #2D5016 → Golden Yellow #B8860B → Burnt Orange #CC5500). Minimal design, maximum information density. Background: transparent or subtle gradient. Clean, minimal, unobtrusive. Aspect ratio 16:1 (wide bar), high detail, UI design style.
```

**Use Case**: Minimal mode, auto-hide mode, compact display

---

## 2. Hole Detail View

### Prompt: Hole Detail Panel

```
A detailed hole view panel showing individual hole information. Hole number: "Hole 1" at top in large serif font. Feature name: "Authentication" in large text below. Metrics displayed in organized layout: Par: 4, Actual: 3, Status: "Under Par -1 ✓" in green. Shots list showing icons: ● Driver (exploratory, Deep Ocean Blue #1A5F7A), ◐ Iron (refinement, Forest Green #2D5016), ◑ Wedge (precision, Golden Yellow #B8860B), ○ Putter (polish, Burnt Orange #CC5500). Terrain visualization: color gradient band from left to right showing Deep Ocean Blue (rough) through Forest Green (fairway) to Golden Yellow (approach) to Burnt Orange (green). Confidence level: 0.85 (Good) displayed as circular gauge with green (#88DD44) fill. Progress bar showing trajectory through semantic space. Notes section at bottom with text area. Background: warm beige (#F5F5DC) like paper scorecard. Text: Dark Brown (#2C1810). Accents: Tan (#8B7355). Clean, organized, informative. Aspect ratio 3:4, high detail, UI design style.
```

**Use Case**: Hole detail modal, expanded view, detailed information

---

## 3. Theme Selection UI

### Prompt: Theme Settings Panel

```
A theme settings panel interface. Title: "Hyperdimensional Golf - Theme Settings" at top in elegant serif font. Current theme dropdown: "Golf Classic" with preview thumbnail showing traditional golf course colors. Below: radio button list of available themes: ○ Golf Classic (traditional, beige/green thumbnail), ○ Golf Ethereal (mystical, rainbow/space thumbnail with purple to cyan gradients), ○ Golf Cliffside (academic, parchment/brown thumbnail with book stack), ○ Golf Space Planet (futuristic, space/blue thumbnail with nebula), ○ Golf Knots (mathematical, gray/abstract thumbnail with knot topology). Each theme has small preview showing characteristic colors: Golf Classic (Deep Ocean Blue #1A5F7A, Forest Green #2D5016, Golden Yellow #B8860B), Golf Ethereal (Purple #667eea, Pink #f093fb, Cyan #4facfe), Golf Cliffside (Stone Gray #4a4a4a, Parchment Brown #8b6914, Gold #d4af37), Golf Space Planet (Deep Space Blue #1a237e, Galaxy Purple #3949ab, Nebula Lavender #7e57c2), Golf Knots (Slate #2c3e50, Teal #16a085, Orange #f39c12). Buttons: [Preview] [Apply] [Reset] at bottom. Background: neutral light gray (#F5F5F5). Clean, organized, professional. Aspect ratio 4:3, high detail, interface design style.
```

**Use Case**: Extension settings, theme selection, configuration

---

## 4. Shot Tracker Component

### Prompt: Shot Tracker Interface

```
A shot tracking interface showing recent shots. Title: "Recent Shots" at top. List of shots with icons: ● Driver (exploratory, Deep Ocean Blue #1A5F7A), ◐ Iron (refinement, Forest Green #2D5016), ◑ Wedge (precision, Golden Yellow #B8860B), ○ Putter (polish, Burnt Orange #CC5500), ↺ Recovery (correction, gray #666666). Each shot shows: timestamp, club type, confidence level (0.0-1.0), terrain position (Rough/Fairway/Approach/Green), description. Color coding: Deep Ocean Blue for rough, Forest Green for fairway, Golden Yellow for approach, Burnt Orange for green. Scrollable list with subtle shadows. Background: subtle gradient from warm beige (#F5F5DC) to pale blue (#E8F4F8). Text: Dark Brown (#2C1810). Clean, organized, informative. Aspect ratio 3:4, high detail, UI design style.
```

**Use Case**: Shot history, tracking display, progress visualization

---

## 5. Prompt Intensity Display

### Prompt: Prompt Intensity Indicator

```
A visual indicator showing prompt intensity and semantic clamp. Circular gauge showing intensity level (0.0-1.0). Current value: 0.6 (medium intensity) displayed prominently. Color gradient around gauge: purple (#667eea, low) transitioning through cyan (#4facfe) to green (#56ab2f, high). Semantic clamp visualization: circular region showing constraint radius as translucent overlay. Club selector: horizontal buttons for Putter (low intensity, shortest club icon), Wedge (medium-low intensity, short club icon), Iron (medium intensity, medium club icon), Driver (high intensity, longest club icon). Visual feedback showing clamp radius for each club: Putter (tight ±0.1), Wedge (moderate-tight ±0.3), Iron (moderate ±0.5), Driver (loose ±0.8). Background: deep space (#0a0e27) with subtle stars. Interactive, informative, visual. Aspect ratio 1:1, high detail, UI design style.
```

**Use Case**: Interactive learning component, prompt intensity visualization

---

## 6. Club Selection Interface

### Prompt: Golf Club Rack Interface

```
A horizontal golf club rack interface for club selection. Four clubs arranged horizontally: Putter (shortest, low intensity, Deep Ocean Blue #1A5F7A), Wedge (short, medium-low intensity, Forest Green #2D5016), Iron (medium, medium intensity, Golden Yellow #B8860B), Driver (longest, high intensity, Burnt Orange #CC5500). Each club shows length visually with proportional sizing. Hover/click to select shows visual feedback: selected club highlighted with glow effect, shows prompt intensity level and semantic clamp magnitude. Below: explanation text for each club. Putter: "Low intensity, tight clamp (±0.1), final precision refinements". Wedge: "Medium-low intensity, moderate-tight clamp (±0.3), approach zone refinement". Iron: "Medium intensity, moderate clamp (±0.5), fairway iteration". Driver: "High intensity, loose clamp (±0.8), initial exploration from rough". Background: subtle gradient from warm beige (#F5F5DC) to pale green (#E8F5E1). Clean, intuitive, skeuomorphic. Aspect ratio 16:3, high detail, UI design style.
```

**Use Case**: Interactive learning, club selection, prompt intensity control

---

## 7. Terrain Position Indicator

### Prompt: Terrain Position Visualization

```
A terrain position indicator showing current position in semantic space. Color-coded zones arranged horizontally: Rough (Deep Ocean Blue #1A5F7A, confidence < 0.6), Fairway (Forest Green #2D5016, confidence 0.6-0.8), Approach (Golden Yellow #B8860B, confidence 0.8-0.95), Green (Burnt Orange #CC5500, confidence > 0.95). Current position marker showing where user is in the journey as a glowing point with trajectory line. Progress path showing trajectory from rough (left) to hole (right) with smooth color transitions. Confidence level: 0.75 (Good) displayed as percentage. Terrain texture visualization showing undulation with subtle contour lines. Background: subtle gradient from Deep Ocean Blue (#1A5F7A) at top to Pale Blue (#E8F4F8) at bottom. Clean, informative, visual. Aspect ratio 16:9, high detail, UI design style.
```

**Use Case**: Position tracking, progress visualization, terrain display

---

## 8. Progress Visualization

### Prompt: Overall Progress Dashboard

```
A progress dashboard showing overall course completion. Title: "Course Progress" at top. Large progress circle showing completion percentage (80%) with color gradient from Deep Ocean Blue (#1A5F7A) through Forest Green (#2D5016) to Golden Yellow (#B8860B). Below: statistics displayed in organized grid: "Holes Completed: 14/18" with green checkmark, "Average Shots: 3.2" with bar chart, "Handicap: +0.5" with trend indicator, "Efficiency: 92%" with gauge. Color-coded sections: Front 9 (Deep Ocean Blue #1A5F7A), Back 9 (Forest Green #2D5016). Mini hole indicators showing status for each of 18 holes arranged in two rows (Front 9 and Back 9). Progress bars for each section. Background: warm beige (#F5F5DC) with subtle paper texture. Text: Dark Brown (#2C1810). Clean, organized, informative. Aspect ratio 4:3, high detail, UI design style.
```

**Use Case**: Progress dashboard, overview display, statistics

---

## 9. Retrospective Generation UI

### Prompt: Retrospective Generation Interface

```
A retrospective generation interface. Title: "Generate Retrospective" at top. Options displayed as radio buttons: ○ "After Front 9", ○ "After Back 9", ● "After Course Complete" (selected). Preview area showing sample retrospective sections: "Patterns Emerging" with bullet points, "Shot Distribution" with pie chart (Driver: 30%, Iron: 40%, Wedge: 20%, Putter: 10%), "Efficiency Metrics" with bar chart, "Strategic Insights" with text blocks. Generate button: [Generate Retrospective] with golf-themed styling. Export options: [Markdown] [PDF] [SVG] buttons. Background: subtle gradient from warm beige (#F5F5DC) to pale blue (#E8F4F8). Text: Dark Brown (#2C1810). Clean, organized, professional. Aspect ratio 4:3, high detail, UI design style.
```

**Use Case**: Retrospective generation, analysis interface, export options

---

## 10. Collaboration Tools UI

### Prompt: Quick Feedback Tool

```
A quick feedback tool interface. Title: "Give Feedback" at top. Form fields: "What hole are you working on?" (dropdown 1-18), "What's working well?" (text area with placeholder), "What could be improved?" (text area with placeholder), "Any blockers?" (text area with placeholder). Submit button: [Submit Feedback] with golf-themed styling. GitHub integration option: "Submit as GitHub Issue" (checkbox). Preview: "This will create an issue in the repository." displayed below. Background: subtle gradient from warm beige (#F5F5DC) to pale green (#E8F5E1). Text: Dark Brown (#2C1810). Clean, simple, accessible. Aspect ratio 4:3, high detail, UI design style.
```

**Use Case**: Feedback collection, collaboration tools, issue creation

---

## 11. Command Palette Integration

### Prompt: Command Palette Interface

```
A command palette interface showing available golf commands. Filter box at top: "Type a command..." with golf-themed styling. Search results showing commands: "Golf: New Scorecard", "Golf: Open Scorecard", "Golf: Track Shot", "Golf: Classify Prompt", "Golf: Switch Theme", "Golf: Export Scorecard", "Golf: Generate Retrospective", "Golf: Show Hole Details", "Golf: Toggle Scorecard". Each command shows keyboard shortcut on the right. Selected command highlighted with Deep Ocean Blue (#1A5F7A) background. Background: dark overlay with semi-transparent panel (warm beige #F5F5DC with 90% opacity). Text: Dark Brown (#2C1810). Clean, familiar VS Code style. Aspect ratio 4:3, high detail, UI design style.
```

**Use Case**: Command palette, quick actions, keyboard shortcuts

---

## 12. Settings Panel

### Prompt: Extension Settings Panel

```
An extension settings panel. Title: "Hyperdimensional Golf Settings" at top. Sections displayed as collapsible panels: "Display" (position: top/bottom/left/right dropdown, visibility: always/on hover/auto-hide dropdown), "Tracking" (auto-track prompts: enabled/disabled toggle, classification: automatic/manual radio buttons), "Theme" (current theme selector with preview), "Integration" (GitHub integration checkbox, LLM integration checkbox). Each section collapsible with expand/collapse icons. Save button: [Save Settings] with golf-themed styling. Reset button: [Reset to Defaults]. Background: neutral light gray (#F5F5F5). Text: Dark Brown (#2C1810). Clean, organized, comprehensive. Aspect ratio 4:3, high detail, UI design style.
```

**Use Case**: Extension settings, configuration, preferences

---

**Next**: See [02-semantic-space-visualizations.md](./02-semantic-space-visualizations.md) for semantic space and LLM interaction prompts



