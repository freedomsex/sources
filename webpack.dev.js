const webpack = require('webpack');
const merge = require('webpack-merge');

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: 'http://localhost:8080/static/',
  },

  devServer: {
    hot: true,
    port: 8080,
    disableHostCheck: true,
    clientLogLevel: 'warn',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'disabled',
    }),
    new webpack.DefinePlugin({
      DEVELOPMENT: true,
    }),
  ],
});
