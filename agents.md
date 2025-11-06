# Agent Configuration - Hyperdimensional Vector Space Golf

## Branch Organization Convention

This project uses a standardized branch naming convention that agents should follow:

### Branch Types

#### 1. Contemplations (`contemplations/[name]`)
**Purpose**: High-level architectural thinking, planning, and design exploration

**Agent Behavior**:
- Focus on design and architecture
- Generate design documents
- Explore conceptual approaches
- Document thought processes
- Create planning artifacts

**When to Use**:
- Initial feature exploration
- Architectural design
- High-level concept development
- Requirements analysis

**Examples**:
- `contemplations/ide-extension`
- `contemplations/golf-hole-plan-view-art-generator`
- `contemplations/ontological-mapping`

---

#### 2. Studies (`studies/[name]`)
**Purpose**: Deep dives into specific implementations, variable studies, research, and detailed analysis

**Agent Behavior**:
- Focus on research and analysis
- Conduct performance studies
- Analyze implementation details
- Research best practices
- Validate approaches
- Document findings

**When to Use**:
- Detailed implementation research
- Performance analysis
- Technical deep dives
- Variable and parameter studies
- Testing and validation

**Examples**:
- `studies/responsive-layout-breakpoints`
- `studies/fog-visualization-performance`
- `studies/ssr-hydration-consistency`
- `studies/variable-implementers-study`

---

#### 3. Prototypes (`prototypes/[name]`)
**Purpose**: Working implementations, experimental features, and functional prototypes

**Agent Behavior**:
- Focus on implementation and testing
- Write working code
- Create functional features
- Test implementations
- Iterate on design
- Fix bugs

**When to Use**:
- Functional implementations
- Experimental features
- Proof of concept
- Working demos
- User-facing features

**Examples**:
- `prototypes/ide-extension`
- `prototypes/diagrams-viewer`
- `prototypes/fog-visualization`

---

## Agent Workflow

### Contemplation Phase
1. Create `contemplations/[name]` branch
2. Explore concepts and design
3. Document architecture
4. Plan implementation approach
5. Generate design documents

### Study Phase
1. Create `studies/[name]` branch
2. Research implementation details
3. Analyze variables and parameters
4. Validate approaches
5. Document findings

### Prototype Phase
1. Create `prototypes/[name]` branch
2. Implement working version
3. Test functionality
4. Iterate on design
5. Fix issues

### Integration Phase
1. Merge to `main` when ready
2. Update documentation
3. Archive completed branches

---

## Agent Guidelines

### Code Organization
- **Prototypes**: `/app/prototypes` and `/components/prototypes`
- **Studies**: Research and analysis in branch-specific directories
- **Contemplations**: Design docs and planning artifacts

### Commit Messages
Reference branch type in commits:
```
[contemplation] Add architectural design for IDE extension
[study] Analyze performance of fog visualization
[prototype] Implement responsive scorecard layout
```

### Documentation
- Update `BRANCH-CONVENTION.md` when convention evolves
- Document decisions in appropriate branch type
- Keep branch names consistent

### Component Development
- Use semantic domain naming
- Follow existing patterns
- Maintain scorecard aesthetic
- Consider responsive design

---

## Memory Organization

Organize memories by branch type:

### Contemplation Memories
- Architectural decisions
- Design rationale
- Planning notes
- Conceptual exploration

### Study Memories
- Implementation details
- Performance notes
- Research findings
- Analysis results

### Prototype Memories
- Feature implementations
- User interactions
- Bug fixes
- Testing notes

---

## IDE Integration

### Directory Structure
```
/
├── contemplations/
│   └── [contemplation-name]/
├── studies/
│   └── [study-name]/
└── prototypes/
    └── [prototype-name]/
```

### Route Organization
- `/prototypes` - Central hub for all prototypes
- `/prototypes/[name]` - Individual prototype pages

---

## Examples

### Example: IDE Extension Development

1. **Contemplation** (`contemplations/ide-extension`)
   - Agent generates architectural design
   - Documents component structure
   - Plans responsive layout approach

2. **Study** (`studies/responsive-layout-breakpoints`)
   - Agent researches breakpoint strategies
   - Analyzes mobile vs desktop layouts
   - Tests different grid configurations

3. **Prototype** (`prototypes/ide-extension`)
   - Agent implements working IDE prototype
   - Adds responsive features
   - Integrates fog visualization

---

## Benefits

1. **Clear Organization**: Easy to find and navigate work
2. **Workflow Clarity**: Understand project phase at a glance
3. **Agent Guidance**: Clear instructions for different work types
4. **Documentation**: Natural organization for docs and notes
5. **IDE Integration**: Works seamlessly with Cursor

---

**Last Updated**: 2025-01-XX  
**Version**: 1.0.0  
**See Also**: `BRANCH-CONVENTION.md` for full details

