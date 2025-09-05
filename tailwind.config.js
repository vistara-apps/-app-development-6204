/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'hsl(220, 15%, 95%)',
        'accent': 'hsl(50, 90%, 60%)',
        'primary': 'hsl(200, 90%, 50%)',
        'surface': 'hsl(0, 0%, 100%)',
        'text-primary': 'hsl(220, 15%, 15%)',
        'text-secondary': 'hsl(220, 15%, 45%)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220, 15%, 15%, 0.08)',
        'hover': '0 6px 16px hsla(220, 15%, 15%, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
      },
    },
  },
  plugins: [],
}