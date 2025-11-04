# Technical Specification: Prompt Classifier Extension

**Project**: Hyperdimensional Golf Prompt Classifier  
**Version**: 1.0.0  
**Date**: November 4, 2025  
**Status**: Draft

---

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         VS Code / Cursor                         │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Extension Host Process                   │ │
│  │                                                              │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │ │
│  │  │   UI Layer   │  │  Classifier  │  │  Storage Layer  │  │ │
│  │  │              │  │    Engine    │  │                 │  │ │
│  │  │ - Badges     │  │ - Archetype  │  │ - History DB    │  │ │
│  │  │ - Tooltips   │◄─┤ - Shot Type  │◄─┤ - Analytics     │  │ │
│  │  │ - Panels     │  │ - Quality    │  │ - Cache         │  │ │
│  │  │ - Status Bar │  │ - ML Models  │  │ - Exports       │  │ │
│  │  └──────────────┘  └──────────────┘  └─────────────────┘  │ │
│  │         ▲                  ▲                    │           │ │
│  └─────────┼──────────────────┼────────────────────┼───────────┘ │
│            │                  │                    │             │
│  ┌─────────▼──────────────────▼────────────────────▼───────────┐ │
│  │              VS Code Extension API / Hooks                   │ │
│  │  - Text Input Listeners                                      │ │
│  │  - Chat Integration (Cursor)                                 │ │
│  │  - WebView API (Panels)                                      │ │
│  │  - Workspace State API                                       │ │
│  └──────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Component Breakdown

#### **1.2.1 Extension Entry Point** (`extension.ts`)
```typescript
export function activate(context: vscode.ExtensionContext) {
  // Initialize components
  const storage = new PromptStorage(context);
  const classifier = new PromptClassifier(storage);
  const ui = new UIManager(context, classifier);
  
  // Register event listeners
  registerPromptListeners(classifier, ui);
  registerCommands(context, ui, storage);
  
  // Start background services
  startAnalytics(storage);
}
```

**Responsibilities**:
- Initialize all services
- Register VS Code commands
- Set up event listeners
- Manage extension lifecycle

#### **1.2.2 Classifier Engine** (`classifier/`)

**ArchetypeClassifier** (`archetypeClassifier.ts`):
```typescript
export class ArchetypeClassifier {
  classify(prompt: string, context: Context): ArchetypeResult {
    const features = this.extractFeatures(prompt);
    const scores = this.calculateScores(features);
    const archetype = this.selectArchetype(scores);
    
    return {
      archetype,
      confidence: scores[archetype] / 100,
      reasoning: this.explain(features, archetype)
    };
  }
  
  private extractFeatures(prompt: string): PromptFeatures {
    // NLP feature extraction
  }
  
  private calculateScores(features: PromptFeatures): ArchetypeScores {
    // Rule-based scoring
  }
}
```

**ShotTypeClassifier** (`shotTypeClassifier.ts`):
```typescript
export class ShotTypeClassifier {
  classify(prompt: string, history: Prompt[]): ShotTypeResult {
    const confidence = this.calculateConfidence(prompt, history);
    const features = this.extractFeatures(prompt);
    
    // Recovery detection (highest priority)
    if (this.isRecovery(features, history)) {
      return { shotType: 'recovery', confidence: 0.9 };
    }
    
    // Confidence-based classification
    return this.classifyByConfidence(confidence, features);
  }
  
  private calculateConfidence(prompt: string, history: Prompt[]): number {
    // Analyze prompt specificity and context
    const specificity = this.analyzeSpecificity(prompt);
    const contextQuality = this.analyzeContext(prompt);
    const progression = this.analyzeProgression(history);
    
    return (specificity * 0.5) + (contextQuality * 0.3) + (progression * 0.2);
  }
}
```

