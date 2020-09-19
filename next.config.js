module.exports = {
    env: {
        GA_ID: process.env.GA_ID,
        RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,
        HOTJAR_ID: 1995997,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });
        return config;
    },
};
