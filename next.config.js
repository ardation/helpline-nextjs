module.exports = {
    env: {
        GA_ID: process.env.GA_ID,
        RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });
        return config;
    },
};
