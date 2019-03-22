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
                    }, 'sass-loader', 'postcss-loader'
                ] //loader执行顺序从下到上从右到左
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
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../')
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all', //代码分割只对异步代码有效果
            minSize: 30000, //大于30kb就分割
            minChunks: 1, //至少用了多少次 才进行代码分割
            maxAsyncRequests: 5, //文件里面请求超过五次的就不分割了
            maxInitialRequests: 3, //同上，只是是在首页
            automaticNameDelimiter: '~', //连接符 不配置filename 就用vendor~文件名
            name: true, //让cacheGroups内的filename有效
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/, //在node_modules中的
                    priority: -10, //优先级
                    // filename: 'vender.js'
                },
                default: {
                    priority: -20, //优先级更低
                    reuseExistingChunk: true, //
                    filename: 'common.js'
                }
            }
        }
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js', //
        path: path.resolve(__dirname, '../dist')
    }
}