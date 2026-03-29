/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy:   '#0A1628',
          blue:   '#1E3A5F',
          mid:    '#2D5986',
          gold:   '#D4AF37',
          lgold:  '#F0D060',
          dgold:  '#A88620',
          cream:  '#FDF8EE',
          sand:   '#E8D5A3',
          white:  '#FFFFFF',
        },
        dark: { bg: '#07101E', card: '#111B2E', border: '#1E3A5F' },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['Nunito', 'sans-serif'],
        arabic:  ['Cairo', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient':  'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #A88620 100%)',
        'navy-gradient':  'linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)',
        'hero-gradient':  'linear-gradient(180deg, rgba(10,22,40,0.7) 0%, rgba(10,22,40,0.3) 50%, rgba(10,22,40,0.8) 100%)',
        'card-gradient':  'linear-gradient(180deg, transparent 40%, rgba(10,22,40,0.95) 100%)',
      },
      boxShadow: {
        gold:   '0 4px 24px rgba(212,175,55,0.3)',
        navy:   '0 4px 24px rgba(10,22,40,0.4)',
        card:   '0 8px 32px rgba(10,22,40,0.12)',
        'card-hover': '0 16px 48px rgba(10,22,40,0.2)',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
        'pulse-gold': 'pulseGold 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'slide-up':   'slideUp 0.5s ease-out',
        'fade-in':    'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer:    { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } },
        pulseGold:  { '0%,100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.4)' }, '70%': { boxShadow: '0 0 0 10px rgba(212,175,55,0)' } },
        slideUp:    { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:     { from: { opacity: 0 }, to: { opacity: 1 } },
      },
    },
  },
  plugins: [],
};
