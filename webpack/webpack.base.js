const path = require("path");
const {EnvironmentPlugin, DefinePlugin, ProvidePlugin} = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const os = require("os");
const {alias} = require('../config');

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: "[name]_[chunkhash:8].js"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader"
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true // 开启模块化
            }
          },
          "less-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 500,
            outputPath: 'public/images/',
            name: '[name].[chunkhash:8].[ext]'
          }
        }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.css$/,
        parallel: 4 //使用多进程并发执行，提升构建速度 Boolean|Number 默认值：true, Number代表并发进程数量
      }),
      new TerserPlugin({
        parallel: os.cpus().length - 1, // 多线程压缩
        // cache: true
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          filename: "vendors_[chunkhash:8].js",
          reuseExistingChunk: true,
        },
        commons: {
          chunks: "all",
          filename: "commons_[chunkhash:8].js",
          minSize: 0,
          minChunks: 2,
          priority: 1
        }
      },
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
      chunkFilename: 'chunk-[id].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `../src/index.html`),
      filename: `index.html`, // 指定打包出的文件名
      chunks: '[hash:8]', // 生成的html使用哪些chunk
      inject: true, // js或者css自动注入
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      }
    }),
    new DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    })
  ],
  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css']
  }
}
