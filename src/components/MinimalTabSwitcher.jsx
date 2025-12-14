import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TAB_CONFIG = [
  { key: 'home', label: 'Home', route: '/' },
  { key: 'campaigns', label: 'Campaigns', route: '/campaigns' },
  { key: 'donate', label: 'Donate', route: '/donate' },
  { key: 'mywallet', label: 'Mywallet', route: '/my-wallet' },
  { key: 'history', label: 'History', route: '/history' },
];

const MinimalTabSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const current = TAB_CONFIG.find((tab) => tab.route === location.pathname);
    setActiveTab(current ? current.key : 'home');
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        // Show when near top or scrolling up, hide when scrolling down
        if (currentY < 40) {
          setIsHidden(false);
        } else if (delta > 6) {
          setIsHidden(true);
        } else if (delta < -6) {
          setIsHidden(false);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab.key);
    navigate(tab.route);
  };

  return (
    <nav
      aria-label="App tab bar"
      style={{
        position: 'fixed',
        top: '12px',
        left: '50%',
        transform: `translate(-50%, ${isHidden ? '-140%' : '0'})`,
        width: 'min(640px, calc(100% - 32px))',
        padding: '10px',
        background: 'rgba(255, 255, 255, 0.96)',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 120,
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        transition: 'transform 220ms ease, box-shadow 220ms ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '8px',
        }}
      >
        {TAB_CONFIG.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab)}
              style={{
                flex: 1,
                padding: '12px 10px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                background: isActive ? '#0ea5e9' : 'transparent',
                color: isActive ? '#ffffff' : '#374151',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                transition: 'all 180ms ease',
                boxShadow: isActive ? '0 10px 24px rgba(14, 165, 233, 0.35)' : 'inset 0 0 0 1px rgba(229, 231, 235, 0.9)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(14, 165, 233, 0.08)';
                  e.currentTarget.style.boxShadow = 'inset 0 0 0 1px rgba(14, 165, 233, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'inset 0 0 0 1px rgba(229, 231, 235, 0.9)';
                }
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MinimalTabSwitcher;
