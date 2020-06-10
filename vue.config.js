module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/caption2text/' : '/',
  productionSourceMap: false,
  transpileDependencies: [
    'vuetify'
  ]
}
