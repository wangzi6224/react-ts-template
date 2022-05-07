# 构建React项目（typescript）

### 初始化项目

1. 首先通过`git init` 初始化项目仓库；

2. 输入`npm init -y` 初始化项目；

3. 添加.gitignore文件;

4. 安装构建依赖

    1. webpack 和 webpack-cli 两个构建依赖 `npm i webapck webpack-cli -D`;

5. 根目录下建立src目录

    1. 在src目录下建立index.html文件，简历index.js目录；

    2. 在index.html文件中初始化文件内容，添加`<div id="root"></div>`标签;

    3. 安装HtmlWebpackPlugin插件，处理HTML；

       ```js
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
           })
       ```

    4. 安装`CleanWebpackPlugin`插件，每次构建清理dist目录；

6. 跟目录下创建webpack文件夹；

7. 在webpack文件夹下创建webpack.base.js文件；

    1. 通过module.exports导出对象；

    2. 添加`entry`入口

       ```js
       entry: path.join(__dirname, '../src'),
       ```

    3. 添加输出目录：

       ```js
         output: {
           path: path.join(__dirname, '../dist'),
           filename: "[name]_[chunkhash:8].js"
         },
       ```

    4. 添加module模块：

        - 添加解析规则字段rules数组：

            1. 解析js文件，安装`babel-loader`插件；

          ```js
          {
              test: /\.js$/,
              loader: "babel-loader"
          }
          ```

            2. 解析css、less等文件

                - 安装css-loader、less-loader、style-loader，`npm i less-loader css-loader style-loader -D`;

                - 安装`mini-css-extract-plugin`插件，提取css文件；
                - ⚠️[MiniCssExtractPlugin.loade 与 style-loader冲突报错](https://github.com/webpack-contrib/mini-css-extract-plugin#recommended)

          ```js
          const MiniCssExtractPlugin = require("mini-css-extract-plugin");
          // ...
                {
                  test: /\.(css|less)$/,
                  use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    'css-loader',
                    "less-loader",
                  ]
                }
          // ...
          plugins: [
            // ...
            new MiniCssExtractPlugin({
                filename: "[name]_[contenthash:8].css"
              })
          ]
          ```

            3. 解析文件类型

                - 安装`file-loader`插件解析静态资源文件；

                - `npm i file-loader -D`

                  ```js
                  // ...
                        {
                          test: /\.(png|jpe?g|svg|gif)$/i,
                          use: [{
                            loader: 'file-loader',
                            options: {
                              limit: 500,
                              outputPath: 'public/images/',
                              name: '[name].[hash:8].[ext]'
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
                  // ...
                  ```

    5. 优化配置项（optimization）：

        1. 压缩配置：

            - minimizer：

                - 压缩css代码，安装`css-minimizer-webpack-plugin`插件；`npm install css-minimizer-webpack-plugin  -D`

                  ```js
                  const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
                  // ...
                  new CssMinimizerPlugin({
                          test: /\.css$/,
                          parallel: 4
                        }),
                  // ...
                  ```

                - 压缩配置项，通过`terser-webpack-plugin`进行压缩配置，在插件中调用

                  ```js
                  const TerserPlugin = require("terser-webpack-plugin");
                  // ...
                  new TerserPlugin({
                     parallel: os.cpus().length - 1,
                     // cache: true
                  })
                  // ...
                  ```

