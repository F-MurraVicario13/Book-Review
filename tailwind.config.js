/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f6efe2',
        oat: '#eadfcd',
        ink: '#2f241c',
        bark: '#6f4f3a',
        amber: '#bf7a33',
        moss: '#7d8460'
      },
      boxShadow: {
        card: '0 18px 50px rgba(63, 45, 29, 0.10)'
      },
      backgroundImage: {
        grain:
          'radial-gradient(circle at 1px 1px, rgba(95, 72, 48, 0.12) 1px, transparent 0)'
      }
    }
  },
  plugins: []
};
