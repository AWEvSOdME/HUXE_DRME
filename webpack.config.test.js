let baseConfig = Object.assign({}, require('./webpack.config.base'));
baseConfig.target = 'node';
module.exports = baseConfig;