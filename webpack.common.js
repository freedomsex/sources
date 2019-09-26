const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const formatter = require('eslint-friendly-formatter');
const WriteFilePlugin = require('write-file-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


const APP_VERSION = require('./package.json').version;

// if (process.env.NODE_ENV !== 'production') {
//   console.log('Looks like we are in development mode!');
// }

module.exports = {
  mode: 'development',
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    // filename: '[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/build/',
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '~store': path.resolve(__dirname, './src/store/'),
      '~activities': path.resolve(__dirname, './src/components/activities/'),
      '~dialogs': path.resolve(__dirname, './src/components/dialogs/'),
      '~halves': path.resolve(__dirname, './src/components/halves/'),
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
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
          loaders: {
            // less: 'style!css!less',
          },
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
          'style-loader',
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
      {
        resourceQuery: /blockType=i18n/,
        loader: '@kazupon/vue-i18n-loader',
      },
    ],
  },

  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new CircularDependencyPlugin({}),

    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
    }),

    new HtmlWebpackPlugin({
      template: './src/templates/index.htm',
      xhtml: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'mail.html',
      template: './src/templates/mail.htm',
      xhtml: true,
    }),
    new WriteFilePlugin(),
    new CleanWebpackPlugin(),
  ],

};
