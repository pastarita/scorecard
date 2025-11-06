# CelebShot - Development-as-Golf Celebrity Shot Hiring App Marketplace

**Branch**: `contemplations/celebshot`  
**Status**: Contemplation Phase  
**Date**: 2025-01-XX

---

## 📋 Overview

CelebShot is a mini app marketplace deployed on Farcaster that enables developers to frame their development problems using a golf ontology, then request "celebrity shots" from expert software engineers and prompters who can provide specialized guidance to advance their projects.

### Key Features

- **Problem Framing**: Visual problem representation using golf ontology
- **Expert Marketplace**: Browse and select expert developers/prompters
- **Celebrity Shots**: Request specialized guidance from experts
- **CELO Payments**: Secure blockchain payments via CELO Ethereum L2
- **Visualization**: SVG representations with emoji building blocks

---

## 📚 Documentation Structure

### Core Documents

1. **[00-OVERVIEW.md](./00-OVERVIEW.md)** - High-level vision and concept
   - Vision and core concept
   - Architecture overview
   - Key features
   - Requirements summary

2. **[01-ARCHITECTURE.md](./01-ARCHITECTURE.md)** - Technical architecture
   - System architecture
   - Component structure
   - Backend design
   - Data models
   - Smart contracts

3. **[02-REQUIREMENTS.md](./02-REQUIREMENTS.md)** - Detailed requirements
   - CELO bounty requirements
   - Functional requirements
   - Non-functional requirements
   - Success metrics

4. **[03-WORKFLOWS.md](./03-WORKFLOWS.md)** - User and expert workflows
   - User workflows (problem framing, payment, etc.)
   - Expert workflows (registration, shot delivery, etc.)
   - System workflows (matching, escrow, etc.)

5. **[04-USER-GOALS.md](./04-USER-GOALS.md)** - User goals and requirements mapping
   - User personas
   - Goals to requirements matrix
   - Requirements prioritization
   - Success metrics

6. **[05-GOLF-ONTOLOGY.md](./05-GOLF-ONTOLOGY.md)** - Golf ontology integration
   - Hole types (archetypes)
   - Shot types
   - Terrain mapping
   - Visualization integration
   - Problem canonicalization

7. **[06-CELO-INTEGRATION.md](./06-CELO-INTEGRATION.md)** - CELO blockchain integration
   - CELO network overview
   - Wallet integration
   - Payment transaction flow
   - Smart contract design
   - Security considerations

---

## 🎯 CELO Bounty Requirements

### ✅ Requirement 1: Live on Forecaster (Farcaster)
- Deploy as Farcaster mini app
- Integrate Farcaster authentication
- Support Farcaster user profiles

### ✅ Requirement 2: Does a Transaction on CELO
- Connect CELO wallet
- Perform payment transactions
- Implement escrow smart contract
- Support CELO and cUSD tokens

### ✅ Requirement 3: Real-world Consumer Market Value
- Enable users to frame real development problems
- Connect users with expert developers/prompters
- Facilitate paid expert guidance
- Create sustainable marketplace economics

---

## 🏗️ Architecture Highlights

### Platform Stack
- **Deployment**: Farcaster mini app
- **Blockchain**: CELO Ethereum L2
- **Frontend**: Next.js (React)
- **Visualization**: SVG with emoji building blocks
- **Ontology**: Golf-based development ontology

### Core Components
1. **Problem Framing Interface** - Golf hole visualization
2. **Expert Marketplace** - Browse and select experts
3. **Shot Request System** - Request expert guidance
4. **Payment System** - CELO blockchain payments
5. **Visualization Engine** - SVG generation from golf ontology

---

## 🎨 Golf Ontology Integration

### Problem as Golf Hole
- **Hole Type** (Archetype): Precision, Convergent, Explorer, Creative
- **Par**: Expected difficulty/complexity
- **Terrain**: Problem space characteristics
- **Shots**: Solution attempts/iterations
- **Course**: Overall project context

### Shot Types
- **Driver**: Broad exploratory approach
- **Iron**: Medium control, refinement
- **Wedge**: High precision, details
- **Putter**: Minimal variance, polish
- **Recovery**: Course correction

---

## 💰 Business Model

### For Users (Problem Framers)
- Pay per shot request
- Escrow system for quality assurance
- Rating and feedback system

### For Experts (Celebrity Shot Providers)
- Set pricing per shot type
- Reputation-based visibility
- Payment on shot delivery

### Marketplace Mechanics
- Transaction fees (CELO)
- Quality assurance escrow
- Dispute resolution

