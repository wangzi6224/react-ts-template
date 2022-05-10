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
                - `css-loader`modules 设置为`true`, 开启模块化；
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
                    {
                      loader: "css-loader",
                      options: {
                        modules: true // 开启模块化
                      }
                    },
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

            1. 压缩配置：

            2. minimizer：

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

    8. 添加环境变量：

        1. 由于使用的是webpack5，在webpack5中取消了process的node变量，所以需要通过`DefinePlugin`插件（webpack模块中导入）定义全局环境变量，例如：

           `new DefinePlugin({
           'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
           })`

        2. 并且在types文件夹下的`react-app-env.d.ts`声明文件中定义该变量；

           > ```js
       > declare module "*.less"; // css module 中声明使用
       > declare module '*.css';
       >
       > declare const NODE_ENV: 'development' | 'production'; // 判断环境变量
       >
       > declare const BASE: string; // BASE API地址使用 可以用来区分不同环境的 BASE API
       > ```

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
         "include": ["./src/**/*", "./declaration"]
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

4. 配置eslint：

    1.
   安装插件 `@babel/eslint-parser` `babel-eslint` `eslint` `eslint-config-airbnb` `eslint-plugin-import` `eslint-plugin-jsx-a11y` `eslint-plugin-react` `eslint-webpack-plugin`
   ;

    2. 在根目录下添加 `.eslintrc` 配置文件：

       ```json
       // .eslintrc
       {
           "parser": "@babel/eslint-parser",
           "extends": "airbnb",
           "rules": {
               "arrow-body-style": [0],
               "consistent-return": [0],
               "generator-star-spacing": [0],
               "global-require": [1],
               "import/extensions": [0],
               "import/no-extraneous-dependencies": [0],
               "import/no-unresolved": [0],
               "import/prefer-default-export": [0],
               "jsx-a11y/no-static-element-interactions": [0],
               "no-bitwise": [0],
               "no-cond-assign": [0],
               "no-else-return": [0],
               "no-nested-ternary": [0],
               "no-restricted-syntax": [0],
               "no-use-before-define": [0],
               "react/forbid-prop-types": [2],
               "react/jsx-filename-extension": [1, {
                   "extensions": [".js"]
               }],
               "react/jsx-no-bind": [0],
               "react/no-array-index-key": 0,
               "react/prefer-stateless-function": [0],
               "react/prop-types": [2],
               "require-yield": [1],
               "no-unused-vars": [0],
               "space-infix-ops": [0],
               "object-shorthand": [0],
               "quotes": 0,
               "jsx-quotes": 0,
               "prefer-const": [0],
               "react/jsx-indent": [1, 4],
               "indent": [0, 4],
               "curly": [1, "all"],
               "comma-dangle": [2, "never"],
               "react/jsx-indent-props": 0,
               "react/jsx-curly-spacing": 0,
               "space-in-parens": 0,
               "no-irregular-whitespace": 2,
               "no-mixed-spaces-and-tabs": [2, false],
               "no-underscore-dangle": 1,
               "key-spacing": 0,
               "no-param-reassign": 0,
               "no-lonely-if": 0,
               "linebreak-style": 0,
               "max-len": [2, 300],
               "class-methods-use-this": 0,
               "quote-props": 0,
               "no-shadow": 0,
               "guard-for-in": 0,
               "no-labels": 0,
               "prefer-template": 0,
               "react/sort-comp": 0,
               "import/no-dynamic-require": 0,
               "no-debugger": 0,
               "prefer-destructuring": 0,
               "object-curly-newline": 0,
               "react/jsx-equals-spacing": 0
           },
           "parserOptions": {
               "ecmaFeatures": {
                   "experimentalObjectRestSpread": true
               }
           },
           "env": {
               "browser": true,
               "node": true
           }
       }
       ```

    3. 配置Eslint：

        1. 安装依赖：

           ```
               "eslint": "^8.15.0", 
               "eslint-config-ali": "^14.0.0",
               "eslint-config-react": "^1.1.7",
               "eslint-import-resolver-typescript": "^2.7.1",
               "eslint-plugin-import": "^2.26.0",
               "eslint-plugin-jsx-a11y": "^6.5.1",
               "eslint-plugin-react": "^7.29.4",
               "eslint-plugin-react-hooks": "^4.5.0",
               "eslint-webpack-plugin": "^3.1.1",
               "@typescript-eslint/eslint-plugin": "^5.23.0",
               "@typescript-eslint/parser": "^5.23.0",
               "babel-eslint": "^10.1.0",
           ```

        2. 添加eslint配置：

            1. 在根目录下添加`.eslintrc` `.eslintignore` `.lintstagedrc.js` `.prettier.config.js`文件

               ```json
               // .eslintrc
               {
                 /*
                 * "off"或0 -关闭规则
                 * "warn" 或1 - 开启规则, 使用警告 程序不会退出
                 * "error"或2 - 开启规则, 使用错误 程序退出
                 */
                 "parser": "@typescript-eslint/parser",
                 "extends": [
                   "eslint:recommended",
                   "plugin:@typescript-eslint/recommended",
                   "plugin:@typescript-eslint/eslint-recommended",
                   "plugin:react-hooks/recommended",
                   "plugin:jsx-a11y/recommended",
                   "eslint-config-ali"
                 ],
                 "plugins": [
                   "jsx-a11y",
                   "@typescript-eslint",
                   "eslint-plugin-react",
                   "eslint-plugin-react-hooks"
                 ],
                 "rules": {
                   "import/extensions": [
                     0
                   ],
                   "import/no-extraneous-dependencies": [
                     0
                   ],
                   "import/no-unresolved": [
                     0
                   ],
                   "import/prefer-default-export": [
                     0
                   ],
                   "jsx-a11y/no-static-element-interactions": [
                     0
                   ],
                   "no-bitwise": [
                     0
                   ],
                   "no-cond-assign": [
                     0
                   ],
                   "no-else-return": [
                     0
                   ],
                   "no-nested-ternary": [
                     0
                   ],
                   "no-restricted-syntax": [
                     0
                   ],
                   "no-use-before-define": [
                     0
                   ],
                   "react/forbid-prop-types": [
                     2
                   ],
                   "react/jsx-no-bind": [
                     0
                   ],
                   "react/no-array-index-key": 0,
                   "react/prefer-stateless-function": [
                     0
                   ],
                   "react/prop-types": [
                     2
                   ],
                   "require-yield": [
                     1
                   ],
                   "no-unused-vars": [
                     0
                   ],
                   "space-infix-ops": [
                     0
                   ],
                   "object-shorthand": [
                     0
                   ],
                   "quotes": 0,
                   "jsx-quotes": 0,
                   "prefer-const": [
                     0
                   ],
                   "react/jsx-indent": [
                     1,
                     4
                   ],
                   "global-require": [
                     2
                   ],
                   "indent": [
                     "error",
                     4
                   ],
                   "comma-dangle": [
                     2,
                     "never"
                   ],
                   "react/jsx-indent-props": 0,
                   "react/jsx-curly-spacing": 0,
                   "space-in-parens": 0,
                   "no-irregular-whitespace": 2,
                   "no-mixed-spaces-and-tabs": [
                     2,
                     false
                   ],
                   "no-underscore-dangle": 1,
                   "key-spacing": 0,
                   "no-param-reassign": 0,
                   "no-lonely-if": 0,
                   "linebreak-style": 0,
                   "max-len": [
                     2,
                     300
                   ],
                   "class-methods-use-this": 0,
                   "quote-props": 0,
                   "no-shadow": 0,
                   "guard-for-in": 0,
                   "no-labels": 0,
                   "prefer-template": 0,
                   "react/sort-comp": 0,
                   "import/no-dynamic-require": 2,
                   // 禁止require()使用表达式调用
                   "no-debugger": 0,
                   "eqeqeq": "error",
                   // 禁止使用调试器
                   "prefer-destructuring": 0,
                   // 需要从数组和/或对象中解构
                   "object-curly-newline": 2,
                   "object-curly-spacing": 2,
                   // 在大括号内强制使用一致的换行符
                   "react/jsx-equals-spacing": 0
                 },
                 "parserOptions": {
                   "ecmaFeatures": {
                     "experimentalObjectRestSpread": true
                   }
                 },
                 "env": {
                   "browser": true,
                   "node": true,
                   "es6": true
                 }
               }
               
               // .eslintignore
               
               /functions/mock/**
               /scripts
               /config
               /webpack
               /logs
               /server/mockData
               /node_modules
               /dist
               /src/public
               /package.json
               /package-lock.json
               /.DS_Store
               /.eslintignore
               /.gitignore
               /.lintstagedre.js
               /.prettier.js
               /tsconfig.json
               *.md
               
               // .lintstagedrc
               
               {
                 "**/*": "npm run lint:js"
               }
               ```

            2. 在package.json中添加脚本

               ```json
                 "husky": {
                   "hooks": {
                     "pre-commit": "lint-staged",
                     "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS"
                   }
                 },
                 "lint-staged": {
                   "**/*.{ts,tsx,js,jsx}": "npm run lint-staged",
                   "**/*.{tsx,ts,less,md,json}": [
                     "prettier --write"
                   ]
                 },
                 "scripts": {
                   "lint-staged": "lint-staged",
                   "lint:fix": "eslint --fix --ext .js,.jsx,.ts,.tsx --ignore-path .eslintignore ./src",
                   "lint:js": "eslint --ext .js,.jsx,.ts,.tsx --ignore-path .eslintignore ./src",
                   "prepare": "husky install"
                 },
               ```

               安装husky，[husky使用文档](https://typicode.github.io/husky/#/)。

