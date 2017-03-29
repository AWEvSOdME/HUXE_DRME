let webpack = require('webpack');
let path = require('path');

module.exports = {
  output: {
    publicPath: 'js/',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(sass|scss)$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.vue$/,
      use: ['vue-loader']
    }]
  },
  resolve: {
    modules: ["node_modules", "bower_components"],
    alias: {
      "vueCommon": path.join(__dirname, 'node_modules/vue/dist/vue.common.js')
    }
  }
};