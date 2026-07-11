const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    publicPath: 'auto',
    clean: true
  },
  devServer: {
    port: 2005,
    historyApiFallback: true,
    hot: false,
    liveReload: false
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'UserPaymentMethodsMFE',
      filename: 'remoteEntry.js',
      manifest: false,
      exposes: {
        './MFE': './src/UserPaymentMethods',
      },
      shared: {
        react: { 
          singleton: true,
          requiredVersion: '18.2.0'
        },
        'react-dom': { 
          singleton: true,
          requiredVersion: '18.2.0'
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '6.21.3'
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}; 