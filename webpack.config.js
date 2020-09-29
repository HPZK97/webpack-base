const path = require('path')
const webpack = require('webpack')
const babelMinify = require("babel-minify-webpack-plugin")
const ExtractTextPlugin = require('mini-css-extract-plugin')

module.exports = (env, args) => {

    const isProd = args.mode === 'production'

    let styleLoader = {
        loader: ExtractTextPlugin.loader,
        options: {
            hmr: !isProd
        }
    }

    return {
        entry: './src/js/index.js',
        performance: {
            hints: false
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.(sass)$/,
                    use: [
                        styleLoader,
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(css)$/,
                    use: [
                        styleLoader,
                        'css-loader',
                        'postcss-loader',
                    ]
                }
            ]
        },
        plugins: [
            new babelMinify(),
            new ExtractTextPlugin({
                filename: 'css/main.css'
            }),
            /*
            new webpack.ProvidePlugin({
                $: "jquery/dist/jquery.min.js",
                jQuery: "jquery/dist/jquery.min.js",
            }),
            */
            new webpack.HotModuleReplacementPlugin()
        ],
        resolve: {
            extensions: ['*', '.js']
        },
        output: {
            path: path.join(__dirname, 'dist/'),
            publicPath: path.join(__dirname, 'public/'),
            filename: 'js/main.js'
        },
        devServer: {
            contentBase: './',
            hot: true,
            open: true,
            proxy: {
                "/": {
                    target: "https://example.con",
                    secure: false,
                    changeOrigin: true
                }
            }
        }
    }
}