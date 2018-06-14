const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const formatter = require('eslint-friendly-formatter');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let styleLoader = 'style-loader';
if (process.env.NODE_ENV === 'production') {
  styleLoader = MiniCssExtractPlugin.loader;
}

console.log('ENV', process.env.NODE_ENV);

let publicPath = '/static/';
if (process.env.NODE_ENV !== 'production') {
  publicPath = 'http://localhost:8080/static/';
}

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
      '~activities': path.resolve(__dirname, './src/components/activities/'),
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
    new CircularDependencyPlugin({}),
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),

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
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
    // new CopyWebpackPlugin([
    //   {from: './dist/app.*', to: `${rootPath}${publicPath}`, flatten: true},
    //   {from: './dist/vendors*', to: `${rootPath}${publicPath}`, flatten: true},
    //   // {from: './dist/index.html', to: '../../app/view/template/', flatten: true},
    // ]),
    new WebpackCdnPlugin({
      modules: [
        {name: 'vue', var: 'Vue', path: 'dist/vue.js'},
        {name: 'vuex', var: 'Vuex', path: 'dist/vuex.min.js'},
        {name: 'vue-router', var: 'VueRouter', path: 'dist/vue-router.min.js'},
        {name: 'axios', path: 'dist/axios.min.js'},
        {name: 'underscore', var: '_', path: 'underscore-min.js'},
        {name: 'lscache'},
        {name: 'dexie', var: 'Dexie', path: 'dist/dexie.min.js'},
      ],
    }),
  ],
  mode: process.env.NODE_ENV,

  externals: {moment: 'moment'},

  optimization: {
    // minimizer: [
    //   new OptimizeCSSAssetsPlugin({
    //     assetNameRegExp: /\.optimize\.css$/g,
    //     cssProcessor: require('cssnano'),
    //     cssProcessorOptions: {discardComments: {removeAll: true}},
    //     canPrint: true,
    //   }),
    // ],
    splitChunks: {
      chunks: 'async',
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
};
