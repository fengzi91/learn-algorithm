module.exports = {
  purge: ['src/views/*/*.vue', 'src/views/*.vue', 'src/App.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {},
    backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
    textColor: ['disabled', 'hover', 'focus'],
    ringWidth: ['hover', 'focus', 'active']
  },
  plugins: []
}
