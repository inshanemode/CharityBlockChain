import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import heroImage from '../picture/1.jpg';
import impactImage1 from '../picture/2.jpg';
import impactImage2 from '../picture/photo1670731308270-16707313084541635731736.webp';

// Animation wrapper component
const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  // Styles
  const sectionStyle = {
    padding: '6rem 1.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 600,
    color: '#111827',
    lineHeight: 1.15,
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em',
  };

  const subheadingStyle = {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '1rem',
    letterSpacing: '-0.01em',
  };

  const bodyTextStyle = {
    fontSize: '1.125rem',
    color: '#6b7280',
    lineHeight: 1.7,
    maxWidth: '640px',
  };

  const primaryButtonStyle = {
    background: '#0ea5e9',
    color: '#ffffff',
    border: 'none',
    borderRadius: '9999px',
    padding: '0.875rem 1.75rem',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const secondaryButtonStyle = {
    background: 'transparent',
    color: '#111827',
    border: '1px solid #000000',
    borderRadius: '9999px',
    padding: '0.875rem 1.75rem',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 200ms ease, color 200ms ease, border-color 200ms ease, transform 200ms ease',
  };

  // Data
  const modules = [
    {
      title: 'Minh bạch từng đồng',
      description: 'Mọi giao dịch đều được ghi lại trên blockchain — bạn có thể theo dõi từng đồng tiền từ ví đến người nhận. Không phí ẩn.',
    },
    {
      title: 'Tạo chiến dịch trong 2 phút',
      description: 'Bắt đầu một chiến dịch từ thiện được xác minh — chỉ cần vài bước đơn giản. Không cần code.',
    },
    {
      title: 'Đóng góp dễ dàng',
      description: 'Quyên góp bằng thẻ, USDT, ETH hoặc quét QR — an toàn và nhanh chóng.',
    },
    {
      title: 'Xem tác động thực tế',
      description: 'Xem ảnh, video, GPS và báo cáo — tất cả đều được xác minh trên chuỗi. Mỗi đóng góp đều tạo ra thay đổi.',
    },
  ];

  const stats = [
    { value: '12,000+', label: 'donations verified' },
    { value: '98%', label: 'of funds reach beneficiaries' },
    { value: '43', label: 'countries supported' },
    { value: '100%', label: 'public ledger' },
  ];

  const impactStories = [
    {
      org: 'Books for Highlands',
      quote: '"We raised 5 ETH in 2 weeks — every donor could track their book deliveries in real time."',
      link: '/campaigns',
      image: impactImage1,
    },
    {
      org: 'Clean Water in Mekong',
      quote: '"Blockchain transparency helped us gain trust from 200+ international donors."',
      link: '/campaigns',
      image: impactImage2,
    },
    {
      org: 'Tech for Rural Schools',
      quote: '"Parents could verify each laptop delivery via GPS and photos on-chain."',
      link: '/campaigns',
      image: impactImage1,
    },
  ];

  const userTypes = [
    {
      type: 'Donors',
      benefit: 'Give with full trust.',
      description: 'Track every cent from your wallet to the recipient.',
      icon: '❤️',
    },
    {
      type: 'NGOs',
      benefit: 'Launch campaigns in minutes.',
      description: 'No paperwork. Just connect your wallet and start.',
      icon: '🏢',
    },
    {
      type: 'Developers',
      benefit: 'Integrate with our open API.',
      description: 'Build custom dashboards, widgets, and integrations.',
      icon: '💻',
    },
    {
      type: 'Volunteers',
      benefit: 'Verify and report impact.',
      description: 'Upload photos and GPS data to prove delivery.',
      icon: '📸',
    },
  ];

  const topContributors = [
    { rank: 1, name: 'Anonymous Whale', amount: '125.5 ETH', campaign: 'Clean Water in Mekong', date: 'Dec 8, 2025' },
    { rank: 2, name: 'CryptoPhilanthropist', amount: '98.2 ETH', campaign: 'Books for Highlands', date: 'Dec 7, 2025' },
    { rank: 3, name: 'GlobalGiver.eth', amount: '87.3 ETH', campaign: 'Tech for Rural Schools', date: 'Dec 6, 2025' },
    { rank: 4, name: 'EthForGood', amount: '76.8 ETH', campaign: 'Medical Supplies Fund', date: 'Dec 5, 2025' },
    { rank: 5, name: 'BlockchainHero', amount: '65.4 ETH', campaign: 'Emergency Relief', date: 'Dec 4, 2025' },
    { rank: 6, name: 'DeFiDonor', amount: '54.9 ETH', campaign: 'Education Access', date: 'Dec 3, 2025' },
    { rank: 7, name: 'Web3Warrior', amount: '48.2 ETH', campaign: 'Climate Action', date: 'Dec 2, 2025' },
    { rank: 8, name: 'GiveBackDAO', amount: '42.7 ETH', campaign: 'Food Security', date: 'Dec 1, 2025' },
    { rank: 9, name: 'ImpactInvestor', amount: '38.5 ETH', campaign: 'Healthcare Initiative', date: 'Nov 30, 2025' },
    { rank: 10, name: 'CharityChain', amount: '35.1 ETH', campaign: 'Disaster Response', date: 'Nov 29, 2025' },
  ];

  const devFeatures = [
    { title: 'Public smart contracts on GitHub', icon: '📂' },
    { title: 'Widget to embed campaigns', icon: '🧩' },
    { title: 'Real-time donation API', icon: '⚡' },
  ];

  const activeCampaigns = [
    {
      id: 1,
      title: 'Sách cho em',
      description: 'Mang sách đến với trẻ em vùng cao - mỗi cuốn sách là một cánh cửa tri thức.',
      raised: 168.88,
      target: 200.0,
      progress: 84,
      donors: 342,
      image: impactImage1,
    },
    {
      id: 2,
      title: 'Nước sạch Mekong',
      description: 'Xây dựng hệ thống lọc nước sạch cho cộng đồng vùng đồng bằng sông Cửu Long.',
      raised: 245.5,
      target: 300.0,
      progress: 82,
      donors: 567,
      image: impactImage2,
    },
    {
      id: 3,
      title: 'Máy tính cho học sinh',
      description: 'Trang bị laptop và thiết bị học tập cho học sinh nghèo vượt khó.',
      raised: 89.2,
      target: 150.0,
      progress: 59,
      donors: 198,
      image: heroImage,
    },
    {
      id: 4,
      title: 'Y tế cộng đồng',
      description: 'Hỗ trợ trang thiết bị y tế và khám bệnh miễn phí cho vùng xa.',
      raised: 125.7,
      target: 180.0,
      progress: 70,
      donors: 289,
      image: impactImage1,
    },
  ];

  return (
    <main style={{ background: '#f5f5f7', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      
      {/* ===== SECTION 1: HERO - SPLIT LAYOUT ===== */}
      <section style={{ 
        padding: 0,
        maxWidth: '100%',
        margin: 0,
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* LEFT SIDE: Content with Glass Effect */}
        <div style={{
          flex: '1 1 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(2rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(245, 245, 247, 1) 55%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          position: 'relative',
          zIndex: 2,
          minHeight: '600px'
        }}>
          <div style={{ maxWidth: '600px', width: '100%' }}>
            <FadeInSection>
              <h1 style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 600,
                color: '#111827',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                letterSpacing: '-0.03em',
              }}>
                Transparent giving.<br />
                Real impact.
              </h1>
            </FadeInSection>
            
            <FadeInSection delay={0.1}>
              <p style={{ 
                fontSize: '1.125rem',
                color: '#6b7280',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                maxWidth: '540px'
              }}>
                Every donation is recorded on-chain — track your contribution from wallet to recipient.
              </p>
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  style={{
                    ...primaryButtonStyle,
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    boxShadow: '0 4px 14px rgba(14, 165, 233, 0.3)'
                  }}
                  onClick={() => navigate('/donate')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#0284c7';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(14, 165, 233, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#0ea5e9';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(14, 165, 233, 0.3)';
                  }}
                >
                  Start a Campaign
                </button>
                <button
                  style={{
                    ...secondaryButtonStyle,
                    padding: '1rem 2rem',
                    fontSize: '1rem'
                  }}
                  onClick={() => navigate('/campaigns')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#000000';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#000000';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#111827';
                    e.currentTarget.style.borderColor = '#000000';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Explore Campaigns
                </button>
              </div>
            </FadeInSection>
          </div>
        </div>

        {/* RIGHT SIDE: Full-Height Image */}
        <div style={{
          flex: '1 1 50%',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '600px'
        }}>
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            src={heroImage} 
            alt="Hands holding grains - community charity impact" 
            style={{ 
              width: '100%', 
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block'
            }} 
          />
          {/* Subtle overlay for better text contrast if needed */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 30%)',
            pointerEvents: 'none'
          }} />
        </div>

        {/* Mobile Responsive Styles */}
        <style>{`
          @media (max-width: 968px) {
            section:first-of-type {
              flex-direction: column !important;
              min-height: auto !important;
            }
            section:first-of-type > div:first-child {
              order: 2;
              min-height: auto !important;
              padding: 3rem 1.5rem !important;
            }
            section:first-of-type > div:last-child {
              order: 1;
              minHeight: 400px !important;
              max-height: 500px;
            }
            section:nth-of-type(2) {
              margin-top: 2rem !important;
            }
          }
          @media (max-width: 640px) {
            section:first-of-type > div:last-child {
              min-height: 300px !important;
              max-height: 400px;
            }
          }
        `}</style>
      </section>

      {/* ===== SECTION 2: CHIẾN DỊCH ĐANG DIỄN RA (ACTIVE CAMPAIGNS) ===== */}
      <section style={{ ...sectionStyle, background: '#ffffff', padding: '6rem 1.5rem', marginTop: '4rem', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)' }}>
        <FadeInSection>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ ...subheadingStyle, marginBottom: '1rem' }}>Chiến dịch đang diễn ra</h2>
            <p style={{ ...bodyTextStyle, margin: '0 auto 2rem' }}>
              Khám phá các chiến dịch từ thiện đang được hỗ trợ — minh bạch từng đồng đóng góp trên blockchain.
            </p>
            <button
              style={{
                background: '#0ea5e9',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.875rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={() => navigate('/campaigns')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0284c7';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(14, 165, 233, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0ea5e9';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Xem tất cả chiến dịch
            </button>
          </div>
        </FadeInSection>

        {/* Featured Campaign Card */}
        <FadeInSection delay={0.1}>
          <div
            style={{
              position: 'relative',
              maxWidth: '1000px',
              margin: '0 auto 3rem',
              height: '400px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onClick={() => navigate('/campaigns')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(15, 23, 42, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(15, 23, 42, 0.12)';
            }}
          >
            {/* Background Image */}
            <img
              src={impactImage2}
              alt="Featured campaign"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />

            {/* Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%)',
              }}
            />

            {/* Content */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2.5rem',
                color: '#ffffff',
              }}
            >
              {/* Logo Badge */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#0ea5e9',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                }}
              >
                🌊
              </div>

              {/* Bottom Text */}
              <div>
                <h3
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    lineHeight: 1.3,
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  Xem cách Clean Water in Mekong đã giúp 5,200+ người bằng công nghệ blockchain
                </h3>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <span>Xem chi tiết</span>
                  <span style={{ fontSize: '1.25rem' }}>→</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Campaign Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {activeCampaigns.map((campaign, index) => (
            <FadeInSection key={campaign.id} delay={0.2 + index * 0.1}>
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
                }}
                onClick={() => navigate('/campaigns')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(15, 23, 42, 0.12)';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(15, 23, 42, 0.06)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                {/* Campaign Image */}
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Progress Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(14, 165, 233, 0.95)',
                      color: '#ffffff',
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {campaign.progress}% đạt được
                  </div>
                </div>

                {/* Campaign Content */}
                <div style={{ padding: '1.5rem' }}>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#111827',
                      marginBottom: '0.75rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {campaign.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: '#6b7280',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      minHeight: '3rem',
                    }}
                  >
                    {campaign.description}
                  </p>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        background: '#e5e7eb',
                        borderRadius: '9999px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${campaign.progress}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #0ea5e9 0%, #06b6d4 100%)',
                          borderRadius: '9999px',
                          transition: 'width 0.5s ease',
                        }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>
                        {campaign.raised.toFixed(2)} ETH
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                        của {campaign.target.toFixed(2)} ETH
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0ea5e9' }}>
                        {campaign.donors}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>nhà hảo tâm</div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    style={{
                      width: '100%',
                      background: '#0ea5e9',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '0.875rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/donate');
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#0284c7';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#0ea5e9';
                    }}
                  >
                    Quyên góp ngay
                  </button>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ===== SECTION 3: GLOBAL IMPACT (STATS) ===== */}
      <section style={{ ...sectionStyle, textAlign: 'center' }}>
        <FadeInSection>
          <h2 style={{ ...subheadingStyle, marginBottom: '3rem' }}>Global impact, verified on-chain</h2>
        </FadeInSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {stats.map((stat, index) => (
            <FadeInSection key={stat.label} delay={index * 0.1}>
              <div>
                <div
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    fontWeight: 700,
                    color: '#111827',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '1rem', color: '#6b7280' }}>{stat.label}</div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ===== SECTION 4: TRUSTED BY COMMUNITIES ===== */}
      <section style={{ ...sectionStyle, background: '#f5f5f7', padding: '6rem 1.5rem' }}>
        <FadeInSection>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={subheadingStyle}>Trusted by communities worldwide</h2>
            <p style={{ ...bodyTextStyle, margin: '0 auto' }}>
              Real stories from organizations using our platform.
            </p>
          </div>
        </FadeInSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {impactStories.map((story, index) => (
            <FadeInSection key={story.org} delay={index * 0.1}>
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {story.image && (
                  <img 
                    src={story.image} 
                    alt={story.org}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                )}
                <div style={{ padding: '2rem' }}>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#374151',
                      lineHeight: 1.7,
                      marginBottom: '1.5rem',
                      fontStyle: 'italic',
                    }}
                  >
                    {story.quote}
                  </p>
                  <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1rem' }}>
                    <div style={{ fontWeight: 600, color: '#111827', marginBottom: '0.25rem' }}>
                      {story.org}
                    </div>
                    <button
                      onClick={() => navigate(story.link)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0ea5e9',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      See how they used our platform →
                    </button>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ===== SECTION 5: FOR EVERYONE - CONTRIBUTION LEADERBOARD ===== */}
      <section style={sectionStyle}>
        <FadeInSection>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={subheadingStyle}>For everyone</h2>
            <p style={{ ...bodyTextStyle, margin: '0 auto' }}>
              Whether you're giving, organizing, building, or verifying — we've got you covered.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              maxWidth: '1000px',
              margin: '0 auto',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
            }}
          >
            {/* Table Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 140px 180px 120px',
                gap: '1rem',
                padding: '1rem 1.5rem',
                background: '#f9fafb',
                borderBottom: '1px solid #e5e7eb',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              <div>Rank</div>
              <div>Contributor</div>
              <div>Amount</div>
              <div>Campaign</div>
              <div>Date</div>
            </div>

            {/* Table Body - Scrollable */}
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {topContributors.map((contributor, index) => (
                <div
                  key={contributor.rank}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr 140px 180px 120px',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    background: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                    borderBottom: index < topContributors.length - 1 ? '1px solid #f3f4f6' : 'none',
                    fontSize: '0.95rem',
                    color: '#111827',
                    transition: 'background 0.15s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f0f9ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = index % 2 === 0 ? '#ffffff' : '#f9fafb';
                  }}
                >
                  {/* Rank with Medal Icons for Top 3 */}
                  <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                    {contributor.rank === 1 && <span style={{ fontSize: '1.25rem', marginRight: '0.25rem' }}>🥇</span>}
                    {contributor.rank === 2 && <span style={{ fontSize: '1.25rem', marginRight: '0.25rem' }}>🥈</span>}
                    {contributor.rank === 3 && <span style={{ fontSize: '1.25rem', marginRight: '0.25rem' }}>🥉</span>}
                    {contributor.rank > 3 && `#${contributor.rank}`}
                  </div>

                  {/* Name */}
                  <div style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {contributor.name}
                  </div>

                  {/* Amount */}
                  <div style={{ fontWeight: 600, color: '#0ea5e9' }}>
                    {contributor.amount}
                  </div>

                  {/* Campaign */}
                  <div style={{ color: '#6b7280', fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {contributor.campaign}
                  </div>

                  {/* Date */}
                  <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                    {contributor.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* View All Button */}
        <FadeInSection delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              style={{
                background: 'transparent',
                color: '#111827',
                border: '1px solid #e5e7eb',
                borderRadius: '9999px',
                padding: '0.875rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={() => navigate('/history')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9fafb';
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              View all contributors
            </button>
          </div>
        </FadeInSection>
      </section>

      {/* ===== SECTION 6: MODULAR SOLUTIONS ===== */}
      <section style={{ ...sectionStyle, background: '#f5f5f7', padding: '6rem 1.5rem' }}>
        <FadeInSection>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={subheadingStyle}>Giải pháp linh hoạt cho từ thiện hiện đại</h2>
            <p style={{ ...bodyTextStyle, margin: '0 auto' }}>
              Tất cả những gì bạn cần để tổ chức chiến dịch từ thiện minh bạch và hiệu quả.
            </p>
          </div>
        </FadeInSection>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {modules.map((module, index) => (
            <FadeInSection key={module.title} delay={index * 0.1}>
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '2rem',
                  transition: 'all 0.2s ease',
                  cursor: 'default',
                  width: '260px',
                  minWidth: '260px',
                  flex: '0 1 260px',
                  height: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <h3 style={{ fontSize: '1.375rem', fontWeight: 600, color: '#111827', marginBottom: '1rem', flexShrink: 0, lineHeight: 1.3 }}>
                  {module.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.6, flex: 1, overflow: 'hidden' }}>
                  {module.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section style={{ ...sectionStyle, textAlign: 'center', paddingBottom: '8rem' }}>
        <FadeInSection>
          <h2 style={{ ...subheadingStyle, marginBottom: '1rem' }}>Ready to make an impact?</h2>
          <p style={{ ...bodyTextStyle, margin: '0 auto 2rem' }}>
            Join thousands of donors and organizations building trust through transparency.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              style={primaryButtonStyle}
              onClick={() => navigate('/donate')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0284c7';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0ea5e9';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get Started
            </button>
            <button
              style={secondaryButtonStyle}
              onClick={() => navigate('/about')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9fafb';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              Learn More
            </button>
          </div>
        </FadeInSection>
      </section>
    </main>
  );
};

export default Home;
