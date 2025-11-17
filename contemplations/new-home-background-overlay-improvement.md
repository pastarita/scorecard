---
title: "New Home Background Overlay Improvement"
branch: "contemplations/new-home-background-overlay"
date: "2025-01-XX"
status: "Design · Visual Hierarchy"
---

# New Home Background Overlay Improvement

## Context

The `/new-home` landing page uses `/composed.png` as a hero background image featuring:
- **Golfer** (left side): Golfer in mid-swing, representing the meditative practice
- **Cosmic Vortex** (right side): Swirling hyperdimensional vector space motif
- **Text Content** (left side): Positioned where the golfer appears

Current implementation uses multiple overlapping linear gradients that may be obscuring too much of the image's key elements.

## Current Implementation Analysis

### Existing Gradient Strategy

```52:59:app/new-home/page.tsx
{/* Intentional gradient overlays respecting image structure */}
{/* Left side: Strong overlay for text area (where golfer is) */}
<div className="absolute inset-0 bg-gradient-to-r from-[#eae3d3]/98 via-[#eae3d3]/85 to-[#eae3d3]/60" />
{/* Right side: Lighter overlay to preserve vortex visibility */}
<div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#eae3d3]/30" />
{/* Top: Subtle gradient to preserve sky */}
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#eae3d3]/40" />
{/* Bottom: Gradient to ground the composition */}
<div className="absolute inset-0 bg-gradient-to-t from-[#eae3d3]/50 via-transparent to-transparent" />
```

### Issues Identified

1. **Over-obscuration**: 98% opacity on left side heavily obscures the golfer
2. **Multiple Overlays**: Four separate gradients stack, creating cumulative opacity
3. **Linear Approach**: Linear gradients don't follow the image's natural composition
4. **Vortex Preservation**: Right-side gradient may still interfere with vortex visibility

## Improvement Strategies

### Strategy 1: Radial Gradient from Text Area

**Concept**: Use a radial gradient emanating from the text content area, creating a "spotlight" effect that preserves the golfer and vortex while ensuring text readability.

**Implementation Approach**:
- Single radial gradient centered on left-middle (where text sits)
- Strong opacity near text, fading to transparent
- Preserves golfer silhouette and vortex on edges

**Pros**:
- Single overlay reduces complexity
- Natural falloff preserves image edges
- Follows visual hierarchy (text needs most contrast)

**Cons**:
- May need fine-tuning of center point and radius
- Could create unnatural circular fade

### Strategy 2: Selective Mask with Reduced Opacity

**Concept**: Use a more targeted mask that only covers the text area, with reduced overall opacity.

**Implementation Approach**:
- Gradient mask that follows text block shape (rectangular with soft edges)
- Lower base opacity (60-70% instead of 98%)
- Preserve golfer above/below text area
- Keep vortex completely unobscured

**Pros**:
- Minimal interference with image elements
- Text remains readable
- Preserves golfer and vortex visibility

**Cons**:
- More complex CSS (may need clip-path or mask-image)
- Responsive behavior needs careful handling

### Strategy 3: Asymmetric Radial Gradient

**Concept**: Combine radial and linear approaches—strong radial fade from text area, with asymmetric falloff that preserves golfer and vortex.

**Implementation Approach**:
- Radial gradient from left-center
- Asymmetric stops: faster fade toward golfer, slower fade toward vortex
- Single overlay with carefully tuned stops

**Pros**:
- Balances text readability with image preservation
- Single overlay simplifies code
- Natural-looking falloff

**Cons**:
- Requires precise stop positioning
- May need responsive adjustments

### Strategy 4: Layered Selective Overlays (Refined)

**Concept**: Keep layered approach but reduce opacity and make gradients more selective.

**Implementation Approach**:
- Primary: Radial gradient from text (max 70% opacity)
- Secondary: Subtle linear gradient from left edge (max 30% opacity)
- Remove top/bottom gradients (or reduce to 10-15%)

**Pros**:
- Incremental improvement over current
- Maintains existing structure
- Easier to implement

**Cons**:
- Still uses multiple overlays
- May not fully solve obscuration

## Recommended Approach: Strategy 3 (Asymmetric Radial Gradient)

### Rationale

1. **Single Overlay**: Simplifies code and reduces cumulative opacity
2. **Natural Falloff**: Radial gradient creates organic fade
3. **Selective Preservation**: Asymmetric stops can preserve both golfer and vortex
4. **Text Readability**: Strong opacity near text ensures legibility

### Implementation Details

```tsx
{/* Single asymmetric radial gradient */}
<div 
  className="absolute inset-0"
  style={{
    background: `radial-gradient(
      ellipse 80% 100% at 25% 50%,
      ${baseColor}CC 0%,
      ${baseColor}80 20%,
      ${baseColor}40 40%,
      transparent 70%
    )`
  }}
/>
```

**Parameters to Tune**:
- **Ellipse dimensions**: `80% 100%` creates wider horizontal fade
- **Center position**: `25% 50%` positions near text area
- **Opacity stops**: Gradual fade from 80% to transparent
- **Color**: Use `#eae3d3` (current base color)

### Responsive Considerations

- **Mobile**: May need tighter ellipse (60% 80%) and higher center opacity
- **Tablet**: Similar to desktop but slightly adjusted center
- **Desktop**: Full asymmetric radial as specified

## Alternative: CSS Mask Approach

If radial gradient doesn't achieve desired effect, consider CSS `mask-image`:

```tsx
<div 
  className="absolute inset-0 bg-[#eae3d3]"
  style={{
    maskImage: `radial-gradient(
      ellipse 70% 90% at 30% 50%,
      black 0%,
      black 25%,
      transparent 60%
    )`,
    WebkitMaskImage: `radial-gradient(
      ellipse 70% 90% at 30% 50%,
      black 0%,
      black 25%,
      transparent 60%
    )`
  }}
/>
```

This creates a "cutout" effect rather than overlay, potentially more dramatic.

## Testing Checklist

- [ ] Golfer silhouette remains visible (especially swing arc)
- [ ] Vortex pattern on right remains prominent
- [ ] Text maintains sufficient contrast for readability
- [ ] Gradient feels natural, not artificial
- [ ] Works across mobile, tablet, desktop breakpoints
- [ ] No harsh edges or visible gradient boundaries
- [ ] Maintains scorecard aesthetic (`#eae3d3` base color)

## Next Steps

1. **Prototype**: Implement Strategy 3 (asymmetric radial gradient)
2. **Test**: Visual inspection across breakpoints
3. **Iterate**: Adjust ellipse dimensions and opacity stops
4. **Fallback**: If radial doesn't work, try CSS mask approach
5. **Document**: Update implementation with rationale

## Related Files

- `app/new-home/page.tsx` - Implementation location
- `/public/composed.png` - Background image reference
- `app/globals.css` - Base color definitions

---

**Status**: Ready for prototype implementation
**Priority**: Medium (visual polish, not blocking functionality)

