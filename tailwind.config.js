/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#81D8D0",
        "primary-dark": "#6ac7be",
        "primary-deep": "#000000",
        "surface": "#FFFFFF",
      },
      fontFamily: {
        "headline": ["var(--font-heading-family)", "sans-serif"],
        "custom": ["var(--font-custom-family)", "serif"],
        "body": ["var(--font-body-family)", "sans-serif"],
        "label": ["var(--font-body-family)", "sans-serif"],
        "heading": ["var(--font-heading-family)", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "full": "9999px"
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
