import React from 'react';
import { motion } from 'framer-motion';
import { IoFlashOutline } from 'react-icons/io5';

/**
 * GasFeeDisplay Component - Display và select gas fee
 * 
 * Features:
 * - Speed selector pills (Slow, Normal, Fast)
 * - Dynamic fee calculation
 * - Time estimate
 * - Gas pump icon với glow
 */

const GasFeeDisplay = ({ 
  selectedSpeed = 'normal', 
  onSpeedChange,
  amount = 0,
}) => {
  const gasOptions = [
    {
      speed: 'slow',
      label: 'Slow',
      fee: 0.001,
      time: '~5 mins',
    },
    {
      speed: 'normal',
      label: 'Normal',
      fee: 0.002,
      time: '~2 mins',
    },
    {
      speed: 'fast',
      label: 'Fast',
      fee: 0.004,
      time: '~30 secs',
    },
  ];

  const currentOption = gasOptions.find(opt => opt.speed === selectedSpeed) || gasOptions[1];
  const usdRate = 2500; // Mock ETH/USD rate
  const feeUSD = (currentOption.fee * usdRate).toFixed(2);

  return (
    <motion.div
      style={{
        background: '#ffffff',
        border: '1px solid #f3f4f6',
        borderRadius: '12px',
        padding: '18px',
        boxShadow: '0 16px 44px rgba(15, 23, 42, 0.08)',
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        color: '#0f172a',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.25rem',
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            background: '#f9fafb',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)',
          }}
        >
          <IoFlashOutline size={20} color="#111827" />
        </div>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#111827' }}>Gas Fee</div>
          <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Chọn tốc độ giao dịch</div>
        </div>
      </div>

      {/* Speed Selector Pills */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
          marginBottom: '1.25rem',
        }}
      >
        {gasOptions.map((option) => {
          const isSelected = selectedSpeed === option.speed;
          
          return (
            <motion.button
              key={option.speed}
              onClick={() => onSpeedChange(option.speed)}
              style={{
                padding: '12px 8px',
                background: isSelected ? '#f9fafb' : '#ffffff',
                border: isSelected ? '1px solid #d1d5db' : '1px solid #e5e7eb',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                textAlign: 'center',
                boxShadow: isSelected
                  ? '0 14px 34px rgba(15, 23, 42, 0.1)'
                  : '0 8px 20px rgba(15, 23, 42, 0.05)',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#111827',
                  marginBottom: '0.15rem',
                }}
              >
                {option.label}
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                }}
              >
                {option.time}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Fee Display */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px',
          background: '#f9fafb',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            fontSize: '0.95rem',
            color: '#6b7280',
          }}
        >
          Estimated Fee:
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '2px',
            }}
          >
            ~{currentOption.fee.toFixed(4)} ETH
          </div>
          <div
            style={{
              fontSize: '0.85rem',
              color: '#6b7280',
            }}
          >
            (${feeUSD})
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GasFeeDisplay;
