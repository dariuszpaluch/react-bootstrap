var Extract = require('extract-text-webpack-plugin');
var merge   = require('webpack-merge');
var webpack = require('webpack');

var config = require('./config');

var publicPath = process.env.npm_package_config_public_path;

module.exports = merge(config, {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          comments: false,
          compact: true,
          presets: [
            'es2015',
            'react',
            'stage-0',
          ],
        },
      },
      {
        test: /\.scss$/,
        loader: Extract.extract([
          'css',
          'postcss',
          'sass',
        ]),
      },
    ],
  },
  output: {
    publicPath: publicPath,
  },
  plugins: [
    new Extract('index.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        booleans:      true,
        collapse_vars: true, // eslint-disable-line camelcase
        comparisons:   true,
        dead_code:     true, // eslint-disable-line camelcase
        drop_console:  true, // eslint-disable-line camelcase
        drop_debugger: true, // eslint-disable-line camelcase
        if_return:     true, // eslint-disable-line camelcase
        join_vars:     true, // eslint-disable-line camelcase
        loops:         true,
        properties:    true,
        sequences:     true,
        unused:        true,
        warnings:      false,
      },
    }),
  ],
});