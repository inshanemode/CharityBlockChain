# Blockchain Integration Setup Guide

## 🚀 Quick Start

### 1. Deploy Smart Contract

#### Option A: Using Hardhat (Localhost)
```bash
cd charity-blockchain-app
npm install
npx hardhat node
# In new terminal:
npx hardhat run scripts/deploy.js --network localhost
```

#### Option B: Using Truffle
```bash
cd charity-blockchain-app
npm install
truffle develop
# In truffle console:
migrate
```

### 2. Update Contract Address

After deploying, copy the contract address and update it in:

**File: `src/pages/Campaigns.jsx`**
```javascript
const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE';
```

### 3. Connect MetaMask

1. Install MetaMask browser extension
2. Add Localhost network (if using local blockchain):
   - Network Name: Localhost 8545
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337 (Hardhat) or 1337 (Ganache)
   - Currency Symbol: ETH

3. Import test account using private key from Hardhat/Ganache

### 4. Create Test Campaigns

Using Hardhat console:
```bash
npx hardhat console --network localhost
```

```javascript
const Charity = await ethers.getContractFactory("Charity");
const charity = await Charity.attach("YOUR_CONTRACT_ADDRESS");

// Create campaign 1
await charity.createCampaign("Education for All", ethers.utils.parseEther("10"));

// Create campaign 2
await charity.createCampaign("Clean Water Project", ethers.utils.parseEther("5"));

// Create campaign 3
await charity.createCampaign("Medical Supplies", ethers.utils.parseEther("15"));
```

### 5. Run React App

```bash
npm start
```

## 📝 Features Implemented

### ✅ Campaigns.jsx
- **Blockchain Data**: Fetches real campaigns from smart contract
- **ethers.js Integration**: Uses ethers v5.7.2 for Web3 interaction
- **Real-time Updates**: Listens for `CampaignCreated` events
- **Loading States**: Shows spinner while fetching data
- **Error Handling**: Displays errors if MetaMask not installed or contract not found
- **Wei to ETH Conversion**: Automatically converts blockchain amounts
- **Random Images**: Assigns placeholder images using Picsum
- **Search & Filter**: Works with blockchain data

### ✅ useWallet Hook
- **MetaMask Connection**: Real wallet connect/disconnect
- **Balance Fetching**: Real ETH balance from blockchain
- **Transaction Sending**: Send real transactions via MetaMask
- **Event Listeners**: Auto-update on account/chain changes
- **Network Support**: Mainnet, Sepolia, Polygon, BSC, etc.

### ✅ Navbar Component
- **Connect Wallet**: Triggers MetaMask popup
- **Display Address**: Shows truncated wallet address
- **Display Balance**: Shows real ETH balance
- **Network Indicator**: Shows current network name
- **Disconnect**: Local state reset

## 🔧 Smart Contract Functions

### Read Functions
- `campaignCount()` - Get total number of campaigns
- `getCampaign(uint256 id)` - Get campaign details
- `campaigns(uint256 id)` - Direct mapping access

### Write Functions
- `createCampaign(string name, uint256 goal)` - Create new campaign
- `donate(uint256 campaignId)` - Donate to campaign (payable)
- `withdrawFunds(uint256 campaignId)` - Creator withdraws funds
- `closeCampaign(uint256 campaignId)` - Close campaign

## 🎯 Next Steps

1. **Deploy to Testnet** (Sepolia recommended)
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

2. **Add Create Campaign UI**
   - Form to call `createCampaign()` function
   - Input validation for name and goal
   - Transaction confirmation modal

3. **Add Donate Feature**
   - Donate button on campaign cards
   - Call `donate()` function with ETH amount
   - Show transaction status

4. **Add Withdraw Feature**
   - Only show for campaign creator
   - Call `withdrawFunds()` function
   - Display withdrawal confirmation

## 🐛 Troubleshooting

### "Cannot find module 'ethers'"
```bash
npm install ethers@5.7.2
```

### "MetaMask not installed"
Install MetaMask extension from https://metamask.io

### "Contract not deployed"
Make sure CONTRACT_ADDRESS in Campaigns.jsx matches your deployed contract

### "Network mismatch"
Switch MetaMask to the same network where contract is deployed

## 📚 Resources

- [Ethers.js Docs](https://docs.ethers.org/v5/)
- [Hardhat Docs](https://hardhat.org/getting-started/)
- [MetaMask Docs](https://docs.metamask.io/)
- [Solidity Docs](https://docs.soliditylang.org/)
