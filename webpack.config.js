var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var execSync = require('child_process').execSync;
var minikubeip = "http://" + execSync('minikube ip').toString().slice(0,-1) + ":30001"
var env = process.env.NODE_ENV

var CSS_LOADER = {
  test: /\.scss$/
}

if (env !== 'production') {
  CSS_LOADER = Object.assign(CSS_LOADER, {loaders: ["style", "css", "sass"]})
} else {
  CSS_LOADER = Object.assign(CSS_LOADER, {loader: ExtractTextPlugin.extract('css!sass')})
}

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEV__'         : env === 'development',
      '__PROD__'        : env === 'production',
      '__SERVER_URL__'  : JSON.stringify(minikubeip),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'React'    : 'react',
      'ReactDOM' : 'react-dom'
    }),
    new ExtractTextPlugin('public/style.css', {
      'allChunks': true
    })
  ],
  module: {
    loaders: [CSS_LOADER, {
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
