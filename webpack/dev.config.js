const webpackMerge = require('webpack-merge');
const commonConfig = require('./common.config');

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
});
