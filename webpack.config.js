const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
            //生产环境分离css 开发环境则不用 
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

      ]
  },
  plugins: [
    //   new ExtractTextPlugin("css/[name].[chunkhash].css")
  ]
};