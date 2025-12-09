import React from 'react';
import { motion } from 'framer-motion';
import { COLORS, createMaxWidth } from '../../styles/liquidGlass';

/**
 * GlassContainer Component - Frosted glass container với responsive constraints
 * 
 * Features:
 * - Frosted glass background
 * - Max width constraints (mobile, tablet, desktop, wide)
 * - Responsive padding
 * - Optional blur effect
 * - Centered layout
 * 
 * @param {React.ReactNode} children - Container content
 * @param {string} maxWidth - 'mobile' | 'tablet' | 'desktop' | 'wide' | 'full'
 * @param {string} padding - Padding size: 'none' | 'sm' | 'md' | 'lg' | 'xl'
 * @param {string} blur - Blur level: 'none' | 'light' | 'medium' | 'heavy'
 * @param {boolean} glass - Enable glass effect
 * @param {string} className - Additional CSS classes
 */
const GlassContainer = ({
  children,
  maxWidth = 'desktop',
  padding = 'md',
  blur = 'medium',
  glass = false,
  className = '',
  style = {},
  ...props
}) => {
  // Padding sizes
  const paddingSizes = {
    none: '0',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  };

  // Blur levels
  const blurLevels = {
    none: 'blur(0px)',
    light: 'blur(10px)',
    medium: 'blur(20px)',
    heavy: 'blur(40px)',
  };

  const containerStyle = {
    width: '100%',
    maxWidth: createMaxWidth(maxWidth),
    margin: '0 auto',
    padding: paddingSizes[padding] || paddingSizes.md,
    position: 'relative',
    ...(glass && {
      background: COLORS.glass.light,
      backdropFilter: blurLevels[blur],
      WebkitBackdropFilter: blurLevels[blur],
      border: `1px solid ${COLORS.border.default}`,
      borderRadius: '16px',
      boxShadow: `0 8px 32px ${COLORS.shadow}`,
    }),
    ...style,
  };

  return (
    <motion.div
      className={`glass-container ${className}`}
      style={containerStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassContainer;
