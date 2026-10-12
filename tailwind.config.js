/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#080914',
          surface: '#0E1020',
          card: '#14172A',
          blue: '#4263FF',
          electric: '#38BDF8',
          violet: '#8B5CF6',
          lavender: '#B7A0FF',
          border: 'rgba(255, 255, 255, 0.10)',
          borderHover: 'rgba(139, 92, 246, 0.35)',
          text: '#F8FAFC',
          muted: '#A5ADC2',
          success: '#22C55E',
          error: '#F87171',
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #4263FF 0%, #8B5CF6 50%, #B7A0FF 100%)',
        'subtle-glow': 'radial-gradient(circle at 50% 0%, rgba(66, 99, 255, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(20, 23, 42, 0.8) 0%, rgba(14, 16, 32, 0.95) 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(66, 99, 255, 0.25)',
        'glow-md': '0 0 35px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 60px rgba(66, 99, 255, 0.25)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
