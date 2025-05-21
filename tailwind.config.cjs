import { heroui } from '@heroui/theme';

const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-background': "url('/public/assets/background.jpg')",
      },
      fontFamily: {
        sans: ['Bebas Neue', 'var(--font-sans)'],
        mono: ['var(--font-mono)'],
        garamond: ['EB Garamond', 'serif'],
        arial: ['Arial', 'sans-serif'],
        
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
      },
      fontSize: {
        heading: 'var(--font-heading-size)',
        subheading: 'var(--font-subheading-size)',
      },
      fontWeight: {
        heading: 'var(--font-heading-weight)',
        subheading: 'var(--font-subheading-weight)',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};

// function addVariablesForColors({ addBase, theme } : any) {
//   let allColors = flattenColorPalette(theme("colors"));
//   let newVars = Object.fromEntries(
//     Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
//   );

//   addBase({
//     ":root": newVars,
//   });
// }
