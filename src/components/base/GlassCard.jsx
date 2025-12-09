import React from 'react';
import { motion } from 'framer-motion';
import { COLORS, GLASS_PRESETS } from '../../styles/liquidGlass';

/**
 * GlassCard Component - Apple-style glassmorphism card
 * 
 * Features:
 * - Liquid glass effect với backdrop blur
 * - Multiple variants (light, medium, heavy)
 * - Hover effects với glow
 * - Smooth animations
 * - Gradient borders (optional)
 * 
 * @param {React.ReactNode} children - Content của card
 * @param {string} variant - Glass variant: 'light' | 'medium' | 'heavy'
 * @param {boolean} hover - Enable hover effect
 * @param {string} glow - Glow color: 'blue' | 'purple' | 'green' | 'cyan' | null
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler
 * @param {object} style - Inline styles
 */
const GlassCard = ({
  children,
  variant = 'medium',
  hover = true,
  glow = null,
  className = '',
  onClick,
  style = {},
  ...props
}) => {
  // Lấy preset style theo variant
  const glassStyle = GLASS_PRESETS[variant] || GLASS_PRESETS.medium;
  
  // Tạo glow effect nếu có
  const glowEffect = glow ? {
    boxShadow: `${glassStyle.boxShadow}, 0 0 40px ${COLORS.glow[glow]}`,
  } : {};
  
  // Hover animation variants cho Framer Motion
  const hoverVariants = hover ? {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -4,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  } : {};

  return (
    <motion.div
      className={`glass-card ${className}`}
      style={{
        ...glassStyle,
        ...glowEffect,
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      variants={hoverVariants}
      initial="initial"
      whileHover={hover ? "hover" : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      {...props}
    >
      {/* Gradient overlay - subtle shine effect */}
      {hover && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }}
          className="hover-overlay"
        />
      )}
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
