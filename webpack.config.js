import { getSrcDir } from './gulp/tools.js'
import TerserPlugin from 'terser-webpack-plugin';

const base = {
	entry: {
		index: getSrcDir('js/index.js')
	},
	output: {
		filename: '[name].js',
	}
};

export default {
	...base,
	mode: 'production',
	optimization: {
		minimize: true,
		sideEffects: true,
		concatenateModules: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					warnings: false,
					compress: {
						comparisons: true,
						keep_classnames: true
					},
					parse: {},
					mangle: true,
					output: {
						indent_level: 0,
						comments: false,
						ascii_only: false
					}
				},
				parallel: true,
			}),
		],
	},

};

export const webpackConfigDev = {
	mode: 'development',
	devtool: 'source-map',
	...base
};
