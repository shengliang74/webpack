const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

console.log(process.env.NODE_ENV);
console.log(process.env.PORT_TYPE);
// const pages = [];
// const entries = {}; 
// (function(){
//     // 定义存放html页面的文件夹路径
//     let pagePath = path.join(__dirname, "./src/pages");
//     // 获取pagePath路径下的所有文件
//     let paths = fs.readdirSync(pagePath);
//     paths.forEach(page => {
//         pages.push(new HtmlWebpackPlugin({
//             filename: `${page}.html`,
//             template: path.resolve(__dirname, `./src/pages/${page}/${page}.html`),
//             chunks: [page, 'commons', 'vendor', 'manifest'], // 配置生成的html引入的公共代码块 引入顺序从右至左
//             favicon: path.resolve(__dirname, './src/assets/img/th.jpg')
//         }))
//         entries[page] = path.resolve(__dirname, `./src/pages/${page}/${page}.js`);
//     })
// })()

// entries['vendor'] = [
//     'es6-promise',
//     'lodash'
// ];


module.exports = {
    entry: {
        'book1': './src/pages/book1/book1.js',
        'book2': './src/pages/book2/book2.js',
        'vendor':['es6-promise','lodash']
    },
    output: {
      filename: '[name].[chunkhash].js',
      //代码分离之动态导入
      //chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        //可省略的扩展名
        extensions: ['.js','.vue','.json'],
        //路径别名
        alias: {
            'dist': path.resolve(__dirname,'./dist'),
            '@': path.resolve(__dirname, './src')
        }
    },
    module: {
        noParse: /jquery|lodash|es6-promise/, // avoid webpack shimming process 不解析大型库可提高构建性能
        rules: [
          {
              test: /\.(png|svg|jpe?g|gif)$/i,
              use: [
                  // 'file-loader',
                  // {
                  //     'loader': 'image-webpack-loader',
                  //     'options': {
                  //         mozjpeg: {
                  //             progressive: true,
                  //             quality: 65
                  //         },
                  //         // optipng.enabled: false will disable optipng
                  //         optipng: {
                  //             enabled: false
                  //         },
                  //         pngquant: {
                  //             quality: '65-90',
                  //             speed: 4
                  //         },
                  //         gifsicale: {
                  //             interlaced: false
                  //         },
                  //         webp: {
                  //             quality: 75
                  //         }
                  //     }
                  // },
                  {
                      loader: 'url-loader',
                      options: {
                          limit: 8192,
                          name: 'img/[name].[ext]?[hash]'
                      }
                  }
              ]
          },
          {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              use:[
                  'file-loader'
              ]
          },
          {
              test: /\.(html)$/,
              use: {
                loader: 'html-loader',
                options: {
                  attrs: ['img:src']
                }
              }
          },
          {
            test: /\.js$/,
            include: path.resolve(__dirname, "src"),
            loader: "babel-loader"
          },
          //将jquery暴露至全局使浏览器window.$可以使用
        //   {
        //     test: require.resolve('jquery'),
        //     use: [{
        //         loader: 'expose-loader',
        //         options: 'jQuery'
        //     },{
        //         loader: 'expose-loader',
        //         options: '$'
        //     }]
        //   }   
        ]
    },
    plugins: [
        //清空dist文件
        new CleanWebpackPlugin(['dist']),
        // ...pages,
        //更新html文件的引用js和css
        new HtmlWebpackPlugin({
            favicon: path.resolve(__dirname, "./src/assets/img/th.jpg"),
            filename: "book1.html",
            template: path.resolve(__dirname, "./src/pages/book1/book1.html"),
            excludeChunks: ['book2']
        }),
        //暴露多个模块
        new HtmlWebpackPlugin({
            favicon: path.resolve(__dirname, "./src/assets/img/th.jpg"),            
            filename:"book2.html",
            template: path.resolve(__dirname, "./src/pages/book2/book2.html"),
            excludeChunks: ['book1']         
            // chunks: ['another','vendor']
        }),
        //new webpack.HashedModuleIdsPlugin(), //webpack4的mode模式已包含此插件
        new ManifestPlugin(), //提取公共manifest
        //自动加载模块，而不必到处 import 或 require
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            join: ['lodash', 'join'] //暴露模块中单个导出值
        })
        //提取公共模块(webpack4不支持)
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common' //指定公共bundle名称
        // })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                },
                vendor: {
                    name: "vendor",
                    test: /lodash|es6-promise/,
                    chunks: 'all'
                }
            }
        }
    }
  };