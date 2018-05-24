const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const formatter = require('eslint-friendly-formatter');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

let styleLoader = 'style-loader';
if (process.env.NODE_ENV !== 'production') {
  styleLoader = MiniCssExtractPlugin.loader;
}

const publicPath = '/static/';
// const rootPath = '../../web';

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/index.js'],
  },
  output: {
    filename: '[name].[chunkhash:5].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'http://localhost:8080/build/',
    publicPath,
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

    // Please remember that setting NODE_ENV doesn't automatically set mode.
    new webpack.DefinePlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
    new WriteFilePlugin(),

    new HtmlWebpackPlugin({
      template: './src/templates/index.htm',
      xhtml: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'mail.html',
      template: './src/templates/mail.htm',
      xhtml: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:5].css',
    }),
    new CleanWebpackPlugin([
      path.resolve(__dirname, 'dist'),
      // path.resolve(__dirname, `${rootPath}${publicPath}`),
      // '../../web/static/js',
    ], {allowExternal: true}),
    // new CopyWebpackPlugin([
    //   {from: './dist/app.*', to: `${rootPath}${publicPath}`, flatten: true},
    //   {from: './dist/vendors*', to: `${rootPath}${publicPath}`, flatten: true},
    //   // {from: './dist/index.html', to: '../../app/view/template/', flatten: true},
    // ]),
    new WebpackCdnPlugin({
      modules: [
        {name: 'vue', var: 'Vue'},
        {name: 'vuex', var: 'Vuex'},
        {name: 'vue-router', var: 'VueRouter'},
        {name: 'axios'},
        {name: 'jquery', var: '$'},
        {name: 'underscore', var: '_'},
        {name: 'lscache', var: 'ls'},
        {name: 'dexie', var: 'Dexie'},
        {name: 'moment'},
      ],
      // publicPath: '/node_modules'
    }),
  ],
  // mode: 'development',
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
    children: false,
  },
};
