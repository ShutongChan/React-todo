var config = {
	entry: ['whatwg-fetch', './main.js'],
	output: {
		path: __dirname + "/build",
		filename: 'index.js',
	},
	devServer: {
		inline: true,
		port: 7777
	},
	module: {
		loaders: [{
			test: /.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader',
			exclude: '/node_modules/'
		}]
	},
	resolve: {
		extensions: ['.js', '.css', '.jsx']
	}


}
module.exports = config;