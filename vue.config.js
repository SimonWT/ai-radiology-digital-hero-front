const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/dwv-vue/demo/trunk/'
    : '/',
  configureWebpack: {
    plugins: [
      // copy decoders
      new CopyWebpackPlugin([
        {
          from: './node_modules/dwv/decoders',
          to: 'assets/dwv/decoders'
        }
      ])
    ]
  },
  devServer: {
    proxy: 'http://127.0.0.1:5000'
  }
} 
