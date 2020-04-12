'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const helpers = require('./helpers');
const isDev = process.env.NODE_ENV === 'development';

const pageNameArray = ['catalog', 'constructor', 'content'];

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: helpers.root('src', 'pages/index.html'),
  filename: 'index.html',
});

const pageHtmlWebpackPluginConfigArray = pageNameArray.map((entryName) => {
  return new HtmlWebpackPlugin({
    template: helpers.root('src', `pages/${entryName}.html`),
    filename: entryName + '.html',
  });
});

const webpackConfig = {
  entry: {
    polyfill: '@babel/polyfill',
    main: helpers.root('src', 'index.js'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': helpers.root('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [helpers.root('src')],
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{ loader: 'file-loader', options: { name: 'fonts/[name].[ext]' } }],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              runtimeCompat: true,
            },
          },
          'svgo-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: 'img/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin(),
    HtmlWebpackPluginConfig,
    ...pageHtmlWebpackPluginConfigArray,
  ],
};

module.exports = webpackConfig;
