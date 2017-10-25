const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnano = require('cssnano');

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    main: [
      'babel-polyfill',
      'src/index',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 9000,
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [['es2015', { modules: false }], 'react', 'stage-1'],
          plugins: ['react-hot-loader/babel', 'transform-decorators-legacy', 'transform-class-properties'],
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => (
                  [
                    cssnano({
                      preset: 'advanced',
                      autoprefixer: { browsers: ['last 5 versions'] },
                      safe: true,
                    }),
                  ]
                ),
              },
            },
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './webpackHtmlTemplate.ejs'),
      appMountId: 'root',
      title: 'Netflix Slider',
      inject: false,
      mobile: true,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
    }),
    new UglifyJSPlugin({
      comments: false,
      sourceMap: true,
    }),
    new ExtractTextPlugin('styles.[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  resolve: {
    modules: [
      'node_modules',
    ],
    // directories where to look for modules

    extensions: ['.js', '.jsx', '.css'],
    // extensions that are used

    alias: {
      src: path.resolve(__dirname, '../src'),
      components: path.resolve(__dirname, '../src/components'),
      containers: path.resolve(__dirname, '../src/containers'),
      config: path.resolve(__dirname, '../src/config'),
      core: path.resolve(__dirname, '../src/core'),
      store: path.resolve(__dirname, '../src/store'),
      assets: path.resolve(__dirname, '../src/assets'),
    },
  },
};
