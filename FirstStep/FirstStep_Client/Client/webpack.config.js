var HtmlWebpackPlugin = require('html-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

var ExtractTextWebpackPluginConfig = new ExtractTextWebpackPlugin('bundle.css');

module.exports = {
    entry: [
      './app/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: "index_bundle.js"
    },
    module: {
        loaders:  [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
          { test: /\.css$/, loader: ExtractTextWebpackPlugin.extract( 'style-loader', 'css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]' )}
        ]
    },
    plugins: [
        HTMLWebpackPluginConfig,
        ExtractTextWebpackPluginConfig
    ]
};
