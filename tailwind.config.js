/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'alpha-blue': '#2563eb',
        'alpha-light-blue': '#87CEEB',
        'ocean-blue': '#0284c7',
        'chat-gray': '#F5F5F5',
        'modal-bg': 'rgba(0,0,0,0.6)',
        'wave-ring-from': '#4F9DE8',
        'wave-ring-to': '#84C5FF',
        'reaction-heart': '#ef4444',
        'reaction-flame': '#f97316',
        'reaction-thumb': '#3b82f6',
        'success-green': '#22c55e',
        'cancel-gray': '#e5e7eb'
      },
      fontFamily: {
        'sf': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 10px rgba(0,0,0,0.05)',
        'modal': '0 6px 20px rgba(0,0,0,0.2)',
        'button': '0 2px 4px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'pulse-reaction': 'pulse 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-in-out',
        'shake': 'shake 0.3s ease-in-out',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        }
      },
      backgroundImage: {
        'wave-gradient-ring': 'linear-gradient(to right, #4F9DE8, #84C5FF)',
        'qr-overlay': "url('/images/qr-frame.png')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp')
  ],
}
