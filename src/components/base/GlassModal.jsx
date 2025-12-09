import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, Z_INDEX } from '../../styles/liquidGlass';
import { IoClose } from 'react-icons/io5';

/**
 * GlassModal Component - Modal với heavy blur backdrop
 * 
 * Features:
 * - Heavy blur backdrop (blur 40px)
 * - Center modal với glass effect
 * - Close button (glass circle)
 * - Animation: fade + scale
 * - Click outside to close
 * - ESC key to close
 * - Scroll lock khi mở
 * 
 * @param {boolean} isOpen - Modal open state
 * @param {function} onClose - Close handler
 * @param {React.ReactNode} children - Modal content
 * @param {string} title - Modal title
 * @param {string} size - 'sm' | 'md' | 'lg' | 'xl'
 * @param {boolean} closeOnBackdrop - Close khi click backdrop
 * @param {boolean} closeButton - Hiển thị close button
 */
const GlassModal = ({
  isOpen,
  onClose,
  children,
  title = '',
  size = 'md',
  closeOnBackdrop = true,
  closeButton = true,
  className = '',
  ...props
}) => {
  // Lock scroll khi modal mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Modal sizes
  const sizes = {
    sm: '400px',
    md: '600px',
    lg: '800px',
    xl: '1000px',
  };

  // Backdrop style
  const backdropStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    zIndex: Z_INDEX.modal,
  };

  // Modal style
  const modalStyle = {
    width: '100%',
    maxWidth: sizes[size] || sizes.md,
    maxHeight: '90vh',
    overflowY: 'auto',
    background: COLORS.glass.heavy,
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: `1px solid ${COLORS.border.hover}`,
    borderRadius: '20px',
    boxShadow: `0 20px 60px ${COLORS.shadowDark}, 0 0 80px ${COLORS.glow.cyan}`,
    position: 'relative',
  };

  // Close button style
  const closeButtonStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: COLORS.glass.medium,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${COLORS.border.default}`,
    borderRadius: '50%',
    color: COLORS.text.light,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 1,
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={backdropStyle}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => {
            if (closeOnBackdrop && e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className={`glass-modal ${className}`}
            style={modalStyle}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {/* Close button */}
            {closeButton && (
              <motion.button
                style={closeButtonStyle}
                onClick={onClose}
                whileHover={{
                  scale: 1.1,
                  boxShadow: `0 4px 16px ${COLORS.shadow}, 0 0 20px ${COLORS.glow.red}`,
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close modal"
              >
                <IoClose size={24} />
              </motion.button>
            )}

            {/* Modal header */}
            {title && (
              <div
                style={{
                  padding: '2rem 2rem 1rem',
                  borderBottom: `1px solid ${COLORS.border.default}`,
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: COLORS.text.light,
                    background: `linear-gradient(135deg, ${COLORS.glow.cyan}, ${COLORS.glow.purple})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {title}
                </h2>
              </div>
            )}

            {/* Modal content */}
            <div style={{ padding: '2rem' }}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlassModal;
