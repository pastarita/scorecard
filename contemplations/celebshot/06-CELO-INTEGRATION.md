# CelebShot - CELO Blockchain Integration

**Document**: CELO Integration Contemplation  
**Related**: [00-OVERVIEW.md](./00-OVERVIEW.md), [01-ARCHITECTURE.md](./01-ARCHITECTURE.md), [02-REQUIREMENTS.md](./02-REQUIREMENTS.md)

---

## 🌐 CELO Network Overview

### What is CELO?

CELO is a mobile-first, carbon-negative blockchain platform that makes financial tools accessible to anyone with a mobile phone. It's an Ethereum-compatible Layer 2 solution optimized for mobile payments and DeFi applications.

### Why CELO for CelebShot?

1. **Mobile-First**: Aligns with Farcaster mobile usage
2. **Low Fees**: Affordable transaction costs
3. **Fast Transactions**: Quick confirmation times
4. **Stable Currency**: cUSD for price stability
5. **Ethereum-Compatible**: Familiar development tools

---

## 💰 Token Support

### CELO Native Token
- **Symbol**: CELO
- **Use Case**: Network fees, governance
- **Volatility**: Higher (cryptocurrency)

### Celo Dollar (cUSD)
- **Symbol**: cUSD
- **Use Case**: Stable payments
- **Volatility**: Low (stablecoin pegged to USD)
- **Recommended**: For shot request payments

### Celo Euro (cEUR)
- **Symbol**: cEUR
- **Use Case**: Euro-denominated payments
- **Volatility**: Low (stablecoin)

**Recommendation**: Support both CELO and cUSD, default to cUSD for stability.

---

## 🔌 Wallet Integration

### Supported Wallets

#### Valora (Mobile)
- **Type**: Mobile wallet
- **Platform**: iOS, Android
- **Features**: Built for CELO, user-friendly
- **Integration**: Deep link to Valora app

#### MetaMask (Desktop/Mobile)
- **Type**: Multi-chain wallet
- **Platform**: Browser extension, mobile app
- **Features**: Widely used, CELO support
- **Integration**: Standard Web3 connection

#### Celo Wallet (Web)
- **Type**: Web wallet
- **Platform**: Browser
- **Features**: Web-based, no extension needed
- **Integration**: Web3 connection

### Wallet Connection Flow

```
1. User clicks "Connect Wallet"
2. System detects available wallets
3. User selects wallet (Valora, MetaMask, etc.)
4. Wallet app opens (or browser extension activates)
5. User approves connection
6. Wallet address connected
7. System displays connected address
```

### Implementation

```typescript
// Wallet connection utilities
lib/celebshot/celo/wallet.ts

interface WalletConnection {
  address: string;
  provider: any;
  network: 'celo' | 'alfajores' | 'baklava';
  isConnected: boolean;
}

async function connectWallet(): Promise<WalletConnection> {
  // Detect wallet
  // Request connection
  // Return connection details
}
```

---

## 💸 Payment Transaction Flow

### Transaction Types

#### 1. Payment to Escrow
**Purpose**: User pays for shot request, funds held in escrow

**Flow**:
1. User initiates shot request
2. System calculates payment amount
3. User approves transaction in wallet
4. Transaction sent to CELO network
5. Funds transferred to escrow contract
6. Transaction confirmed
7. Shot request status: "Paid"

**Transaction Details**:
- **To**: Escrow contract address
- **Amount**: Shot request price (cUSD or CELO)
- **Gas**: Network fee (paid in CELO)
- **Data**: Shot request ID, expert address

#### 2. Escrow Release
**Purpose**: Release funds to expert after shot delivery

**Flow**:
1. Expert delivers shot
2. User rates shot
3. System triggers escrow release
4. Transaction sent to escrow contract
5. Funds transferred to expert wallet
6. Transaction confirmed
7. Payment complete

**Transaction Details**:
- **To**: Escrow contract address
- **Amount**: 0 (contract handles transfer)
- **Gas**: Network fee
- **Data**: Shot request ID, release command

#### 3. Escrow Refund
**Purpose**: Refund funds to user if shot not delivered