**QualityAnalyzer** (`qualityAnalyzer.ts`):
```typescript
export class QualityAnalyzer {
  analyze(prompt: string, context: Context): QualityMetrics {
    return {
      clarity: this.calculateClarity(prompt),
      context: this.calculateContext(prompt, context),
      confidence: this.calculateConfidence(prompt, context)
    };
  }
  
  private calculateClarity(prompt: string): number {
    let score = 50; // Base score
    
    // Positive factors
    if (hasSpecificTerms(prompt)) score += 15;
    if (hasClearAction(prompt)) score += 15;
    if (hasReasonableLength(prompt)) score += 10;
    
    // Negative factors
    if (hasAmbiguousTerms(prompt)) score -= 15;
    if (tooVague(prompt)) score -= 20;
    
    return Math.max(0, Math.min(100, score));
  }
}
```

#### **1.2.3 UI Manager** (`ui/`)

**BadgeProvider** (`inlineBadge.ts`):
```typescript
export class BadgeProvider {
  private decorationType: vscode.TextEditorDecorationType;
  
  constructor() {
    this.decorationType = vscode.window.createTextEditorDecorationType({
      after: {
        margin: '0 0 0 1em',
        textDecoration: 'none'
      }
    });
  }
  
  displayBadge(
    editor: vscode.TextEditor,
    line: number,
    classification: Classification
  ) {
    const badge = this.createBadge(classification);
    const decoration = {
      range: new vscode.Range(line, 1000, line, 1000),
      renderOptions: {
        after: { contentText: badge }
      }
    };
    
    editor.setDecorations(this.decorationType, [decoration]);
  }
  
  private createBadge(classification: Classification): string {
    const { archetype, shotType } = classification;
    return `${ARCHETYPE_SYMBOLS[archetype]} ${SHOT_TYPE_SYMBOLS[shotType]}`;
  }
}
```

**HoverProvider** (`hoverProvider.ts`):
```typescript
export class ClassificationHoverProvider implements vscode.HoverProvider {
  constructor(private storage: PromptStorage) {}
  
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.ProviderResult<vscode.Hover> {
    const classification = this.storage.getClassificationAt(
      document.uri,
      position
    );
    
    if (!classification) return null;
    
    const markdown = this.createHoverContent(classification);
    return new vscode.Hover(markdown);
  }
  
  private createHoverContent(classification: Classification): vscode.MarkdownString {
    const md = new vscode.MarkdownString();
    md.supportHtml = true;
    md.isTrusted = true;
    
    md.appendMarkdown(`### ${classification.archetype} | ${classification.shotType}\n\n`);
    md.appendMarkdown(`**Clarity**: ${this.renderBar(classification.quality.clarity)}\n\n`);
    md.appendMarkdown(`**Context**: ${this.renderBar(classification.quality.context)}\n\n`);
    // ... more content
    
    return md;
  }
}
```

**StatusBarManager** (`statusBar.ts`):
```typescript
export class StatusBarManager {
  private item: vscode.StatusBarItem;
  
  constructor(context: vscode.ExtensionContext) {
    this.item = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100
    );
    this.item.command = 'promptClassifier.openInsights';
    context.subscriptions.push(this.item);
    this.item.show();
  }
  
  updateSession(session: SessionStats) {
    this.item.text = this.formatStats(session);
    this.item.tooltip = this.formatTooltip(session);
  }
  
  private formatStats(session: SessionStats): string {
    const { total, distribution } = session;
    const icons = Object.entries(distribution)
      .map(([type, count]) => `${SHOT_TYPE_SYMBOLS[type]} ${count}`)
      .join(' ');
    return `⛳ ${total} | ${icons}`;
  }
}
```

**InsightsPanel** (`insightsPanel.ts`):
```typescript
export class InsightsPanel {
  private panel: vscode.WebviewPanel | undefined;
  
  constructor(
    private context: vscode.ExtensionContext,
    private storage: PromptStorage
  ) {}
  
  show() {
    if (this.panel) {
      this.panel.reveal();
      return;
    }
    
    this.panel = vscode.window.createWebviewPanel(
      'promptInsights',
      'Prompt Insights',
      vscode.ViewColumn.Two,
      {
        enableScripts: true,
        retainContextWhenHidden: true
      }
    );
    
    this.panel.webview.html = this.getHtmlContent();
    this.panel.webview.onDidReceiveMessage(this.handleMessage.bind(this));
  }
  
