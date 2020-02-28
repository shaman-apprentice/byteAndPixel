const webpackMerge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const commonConfig = require('./common.config');


module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
});

/* 
 * Some numbers: (23.02.2020 with commit ef245fc1bd257c7369d92dede142e51fd36982cd)
 * 3.754.985 bytes - with mode development and source map 
 * 1.549.207 bytes - with mode development and without source map 
 * 2.956.406 bytes - with mode production and source map
 *   390.969 bytes - with mode production and without source map
 * 
 *   386.609 bytes - with mode production, without source map and with terser
 *   313.707 bytes -   and custom terser opts
 */
