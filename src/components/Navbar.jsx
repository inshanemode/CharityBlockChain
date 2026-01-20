import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  IoHome, 
  IoRocket, 
  IoSearch, 
  IoWallet, 
  IoInformationCircle,
  IoMenu,
  IoClose,
  IoAddCircleOutline,
  IoLogOutOutline,
  IoWarningOutline
} from 'react-icons/io5';
import { SiEthereum } from 'react-icons/si';
import { COLORS, Z_INDEX } from '../styles/liquidGlass';
import GlassButton from './base/GlassButton';
import useWallet from '../hooks/useWallet';

/**
 * Navbar Component - Sticky navigation với liquid glass effect
 * 
 * Features:
 * - Sticky top với dynamic blur (scroll effect)
 * - Logo với glow effect
 * - Nav links với active state
 * - Real MetaMask wallet connection
 * - Network indicator (Ethereum badge)
 * - Mobile responsive với slide-in menu
 * - Scroll-based blur increase
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const location = useLocation();

  // Use real wallet hook
  const {
    isConnected,
    address,
    balance,
    isConnecting,
    error,
    chainId,
    connectWallet,
    disconnectWallet,
    isMetaMaskInstalled,
    getNetworkName,
  } = useWallet();

  // Detect scroll để tăng blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close wallet menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showWalletMenu && !e.target.closest('.wallet-menu-container')) {
        setShowWalletMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showWalletMenu]);

  // Navigation items (main nav - right side)
  const navItems = [
    { path: '/', label: 'Home', icon: <IoHome size={20} /> },
    { path: '/campaigns', label: 'Campaigns', icon: <IoRocket size={20} /> },
    { path: '/my-wallet', label: 'My Wallet', icon: <IoWallet size={20} /> },
    { path: '/about', label: 'About', icon: <IoInformationCircle size={20} /> },
  ];

  // Check if nav item is active
  const isActive = (path) => location.pathname === path;

  // Handle wallet connect/disconnect
  const handleConnectWallet = async () => {
    if (isConnected) {
      setShowWalletMenu(!showWalletMenu);
    } else {
      const result = await connectWallet();
      if (!result.success) {
        alert(result.error || 'Failed to connect wallet');
      }
    }
  };

  // Handle disconnect
  const handleDisconnect = () => {
    disconnectWallet();
    setShowWalletMenu(false);
  };

  // Format wallet address
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Format balance
  const formatBalance = (bal) => {
    if (!bal) return '0.0000';
    return parseFloat(bal).toFixed(4);
  };

  // Navbar style với dynamic blur
  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: Z_INDEX.sticky,
    background: isScrolled ? COLORS.glass.medium : COLORS.glass.light,
    backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
    WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
    border: 'none',
    borderBottom: `1px solid ${COLORS.border.default}`,
    boxShadow: isScrolled ? `0 8px 32px ${COLORS.shadow}` : 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  // Logo style
  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: COLORS.text.light,
    textDecoration: 'none',
    background: `linear-gradient(135deg, ${COLORS.glow.cyan}, ${COLORS.glow.purple})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: `0 0 20px ${COLORS.glow.cyan}`,
  };

  // Nav link style
  const navLinkStyle = (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '0.95rem',
    fontWeight: 500,
    color: active ? COLORS.text.light : COLORS.text.secondary,
    textDecoration: 'none',
    background: active ? COLORS.glass.medium : 'transparent',
    backdropFilter: active ? 'blur(10px)' : 'none',
    border: active ? `1px solid ${COLORS.border.default}` : '1px solid transparent',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  });

  return (
    <>
      <motion.nav
        style={navbarStyle}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '1.25rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          {/* Left Column: Logo + Function Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Logo */}
            <Link to="/" style={logoStyle}>
              <SiEthereum size={28} style={{ filter: `drop-shadow(0 0 10px ${COLORS.glow.cyan})` }} />
              <span>BlockCharity</span>
            </Link>

            {/* Function Buttons - Desktop only */}
            <div
              className="function-buttons"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '0.5rem',
                marginLeft: '1rem',
              }}
            >
              {/* Create Button */}
              <GlassButton
                variant="primary"
                size="sm"
                glow="cyan"
                onClick={() => window.location.href = '/create'}
                icon={<IoAddCircleOutline size={18} />}
                iconPosition="left"
              >
                Create
              </GlassButton>

              {/* Search Link */}
              <Link
                to="/explorer"
                style={navLinkStyle(isActive('/explorer'))}
                onMouseEnter={(e) => {
                  if (!isActive('/explorer')) {
                    e.currentTarget.style.background = COLORS.glass.light;
                    e.currentTarget.style.borderColor = COLORS.border.default;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/explorer')) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                <IoSearch size={18} />
                <span className="nav-label">Search</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Main Navigation + Wallet */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, justifyContent: 'flex-end' }}>
            {/* Desktop Navigation */}
            <div
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              className="desktop-nav"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={navLinkStyle(isActive(item.path))}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.background = COLORS.glass.light;
                      e.currentTarget.style.borderColor = COLORS.border.default;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  {item.icon}
                  <span className="nav-label">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Network badge - Desktop only */}
            <div
              className="network-badge"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                background: COLORS.glass.light,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${COLORS.border.default}`,
                borderRadius: '10px',
                fontSize: '0.875rem',
                color: COLORS.text.secondary,
              }}
            >
              <SiEthereum size={16} color={COLORS.glow.cyan} />
              <span>Ethereum</span>
            </div>

            {/* Wallet button with dropdown */}
            <div className="wallet-menu-container" style={{ position: 'relative' }}>
              {!isMetaMaskInstalled() ? (
                <GlassButton
                  variant="primary"
                  size="md"
                  glow="orange"
                  onClick={() => window.open('https://metamask.io/download/', '_blank')}
                  icon={<IoWarningOutline size={20} />}
                  iconPosition="left"
                >
                  Install MetaMask
                </GlassButton>
              ) : (
                <GlassButton
                  variant={isConnected ? 'secondary' : 'primary'}
                  size="md"
                  glow="cyan"
                  onClick={handleConnectWallet}
                  icon={<IoWallet size={20} />}
                  iconPosition="left"
                  disabled={isConnecting}
                >
                  {isConnecting 
                    ? 'Connecting...' 
                    : isConnected 
                      ? formatAddress(address) 
                      : 'Connect Wallet'
                  }
                </GlassButton>
              )}

              {/* Wallet Dropdown Menu */}
              <AnimatePresence>
                {showWalletMenu && isConnected && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '0.5rem',
                      minWidth: '280px',
                      background: COLORS.glass.heavy,
                      backdropFilter: 'blur(40px)',
                      border: `1px solid ${COLORS.border.hover}`,
                      borderRadius: '16px',
                      boxShadow: `0 20px 60px ${COLORS.shadowDark}`,
                      padding: '1rem',
                      zIndex: Z_INDEX.modal,
                    }}
                  >
                    {/* Address */}
                    <div style={{
                      padding: '0.75rem',
                      background: COLORS.glass.light,
                      borderRadius: '10px',
                      marginBottom: '0.75rem',
                    }}>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: COLORS.text.muted,
                        marginBottom: '0.25rem'
                      }}>
                        Connected Address
                      </div>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        color: COLORS.text.light,
                        fontFamily: 'monospace',
                        wordBreak: 'break-all'
                      }}>
                        {address}
                      </div>
                    </div>

                    {/* Balance */}
                    <div style={{
                      padding: '0.75rem',
                      background: COLORS.glass.light,
                      borderRadius: '10px',
                      marginBottom: '0.75rem',
                    }}>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: COLORS.text.muted,
                        marginBottom: '0.25rem'
                      }}>
                        Balance
                      </div>
                      <div style={{ 
                        fontSize: '1.25rem', 
                        color: COLORS.text.light,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <SiEthereum size={18} color={COLORS.glow.cyan} />
                        {formatBalance(balance)} ETH
                      </div>
                    </div>

                    {/* Network */}
                    <div style={{
                      padding: '0.75rem',
                      background: COLORS.glass.light,
                      borderRadius: '10px',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#10B981',
                        boxShadow: '0 0 10px #10B981',
                      }} />
                      <span style={{ 
                        fontSize: '0.875rem', 
                        color: COLORS.text.secondary 
                      }}>
                        {getNetworkName()}
                      </span>
                    </div>

                    {/* Disconnect Button */}
                    <button
                      onClick={handleDisconnect}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '10px',
                        color: '#EF4444',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                      }}
                    >
                      <IoLogOutOutline size={18} />
                      Disconnect Wallet
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              className="mobile-menu-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                background: COLORS.glass.medium,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${COLORS.border.default}`,
                borderRadius: '10px',
                color: COLORS.text.light,
                cursor: 'pointer',
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(20px)',
                zIndex: Z_INDEX.modal - 1,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile menu panel */}
            <motion.div
              style={{
                position: 'fixed',
                top: '80px',
                right: '1rem',
                width: 'calc(100% - 2rem)',
                maxWidth: '400px',
                background: COLORS.glass.heavy,
                backdropFilter: 'blur(40px)',
                border: `1px solid ${COLORS.border.hover}`,
                borderRadius: '16px',
                boxShadow: `0 20px 60px ${COLORS.shadowDark}`,
                zIndex: Z_INDEX.modal,
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div style={{ padding: '1rem' }}>
                {/* Network badge mobile */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    background: COLORS.glass.light,
                    border: `1px solid ${COLORS.border.default}`,
                    borderRadius: '10px',
                    marginBottom: '1rem',
                  }}
                >
                  <SiEthereum size={20} color={COLORS.glow.cyan} />
                  <span style={{ color: COLORS.text.secondary, fontSize: '0.875rem' }}>
                    Connected to Ethereum
                  </span>
                </div>

                {/* Mobile nav items */}
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      style={{
                        ...navLinkStyle(isActive(item.path)),
                        width: '100%',
                        marginBottom: '0.5rem',
                        padding: '1rem',
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from going under navbar */}
      <div style={{ height: '80px' }} />

      {/* Responsive CSS */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .function-buttons {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .network-badge {
            display: flex !important;
          }
        }
        @media (max-width: 767px) {
          .nav-label {
            display: none;
          }
        }
        @media (min-width: 1024px) {
          .nav-label {
            display: inline !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
