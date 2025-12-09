import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoSearch, IoWallet, IoSend, IoCheckmarkCircle } from 'react-icons/io5';

/**
 * Demo Page - Showcase tất cả glass components
 * Để test và xem preview các components
 */
const pageStyle = {
  background: '#f5f5f7',
  color: '#0f172a',
  fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
  minHeight: '100vh',
  padding: '64px 20px 88px',
};

const cardStyle = {
  background: '#ffffff',
  border: '1px solid #f3f4f6',
  borderRadius: '14px',
  padding: '20px',
  boxShadow: '0 20px 56px rgba(15, 23, 42, 0.08)',
};

const glassyButton = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1px solid rgba(15, 23, 42, 0.08)',
  background: 'rgba(255,255,255,0.8)',
  color: '#0f172a',
  boxShadow: '0 12px 30px rgba(15,23,42,0.08)',
  backdropFilter: 'blur(14px)',
  cursor: 'pointer',
  fontWeight: 600,
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '10px',
  border: '1px solid #e5e7eb',
  background: '#f9fafb',
  color: '#0f172a',
  fontSize: '1rem',
};

const Demo = () => {
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Components Demo</h1>
        <p style={{ color: '#4b5563', marginBottom: '26px', fontSize: '1.05rem' }}>Minimal preview of buttons, inputs, and modal states.</p>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Buttons</h2>
          <div style={{ ...cardStyle, display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button style={glassyButton}>Primary</button>
              <button style={glassyButton}>Secondary</button>
              <button style={glassyButton}><IoWallet />Connect</button>
              <button style={glassyButton}><IoSend />Send</button>
              <button style={glassyButton}><IoCheckmarkCircle />Success</button>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button style={{ ...glassyButton, opacity: 0.6, cursor: 'not-allowed' }}>Disabled</button>
              <button style={{ ...glassyButton }} onClick={handleLoadingDemo}>{loading ? 'Processing…' : 'Trigger Loading'}</button>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Inputs</h2>
          <div style={{ ...cardStyle, display: 'grid', gap: '12px', maxWidth: '640px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', color: '#4b5563', marginBottom: '6px' }}>Wallet Address</label>
              <input style={inputStyle} placeholder="Enter wallet address…" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', color: '#4b5563', marginBottom: '6px' }}>Search Transaction</label>
              <div style={{ position: 'relative' }}>
                <IoSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input style={{ ...inputStyle, paddingLeft: '36px' }} placeholder="0x..." />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', color: '#4b5563', marginBottom: '6px' }}>Amount (ETH)</label>
              <input style={inputStyle} type="number" placeholder="0.00" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', color: '#4b5563', marginBottom: '6px' }}>Email</label>
              <input style={{ ...inputStyle, borderColor: '#fecdd3', background: '#fff1f2' }} type="email" placeholder="your@email.com" />
              <div style={{ color: '#dc2626', fontSize: '0.9rem', marginTop: '6px' }}>Invalid email address</div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Modal</h2>
          <div style={{ ...cardStyle }}>
            <button style={glassyButton} onClick={() => setIsModalOpen(true)}>Open Modal</button>
            {isModalOpen && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                <div style={{ ...cardStyle, padding: '22px', width: 'min(420px, 90vw)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ fontWeight: 600, color: '#111827' }}>Example Modal</div>
                    <button style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>Close</button>
                  </div>
                  <p style={{ color: '#4b5563', marginBottom: '10px' }}>This is a plain modal with a blurred overlay.</p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <button style={glassyButton} onClick={() => setIsModalOpen(false)}>Cancel</button>
                    <button style={glassyButton} onClick={() => setIsModalOpen(false)}>Confirm</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Motion Samples</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {['Fade In', 'Float', 'Pulse'].map((label, idx) => (
              <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} style={{ ...cardStyle, textAlign: 'center', padding: '18px' }}>
                {label}
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Demo;
