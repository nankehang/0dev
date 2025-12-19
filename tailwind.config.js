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
        hacker: {
          red: '#EF4444',      // Modern red
          darkred: '#DC2626',  // Darker red
          black: '#0F172A',    // Modern dark blue-black
          darkgray: '#1E293B', // Modern dark gray
          gray: '#334155',    // Medium gray
          lightgray: '#64748B', // Light gray
          white: '#F8FAFC',   // Off-white
        },
        matrix: {
          green: '#10B981',   // Modern emerald green
          light: '#34D399',   // Light green
        },
        accent: {
          purple: '#8B5CF6',  // Modern purple accent
          blue: '#3B82F6',    // Modern blue accent
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 3s linear infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px #FF0000, 0 0 10px #FF0000' },
          '50%': { boxShadow: '0 0 20px #FF0000, 0 0 30px #FF0000' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '41.99%': { opacity: '1' },
          '42%': { opacity: '0' },
          '43%': { opacity: '0' },
          '43.01%': { opacity: '1' },
          '47.99%': { opacity: '1' },
          '48%': { opacity: '0' },
          '49%': { opacity: '0' },
          '49.01%': { opacity: '1' },
        },
        'scan': {
          '0%': { top: '0%' },
          '50%': { top: '100%' },
          '100%': { top: '0%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
