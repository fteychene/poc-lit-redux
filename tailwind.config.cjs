module.exports = {
  purge: [
    './build/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '2rem'
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    }
  },
  plugins: []
}