  private getHtmlContent(): string {
    const session = this.storage.getCurrentSession();
    const analytics = this.storage.getAnalytics();
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>${this.getStyles()}</style>
        </head>
        <body>
          <div id="app">
            <h1>Prompt Insights</h1>
            ${this.renderSessionSummary(session)}
            ${this.renderAnalytics(analytics)}
            ${this.renderRecommendations(analytics)}
          </div>
          <script>${this.getScript()}</script>
        </body>
      </html>
    `;
  }
}
```

#### **1.2.4 Storage Layer** (`storage/`)

**PromptStorage** (`promptHistory.ts`):
```typescript
export class PromptStorage {
  private memento: vscode.Memento;
  private cache: Map<string, Classification>;
  
  constructor(context: vscode.ExtensionContext) {
    this.memento = context.workspaceState;
    this.cache = new Map();
  }
  
  async saveClassification(classification: Classification): Promise<void> {
    // Cache in memory
    this.cache.set(classification.id, classification);
    
    // Persist to disk
    const history = await this.getHistory();
    history.push(classification);
    
    // Limit history size
    if (history.length > 1000) {
      history.splice(0, history.length - 1000);
    }
    
    await this.memento.update('promptHistory', history);
  }
  
  async getHistory(limit?: number): Promise<Classification[]> {
    const history = this.memento.get<Classification[]>('promptHistory', []);
    return limit ? history.slice(-limit) : history;
  }
  
  async search(query: string): Promise<Classification[]> {
    const history = await this.getHistory();
    return history.filter(c => 
      c.prompt.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  async exportJSON(): Promise<string> {
    const data = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      classifications: await this.getHistory()
    };
    return JSON.stringify(data, null, 2);
  }
  
  async exportCSV(): Promise<string> {
    const history = await this.getHistory();
    const rows = history.map(c => [
      c.timestamp,
      c.archetype,
      c.shotType,
      c.quality.clarity,
      c.quality.context,
      c.quality.confidence,
      `"${c.prompt.replace(/"/g, '""')}"`
    ]);
    
    const header = ['Timestamp', 'Archetype', 'Shot Type', 'Clarity', 'Context', 'Confidence', 'Prompt'];
    return [header, ...rows].map(row => row.join(',')).join('\n');
  }
}
```

**AnalyticsEngine** (`analytics.ts`):
```typescript
export class AnalyticsEngine {
  constructor(private storage: PromptStorage) {}
  
  async calculateSessionStats(): Promise<SessionStats> {
    const history = await this.storage.getHistory();
    const session = this.getCurrentSessionPrompts(history);
    
    return {
      total: session.length,
      archetypeDistribution: this.countByArchetype(session),
      shotTypeDistribution: this.countByShotType(session),
      averageQuality: this.calculateAverageQuality(session),
      trends: this.calculateTrends(session)
    };
  }
  
  async detectPatterns(): Promise<Pattern[]> {
    const history = await this.storage.getHistory();
    const patterns: Pattern[] = [];
    
    // Detect repeated inefficient sequences
    const sequences = this.extractSequences(history);
    for (const seq of sequences) {
      if (this.isInefficient(seq)) {
        patterns.push({
          type: 'inefficient_sequence',
          description: `Repeated pattern: ${seq.map(s => s.shotType).join(' → ')}`,
          severity: 'warning',
          suggestion: this.suggestImprovement(seq)
        });
      }
    }
    
    // Detect missing context
    const lowContextPrompts = history.filter(c => c.quality.context < 50);
    if (lowContextPrompts.length > history.length * 0.3) {
      patterns.push({
        type: 'low_context',
        description: '30%+ of prompts lack sufficient context',
        severity: 'warning',
        suggestion: 'Consider providing code snippets or file references'
      });
    }
    
    return patterns;
  }
  
