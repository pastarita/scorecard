# Prompt Classifier Extension - Visual Diagrams

**Architecture, flows, and system diagrams**

---

## 1. System Architecture Overview

```mermaid
graph TB
    subgraph "VS Code / Cursor IDE"
        subgraph "User Interface Layer"
            A[Inline Badges]
            B[Hover Tooltips]
            C[Status Bar]
            D[Insights Panel]
        end
        
        subgraph "Classification Engine"
            E[Feature Extractor]
            F[Archetype Classifier]
            G[Shot Type Classifier]
            H[Quality Analyzer]
            I[ML Model Optional]
        end
        
        subgraph "Storage Layer"
            J[Prompt History]
            K[Analytics Engine]
            L[Cache Manager]
            M[Export Tools]
        end
        
        subgraph "VS Code Extension API"
            N[Text Document Listeners]
            O[WebView API]
            P[Workspace State]
        end
    end
    
    User[User Input/Prompt] --> N
    N --> E
    E --> F
    E --> G
    E --> H
    F --> I
    G --> I
    H --> I
    I --> A
    I --> B
    I --> C
    I --> D
    I --> J
    J --> K
    J --> M
    K --> D
    L -.cache.-> I
    P -.persist.-> J
```

---

## 2. Classification Flow

```mermaid
flowchart LR
    A[User Types Prompt] --> B{Debounce 200ms}
    B --> C[Extract Features]
    C --> D[Check Cache]
    D -->|Hit| E[Return Cached]
    D -->|Miss| F[Classify Archetype]
    F --> G[Classify Shot Type]
    G --> H[Calculate Quality]
    H --> I[Store Result]
    I --> J[Update UI]
    J --> K[Display Badge]
    K --> L[Update Status Bar]
    I --> M[Save to History]
    
    style A fill:#e1f5ff
    style K fill:#c3f0c3
    style L fill:#c3f0c3
```

---

## 3. Feature Extraction Pipeline

```mermaid
graph TD
    A[Raw Prompt Text] --> B[Tokenization]
    B --> C[Parse Structure]
    C --> D[Extract Features]
    
    D --> E[Text Features]
    D --> F[Structural Features]
    D --> G[Semantic Features]
    D --> H[Context Features]
    
    E --> E1[Word Count]
    E --> E2[Sentence Count]
    E --> E3[Avg Word Length]
    
    F --> F1[Has Code Snippet]
    F --> F2[Has File Reference]
    F --> F3[Has Line Number]
    
    G --> G1[Action Verbs]
    G --> G2[Technical Terms]
    G --> G3[Vague Terms]
    
    H --> H1[Previous Prompts]
    H --> H2[File Context]
    H --> H3[Similarity Score]
    
    E1 & E2 & E3 & F1 & F2 & F3 & G1 & G2 & G3 & H1 & H2 & H3 --> I[Feature Vector]
    
    style I fill:#ffd700
```

---

## 4. Archetype Classification Decision Tree

```mermaid
graph TD
    A[Prompt Features] --> B{Has Line Number?}
    B -->|Yes| C{Word Count < 15?}
    C -->|Yes| D[⊕ PRECISION]
    
    B -->|No| E{Has Question?}
    E -->|Yes| F{Has Research Keywords?}
    F -->|Yes| G[⊛ EXPLORER]
    
    E -->|No| H{Has Design/UX Keywords?}
    H -->|Yes| I{Has Constraints?}
    I -->|No| J[⊜ CREATIVE]
    
    H -->|No| K{Has Implementation Keywords?}
    K -->|Yes| L[⊗ CONVERGENT]
    
    C -->|No| M[Score All Archetypes]
    F -->|No| M
    I -->|Yes| M
    K -->|No| M
    
    M --> N[Select Highest Score]
    
    style D fill:#9c27b0,color:#fff
    style G fill:#ff9800,color:#fff
    style J fill:#e91e63,color:#fff
    style L fill:#2196f3,color:#fff
```

---

## 5. Shot Type Classification

