module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/caption2text/' : '/',
  productionSourceMap: false,
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    themeColor: '#474a4f',
    msTileColor: '#fff',
    iconPaths: {
      favicon32: './img/icons/favicon-32x32.png',
      favicon16: './img/icons/favicon-16x16.png',
      appleTouchIcon: './img/icons/apple-touch-icon-152x152.png',
      maskIcon: './img/icons/safari-pinned-tab.svg',
      msTileImage: './img/icons/msapplication-icon-144x144.png'
    }
  }
}
