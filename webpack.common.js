const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var getHtmlConfig = function(name){
	return {
		template: './src/view/'+name+'.html',
		filename: 'view/'+name+'.html',
		inject: true,
		hash: true,
		chunks: ['manifest', 'vendor', name]
	}
}

module.exports = {
	entry: {
		index: './src/index.js',
		login: './src/login.js',
		vendor: [
			'lodash',
			'jquery'
		]
	},
	module: {
		rules:[
			{
				test:/\.css$/,
				use:[
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login')),
		new webpack.optimize.CommonsChunkPlugin({
	        name: 'vendor'
	    }),
	    new webpack.optimize.CommonsChunkPlugin({
	        name: 'manifest'
	    })
	],
	output: {
		// filename: '[name].[chunkhash].js',
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist')
	}
}

