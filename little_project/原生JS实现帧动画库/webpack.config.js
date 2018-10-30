/**
 * Created by asus on 2017/5/28.
 */
module.exports = {
	entry: {
		animation: './animation.js'
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].js',
		library: 'animation',
		libraryTarget: 'umd'
	}
};