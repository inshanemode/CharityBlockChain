import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SiEthereum } from 'react-icons/si';
import { IoRocketOutline } from 'react-icons/io5';
import GlassButton from './base/GlassButton';
import { COLORS } from '../styles/liquidGlass';

/**
 * Hero Component - Hero section với animated gradient và floating shapes
 * 
 * Features:
 * - Animated gradient background
 * - Floating abstract shapes
 * - Large glass card với content
 * - CTA buttons
 * - Ethereum icon với glow
 */

// Floating Shape Component
const FloatingShape = ({ size, top, left, delay, color }) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        top,
        left,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        borderRadius: '50%',
        opacity: 0.2,
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(99, 179, 237, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          zIndex: 0,
        }}
        animate={{
          background: [
            'linear-gradient(135deg, rgba(99, 179, 237, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
            'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(99, 179, 237, 0.1) 100%)',
            'linear-gradient(135deg, rgba(99, 179, 237, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating shapes */}
      <FloatingShape size="300px" top="10%" left="5%" delay={0} color={COLORS.glow.blue} />
      <FloatingShape size="250px" top="60%" right="10%" delay={1} color={COLORS.glow.purple} />
      <FloatingShape size="200px" top="30%" right="20%" delay={2} color={COLORS.glow.cyan} />
      <FloatingShape size="180px" bottom="10%" left="15%" delay={1.5} color={COLORS.glow.green} />

      {/* Content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          width: '100%',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Glass card container */}
        <div
          style={{
            background: COLORS.glass.medium,
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: `1px solid ${COLORS.border.hover}`,
            borderRadius: '24px',
            padding: 'clamp(2rem, 5vw, 4rem)',
            boxShadow: `0 20px 60px ${COLORS.shadowDark}, 0 0 100px rgba(99, 179, 237, 0.2)`,
            textAlign: 'center',
          }}
        >
          {/* Ethereum icon với glow */}
          <motion.div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              background: COLORS.glass.heavy,
              borderRadius: '20px',
              marginBottom: '2rem',
              boxShadow: `0 0 60px ${COLORS.glow.cyan}, 0 0 30px ${COLORS.glow.blue}`,
            }}
            animate={{
              boxShadow: [
                `0 0 60px ${COLORS.glow.cyan}, 0 0 30px ${COLORS.glow.blue}`,
                `0 0 80px ${COLORS.glow.cyan}, 0 0 40px ${COLORS.glow.blue}`,
                `0 0 60px ${COLORS.glow.cyan}, 0 0 30px ${COLORS.glow.blue}`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <SiEthereum size={48} color={COLORS.glow.cyan} />
          </motion.div>

          {/* Heading */}
          <motion.h1
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 800,
              marginBottom: '1.5rem',
              background: `linear-gradient(135deg, ${COLORS.glow.cyan}, ${COLORS.glow.purple}, ${COLORS.glow.blue})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Từ thiện minh bạch
            <br />
            với Blockchain
          </motion.h1>

          {/* Subheading */}
          <motion.p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              color: COLORS.text.secondary,
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem',
              lineHeight: 1.6,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Mỗi đồng tiền được ghi nhận vĩnh viễn trên blockchain.
            <br />
            Minh bạch, an toàn, không thể thay đổi.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <GlassButton
              variant="primary"
              size="lg"
              glow="cyan"
              icon={<IoRocketOutline size={24} />}
              iconPosition="left"
              onClick={() => navigate('/campaigns')}
            >
              Bắt đầu quyên góp
            </GlassButton>

            <GlassButton
              variant="outline"
              size="lg"
              glow="purple"
              onClick={() => navigate('/about')}
            >
              Tìm hiểu thêm
            </GlassButton>
          </motion.div>

          {/* Stats preview - mini */}
          <motion.div
            style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: `1px solid ${COLORS.border.default}`,
              flexWrap: 'wrap',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: COLORS.glow.cyan,
                  marginBottom: '0.25rem',
                }}
              >
                1,234+
              </div>
              <div style={{ fontSize: '0.875rem', color: COLORS.text.secondary }}>
                ETH Quyên góp
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: COLORS.glow.purple,
                  marginBottom: '0.25rem',
                }}
              >
                5,678+
              </div>
              <div style={{ fontSize: '0.875rem', color: COLORS.text.secondary }}>
                Giao dịch
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: COLORS.glow.green,
                  marginBottom: '0.25rem',
                }}
              >
                3,456+
              </div>
              <div style={{ fontSize: '0.875rem', color: COLORS.text.secondary }}>
                Người đóng góp
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
