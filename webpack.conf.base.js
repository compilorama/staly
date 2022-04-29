const path = require('path');
const project = require('./project.json');

module.exports = {
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
