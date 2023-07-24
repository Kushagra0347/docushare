/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#583DA1',
        secondary: '#2A70B8',
        tertiary: '#12131A',
        quaternary: '#FAFAFA',
        quinary: '#FFF',
      },
      fontFamily: {
        gladiora: 'gladiora, cursive',
      },
      padding: {
        14: '3.5rem',
      },
    },
  },
  darkMode: 'class',
  plugins: ['tw-elements/dist/plugin.cjs'],
}
