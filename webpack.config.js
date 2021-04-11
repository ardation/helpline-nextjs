/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

let widgetUrl;

if (process.env.BASE_URL) {
    widgetUrl = `https://${process.env.BASE_URL}`;
} else if (process.env.NOW_URL) {
    widgetUrl = `https://${process.env.NOW_URL}`;
} else {
    widgetUrl = 'http://localhost:3000';
}

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
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            babel: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            WIDGET_URL: widgetUrl,
        }),
    ],
};
