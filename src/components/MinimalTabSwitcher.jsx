import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * MinimalTabSwitcher - kyu-core style navigation
 * Replaces traditional navbar with clean tab interface
 */
const MinimalTabSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');

  // Map routes to tabs
  const tabMap = {
    '/': 'home',
    '/campaigns': 'product',
    '/donate': 'product',
    '/explorer': 'product',
    '/my-wallet': 'product',
    '/history': 'product',
    '/about': 'product',
    '/demo': 'product',
    '/success': 'product',
  };

  // Update active tab based on current route
  useEffect(() => {
    const tab = tabMap[location.pathname] || 'home';
    setActiveTab(tab);
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      navigate('/');
    } else {
      navigate('/campaigns');
    }
  };

  const tabs = [
    { key: 'home', label: 'home' },
    { key: 'product', label: 'product' },
  ];

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '24px 20px',
        borderBottom: '1px solid rgba(243, 244, 246, 0.8)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          background: '#f3f4f6',
          borderRadius: '9999px',
          padding: '4px',
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                background: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#111827' : '#6b7280',
                boxShadow: isActive ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' : 'none',
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#374151';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#6b7280';
                }
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MinimalTabSwitcher;
