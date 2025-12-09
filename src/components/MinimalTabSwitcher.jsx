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
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const current = TAB_CONFIG.find((tab) => tab.route === location.pathname);
    setActiveTab(current ? current.key : 'home');
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isPanelOpen) return;
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPanelOpen]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.key);
    navigate(tab.route);
    setIsPanelOpen(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        aria-label="Open navigation switcher"
        onClick={() => setIsPanelOpen((open) => !open)}
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 100,
          width: '48px',
          height: '48px',
          borderRadius: '9999px',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          background: '#ffffff',
          color: '#111827',
          fontSize: '1.5rem',
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 200ms ease, box-shadow 200ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 14px 34px rgba(15, 23, 42, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(15, 23, 42, 0.15)';
        }}
      >
        ⋯
      </button>

      {isPanelOpen && (
        <div
          ref={panelRef}
          style={{
            position: 'fixed',
            top: '72px',
            right: '16px',
            zIndex: 90,
            width: '220px',
            padding: '16px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.96)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            boxShadow: '0 20px 45px rgba(15, 23, 42, 0.18)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
          }}
        >
          {TAB_CONFIG.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  background: isActive ? '#ffffff' : 'rgba(255,255,255,0.2)',
                  color: isActive ? '#111827' : '#6b7280',
                  boxShadow: isActive
                    ? '0 12px 22px rgba(15, 23, 42, 0.2)'
                    : 'inset 0 0 0 1px rgba(229, 231, 235, 0.9)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  transition: 'all 180ms ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.35)';
                    e.currentTarget.style.color = '#374151';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.color = '#6b7280';
                  }
                }}
              >
                {tab.label}
                {isActive ? '•' : ''}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MinimalTabSwitcher;