---

## 🔄 Key Workflows

### User Workflow
1. Frame problem using golf ontology
2. Generate visual representation (SVG + emoji)
3. Browse or search for experts
4. Request celebrity shot
5. Receive expert guidance
6. Rate and pay

### Expert Workflow
1. Create profile with specializations
2. Set pricing and availability
3. Receive shot requests
4. Provide expert guidance
5. Deliver shot with visualization
6. Receive payment

---

## 📊 Success Metrics

### User Metrics
- Number of problems framed
- Number of shot requests created
- User satisfaction ratings
- Repeat usage rate

### Expert Metrics
- Number of experts registered
- Number of shots delivered
- Expert ratings and reputation
- Expert earnings

### Marketplace Metrics
- Total transaction volume (CELO)
- Number of successful shot deliveries
- Average shot request value
- Marketplace growth rate

---

## 🚀 Next Steps

### Phase 1: MVP Development
1. **Problem Framing**: Basic problem input and golf ontology selection
2. **Expert Marketplace**: Simple expert list and profiles
3. **Shot Request**: Basic shot request creation
4. **Payment System**: CELO wallet connection and payment
5. **Basic Visualization**: SVG hole visualization

### Phase 2: Enhanced Experience
1. **Advanced Visualization**: Emoji building blocks
2. **Auto-Match Algorithm**: Expert matching system
3. **Rating System**: User ratings and reviews
4. **Expert Reputation**: Reputation building system

### Phase 3: Scale and Growth
1. **Multi-shot Packages**: Bundle multiple shots
2. **Expert Teams**: Collaborative expert groups
3. **Advanced Analytics**: Detailed insights
4. **Mobile Apps**: Native mobile experience

---

## 📖 Reading Guide

### For Product Managers
1. Start with [00-OVERVIEW.md](./00-OVERVIEW.md)
2. Review [02-REQUIREMENTS.md](./02-REQUIREMENTS.md)
3. Understand [04-USER-GOALS.md](./04-USER-GOALS.md)
4. Review [03-WORKFLOWS.md](./03-WORKFLOWS.md)

### For Developers
1. Start with [00-OVERVIEW.md](./00-OVERVIEW.md)
2. Deep dive into [01-ARCHITECTURE.md](./01-ARCHITECTURE.md)
3. Review [05-GOLF-ONTOLOGY.md](./05-GOLF-ONTOLOGY.md)
4. Study [06-CELO-INTEGRATION.md](./06-CELO-INTEGRATION.md)

### For Designers
1. Start with [00-OVERVIEW.md](./00-OVERVIEW.md)
2. Review [03-WORKFLOWS.md](./03-WORKFLOWS.md)
3. Understand [05-GOLF-ONTOLOGY.md](./05-GOLF-ONTOLOGY.md)
4. Review visualization sections in [01-ARCHITECTURE.md](./01-ARCHITECTURE.md)

---

## 🔗 Related Resources

### Project Resources
- [BRANCH-CONVENTION.md](../../BRANCH-CONVENTION.md) - Branch organization
- [types/scorecard.ts](../../types/scorecard.ts) - Golf ontology types
- [lib/holeGenerator.ts](../../lib/holeGenerator.ts) - Hole generation logic

### External Resources
- [CELO Documentation](https://docs.celo.org/)
- [Farcaster Documentation](https://docs.farcaster.xyz/)
- [Next.js Documentation](https://nextjs.org/docs)

---

## 📝 Document Status

| Document | Status | Last Updated |
|----------|--------|--------------|
| 00-OVERVIEW.md | ✅ Complete | 2025-01-XX |
| 01-ARCHITECTURE.md | ✅ Complete | 2025-01-XX |
| 02-REQUIREMENTS.md | ✅ Complete | 2025-01-XX |
| 03-WORKFLOWS.md | ✅ Complete | 2025-01-XX |
| 04-USER-GOALS.md | ✅ Complete | 2025-01-XX |
| 05-GOLF-ONTOLOGY.md | ✅ Complete | 2025-01-XX |
| 06-CELO-INTEGRATION.md | ✅ Complete | 2025-01-XX |

---

## 🤝 Contributing

This is a contemplation branch. To contribute:

1. Review existing documents
2. Add new contemplations or refine existing ones
3. Update document status
4. Create studies branch for deep dives
5. Create prototypes branch for implementations

---

**Status**: Contemplation Phase Complete  
**Next Phase**: Studies (deep dives into specific implementations)  
**Final Phase**: Prototypes (working implementations)

