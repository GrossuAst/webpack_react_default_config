const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development", 
    entry: ["@babel/polyfill", "./src/index.jsx"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[fullhash].js"
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HTMLWebpackPlugin({template: "./src/index.html"}),
        new CleanWebpackPlugin()
    ],
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
    },
    module: {
        rules: [
            {
                test: /\.module\.scss$/, 
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      modules: {
                        auto: true,
                      },
                    },
                  },
                  'sass-loader',
                ],
            },
            {
                test: /\.(css|scss)$/,
                exclude: /\.module\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/i,
                use: ['file-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  },
                },
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                    }
                }
            }
        ]
    },
}