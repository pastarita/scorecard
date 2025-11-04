# Prompt Classification Quick Reference

**Visual guide to understanding prompt archetypes and shot types**

---

## 🎯 Archetypes: WHAT You're Trying to Do

### ⊕ PRECISION (Par 3) - Direct & Clear
**Goal**: Single, specific change with obvious path

**Characteristics**:
- ✓ Clear, direct action
- ✓ All context provided
- ✓ Minimal iteration needed
- ✓ Binary success/failure

**Examples**:
```
✓ "Add a red border to the submit button"
✓ "Fix the typo on line 42 of auth.ts"
✓ "Extract this function into utils/helpers.ts"
✓ "Remove the console.log on line 15"
✓ "Rename getUserData to fetchUserData"
```

**Anti-Examples** (NOT Precision):
```
✗ "Make the button look better"
✗ "Fix the authentication"
✗ "Improve this code"
```

**Expected Outcome**: 1-2 shots, quick completion

---

### ⊗ CONVERGENT (Par 4) - Iterative Refinement
**Goal**: Known target, requires progressive constraint application

**Characteristics**:
- ✓ Clear specification
- ✓ Multiple constraints to satisfy
- ✓ 2-4 iterations typical
- ✓ Measurable progress

**Examples**:
```
✓ "Implement user authentication using JWT with email/password"
✓ "Create a responsive navigation component following the design system"
✓ "Build an API endpoint for user registration with validation"
✓ "Add dark mode support to the dashboard with smooth transitions"
✓ "Implement pagination for the user list with 20 items per page"
```

**Anti-Examples** (NOT Convergent):
```
✗ "Build a user system" (too vague)
✗ "Fix button color" (too precise)
✗ "Research auth approaches" (exploration)
```

**Expected Outcome**: 3-4 shots, clear progress markers

---

### ⊛ EXPLORER (Par 5+) - Discovery & Search
**Goal**: Unclear path, needs research and exploration

**Characteristics**:
- ✓ Goal defined but approach uncertain
- ✓ Multiple valid solutions exist
- ✓ Questions and research needed
- ✓ Broad initial exploration

**Examples**:
```
✓ "What's the best way to handle real-time updates in React?"
✓ "Research approaches for optimizing this database query"
✓ "Design the architecture for a notification system"
✓ "How should we structure the API for this feature?"
✓ "Investigate why this component is slow"
```

**Anti-Examples** (NOT Explorer):
```
✗ "Implement the notification system" (convergent)
✗ "Fix the query" (precision)
✗ "Make it pretty" (creative)
```

**Expected Outcome**: 5+ shots, discovery phase then refinement

---

### ⊜ CREATIVE (Par 6+) - Subjective & Artistic
**Goal**: No single "correct" answer, aesthetic/UX considerations

**Characteristics**:
- ✓ Subjective evaluation
- ✓ Aesthetic concerns
- ✓ Multiple equally valid solutions
- ✓ Personal taste matters

**Examples**:
```
✓ "Design a beautiful landing page for our product"
✓ "Create engaging micro-interactions for the dashboard"
✓ "Improve the visual hierarchy of this layout"
✓ "Make the user experience feel more premium"
✓ "Design an elegant loading animation"
```

**Anti-Examples** (NOT Creative):
```
✗ "Center the div" (precision)
✗ "Implement the approved design" (convergent)
✗ "Research design systems" (explorer)
```

**Expected Outcome**: 6+ shots, highly iterative, subjective satisfaction

---

## ⛳ Shot Types: HOW Refined Your Approach Is

### ● DRIVER (<60% Confidence) - Exploratory
**Terrain**: Rough → Exploring wide possibility space

**Indicators**:
- Open-ended questions
- "What", "How", "Why" queries
- Vague requirements
- Multiple unknowns
- No specific constraints

**Examples**:
```
● "How should I structure this application?"
● "What technologies work best for real-time collaboration?"
● "Explain the architecture of this codebase"
● "What are the options for handling state?"
● "Help me understand how this works"
```

**Quality Tips**:
- ✓ Good for initial exploration
- ✗ Too many Drivers = lost in rough
- → Follow with more focused prompts

---

### ◐ IRON (60-80% Confidence) - Refinement
**Terrain**: Fairway → Adding constraints, narrowing focus

**Indicators**:
- Specific implementation request
- Some context provided
- Narrowing from previous exploration
- Moderate specificity