```mermaid
graph LR
    A[Calculate Confidence] --> B{Confidence Score}
    
    B -->|< 0.6| C[● DRIVER<br/>Exploratory]
    B -->|0.6-0.8| D[◐ IRON<br/>Refinement]
    B -->|0.8-0.95| E[◑ WEDGE<br/>Precision]
    B -->|> 0.95| F[○ PUTTER<br/>Polish]
    
    A --> G{Has Recovery Indicators?}
    G -->|Yes| H[↺ RECOVERY<br/>Fix Mistakes]
    
    style C fill:#1a5f7a,color:#fff
    style D fill:#2d5016,color:#fff
    style E fill:#b8860b,color:#fff
    style F fill:#cc5500,color:#fff
    style H fill:#666,color:#fff
```

---

## 6. Quality Metrics Calculation

```mermaid
graph TB
    A[Prompt Analysis] --> B[Clarity Score]
    A --> C[Context Score]
    A --> D[Confidence Level]
    
    B --> B1[+ Specific Terms]
    B --> B2[+ Clear Action]
    B --> B3[- Vague Terms]
    B --> B4[- Too Short/Long]
    B1 & B2 & B3 & B4 --> B5[Clarity 0-100]
    
    C --> C1[+ File References]
    C --> C2[+ Code Snippets]
    C --> C3[+ Line Numbers]
    C --> C4[+ Previous Context]
    C1 & C2 & C3 & C4 --> C5[Context 0-100]
    
    D --> D1[Specificity * 0.5]
    D --> D2[Context * 0.3]
    D --> D3[Progression * 0.2]
    D1 & D2 & D3 --> D4[Confidence 0.0-1.0]
    
    B5 & C5 & D4 --> E[Quality Metrics]
    
    style E fill:#4caf50,color:#fff
```

---

## 7. User Interaction Flow

```mermaid
sequenceDiagram
    participant U as User
    participant E as Editor
    participant C as Classifier
    participant UI as UI Manager
    participant S as Storage
    
    U->>E: Types prompt
    E->>C: onDidChangeText
    Note over C: Debounce 200ms
    C->>C: Extract features
    C->>C: Classify
    C->>UI: Classification result
    UI->>E: Display inline badge
    UI->>E: Update status bar
    C->>S: Save to history
    
    U->>UI: Hover over badge
    UI->>S: Get detailed metrics
    S->>UI: Return metrics
    UI->>U: Show tooltip
    
    U->>UI: Click status bar
    UI->>S: Get session data
    S->>UI: Return analytics
    UI->>U: Open insights panel
```

---

## 8. Session Analytics Flow

```mermaid
graph TB
    A[Session Start] --> B[Track Prompts]
    B --> C[Classification 1]
    B --> D[Classification 2]
    B --> E[Classification N]
    
    C & D & E --> F[Analytics Engine]
    
    F --> G[Calculate Distribution]
    F --> H[Detect Patterns]
    F --> I[Calculate Averages]
    
    G --> J[Archetype Distribution]
    G --> K[Shot Type Distribution]
    
    H --> L[Inefficient Sequences]
    H --> M[Recovery Patterns]
    
    I --> N[Average Quality]
    I --> O[Success Rate]
    
    J & K & L & M & N & O --> P[Insights Panel]
    
    style P fill:#2196f3,color:#fff
```

---

## 9. Data Flow Diagram

```mermaid
graph LR
    subgraph "Input"
        A[Raw Prompt Text]
        B[File Context]
        C[History]
    end
    
    subgraph "Processing"
        D[Feature Extraction]
        E[Classification]
        F[Quality Analysis]
    end
    
    subgraph "Storage"
        G[Memory Cache]
        H[Workspace State]
        I[Analytics DB]
    end
    
    subgraph "Output"
        J[Inline Badge]
        K[Hover Tooltip]
        L[Status Bar]
        M[Insights Panel]
    end
    
    A --> D
    B --> D
    C --> D
    
    D --> E
    D --> F
    
    E --> G
    F --> G
    G --> H
    H --> I
    
    E --> J
    F --> K
    I --> L
    I --> M
```

---

## 10. Development Phase Timeline

