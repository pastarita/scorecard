# CelebShot - Technical Architecture

**Document**: Architecture Contemplation  
**Related**: [00-OVERVIEW.md](./00-OVERVIEW.md)

---

## 🏛️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Farcaster Client                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           CelebShot Mini App (Next.js)                │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │   │
│  │  │  Problem     │  │   Expert     │  │  Payment   │ │   │
│  │  │  Framing     │  │  Marketplace │  │  System    │ │   │
│  │  └──────────────┘  └──────────────┘  └────────────┘ │   │
│  │  ┌──────────────┐  ┌──────────────┐                │   │
│  │  │  Visualization│  │  Golf        │                │   │
│  │  │  Engine       │  │  Ontology    │                │   │
│  │  └──────────────┘  └──────────────┘                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend Services                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  API Server  │  │  Matching    │  │  Payment     │     │
│  │  (Next.js    │  │  Algorithm   │  │  Processor   │     │
│  │   API Routes)│  │              │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    CELO Blockchain (L2)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Smart       │  │  Payment     │  │  Escrow      │     │
│  │  Contracts   │  │  Contract    │  │  Contract    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 Component Architecture

### Frontend Components

#### 1. Problem Framing Module
```
components/celebshot/
├── problem-framing/
│   ├── ProblemInput.tsx          # Text/structured problem input
│   ├── GolfOntologySelector.tsx   # Select hole type, par, terrain
│   ├── CourseContextBuilder.tsx   # Build project context
│   └── ProblemPreview.tsx         # Preview before submission
```

#### 2. Visualization Engine
```
components/celebshot/
├── visualization/
│   ├── HoleVisualization.tsx      # Main SVG hole renderer
│   ├── EmojiBuilder.tsx           # Emoji building block system
│   ├── ShotTrajectory.tsx         # Visualize solution paths
│   ├── CourseMap.tsx              # Overall project context
│   └── SVGGenerator.tsx           # Generate SVG from ontology
```

#### 3. Expert Marketplace
```
components/celebshot/
├── marketplace/
│   ├── ExpertList.tsx             # Browse experts
│   ├── ExpertCard.tsx             # Expert profile card
│   ├── ExpertProfile.tsx          # Detailed expert view
│   ├── ExpertSearch.tsx           # Search and filter
│   └── ExpertMatching.tsx         # Auto-match algorithm UI
```

#### 4. Shot Request System
```
components/celebshot/
├── shot-request/
│   ├── ShotRequestForm.tsx        # Create shot request
│   ├── ShotRequestPreview.tsx     # Review before submission
│   ├── ShotRequestList.tsx        # User's shot requests
│   └── ShotRequestDetail.tsx      # View shot request details
```

#### 5. Payment System
```
components/celebshot/
├── payment/
│   ├── CeloWalletConnect.tsx      # Connect CELO wallet
│   ├── PaymentForm.tsx            # Payment interface
│   ├── EscrowStatus.tsx           # Escrow status display
│   └── TransactionHistory.tsx     # Payment history
```

---

## 🔌 Backend Architecture

### API Routes (Next.js)

```
app/api/celebshot/
├── problems/
│   ├── route.ts                   # POST: Create problem
│   ├── [id]/route.ts              # GET: Get problem
│   └── [id]/visualization/route.ts # GET: Generate SVG
├── experts/
│   ├── route.ts                   # GET: List experts
│   ├── [id]/route.ts              # GET: Expert profile
│   └── search/route.ts            # POST: Search experts
├── shots/
│   ├── route.ts                   # POST: Create shot request
│   ├── [id]/route.ts              # GET/PUT: Shot details
│   └── [id]/deliver/route.ts      # POST: Deliver shot
└── payments/
    ├── create/route.ts            # POST: Create payment
    ├── [id]/route.ts              # GET: Payment status
    └── escrow/release/route.ts    # POST: Release escrow
```

### Services Layer

```
lib/celebshot/
├── ontology/
│   ├── golfOntology.ts            # Golf ontology definitions
│   ├── problemCanonicalizer.ts    # Convert problem to golf terms
│   └── visualizationBuilder.ts    # Build visualization data
├── matching/
│   ├── expertMatcher.ts           # Match problems to experts
│   └── scoringAlgorithm.ts        # Score expert fit
├── visualization/
│   ├── svgGenerator.ts            # Generate SVG from data
│   ├── emojiBuilder.ts            # Emoji building block system
│   └── courseMapper.ts            # Map project to course
└── celo/
    ├── wallet.ts                   # CELO wallet utilities
    ├── transactions.ts             # Transaction helpers
    └── contracts.ts                # Smart contract interfaces
```

---

## 🗄️ Data Models

### Problem Model
```typescript
interface Problem {
  id: string;
  userId: string; // Farcaster user ID
  title: string;
  description: string;
  golfOntology: {
    holeType: ScorecardArchetype; // Precision, Convergent, Explorer, Creative
    par: number;
    terrain: Terrain;
    course: CourseContext;
  };
  visualization: {
    svg: string;
    emojiBlocks: EmojiBlock[];
  };
  status: 'draft' | 'submitted' | 'matched' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}
```

