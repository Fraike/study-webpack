const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]', //placeholder占位符
                    outputPath: 'images/',
                    limit: 20480
                }
            }
        },
        {
            test: /\.scss$/,
            use: ['style-loader',
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 2
                }
            },'sass-loader','postcss-loader'] //loader执行顺序从下到上从右到左
        },
        {
            test: /\.(eot|ttf|svg|woff)$/,
            use: {
                loader: 'file-loader'
            }
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader'
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader' //webpack和balel之间的桥梁
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist'],{
            root: path.resolve(__dirname,'../')
        })
    ], 
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname,'../dist')
    }
}