const { configure } = require('quasar/wrappers');

module.exports = configure(() => ({
  boot: [],
  css: ['app.scss'],
  extras: [],
  build: {
    vueRouterMode: 'history'
  },
  devServer: {
    port: 800,
    open: false,
    host: '0.0.0.0'
  },
  framework: {
    config: {},
    plugins: ['Notify']
  },
  animations: [],
  sourceFiles: {
    rootComponent: 'src/App.vue',
    router: 'src/router/index.js',
    entry: 'src/main.js'
  }
}));
