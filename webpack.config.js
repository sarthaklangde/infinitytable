const path = require('path');
const webpack = require('webpack');
const colors = require('./src/styles/variables');

process.env.NODE_ENV = 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: "/"
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 8004,
    historyApiFallback: true
  },

  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["env", "react"],
            plugins: [
              [
                "react-css-modules", {
                  generateScopedName: "[name]__[local]___[hash:base64:5]",
                  webpackHotModuleReloading: true,
                  handleMissingStyleName: "warn"
                }
              ],
              "transform-class-properties",
              "transform-object-rest-spread"]
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-import')(),
                require('autoprefixer')(),
                require('postcss-mixins')(),
                require('postcss-nested')(),
                require('postcss-simple-vars')({
                  variables: colors
                }),
                require('postcss-hexrgba')(),
                require('postcss-flexbugs-fixes')()
              ]
            }
          }
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
};