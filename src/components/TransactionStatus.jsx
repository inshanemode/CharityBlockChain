import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoCheckmarkCircle, 
  IoCloseCircle, 
  IoTimeOutline,
  IoHourglassOutline 
} from 'react-icons/io5';
import { COLORS } from '../styles/liquidGlass';

/**
 * TransactionStatus Component - Hiển thị trạng thái transaction
 * 
 * Features:
 * - Multiple states: pending, confirming, success, failed
 * - Animated progress steps
 * - Dynamic glow colors
 * - Loading animations
 */

const TransactionStatus = ({ 
  status = 'pending', // pending | confirming | success | failed
  message = '',
  txHash = '',
  steps = [],
}) => {
  const statusConfig = {
    pending: {
      icon: IoHourglassOutline,
      color: 'orange',
      title: 'Đang xử lý...',
      description: 'Transaction đang được gửi lên blockchain',
      animation: 'pulse',
    },
    confirming: {
      icon: IoTimeOutline,
      color: 'blue',
      title: 'Đang xác nhận...',
      description: 'Chờ blockchain xác nhận transaction',
      animation: 'spin',
    },
    success: {
      icon: IoCheckmarkCircle,
      color: 'green',
      title: 'Thành công!',
      description: 'Transaction đã được xác nhận',
      animation: 'checkmark',
    },
    failed: {
      icon: IoCloseCircle,
      color: 'red',
      title: 'Thất bại',
      description: 'Transaction không thành công',
      animation: 'shake',
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  // Animation variants
  const iconVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    spin: {
      rotate: [0, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      },
    },
    checkmark: {
      scale: [0, 1.2, 1],
      transition: {
        duration: 0.5,
        ease: [0.68, -0.55, 0.265, 1.55],
      },
    },
    shake: {
      x: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      style={{
        background: COLORS.glass.heavy,
        backdropFilter: 'blur(40px)',
        border: `1px solid ${COLORS.glow[config.color]}`,
        borderRadius: '20px',
        padding: '2.5rem',
        textAlign: 'center',
        boxShadow: `0 12px 40px ${COLORS.shadowDark}, 0 0 60px ${COLORS.glow[config.color]}`,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Icon */}
      <motion.div
        style={{
          width: '100px',
          height: '100px',
          margin: '0 auto 1.5rem',
          background: COLORS.glass.medium,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: COLORS.glow[config.color],
          boxShadow: `0 0 40px ${COLORS.glow[config.color]}`,
        }}
        variants={iconVariants}
        animate={config.animation}
      >
        <Icon size={56} />
      </motion.div>

      {/* Title */}
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: COLORS.text.light,
          marginBottom: '0.5rem',
        }}
      >
        {config.title}
      </h2>

      {/* Description */}
      <p
        style={{
          fontSize: '1.1rem',
          color: COLORS.text.secondary,
          marginBottom: message || txHash ? '1.5rem' : 0,
        }}
      >
        {config.description}
      </p>

      {/* Custom Message */}
      {message && (
        <div
          style={{
            padding: '1rem',
            background: COLORS.glass.light,
            borderRadius: '10px',
            fontSize: '0.95rem',
            color: COLORS.text.secondary,
            marginBottom: txHash ? '1rem' : 0,
          }}
        >
          {message}
        </div>
      )}

      {/* Transaction Hash */}
      {txHash && (
        <div
          style={{
            padding: '0.75rem',
            background: COLORS.glass.light,
            borderRadius: '10px',
            fontSize: '0.875rem',
            color: COLORS.glow.cyan,
            fontFamily: 'monospace',
            wordBreak: 'break-all',
          }}
        >
          {txHash}
        </div>
      )}

      {/* Progress Steps */}
      {steps && steps.length > 0 && (
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step dot */}
              <motion.div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: step.completed
                    ? COLORS.glow.green
                    : step.active
                    ? COLORS.glow.blue
                    : COLORS.glass.light,
                  boxShadow: step.completed || step.active
                    ? `0 0 15px ${step.completed ? COLORS.glow.green : COLORS.glow.blue}`
                    : 'none',
                  transition: 'all 0.3s ease',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  style={{
                    width: '40px',
                    height: '2px',
                    background: step.completed
                      ? COLORS.glow.green
                      : COLORS.glass.light,
                    transition: 'all 0.3s ease',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Animated dots for pending/confirming */}
      {(status === 'pending' || status === 'confirming') && (
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '1.5rem',
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: COLORS.glow[config.color],
                boxShadow: `0 0 10px ${COLORS.glow[config.color]}`,
              }}
              animate={{
                y: [-5, 5, -5],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TransactionStatus;
