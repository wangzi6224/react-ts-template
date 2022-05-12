const base = require('./webpack.base');
const {merge} = require("webpack-merge");
const {proxy} = require('../config');
const os = require('os')

const devConfig = {
  mode: "development",
  /* output: {
    hotUpdateChunkFilename: "[id].[hash].hot-update.js",
    hotUpdateMainFilename: "[hash].hot-update.json",
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    proxy:{}
  }, */
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  },
  devServer: {
    port: 8000,
    static: '../dist',
    host: RegExp(/^win/i).test(os.type()) ? '127.0.0.1' : "0.0.0.0",
    hot: true,
    proxy
  },
  devtool: "source-map"
};

module.exports = merge(base, devConfig)
