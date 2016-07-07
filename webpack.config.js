module.exports = {
	entry: './src/index.js',
	output: {
		path: '/',
		publicPath: '/public/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style','css','sass']
			},
			{
				test: /\.json$/,
				loaders: ['json']
			}
		]
	}
}