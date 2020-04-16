require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

const setupDomainUrl = () => {
    let domainUrl;
    switch (process.env.STAGING) {
        case '0':
            domainUrl = JSON.stringify('https://www.findahelpline.com');
            break;
        case '1':
            domainUrl = JSON.stringify('https://stage.findahelpline.com');
            break;
        default:
            domainUrl = JSON.stringify('http://localhost:3000');
            break;
    }
    return domainUrl;
};

module.exports = {
    mode: 'production',
    entry: {
        widget: './src/widget/widget.js',
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
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
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
