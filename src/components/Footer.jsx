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
        marginTop: '3rem',
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid #e5e7eb',
        color: '#6b7280',
      }}
    >
      {/* Main Footer Content */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(2.25rem, 4vw, 3.25rem) clamp(1rem, 3vw, 1.75rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.1rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 22px rgba(17, 24, 39, 0.08)',
                }}
              >
                <SiEthereum size={24} color={'#0ea5e9'} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#111827',
                  }}
                >
                  Blockchain Charity
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: '0.95rem',
                color: '#6b7280',
                marginBottom: '1.15rem',
                lineHeight: 1.6,
              }}
            >
              Nền tảng từ thiện minh bạch với công nghệ blockchain
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
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
                      width: '40px',
                      height: '40px',
                      background: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6b7280',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 6px 14px rgba(17, 24, 39, 0.08)',
                    }}
                    whileHover={{
                      borderColor: '#cbd5e1',
                      boxShadow: '0 8px 18px rgba(17, 24, 39, 0.12)',
                      color: '#111827',
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '1.05rem',
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
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#111827';
                    e.target.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#6b7280';
                    e.target.style.textDecoration = 'none';
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
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '1.05rem',
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
                    color: '#6b7280',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#111827';
                    e.target.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#6b7280';
                    e.target.style.textDecoration = 'none';
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
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '1.05rem',
              }}
            >
              Nhận thông báo
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.85rem' }}>
              Đăng ký để nhận tin tức về các chiến dịch mới
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '0.9rem 1rem',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  boxShadow: '0 8px 18px rgba(16, 185, 129, 0.18)',
                  color: '#047857',
                  fontWeight: 600,
                }}
              >
                <IoCheckmarkCircle size={22} color={'#10b981'} />
                <span>Đăng ký thành công!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  placeholder="Email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    padding: '0.75rem 0.9rem',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    background: '#ffffff',
                    color: '#111827',
                    fontSize: '0.95rem',
                    boxShadow: '0 6px 14px rgba(17, 24, 39, 0.06)',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0ea5e9';
                    e.target.style.boxShadow = '0 8px 18px rgba(14,165,233,0.18)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = '0 6px 14px rgba(17, 24, 39, 0.06)';
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1.05rem',
                    borderRadius: '12px',
                    border: '1px solid #0ea5e9',
                    background: '#0ea5e9',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 8px 18px rgba(14,165,233,0.25)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#0284c7';
                    e.currentTarget.style.boxShadow = '0 10px 22px rgba(2,132,199,0.28)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#0ea5e9';
                    e.currentTarget.style.boxShadow = '0 8px 18px rgba(14,165,233,0.25)';
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '1.6rem',
            borderTop: '1px solid #e5e7eb',
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
            <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
              © 2025 Blockchain Charity. All rights reserved.
            </div>

            {/* Network Status */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.9rem',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.28)',
                borderRadius: '10px',
                boxShadow: '0 10px 20px rgba(16,185,129,0.18)',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#10b981',
                  borderRadius: '50%',
                  boxShadow: '0 0 0 6px rgba(16,185,129,0.18)',
                }}
              />
              <span style={{ fontSize: '0.85rem', color: '#065f46', fontWeight: 600 }}>
                Ethereum Mainnet
              </span>
            </div>
          </div>

          {/* Legal Links */}
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href={link.path}
                style={{
                  fontSize: '0.85rem',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#6b7280')}
                onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
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