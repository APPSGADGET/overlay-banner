// Configuration for the overlay banner
export const bannerConfig = {
  // Canvas dimensions
  canvas: {
    width: 1080,
    height: 1350,
    borderRadius: '20px'
  },
  
  // Typography
  fonts: {
    primary: "'Inter', 'Helvetica Neue', sans-serif",
    weights: {
      normal: 400,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    }
  },
  
  // Color schemes
  colors: {
    background: '#0a0a0a',
    surface: '#ffffff',
    overlay: {
      start: 'transparent',
      mid: 'rgba(0, 0, 0, 0.3)',
      end: 'rgba(0, 0, 0, 0.95)'
    },
    text: {
      primary: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)'
    }
  },
  
  // Effects
  effects: {
    shadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
    textShadow: '2px 4px 12px rgba(0, 0, 0, 0.8)',
    border: '2px solid rgba(255, 255, 255, 0.1)'
  },
  
  // Responsive breakpoints
  breakpoints: {
    mobile: '768px',
    tablet: '1024px'
  }
};

export default bannerConfig;