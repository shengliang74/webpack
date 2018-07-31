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
		login: './src/login.js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login')),
		new webpack.optimize.CommonsChunkPlugin({
	        name: 'manifest'
	    }),
	    new webpack.ProvidePlugin({
	    	_: 'lodash',
	    	$: 'jquery'
	    })
	],
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	}
}

