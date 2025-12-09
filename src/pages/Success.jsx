import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IoCheckmarkCircle,
  IoCopyOutline,
  IoCheckmark,
  IoWalletOutline,
  IoRepeat,
  IoOpenOutline,
} from 'react-icons/io5';
import { SiEthereum } from 'react-icons/si';

/**
 * Success Page - Transaction success với confetti animation
 * 
 * Features:
 * - Confetti particles
 * - Transaction details với copy
 * - Action buttons
 * - Animated checkmark
 */

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transaction, campaign } = location.state || {};
  
  const [copied, setCopied] = useState(false);
  const [confettiParticles] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      size: 8 + Math.random() * 14,
      color: ['#111827', '#1f2937', '#4b5563'][Math.floor(Math.random() * 3)],
    }))
  );

  // Redirect if no transaction data
  useEffect(() => {
    if (!transaction) {
      navigate('/campaigns');
    }
  }, [transaction, navigate]);

  if (!transaction) return null;

  // Handle copy transaction hash
  const handleCopy = () => {
    navigator.clipboard.writeText(transaction.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div
      style={{
        background: '#f5f5f7',
        minHeight: '100vh',
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        padding: '64px 20px 88px',
        color: '#0f172a',
      }}
    >
      <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
        {/* Confetti Particles */}
        {confettiParticles.map((particle) => (
          <motion.div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: '-50px',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.color,
              borderRadius: '50%',
              boxShadow: '0 0 12px rgba(15, 23, 42, 0.12)',
              zIndex: 1,
            }}
            initial={{ 
              y: -50, 
              opacity: 1,
              rotate: 0,
            }}
            animate={{ 
              y: window.innerHeight + 100,
              opacity: [1, 1, 0],
              rotate: particle.rotation,
            }}
            transition={{ 
              duration: particle.duration,
              delay: particle.delay,
              ease: 'easeIn',
            }}
          />
        ))}

        {/* Success Card */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 2,
              background: '#ffffff',
              border: '1px solid #f3f4f6',
              borderRadius: '18px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 24px 60px rgba(15, 23, 42, 0.1)',
          }}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Success Icon */}
          <motion.div
            style={{
              width: '108px',
              height: '108px',
              margin: '0 auto 28px',
              background: '#f9fafb',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e5e7eb',
              boxShadow: '0 16px 44px rgba(15, 23, 42, 0.12)',
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.2,
              duration: 0.6,
              type: 'spring',
              stiffness: 200,
            }}
          >
            <IoCheckmarkCircle size={62} color="#111827" />
          </motion.div>

          {/* Success Title */}
          <motion.h1
            style={{
              fontSize: 'clamp(30px, 5vw, 34px)',
              fontWeight: 500,
              color: '#111827',
              marginBottom: '8px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Donation thành công!
          </motion.h1>

          <motion.p
            style={{
              fontSize: '1.05rem',
              color: '#4b5563',
              marginBottom: '28px',
              lineHeight: 1.6,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Transaction của bạn đã được ghi lên blockchain
          </motion.p>

          {/* Transaction Details */}
          <motion.div
            style={{
              background: '#f9fafb',
              borderRadius: '14px',
              padding: '22px',
              marginBottom: '22px',
              textAlign: 'left',
              border: '1px solid #e5e7eb',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Campaign Name */}
            {campaign && (
              <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '6px' }}>
                  Chiến dịch
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827' }}>
                  {campaign.title}
                </div>
              </div>
            )}

            {/* Amount */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '6px' }}>
                Số tiền
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SiEthereum size={22} color="#111827" />
                <span style={{ fontSize: '1.65rem', fontWeight: 700, color: '#111827' }}>
                  {transaction.amount} ETH
                </span>
              </div>
            </div>

            {/* Transaction Hash */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '6px' }}>
                Transaction Hash
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '12px',
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                }}
              >
                <span
                  style={{
                    flex: 1,
                    fontSize: '0.95rem',
                    color: '#4b5563',
                    fontFamily: 'monospace',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {transaction.hash}
                </span>
                <button
                  onClick={handleCopy}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: copied ? '#111827' : '#6b7280',
                    cursor: 'pointer',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {copied ? <IoCheckmark size={20} /> : <IoCopyOutline size={20} />}
                </button>
              </div>
            </div>

            {/* Block Number */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '6px' }}>
                Block Number
              </div>
              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#111827',
                  fontFamily: 'monospace',
                }}
              >
                #{transaction.blockNumber}
              </div>
            </div>

            {/* Gas Used */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '6px' }}>
                Gas Used
              </div>
              <div style={{ fontSize: '1rem', color: '#4b5563' }}>
                {transaction.gasUsed} Gwei ({transaction.gasFee} ETH)
              </div>
            </div>

            {/* Timestamp */}
            <div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '6px' }}>
                Thời gian
              </div>
              <div style={{ fontSize: '1rem', color: '#4b5563' }}>
                {formatDate(transaction.timestamp)}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* View on Etherscan */}
            <button
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px 14px',
                fontWeight: 600,
                color: '#111827',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.75)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onClick={() => window.open(`https://etherscan.io/tx/${transaction.hash}`, '_blank')}
            >
              <IoOpenOutline size={18} />
              View Etherscan
            </button>

            <button
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px 14px',
                fontWeight: 600,
                color: '#111827',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.75)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onClick={() => navigate('/my-wallet')}
            >
              <IoWalletOutline size={18} />
              My Wallet
            </button>

            <button
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px 14px',
                fontWeight: 600,
                color: '#111827',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.75)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onClick={() => navigate('/donate')}
            >
              <IoRepeat size={18} />
              Donate Again
            </button>
          </motion.div>
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          style={{
            marginTop: '20px',
            textAlign: 'center',
            color: '#4b5563',
            fontSize: '0.95rem',
            lineHeight: 1.6,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>
            Cảm ơn bạn đã đóng góp vào chiến dịch! 🙏
          </p>
          <p style={{ marginTop: '8px', color: '#6b7280' }}>
            Transaction này đã được ghi lên blockchain và có thể xem trên Etherscan
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;