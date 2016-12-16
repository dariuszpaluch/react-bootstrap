var path = require('path');

var autoprefixer = require('autoprefixer');
var Html         = require('html-webpack-plugin');
var webpack      = require('webpack');

var publicPath = process.env.npm_package_config_public_path;

module.exports = {
  context: path.resolve('./dev'),
  entry: [
    'babel-polyfill',
    './index.js',
    './index.scss',
  ],
  module: {
    loaders: [
      {
        test: /\.woff$/,
        loader: 'file',
        query: {
          name: 'assets/[hash].[ext]',
        },
      },
    ],
  },
  output: {
    filename: '[hash].js',
    path: path.resolve('./build'),
  },
  plugins: [
    new Html({
      minify: {
        collapseWhitespace: true,
      },
      showErrors: false,
      template: './index.html',
    }),
    new webpack.DefinePlugin({
      publicPath: JSON.stringify(publicPath),
    }),
  ],
  postcss: function postcss() {
    return [
      autoprefixer,
    ];
  },
  resolve: {
    alias: {
      bootstrap: path.resolve('./node_modules/bootstrap/scss'),
    },
  },
};