/**
 * Documentation Structure and Ontology
 * 
 * Defines the hierarchical structure of documentation for the project.
 * This ontology organizes documentation by domain, feature, and component.
 */

export interface DocumentationSection {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  path: string;
  content?: string; // Markdown content
  children?: DocumentationSection[];
  tags?: string[];
  component?: string; // Related component path
  codeExample?: string;
}

export const DOCUMENTATION_STRUCTURE: DocumentationSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Introduction and quick start guide",
    icon: "🚀",
    path: "/docs/getting-started",
    children: [
      {
        id: "introduction",
        title: "Introduction",
        description: "Overview of the project",
        path: "/docs/getting-started/introduction",
        tags: ["overview", "concept"],
      },
      {
        id: "installation",
        title: "Installation",
        description: "How to set up the project",
        path: "/docs/getting-started/installation",
        tags: ["setup", "install"],
      },
      {
        id: "quick-start",
        title: "Quick Start",
        description: "Get up and running quickly",
        path: "/docs/getting-started/quick-start",
        tags: ["tutorial", "beginner"],
      },
    ],
  },
  {
    id: "concepts",
    title: "Core Concepts",
    description: "Understanding the golf ontology and development metaphors",
    icon: "⛳",
    path: "/docs/concepts",
    children: [
      {
        id: "golf-ontology",
        title: "Golf Ontology",
        description: "How development maps to golf concepts",
        path: "/docs/concepts/golf-ontology",
        tags: ["ontology", "metaphor", "golf"],
      },
      {
        id: "archetypes",
        title: "Archetypes",
        description: "Precision, Convergent, Explorer, Creative",
        path: "/docs/concepts/archetypes",
        tags: ["archetypes", "classification"],
        component: "@/types/scorecard.ts",
      },
      {
        id: "shot-types",
        title: "Shot Types",
        description: "Driver, Iron, Wedge, Putter, Recovery",
        path: "/docs/concepts/shot-types",
        tags: ["shots", "types"],
        component: "@/types/scorecard.ts",
      },
      {
        id: "terrain",
        title: "Terrain & Confidence",
        description: "Rough, Fairway, Approach, Green, Hole",
        path: "/docs/concepts/terrain",
        tags: ["terrain", "confidence"],
        component: "@/types/scorecard.ts",
      },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    description: "System architecture and design patterns",
    icon: "🏗️",
    path: "/docs/architecture",
    children: [
      {
        id: "overview",
        title: "Architecture Overview",
        description: "High-level system architecture",
        path: "/docs/architecture/overview",
        tags: ["architecture", "design"],
      },
      {
        id: "component-structure",
        title: "Component Structure",
        description: "How components are organized",
        path: "/docs/architecture/component-structure",
        tags: ["components", "structure"],
      },
      {
        id: "branch-convention",
        title: "Branch Convention",
        description: "Contemplations, Studies, Prototypes",
        path: "/docs/architecture/branch-convention",
        tags: ["git", "workflow", "branches"],
        component: "BRANCH-CONVENTION.md",
      },
    ],
  },
  {
    id: "components",
    title: "Components",
    description: "Component reference and API documentation",
    icon: "🧩",
    path: "/docs/components",
    children: [
      {
        id: "scorecard",
        title: "Scorecard Components",
        description: "Core scorecard visualization components",
        path: "/docs/components/scorecard",
        tags: ["scorecard", "visualization"],
        component: "@/components/experiments/ScorecardTable.tsx",
      },
      {
        id: "hole-visualization",
        title: "Hole Visualization",
        description: "SVG hole plan view components",
        path: "/docs/components/hole-visualization",
        tags: ["svg", "visualization", "holes"],
        component: "@/components/prototypes/HorizontalScorecardBar.tsx",
      },
      {
        id: "fog",
        title: "Fog Visualization",
        description: "Weather/fog overlay components",
        path: "/docs/components/fog",
        tags: ["fog", "weather", "overlay"],
        component: "@/components/prototypes/fog/FogOverlay.tsx",
      },
    ],
  },
  {
    id: "api",
    title: "API Reference",
    description: "Functions, hooks, and utilities",
    icon: "📚",
    path: "/docs/api",
    children: [
      {
        id: "calculations",
        title: "Calculations",
        description: "Analytics and calculation functions",
        path: "/docs/api/calculations",
        tags: ["calculations", "analytics"],
        component: "@/lib/calculations.ts",
      },
      {
        id: "hooks",
        title: "React Hooks",
        description: "Custom React hooks",
        path: "/docs/api/hooks",
        tags: ["hooks", "react"],
        component: "@/lib/useScorecard.ts",
      },
      {
        id: "hole-generator",
        title: "Hole Generator",
        description: "SVG hole layout generation",
        path: "/docs/api/hole-generator",
        tags: ["generator", "svg"],
        component: "@/lib/holeGenerator.ts",
      },
    ],
  },
  {
    id: "guides",
    title: "Guides",
    description: "Step-by-step guides and tutorials",
    icon: "📖",
    path: "/docs/guides",
    children: [
      {
        id: "creating-visualizations",
        title: "Creating Visualizations",
        description: "How to create new visualization components",
        path: "/docs/guides/creating-visualizations",
        tags: ["tutorial", "visualization"],
      },
      {
        id: "adding-components",
        title: "Adding Components",
        description: "How to add new components to the system",
        path: "/docs/guides/adding-components",
        tags: ["tutorial", "components"],
      },
      {
        id: "contemplation-workflow",
        title: "Contemplation Workflow",
        description: "How to use the contemplation branch workflow",
        path: "/docs/guides/contemplation-workflow",
        tags: ["workflow", "git"],
      },
    ],
  },
  {
    id: "contemplations",
    title: "Contemplations",
    description: "Large feature design spaces and architectural planning docs",
    icon: "🧠",
    path: "/docs/contemplations",
    children: [
      {
        id: "contemplations-celebshot",
        title: "CelebShot Marketplace",
        description: "Farcaster mini app for celebrity shot expert guidance and CELO payments",
        icon: "🌟",
        path: "/docs/contemplations/celebshot",
        tags: ["marketplace", "celo", "farcaster"],
        component: "contemplations/celebshot/README.md",
        children: [
          {
            id: "contemplations-celebshot-overview",
            title: "Overview",
            description: "Vision, positioning, and high-level concept for CelebShot",
            path: "/docs/contemplations/celebshot/overview",
            tags: ["vision", "summary", "scope"],
            component: "contemplations/celebshot/00-OVERVIEW.md",
          },
          {
            id: "contemplations-celebshot-architecture",
            title: "Architecture",
            description: "System architecture, components, data, and contract interfaces",
            path: "/docs/contemplations/celebshot/architecture",
            tags: ["architecture", "system-design", "smart-contracts"],
            component: "contemplations/celebshot/01-ARCHITECTURE.md",
          },
          {
            id: "contemplations-celebshot-requirements",
            title: "Requirements",
            description: "Functional, non-functional, CELO bounty, and success metrics",
            path: "/docs/contemplations/celebshot/requirements",
            tags: ["requirements", "bounty", "metrics"],
            component: "contemplations/celebshot/02-REQUIREMENTS.md",
          },
          {
            id: "contemplations-celebshot-workflows",
            title: "Workflows",
            description: "User, expert, and system workflows across the marketplace",
            path: "/docs/contemplations/celebshot/workflows",
            tags: ["workflows", "ux", "process"],
            component: "contemplations/celebshot/03-WORKFLOWS.md",
          },
          {
            id: "contemplations-celebshot-user-goals",
            title: "User Goals",
            description: "Persona-driven goals and requirement mappings",
            path: "/docs/contemplations/celebshot/user-goals",
            tags: ["personas", "goals", "prioritization"],
            component: "contemplations/celebshot/04-USER-GOALS.md",
          },
          {
            id: "contemplations-celebshot-golf-ontology",
            title: "Golf Ontology",
            description: "Ontology alignment between golf metaphors and problem framing",
            path: "/docs/contemplations/celebshot/golf-ontology",
            tags: ["ontology", "metaphor", "visualization"],
            component: "contemplations/celebshot/05-GOLF-ONTOLOGY.md",
          },
          {
            id: "contemplations-celebshot-celo-integration",
            title: "CELO Integration",
            description: "Blockchain integration, wallet flow, and escrow contract design",
            path: "/docs/contemplations/celebshot/celo-integration",
            tags: ["celo", "payments", "blockchain"],
            component: "contemplations/celebshot/06-CELO-INTEGRATION.md",
          },
        ],
      },
      {
        id: "contemplations-semantic-motifs",
        title: "Semantic Motifs",
        description: "Motif synthesis for evolving the scorecard's semantic architecture",
        icon: "🌀",
        path: "/docs/contemplations/semantic-motifs",
        tags: ["motifs", "semantic", "ontology"],
        component: "contemplations/semantic-motifs/README.md",
        children: [
          {
            id: "contemplations-semantic-motifs-slic-kmeans",
            title: "SLIC + K-Means Segmentation 101",
            description: "Image segmentation primer for deriving motif-led visualizations",
            path: "/docs/contemplations/semantic-motifs/slic-kmeans-segmentation-101",
            tags: ["segmentation", "vision", "motif"],
            component: "contemplations/semantic-motifs/SLIC-KMEANS-SEGMENTATION-101.md",
          },
        ],
      },
    ],
  },
];

/**
 * Flatten documentation structure for search
 */
export function flattenDocumentation(
  sections: DocumentationSection[] = DOCUMENTATION_STRUCTURE
): DocumentationSection[] {
  const flattened: DocumentationSection[] = [];
  
  for (const section of sections) {
    flattened.push(section);
    if (section.children) {
      flattened.push(...flattenDocumentation(section.children));
    }
  }
  
  return flattened;
}

/**
 * Search documentation by query
 */
export function searchDocumentation(query: string): DocumentationSection[] {
  const flattened = flattenDocumentation();
  const lowerQuery = query.toLowerCase();
  
  return flattened.filter((section) => {
    const titleMatch = section.title.toLowerCase().includes(lowerQuery);
    const descMatch = section.description?.toLowerCase().includes(lowerQuery);
    const tagMatch = section.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery));
    const pathMatch = section.path.toLowerCase().includes(lowerQuery);
    
    return titleMatch || descMatch || tagMatch || pathMatch;
  });
}

/**
 * Get documentation section by path
 */
export function getDocumentationByPath(path: string): DocumentationSection | undefined {
  const flattened = flattenDocumentation();
  return flattened.find((section) => section.path === path);
}