**Flow**:
1. Shot request declined or not delivered
2. User requests refund (or automatic)
3. System triggers escrow refund
4. Transaction sent to escrow contract
5. Funds returned to user wallet
6. Transaction confirmed
7. Refund complete

**Transaction Details**:
- **To**: Escrow contract address
- **Amount**: 0 (contract handles transfer)
- **Gas**: Network fee
- **Data**: Shot request ID, refund command

---

## 📜 Smart Contract Design

### Escrow Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CelebShotEscrow {
    struct ShotRequest {
        address requester;
        address expert;
        uint256 amount;
        uint256 shotType; // 0=driver, 1=iron, 2=wedge, 3=putter, 4=recovery
        bool delivered;
        bool released;
        uint256 createdAt;
    }
    
    mapping(bytes32 => ShotRequest) public requests;
    address public owner;
    
    event EscrowCreated(bytes32 indexed requestId, address requester, address expert, uint256 amount);
    event ShotDelivered(bytes32 indexed requestId);
    event EscrowReleased(bytes32 indexed requestId, address expert, uint256 amount);
    event EscrowRefunded(bytes32 indexed requestId, address requester, uint256 amount);
    
    constructor() {
        owner = msg.sender;
    }
    
    function createEscrow(
        bytes32 requestId,
        address expert
    ) external payable {
        require(requests[requestId].requester == address(0), "Request already exists");
        require(msg.value > 0, "Amount must be greater than 0");
        
        requests[requestId] = ShotRequest({
            requester: msg.sender,
            expert: expert,
            amount: msg.value,
            shotType: 0, // Default, can be set separately
            delivered: false,
            released: false,
            createdAt: block.timestamp
        });
        
        emit EscrowCreated(requestId, msg.sender, expert, msg.value);
    }
    
    function markDelivered(bytes32 requestId) external {
        ShotRequest storage request = requests[requestId];
        require(request.expert == msg.sender, "Only expert can mark delivered");
        require(!request.delivered, "Already delivered");
        
        request.delivered = true;
        emit ShotDelivered(requestId);
    }
    
    function releaseEscrow(bytes32 requestId) external {
        ShotRequest storage request = requests[requestId];
        require(request.delivered, "Shot not delivered");
        require(!request.released, "Already released");
        require(msg.sender == request.requester || msg.sender == owner, "Unauthorized");
        
        request.released = true;
        payable(request.expert).transfer(request.amount);
        
        emit EscrowReleased(requestId, request.expert, request.amount);
    }
    
    function refundEscrow(bytes32 requestId) external {
        ShotRequest storage request = requests[requestId];
        require(!request.released, "Already released");
        require(msg.sender == request.requester || msg.sender == owner, "Unauthorized");
        
        request.released = true;
        payable(request.requester).transfer(request.amount);
        
        emit EscrowRefunded(requestId, request.requester, request.amount);
    }
    
    function getRequest(bytes32 requestId) external view returns (ShotRequest memory) {
        return requests[requestId];
    }
}
```

### Contract Features

1. **Escrow Creation**: Lock funds for shot request
2. **Delivery Marking**: Expert marks shot as delivered
3. **Release**: Transfer funds to expert
4. **Refund**: Return funds to user
5. **Security**: Only authorized parties can trigger actions

---

## 🔐 Security Considerations

### Wallet Security
- **Never store private keys**: All signing done in wallet
- **Secure connection**: Use HTTPS for all wallet interactions
- **User education**: Warn users about transaction details

### Smart Contract Security
- **Audit**: Professional security audit before mainnet
- **Access control**: Proper authorization checks
- **Reentrancy protection**: Guard against reentrancy attacks
- **Input validation**: Validate all inputs

### Transaction Security
- **Gas estimation**: Accurate gas estimates
- **Transaction confirmation**: Wait for confirmations
- **Error handling**: Handle failed transactions gracefully
- **User feedback**: Clear transaction status

---

## 🧪 Testing Strategy

### Test Networks

#### Alfajores (Testnet)
- **Purpose**: Development and testing
- **Tokens**: Free test tokens from faucet
- **Network ID**: 44787
- **RPC URL**: https://alfajores-forno.celo-testnet.org

#### Baklava (Testnet)
- **Purpose**: Additional testing
- **Tokens**: Free test tokens
- **Network ID**: 62320

### Testing Flow

1. **Local Development**
   - Deploy contract to local network
   - Test wallet connection
   - Test transactions

2. **Testnet Deployment**
   - Deploy to Alfajores
   - Test with test tokens
   - Verify all flows

3. **Mainnet Deployment**
   - Deploy to CELO mainnet
   - Start with small amounts
   - Monitor closely

---

## 📊 Transaction Costs

### Gas Fees

**CELO Network**:
- **Average Gas Price**: ~1 gwei
- **Average Transaction Cost**: ~0.001 CELO (~$0.001)
- **Escrow Contract Call**: ~0.002 CELO (~$0.002)

**Cost Breakdown**:
- Payment transaction: ~$0.001
- Escrow creation: ~$0.002
- Escrow release: ~$0.002
- **Total per shot request**: ~$0.005

### User Experience

- **Transparent fees**: Show gas costs to users
- **Fee estimation**: Estimate before transaction
- **Fee payment**: Users pay gas in CELO
- **Payment currency**: Shot payments in cUSD (stable)

---

## 🔄 Integration with Frontend

### Wallet Connection Component

```typescript
// components/celebshot/payment/CeloWalletConnect.tsx

