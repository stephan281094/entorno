const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    rules: [{ test: /\.js$/, use: ['babel-loader'] }]
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },

  plugins: [
    new HtmlWebpackPlugin({
      minify: { collapseWhitespace: true, minifyCSS: true },
      template: 'src/index.template.html'
    })
  ]
}
