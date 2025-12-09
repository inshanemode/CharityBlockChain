// Liquid Glass Design System - Apple Style
// Color palette và constants cho blockchain charity website

// ============ COLOR PALETTE ============
export const COLORS = {
  // Glass base colors với transparency
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
    heavy: 'rgba(255, 255, 255, 0.3)',
  },
  
  // Border colors - subtle và elegant
  border: {
    default: 'rgba(255, 255, 255, 0.18)',
    hover: 'rgba(255, 255, 255, 0.3)',
    focus: 'rgba(99, 179, 237, 0.5)',
  },
  
  // Glow colors cho blockchain theme
  glow: {
    blue: 'rgba(99, 179, 237, 0.5)',      // Ethereum blue
    purple: 'rgba(168, 85, 247, 0.5)',    // Web3 purple
    green: 'rgba(52, 211, 153, 0.5)',     // Success green
    cyan: 'rgba(34, 211, 238, 0.5)',      // Blockchain cyan
    orange: 'rgba(251, 146, 60, 0.5)',    // Warning orange
    red: 'rgba(239, 68, 68, 0.5)',        // Error red
  },
  
  // Text colors
  text: {
    dark: '#1F2937',
    light: 'rgba(255, 255, 255, 0.9)',
    secondary: 'rgba(255, 255, 255, 0.7)',
    muted: 'rgba(255, 255, 255, 0.5)',
  },
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.3)',
};

// ============ GLASS EFFECT PRESETS ============
export const GLASS_PRESETS = {
  light: {
    background: COLORS.glass.light,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${COLORS.border.default}`,
    boxShadow: `0 4px 16px ${COLORS.shadow}`,
  },
  
  medium: {
    background: COLORS.glass.medium,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${COLORS.border.default}`,
    boxShadow: `0 8px 32px ${COLORS.shadow}`,
  },
  
  heavy: {
    background: COLORS.glass.heavy,
    backdropFilter: 'blur(40px)',
    border: `1px solid ${COLORS.border.default}`,
    boxShadow: `0 12px 48px ${COLORS.shadowDark}`,
  },
};

// ============ ANIMATION CONSTANTS ============
export const ANIMATIONS = {
  // Timing functions
  duration: {
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    verySlow: '800ms',
  },
  
  // Easing functions
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Transform scales
  scale: {
    hover: 1.02,
    active: 0.98,
    modal: 0.95,
  },
};

// ============ GLOW EFFECTS ============
export const GLOW_EFFECTS = {
  subtle: (color) => `0 0 20px ${color}`,
  medium: (color) => `0 0 40px ${color}, 0 0 20px ${color}`,
  strong: (color) => `0 0 60px ${color}, 0 0 40px ${color}, 0 0 20px ${color}`,
  
  // Pulse glow animation values
  pulse: {
    from: '0 0 20px',
    to: '0 0 40px',
  },
};

// ============ BORDER STYLES ============
export const BORDER_STYLES = {
  default: `1px solid ${COLORS.border.default}`,
  hover: `1px solid ${COLORS.border.hover}`,
  
  // Gradient borders
  gradient: {
    blue: 'linear-gradient(135deg, rgba(99, 179, 237, 0.3), rgba(168, 85, 247, 0.3))',
    green: 'linear-gradient(135deg, rgba(52, 211, 153, 0.3), rgba(34, 211, 238, 0.3))',
    purple: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))',
  },
};

// ============ BACKDROP BLUR LEVELS ============
export const BLUR_LEVELS = {
  none: 'blur(0px)',
  minimal: 'blur(5px)',
  light: 'blur(10px)',
  medium: 'blur(20px)',
  heavy: 'blur(40px)',
  extreme: 'blur(60px)',
};

// ============ SPACING SYSTEM ============
export const SPACING = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
};

// ============ BREAKPOINTS ============
export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
};

// ============ Z-INDEX LAYERS ============
export const Z_INDEX = {
  base: 1,
  dropdown: 10,
  sticky: 100,
  modal: 1000,
  tooltip: 1500,
  notification: 2000,
};

// ============ HELPER FUNCTIONS ============

// Tạo glass style object từ preset
export const createGlassStyle = (variant = 'medium', customProps = {}) => ({
  ...GLASS_PRESETS[variant],
  ...customProps,
});

// Tạo glow effect với color
export const createGlowEffect = (color, intensity = 'medium') => ({
  boxShadow: GLOW_EFFECTS[intensity](color),
});

// Tạo transition string
export const createTransition = (properties = ['all'], duration = 'normal', easing = 'default') => {
  const durationValue = ANIMATIONS.duration[duration] || duration;
  const easingValue = ANIMATIONS.easing[easing] || easing;
  return properties.map(prop => `${prop} ${durationValue} ${easingValue}`).join(', ');
};

// Tạo responsive max-width
export const createMaxWidth = (size = 'desktop') => {
  const widths = {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
    full: '100%',
  };
  return widths[size] || size;
};

export default {
  COLORS,
  GLASS_PRESETS,
  ANIMATIONS,
  GLOW_EFFECTS,
  BORDER_STYLES,
  BLUR_LEVELS,
  SPACING,
  BREAKPOINTS,
  Z_INDEX,
  createGlassStyle,
  createGlowEffect,
  createTransition,
  createMaxWidth,
};
