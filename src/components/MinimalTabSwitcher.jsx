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

  // Cập nhật active tab khi route thay đổi
  useEffect(() => {
    const current = TAB_CONFIG.find((tab) => tab.route === location.pathname);
    setActiveTab(current ? current.key : 'home');
  }, [location.pathname]);

  // Ẩn/hiện khi cuộn
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

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

  const handleCreateCampaign = () => {
    navigate('/create-campaign'); // hoặc mở modal theo ý bạn
  };

  const handleSearch = () => {
    navigate('/search'); // hoặc bật modal tìm kiếm
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
        padding: '8px 12px',
        background: '#ffffffff',
        border: '1px solid rgba(255, 255, 255, 0.8)', // làm viền trong suốt nhẹ để glow đẹp hơn
        borderRadius: '16px',
        // 👇 Hiệu ứng glow + bóng đổ kết hợp
        boxShadow: `
          0 4px 12px rgba(0, 0, 0, 0.08),
          0 0 20px rgba(255, 255, 255, 0.6),
          0 0 30px rgba(255, 255, 255, 0.4)
        `,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 120,
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        transition: 'transform 220ms ease, box-shadow 220ms ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}
    >

      {/* Các tab chính */}
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '6px',
          flex: 1,
          justifyContent: 'center',
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
                minWidth: '0', // cho phép thu nhỏ trên mobile
                padding: '10px 8px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                background: isActive ? 'rgb(248, 165, 194)' : 'transparent',
                color: isActive ? '#ffffff' : 'rgba(194, 80, 120, 1)',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                transition: 'all 180ms ease',
                boxShadow: isActive
                  ? '0 6px 16px rgba(42, 74, 88, 0.35)'
                  : 'inset 0 0 0 1px rgba(229, 231, 235, 0.9)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(214, 124, 124, 0.12)';
                  e.currentTarget.style.boxShadow = 'inset 0 0 0 1px rgba(0, 0, 0, 0.12)';
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