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
        bg: {
          base: 'var(--color-bg-base)',
          cream: 'var(--color-bg-cream)',
          warm: 'var(--color-bg-warm)',
          dark: 'var(--color-bg-dark)',
          deep: 'var(--color-bg-deep)',
        },
        ink: {
          primary: 'var(--color-ink-primary)',
          secondary: 'var(--color-ink-secondary)',
          muted: 'var(--color-ink-muted)',
          subtle: 'var(--color-ink-subtle)',
        },
        accent: {
          terracotta: {
            DEFAULT: 'var(--color-terracotta)',
            light: 'var(--color-terracotta-light)',
            glow: 'var(--color-terracotta-glow)'
          },
          olive: {
            DEFAULT: 'var(--color-olive)',
            light: 'var(--color-olive-light)',
            glow: 'var(--color-olive-glow)'
          },
          cerulean: {
            DEFAULT: 'var(--color-cerulean)',
            light: 'var(--color-cerulean-light)',
            glow: 'var(--color-cerulean-glow)'
          },
          ochre: {
            DEFAULT: 'var(--color-ochre)',
            light: 'var(--color-ochre-light)'
          }
        }
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['Archivo', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 10vw, 12rem)', { lineHeight: '0.9', fontWeight: '800' }],
        'hero': ['clamp(2.5rem, 7vw, 8rem)', { lineHeight: '0.95', fontWeight: '700' }],
        'heading': ['clamp(2rem, 5vw, 6rem)', { lineHeight: '1', fontWeight: '700' }],
        'subheading': ['clamp(1.25rem, 3vw, 4rem)', { lineHeight: '1.1' }],
        'body-lg': ['clamp(1.125rem, 1.5vw, 1.75rem)', { lineHeight: '1.6' }],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'blob-float': 'blobFloat 25s ease-in-out infinite',
        'organic-float': 'organicFloat 30s ease-in-out infinite',
        'mesh-float': 'meshFloat 25s ease-in-out infinite',
        'draw-path': 'drawPath 10s ease-out infinite',
        'float-1': 'float1 12s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'char-reveal': 'charReveal 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards',
      },
      keyframes: {
        blobFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate(5%, -8%) scale(1.1) rotate(5deg)' },
          '66%': { transform: 'translate(-3%, 5%) scale(0.9) rotate(-5deg)' },
        },
        organicFloat: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(3%, -5%) rotate(2deg)' },
          '50%': { transform: 'translate(-2%, 3%) rotate(-2deg)' },
          '75%': { transform: 'translate(2%, 2%) rotate(1deg)' },
        },
        drawPath: {
          '0%': { strokeDashoffset: '600' },
          '50%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-600' },
        },
        float1: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(20px, -30px) rotate(5deg)' },
          '66%': { transform: 'translate(-10px, 20px) rotate(-3deg)' },
        },
        charReveal: {
          '0%': { opacity: '0', transform: 'translateY(40px) rotateX(15deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, var(--color-accent-terracotta) 0%, var(--color-accent-ochre) 100%)',
        'gradient-cool': 'linear-gradient(135deg, var(--color-accent-cerulean) 0%, var(--color-accent-olive) 100%)',
        'gradient-ethereal': 'linear-gradient(180deg, rgba(196, 69, 54, 0.08) 0%, rgba(74, 143, 168, 0.06) 50%, rgba(107, 124, 92, 0.04) 100%)',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(26, 22, 20, 0.08)',
        'large': '0 20px 60px rgba(26, 22, 20, 0.12)',
        'glow': '0 0 60px rgba(196, 69, 54, 0.25)',
        'inner-glow': 'inset 0 0 20px rgba(196, 69, 54, 0.1)',
      },
      borderRadius: {
        'xl-sm': '1.5rem',
        'inner': 'calc(1.5rem - 2px)',
      },
      transitionTimingFunction: {
        'ethereal': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      zIndex: {
        'cursor': '10000',
        'nav': '1000',
        'overlay': '9000',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
