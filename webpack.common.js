const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        another: './src/another-moudle.js',
        vendor: [
            'es6-promise',
            'lodash'
        ]
    },
    output: {
      filename: '[name].[chunkhash].bundle.js',
      //代码分离之动态导入
    //   chunkFilename: '[name].bundle.js',
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
        //更新html文件的引用js和css
        new HtmlWebpackPlugin({
            title: "Output"
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