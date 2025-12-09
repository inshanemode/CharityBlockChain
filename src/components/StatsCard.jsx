import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../styles/liquidGlass';

/**
 * StatsCard Component - Glass card cho statistics
 * 
 * Features:
 * - Large number với count-up animation
 * - Icon với glow color
 * - Glass background
 * - Hover effect với glow increase
 * 
 * @param {string} label - Label text (e.g., "Total Donations")
 * @param {string|number} value - Value to display (e.g., "1,234.56")
 * @param {string} suffix - Suffix after value (e.g., "ETH")
 * @param {React.ReactNode} icon - Icon component
 * @param {string} glow - Glow color: 'blue' | 'purple' | 'green' | 'orange' | 'cyan'
 */
const StatsCard = ({ 
  label, 
  value, 
  suffix = '', 
  icon, 
  glow = 'cyan',
  className = '',
}) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  // Count-up animation on mount
  React.useEffect(() => {
    // Parse value if it's a string with commas
    const numericValue = typeof value === 'string' 
      ? parseFloat(value.replace(/,/g, ''))
      : value;

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = numericValue / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  // Format number với commas
  const formatNumber = (num) => {
    if (suffix === 'ETH') {
      return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const cardStyle = {
    background: COLORS.glass.medium,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1px solid ${COLORS.border.default}`,
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: `0 8px 32px ${COLORS.shadow}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'default',
  };

  return (
    <motion.div
      className={`stats-card ${className}`}
      style={cardStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        boxShadow: `0 12px 40px ${COLORS.shadow}, 0 0 40px ${COLORS.glow[glow]}`,
        y: -4,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Icon với glow */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          background: COLORS.glass.light,
          borderRadius: '12px',
          marginBottom: '1rem',
          color: COLORS.glow[glow],
          boxShadow: `0 0 20px ${COLORS.glow[glow]}`,
        }}
      >
        {icon}
      </div>

      {/* Value - Large number */}
      <div
        style={{
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: 800,
          color: COLORS.text.light,
          marginBottom: '0.5rem',
          lineHeight: 1,
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.5rem',
        }}
      >
        <span>{formatNumber(displayValue)}</span>
        {suffix && (
          <span
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: COLORS.glow[glow],
            }}
          >
            {suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: '0.95rem',
          color: COLORS.text.secondary,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
};

export default StatsCard;
