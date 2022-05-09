const { merge } = require("webpack-merge");
const base = require('./webpack.base');

const prodConfig = {
  devtool: 'hidden-source-map',
  mode: 'production',
  stats: "errors-only"
};

module.exports = merge(base, prodConfig);
