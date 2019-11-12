const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: Path.resolve(__dirname, '../src/scripts/index.js')
	},
	output: {
		path: Path.join(__dirname, '../build'),
		filename: '[name].js'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: Path.resolve(__dirname, '../src/index.html')
		})
	]
};
