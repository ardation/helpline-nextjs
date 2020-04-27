/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        widget: './src/widget/widget.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: '[name].min.js',
        libraryTarget: 'umd',
        library: 'Widget',
        umdNamedDefine: true,
        globalObject: 'this',
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM',
        },
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', 'next/babel'],
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NOW_URL: 'http://localhost:3000',
        }),
    ],
};
