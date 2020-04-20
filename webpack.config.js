const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = env => {
	const isDev = env === 'development';
  const isProd = env === 'production';

  return {
  	context: __dirname,
  	mode: isProd ? 'production' : 'development',
  	bail: isProd,
  	devtool: isProd ? 'source-map' : 'cheap-module-source-map',
  	devServer: {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true
    },
  	entry: path.resolve(__dirname, 'src/index.js'),
  	output: {
      path: path.resolve(__dirname, 'dist'),
      pathinfo: isDev,
      publicPath: '/',
      filename: isProd ? '[name].[contenthash:8].js' : 'bundle.js',
      futureEmitAssets: true,
      chunkFilename: isProd ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js',
		},
		resolve: {
		  extensions: ['.js'],
		},
		module: {
			strictExportPresence: true,
		  rules: [
		  	{ parser: { requireEnsure: false } },
		  	{
		  		oneOf: [
		  			{
  						test: /\.svg$/,
  						use: ['@svgr/webpack'],
						},
		  			{
		          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
		          loader: require.resolve('url-loader'),
		          options: {
		            limit: 10000,
		            name: 'media/[name].[hash:8].[ext]',
		          },
		        },
		        {
		    		  test: /\.(js|mjs|jsx)$/,
		    		  exclude: /(node_modules)/,
		    		  use: [
                { loader: 'babel-loader' },
		    		    { loader: 'thread-loader' },
		    		    { loader: 'cache-loader' },
		    		  ],
		    		},
		    		{
              loader: require.resolve('file-loader'),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'media/[name].[hash:8].[ext]',
              },
            },
		  		]
		  	}
		  ]
		},
		plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: 'public/index.html',
          },
          isProd
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: path.resolve(__dirname, 'public'),
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            fileName => !fileName.endsWith('.map')
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      new Dotenv({
        systemvars: isProd
      })
		].filter(Boolean),
	}
}