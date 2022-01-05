
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require('path');

module.exports = {
  entry: './App/App.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebPackPlugin()
  ]
};