/**
 * Shot Types Data
 * 
 * Complete data structure for the 10 shot archetypes from the
 * Development-as-Golf framework. Used for slide presentations
 * and documentation.
 */

export interface Heuristic {
  title: string;
  description: string;
}

export interface ShotType {
  id: string;
  name: string;
  number: number;
  artifactDefinition: {
    shotType: string;
    when: string;
    distance: string;
    purpose: string;
  };
  characteristics: string;
  examplePrompts: string[];
  heuristics: Heuristic[];
  strategicNote?: string;
  visualizationPath: string;
  confidenceWindow: string;
  semanticDistance: string;
  primaryIntent: string;
}

export const shotTypes: ShotType[] = [
  {
    id: "putter",
    name: "Putter",
    number: 1,
    artifactDefinition: {
      shotType: "Putter",
      when: "On green, 95%+ confidence",
      distance: "1-5% semantic change",
      purpose: "Precision refinement only",
    },
    characteristics: "Very short distance · Very high confidence · Minimal variance · No new concepts introduced",
    examplePrompts: [
      "Change the blue to #0066cc",
      "Add 2px padding to button",
      "Fix typo: recieve → receive",
      "Round to 2 decimals instead of 3",
    ],
    heuristics: [
      {
        title: "Heuristic 1: Minimal Semantic Distance",
        description: "A putter shot should never move more than 5% of the semantic distance to the goal. If your prompt introduces new concepts or significantly changes structure, you're not putting—you're chipping or wedging.",
      },
      {
        title: "Heuristic 2: Single-Point Correction",
        description: "Putter shots target one specific attribute: color, spacing, typography, wording. If you're correcting multiple unrelated things, you're taking multiple shots. Be surgical.",
      },
    ],
    strategicNote: "Putter shots never introduce new features—only refine what's 95%+ correct. Like the golfer on the cliff, you're already at the edge of perfection—just need that final tap.",
    visualizationPath: "/diagrams/devolopment-as-golf_dev/shot-visualizations/01-putter.svg",
    confidenceWindow: "95-100%",
    semanticDistance: "1-5%",
    primaryIntent: "Precision finishing",
  },
  {
    id: "driver",
    name: "Driver",
    number: 2,
    artifactDefinition: {
      shotType: "Driver",
      when: "From tee, broad exploration",
      distance: "50-80% toward goal",
      purpose: "Cover maximum distance quickly",
    },
    characteristics: "Very long distance · Low-moderate confidence (40-70%) · High variance acceptable · Quick ground coverage",
    examplePrompts: [
      "Create full e-commerce checkout flow",
      "Build data visualization dashboard",
      "Implement user authentication system",
      "Generate complete API documentation",
    ],
    heuristics: [
      {
        title: "Heuristic 1: Broad Ground Coverage",
        description: "A driver shot should cover 50-80% of the semantic distance to your goal. If you're getting less than 50% coverage, you're under-driving. If you're trying to hit 100%, you're unrealistic—expect follow-up shots.",
      },
      {
        title: "Heuristic 2: Accept Variance for Speed",
        description: "Driver shots prioritize distance over precision. High variance is acceptable—you're exploring, not refining. Think of it like the golfer on the cliff taking a big swing into the unknown—you'll adjust later.",
      },
    ],
    strategicNote: "Trade-off: Distance vs. accuracy. Driver sacrifices precision for coverage. Expect follow-up shots needed. Like the golfer's initial drive, it gets you in the game—you'll refine from there.",
    visualizationPath: "/diagrams/devolopment-as-golf_dev/shot-visualizations/02-driver.svg",
    confidenceWindow: "40-70%",
    semanticDistance: "50-80%",
    primaryIntent: "Broad exploration",
  },
  {
    id: "iron",
    name: "Iron",
    number: 3,
    artifactDefinition: {
      shotType: "Iron",
      when: "Mid-fairway, steady progress",
      distance: "30-50% toward goal",
      purpose: "Balanced distance + accuracy",
    },
    characteristics: "Medium distance · Moderate confidence (60-80%) · Workhorse shot · Most common (>50% of shots)",
    examplePrompts: [
      "Add these three fields to the form",
      "Implement sorting by date and name",
      "Create reusable component for cards",
      "Connect API endpoint to UI display",
    ],
    heuristics: [
      {
        title: "Heuristic 1: The Workhorse Principle",
        description: "Iron shots should make up >50% of your development journey. If you're using drivers or putters more than irons, you're either over-exploring or over-polishing. Iron is steady, reliable progress.",
      },
      {
        title: "Heuristic 2: Incremental Constraint Addition",
        description: "Each iron shot adds 2-4 concrete constraints or features. Too few (1) and you're underutilizing the shot. Too many (5+) and you're trying to drive—break it into multiple iron shots.",
      },
    ],
    strategicNote: "Most Common: Iron is the default shot for >50% of development. Reliable, predictable progression. Like the golfer building position shot by shot, each iron moves you closer with controlled certainty.",
    visualizationPath: "/diagrams/devolopment-as-golf_dev/shot-visualizations/03-iron.svg",
    confidenceWindow: "60-80%",
    semanticDistance: "30-50%",
    primaryIntent: "Steady build",
  },
  {
    id: "wedge",
    name: "Wedge",
    number: 4,
    artifactDefinition: {
      shotType: "Wedge",
      when: "Near goal, need vertical specificity",
      distance: "20-40% toward goal",
      purpose: "High-arc approach with control",
    },
    characteristics: "Short-medium distance · Moderate-high confidence (70-90%) · Soft landing in precise zone · Setup for final putt",
    examplePrompts: [
      "Add error handling with try-catch blocks",
      "Implement input validation for edge cases",
      "Create fallback UI for loading states",
      "Add accessibility attributes (ARIA labels)",
    ],
    heuristics: [
      {
        title: "Heuristic 1: Vertical Specificity Over Horizontal Coverage",
        description: "Wedge shots prioritize depth (quality, completeness) over breadth (coverage). You're not adding new features—you're making existing ones robust. Think comprehensive error handling, not more fields.",
      },
      {
        title: "Heuristic 2: Soft Landing Zone",
        description: "A wedge shot should land you in the 85-95% confidence zone—close enough for a putt, but not so close that you wasted a wedge. If you're already at 95%, use a putter. If you're at 70%, use a wedge.",
      },
    ],
    strategicNote: "Critical Phase: Wedge shots bridge \"mostly done\" (fairway) and \"ready to polish\" (green). Like the golfer's approach shot, it sets you up for the final tap-in.",
    visualizationPath: "/diagrams/devolopment-as-golf_dev/shot-visualizations/04-wedge.svg",
    confidenceWindow: "70-90%",
    semanticDistance: "20-40%",
    primaryIntent: "Vertical specificity",
  },
  {
    id: "recovery",
    name: "Recovery Shot",
    number: 5,
    artifactDefinition: {
      shotType: "Recovery Shot",
      when: "Off-track, outside target zone",
      distance: "Short-medium (safety priority)",
      purpose: "Return to playable area",
    },
    characteristics: "Priority is safety over distance · Get back to fairway/rough · Accept position loss · Learn from mistake",
    examplePrompts: [
      "Revert to last known-good state",
      "Restart from checkpoint before scope creep",
      "Return to original requirements",
      "Undo recent changes that went off-track",
    ],
    heuristics: [
      {
        title: "Heuristic 1: Safety Over Distance",
        description: "Recovery shots prioritize getting back to playable terrain over maintaining progress. If you're 80% to goal but in the wrong direction, accept that you need to go back to 60% in the right direction. Distance lost is better than continued wrong direction.",
      },
      {
        title: "Heuristic 2: Early Recognition Penalty",
        description: "The sooner you recognize you're off-track, the cheaper the recovery. If you're 3 iterations off-track, recovery costs 1-2 shots. If you're 10 iterations off-track, recovery might cost 5+ shots. Pride compounds the problem.",
      },
    ],
    strategicNote: "Critical Skill: Recognizing when recovery is needed. Pride often delays recovery, compounding the problem. Like the golfer acknowledging the bad lie, accept and recover.",
    visualizationPath: "/diagrams/devolopment-as-golf_dev/shot-visualizations/05-recovery.svg",
    confidenceWindow: "30-60%",
    semanticDistance: "Safety reset",
    primaryIntent: "Return to playable",
  },
  {
    id: "chip",
    name: "Chip",
    number: 6,
    artifactDefinition: {
      shotType: "Chip",
      when: "Just off green, close but not quite there",
      distance: "5-15% semantic change",
      purpose: "Get onto green for final putt",
    },
    characteristics: "Very short distance · High confidence (85-95%) · Finesse over power · Green-edge precision",
    examplePrompts: [
      "Align this element vertically",
      "Add hover state to buttons",
      "Make responsive for mobile breakpoint",
      "Update documentation strings",
    ],
    heuristics: [
      {
        title: "Heuristic 1: The Green Edge Principle",
        description: "Chip shots are for the 85-95% confidence zone—you're almost perfect, but not quite on the green yet. If you're at 80%, use a wedge. If you're at 95%, use a putter. Chip is specifically for that edge zone.",
      },
      {
        title: "Heuristic 2: Finesse Over Power",
        description: "Chip shots require subtlety—small adjustments that make a big difference. Think alignment, hover states, responsive tweaks. Not new features, not major refactors—just the finesse needed to get on the green.",
      },
    ],
    strategicNote: "Often Overlooked: Many developers try to putt from chip range, leading to frustration. Chip first, then putt. Like the golfer's delicate chip shot, it's about precision positioning, not power.",
    visualizationPath: "/diagrams/devolopment-as-golf_dev/shot-visualizations/06-chip.svg",
    confidenceWindow: "85-95%",
    semanticDistance: "5-15%",
    primaryIntent: "Green entry",
  },
  {
    id: "curve",
    name: "Curve Shot",
    number: 7,
    artifactDefinition: {
      shotType: "Curve Shot",
      when: "Need to work around obstacles/constraints",
      distance: "30-50% progress",
      purpose: "Strategic trajectory bending",
    },
    characteristics: "Medium distance · Intentional deviation from straight path · Moderate confidence (60-80%) · Requires clear mental model",
    examplePrompts: [
      "Like X, but with Y approach instead",
      "Reframe this as [alternative perspective]",
      "Use functional style, not OOP",
      "Optimize for mobile-first, desktop secondary",
    ],
    heuristics: [
      {
        title: "Heuristic 1: Intentional Deviation with Purpose",
        description: "Curve shots require you to explicitly acknowledge the constraint and the alternative path. You're not going straight because you can't—there's an obstacle (architectural, technical, design constraint). State the constraint and the alternative clearly.",
      },
      {
        title: "Heuristic 2: Semantic Geometry Understanding",
        description: "Curve shots require understanding that semantic space has curvature—you can reach the same goal through different paths. The curved path might be longer in linear distance but shorter in actual development time. You need to visualize the geometry.",
      },
    ],
    strategicNote: "Advanced Technique: Curve shots require understanding of semantic geometry. Beginners should use sparingly. Like the golfer shaping a shot around a tree, you need to see the alternative path clearly.",
    visualizationPath: "/diagrams/devolopment-as-golf_dev/shot-visualizations/07-curve.svg",
    confidenceWindow: "60-80%",
    semanticDistance: "30-50%",
    primaryIntent: "Constraint-aware reroute",
  },
  {
    id: "drop",
    name: "Drop",
    number: 8,
    artifactDefinition: {
      shotType: "Drop",
      when: "Recovery impossible, need to backtrack",
      distance: "Backward (revert progress)",
      purpose: "Return to known-good state (penalty)",
    },
    characteristics: "Backward movement · Reset confidence to previous level · Accept penalty stroke · Git-like version control",
    examplePrompts: [
      "Revert to version from 3 iterations ago",
      "Discard recent changes, restart approach",
      "Go back to initial concept, new direction",
      "git checkout [previous-commit-hash]",
    ],
    heuristics: [
      {
        title: "Heuristic 1: The Sunk Cost Fallacy Threshold",
        description: "If continuing forward would cost more than going back and restarting, take the drop. Calculate: (shots to recover forward) vs (shots to go back + shots to restart correctly). The cheaper path wins, even if it means losing progress.",
      },
      {
        title: "Heuristic 2: Known-Good State Requirement",
        description: "You can only drop to a state you know is good. If you're unsure whether an earlier state was correct, you can't drop there—you need to recover forward or drop to an even earlier state. Always mark known-good states as you go.",
      },
    ],
    strategicNote: "Penalty Acknowledged: Drop is a penalty stroke, but often cheaper than continuing down wrong path. Avoid sunk cost fallacy. Like the golfer taking a penalty drop, accept the loss and move forward from a better position.",
    visualizationPath: "/diagrams/devolopment-as-golf_dev/shot-visualizations/08-drop.svg",
    confidenceWindow: "Reset",
    semanticDistance: "Backtrack",
    primaryIntent: "Known-good revert",
  },
  {
    id: "layup",
    name: "Layup",
    number: 9,
    artifactDefinition: {
      shotType: "Layup",
      when: "Risk too high to go for green directly",
      distance: "Deliberately short of goal",
      purpose: "Position for optimal next shot",
    },
    characteristics: "Conservative positioning · Avoid hazards · Set up easier next shot · Course management over heroics",
    examplePrompts: [
      "First, build basic version without advanced features",
      "Create simple prototype to validate approach",
      "Implement with standard library, optimize later",
      "Get MVP working, polish in subsequent iteration",
    ],
    heuristics: [
      {
        title: "Heuristic 1: Risk Assessment Over Ego",
        description: "Layup shots require honest risk assessment. If going for the green directly has >30% chance of landing in a hazard, lay up. The ego wants to go for it, but the professional knows when to be conservative. Calculate risk, not bravado.",
      },
      {
        title: "Heuristic 2: Position Over Progress",
        description: "Layup shots prioritize optimal position over maximum progress. You might be able to get 60% closer with a driver, but if that lands you in a hazard, the 30% closer with a layup is better. Position sets up your next shot—progress is secondary.",
      },
    ],
    strategicNote: "Professional Strategy: Pros lay up more than amateurs. Layup is a high-skill shot that requires ego suppression. Like the professional golfer choosing position over heroics, sometimes the conservative shot is the smart shot.",
    visualizationPath: "/diagrams/devolopment-as-golf_dev/shot-visualizations/09-layup.svg",
    confidenceWindow: "60-80%",
    semanticDistance: "Intentional short",
    primaryIntent: "Optimal positioning",
  },
  {
    id: "punch",
    name: "Punch Shot",
    number: 10,
    artifactDefinition: {
      shotType: "Punch Shot",
      when: "Constrained environment, overhead obstacles",
      distance: "Medium distance with control",
      purpose: "Low trajectory to avoid constraints",
    },
    characteristics: "Low trajectory · Avoid overhead constraints · Moderate confidence (working within limits) · Constraint-aware development",
    examplePrompts: [
      "Work within existing architecture, no major refactor",
      "Use available APIs, no system-level changes",
      "Optimize within current memory/CPU limits",
      "Maintain support for older versions",
    ],
    heuristics: [
      {
        title: "Heuristic 1: Constraint as Feature, Not Bug",
        description: "Punch shots explicitly acknowledge constraints as part of the shot design. You're not trying to remove constraints—you're working within them. The constraint is the overhead branch—you're keeping the shot low to avoid it. State the constraint clearly.",
      },
      {
        title: "Heuristic 2: Controlled Distance Under Pressure",
        description: "Punch shots require controlled distance despite constraints. You can't use full power (can't refactor), but you still need meaningful progress (30-50% distance). This is harder than it looks—it's skill working within limits, not just limitation.",
      },
    ],
    strategicNote: "Constraint as Feature: Punch shots turn limitations into shot selection. Legacy systems = tree branches overhead. Like the golfer punching under the branches, you work within constraints, not against them.",
    visualizationPath: "/diagrams/devolopment-as-golf_dev/shot-visualizations/10-punch.svg",
    confidenceWindow: "60-80%",
    semanticDistance: "30-50%",
    primaryIntent: "Low trajectory, constraint compliance",
  },
];