**Examples**:
```
◐ "Implement a React component for user profiles"
◐ "Add error handling to the authentication flow"
◐ "Create a database schema for the blog posts"
◐ "Build the API endpoint for updating user settings"
◐ "Add TypeScript types to this module"
```

**Quality Tips**:
- ✓ Provides enough detail for action
- ✓ Includes some constraints
- → May need 1-2 follow-ups

---

### ◑ WEDGE (80-95% Confidence) - Precision
**Terrain**: Approach → High precision, fine-tuning details

**Indicators**:
- Specific improvements/adjustments
- Detailed requirements
- Near-complete implementation
- Fine-tuning request

**Examples**:
```
◑ "Adjust the spacing between these elements to 16px"
◑ "Add email format validation to the input field"
◑ "Extract this repeated logic into a helper function"
◑ "Add proper TypeScript types to these parameters"
◑ "Update the error message to be more user-friendly"
```

**Quality Tips**:
- ✓ Very specific and actionable
- ✓ Clear success criteria
- → Usually 1 shot to completion

---

### ○ PUTTER (>95% Confidence) - Polish
**Terrain**: Green → Minimal changes, final touches

**Indicators**:
- Tiny adjustments
- Polish/cleanup
- Final touches
- Cosmetic changes

**Examples**:
```
○ "Add a semicolon at the end of line 15"
○ "Update the comment to reflect the new function name"
○ "Fix this typo: 'teh' should be 'the'"
○ "Remove the extra blank line"
○ "Capitalize the first letter of the button text"
```

**Quality Tips**:
- ✓ Extremely specific
- ✓ Near-perfect state
- ✓ One-shot completion

---

### ↺ RECOVERY - Course Correction
**Terrain**: Any → Backing out, fixing mistakes

**Indicators**:
- Reverting changes
- Fixing errors
- Acknowledging mistakes
- Debugging/troubleshooting

**Examples**:
```
↺ "This broke the tests, revert the last change"
↺ "The approach isn't working, go back to the previous version"
↺ "Fix the syntax error you introduced"
↺ "That's not what I meant, let me clarify..."
↺ "Undo that change and try a different approach"
```

**Quality Tips**:
- ✗ Too many Recoveries = poor strategy
- → Rethink approach before continuing
- → Improve context in next prompt

---

## 📊 Quality Metrics

### Clarity Score (0-100)
**What it measures**: How specific and actionable the prompt is

**High Clarity** (80-100):
```
✓ "Add a red border to the submit button on the login page"
✓ "Fix the null pointer error on line 42 of UserService.ts"
✓ "Extract the validation logic into utils/validators.ts"
```

**Medium Clarity** (50-79):
```
~ "Add better error handling to the auth flow"
~ "Improve the user profile component"
~ "Make the API more robust"
```

**Low Clarity** (0-49):
```
✗ "Fix this"
✗ "Make it better"
✗ "Do the thing we discussed"
```

**Improvement Tips**:
- Add specific references (files, lines, functions)
- Use concrete terms, avoid vague adjectives
- Include clear success criteria

---

### Context Score (0-100)
**What it measures**: How much relevant information is provided

**High Context** (80-100):
```
✓ "In UserAuth.ts, line 42, the validateEmail function 
   currently uses regex /^[a-z]+@[a-z]+\.[a-z]+$/
   but it should also accept numbers and dots in usernames"

✓ "The LoginButton component (components/LoginButton.tsx) 
   needs dark mode support. It should use theme.colors.primary 
   for background and switch based on isDarkMode prop"
```

**Medium Context** (50-79):
```
~ "The email validation in UserAuth.ts needs improvement"
~ "Add dark mode to the login button"
```

**Low Context** (0-49):
```
✗ "Fix the email validation"
✗ "Add dark mode"
```

**Improvement Tips**:
- Reference specific files and functions
- Include code snippets when relevant
- Explain the current state and desired state
- Mention constraints and requirements

---

### Confidence Level (0.0-1.0)
**What it measures**: Likelihood of successful completion in one shot

**Confidence = Specificity × Context × Feasibility**

**High Confidence** (0.8-1.0):
- Clear goal
- Complete context
- Straightforward implementation
- Example: "Change button color to #FF0000"

**Medium Confidence** (0.5-0.79):
- Clear goal
- Some context missing
- May need clarification
- Example: "Add validation to the form"

