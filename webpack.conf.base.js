const path = require('path');
const project = require('./project.json');

module.exports = {
  entry: `${__dirname}/${project.source.entry}`,
  output: {
    library: 'GAnalytics',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: `${__dirname}/${project.dist.root}`
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },
  resolve: {
    alias: {
      '@src': `${__dirname}/${project.source.root}`
    }
  },
};