  private extractSequences(history: Classification[]): Classification[][] {
    // Group by file/task context
    const groups = new Map<string, Classification[]>();
    
    for (const classification of history) {
      const key = classification.metadata.fileContext.join('|');
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(classification);
    }
    
    return Array.from(groups.values()).filter(g => g.length > 2);
  }
}
```

---

## 2. Classification Algorithms

### 2.1 Feature Extraction

```typescript
interface PromptFeatures {
  // Text-based features
  wordCount: number;
  sentenceCount: number;
  avgWordLength: number;
  
  // Structural features
  hasCodeSnippet: boolean;
  hasFileReference: boolean;
  hasLineNumber: boolean;
  hasQuestion: boolean;
  
  // Semantic features
  actionVerbs: string[];
  technicalTerms: string[];
  vagueTerms: string[];
  
  // Context features
  previousPrompts: number;
  fileContextSize: number;
  similarityToPrevious: number;
  
  // Domain-specific features
  hasSpecificAPI: boolean;
  hasConstraints: boolean;
  hasExamples: boolean;
}

function extractFeatures(prompt: string, context: Context): PromptFeatures {
  const tokens = tokenize(prompt);
  const sentences = splitSentences(prompt);
  
  return {
    wordCount: tokens.length,
    sentenceCount: sentences.length,
    avgWordLength: tokens.reduce((sum, t) => sum + t.length, 0) / tokens.length,
    
    hasCodeSnippet: /```[\s\S]*```/.test(prompt),
    hasFileReference: /\.(ts|js|py|java|cpp|go)\b/.test(prompt),
    hasLineNumber: /line \d+|:\d+/.test(prompt),
    hasQuestion: /\?|^(what|how|why|when|where|who)/i.test(prompt),
    
    actionVerbs: extractActionVerbs(tokens),
    technicalTerms: extractTechnicalTerms(tokens),
    vagueTerms: extractVagueTerms(tokens),
    
    previousPrompts: context.history.length,
    fileContextSize: context.files.length,
    similarityToPrevious: calculateSimilarity(prompt, context.lastPrompt),
    
    hasSpecificAPI: containsAPINames(prompt),
    hasConstraints: containsConstraints(prompt),
    hasExamples: containsExamples(prompt)
  };
}
```

### 2.2 Archetype Classification Algorithm

```typescript
function classifyArchetype(features: PromptFeatures): ArchetypeResult {
  const scores = {
    Precision: 0,
    Convergent: 0,
    Explorer: 0,
    Creative: 0
  };
  
  // PRECISION indicators
  if (features.hasLineNumber) scores.Precision += 30;
  if (features.hasFileReference && features.wordCount < 15) scores.Precision += 25;
  if (features.actionVerbs.some(v => ['fix', 'change', 'update', 'replace'].includes(v))) {
    scores.Precision += 20;
  }
  if (features.hasCodeSnippet && features.wordCount < 20) scores.Precision += 15;
  
  // CONVERGENT indicators
  if (features.actionVerbs.some(v => ['implement', 'build', 'create', 'add'].includes(v))) {
    scores.Convergent += 25;
  }
  if (features.hasConstraints) scores.Convergent += 20;
  if (features.hasSpecificAPI) scores.Convergent += 15;
  if (features.wordCount > 15 && features.wordCount < 50) scores.Convergent += 15;
  if (features.hasExamples) scores.Convergent += 10;
  
  // EXPLORER indicators
  if (features.hasQuestion) scores.Explorer += 30;
  if (features.actionVerbs.some(v => ['research', 'investigate', 'explore', 'find'].includes(v))) {
    scores.Explorer += 25;
  }
  if (features.vagueTerms.length > 2) scores.Explorer += 20;
  if (!features.hasCodeSnippet && !features.hasFileReference) scores.Explorer += 15;
  if (features.wordCount > 50) scores.Explorer += 10;
  
  // CREATIVE indicators
  if (features.technicalTerms.some(t => ['design', 'UX', 'UI', 'visual', 'style'].includes(t))) {
    scores.Creative += 30;
  }
  if (features.vagueTerms.some(v => ['beautiful', 'elegant', 'nice', 'clean'].includes(v))) {
    scores.Creative += 25;
  }
  if (!features.hasConstraints && features.wordCount > 20) scores.Creative += 15;
  
  const winner = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b);
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  
  return {
    archetype: winner[0] as Archetype,
    confidence: winner[1] / totalScore,
    scores
  };
}
```

### 2.3 Shot Type Classification Algorithm

```typescript
function classifyShotType(
  prompt: string,
  features: PromptFeatures,
  history: Classification[]
): ShotTypeResult {
  // RECOVERY detection (highest priority)
  if (isRecoveryShot(prompt, history)) {
    return { shotType: 'recovery', confidence: 0.95 };
  }
  
  // Calculate confidence based on multiple factors
  const specificityScore = calculateSpecificity(features);
  const contextScore = calculateContextQuality(features);
  const progressionScore = calculateProgression(history);
  
  const confidence = 
    (specificityScore * 0.5) +
    (contextScore * 0.3) +
    (progressionScore * 0.2);
  
  // Map confidence to shot type
  if (confidence < 0.6) return { shotType: 'driver', confidence };
  if (confidence < 0.8) return { shotType: 'iron', confidence };
  if (confidence < 0.95) return { shotType: 'wedge', confidence };
  return { shotType: 'putter', confidence };
}