**Low Confidence** (0.0-0.49):
- Vague goal or approach unclear
- Minimal context
- Likely needs iteration
- Example: "Improve the UI"

---

## 🎯 Effective Prompting Patterns

### Pattern: Progressive Refinement ✅
```
1. ⊛ Driver: "How should I implement user notifications?"
2. ⊗ Iron: "Create a notification service using WebSockets"
3. ◑ Wedge: "Add error handling and reconnection logic"
4. ○ Putter: "Add debug logging for connection events"
```
**Why it works**: Natural progression from exploration → implementation → refinement → polish

---

### Pattern: Precision Strike ✅
```
1. ⊕ Putter: "Fix typo on line 42: 'teh' → 'the'"
```
**Why it works**: Clear, specific, complete context, one-shot completion

---

### Anti-Pattern: Repeated Drivers ❌
```
1. ● Driver: "How do I handle state?"
2. ● Driver: "What about routing?"
3. ● Driver: "How does authentication work?"
4. ● Driver: "What about styling?"
```
**Why it fails**: No forward progress, stuck in exploration, never converging

---

### Anti-Pattern: Premature Precision ❌
```
1. ○ Putter: "Adjust padding to 16px"
   (But the component doesn't exist yet)
```
**Why it fails**: Skipping necessary exploration and implementation steps

---

### Anti-Pattern: Recovery Loops ❌
```
1. ◐ Iron: "Add authentication"
2. ↺ Recovery: "That broke, revert"
3. ◐ Iron: "Try a different approach"
4. ↺ Recovery: "That also broke, revert"
```
**Why it fails**: Lack of planning, poor context, no learning between iterations

---

## 📚 Cheat Sheet

### When to Use Each Archetype

| Situation | Archetype | Example |
|-----------|-----------|---------|
| Single specific change | ⊕ Precision | "Fix typo on line 42" |
| Feature with clear spec | ⊗ Convergent | "Implement JWT auth" |
| Unclear best approach | ⊛ Explorer | "How to handle real-time?" |
| Aesthetic/UX work | ⊜ Creative | "Design landing page" |

### When to Use Each Shot Type

| Confidence | Shot Type | Usage |
|------------|-----------|-------|
| <60% | ● Driver | Initial exploration |
| 60-80% | ◐ Iron | Adding constraints |
| 80-95% | ◑ Wedge | Fine-tuning details |
| >95% | ○ Putter | Final polish |
| Error | ↺ Recovery | Fix mistakes |

### Quality Improvement Checklist

**Clarity**:
- [ ] Specific action verb?
- [ ] Clear success criteria?
- [ ] Avoid vague adjectives?

**Context**:
- [ ] File/function references?
- [ ] Current vs. desired state?
- [ ] Relevant constraints?

**Confidence**:
- [ ] Feasible in one shot?
- [ ] All info provided?
- [ ] Clear and actionable?

---

## 🎓 Learning Path

### Beginner Prompting
**Focus**: Improve clarity and context
```
Before: "Fix the bug"
After:  "Fix the null pointer error on line 42 of auth.ts 
         where userId is undefined during logout"
```

### Intermediate Prompting
**Focus**: Strategic shot selection
```
1. Start broad (Driver): Understand the problem
2. Narrow focus (Iron): Choose approach
3. Refine (Wedge): Implement details
4. Polish (Putter): Final touches
```

### Advanced Prompting
**Focus**: Pattern recognition and efficiency
```
- Recognize when to use each archetype
- Minimize recovery shots through better planning
- Provide optimal context for each shot type
- Track and improve metrics over time
```

---

## 🏆 Success Indicators

### Good Session
- Clear archetype progression (⊛ → ⊗ → ⊕)
- Increasing confidence (● → ◐ → ◑ → ○)
- Few recovery shots (<10%)
- High quality scores (>70 average)

### Warning Signs
- Repeated Driver shots (stuck in exploration)
- Multiple Recovery shots (poor planning)
- Low clarity scores (<50 average)
- No progression in shot types

---

## 💡 Pro Tips

1. **Start with context**: Always provide file/function references
2. **Be specific**: Use concrete terms, not vague adjectives
3. **Progressive refinement**: Don't jump to Putter prematurely
4. **Learn from Recovery**: Analyze why you needed to backtrack
5. **Track patterns**: Use insights panel to identify improvements

---

**Quick Reference Version**: 1.0.0  
**Last Updated**: November 4, 2025

*Print this guide or keep it handy while developing!*

