/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D9FF',
        secondary: '#7C3AED',
        success: '#10B981',
        danger: '#EF4444',
        background: '#0A0A0B',
        surface: '#18181B',
        border: 'rgba(255,255,255,0.1)',
        textPrimary: '#FFFFFF',
        textSecondary: '#A1A1AA',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'tech-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'glow-gradient': 'linear-gradient(135deg, #00D9FF 0%, #7C3AED 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': {
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)',
          },
          'to': {
            boxShadow: '0 0 30px rgba(0, 217, 255, 0.8), 0 0 40px rgba(124, 58, 237, 0.3)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}