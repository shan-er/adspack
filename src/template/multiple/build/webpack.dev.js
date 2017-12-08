/**
 * webpack 配置
 * @author shan-er
 */
const merge = require('webpack-merge');
const config = require('./webpack.base');
var webpack = require('webpack');
var path = require('path');
const url = require('url');

var devConfig = merge(config, {
    devtool: 'cheap-module-inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../'),
        hot: true,
        historyApiFallback: true,
        publicPath: '/release/',
        noInfo: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('develop')
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]

});
module.exports = devConfig;