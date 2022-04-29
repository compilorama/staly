const { merge } = require('webpack-merge');
const { bundles } = require('./project.json');
const baseConfig = require('./webpack.conf.base');
const devConfig = require('./webpack.conf.dev');
const prodConfig = require('./webpack.conf.prod');

function buildConfigs(){
  const { NODE_ENV } = process.env;
  return bundles.map(({ entry, output, library, filename }) => ({
    ...merge(baseConfig, getSpecificConfig(NODE_ENV)),
    entry: `${__dirname}/${entry}`,
    output: {
      library,
      libraryTarget: 'umd',
      libraryExport: 'default',
      path: `${__dirname}/${output}`,
      filename: parseFilename(filename, NODE_ENV)
    }
  }))
}

function getSpecificConfig(env){
  return env == 'production' ? prodConfig : devConfig;
}

function parseFilename(filename, env = 'development'){
  return filename[env] || filename;
}

module.exports = buildConfigs();
