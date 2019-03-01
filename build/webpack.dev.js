const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')


const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: './src/index.js'
    },
    devServer: {
        contentBase: './dist',
        open: true, //自动打开浏览器并访问
        hot: true //开启热加载 
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ], //
    optimization: {
        usedExports: true
    }
}

module.exports = merge(commonConfig, devConfig)