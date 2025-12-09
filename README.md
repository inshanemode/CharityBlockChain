# 🌟 Blockchain Charity - Liquid Glass Edition

A modern, transparent charity platform built with blockchain technology and stunning **Liquid Glass UI** inspired by Apple's design language.

![Blockchain Charity](https://img.shields.io/badge/Blockchain-Ethereum-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)

## ✨ Features

### 🎨 Liquid Glass Design System
- **Glassmorphism effects** with backdrop-filter blur
- **Dynamic glow effects** (cyan, purple, green, orange)
- **Smooth animations** powered by Framer Motion
- **Responsive design** (mobile-first approach)
- **Dark mode ready** color system

### 🔗 Blockchain Integration (Mock)
- Mock Web3 wallet connection
- Mock smart contract interactions
- Transaction history & tracking
- Gas fee estimation
- Real-time blockchain explorer

### 💎 Core Features
- **Campaign Management**: Browse and search charity campaigns
- **Donation Flow**: Complete donation process with wallet integration
- **Transaction History**: View all your past donations
- **Blockchain Explorer**: Live transactions, blocks, and stats
- **Personal Wallet**: Manage balance, badges, and activity
- **NFT Badges**: Achievement system for donors

## 🚀 Tech Stack

- **Frontend**: React 19.2.1 + TypeScript
- **Routing**: React Router DOM 7.10.1
- **Animations**: Framer Motion 12.23.25
- **Icons**: React Icons 5.5.0
- **Styling**: Custom CSS with Liquid Glass design system
- **State**: React Hooks + Local Storage
- **Mock Data**: Comprehensive mock blockchain data

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd charity-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📂 Project Structure

```
charity-system/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── base/              # Base glass components
│   │   │   ├── GlassButton.jsx
│   │   │   ├── GlassCard.jsx
│   │   │   ├── GlassInput.jsx
│   │   │   ├── GlassContainer.jsx
│   │   │   └── GlassModal.jsx
│   │   ├── AddressDisplay.jsx
│   │   ├── CampaignCard.jsx
│   │   ├── Footer.jsx
│   │   ├── GasFeeDisplay.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── StatsCard.jsx
│   │   ├── TransactionStatus.jsx
│   │   └── TransactionTable.jsx
│   ├── data/
│   │   └── mockData.js         # Mock blockchain data
│   ├── hooks/
│   │   ├── useContract.js      # Mock contract hook
│   │   └── useWallet.js        # Mock wallet hook
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Campaigns.jsx
│   │   ├── Demo.jsx
│   │   ├── Donate.jsx
│   │   ├── Explorer.jsx
│   │   ├── History.jsx
│   │   ├── Home.jsx
│   │   ├── MyWallet.jsx
│   │   └── Success.jsx
│   ├── styles/
│   │   ├── globals.css         # Global styles
│   │   └── liquidGlass.js      # Design system
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── README.md
```

## 🎨 Design System

### Colors
```javascript
COLORS = {
  // Glass effects
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    heavy: 'rgba(255, 255, 255, 0.15)',
  },
  // Glow colors
  glow: {
    cyan: '#00D9FF',    // Blockchain
    purple: '#A855F7',  // Web3
    green: '#34D399',   // Success
    orange: '#FB923C',  // Warning
    blue: '#3B82F6',    // Info
  },
  // Text colors
  text: {
    light: 'rgba(255, 255, 255, 0.95)',
    secondary: 'rgba(255, 255, 255, 0.7)',
    muted: 'rgba(255, 255, 255, 0.5)',
  },
}
```

### Components
- **GlassCard**: 3 variants (light, medium, heavy)
- **GlassButton**: Multiple variants with glow effects
- **GlassInput**: Floating label with focus glow
- **GlassModal**: Full-screen modal with heavy blur

## 🌟 Key Pages

### 🏠 Home
- Hero section with floating shapes
- Stats overview (total donations, campaigns, donors)
- Featured campaigns grid

### 🎯 Campaigns
- All campaigns listing
- Search and filter functionality
- Progress bars and status badges
- Quick donation actions

### 💰 Donate
- Wallet connection flow
- Campaign selection
- Amount input (quick pills + custom)
- Gas fee selector (slow/normal/fast)
- Transaction confirmation

### 📊 Explorer
- Real-time stats dashboard
- Live transaction feed
- Recent blocks display
- Campaign distribution charts

### 📜 History
- Complete transaction history
- Advanced filters (type, status, date)
- Sortable table
- Export to CSV

### 👛 My Wallet
- Balance overview
- NFT achievement badges
- Personal stats
- Recent activity timeline

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 📱 Responsive Breakpoints

```css
mobile: 0-640px
tablet: 641px-1024px
desktop: 1025px+
```

## 🎯 Mock Data

The app includes comprehensive mock data:
- **8 campaigns** with full details
- **20+ transactions** with timestamps
- **10 blocks** with miner info
- **8 NFT badges** (4 unlocked, 4 locked)
- **Chart data** for 7-day volume

## 🚧 Future Enhancements

- [ ] Real Web3 integration (Metamask, WalletConnect)
- [ ] Real smart contracts deployment
- [ ] IPFS integration for campaign media
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Social sharing features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using Liquid Glass design system

---

**Note**: This is a demo application with mock blockchain functionality. For production use, integrate with real Web3 providers and smart contracts.

## 🎉 Screenshots

### Home Page
Beautiful hero section with floating shapes and featured campaigns.

### Donate Flow
Complete donation process with wallet integration and transaction tracking.

### Explorer
Real-time blockchain data with live transactions and blocks.

### My Wallet
Personal dashboard with balance, badges, and transaction history.

---

Made with React + Framer Motion + Liquid Glass 🌊✨