function calculateSpecificity(features: PromptFeatures): number {
  let score = 0.5; // Base score
  
  // Positive factors
  if (features.hasLineNumber) score += 0.2;
  if (features.hasFileReference) score += 0.15;
  if (features.hasCodeSnippet) score += 0.1;
  if (features.actionVerbs.length > 0) score += 0.1;
  
  // Negative factors
  if (features.vagueTerms.length > 2) score -= 0.2;
  if (features.hasQuestion) score -= 0.15;
  if (features.wordCount > 100) score -= 0.1;
  
  return Math.max(0, Math.min(1, score));
}

function isRecoveryShot(prompt: string, history: Classification[]): boolean {
  const recoveryKeywords = [
    'revert', 'undo', 'go back', 'wrong', 'mistake', 'error',
    'broke', 'fix this', 'not working', 'instead'
  ];
  
  const hasRecoveryKeyword = recoveryKeywords.some(kw => 
    prompt.toLowerCase().includes(kw)
  );
  
  if (hasRecoveryKeyword) return true;
  
  // Check if last prompt had low success indicators
  if (history.length > 0) {
    const last = history[history.length - 1];
    if (last.metadata.outcome === 'retry') return true;
  }
  
  return false;
}
```

### 2.4 Quality Metrics Calculation

```typescript
interface QualityMetrics {
  clarity: number;    // 0-100
  context: number;    // 0-100
  confidence: number; // 0.0-1.0
}

function calculateQualityMetrics(
  prompt: string,
  features: PromptFeatures,
  context: Context
): QualityMetrics {
  return {
    clarity: calculateClarity(prompt, features),
    context: calculateContext(features, context),
    confidence: calculateConfidence(features, context)
  };
}

function calculateClarity(prompt: string, features: PromptFeatures): number {
  let score = 50; // Base score
  
  // Specificity factors
  if (features.hasLineNumber) score += 15;
  if (features.hasFileReference) score += 10;
  if (features.hasCodeSnippet) score += 10;
  if (features.actionVerbs.length > 0) score += 10;
  if (features.hasConstraints) score += 10;
  
  // Length factors (Goldilocks zone: 10-50 words)
  if (features.wordCount >= 10 && features.wordCount <= 50) {
    score += 10;
  } else if (features.wordCount < 10) {
    score -= 15;
  } else if (features.wordCount > 100) {
    score -= 20;
  }
  
  // Negative factors
  if (features.vagueTerms.length > 3) score -= 20;
  if (features.hasQuestion && !features.hasConstraints) score -= 10;
  if (features.sentenceCount === 1 && features.wordCount > 30) score -= 10;
  
  return Math.max(0, Math.min(100, score));
}

