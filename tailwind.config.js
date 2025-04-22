module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'custom-light-blue': 'rgb(60, 156, 204)',
        'custom-dark-blue': 'rgb(31, 91, 121)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

