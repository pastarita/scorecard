# Fog/Weather System - Uncertainty & Clarity Visualization

## Overview

The fog/weather system is an interactive metaphor for representing uncertainty and clarity in feature implementation. It extends the golf metaphor to visualize how understanding improves through iteration.

## Metaphor

### Fog = Uncertainty
- **Dense Fog** = Complete uncertainty about the feature
- **Light Fog** = Some understanding, but still unclear
- **No Fog** = Complete clarity and understanding

### Weather = External Factors
- **Clear** = No external factors affecting implementation
- **Windy** = Directional factors affecting understanding
- **Rainy** = Additional complexity
- **Stormy** = Significant external challenges

### Wind = Direction of Understanding
- **Wind Direction** = Direction of understanding (north, south, east, west, etc.)
- **Wind Strength** = How strongly understanding is directed

### Clarity = Understanding Level
- **0% Clarity** = Completely foggy (no understanding)
- **100% Clarity** = Completely clear (full understanding)

## Components

### 1. FogOverlay
Visual representation of fog/weather conditions over the hole frame.

**Props:**
- `fogIntensity`: "none" | "light" | "medium" | "heavy" | "dense"
- `weatherCondition`: "clear" | "windy" | "rainy" | "stormy"
- `windDirection`: "north" | "south" | "east" | "west" | etc.
- `windStrength`: 0-1 (0 = no wind, 1 = strong wind)
- `clarity`: 0-1 (0 = foggy, 1 = clear)

**Features:**
- Fog particles effect
- Weather visualization (rain, storm)
- Wind arrows showing direction
- Clarity indicator badge

### 2. FogController
Interactive component for editing fog/weather conditions.

**Features:**
- Clarity slider (0-100%)
- Fog intensity selector
- Weather condition selector
- Wind direction selector
- Wind strength slider
- "Clear All Fog" button

**Purpose:**
- Contemplation tool for prompt shaping
- Visualize different understanding states
- Experiment with clarity levels
- Clear fog as understanding improves

### 3. useFogState Hook
Calculates fog state from hole implementation data.

**Logic:**
- **Clarity Calculation:**
  - Complete holes = 100% clarity
  - No shots = 0% clarity
  - Each shot adds 20% clarity (max 100%)
  - Average confidence contributes to clarity
  - In-progress status adds 10% boost

- **Fog Intensity:**
  - Clarity >= 90% = No fog
  - Clarity >= 70% = Light fog
  - Clarity >= 50% = Medium fog
  - Clarity >= 30% = Heavy fog
  - Clarity < 30% = Dense fog

**Returns:**
- Fog state object
- Update function for manual editing

### 4. FoggedHoleFrame
Wrapper component that adds fog overlay to HoleFrame.

**Features:**
- Integrates fog overlay into hole frame
- Connects fog state to hole data
- Provides interactive fog controller
- Automatically clears fog as understanding improves

## Usage

### Automatic Fog Clearing
Fog automatically clears based on:
1. **Number of shots** (iterations)
2. **Confidence levels** (shot confidence)
3. **Status** (complete = 100% clear)

### Manual Fog Control
Users can manually adjust fog using the FogController:
1. Click the fog icon (🌫️) in bottom-left of hole frame
2. Adjust clarity slider
3. Change fog intensity
4. Modify weather conditions
5. Set wind direction and strength
6. Click "Clear All Fog" to instantly clear

## Integration

### In HorizontalScorecardBar
```tsx
<FoggedHoleFrame hole={hole} isActive={isActive} isEditable={true}>
  {/* SVG and overlays */}
</FoggedHoleFrame>
```

### In ResponsiveScorecardBar
Same integration - fog works across all scorecard views.

## Visual Effects

### Fog Particles
- White semi-transparent circles
- Gaussian blur effect
- Density based on fog intensity
- Opacity based on clarity

### Weather Effects
- **Rain**: Diagonal lines
- **Storm**: Dark gradient overlay
- **Wind**: Directional arrows

### Clarity Indicator
- Badge showing clarity percentage
- Only visible when clarity > 50%
- Positioned in top-right corner

## Contemplation Tool

The fog system serves as a **contemplation tool** for prompt shaping:

1. **Visualize Uncertainty**: See how foggy your understanding is
2. **Experiment with Clarity**: Adjust clarity to see different states
3. **Shape Prompts**: Use fog state to inform prompt design
4. **Track Progress**: Watch fog clear as you iterate
5. **Understand Factors**: See how weather/wind affect understanding

## Future Enhancements

- **Fog History**: Track fog changes over time
- **Fog Patterns**: Different fog patterns for different feature types
- **Weather Events**: Special weather events (thunderstorms, etc.)
- **Fog Presets**: Save/load fog configurations
- **Fog Analytics**: Analyze fog patterns across holes

