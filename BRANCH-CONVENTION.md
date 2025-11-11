# Branch Organization Convention

**Purpose**: Standardized branch naming and organization for development workflow  
**Applies To**: Git branches, Cursor memories, Cursor rules, agents.md, and IDE organization

---

## Branch Structure

### 1. Contemplations
**Pattern**: `contemplations/[contemplation-name]`

**Purpose**: High-level architectural thinking, planning, and design exploration

**Examples**:
- `contemplations/ide-extension`
- `contemplations/golf-hole-plan-view-art-generator`
- `contemplations/llmm-prompts`
- `contemplations/ontological-mapping`

**When to Use**:
- Initial exploration of a feature or system
- Architectural design and planning
- High-level concept development
- Documentation of thought processes

**Content**:
- Design documents
- Architecture diagrams
- Planning notes
- Requirements analysis
- Conceptual exploration

---

### 2. Studies
**Pattern**: `studies/[study-name]` or `studies/[variable-implementers-study]`

**Purpose**: Deep dives into specific implementations, variable studies, research, and detailed analysis

**Examples**:
- `studies/responsive-layout-breakpoints`
- `studies/fog-visualization-performance`
- `studies/component-architecture-refactor`
- `studies/ssr-hydration-consistency`
- `studies/variable-implementers-study`

**When to Use**:
- Detailed implementation research
- Performance analysis
- Technical deep dives
- Variable and parameter studies
- Implementation pattern exploration
- Testing and validation

**Content**:
- Implementation details
- Performance metrics
- Code analysis
- Test results
- Research findings
- Variable studies

---

### 3. Prototypes
**Pattern**: `prototypes/[prototype-name]`

**Purpose**: Working implementations, experimental features, and functional prototypes

**Examples**:
- `prototypes/ide-extension`
- `prototypes/diagrams-viewer`
- `prototypes/fog-visualization`
- `prototypes/responsive-scorecard`

**When to Use**:
- Functional implementations
- Experimental features
- Proof of concept
- Working demos
- User-facing features

**Content**:
- Working code
- Functional features
- UI/UX implementations
- Interactive demos
- Testable prototypes

---

## Workflow Integration

### Git Workflow
1. **Contemplation Phase**: Create `contemplations/[name]` branch
   - Explore concepts
   - Document architecture
   - Plan implementation

2. **Study Phase**: Create `studies/[name]` branch
   - Research implementation details
   - Analyze variables and parameters
   - Validate approaches

3. **Prototype Phase**: Create `prototypes/[name]` branch
   - Implement working version
   - Test functionality
   - Iterate on design

4. **Integration**: Merge to `main` when ready

### Cursor Integration

#### Memories
Organize memories by branch type:
- `contemplations/`: Architectural decisions, design rationale
- `studies/`: Implementation details, performance notes, research findings
- `prototypes/`: Feature implementations, user interactions, bug fixes

#### Cursor Rules
Reference branch convention in rules:
```markdown
## Branch Organization
- Use `contemplations/` for planning and design
- Use `studies/` for research and analysis
- Use `prototypes/` for working implementations
```

#### agents.md
Document agent behavior by branch type:
- Contemplation agents: Focus on design and architecture
- Study agents: Focus on research and analysis
- Prototype agents: Focus on implementation and testing

---

## IDE Organization

### Directory Structure
```
/
├── contemplations/
│   └── [contemplation-name]/
│       ├── docs/
│       ├── diagrams/
│       └── notes/
├── studies/
│   └── [study-name]/
│       ├── research/
│       ├── analysis/
│       └── findings/
└── prototypes/
    └── [prototype-name]/
        ├── src/
        ├── tests/
        └── docs/
```

### Route Organization
- `/prototypes` - Central hub for all prototypes
- `/prototypes/[name]` - Individual prototype pages
- `/contemplations` - Contemplation documentation (future)
- `/studies` - Study documentation (future)

---

## Naming Conventions

### Branch Names
- Use kebab-case: `contemplations/ide-extension`
- Be descriptive: `studies/responsive-layout-breakpoints`
- Include context: `prototypes/fog-visualization`

### Commit Messages
Reference branch type in commits:
```
[contemplation] Add architectural design for IDE extension
[study] Analyze performance of fog visualization
[prototype] Implement responsive scorecard layout
```

---

## Examples

### Example Workflow

1. **Contemplation**: `contemplations/ide-extension`
   - Design horizontal scorecard bar
   - Plan responsive layout
   - Document component architecture

2. **Study**: `studies/responsive-layout-breakpoints`
   - Research breakpoint strategies
   - Analyze mobile vs desktop layouts
   - Test different grid configurations

3. **Prototype**: `prototypes/ide-extension`
   - Implement working IDE prototype
   - Add responsive features
   - Integrate fog visualization

---

## Benefits

1. **Clear Organization**: Easy to find and navigate work
2. **Workflow Clarity**: Understand project phase at a glance
3. **Collaboration**: Team members know where to find work
4. **Documentation**: Natural organization for docs and notes
5. **IDE Integration**: Works seamlessly with Cursor and other tools

---

## Maintenance

- Keep branch names consistent
- Update documentation as convention evolves
- Review and merge branches regularly
- Archive completed contemplations and studies
- Keep prototypes active and maintained

---

**Last Updated**: 2025-01-XX  
**Version**: 1.0.0