### Expert Model
```typescript
interface Expert {
  id: string;
  userId: string; // Farcaster user ID
  profile: {
    name: string;
    bio: string;
    specializations: string[];
    reputation: number;
    rating: number;
    totalShots: number;
  };
  pricing: {
    driver: number; // CELO amount
    iron: number;
    wedge: number;
    putter: number;
    recovery: number;
  };
  availability: boolean;
  createdAt: string;
}
```

### Shot Request Model
```typescript
interface ShotRequest {
  id: string;
  problemId: string;
  expertId: string;
  shotType: ShotType;
  status: 'pending' | 'accepted' | 'in_progress' | 'delivered' | 'completed';
  payment: {
    amount: number; // CELO
    escrowAddress: string;
    status: 'pending' | 'escrowed' | 'released' | 'refunded';
  };
  shot: {
    guidance: string;
    visualization?: string;
    deliveredAt?: string;
  };
  rating?: number;
  createdAt: string;
  updatedAt: string;
}
```

---

## 🔐 Smart Contracts (CELO)

### Payment Escrow Contract
```solidity
contract CelebShotEscrow {
    struct ShotRequest {
        address requester;
        address expert;
        uint256 amount;
        uint256 shotType;
        bool delivered;
        bool released;
    }
    
    mapping(bytes32 => ShotRequest) public requests;
    
    function createEscrow(bytes32 requestId, address expert) external payable;
    function releaseEscrow(bytes32 requestId) external;
    function refundEscrow(bytes32 requestId) external;
}
```

---

## 🎨 Visualization Architecture

### SVG Generation Pipeline

```
Problem Input
    │
    ▼
Golf Ontology Canonicalization
    │
    ▼
Visualization Data Structure
    │
    ├──► Hole Layout (from existing holeGenerator)
    ├──► Emoji Blocks (problem elements)
    ├──► Shot Trajectories (solution paths)
    └──► Course Context (project mapping)
    │
    ▼
SVG Generator
    │
    ▼
SVG Output (with emoji building blocks)
```

### Emoji Building Block System

- **Problem Elements**: 🐛 (bug), 🔧 (tool), 📊 (data), 🎨 (design)
- **Solution Types**: ⚡ (quick fix), 🔄 (refactor), 🚀 (optimize)
- **Domain Indicators**: 💻 (code), 🗄️ (database), 🌐 (web), 📱 (mobile)
- **Status Indicators**: ✅ (complete), ⏳ (in progress), ❌ (blocked)

---

## 🔄 Integration Points

### Farcaster Integration
- **Farcaster Auth**: User authentication via Farcaster
- **Mini App API**: Embed in Farcaster client
- **Frame Actions**: Interactive frame actions for shot requests

### CELO Integration
- **Wallet Connection**: Connect CELO wallet (Valora, MetaMask)
- **Transaction Signing**: Sign transactions for payments
- **Smart Contract Calls**: Interact with escrow contract
- **Token Support**: CELO native and cUSD

### Golf Ontology Integration
- **Reuse Existing Types**: `ScorecardArchetype`, `ShotType`, `Terrain`
- **Hole Generator**: Adapt existing `holeGenerator` for problem visualization
- **Visualization Components**: Reuse SVG rendering from scorecard

---

## 📦 Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI**: React, TypeScript
- **Styling**: TailwindCSS (scorecard theme)
- **SVG**: React SVG components
- **State**: React Context / Zustand

### Backend
- **API**: Next.js API Routes
- **Database**: (TBD - Supabase, PostgreSQL, or similar)
- **File Storage**: (TBD - for SVG assets)

### Blockchain
- **Network**: CELO (Ethereum L2)
- **Wallet SDK**: CELO wallet SDK
- **Smart Contracts**: Solidity
- **Contract Deployment**: CELO testnet/mainnet

### External Services
- **Farcaster**: Farcaster API for mini app
- **IPFS**: (Optional) Store SVG visualizations

---

## 🚀 Deployment Architecture

### Development
- Local Next.js dev server
- CELO testnet
- Farcaster dev environment

### Production
- Vercel deployment (Next.js)
- CELO mainnet
- Farcaster production
- Database hosting
- IPFS pinning (if used)

---

## 🔒 Security Considerations

1. **Wallet Security**: Secure wallet connection, no private key storage
2. **Smart Contract Security**: Audited escrow contract
3. **API Security**: Rate limiting, authentication
4. **Data Privacy**: User data protection
5. **Payment Security**: Escrow system for dispute resolution

---

## 📈 Scalability Considerations

1. **Database**: Indexed queries for expert search
2. **Caching**: Cache SVG visualizations
3. **CDN**: Serve static assets via CDN
4. **Blockchain**: Optimize gas costs for CELO transactions
5. **API**: Rate limiting and pagination

---

**Next Steps**: Review requirements document and begin workflow design.

