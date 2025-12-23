import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../styles/liquidGlass';

/**
 * GlassButton Component - Liquid glass button với ripple effect
 * 
 * Features:
 * - Glass background với backdrop blur
 * - Ripple effect khi click (như Material Design)
 * - Multiple variants và sizes
 * - Loading state với spinner
 * - Icon support
 * - Hover glow effect
 * 
 * @param {React.ReactNode} children - Button text hoặc content
 * @param {string} variant - 'primary' | 'secondary' | 'outline' | 'ghost'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} glow - Glow color: 'blue' | 'purple' | 'green' | 'cyan'
 * @param {boolean} loading - Loading state
 * @param {boolean} disabled - Disabled state
 * @param {React.ReactNode} icon - Icon component
 * @param {string} iconPosition - 'left' | 'right'
 * @param {function} onClick - Click handler
 */
const GlassButton = ({
  children,
  variant = 'primary',
  size = 'md',
  glow = 'cyan',
  loading = false,
  disabled = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  className = '',
  style = {},
  ...props
}) => {
  const [ripples, setRipples] = useState([]);

  // Handle ripple effect
  const handleClick = (e) => {
    if (disabled || loading) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples([...ripples, newRipple]);

    // Remove ripple sau animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  // Variant styles
  const variantStyles = {
    primary: {
      background: COLORS.glass.medium,
      border: `1px solid ${COLORS.border.default}`,
      color: '#111827', // màu đen đậm
      boxShadow: `0 4px 16px ${COLORS.shadow}, 0 0 20px ${COLORS.glow[glow]}`,
    },
    secondary: {
      background: COLORS.glass.light,
      border: `1px solid ${COLORS.border.default}`,
      color: '#111827', // màu đen đậm
      boxShadow: `0 4px 16px ${COLORS.shadow}`,
    },
    outline: {
      background: 'transparent',
      border: `2px solid ${COLORS.glow[glow]}`,
      color: COLORS.text.light,
      boxShadow: 'none',
    },
    ghost: {
      background: 'transparent',
      border: 'none',
      color: COLORS.text.light,
      boxShadow: 'none',
    },
  };

  // Size styles
  const sizeStyles = {
    sm: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      borderRadius: '8px',
      minHeight: '36px',
    },
    md: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      borderRadius: '12px',
      minHeight: '44px',
    },
    lg: {
      padding: '1rem 2rem',
      fontSize: '1.125rem',
      borderRadius: '16px',
      minHeight: '52px',
    },
  };

  const buttonStyle = {
    ...variantStyles[variant],
    ...sizeStyles[size],
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: 600,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    userSelect: 'none',
    ...style,
  };

  return (
    <motion.button
      className={`glass-button ${className}`}
      style={buttonStyle}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={
        !disabled && !loading
          ? {
              scale: 1.02,
              boxShadow: 'none',
            }
          : {}
      }
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: '0',
            height: '0',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.5)',
            transform: 'translate(-50%, -50%)',
            animation: 'ripple-animation 0.6s ease-out',
          }}
        />
      ))}

      {/* Loading spinner */}
      {loading && (
        <div className="spinner" style={{ width: '16px', height: '16px' }} />
      )}

      {/* Icon left */}
      {icon && iconPosition === 'left' && !loading && (
        <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
      )}

      {/* Button text */}
      {!loading && children}

      {/* Icon right */}
      {icon && iconPosition === 'right' && !loading && (
        <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
      )}

      {/* Hover overlay */}
      {/* Đã loại bỏ overlay hover để không còn hiệu ứng màu xanh khi hover */}
    </motion.button>
  );
};

// Ripple animation CSS (thêm vào inline style)
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-animation {
    to {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

export default GlassButton;
