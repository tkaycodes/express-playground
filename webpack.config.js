const webpack = require('webpack');

module.exports = {
	devServer: {
		hot: true
	},
	entry: [
		// 'webpack/hot/dev-server',
		// 'webpack-hot-middleware/client',
		`${__dirname}/client/index.jsx`
	],
	output: {
		path: '/',
		publicPath: 'https://localhost:3000/scripts/',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	}
}