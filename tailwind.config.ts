import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kraft: {
          50: '#F9F6F0',
          100: '#F2ECE1',
          200: '#E5D8C3',
          300: '#D5C1A2',
          400: '#C5A980',
          500: '#B89A72', // Primary Natural Kraft
          600: '#9E7E55',
          700: '#7E6341',
          800: '#5F4A30',
          900: '#413220',
        },
        charcoal: {
          50: '#F6F6F5',
          100: '#E7E7E5',
          200: '#CECDC9',
          300: '#AEACA6',
          400: '#6B6862',
          500: '#3D3B37',
          600: '#2B2925',
          700: '#21201D',
          800: '#171614', // Primary Dark Charcoal
          900: '#0E0D0C',
        },
        ivory: {
          50: '#FAF8F5',
          100: '#F5F0E7', // Warm Ivory Primary
          200: '#ECE3D4',
          300: '#E0D2BD',
          400: '#CEBA9E',
        },
        earth: {
          50: '#F6F4F2',
          100: '#E8E3DF',
          200: '#D1C6BD',
          300: '#B29F91',
          400: '#8A7363',
          500: '#5A4634', // Earth Brown Primary
          600: '#483729',
          700: '#382B20',
          800: '#271E16',
          900: '#16110D',
        },
        copper: {
          50: '#FAF3EE',
          100: '#F4E4D8',
          200: '#E8C7B0',
          300: '#D9A482',
          400: '#C08157',
          500: '#A66A3F', // Antique Copper Accent
          600: '#8C532E',
          700: '#703F21',
          800: '#552F17',
        },
        sage: {
          50: '#F4F5F3',
          100: '#E6E8E3',
          200: '#CBD0C6',
          300: '#ACB4A3',
          400: '#8C9781',
          500: '#65705D', // Muted Sage Green
          600: '#50594A',
          700: '#3D4438',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        editorial: '.12em',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(23, 22, 20, 0.04)',
        'elevated': '0 8px 30px rgba(23, 22, 20, 0.08)',
        'kraft': '0 12px 40px -10px rgba(184, 154, 114, 0.25)',
      }
    },
  },
  plugins: [],
};

export default config;
