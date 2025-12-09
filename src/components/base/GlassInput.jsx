import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../styles/liquidGlass';

/**
 * GlassInput Component - Liquid glass input field
 * 
 * Features:
 * - Glass background với backdrop blur
 * - Focus state với inner glow
 * - Icon support (left/right)
 * - Error state với red glow
 * - Placeholder animation
 * - Label floating effect
 * 
 * @param {string} type - Input type (text, email, number, password, etc.)
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {React.ReactNode} icon - Icon component
 * @param {string} iconPosition - 'left' | 'right'
 * @param {boolean} error - Error state
 * @param {string} errorMessage - Error message text
 * @param {string} label - Label text (floating label)
 * @param {boolean} disabled - Disabled state
 */
const GlassInput = ({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  icon = null,
  iconPosition = 'left',
  error = false,
  errorMessage = '',
  label = '',
  disabled = false,
  className = '',
  style = {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Input container style
  const containerStyle = {
    position: 'relative',
    width: '100%',
  };

  // Input wrapper style (glass effect)
  const wrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    background: COLORS.glass.light,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: error
      ? `1px solid ${COLORS.glow.red}`
      : isFocused
      ? `1px solid ${COLORS.glow.blue}`
      : `1px solid ${COLORS.border.default}`,
    borderRadius: '12px',
    boxShadow: error
      ? `0 4px 16px ${COLORS.shadow}, 0 0 20px ${COLORS.glow.red}`
      : isFocused
      ? `0 4px 16px ${COLORS.shadow}, 0 0 20px ${COLORS.glow.blue}`
      : `0 4px 16px ${COLORS.shadow}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    ...style,
  };

  // Input field style
  const inputStyle = {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: COLORS.text.light,
    fontSize: '1rem',
    fontFamily: 'inherit',
    '::placeholder': {
      color: COLORS.text.muted,
    },
  };

  // Icon container style
  const iconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: error ? COLORS.glow.red : isFocused ? COLORS.glow.blue : COLORS.text.secondary,
    transition: 'color 0.3s ease',
  };

  return (
    <div style={containerStyle} className={className}>
      {/* Floating label */}
      {label && (
        <motion.label
          style={{
            position: 'absolute',
            left: icon && iconPosition === 'left' ? '3rem' : '1rem',
            top: isFocused || value ? '-0.5rem' : '0.875rem',
            fontSize: isFocused || value ? '0.75rem' : '1rem',
            color: error ? COLORS.glow.red : isFocused ? COLORS.glow.blue : COLORS.text.secondary,
            background: isFocused || value ? COLORS.glass.medium : 'transparent',
            padding: isFocused || value ? '0 0.5rem' : '0',
            borderRadius: '4px',
            backdropFilter: isFocused || value ? 'blur(10px)' : 'none',
            pointerEvents: 'none',
            zIndex: 1,
          }}
          animate={{
            top: isFocused || value ? '-0.5rem' : '0.875rem',
            fontSize: isFocused || value ? '0.75rem' : '1rem',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {label}
        </motion.label>
      )}

      {/* Input wrapper */}
      <motion.div
        style={wrapperStyle}
        animate={{
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Icon left */}
        {icon && iconPosition === 'left' && (
          <div style={iconStyle}>{icon}</div>
        )}

        {/* Input field */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={inputStyle}
          {...props}
        />

        {/* Icon right */}
        {icon && iconPosition === 'right' && (
          <div style={iconStyle}>{icon}</div>
        )}
      </motion.div>

      {/* Error message */}
      {error && errorMessage && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '0.5rem',
            fontSize: '0.875rem',
            color: COLORS.glow.red,
            paddingLeft: '0.5rem',
          }}
        >
          {errorMessage}
        </motion.p>
      )}
    </div>
  );
};

// Thêm CSS cho placeholder
const style = document.createElement('style');
style.textContent = `
  input::placeholder {
    color: var(--text-muted);
    opacity: 0.7;
  }
  input:focus::placeholder {
    opacity: 0.5;
  }
`;
document.head.appendChild(style);

export default GlassInput;
