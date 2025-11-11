# Hyperdimensional Golf Prompt Classifier

**A VS Code/Cursor extension that classifies and analyzes your AI coding prompts in real-time**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com)
[![Status](https://img.shields.io/badge/status-planning-yellow.svg)](https://github.com)
[![Documentation](https://img.shields.io/badge/docs-complete-green.svg)](./PROMPT-CLASSIFIER-INDEX.md)

---

## 🎯 What Is This?

The **Prompt Classifier Extension** brings the Hyperdimensional Vector Space Golf framework to your IDE, providing real-time feedback on your AI prompts as you write them.

### The Problem
When using AI coding assistants (Cursor, GitHub Copilot), you have **no visibility** into:
- What type of prompt you're using
- How effective your approach is
- Patterns in your prompting strategy
- How to improve over time

### The Solution
An intelligent extension that:
- **Classifies** every prompt by archetype and refinement level
- **Displays** inline badges showing classification
- **Provides** quality metrics and improvement suggestions
- **Tracks** patterns and analytics over time
- **Integrates** with the Golf Scorecard app for project tracking

---

## ⚡ Quick Example

```
You type: "Implement user authentication with JWT"

Extension shows:  ⊗ ◐  (Convergent | Iron)

Hover for details:
┌──────────────────────────────────────┐
│ ⊗ Convergent | ◐ Iron               │
│                                      │
│ Clarity: ████████░░ 82%              │
│ Context: ████████░░ 78%              │
│ Confidence: ███████░░░ 70%           │
│                                      │
│ Expected Shots: 3-4                  │
│                                      │
│ 💡 Tip: Add specific requirements    │
│    like validation rules             │
└──────────────────────────────────────┘
```

---

## 🎨 Classification System

### Archetypes (What you're doing)

| Symbol | Name | Par | Description |
|--------|------|-----|-------------|
| ⊕ | **Precision** | 3 | Clear, direct tasks |
| ⊗ | **Convergent** | 4 | Iterative refinement |
| ⊛ | **Explorer** | 5+ | Discovery & research |
| ⊜ | **Creative** | 6+ | Subjective, artistic |

### Shot Types (How refined your approach is)

| Symbol | Name | Confidence | Description |
|--------|------|------------|-------------|
| ● | **Driver** | <60% | Exploratory, broad |
| ◐ | **Iron** | 60-80% | Adding constraints |
| ◑ | **Wedge** | 80-95% | Fine-tuning |
| ○ | **Putter** | >95% | Final polish |
| ↺ | **Recovery** | - | Fix mistakes |

---

## 📚 Documentation

### Start Here

| Document | Pages | Audience | Purpose |
|----------|-------|----------|---------|
| **[One-Pager](PROMPT-CLASSIFIER-ONE-PAGER.md)** | 1 | Everyone | Quick overview |
| **[Executive Summary](PROMPT-CLASSIFIER-EXECUTIVE-SUMMARY.md)** | 8 | Stakeholders | Business case |
| **[Index](PROMPT-CLASSIFIER-INDEX.md)** | 6 | Everyone | Navigation guide |

### Core Documentation

| Document | Pages | Audience | Purpose |
|----------|-------|----------|---------|
| **[PRD](PRD-PROMPT-CLASSIFIER-EXTENSION.md)** | 38 | Product/Design | Complete requirements |
| **[Technical Spec](TECHNICAL-SPEC-PROMPT-CLASSIFIER.md)** | 22 | Engineers | Implementation details |
| **[Reference Guide](PROMPT-CLASSIFICATION-REFERENCE.md)** | 12 | Users | How to use classifications |
| **[Diagrams](PROMPT-CLASSIFIER-DIAGRAMS.md)** | 10 | Technical | Architecture visualizations |

### Total Documentation
**93 pages** of comprehensive specifications, covering:
- Product requirements and features
- Technical architecture and algorithms
- User experience and workflows
- Visual diagrams and flows
- Implementation roadmap

---

## 🚀 Features

### Phase 1: MVP (6 weeks)
- ✅ Real-time classification (<100ms)
- ✅ Inline badges with archetype + shot type
- ✅ Hover tooltips with detailed metrics
- ✅ Quality scores (clarity, context, confidence)
- ✅ Prompt history (last 1000)
- ✅ Status bar integration
- ✅ Export to JSON/CSV

### Phase 2: Analytics (4 weeks)
- ✅ Insights panel with visualizations
- ✅ Pattern detection and warnings
- ✅ Quality recommendations
- ✅ Session analytics
- ✅ Search history

### Phase 3: ML Enhancement (4 weeks)
- ✅ ONNX model integration
- ✅ Personalized classifications
- ✅ User feedback loop
- ✅ A/B testing framework

### Phase 4: Team Features (4 weeks)
- ✅ Pattern export/import
- ✅ Team templates
- ✅ Shared best practices
- ✅ Team analytics dashboard

### Phase 5: Golf Integration (4 weeks)
- ✅ Auto-generate scorecards from sessions
- ✅ Link prompts to holes
- ✅ Bidirectional sync with scorecard app

---

## 🏗️ Technical Overview

### Architecture
```
User Input → Parser → Feature Extraction → Classifier → UI Update
                                            ├─ Archetype (rule-based)
                                            ├─ Shot Type (confidence)
                                            └─ Quality Metrics (heuristics)
```

### Tech Stack
- **Language**: TypeScript
- **Framework**: VS Code Extension API
- **ML** (optional): ONNX Runtime
- **Storage**: VS Code Workspace State (local-only)

### Performance
- **Latency**: <100ms (p95)
- **Memory**: <10MB per session
- **CPU**: <5% average usage

### Privacy
- ✅ Local-first (no cloud by default)
- ✅ No external API calls for classification
- ✅ User control over data sharing
- ✅ GDPR compliant
- ✅ Enterprise-ready

---

## 📊 Success Metrics

| Metric | Target |
|--------|--------|
| **Installs** | 10K+ in 6 months |
| **Active Users** | 60% weekly active |
| **Classification Accuracy** | 90%+ user agreement |
| **Performance** | <100ms latency |
| **Impact** | +15% prompt quality improvement |
| **Efficiency** | -20% iterations per task |

---

## 🗓️ Timeline

| Phase | Duration | Key Deliverables | Status |
|-------|----------|------------------|--------|
| **Phase 1: MVP** | 6 weeks | Classification + Basic UI | 📋 Planning |
| **Phase 2: Analytics** | 4 weeks | Insights + Patterns | 📋 Planning |
| **Phase 3: ML** | 4 weeks | Enhanced Accuracy | 📋 Planning |
| **Phase 4: Team** | 4 weeks | Sharing + Templates | 📋 Planning |
| **Phase 5: Integration** | 4 weeks | Scorecard Sync | 📋 Planning |

**Total**: 22 weeks (~5.5 months) to full feature set

---

## 🎓 Example Use Cases

### Use Case 1: Learning Prompt Engineering
**User**: Junior developer new to AI assistants

**Before**: 
```
"make it work" → confusion → multiple failed attempts
```

**After**:
```
"make it work" 
  → ⊛ ● (Explorer/Driver, Clarity: 20%)
  → 💡 "Try: Specify what needs to work and include error messages"

"Fix the authentication error in login.ts where user is undefined"
  → ⊕ ◑ (Precision/Wedge, Clarity: 95%)
  → ✅ One-shot success
```

### Use Case 2: Improving Team Patterns
**User**: Engineering manager

**Problem**: Team spends too many iterations on simple tasks

**Solution**: 
1. Extension tracks that 40% of prompts are Recovery shots
2. Identifies pattern: Insufficient context in initial prompts
3. Shares best practices: "Always include file context"
4. Team improves: Recovery rate drops to 10%

### Use Case 3: Project Tracking
**User**: Developer working on feature

**Workflow**:
1. Extension tracks all prompts for the feature
2. Auto-groups into "hole" (task)
3. Generates scorecard entry
4. Visualizes in Golf Scorecard app
5. Reviews: "Par 4, took 6 shots" → learns for next time

---

## 🔬 How It Works

### Classification Process

1. **Feature Extraction**: Parse prompt for structure, keywords, context
2. **Archetype Classification**: Rule-based scoring across 4 types
3. **Shot Type Classification**: Confidence calculation based on specificity
4. **Quality Analysis**: Calculate clarity, context, confidence scores
5. **UI Update**: Display inline badge, update status bar
6. **Storage**: Save to history for analytics

### Quality Metrics

**Clarity Score (0-100)**:
- High: Specific, actionable, clear success criteria
- Low: Vague, ambiguous, no clear goal

**Context Score (0-100)**:
- High: File references, code snippets, constraints
- Low: No context, isolated request

**Confidence (0.0-1.0)**:
- High: Likely to succeed in one shot
- Low: Will need multiple iterations

---

## 💡 Why This Matters

### For Individual Developers
- **Learn Faster**: Real-time feedback on prompt quality
- **Work Smarter**: Fewer iterations, better outcomes
- **Build Confidence**: Clear metrics replace guesswork

### For Teams
- **Share Knowledge**: Distribute effective patterns
- **Standardize Practices**: Common prompting vocabulary
- **Measure Impact**: Track AI tool effectiveness

### For the Industry
- **First-of-its-kind**: No competing prompt classifiers
- **Research Platform**: Generate insights about prompt engineering
- **Framework Validation**: Real-world data for Hyperdimensional Golf

---

## 🎯 Competitive Advantage

| Feature | Prompt Classifier | GitHub Copilot | Cursor | Tabnine |
|---------|------------------|----------------|--------|---------|
| Prompt Classification | ✅ | ❌ | ❌ | ❌ |
| Quality Metrics | ✅ | ❌ | ❌ | ❌ |
| Pattern Detection | ✅ | ❌ | ❌ | ❌ |
| Historical Analytics | ✅ | ❌ | ❌ | ❌ |
| Team Sharing | ✅ | ❌ | ❌ | ✅ |
| Local-only Privacy | ✅ | ❌ | ❌ | ❌ |

**Unique Value**: We're the only solution that makes prompt engineering **visible, measurable, and improvable**.

---

## 📖 Quick Links

### Documentation
- 📄 [One-Page Summary](PROMPT-CLASSIFIER-ONE-PAGER.md) - 5 min read
- 📋 [Executive Summary](PROMPT-CLASSIFIER-EXECUTIVE-SUMMARY.md) - 30 min read
- 📚 [Full Documentation Index](PROMPT-CLASSIFIER-INDEX.md) - Navigation guide
- 📖 [Classification Reference](PROMPT-CLASSIFICATION-REFERENCE.md) - User guide
- 🏗️ [Technical Specification](TECHNICAL-SPEC-PROMPT-CLASSIFIER.md) - For engineers
- 📊 [Product Requirements](PRD-PROMPT-CLASSIFIER-EXTENSION.md) - Complete PRD
- 🎨 [Visual Diagrams](PROMPT-CLASSIFIER-DIAGRAMS.md) - Architecture diagrams

### Related
- ⛳ [Golf Scorecard App](README.md) - Main application
- 📐 [Type Definitions](types/scorecard.ts) - Data models
- 🧪 [Sample Data](lib/sample-data.ts) - Examples

---

## 🛠️ Development Status

### Current Phase
📋 **Planning Phase** - Documentation complete, ready for implementation

### Next Steps
1. ⬜ Stakeholder review and approval
2. ⬜ Technical feasibility assessment
3. ⬜ Resource allocation
4. ⬜ Phase 1 implementation kickoff

### Completed
- ✅ Full PRD (38 pages)
- ✅ Technical specification (22 pages)
- ✅ User documentation (12 pages)
- ✅ Visual diagrams (18 diagrams)
- ✅ Executive summary (8 pages)
- ✅ Quick reference materials

---

## 🤝 Contributing

This project is in the planning phase. Once implementation begins, we'll welcome contributions in:

- **Code**: TypeScript, classification algorithms, UI components
- **Design**: UI/UX improvements, visual assets
- **Documentation**: Tutorials, examples, translations
- **Testing**: Beta testing, feedback, bug reports
- **Research**: Prompt engineering patterns, effectiveness studies

---

## 📞 Contact & Questions

### Project Team
- **Product Owner**: [TBD]
- **Technical Lead**: [TBD]
- **Documentation**: Alex Bukh

### Get Involved
- **Discussions**: [TBD - GitHub Discussions]
- **Issues**: [TBD - GitHub Issues]
- **Email**: [TBD]

---

## 📄 License

Part of the Panopticode project. License: [TBD]

---

## 🌟 Acknowledgments

This project extends the **Hyperdimensional Vector Space Golf** framework developed by Patrick Astarita. The golf metaphor provides an intuitive way to understand the complex process of AI-assisted development.

Special thanks to:
- The VS Code Extension API team
- The Cursor IDE team
- The open-source community
- Early feedback providers

---

## 🔮 Vision

> "Make prompt engineering a visible, measurable, and improvable skill—transforming how developers work with AI assistants."

We believe that AI-assisted development is still in its infancy. Just as we have linters for code quality, debuggers for program state, and profilers for performance—we need tools that help us understand and improve our interactions with AI.

The Prompt Classifier is the first step in making AI assistance more transparent, effective, and learnable.

---

## 📈 Project Stats

| Metric | Value |
|--------|-------|
| **Documentation Pages** | 93 |
| **Total Words** | ~43,000 |
| **Diagrams** | 18 |
| **Code Examples** | 50+ |
| **Features Specified** | 40+ |
| **Time to MVP** | 6 weeks |

---

## ✅ Ready to Proceed

All planning documentation is complete and ready for:
- ✅ Stakeholder review
- ✅ Technical assessment
- ✅ Resource allocation
- ✅ Implementation start

---

**Version**: 1.0.0  
**Status**: Planning Complete  
**Last Updated**: November 4, 2025

---

*Transform how you work with AI. One prompt at a time.* ⛳

