# Contributing to Hyperdimensional Vector Space Golf Scorecard

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

---

## 🎯 How to Contribute

### Reporting Bugs

1. **Check existing issues** - Make sure the bug hasn't already been reported
2. **Create a new issue** - Use the bug report template
3. **Provide details**:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs. actual behavior
   - Browser/environment information
   - Screenshots if applicable

### Suggesting Features

1. **Check existing issues** - See if the feature has been discussed
2. **Create a feature request** - Use the feature request template
3. **Explain the use case** - Why would this feature be valuable?
4. **Consider implementation** - Any thoughts on how it might work?

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Add tests** for new functionality
5. **Ensure tests pass** (`npm test`)
6. **Run linting** (`npm run lint`)
7. **Check types** (`npm run type-check`)
8. **Commit your changes** (`git commit -m 'Add amazing feature'`)
9. **Push to your branch** (`git push origin feature/amazing-feature`)
10. **Open a Pull Request**

---

## 📋 Development Setup

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/yourusername/hyperdimensional-golf-scorecard.git
cd hyperdimensional-golf-scorecard

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Tests are located in `__tests__/` directory
- Use Vitest as the test framework
- Follow the existing test patterns
- Aim for high test coverage for new features

---

## 📝 Code Style

### TypeScript

- Use TypeScript for all new code
- Follow existing type patterns
- Use interfaces for object shapes
- Prefer type aliases for unions

### React Components

- Use functional components with hooks
- Prefer TypeScript interfaces for props
- Use descriptive component names
- Keep components focused and small

### File Organization

- Components in `components/`
- Utilities in `lib/`
- Types in `types/`
- Tests in `__tests__/`

### Naming Conventions

- **Components**: PascalCase (`ScorecardTable.tsx`)
- **Functions**: camelCase (`calculateEfficiency`)
- **Types/Interfaces**: PascalCase (`ScorecardData`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_SHOTS`)

---

## 🔍 Code Review Process

1. **Pull Request** - Create a PR with a clear description
2. **Automated Checks** - CI will run tests and linting
3. **Review** - Maintainers will review your code
4. **Feedback** - Address any requested changes
5. **Merge** - Once approved, your PR will be merged

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added/updated for new features
- [ ] All tests pass
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Documentation updated if needed
- [ ] Commit messages are clear

---

## 📚 Documentation

### Code Comments

- Add JSDoc comments for public functions
- Explain complex logic
- Document type parameters
- Include usage examples when helpful

### README Updates

- Update README if adding new features
- Add examples for new functionality
- Update installation steps if needed

---

## 🎨 Design Contributions

### Visual Design

- Follow the existing design system
- Use the golf metaphor consistently
- Maintain color palette (green/olive tones)
- Ensure accessibility (WCAG 2.1 AA)

### SVG Diagrams

- Add new diagrams to `public/diagrams/`
- Update `lib/svg-manifest.json`
- Follow existing diagram structure
- Include descriptions and tags

---

## 🐛 Bug Fixes

### Before Fixing

1. **Understand the issue** - Reproduce the bug
2. **Identify the root cause** - Trace through the code
3. **Plan the fix** - Consider edge cases
4. **Write tests** - Add tests that catch the bug

### During Fix

1. **Make minimal changes** - Fix only what's needed
2. **Maintain compatibility** - Don't break existing features
3. **Add tests** - Ensure the bug doesn't return
4. **Update documentation** - If behavior changes

---

## ✨ Feature Development

### Before Starting

1. **Discuss the feature** - Open an issue first
2. **Get feedback** - Ensure it aligns with project goals
3. **Plan the implementation** - Break into steps
4. **Consider edge cases** - Think about edge cases

### During Development

1. **Start small** - Build incrementally
2. **Write tests** - Test as you go
3. **Keep it simple** - Don't over-engineer
4. **Get feedback** - Early feedback is valuable

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- GitHub contributors page

---

## 💬 Questions?

- **Open an issue** for questions
- **Check existing issues** for discussions
- **Review documentation** for common questions

---

## 🎯 Priority Areas

We especially welcome contributions in:

- **Visualizations**: New experiment components
- **Analytics**: Additional metrics and insights
- **Documentation**: Examples, tutorials, case studies
- **Testing**: Additional test coverage
- **Performance**: Optimization and caching
- **Accessibility**: WCAG improvements
- **Internationalization**: Multi-language support

---

Thank you for contributing! 🎉

