/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#1FA03F',
        'deep-green': '#0C6E26',
        'light-green': '#E7F6EB',
        'accent-lime': '#7ED957',
        'soil-brown': '#8B6F47',
        'dark-text': '#1A1A1A',
        'gray-text': '#5A5A5A',
      },
      fontFamily: {
        sans: ['Manrope', '-apple-system', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '48px',
        xl: '96px',
      },
      borderRadius: {
        sm: '12px',
        md: '20px',
        lg: '32px',
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'float-reverse': 'float 25s ease-in-out infinite reverse',
        'icon-float': 'iconFloat 4s ease-in-out infinite',
        'phone-float': 'phoneFloat 6s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'slide-down': 'slideDown 0.6s ease',
        'fade-in-up': 'fadeInUp 0.8s ease',
        'underline-expand': 'underlineExpand 0.8s ease 0.5s both',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(50px, 50px) rotate(5deg)' },
          '50%': { transform: 'translate(0, 100px) rotate(-5deg)' },
          '75%': { transform: 'translate(-50px, 50px) rotate(3deg)' },
        },
        iconFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(10deg)' },
        },
        phoneFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        slideDown: {
          from: { transform: 'translateY(-100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        underlineExpand: {
          from: { width: '0' },
          to: { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}