function calculateContext(features: PromptFeatures, context: Context): number {
  let score = 30; // Base score (some context always exists)
  
  // Explicit context factors
  if (features.hasFileReference) score += 20;
  if (features.hasCodeSnippet) score += 20;
  if (features.hasLineNumber) score += 15;
  
  // Implicit context factors
  if (context.files.length > 0) score += 10;
  if (context.currentFile) score += 5;
  if (features.previousPrompts > 0) score += 10;
  
  // Context depth
  const contextDepth = context.files.length + (features.hasCodeSnippet ? 2 : 0);
  score += Math.min(contextDepth * 3, 15);
  
  return Math.max(0, Math.min(100, score));
}
```

---

## 3. Performance Optimization

### 3.1 Caching Strategy

```typescript
class ClassificationCache {
  private cache: Map<string, CachedClassification>;
  private maxSize = 100;
  
  get(promptHash: string): Classification | null {
    const cached = this.cache.get(promptHash);
    if (!cached) return null;
    
    // Check if cache is stale (>1 hour)
    if (Date.now() - cached.timestamp > 3600000) {
      this.cache.delete(promptHash);
      return null;
    }
    
    return cached.classification;
  }
  
  set(promptHash: string, classification: Classification): void {
    // LRU eviction
    if (this.cache.size >= this.maxSize) {
      const oldest = this.cache.keys().next().value;
      this.cache.delete(oldest);
    }
    
    this.cache.set(promptHash, {
      classification,
      timestamp: Date.now()
    });
  }
  
  hash(prompt: string): string {
    // Simple hash function (use crypto.subtle in production)
    return prompt.split('').reduce((hash, char) => {
      return ((hash << 5) - hash) + char.charCodeAt(0) | 0;
    }, 0).toString(36);
  }
}
```

### 3.2 Debouncing & Throttling

```typescript
class ClassificationDebouncer {
  private timeout: NodeJS.Timeout | null = null;
  private readonly delay = 200; // ms
  
  debounce(fn: () => void): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    
    this.timeout = setTimeout(() => {
      fn();
      this.timeout = null;
    }, this.delay);
  }
}

// Usage in prompt listener
const debouncer = new ClassificationDebouncer();

vscode.workspace.onDidChangeTextDocument(event => {
  debouncer.debounce(() => {
    const prompt = extractPrompt(event.document);
    if (prompt) {
      classifyAndDisplay(prompt);
    }
  });
});
```

### 3.3 Lazy Loading

```typescript
class MLModelLoader {
  private model: ONNXModel | null = null;
  
  async getModel(): Promise<ONNXModel> {
    if (!this.model) {
      console.log('Loading ML model...');
      const modelPath = path.join(__dirname, '../models/classifier.onnx');
      this.model = await ort.InferenceSession.create(modelPath);
      console.log('ML model loaded');
    }
    return this.model;
  }
  
  unload(): void {
    this.model = null;
  }
}

// Load model only when ML classification is enabled
const modelLoader = new MLModelLoader();

