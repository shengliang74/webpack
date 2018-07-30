const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var getHtmlConfig = function(name){
	return {
		template: './src/view/'+name+'.html',
		filename: 'view/'+name+'.html',
		inject: true,
		hash: true
	}
}

module.exports = {
	entry: {
		app: './src/index.js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login'))
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}

