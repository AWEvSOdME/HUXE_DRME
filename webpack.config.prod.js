let webpack = require('webpack');
let baseConfig = Object.assign({}, require('./webpack.config.base'));

baseConfig.devtool = "cheap-eval-source-map";
baseConfig.plugins = baseConfig.plugins.concat([
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false
  }),
  new webpack.BannerPlugin({
    banner: 'Brought to you by Ralph with  😃',
    entryOnly: true
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  })
]);

module.exports = baseConfig;