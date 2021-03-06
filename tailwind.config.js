module.exports = {
  purge: {
    enabled: true,
    content: [
      'src/views/*/*.vue',
      'src/views/*.vue',
      'src/App.vue',
      'src/components/*.vue'
    ],
    options: {
      safelist: [
        'grid-cols-1',
        'grid-cols-2',
        'grid-cols-3',
        'grid-cols-4',
        'grid-cols-5',
        'grid-cols-6'
      ]
    }
  },
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