```mermaid
gantt
    title Prompt Classifier Development Timeline
    dateFormat YYYY-MM-DD
    section Phase 1: MVP
    Classification Engine    :2025-11-04, 2w
    Inline UI                :2025-11-18, 2w
    Storage & Export         :2025-12-02, 1w
    Testing & Polish         :2025-12-09, 1w
    
    section Phase 2: Analytics
    Insights Panel           :2025-12-16, 2w
    Pattern Detection        :2025-12-30, 1w
    Recommendations          :2026-01-06, 1w
    
    section Phase 3: ML
    ONNX Integration         :2026-01-13, 2w
    Model Training           :2026-01-27, 1w
    A/B Testing              :2026-02-03, 1w
    
    section Phase 4: Team
    Export/Import            :2026-02-10, 2w
    Team Dashboard           :2026-02-24, 2w
    
    section Phase 5: Integration
    Scorecard Sync           :2026-03-10, 4w
```

---

## 11. Component Dependency Graph

```mermaid
graph TD
    A[extension.ts] --> B[ClassificationManager]
    A --> C[UIManager]
    A --> D[StorageManager]
    
    B --> E[ArchetypeClassifier]
    B --> F[ShotTypeClassifier]
    B --> G[QualityAnalyzer]
    
    E --> H[FeatureExtractor]
    F --> H
    G --> H
    
    C --> I[BadgeProvider]
    C --> J[HoverProvider]
    C --> K[StatusBarManager]
    C --> L[InsightsPanel]
    
    D --> M[PromptHistory]
    D --> N[AnalyticsEngine]
    D --> O[CacheManager]
    
    B --> D
    C --> D
    
    style A fill:#ff6b6b,color:#fff
    style B fill:#4ecdc4,color:#fff
    style C fill:#95e1d3,color:#fff
    style D fill:#f9ca24,color:#fff
```

---

## 12. Classification Matrix

```mermaid
graph TB
    subgraph "Archetype × Shot Type Matrix"
        A[⊕ Precision] -.-> A1[● Driver: Quick question]
        A -.-> A2[◐ Iron: Targeted fix]
        A -.-> A3[◑ Wedge: Specific change]
        A -.-> A4[○ Putter: Tiny tweak]
        
        B[⊗ Convergent] -.-> B1[● Driver: Broad feature idea]
        B -.-> B2[◐ Iron: Implementation with spec]
        B -.-> B3[◑ Wedge: Refinement details]
        B -.-> B4[○ Putter: Final polish]
        
        C[⊛ Explorer] -.-> C1[● Driver: Open research]
        C -.-> C2[◐ Iron: Narrowed options]
        C -.-> C3[◑ Wedge: Specific exploration]
        C -.-> C4[○ Putter: Final verification]
        
        D[⊜ Creative] -.-> D1[● Driver: Initial concept]
        D -.-> D2[◐ Iron: Design direction]
        D -.-> D3[◑ Wedge: Visual refinement]
        D -.-> D4[○ Putter: Aesthetic polish]
    end
    
    style A fill:#9c27b0,color:#fff
    style B fill:#2196f3,color:#fff
    style C fill:#ff9800,color:#fff
    style D fill:#e91e63,color:#fff
```

---

## 13. Performance Optimization Strategy

```mermaid
graph TB
    A[Prompt Input] --> B{Cache Hit?}
    B -->|Yes| C[Return Cached<br/>~1ms]
    B -->|No| D[Debounce 200ms]
    
    D --> E{Simple Heuristics}
    E -->|High Confidence| F[Return Result<br/>~50ms]
    E -->|Low Confidence| G{ML Enabled?}
    
    G -->|Yes| H{Model Loaded?}
    H -->|Yes| I[ML Classification<br/>~100ms]
    H -->|No| J[Lazy Load Model<br/>~500ms once]
    
    G -->|No| K[Advanced Heuristics<br/>~75ms]
    
    F --> L[Cache Result]
    I --> L
    J --> I
    K --> L
    
    L --> M[Display UI<br/>~5ms]
    
    style C fill:#4caf50,color:#fff
    style M fill:#4caf50,color:#fff
```

---

## 14. Storage Architecture

