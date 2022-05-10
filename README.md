# 构建React项目（typescript）

### 初始化项目

1. **首先通过`git init` 初始化项目仓库；**

2. **输入`npm init -y` 初始化项目；**

3. **添加.gitignore文件;**

4. **安装构建依赖：**

    1. webpack 和 webpack-cli 两个构建依赖 `npm i webapck webpack-cli -D`;

5. **根目录下建立src目录：**

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

6. **跟目录下创建webpack文件夹；**

### 配置webpack

1. **配置webpack基础配置：**

    1. 在webpack文件夹下创建webpack.base.js文件；

    2. 通过module.exports导出对象；

    3. 添加`entry`入口

       ```js
       entry: path.join(__dirname, '../src'),
       ```

    4. 添加输出目录：

       ```js
         output: {
           path: path.join(__dirname, '../dist'),
           filename: "[name]_[chunkhash:8].js"
         },
       ```

    5. 添加module模块：

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
                -
                ⚠️[MiniCssExtractPlugin.loade 与 style-loader冲突报错](https://github.com/webpack-contrib/mini-css-extract-plugin#recommended)

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

        8. 优化配置项（optimization）：

        9. 压缩配置：

            - minimizer：

                - 压缩css代码，安装`css-minimizer-webpack-plugin`插件；`npm install css-minimizer-webpack-plugin -D`

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

2. **配置开发环境：**

    1. 在webpack文件夹下添加webpack.dev.js配置文件;

    2. 安装 `webpack-merge`依赖，`npm i webpack-merge -D`; 用于合并配置

    3. 安装`webpack-dev-server`依赖， `npm i webpack-dev-server -D`， 用于启动开发环境服务器；

    4. 在根目录下创建config文件夹；

    5. 在config文件夹下创建alias.config.js,别名配置文件，在webpack.base.js文件中，resolve字段导入该文件对象；

    6. 在config文件夹创建`index.js`和`proxy.config.js`两个文件；

    7. `package.json`中添加 `"start": "webpack-dev-server --config webpack/webpack.dev.js --open"`脚本命令；

       ```js
       // ⬇️⬇️⬇️⬇️⬇️⬇️⬇️ index.js ⬇️⬇️⬇️⬇️⬇️⬇️⬇️
       const proxy = require('./proxy.config')
       
       const config = {
         proxy
       };
       
       module.exports = config
       
       // ⬇️⬇️⬇️⬇️⬇️⬇️⬇️ alias.config.js ⬇️⬇️⬇️⬇️⬇️⬇️⬇️
       
       const path = require('path');
       
       module.exports = {
           src: path.resolve(__dirname, '../src'),
           assets: path.resolve(__dirname, '../src/assets'),
           pages: path.resolve(__dirname, '../src/pages'),
           components: path.resolve(__dirname, '../src/components')
       };
       
       
       // ⬇️⬇️⬇️⬇️⬇️⬇️⬇️ proxy.config.js ⬇️⬇️⬇️⬇️⬇️⬇️⬇️
       
       const PROXYS = {
         dev: {
           '*': {
             headers: {
               'Header-Name': 'ANY'
             }
           },
           '/api': {
             changeOrigin: true,
             target: 'http://localhost:3000/',
             pathRewrite: {
               "/api": ""
             }
           },
         },
         online: {
           '/api': {
             changeOrigin: true,
             target: ''
           }
         },
         mock: {
           '/api': {
             changeOrigin: true,
             target: 'https://www.easy-mock.com/mock/'
           }
         }
       };
       
       // 根据 npm start --[参数] 进行环境切换
       let proxy = PROXYS.dev;
       for (const key in PROXYS) {
         if (process.env[`npm_config_${key}`]) {
           proxy = { ...proxy, ...PROXYS[key] };
         }
       }
       
       module.exports = proxy;
       
       // ⬇️⬇️⬇️⬇️⬇️⬇️⬇️ webpack.dev.js ⬇️⬇️⬇️⬇️⬇️⬇️⬇️
       
       const base = require('./webpack.base');
       const {merge} = require("webpack-merge");
       const {proxy} = require('../config')
       
       process.env.NODE = 'development';
       
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
           hot: true,
           proxy
         },
         devtool: "source-map"
       };
       
       module.exports = merge(base, devConfig) 
       ```

3. 配置react环境：

    1. 安装`react` 、`react-dom` 、`@babel/core`、`@babel/preset-env`、`@babel/perset-react`、`ts-loader`、`@types/react`
       、`@types/react-dom`

    2. 添加tsconfig.js文件：

       ```js
       // tsconfig.js
       {
         "compilerOptions": {
           "moduleResolution": "node",
           "allowJs": true,
           "allowSyntheticDefaultImports": true,
           "baseUrl": ".",
           "experimentalDecorators": true,
           "jsx": "react",
           "module": "esnext",
           "strict": true,
           "outDir": "./built",
           "paths": {
             "src/*":  ["./src/*"],
             "assets/*":  ["./src/assets/*"],
             "utils/*":  ["./src/utils/*"],
             "pages/*":  ["./src/pages/*"],
             "components/*":  ["./src/components/*"]
           },
           "sourceMap": true,
           "target": "esnext"
         },
         "rules": {
           "no-implicit-dependencies": ["optional", ["src"]]
         },
         "include": ["./src/**/*", "./types"]
       }
       ```

    3. 添加.babelrc配置文件：

       ```json
       {
         "presets" :[
           "@babel/preset-env",
           "@babel/preset-react"
         ],
         "plugins": [
           "@babel/proposal-class-properties",
           "@babel/plugin-syntax-dynamic-import"
         ]
       }
       ```

