/**
 * @file 配置文件
 * @author shan-er
 */
module.exports = {
    directories: [],
    'pre-commit': ['precommit-msg', 'lint'],
    dependencies: [
        'vue'
    ],
    devDependencies: [
        'babel-core',
        'babel-eslint',
        'babel-loader',
        'babel-plugin-transform-runtime',
        'babel-preset-es2015',
        'babel-preset-stage-0',
        'extract-text-webpack-plugin',
        'eslint',
        'eslint-plugin-html',
        'html-webpack-plugin',
        'clean-webpack-plugin',
        'assets-webpack-plugin',
        'file-loader',
        'node-sass',
        'pre-commit',
        'sass-loader',
        'style-loader',
        'url-loader',
        'vue-loader',
        'vue-template-compiler',
        'vue-router',
        'css-loader',
        'webpack',
        'webpack-dev-server',
        'webpack-merge',
        'cross-env'
    ],
    scripts: {
        lint: 'eslint --ext .vue,.js ./src',
        fix: 'eslint --fix --ext .vue,.js ./src',
        'precommit-msg': `echo 'Pre-commit checks...' && exit 0`,
        dll: 'webpack --config build/webpack.dll.js',
        dev: 'cross-env NODE_ENV=develop webpack-dev-server --inline --hot --config build/webpack.dev.js',
        build: 'cross-env NODE_ENV=production webpack --progress --hide-modules --config build/webpack.prod.js'
    }
};