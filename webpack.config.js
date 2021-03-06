'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.SANDBOX_URL': JSON.stringify('https://sandbox.kodeboksen.dev:3000')
    })
  ],
  resolve: {
    alias: {
      'common': path.join(__dirname, 'app/common'),
      'modules': path.join(__dirname, 'app/modules'),
      'components': path.join(__dirname, 'app/components')
    }
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel?optional=es7.decorators'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?-autoprefixer&modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }, {
      test: /\.woff$/,
      loader: 'url?limit=100000'
    }]
  }
};
