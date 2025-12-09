# BlockCharity - Liquid Glass Foundation

Hệ thống từ thiện blockchain với **Liquid Glass Design System** theo phong cách Apple.

## 🎨 Design System

### Liquid Glass Effect
- **Backdrop blur**: 10px (light), 20px (medium), 40px (heavy)
- **RGBA backgrounds**: Transparent với opacity thay đổi
- **Soft borders**: 1px solid rgba(255,255,255,0.18)
- **Layered shadows**: Multiple layers cho depth
- **Smooth animations**: 300-500ms cubic-bezier easing

### Color Palette
```javascript
Glass Base:
- Light: rgba(255, 255, 255, 0.1)
- Medium: rgba(255, 255, 255, 0.2)
- Heavy: rgba(255, 255, 255, 0.3)

Glow Colors (Blockchain Theme):
- Blue: rgba(99, 179, 237, 0.5)    // Ethereum
- Purple: rgba(168, 85, 247, 0.5)  // Web3
- Green: rgba(52, 211, 153, 0.5)   // Success
- Cyan: rgba(34, 211, 238, 0.5)    // Blockchain
- Orange: rgba(251, 146, 60, 0.5)  // Warning
- Red: rgba(239, 68, 68, 0.5)      // Error
```

## 📦 Components

### Base Glass Components

#### 1. GlassCard
```jsx
<GlassCard 
  variant="medium"  // light | medium | heavy
  hover={true}      // hover effect
  glow="cyan"       // glow color
>
  Content here
</GlassCard>
```

#### 2. GlassButton
```jsx
<GlassButton 
  variant="primary"      // primary | secondary | outline | ghost
  size="md"             // sm | md | lg
  glow="cyan"           // glow color
  loading={false}       // loading state
  icon={<IoWallet />}   // icon component
  iconPosition="left"   // left | right
>
  Connect Wallet
</GlassButton>
```

#### 3. GlassInput
```jsx
<GlassInput 
  label="Wallet Address"
  placeholder="0x..."
  value={value}
  onChange={handleChange}
  icon={<IoWallet />}
  iconPosition="left"
  error={false}
  errorMessage=""
/>
```

#### 4. GlassContainer
```jsx
<GlassContainer 
  maxWidth="desktop"  // mobile | tablet | desktop | wide | full
  padding="md"        // none | sm | md | lg | xl
  blur="medium"       // none | light | medium | heavy
  glass={false}       // enable glass effect
>
  Content
</GlassContainer>
```

#### 5. GlassModal
```jsx
<GlassModal 
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Title"
  size="md"              // sm | md | lg | xl
  closeOnBackdrop={true}
  closeButton={true}
>
  Modal content
</GlassModal>
```

### Layout Components

#### Navbar
- Sticky navigation với dynamic blur khi scroll
- Logo với glow effect
- Active state cho navigation items
- Wallet connect button
- Network indicator badge (Ethereum)
- Mobile responsive với slide-in menu

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm hoặc yarn

### Installation

```bash
# Clone repository
cd charity-system

# Install dependencies
npm install

# Start development server
npm start
```

App sẽ mở tại `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── base/
│   │   ├── GlassCard.jsx         # Glass card component
│   │   ├── GlassButton.jsx       # Glass button với ripple
│   │   ├── GlassInput.jsx        # Glass input field
│   │   ├── GlassContainer.jsx    # Glass container wrapper
│   │   └── GlassModal.jsx        # Glass modal với backdrop
│   └── Navbar.jsx                # Navigation bar
├── pages/
│   ├── Home.jsx                  # Trang chủ
│   ├── Campaigns.jsx             # Danh sách chiến dịch
│   ├── Explorer.jsx              # Blockchain explorer
│   ├── MyWallet.jsx              # Quản lý ví
│   ├── About.jsx                 # About page
│   └── Demo.jsx                  # Components showcase
├── styles/
│   ├── liquidGlass.js            # Design system constants
│   └── globals.css               # Global styles & animations
├── App.tsx                       # Main app với routing
└── index.tsx                     # Entry point
```

