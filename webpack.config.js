const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = _path => path.resolve(__dirname, _path)

module.exports = {
  entry: resolve('src'),
  module: {
    rules: [{ test: /\.js$/, use: ['babel-loader'] }]
  },
  devServer: {
    contentBase: resolve('dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: { collapseWhitespace: true, minifyCSS: true },
      template: resolve('src/index.template.html')
    })
  ]
}
