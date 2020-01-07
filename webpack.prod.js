const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const common = require('./webpack.common.js');

console.log(`\n ${path.resolve(process.env.HOME, 'DATA/freed/dist')}\n`);


module.exports = merge(common, {
  target: 'web',
  mode: 'production',
  // entry: {
  //   app: ['babel-polyfill'],
  // },

  output: {
    filename: '[name].[contenthash:5].js',
    chunkFilename: 'scripts/[name].[contenthash:5].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: file => (
          /node_modules/.test(file) && !/\.vue\.js/.test(file)
        ),
        loader: 'babel-loader',
        resolve: {
          mainFields: ['browser', 'main', 'module'],
        },
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // {
          //   loader: 'style-loader', // creates style nodes from JS strings
          // },
          // 'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, './src/styles/colors.less'),
                path.resolve(__dirname, './src/styles/dimensions.less'),
                path.resolve(__dirname, './src/styles/mixins.less'),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: false,
    }),

    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
    }),

    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
    new WebpackCdnPlugin({
      modules: [
        {name: 'babel-polyfill', path: 'dist/polyfill.min.js'},
        {name: 'vue', var: 'Vue', path: 'dist/vue.js'},
        {name: 'vuex', var: 'Vuex', path: 'dist/vuex.min.js'},
        {name: 'vue-router', var: 'VueRouter', path: 'dist/vue-router.min.js'},
        {name: 'vue-i18n', var: 'VueI18n', path: 'dist/vue-i18n.min.js'},
        {name: 'axios', path: 'dist/axios.min.js'},
        {name: 'underscore', var: '_', path: 'underscore-min.js'},
        {name: 'lscache'},
        {name: 'dexie', var: 'Dexie', path: 'dist/dexie.min.js'},
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:5].css',
      chunkFilename: 'styles/[name].[contenthash:5].css',
    }),

    new FileManagerPlugin({
      onEnd: {
        copy: [
          {source: 'dist', destination: path.resolve(process.env.HOME, 'DATA/freed/dist')},
        ],
      },
    }),
    // new CopyPlugin([
    //   // {from: path.resolve(__dirname, './dist/*'), to: path.resolve(process.env.HOME, 'DATA/freed/dist')},
    //   {from: './build/**/*', to: path.resolve(process.env.HOME, 'DATA/freed/dist')},
    //   // {from: './dist/vendors*', to: `${rootPath}${publicPath}`, flatten: true},
    //   // {from: './dist/index.html', to: '../../app/view/template/', flatten: true},
    // ], {logLevel: 'debug'}),
  ],

  externals: {moment: 'moment'},

  optimization: {
    // minimize: false,
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {discardComments: {removeAll: true}},
      }),
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
    splitChunks: {
      chunks: 'async',
      // chunks: 'all',
      name: true,

      cacheGroups: {
        vendors: {
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.(css|scss|less)$/,
          // chunks: 'all',
          // enforce: true,
        },
      },
    },
  },
  stats: {
    entrypoints: false,
    children: false,
  },
});
