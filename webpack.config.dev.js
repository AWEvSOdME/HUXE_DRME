let webpack = require('webpack');
let baseConfig = Object.assign({}, require('./webpack.config.base'));

baseConfig.plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  })
];

module.exports = baseConfig;