async function classifyWithML(prompt: string): Promise<Classification> {
  const model = await modelLoader.getModel();
  // ... use model
}
```

---

## 4. Extension API

### 4.1 Commands

```typescript
// package.json
{
  "contributes": {
    "commands": [
      {
        "command": "promptClassifier.openInsights",
        "title": "Open Prompt Insights",
        "category": "Prompt Classifier"
      },
      {
        "command": "promptClassifier.exportSession",
        "title": "Export Current Session",
        "category": "Prompt Classifier"
      },
      {
        "command": "promptClassifier.clearHistory",
        "title": "Clear Prompt History",
        "category": "Prompt Classifier"
      },
      {
        "command": "promptClassifier.reclassify",
        "title": "Reclassify Current Prompt",
        "category": "Prompt Classifier"
      }
    ]
  }
}
```

### 4.2 Configuration

```typescript
// package.json
{
  "contributes": {
    "configuration": {
      "title": "Prompt Classifier",
      "properties": {
        "promptClassifier.display.showInlineBadges": {
          "type": "boolean",
          "default": true,
          "description": "Show classification badges inline with prompts"
        },
        "promptClassifier.display.showStatusBar": {
          "type": "boolean",
          "default": true,
          "description": "Show session statistics in status bar"
        },
        "promptClassifier.classification.useML": {
          "type": "boolean",
          "default": false,
          "description": "Use ML-enhanced classification (requires model download)"
        },
        "promptClassifier.classification.confidenceThreshold": {
          "type": "number",
          "default": 0.7,
          "minimum": 0,
          "maximum": 1,
          "description": "Minimum confidence for classification display"
        },
        "promptClassifier.storage.maxHistory": {
          "type": "number",
          "default": 1000,
          "description": "Maximum number of prompts to store"
        }
      }
    }
  }
}
```

---

## 5. Testing Strategy

### 5.1 Unit Tests

```typescript
// __tests__/archetypeClassifier.test.ts
describe('ArchetypeClassifier', () => {
  let classifier: ArchetypeClassifier;
  
  beforeEach(() => {
    classifier = new ArchetypeClassifier();
  });
  
  describe('Precision classification', () => {
    it('should classify simple fix as Precision', () => {
      const prompt = 'Fix the typo on line 42 of auth.ts';
      const result = classifier.classify(prompt, {});
      
      expect(result.archetype).toBe('Precision');
      expect(result.confidence).toBeGreaterThan(0.7);
    });
    
    it('should classify specific replacement as Precision', () => {
      const prompt = 'Change the button color to red';
      const result = classifier.classify(prompt, {});
      
      expect(result.archetype).toBe('Precision');
    });
  });
  
  describe('Convergent classification', () => {
    it('should classify feature implementation as Convergent', () => {
      const prompt = 'Implement user authentication with JWT';
      const result = classifier.classify(prompt, {});
      
      expect(result.archetype).toBe('Convergent');
      expect(result.confidence).toBeGreaterThan(0.6);
    });
  });
  
  describe('Explorer classification', () => {
    it('should classify research question as Explorer', () => {
      const prompt = 'What is the best way to handle real-time updates?';
      const result = classifier.classify(prompt, {});
      
      expect(result.archetype).toBe('Explorer');
    });
  });
  
  describe('Creative classification', () => {
    it('should classify design request as Creative', () => {
      const prompt = 'Design a beautiful landing page';
      const result = classifier.classify(prompt, {});
      
      expect(result.archetype).toBe('Creative');
    });
  });
});
```

### 5.2 Integration Tests

```typescript
// __tests__/integration.test.ts
describe('Extension Integration', () => {
  let extension: vscode.Extension<any>;
  
  beforeAll(async () => {
    extension = vscode.extensions.getExtension('promptClassifier')!;
    await extension.activate();
  });
  
  it('should classify prompt and display badge', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '// Test file',
      language: 'typescript'
    });
    
    const editor = await vscode.window.showTextDocument(document);
    
    // Simulate prompt input
    await vscode.commands.executeCommand(
      'promptClassifier.classifyPrompt',
      'Fix the bug on line 10'
    );
    
    // Check that badge is displayed
    const decorations = editor.decorations;
    expect(decorations.length).toBeGreaterThan(0);
  });
});
```

### 5.3 Performance Tests

```typescript
// __tests__/performance.test.ts
describe('Performance', () => {
  it('should classify within 100ms', async () => {
    const classifier = new ArchetypeClassifier();
    const prompt = 'Implement user authentication';
    
    const start = performance.now();
    classifier.classify(prompt, {});
    const end = performance.now();
    
    expect(end - start).toBeLessThan(100);
  });
  
  it('should handle 1000 prompts without memory leak', async () => {
    const storage = new PromptStorage(context);
    const initialMemory = process.memoryUsage().heapUsed;
    
    for (let i = 0; i < 1000; i++) {
      await storage.saveClassification({
        id: `test-${i}`,
        prompt: `Test prompt ${i}`,
        archetype: 'Precision',
        shotType: 'driver',
        // ... more fields
      });
    }
    
    const finalMemory = process.memoryUsage().heapUsed;
    const increase = finalMemory - initialMemory;
    
    expect(increase).toBeLessThan(10 * 1024 * 1024); // <10MB
  });
});
```

---

## 6. Build & Deployment

### 6.1 Build Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2020",
    "outDir": "out",
    "lib": ["ES2020"],
    "sourceMap": true,
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  },
  "exclude": ["node_modules", ".vscode-test"]
}
```

