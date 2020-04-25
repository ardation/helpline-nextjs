/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

const setupDomainUrl = () => {
    let domainUrl;
    switch (process.env.STAGING) {
        case '0':
            domainUrl = process.env.NOW_URL
                ? JSON.stringify(`https://${process.env.NOW_URL}`)
                : JSON.stringify('https://www.findahelpline.com');
            break;
        case '1':
            domainUrl = process.env.NOW_URL
                ? JSON.stringify(`https://${process.env.NOW_URL}`)
                : JSON.stringify('https://stage.findahelpline.com');
            break;
        default:
            domainUrl = process.env.NOW_URL
                ? JSON.stringify(`https://${process.env.NOW_URL}`)
                : JSON.stringify('http://localhost:3000');
            break;
    }
    return domainUrl;
};

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
        new webpack.DefinePlugin({
            DOMAIN_URL: setupDomainUrl(),
        }),
    ],
};