## 🎭 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Trang chủ với stats và featured campaigns |
| `/campaigns` | Campaigns | Danh sách chiến dịch từ thiện |
| `/explorer` | Explorer | Blockchain explorer |
| `/my-wallet` | MyWallet | Quản lý ví cá nhân |
| `/about` | About | Giới thiệu về dự án |
| `/demo` | Demo | **Showcase tất cả glass components** |

## 🎨 CSS Utility Classes

```css
/* Glass variants */
.glass-card       /* Base glass card */
.glass-light      /* Light blur */
.glass-heavy      /* Heavy blur */
.glass-hover      /* Hover effect */

/* Glow effects */
.glass-glow-blue
.glass-glow-purple
.glass-glow-green
.glass-glow-cyan

/* Animations */
.animate-glow-pulse   /* Pulsing glow */
.animate-float        /* Floating effect */
.animate-shimmer      /* Shimmer loading */
.animate-fade-in      /* Fade in */
.animate-scale-in     /* Scale in */

/* Backdrop blur */
.backdrop-blur-sm
.backdrop-blur-md
.backdrop-blur-lg
.backdrop-blur-xl

/* Text effects */
.text-glow-blue
.text-glow-purple
.text-glow-green
.text-glow-cyan
```

## 🎯 Design Principles

### 1. Glassmorphism
- Frosted glass effect với backdrop blur
- Transparent backgrounds với subtle opacity
- Soft borders và shadows

### 2. Smooth Animations
- Consistent timing: 200-500ms
- Cubic-bezier easing functions
- Subtle hover effects
- Smooth transitions

### 3. Blockchain Theme
- Cyan/Purple gradient cho blockchain vibe
- Ethereum-inspired colors
- Glow effects cho Web3 elements
- Dark background (gradient navy)

### 4. Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly buttons (min 44px)
- Collapsible mobile menu

## 🛠 Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **React Router DOM** - Routing
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **CSS3** - Styling với custom properties

## 🎨 Customization

### Thay đổi màu sắc
Edit `src/styles/liquidGlass.js`:

```javascript
export const COLORS = {
  glow: {
    blue: 'rgba(99, 179, 237, 0.5)',
    // ... thêm màu mới
  }
};
```

### Thêm animation mới
Edit `src/styles/globals.css`:

```css
@keyframes your-animation {
  from { /* start state */ }
  to { /* end state */ }
}

.animate-your-animation {
  animation: your-animation 1s ease-in-out infinite;
}
```

## 📸 Screenshots

### Desktop View
- Trang chủ với hero section và stats cards
- Navbar với glass effect và scroll blur
- Campaign cards với hover effects

### Mobile View
- Responsive layout
- Slide-in menu với glass backdrop
- Touch-friendly buttons

## 🧪 Testing Components

Truy cập `/demo` để xem showcase tất cả components:
- Glass Cards (all variants)
- Glass Buttons (all variants, sizes, states)
- Glass Inputs (with icons, labels, errors)
- Glass Modal
- Animations demo
- Color palette

## 🔜 Next Steps

1. **Web3 Integration**
   - Kết nối MetaMask
   - Read/Write smart contracts
   - Transaction handling

2. **Backend API**
   - Node.js/Express server
   - MongoDB database
   - IPFS cho hình ảnh

3. **Smart Contracts**
   - Solidity contracts
   - Deploy lên testnet
   - Campaign management logic

4. **Advanced Features**
   - QR code generation
   - Real-time updates (WebSocket)
   - Charts và analytics
   - Transaction history

## 📄 License

MIT License - feel free to use for your projects!

## 👨‍💻 Author

BlockCharity Foundation Team

---

**Note**: Đây là foundation/starter kit với design system hoàn chỉnh. Bạn có thể build thêm các features blockchain và backend tùy theo yêu cầu dự án.
