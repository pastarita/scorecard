# CelebShot - User and Expert Workflows

**Document**: Workflow Contemplation  
**Related**: [00-OVERVIEW.md](./00-OVERVIEW.md), [02-REQUIREMENTS.md](./02-REQUIREMENTS.md)

---

## 👤 User Workflows

### Workflow 1: Problem Framing and Shot Request

**Goal**: User frames a development problem and requests a celebrity shot from an expert.

**Steps**:
1. **Start Problem Framing**
   - User navigates to "Frame Problem" page
   - User enters problem description in text input
   - System suggests golf ontology classification

2. **Select Golf Ontology**
   - User selects hole type (Precision, Convergent, Explorer, Creative)
   - User sets par (expected difficulty: 3-6)
   - User defines terrain (rough, fairway, approach, green)
   - User builds course context (project overview)

3. **Generate Visualization**
   - System generates SVG hole visualization
   - System adds emoji building blocks for problem elements
   - User previews visualization
   - User can edit/refine visualization

4. **Browse Experts**
   - User navigates to expert marketplace
   - User can search by specialization
   - User can filter by reputation, price, availability
   - User views expert profiles and ratings

5. **Request Shot**
   - User selects expert (or uses auto-match)
   - User chooses shot type (driver, iron, wedge, putter, recovery)
   - User reviews shot request details
   - User connects CELO wallet (if not connected)
   - User initiates payment transaction
   - Funds held in escrow

6. **Wait for Shot Delivery**
   - User receives notification when expert accepts
   - User can view shot request status
   - User receives notification when shot is delivered

7. **Receive and Review Shot**
   - User views expert guidance
   - User sees updated visualization (if provided)
   - User rates expert and shot quality
   - Payment released to expert

**Decision Points**:
- User can save problem as draft
- User can edit problem before submission
- User can cancel shot request (before acceptance)
- User can request refund if shot not delivered

---

### Workflow 2: Expert Discovery and Selection

**Goal**: User finds the best expert for their problem.

**Steps**:
1. **Search Experts**
   - User enters search query (e.g., "React", "TypeScript", "API design")
   - System returns matching experts
   - User views expert cards with key info

2. **Filter Experts**
   - User filters by reputation (min rating)
   - User filters by price range
   - User filters by availability
   - User filters by specialization tags

3. **View Expert Profile**
   - User clicks on expert card
   - User views detailed profile:
     - Bio and background
     - Specializations
     - Ratings and reviews
     - Past shot examples
     - Pricing for each shot type
   - User reads reviews from other users

4. **Compare Experts**
   - User views multiple expert profiles
   - User compares pricing and ratings
   - User selects best-fit expert

5. **Auto-Match Option**
   - User clicks "Find Best Expert"
   - System analyzes problem and expert profiles
   - System suggests top 3 experts
   - User reviews suggestions and selects

**Decision Points**:
- User can bookmark experts for later
- User can contact expert (if feature available)
- User can view expert's shot history

---

### Workflow 3: Payment and Transaction

**Goal**: User pays for shot request via CELO blockchain.

**Steps**:
1. **Connect Wallet**
   - User clicks "Connect Wallet" button
   - System shows supported wallets (Valora, MetaMask, etc.)
   - User selects wallet
   - User approves connection in wallet app
   - Wallet connected, address displayed

2. **Review Payment**
   - User views shot request details
   - User sees payment amount (in CELO or cUSD)
   - User sees gas fee estimate
   - User reviews total cost

3. **Initiate Payment**
   - User clicks "Pay" button
   - Wallet app opens for transaction signing
   - User reviews transaction details
   - User approves transaction
   - Transaction submitted to CELO network

4. **Transaction Confirmation**
   - System shows transaction pending status
   - User waits for blockchain confirmation
   - Transaction confirmed (typically < 30 seconds)
   - Funds held in escrow contract
   - Shot request status updated to "Paid"

5. **Payment Release**
   - Shot delivered by expert
   - User rates shot
   - Payment automatically released to expert
   - Transaction receipt generated

**Decision Points**:
- User can cancel transaction before signing
- User can view transaction on CELO explorer
- User can request refund if shot not delivered

---

## 🎓 Expert Workflows

### Workflow 4: Expert Registration and Profile Setup

**Goal**: Expert creates profile and sets up marketplace presence.

**Steps**:
1. **Register as Expert**
   - User navigates to "Become an Expert" page
   - User connects Farcaster account
   - User connects CELO wallet (for receiving payments)
   - User creates expert profile

2. **Complete Profile**
   - User enters name and bio
   - User selects specializations (tags)
   - User uploads portfolio examples (optional)
   - User sets availability status

3. **Set Pricing**
   - User sets price for each shot type:
     - Driver: Broad exploratory (lower price)
     - Iron: Medium control (medium price)
     - Wedge: High precision (higher price)
     - Putter: Minimal variance (highest price)
     - Recovery: Course correction (variable)
   - User reviews pricing strategy

