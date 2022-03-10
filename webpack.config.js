// 最基本webpack配置
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 获取全局变量
console.log('process.env.NODE_ENV=',process.env.NODE_ENV)
const config = {
    entry: './src/index.js', // 打包入口
    mode: 'development', // 模式
    output: {
        filename:'bundle.js', // 文件名
        path: path.join(__dirname, 'dist') // 路径
    },
    module: {
        rules:[
            {
                test: /\.(s[ac]|c)ss$/i, //匹配所有的css文件
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //匹配所有的css文件
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name][hash:8].[ext]',
                        limit: 200 * 1024  // 大于50k拷贝 小于50k则转为base64
                    }
                }]
            },
            {

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(), // 引入插件
        new MiniCssExtractPlugin({
            filename: '[name][hash:8].css'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'public'), // 静态文件目录
        compress: true, //是否启动压缩 gzip
        port: 8080, // 端口号
        open: true // 自动打开浏览器
    },
}

module.exports = (env, argv) => {
    console.log('argv.mode=',argv.mode) // 打印 mode(模式) 值
    return config
}