```json
// webpack.config.js
const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  }
};
```

### 6.2 Package Configuration

```json
// package.json
{
  "name": "prompt-classifier",
  "displayName": "Hyperdimensional Golf Prompt Classifier",
  "description": "Classify and analyze your AI prompts in real-time",
  "version": "1.0.0",
  "publisher": "hyperdimensional-golf",
  "engines": {
    "vscode": "^1.80.0"
  },
  "categories": [
    "Machine Learning",
    "Data Science",
    "Other"
  ],
  "activationEvents": [
    "onStartupFinished"
  ],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [...],
    "configuration": {...}
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "pretest": "npm run compile",
    "test": "node ./out/test/runTest.js",
    "package": "vsce package",
    "publish": "vsce publish"
  },
  "devDependencies": {
    "@types/vscode": "^1.80.0",
    "@types/node": "^18.x",
    "typescript": "^5.0.0",
    "vsce": "^2.15.0"
  },
  "dependencies": {
    "onnxruntime-node": "^1.16.0"
  }
}
```

---

## 7. Monitoring & Analytics

### 7.1 Telemetry (Optional, Opt-in)

```typescript
class TelemetryService {
  constructor(private enabled: boolean) {}
  
  trackClassification(classification: Classification): void {
    if (!this.enabled) return;
    
    const anonymizedData = {
      archetype: classification.archetype,
      shotType: classification.shotType,
      quality: classification.quality,
      // No prompt text or PII
    };
    
    // Send to analytics service
  }
  
  trackPerformance(metric: string, duration: number): void {
    if (!this.enabled) return;
    
    // Track performance metrics
  }
}
```

---

## Appendix: File Structure

```
prompt-classifier-extension/
├── src/
│   ├── extension.ts
│   ├── classifier/
│   │   ├── archetypeClassifier.ts
│   │   ├── shotTypeClassifier.ts
│   │   ├── qualityAnalyzer.ts
│   │   ├── featureExtractor.ts
│   │   └── mlModel.ts
│   ├── ui/
│   │   ├── inlineBadge.ts
│   │   ├── hoverProvider.ts
│   │   ├── statusBar.ts
│   │   ├── insightsPanel.ts
│   │   └── webview/
│   │       ├── index.html
│   │       ├── styles.css
│   │       └── app.js
│   ├── storage/
│   │   ├── promptHistory.ts
│   │   ├── analytics.ts
│   │   ├── cache.ts
│   │   └── exporters.ts
│   ├── types/
│   │   ├── classification.ts
│   │   ├── context.ts
│   │   └── config.ts
│   └── utils/
│       ├── promptParser.ts
│       ├── patterns.ts
│       ├── debouncer.ts
│       └── hash.ts
├── models/
│   ├── archetype-classifier.onnx
│   └── quality-scorer.onnx
├── __tests__/
│   ├── archetypeClassifier.test.ts
│   ├── shotTypeClassifier.test.ts
│   ├── qualityAnalyzer.test.ts
│   ├── integration.test.ts
│   └── performance.test.ts
├── .vscodeignore
├── package.json
├── tsconfig.json
├── webpack.config.js
├── README.md
├── CHANGELOG.md
└── LICENSE
```

---

**Document Version**: 1.0.0  
**Last Updated**: November 4, 2025  
**Status**: Ready for Implementation

