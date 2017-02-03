const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, '/build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
	entry: [
		'webpack/hot/dev-server',
		'webpack/hot/only-dev-server',
		'webpack-hot-middleware/client',
		path.join(__dirname, '/src/app/app.js'),
	],
	devtool: 'eval',
	output: {
		publicPath: '/',
		path: buildPath,
		filename: 'app.js',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new TransferWebpackPlugin([
			{from: 'www'},
		], path.resolve(__dirname, 'src')),
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['react-hot', 'babel-loader'],
				exclude: [nodeModulesPath],
			},
		],
	},
};