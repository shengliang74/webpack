const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
      app: './src/index.js'
  },
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    // path: __dirname
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
      rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
            // 生产环境分离css 开发环境则不用 
            // use: ExtractTextPlugin.extract({
            //     fallback: "style-loader",
            //     use: "css-loader"
            // })
        },
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
        }
      ]
  },
  plugins: [
    // 分离css
    // new ExtractTextPlugin("css/[name].[chunkhash].css"),
    // 清空dist文件
    new CleanWebpackPlugin(['dist']),
    //更新html文件的引用js和css
    new HtmlWebpackPlugin({
        title: "Output",
        // template: 'src/view/temple.html'
    })
  ]
};