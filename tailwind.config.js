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
        'text-muted': 'hsl(220, 15%, 65%)',
        'border': 'hsl(220, 15%, 85%)',
        'success': 'hsl(142, 76%, 36%)',
        'warning': 'hsl(38, 92%, 50%)',
        'error': 'hsl(0, 84%, 60%)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220, 15%, 15%, 0.08)',
        'hover': '0 6px 16px hsla(220, 15%, 15%, 0.12)',
        'focus': '0 0 0 3px hsla(200, 90%, 50%, 0.3)',
        'inner': 'inset 0 2px 4px 0 hsla(220, 15%, 15%, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
        'slide-down': 'slideDown 300ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
        'bounce-subtle': 'bounceSubtle 600ms ease-out',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
