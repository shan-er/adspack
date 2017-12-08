/**
 * webpack 配置
 * @author shan-er
 */
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vendorConfig = require('../release/dll/vendorConfig.json');
const vendorManifest = require('../release/dll/vendor-manifest.json');
const extractSass = new ExtractTextPlugin({
    filename: 'assets/css/common-[hash].css',
    disable: process.env.NODE_ENV === "develop"
});

let getEntry = function() {
    let entry = {};

    glob.sync('./src/views/**/*.js').forEach(function(name) {
        let n = name.slice(name.lastIndexOf('src/views/') + 10, name.length - 3);
        n = n.slice(0, n.lastIndexOf('/'));
        entry[n] = name;
    });

    return entry;
}

let entries = getEntry();
let chunks = Object.keys(entries);
let htmlArray = chunks.map(function(name) {

    return new HtmlWebpackPlugin({
        template: "src/views/" + name + "/" + name + ".html",
        filename: "../release/" + name + ".html",
        inject: true,
        bundleName: process.env.NODE_ENV == 'production' ? 'dll/' + vendorConfig.vendor.js : '/release/dll/' + vendorConfig.vendor.js,
        chunks: [name],
        hash: false,
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    })
});

var config = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, '../release'),
        publicPath: '/release/',
        filename: 'js/[name]-[hash:8].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: path.resolve(__dirname, "../node_modules")
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                }, {
                    loader: "sass-loader"
                }],
                fallback: "style-loader"
            })
        }, {
            test: /\.css/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: 'file-loader?name=[name].[ext]&outputPath=assets/imgs/'
        }, {
            test: /\.(woff|eot|svg|ttf)(\?(\w|#)+)?$/,
            loader: 'file-loader?limit=20480&name=[name].[ext]&outputPath=assets/fonts/'
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    plugins: [
        extractSass,
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: vendorManifest
        })
    ].concat(htmlArray)

};

module.exports = config;