const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    module: [
        rules: [
            
        ]
    ],
    plugins: [
        new MiniCssExtractPlugin({})
    ]
}

module.exports = merge(commonConfig, prodConfig)