```mermaid
graph TB
    subgraph "Memory Layer"
        A[Active Session]
        B[LRU Cache 100 items]
    end
    
    subgraph "Workspace State"
        C[Prompt History 1000 items]
        D[User Preferences]
        E[Session Data]
    end
    
    subgraph "Export Layer"
        F[JSON Export]
        G[CSV Export]
        H[Scorecard Format]
    end
    
    A --> B
    B --> C
    A --> E
    
    C --> F
    C --> G
    C --> H
    
    D -.settings.-> A
    
    style A fill:#ffd700
    style C fill:#4ecdc4
```

---

## 15. Error Handling Flow

```mermaid
flowchart TD
    A[Classification Request] --> B{Input Valid?}
    B -->|No| C[Log Error]
    C --> D[Show Fallback UI]
    
    B -->|Yes| E[Try Classify]
    E --> F{Success?}
    
    F -->|Yes| G[Display Result]
    
    F -->|No| H{Retry Count < 3?}
    H -->|Yes| I[Wait + Retry]
    I --> E
    
    H -->|No| J[Fallback Classification]
    J --> K[Log Warning]
    K --> L[Display with Warning]
    
    style C fill:#f44336,color:#fff
    style K fill:#ff9800,color:#fff
    style G fill:#4caf50,color:#fff
```

---

## 16. Team Sharing Flow

```mermaid
sequenceDiagram
    participant D as Developer
    participant E as Extension
    participant F as File System
    participant T as Team Lead
    participant S as Shared Storage
    
    D->>E: Export patterns
    E->>E: Anonymize data
    E->>F: Save export file
    F->>T: Share file
    T->>T: Review patterns
    T->>S: Approve & upload
    
    participant D2 as Team Member
    D2->>S: Import patterns
    S->>E: Load patterns
    E->>E: Merge with local
    E->>D2: Patterns available
    
    Note over D2,E: Extension suggests<br/>team patterns
```

---

## 17. Integration with Golf Scorecard

```mermaid
graph LR
    subgraph "Prompt Classifier"
        A[Prompts] --> B[Classifications]
        B --> C[Session Data]
    end
    
    subgraph "Mapping Layer"
        D[Group by Task]
        E[Map to Holes]
        F[Calculate Par/Actual]
    end
    
    subgraph "Golf Scorecard"
        G[Hole Data]
        H[Shot Data]
        I[Visualizations]
    end
    
    C --> D
    D --> E
    E --> F
    
    F --> G
    B --> H
    
    G --> I
    H --> I
    
    style C fill:#2196f3,color:#fff
    style I fill:#4caf50,color:#fff
```

---

## 18. ML Model Pipeline (Phase 3)

```mermaid
graph TB
    A[User Feedback] --> B[Training Data Collection]
    C[Classification History] --> B
    
    B --> D[Data Preprocessing]
    D --> E[Feature Engineering]
    E --> F[Model Training]
    
    F --> G[Model Evaluation]
    G --> H{Accuracy > 90%?}
    
    H -->|No| I[Tune Hyperparameters]
    I --> F
    
    H -->|Yes| J[Export ONNX Model]
    J --> K[Package with Extension]
    K --> L[A/B Testing]
    
    L --> M{Better than Rules?}
    M -->|Yes| N[Deploy to Users]
    M -->|No| O[Keep Rule-based]
    
    style N fill:#4caf50,color:#fff
```

---

## Legend

### Colors
- 🔵 **Blue**: Core components
- 🟢 **Green**: Success states
- 🟡 **Yellow**: Storage/data
- 🔴 **Red**: Error states
- 🟠 **Orange**: Warning states
- 🟣 **Purple**: User interface

### Shapes
- **Rectangle**: Process/Component
- **Diamond**: Decision point
- **Circle**: Start/End point
- **Cylinder**: Data storage
- **Parallelogram**: Input/Output

---

**Diagram Version**: 1.0.0  
**Last Updated**: November 4, 2025  
**Status**: Complete

*These diagrams are generated using Mermaid and can be rendered in any Markdown viewer that supports Mermaid syntax.*

