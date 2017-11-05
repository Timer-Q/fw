var path = require('path')
var webpack = require('webpack')
// 自动打开浏览器插件
var OpenBrowserPlugin = require('open-browser-webpack-plugin')
var shell = require('shelljs')

// 复制配置文件
shell.cp('-R', './src/config/dev.env.js', './src/config/env.js')

let targetApiHost = process.env.targetApiHost
if (targetApiHost == undefined || targetApiHost == null) {
    targetApiHost = ""
}

let targetInclude = process.env.targetInclude
if (targetInclude == undefined || targetInclude == null) {
    targetInclude = ""
}

const resolvePath = (dir) => {
    return path.resolve(__dirname, dir)
}

module.exports = {
    devtool: 'source-map',
    // 指定spa应用的入口文件
    entry: path.resolve(__dirname, 'src/main.js'),
    // 指定项目构建的输出位置
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src"),
                loader: "eslint-loader",
                options: {
                    configFile: '.eslintrc.js'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: [
                            'babel-loader',
                            {
                                loader: "eslint-loader",
                                options: {
                                    configFile: '.eslintrc.js'
                                }
                            }
                        ],
                        css: 'style-loader!css-loader',
                        scss: 'style-loader!css-loader!sass-loader',
                        sass: 'style-loader!css-loader!sass-loader'
                    }
                }
            },
            {
                test: /iview.src.*?js$/,
                use: 'babel-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            // 处理在js中引用css文件
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // 处理在js中引用scss文件
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            // 处理图片操作  25000bit ~3kb
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader'
            },
            // 处理字体文件
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader'
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }

        ]
    },
    externals: {
        "BMap": "BMap",
        "BMapLib": "BMapLib"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolvePath('src'),
            '@Billing': resolvePath('src/containers/Billing'),
            '@B2B': resolvePath('src/containers/B2B'),
            '@Iframe': resolvePath('src/containers/Iframe'),
            '@Permission': resolvePath('src/containers/Permission'),
            '@Crm': resolvePath('src/containers/Crm'),
            '@Pay': resolvePath('src/containers/Pay'),
            '@Tms': resolvePath('src/containers/Tms'),
            '@Wms': resolvePath('src/containers/Wms'),
            '@CodeRule': resolvePath('src/containers/CodeRule'),
            '@Scm': resolvePath('src/containers/Scm'),
            '@asserts': resolvePath('src/asserts')
        }
    },
    devServer: {
        // 指定启动服务的更目录
        contentBase: __dirname + '/src',
        // 指定端口号
        port: 8080,
        host: 'localhost',
        // 启用热更新
        hot: true,
        // 以下信息可有可无，为了完整
        inline: true,
        historyApiFallback: true,
        noInfo: false,
        // stats: 'minimal',
        // publicPath: publicPath
    },
    plugins: [
        new webpack.DefinePlugin({
            'TARGET_API_HOST': JSON.stringify(targetApiHost),
            'TARGET_INCLUDE': JSON.stringify(targetInclude)
        }),
        new webpack.HotModuleReplacementPlugin(),
        // 删除文件夹的插件
        new OpenBrowserPlugin({url: 'http://localhost:8080/', browser: 'chrome'})
    ]
}
