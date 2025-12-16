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
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: 600,
    color: '#111827',
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    letterSpacing: '-0.03em',
  };

  const subheadingStyle = {
    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
  };

  const bodyTextStyle = {
    fontSize: '1.125rem',
    color: '#6b7280',
    lineHeight: 1.7,
    maxWidth: '640px',
  };

  const primaryButtonStyle = {
    background: '#f8a5c2',
    color: '#ffffff',
    border: 'none',
    borderRadius: '9999px',
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const secondaryButtonStyle = {
    background: '#f8a5c2',
    color: '#ffffff',
    border: 'none',
    borderRadius: '9999px',
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  // Data
  const modules = [
    {
      title: 'Transparency',
      description: 'See every transaction on Ethereum. No hidden fees.',
      icon: '🔍',
      color: '#667eea',
    },
    {
      title: 'Campaigns',
      description: 'Create a verified campaign in 2 minutes.',
      icon: '🚀',
      color: '#f093fb',
    },
    {
      title: 'Donate',
      description: 'Give via credit card, USDT, ETH, or QR.',
      icon: '💳',
      color: '#4facfe',
    },
    {
      title: 'Impact',
      description: 'View photos, GPS, and reports — all verified on-chain.',
      icon: '📊',
      color: '#43e97b',
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

  const devFeatures = [
    { title: 'Public smart contracts on GitHub', icon: '📂' },
    { title: 'Widget to embed campaigns', icon: '🧩' },
    { title: 'Real-time donation API', icon: '⚡' },
  ];

  return (
    <main style={{ background: '#737373', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", overflow: 'hidden' }}>
      
      {/* ===== SECTION 1: HERO WITH GRADIENT ===== */}
      <section style={{ 
        ...sectionStyle, 
        paddingTop: '10rem', 
        paddingBottom: '10rem', 
        textAlign: 'left',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #feca57 100%)',
        position: 'relative',
        overflow: 'visible',
        maxWidth: '100%'
      }}>
        {/* Floating mockup cards */}
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '12%',
            right: '8%',
            width: '200px',
            height: '280px',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.25)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <div style={{ width: '100%', height: '40px', background: '#f3f4f6', borderRadius: '8px' }} />
          <div style={{ width: '80%', height: '20px', background: '#e5e7eb', borderRadius: '4px' }} />
          <div style={{ width: '60%', height: '20px', background: '#e5e7eb', borderRadius: '4px' }} />
          <div style={{ flex: 1, background: '#f9fafb', borderRadius: '8px' }} />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '15%',
            width: '160px',
            height: '200px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
            padding: '1rem'
          }}
        >
          <div style={{ width: '100%', height: '60px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '8px', marginBottom: '0.75rem' }} />
          <div style={{ width: '90%', height: '16px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '0.5rem' }} />
          <div style={{ width: '70%', height: '16px', background: '#e5e7eb', borderRadius: '4px' }} />
        </motion.div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
          <FadeInSection>
            <h1 style={{ ...headingStyle, color: '#ffffff', maxWidth: '700px', marginBottom: '1.5rem' }}>
              Financial infrastructure to grow your charity
            </h1>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <p style={{ ...bodyTextStyle, color: 'rgba(255,255,255,0.95)', margin: '0 0 2.5rem', maxWidth: '550px', fontSize: '1.125rem' }}>
              Join thousands of organizations using blockchain to accept donations, track impact, and build trust with complete transparency.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                style={{ ...primaryButtonStyle }}
                onClick={() => navigate('/donate')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3a6b7';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8a5c2';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Start now →
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===== TRUSTED BY LOGOS ===== */}
      <section style={{ background: '#888888', padding: '3.5rem 1.5rem' }}>
        <FadeInSection>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '0.813rem', color: '#6b7280', marginBottom: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
              Join leading organizations worldwide
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'clamp(2.5rem, 7vw, 5rem)',
              flexWrap: 'wrap',
              opacity: 0.5
            }}>
              {['UNICEF', 'Red Cross', 'WWF', 'Oxfam', 'Care', 'Mercy Corps'].map((org) => (
                <div key={org} style={{ 
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)', 
                  fontWeight: 700, 
                  color: '#1f2937',
                  letterSpacing: '0.05em'
                }}> 
                  {org}
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ===== SECTION 2: MODULAR SOLUTIONS ===== */}
      <section style={{ ...sectionStyle, background: '#888888', padding: '7rem 1.5rem', position: 'relative' }}>
        {/* Decorative blur orb */}
        <div style={{
          position: 'absolute',
          top: '5%',
          right: '0',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />
        
        <FadeInSection>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#8b5cf6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
              Modular solutions
            </p>
            <h2 style={{ ...subheadingStyle, maxWidth: '700px', margin: '0 auto' }}>
              A fully integrated suite of charity and donation products
            </h2>
            <p style={{ ...bodyTextStyle, margin: '1rem auto 0', color: '#6b7280' }}>
              Everything you need to run transparent, blockchain-verified campaigns — unified on one platform.
            </p>
          </div>
        </FadeInSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1000px',
            margin: '4rem auto 0',
            position: 'relative'
          }}
        >
          {modules.map((module, index) => (
            <FadeInSection key={module.title} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '20px',
                  padding: '2.5rem 2rem',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#c7d2fe';
                  e.currentTarget.style.boxShadow = `0 25px 50px ${module.color}33`;
                  const bar = e.currentTarget.querySelector('.gradient-bar');
                  if (bar) bar.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
                  const bar = e.currentTarget.querySelector('.gradient-bar');
                  if (bar) bar.style.opacity = '0';
                }}
              >
                {/* Top gradient accent */}
                <div 
                  className="gradient-bar"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${module.color} 0%, ${module.color}aa 100%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }} 
                />
                
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1.25rem',
                  display: 'inline-block'
                }}>
                  {module.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem' }}>
                  {module.title}
                </h3>
                <p style={{ fontSize: '1rem', color: '#6b7280', lineHeight: 1.7 }}>
                  {module.description}
                </p>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ===== SECTION 3: GLOBAL IMPACT STATS ===== */}
      <section style={{ 
        ...sectionStyle, 
        textAlign: 'center',
        background: 'linear-gradient(180deg, #888888 0%, #808080 100%)',
        padding: '7rem 1.5rem'
      }}>
        <FadeInSection>
          <p style={{ fontSize: '0.875rem', color: '#8b5cf6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
            Global scale
          </p>
          <h2 style={{ ...subheadingStyle, marginBottom: '4rem' }}>The blockchain infrastructure for charity worldwide</h2>
        </FadeInSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {stats.map((stat, index) => {
            const gradients = [
              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
            ];
            return (
              <FadeInSection key={stat.label} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  style={{ cursor: 'default' }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(3rem, 6vw, 4rem)',
                      fontWeight: 700,
                      background: gradients[index],
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      marginBottom: '0.75rem',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '1.05rem', color: '#6b7280', fontWeight: 500 }}>{stat.label}</div>
                </motion.div>
              </FadeInSection>
            );
          })}
        </div>
      </section>

      {/* ===== VISUAL SHOWCASE WITH FLOATING IMAGE ===== */}
      <section style={{ ...sectionStyle, background: '#888888', padding: '7rem 1.5rem', overflow: 'visible' }}>
        <FadeInSection>
          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '24px',
                padding: '2.5rem',
                boxShadow: '0 50px 120px rgba(0,0,0,0.15)',
                transform: 'perspective(1000px) rotateY(-2deg) rotateX(2deg)'
              }}
            >
              <img 
                src={heroImage} 
                alt="Platform dashboard interface" 
                style={{ 
                  width: '100%', 
                  borderRadius: '12px',
                  display: 'block'
                }} 
              />
            </motion.div>
          </div>
        </FadeInSection>
      </section>

      {/* ===== SECTION 4: TRUSTED BY COMMUNITIES ===== */}
      <section style={{ ...sectionStyle, background: '#888888', padding: '7rem 1.5rem' }}>
        <FadeInSection>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#8b5cf6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
              Enterprise reinvention
            </p>
            <h2 style={subheadingStyle}>Bring agility to your charity operations</h2>
            <p style={{ ...bodyTextStyle, margin: '1rem auto 0' }}>
              Real stories from organizations building trust with blockchain transparency.
            </p>
          </div>
        </FadeInSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: '1100px',
            margin: '3rem auto 0',
          }}
        >
          {impactStories.map((story, index) => (
            <FadeInSection key={story.org} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.12)';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                {story.image && (
                  <div style={{ overflow: 'hidden', height: '220px' }}>
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      src={story.image} 
                      alt={story.org}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                )}
                <div style={{ padding: '2.5rem' }}>
                  <p
                    style={{
                      fontSize: '1.05rem',
                      color: '#374151',
                      lineHeight: 1.8,
                      marginBottom: '2rem',
                      fontStyle: 'italic',
                    }}
                  >
                    {story.quote}
                  </p>
                  <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1.25rem' }}>
                    <div style={{ fontWeight: 600, color: '#111827', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                      {story.org}
                    </div>
                    <button
                      onClick={() => navigate(story.link)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#6366f1',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.gap = '0.75rem'}
                      onMouseLeave={(e) => e.currentTarget.style.gap = '0.5rem'}
                    >
                      See how they used our platform <span>→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ===== SECTION 5: FOR EVERYONE ===== */}
      <section style={{ ...sectionStyle, padding: '7rem 1.5rem', background: '#888888' }}>
        <FadeInSection>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#8b5cf6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
              Built for growth
            </p>
            <h2 style={subheadingStyle}>For everyone</h2>
            <p style={{ ...bodyTextStyle, margin: '1rem auto 0' }}>
              Whether you're giving, organizing, building, or verifying — we've got you covered.
            </p>
          </div>
        </FadeInSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '3rem auto 0',
          }}
        >
          {userTypes.map((user, index) => (
            <FadeInSection key={user.type} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -8 }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '20px',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>{user.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
                  {user.type}
                </h3>
                <p style={{ fontSize: '1.05rem', color: '#6366f1', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {user.benefit}
                </p>
                <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.6 }}>
                  {user.description}
                </p>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ===== SECTION 6: DESIGNED FOR DEVELOPERS ===== */}
      <section style={{ ...sectionStyle, background: '#0f172a', color: '#ffffff', padding: '7rem 1.5rem', maxWidth: '100%' }}>
        <FadeInSection>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem', maxWidth: '1200px', margin: '0 auto 3rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#a78bfa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
              Designed for developers
            </p>
            <h2 style={{ ...subheadingStyle, color: '#ffffff', fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}>
              Open-source, extensible, and built with modern tooling
            </h2>
            <p style={{ ...bodyTextStyle, color: 'rgba(255,255,255,0.7)', margin: '1rem auto 0', fontSize: '1.05rem' }}>
              Build custom experiences with our public API and smart contracts.
            </p>
          </div>
        </FadeInSection>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {devFeatures.map((feature, index) => (
            <FadeInSection key={feature.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '2rem 2.5rem',
                  textAlign: 'center',
                  minWidth: '240px',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500, lineHeight: 1.5 }}>
                  {feature.title}
                </p>
              </motion.div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button
              style={{
                background: '#f8a5c2',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={() => window.open('https://github.com', '_blank')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3a6b7';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8a5c2';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              View documentation →
            </button>
          </div>
        </FadeInSection>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section style={{ 
        ...sectionStyle, 
        textAlign: 'center', 
        paddingBottom: '10rem',
        paddingTop: '10rem',
        background: '#888888'
      }}>
        <FadeInSection>
          <h2 style={{ ...subheadingStyle, marginBottom: '1.25rem', fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}>
            Ready to make an impact?
          </h2>
          <p style={{ ...bodyTextStyle, margin: '0 auto 3rem', fontSize: '1.125rem' }}>
            Join thousands of donors and organizations building trust through transparency.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              style={{ ...primaryButtonStyle, fontSize: '1.05rem', padding: '1.1rem 2.25rem' }}
              onClick={() => navigate('/donate')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3a6b7';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(248, 165, 194, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8a5c2';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Get started
            </button>
            <button
              style={{ ...secondaryButtonStyle, fontSize: '1.05rem', padding: '1.1rem 2.25rem' }}
              onClick={() => navigate('/about')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3a6b7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8a5c2';
              }}
            >
              Contact sales
            </button>
          </div>
        </FadeInSection>
      </section>
    </main>
  );
};

export default Home;
