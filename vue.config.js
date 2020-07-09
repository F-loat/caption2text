module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/caption2text/' : '/',
  productionSourceMap: false,
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    themeColor: '#474a4f',
    msTileColor: '#fff',
    workboxOptions: {
      skipWaiting: true
    }
  }
}
