import type { ScorecardData } from "@/types/scorecard";

export const SAMPLE_SCORECARD: ScorecardData = {
  metadata: {
    version: "1.0.0",
    created: "2025-11-04",
    author: "Patrick Astarita"
  },
  project: {
    product: "User Dashboard MVP",
    developer: "Patrick Astarita",
    team: "Platform Team",
    dateStart: "2025-11-01",
    dateEnd: "2025-11-30",
    description: "Building a comprehensive user analytics dashboard"
  },
  course: {
    name: "Dashboard Development Course",
    difficulty: "medium",
    totalPar: 72,
    holes: [
      // Front 9 - Core Features
      {
        number: 1,
        name: "Authentication System",
        description: "JWT-based auth with refresh tokens",
        archetype: "Convergent",
        par: 4,
        actual: 3,
        status: "complete",
        shots: [
          {
            number: 1,
            type: "driver",
            confidence: 0.4,
            description: "Initial architecture exploration",
            prompt: "Design authentication system with JWT tokens and refresh mechanism"
          },
          {
            number: 2,
            type: "iron",
            confidence: 0.7,
            description: "Implementation with constraints",
            prompt: "Implement auth endpoints with bcrypt hashing and token rotation"
          },
          {
            number: 3,
            type: "putter",
            confidence: 0.98,
            description: "Final polish and testing",
            prompt: "Add comprehensive error handling and test coverage"
          }
        ],
        notes: "Came in under par! Good use of direct approach."
      },
      {
        number: 2,
        name: "User Profile Component",
        description: "Display and edit user information",
        archetype: "Precision",
        par: 3,
        actual: 3,
        status: "complete",
        shots: [
          {
            number: 1,
            type: "iron",
            confidence: 0.65,
            description: "Component structure"
          },
          {
            number: 2,
            type: "wedge",
            confidence: 0.85,
            description: "Form validation"
          },
          {
            number: 3,
            type: "putter",
            confidence: 0.97,
            description: "Polish UI"
          }
        ],
        notes: "Right on par - typical for well-defined tasks"
      },
      {
        number: 3,
        name: "Dashboard Layout",
        description: "Responsive grid system with sidebar",
        archetype: "Creative",
        par: 6,
        actual: 5,
        status: "complete",
        shots: [
          {
            number: 1,
            type: "driver",
            confidence: 0.3,
            description: "Explore layout options"
          },
          {
            number: 2,
            type: "driver",
            confidence: 0.45,
            description: "Refine grid system"
          },
          {
            number: 3,
            type: "iron",
            confidence: 0.68,
            description: "Implement sidebar"
          },
          {
            number: 4,
            type: "wedge",
            confidence: 0.88,
            description: "Add responsive breakpoints"
          },
          {
            number: 5,
            type: "putter",
            confidence: 0.96,
            description: "Final tweaks"
          }
        ],
        notes: "Under par on creative task - good iteration"
      },
      {
        number: 4,
        name: "Data Visualization",
        description: "Charts and graphs for user metrics",
        archetype: "Convergent",
        par: 4,
        actual: 5,
        status: "complete",
        shots: [
          {
            number: 1,
            type: "driver",
            confidence: 0.5,
            description: "Choose charting library"
          },
          {
            number: 2,
            type: "iron",
            confidence: 0.65,
            description: "Implement basic charts"
          },
          {
            number: 3,
            type: "recovery",
            confidence: 0.55,
            description: "Fix data transformation issues"
          },
          {
            number: 4,
            type: "wedge",
            confidence: 0.82,
            description: "Add interactivity"
          },
          {
            number: 5,
            type: "putter",
            confidence: 0.95,
            description: "Polish animations"
          }
        ],
        notes: "One over par - recovery shot needed but recovered well"
      },
      {
        number: 5,
        name: "API Integration",
        description: "Connect to analytics backend",
        archetype: "Convergent",
        par: 4,
        actual: 4,
        status: "in_progress",
        shots: [
          {
            number: 1,
            type: "driver",
            confidence: 0.55,
            description: "Setup API client"
          },
          {
            number: 2,
            type: "iron",
            confidence: 0.72,
            description: "Implement endpoints"
          },
          {
            number: 3,
            type: "wedge",
            confidence: 0.88,
            description: "Add error handling"
          }
        ],
        notes: "Currently in progress - on track for par"
      },
      {
        number: 6,
        name: "Error Handling",
        archetype: "Precision",
        par: 3,
        actual: 0,
        status: "not_started",
        shots: []
      },
      {
        number: 7,
        name: "Loading States",
        archetype: "Precision",
        par: 3,
        actual: 0,
        status: "not_started",
        shots: []
      },
      {
        number: 8,
        name: "Responsive Design",
        archetype: "Convergent",
        par: 4,
        actual: 0,
        status: "not_started",
        shots: []
      },
      {
        number: 9,
        name: "Performance Optimization",
        archetype: "Explorer",
        par: 5,
        actual: 0,
        status: "not_started",
        shots: []
      },
      // Back 9 - Enhancement Features
      {
        number: 10,
        name: "Dark Mode",
        archetype: "Convergent",
        par: 4,
        actual: 0,
        status: "not_started",
        shots: []
      },
      {
        number: 11,
        name: "Export Functionality",
        archetype: "Precision",
        par: 3,
        actual: 0,
        status: "not_started",
        shots: []
      },
      {
        number: 12,
        name: "Search & Filter",
        archetype: "Convergent",
        par: 4,
        actual: 0,
        status: "not_started",
        shots: []
      },
      {
        number: 13,
        name: "Notifications",
        archetype: "Convergent",
        par: 4,
        actual: 0,
        status: "not_started",
        shots: []
      },
      {
        number: 14,
        name: "Settings Panel",
        archetype: "Precision",
        par: 3,
        actual: 0,
        status: "not_started",
        shots: []
      },
      {
        number: 15,
        name: "User Preferences",
        archetype: "Convergent",
        par: 4,
        actual: 0,
        status: "not_started",
        shots: []
      },
      {
        number: 16,
        name: "Analytics Tracking",
        archetype: "Precision",
        par: 3,
        actual: 0,
        status: "not_started",
        shots: []
      },
      {
        number: 17,
        name: "Documentation",
        archetype: "Explorer",
        par: 5,
        actual: 0,
        status: "not_started",
        shots: []
      },
      {
        number: 18,
        name: "Testing Suite",
        archetype: "Explorer",
        par: 5,
        actual: 0,
        status: "not_started",
        shots: []
      }
    ]
  }
};

