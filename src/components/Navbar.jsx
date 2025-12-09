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
  IoClose 
} from 'react-icons/io5';
import { SiEthereum } from 'react-icons/si';
import { COLORS, Z_INDEX } from '../styles/liquidGlass';
import GlassButton from './base/GlassButton';

/**
 * Navbar Component - Sticky navigation với liquid glass effect
 * 
 * Features:
 * - Sticky top với dynamic blur (scroll effect)
 * - Logo với glow effect
 * - Nav links với active state
 * - Wallet connect button
 * - Network indicator (Ethereum badge)
 * - Mobile responsive với slide-in menu
 * - Scroll-based blur increase
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const location = useLocation();

  // Detect scroll để tăng blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { path: '/', label: 'Home', icon: <IoHome size={20} /> },
    { path: '/campaigns', label: 'Campaigns', icon: <IoRocket size={20} /> },
    { path: '/explorer', label: 'Explorer', icon: <IoSearch size={20} /> },
    { path: '/my-wallet', label: 'My Wallet', icon: <IoWallet size={20} /> },
    { path: '/about', label: 'About', icon: <IoInformationCircle size={20} /> },
  ];

  // Check if nav item is active
  const isActive = (path) => location.pathname === path;

  // Mock wallet connect (sẽ thay bằng Web3 integration sau)
  const handleConnectWallet = () => {
    if (walletAddress) {
      setWalletAddress(null);
    } else {
      // Mock address
      setWalletAddress('0x1234...5678');
    }
  };

  // Format wallet address
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
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
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          {/* Logo */}
          <Link to="/" style={logoStyle}>
            <SiEthereum size={28} style={{ filter: `drop-shadow(0 0 10px ${COLORS.glow.cyan})` }} />
            <span>BlockCharity</span>
          </Link>

          {/* Desktop Navigation */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.5rem',
              flex: 1,
              justifyContent: 'center',
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

          {/* Right section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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

            {/* Wallet button */}
            <GlassButton
              variant={walletAddress ? 'secondary' : 'primary'}
              size="md"
              glow="cyan"
              onClick={handleConnectWallet}
              icon={<IoWallet size={20} />}
              iconPosition="left"
            >
              {walletAddress ? formatAddress(walletAddress) : 'Connect Wallet'}
            </GlassButton>

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
