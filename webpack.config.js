const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const formatter = require('eslint-friendly-formatter');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

let styleLoader = 'style-loader';
if (devMode) {
  styleLoader = MiniCssExtractPlugin.loader;
}

module.exports = {
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    filename: '[name].[chunkhash:5].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8080/build/',
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '~store': path.resolve(__dirname, './src/store/'),
      '~closed-activity': path.resolve(__dirname, './src/components/activities/closed-activity/'),
      '~default-activity': path.resolve(__dirname, './src/components/activities/default-activity/'),
      '~dialogs': path.resolve(__dirname, './src/components/dialogs/'),
      '~components': path.resolve(__dirname, './src/components/'),
      '~modules': path.resolve(__dirname, './src/components/modules/'),
      '~widgets': path.resolve(__dirname, './src/components/widgets/'),
      '~assets': path.resolve(__dirname, './src/assets/'),
      '~legacy': path.resolve(__dirname, './src/assets/legacy/'),
      '~config': path.resolve(__dirname, './src/config/'),
      '~templates': path.resolve(__dirname, './src/templates/'),
      '~plugins': path.resolve(__dirname, './src/plugins/'),
      '~mixins': path.resolve(__dirname, './src/mixins/'),
      styles: path.resolve(__dirname, './src/styles/'),
      static: path.resolve(__dirname, './src/static/'),
    },
  },

  module: {
    rules: [
      {
      /* Validate */
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          // emitWarning: true,
          // emitError: true,
          quiet: true,
          // cache: true, // <-- THIS
          // configFile: './.eslintrc.js',
          formatter,
        },
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(html|htm)$/,
        include: path.join(__dirname, './src/templates'),
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true,
            },
          },
        ],
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-html-loader',
        options: {
          //
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env'],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
          loaders: {
            // less: 'style!css!less',
          },
          // other vue-loader options go here
        },
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.(less|css)$/,
        use: [
          styleLoader,
          // {
          //   loader: 'style-loader', // creates style nodes from JS strings
          // },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
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
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    // new UglifyJSPlugin(),
    // new webpack.ProvidePlugin({
    //   defaultSettings,
    //   defaultResults,
    // }),
    new webpack.DefinePlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),

    new HtmlWebpackPlugin({
      template: './src/templates/index/src/index.htm',
      // chunks: ['app']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:5].css',
    }),
    new CleanWebpackPlugin([
      path.resolve(__dirname, 'dist'),
      // path.resolve(__dirname, '../../web/build'),
      '../../web/build',
    ], {allowExternal: true}),
    new CopyWebpackPlugin([
      {from: './dist/app.*', to: '../../web/build', flatten: true},
      {from: './dist/vendors*', to: '../../web/build', flatten: true},
      // {from: './dist/index.html', to: '../../app/view/template/', flatten: true},
    ]),
    new WriteFilePlugin(),
  ],
  mode: 'development',
  // externals: {
  //   $: 'jquery',
  //   _: 'underscore',
  //   axios: 'axios',
  //   ls: 'lscache',
  // },

  optimization: {
    splitChunks: {
      // chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      name: true,

      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  stats: {
    entrypoints: false,
  },
};
