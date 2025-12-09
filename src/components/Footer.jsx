import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  IoLogoGithub,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoDiscord,
  IoCheckmarkCircle,
} from 'react-icons/io5';
import { SiEthereum } from 'react-icons/si';
import GlassInput from './base/GlassInput';
import GlassButton from './base/GlassButton';
import { COLORS } from '../styles/liquidGlass';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const footerLinks = {
    explore: [
      { label: 'Campaigns', path: '/campaigns' },
      { label: 'About', path: '/about' },
      { label: 'Explorer', path: '/explorer' },
      { label: 'My Wallet', path: '/my-wallet' },
    ],
    resources: [
      { label: 'Documentation', path: '#' },
      { label: 'FAQ', path: '#' },
      { label: 'Smart Contract', path: '#' },
      { label: 'API', path: '#' },
    ],
    legal: [
      { label: 'Terms of Service', path: '#' },
      { label: 'Privacy Policy', path: '#' },
    ],
  };

  const socialLinks = [
    { icon: IoLogoGithub, url: '#', label: 'GitHub' },
    { icon: IoLogoTwitter, url: '#', label: 'Twitter' },
    { icon: IoLogoLinkedin, url: '#', label: 'LinkedIn' },
    { icon: IoLogoDiscord, url: '#', label: 'Discord' },
  ];

  return (
    <footer
      style={{
        marginTop: '6rem',
        background: COLORS.glass.heavy,
        backdropFilter: 'blur(40px)',
        borderTop: `1px solid ${COLORS.border.default}`,
      }}
    >
      {/* Main Footer Content */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(3rem, 5vw, 5rem) clamp(1rem, 3vw, 2rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  background: COLORS.glass.medium,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 30px ${COLORS.glow.cyan}`,
                }}
              >
                <SiEthereum size={28} color={COLORS.glow.cyan} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${COLORS.glow.cyan}, ${COLORS.glow.purple})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Blockchain Charity
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: '0.95rem',
                color: COLORS.text.secondary,
                marginBottom: '1.5rem',
                lineHeight: 1.6,
              }}
            >
              Nền tảng từ thiện minh bạch với công nghệ blockchain
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    style={{
                      width: '44px',
                      height: '44px',
                      background: COLORS.glass.light,
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${COLORS.border.default}`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: COLORS.text.secondary,
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    whileHover={{
                      borderColor: COLORS.glow.cyan,
                      boxShadow: `0 4px 16px ${COLORS.shadow}, 0 0 20px ${COLORS.glow.cyan}`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: COLORS.text.light,
                marginBottom: '1.5rem',
              }}
            >
              Khám phá
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {footerLinks.explore.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  style={{
                    fontSize: '0.95rem',
                    color: COLORS.text.secondary,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = COLORS.glow.cyan;
                    e.target.style.textShadow = `0 0 10px ${COLORS.glow.cyan}`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = COLORS.text.secondary;
                    e.target.style.textShadow = 'none';
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources Links */}
          <div>
            <h3
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: COLORS.text.light,
                marginBottom: '1.5rem',
              }}
            >
              Tài nguyên
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {footerLinks.resources.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  style={{
                    fontSize: '0.95rem',
                    color: COLORS.text.secondary,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = COLORS.glow.cyan;
                    e.target.style.textShadow = `0 0 10px ${COLORS.glow.cyan}`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = COLORS.text.secondary;
                    e.target.style.textShadow = 'none';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: COLORS.text.light,
                marginBottom: '1.5rem',
              }}
            >
              Nhận thông báo
            </h3>
            <p style={{ fontSize: '0.9rem', color: COLORS.text.secondary, marginBottom: '1rem' }}>
              Đăng ký để nhận tin tức về các chiến dịch mới
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '1rem',
                  background: COLORS.glass.light,
                  border: `1px solid ${COLORS.glow.green}`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: `0 0 20px ${COLORS.glow.green}`,
                }}
              >
                <IoCheckmarkCircle size={24} color={COLORS.glow.green} />
                <span style={{ color: COLORS.glow.green, fontWeight: 600 }}>
                  Đăng ký thành công!
                </span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.75rem' }}>
                <GlassInput
                  type="email"
                  placeholder="Email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ flex: 1 }}
                />
                <GlassButton type="submit" variant="primary" glow="cyan">
                  Subscribe
                </GlassButton>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: `1px solid ${COLORS.border.default}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            {/* Copyright */}
            <div style={{ fontSize: '0.9rem', color: COLORS.text.muted }}>
              © 2025 Blockchain Charity. All rights reserved.
            </div>

            {/* Network Status */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: COLORS.glass.light,
                border: `1px solid ${COLORS.glow.green}`,
                borderRadius: '8px',
                boxShadow: `0 0 15px ${COLORS.glow.green}`,
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: COLORS.glow.green,
                  borderRadius: '50%',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
              <span style={{ fontSize: '0.85rem', color: COLORS.glow.green, fontWeight: 600 }}>
                Ethereum Mainnet
              </span>
            </div>
          </div>

          {/* Legal Links */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href={link.path}
                style={{
                  fontSize: '0.85rem',
                  color: COLORS.text.muted,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = COLORS.text.secondary)}
                onMouseLeave={(e) => (e.target.style.color = COLORS.text.muted)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;