const base = require('./webpack.base');
const {merge} = require("webpack-merge");

const prodConfig = {
  devtool: 'hidden-source-map',
  mode: 'production',
  stats: "errors-only",
};

module.exports = merge(base, prodConfig)