4. **Publish Profile**
   - User previews profile
   - User publishes profile
   - Profile appears in expert marketplace
   - Expert can start receiving shot requests

**Decision Points**:
- Expert can save profile as draft
- Expert can edit profile later
- Expert can set availability to "unavailable"

---

### Workflow 5: Expert Shot Delivery

**Goal**: Expert receives shot request and delivers guidance.

**Steps**:
1. **Receive Shot Request**
   - Expert receives notification of new shot request
   - Expert views shot request details:
     - Problem description
     - Visualization (SVG + emoji)
     - Shot type requested
     - Payment amount
     - User profile
   - Expert reviews problem and decides

2. **Accept or Decline**
   - Expert clicks "Accept" or "Decline"
   - If accepted:
     - Shot request status: "Accepted"
     - Expert can now work on shot
   - If declined:
     - Shot request status: "Declined"
     - Payment refunded to user
     - User can request from another expert

3. **Work on Shot**
   - Expert analyzes problem
   - Expert provides guidance/advice:
     - Technical recommendations
     - Code examples (if applicable)
     - Architecture suggestions
     - Best practices
   - Expert can optionally update visualization
   - Expert drafts shot response

4. **Deliver Shot**
   - Expert reviews shot content
   - Expert clicks "Deliver Shot"
   - Shot marked as "Delivered"
   - User receives notification
   - Payment held in escrow until user rating

5. **Receive Payment**
   - User rates shot (1-5 stars)
   - Payment automatically released from escrow
   - Expert receives payment in CELO wallet
   - Transaction receipt generated
   - Expert reputation updated

**Decision Points**:
- Expert can request clarification from user
- Expert can negotiate shot type (if needed)
- Expert can deliver partial shot and iterate

---

### Workflow 6: Expert Reputation Building

**Goal**: Expert builds reputation and attracts more shot requests.

**Steps**:
1. **Deliver Quality Shots**
   - Expert provides valuable guidance
   - Expert responds promptly
   - Expert communicates clearly
   - Users rate expert highly

2. **Build Portfolio**
   - Expert showcases past shots (anonymized)
   - Expert highlights specializations
   - Expert demonstrates expertise through examples

3. **Gather Reviews**
   - Users leave reviews after shot delivery
   - Reviews appear on expert profile
   - Expert responds to reviews (optional)

4. **Improve Rankings**
   - Higher ratings improve expert ranking
   - More completed shots increase visibility
   - Expert appears in "Top Experts" lists
   - Expert receives more shot requests

**Decision Points**:
- Expert can specialize in specific domains
- Expert can adjust pricing based on demand
- Expert can set availability to manage workload

---

## 🔄 System Workflows

### Workflow 7: Expert Matching Algorithm

**Goal**: System automatically matches problems with best-fit experts.

**Steps**:
1. **Analyze Problem**
   - System extracts problem keywords
   - System identifies technical domains
   - System determines required expertise level
   - System analyzes golf ontology classification

2. **Score Experts**
   - System matches problem keywords with expert specializations
   - System considers expert ratings and reputation
   - System factors in expert availability
   - System considers expert pricing
   - System calculates match score for each expert

3. **Rank Experts**
   - System ranks experts by match score
   - System filters by availability
   - System applies user preferences (if any)
   - System returns top 3-5 expert suggestions

4. **Present Suggestions**
   - System displays ranked expert suggestions
   - System shows match reasoning
   - User can select from suggestions or browse all

**Scoring Factors**:
- Specialization match (weight: 40%)
- Reputation/rating (weight: 30%)
- Availability (weight: 10%)
- Price competitiveness (weight: 10%)
- Response time history (weight: 10%)

---

### Workflow 8: Payment Escrow System

**Goal**: System manages payment escrow for shot requests.

**Steps**:
1. **Create Escrow**
   - User initiates payment
   - System creates escrow contract transaction
   - Funds transferred to escrow contract
   - Escrow ID linked to shot request

2. **Hold Funds**
   - Funds held in escrow contract
   - Neither user nor expert can access funds
   - Shot request status: "Paid - In Escrow"

3. **Release Funds**
   - Shot delivered by expert
   - User rates shot
   - System triggers escrow release transaction
   - Funds transferred to expert wallet
   - Escrow closed

4. **Refund Funds**
   - Shot request declined or not delivered
   - User requests refund
   - System triggers escrow refund transaction
   - Funds returned to user wallet
   - Escrow closed

**Security**:
- Smart contract enforces escrow rules
- No single party can access funds
- Automatic release on completion
- Dispute resolution mechanism (future)

---

## 📊 Workflow Metrics

### User Workflow Metrics
- Problem framing completion rate
- Expert selection time
- Payment transaction success rate
- Shot request to delivery time

### Expert Workflow Metrics
- Shot request acceptance rate
- Average shot delivery time
- Expert rating distribution
- Payment release time

### System Workflow Metrics
- Expert matching accuracy
- Escrow transaction success rate
- Average time in escrow
- Refund rate

---

**Next Steps**: Review user goals document and begin golf ontology integration design.

