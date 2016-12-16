var ip = require('ip');

var Sync    = require('browser-sync-webpack-plugin');

var merge   = require('webpack-merge');
var webpack = require('webpack');

var config = require('./config');

var port       = process.env.npm_package_config_port;
var publicPath = process.env.npm_package_config_public_path;

module.exports = merge(config, {
  devtool: '#source-map',
  devServer: {
    contentBase: 'build',
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: parseInt(port) - 1,
  },
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
            'react-hmre',
            'stage-0',
          ],
        },
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?sourceMap',
          'postcss',
          'sass?sourceMap',
        ],
      },
    ],
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint',
      },
    ],
  },
  output: {
    publicPath: 'http://' + ip.address() + ':' + port + publicPath,
  },
  plugins: [
    new Sync({
      host: 'localhost',
      logLevel: 'silent',
      notify: false,
      open: false,
      port: parseInt(port),
      proxy: 'http://localhost:' + (parseInt(port) - 1) + publicPath,
      ui: false,
    }, {
      reload: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});