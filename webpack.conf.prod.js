const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const project = require('./project.json');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          compress: {
            warnings: false
          }
        }
      })
    ]
  }
}