interface CeloWalletConnectProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
}

export function CeloWalletConnect({ onConnect, onDisconnect }: CeloWalletConnectProps) {
  // Wallet connection logic
  // Display connected address
  // Handle disconnect
}
```

### Payment Form Component

```typescript
// components/celebshot/payment/PaymentForm.tsx

interface PaymentFormProps {
  amount: number;
  currency: 'CELO' | 'cUSD';
  onPayment: (txHash: string) => void;
}

export function PaymentForm({ amount, currency, onPayment }: PaymentFormProps) {
  // Display payment details
  // Handle transaction signing
  // Show transaction status
}
```

### Transaction Status Component

```typescript
// components/celebshot/payment/TransactionStatus.tsx

interface TransactionStatusProps {
  txHash: string;
  status: 'pending' | 'confirmed' | 'failed';
}

export function TransactionStatus({ txHash, status }: TransactionStatusProps) {
  // Display transaction status
  // Link to CELO explorer
  // Show confirmation count
}
```

---

## 📈 Monitoring and Analytics

### Transaction Tracking

- **Transaction IDs**: Store all transaction hashes
- **Status Monitoring**: Track transaction status
- **Confirmation Tracking**: Monitor confirmations
- **Error Logging**: Log failed transactions

### Analytics

- **Transaction Volume**: Total CELO/cUSD transacted
- **Transaction Count**: Number of transactions
- **Success Rate**: Percentage of successful transactions
- **Average Gas Cost**: Track gas costs over time

### CELO Explorer Integration

- **Link to Explorer**: Show transaction links
- **Transaction Details**: Display full transaction info
- **Contract Interactions**: Show contract calls

---

## 🚀 Deployment Plan

### Phase 1: Testnet Deployment
1. Deploy contract to Alfajores
2. Test wallet connections
3. Test payment flows
4. Test escrow operations
5. Gather testnet feedback

### Phase 2: Mainnet Preparation
1. Security audit
2. Mainnet contract deployment
3. Initial testing with small amounts
4. Monitor transactions

### Phase 3: Production Launch
1. Enable mainnet payments
2. Monitor closely
3. Gather user feedback
4. Iterate on improvements

---

## 📚 Resources

### CELO Documentation
- [CELO Docs](https://docs.celo.org/)
- [CELO Wallet SDK](https://docs.celo.org/developer-guide/contractkit)
- [CELO Smart Contracts](https://docs.celo.org/developer-guide/smart-contracts)

### Development Tools
- [Celo CLI](https://docs.celo.org/developer-guide/celo-cli)
- [Remix IDE](https://remix.ethereum.org/) (for contract development)
- [Hardhat](https://hardhat.org/) (for contract testing)

### Testnet Resources
- [Alfajores Faucet](https://faucet.celo.org/)
- [CELO Explorer](https://explorer.celo.org/)

---

**Next Steps**: Begin smart contract development and wallet integration implementation.

