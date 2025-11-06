# CelebShot - Requirements Analysis

**Document**: Requirements Contemplation  
**Related**: [00-OVERVIEW.md](./00-OVERVIEW.md), [01-ARCHITECTURE.md](./01-ARCHITECTURE.md)

---

## 🎯 CELO Bounty Requirements

### ✅ Requirement 1: Live on Forecaster (Farcaster)

**Requirement**: The app must be deployed and accessible as a Farcaster mini app.

**Implementation Requirements**:
- [ ] Deploy as Farcaster mini app
- [ ] Integrate Farcaster authentication
- [ ] Support Farcaster user profiles
- [ ] Embed within Farcaster client
- [ ] Support Farcaster frame actions (if applicable)

**Acceptance Criteria**:
- App is accessible via Farcaster client
- Users can authenticate with Farcaster account
- App displays user's Farcaster profile information
- App functions within Farcaster mini app environment

**Technical Details**:
- Use Farcaster API for authentication
- Follow Farcaster mini app guidelines
- Support Farcaster frame protocol (if needed)
- Ensure responsive design for Farcaster client

---

### ✅ Requirement 2: Does a Transaction on CELO

**Requirement**: The app must perform at least one transaction on the CELO blockchain.

**Implementation Requirements**:
- [ ] Connect CELO wallet (Valora, MetaMask, etc.)
- [ ] Perform payment transaction for shot requests
- [ ] Implement escrow smart contract
- [ ] Support CELO native token and/or cUSD
- [ ] Display transaction status and history

**Acceptance Criteria**:
- Users can connect CELO wallet
- Payment transactions execute on CELO network
- Escrow contract holds funds until shot delivery
- Transaction receipts are displayed
- Users can view transaction history

**Transaction Types**:
1. **Payment Transaction**: User pays expert for shot request
2. **Escrow Transaction**: Funds held in escrow contract
3. **Release Transaction**: Funds released to expert on completion
4. **Refund Transaction**: Funds refunded if shot not delivered

**Technical Details**:
- Use CELO wallet SDK for connection
- Deploy smart contract on CELO network
- Handle transaction signing and confirmation
- Display gas costs and transaction fees
- Support both CELO and cUSD tokens

---

### ✅ Requirement 3: Real-world Consumer Market Value

**Requirement**: The app must provide real-world value to consumers in a marketplace context.

**Implementation Requirements**:
- [ ] Enable users to frame real development problems
- [ ] Connect users with expert developers/prompters
- [ ] Facilitate paid expert guidance
- [ ] Provide value through problem-solving assistance
- [ ] Create sustainable marketplace economics

**Value Proposition**:
1. **For Problem Framers (Users)**:
   - Get expert guidance on development problems
   - Visual problem representation aids communication
   - Access to specialized expertise on-demand
   - Quality assurance through escrow system

2. **For Experts (Celebrity Shot Providers)**:
   - Monetize expertise and knowledge
   - Build reputation and portfolio
   - Flexible pricing and availability
   - Direct payment via blockchain

3. **For Marketplace**:
   - Facilitate knowledge exchange
   - Create economic incentives for expertise sharing
   - Build community of developers and experts
   - Enable scalable problem-solving network

**Market Validation**:
- Real development problems from users
- Actual expert guidance delivered
- Successful payment transactions
- User satisfaction and repeat usage
- Expert reputation building

---

## 📋 Functional Requirements

### FR1: Problem Framing

**Description**: Users must be able to frame their development problems using the golf ontology.

**Requirements**:
- [ ] Text input for problem description
- [ ] Select hole type (Precision, Convergent, Explorer, Creative)
- [ ] Set par (expected difficulty)
- [ ] Define terrain (problem space characteristics)
- [ ] Build course context (project overview)
- [ ] Generate visual representation (SVG + emoji)

**User Stories**:
- As a user, I want to describe my problem in natural language
- As a user, I want to classify my problem using golf ontology
- As a user, I want to see a visual representation of my problem
- As a user, I want to preview my problem before submitting

---

### FR2: Expert Marketplace

**Description**: Users must be able to browse, search, and select experts.

