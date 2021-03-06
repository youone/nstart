const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        main: path.join(__dirname, 'index.ts'),
        longpolling: path.join(__dirname, '/src/pages/longpolling/longpolling.js'),
        wasm: path.join(__dirname, '/src/pages/webassembly/webassembly.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, './dist'),
        library: 'thelib'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: [/node_modules/, path.resolve(__dirname, 'src/css')]
            },
            {
                test: /\.(woff(2)?|ttf|eot|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/'
                    }
                }]
            },
            {
                test: /\.wasm$/,
                type: "javascript/auto",
                loader: "file-loader",
                include: [
                    path.resolve(__dirname, 'src/wasm'),
                    path.resolve(__dirname, 'node_modules/mapping/src/wasm/bin'),
                    path.resolve(__dirname, '../mapping/src/wasm/bin'),
                ]
            }

        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },

    devServer: {
        port:3000,
        contentBase: path.join(__dirname, './dist'),
        inline: true,
        hot: true,
        historyApiFallback: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'longpolling',
            chunks: ['longpolling']
        }),
        new HtmlWebpackPlugin({
            template: "src/pages/webassembly/wasm.html",
            filename: 'wasm',
            chunks: ['wasm']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            // jQuery: 'jquery'
        })
    ],

    node: {
        fs: 'empty'
    }
};