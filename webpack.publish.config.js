var path = require('path')
var webpack = require('webpack')
var CleanPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

console.log(process.env.HIVESCM_env)

// 根据环境变量不同获取不同的配置文件
var shell = require('shelljs')
shell.cp('-R', './src/config/dev.env.js', './src/config/env.js')

if (process.env.HIVESCM_env == 'testing') {
    shell.cp('-R', './src/config/test.env.js', './src/config/env.js')
}

if (process.env.HIVESCM_env == 'staging') {
    shell.cp('-R', './src/config/stag.env.js', './src/config/env.js')
}

if (process.env.HIVESCM_env == 'production') {
    shell.cp('-R', './src/config/prod.env.js', './src/config/env.js')
}


const resolvePath = (dir) => {
    return path.resolve(__dirname, dir)
}

module.exports = {
    // 指定spa应用的入口文件
    entry: {
        app: path.resolve(__dirname, 'src/main.js'),
        vendors: ['vue', 'vuex', 'vue-router', 'axios']
    },
    // 指定项目构建的输出位置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // 为了做代码的异步加载
        publicPath: '/',
        // 分块名称设置
        chunkFilename: '[name]_[chunkhash:8]_chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: [
                            'babel-loader',
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!postcss-loader",
                    // publicPath: "/dist",
                    // filename: "bundle.css",
                    // disable: false,
                    // allChunks: true
                })
            },
            // 处理在js中引用scss文件
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!postcss-loader!sass-loader"
                })
            },
            // 处理在js中引用less文件
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!postcss-loader!less-loader"
                })
            },
            // 处理图片操作
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader?limit=2500'
                // use: 'url-loader?limit=2500&name=[path]/[name].[ext]'
            },
            // 处理字体文件
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                // use: 'url-loader?limit=1000'
                use: 'url-loader?limit=1000&name=asserts/fonts/[name].[ext]'
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
    plugins: [
        // 删除文件夹的插件
        new CleanPlugin(['dist']),
        new CopyWebpackPlugin([
            {from: 'src/asserts', to: 'asserts/'},
            {from: 'src/data', to: 'data/'}
            // {from: 'Dockerfile', to: './'},
            // {from: 'nginx.conf', to: './'}
        ]),
        // 分离第三方应用的插件
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
        // 将 webpack 的样板(boilerplate)和 manifest 提取出来
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'runtime'
        // }),
        // 抽取样式文件的插件
        new ExtractTextPlugin("app.css"),
        // 自动生成html插件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/template.html',
            inject: true,
            htmlWebpackPlugin: {
                "files": {
                    "css": ["app.css"],
                    "js": ["vendors.js", "bundle.js"]
                }
            },
            minify: {
                caseSensitive: true,
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                preventAttributesEscaping: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeCommentsFromCDATA: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // 压缩混淆js代码插件
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_debugger: true,
                drop_console: true
            },
            comments: false
        }),
        // 在构建的过程中删除警告
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
}
