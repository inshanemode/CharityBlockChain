import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoCopyOutline, IoCheckmark, IoOpenOutline } from 'react-icons/io5';
import { COLORS } from '../styles/liquidGlass';
import { formatAddress } from '../data/mockData';

/**
 * AddressDisplay Component
 * 
 * Glass chip hiển thị address với copy button và external link
 * 
 * Props:
 * - address: string (required) - Ethereum address
 * - showFull: boolean - Show full address or shortened
 * - showExternalLink: boolean - Show Etherscan link button
 * - size: 'sm' | 'md' | 'lg' - Size variant
 */

const AddressDisplay = ({ 
  address, 
  showFull = false, 
  showExternalLink = false,
  size = 'md',
}) => {
  const [copied, setCopied] = useState(false);

  if (!address) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExternalLink = () => {
    window.open(`https://etherscan.io/address/${address}`, '_blank');
  };

  const displayAddress = showFull ? address : formatAddress(address);

  // Size variants
  const sizeStyles = {
    sm: {
      padding: '0.5rem 0.75rem',
      fontSize: '1.0rem', // nhỏ lại 1 size
      iconSize: 16,
    },
    md: {
      padding: '0.75rem 1rem',
      fontSize: '1.1rem', // nhỏ lại 1 size
      iconSize: 18,
    },
    lg: {
      padding: '1rem 1.25rem',
      fontSize: '1.2rem', // nhỏ lại 1 size
      iconSize: 20,
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <motion.div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: currentSize.padding,
        background: COLORS.glass.light,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${COLORS.border.default}`,
        borderRadius: '12px',
        fontFamily: 'monospace',
        fontSize: currentSize.fontSize,
        color: COLORS.text.secondary,
        transition: 'all 0.3s ease',
      }}
      whileHover={{
        boxShadow: `0 4px 16px ${COLORS.shadow}, 0 0 20px ${COLORS.glow.cyan}`,
        borderColor: COLORS.glow.cyan,
      }}
    >
      {/* Address text */}
      <span style={{ userSelect: 'all', color: '#111827', fontWeight: 600 }}>
        {displayAddress}
      </span>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        style={{
          background: 'transparent',
          border: 'none',
          color: copied ? COLORS.glow.green : COLORS.text.secondary,
          cursor: 'pointer',
          padding: '0.25rem',
          display: 'flex',
          alignItems: 'center',
          transition: 'color 0.2s ease',
        }}
        title={copied ? 'Copied!' : 'Copy address'}
      >
        {copied ? (
          <IoCheckmark size={currentSize.iconSize} />
        ) : (
          <IoCopyOutline size={currentSize.iconSize} />
        )}
      </button>

      {/* External link button */}
      {showExternalLink && (
        <button
          onClick={handleExternalLink}
          style={{
            background: 'transparent',
            border: 'none',
            color: COLORS.text.secondary,
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            transition: 'color 0.2s ease',
          }}
          title="View on Etherscan"
        >
          <IoOpenOutline size={currentSize.iconSize} />
        </button>
      )}
    </motion.div>
  );
};

export default AddressDisplay;