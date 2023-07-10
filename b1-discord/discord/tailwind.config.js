/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        discord: ['gg sans', 'sans-serif'],
      },
    },
    colors: {
      gray: {
        light: '#949ba4',
        dark: '#60676f',
        darker: '#4a4c53',
      },
      white: '#ffffff',
    },
  },
  plugins: [],
}
