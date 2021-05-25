module.exports = {
    stories: ['../src/components/**/*.stories.tsx'],
    addons: ['@storybook/addon-actions/register', '@storybook/addon-viewport/register'],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack', 'url-loader']
        });

        return config;
    },
};
