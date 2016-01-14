var webpack = require("webpack");
var path = require("path");
var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = {
  entry: './main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.html$/, loader: "html-loader"}
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, "bower_components"),
      path.join(__dirname, "js"),
      path.join(__dirname, "css"),
      path.join(__dirname, "html")
    ],
    extensions: ["", ".js"],
    alias: {
      "jquery-tmpl": "jquery-tmpl/jquery.tmpl.min.js",
      "tablesort": "jquery.tablesort/jquery.tablesort.min.js"
    }
  },
  plugins: [
    new BowerWebpackPlugin(),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