**Requirements**:
- [ ] Display list of available experts
- [ ] Expert profiles with specializations
- [ ] Search experts by keyword/specialization
- [ ] Filter by reputation, price, availability
- [ ] View expert ratings and past work
- [ ] Auto-match algorithm for expert selection

**User Stories**:
- As a user, I want to browse available experts
- As a user, I want to search for experts by specialization
- As a user, I want to see expert ratings and reviews
- As a user, I want the system to suggest best-fit experts

---

### FR3: Shot Request System

**Description**: Users must be able to request celebrity shots from experts.

**Requirements**:
- [ ] Create shot request from problem
- [ ] Select expert (manual or auto-match)
- [ ] Choose shot type (driver, iron, wedge, putter, recovery)
- [ ] Set payment amount
- [ ] Submit request to expert
- [ ] Track request status

**User Stories**:
- As a user, I want to request a shot from an expert
- As a user, I want to choose the type of shot I need
- As a user, I want to see the status of my shot request
- As a user, I want to receive notifications about my request

---

### FR4: Expert Shot Delivery

**Description**: Experts must be able to deliver guidance shots to users.

**Requirements**:
- [ ] View pending shot requests
- [ ] Accept or decline shot requests
- [ ] Provide expert guidance/advice
- [ ] Optionally update visualization
- [ ] Mark shot as delivered
- [ ] Receive payment on delivery

**User Stories**:
- As an expert, I want to see shot requests assigned to me
- As an expert, I want to provide guidance to users
- As an expert, I want to receive payment for delivered shots
- As an expert, I want to build my reputation through quality work

---

### FR5: Payment System

**Description**: Users must be able to pay experts via CELO blockchain.

**Requirements**:
- [ ] Connect CELO wallet
- [ ] Initiate payment transaction
- [ ] Funds held in escrow
- [ ] Release payment on shot delivery
- [ ] Refund if shot not delivered
- [ ] Transaction history and receipts

**User Stories**:
- As a user, I want to pay experts using CELO
- As a user, I want my payment held in escrow until shot delivery
- As a user, I want a refund if shot is not delivered
- As a user, I want to see my payment history

---

### FR6: Visualization System

**Description**: System must generate visual representations of problems using golf ontology.

**Requirements**:
- [ ] Generate SVG hole visualization
- [ ] Use emoji building blocks for problem elements
- [ ] Display shot trajectories
- [ ] Show course context
- [ ] Update visualization based on expert guidance

**User Stories**:
- As a user, I want to see a visual representation of my problem
- As a user, I want to understand my problem space visually
- As a user, I want to see how expert guidance affects the visualization

---

## 🎨 Non-Functional Requirements

### NFR1: Performance
- Page load time < 2 seconds
- SVG generation < 1 second
- Transaction confirmation < 30 seconds
- Expert search results < 500ms

### NFR2: Usability
- Intuitive problem framing interface
- Clear expert profiles and ratings
- Simple payment flow
- Responsive design for mobile/desktop

### NFR3: Security
- Secure wallet connection
- Smart contract security audit
- API authentication and authorization
- Data privacy protection

### NFR4: Scalability
- Support 1000+ concurrent users
- Handle 100+ shot requests per day
- Scale expert marketplace to 100+ experts
- Efficient database queries

### NFR5: Reliability
- 99% uptime
- Transaction success rate > 95%
- Error handling and recovery
- Data backup and recovery

---

## 🔄 Integration Requirements

### IR1: Farcaster Integration
- Farcaster authentication API
- Farcaster user profile data
- Farcaster mini app embedding
- Farcaster frame actions (if applicable)

### IR2: CELO Integration
- CELO wallet SDK
- CELO network connection
- Smart contract deployment
- Transaction signing and confirmation

### IR3: Golf Ontology Integration
- Reuse existing golf ontology types
- Adapt hole generator for visualization
- Integrate with scorecard visualization components

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

### Technical Metrics
- Transaction success rate
- API response times
- System uptime
- Error rates

---

## 🚧 Out of Scope (v1)

- Multi-shot packages
- Expert team collaboration
- Advanced analytics dashboard
- Mobile native apps
- Integration with other platforms
- AI-powered expert matching (beyond basic scoring)

---

**Next Steps**: Review workflows document and begin user goals mapping.

