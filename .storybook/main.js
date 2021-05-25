module.exports = {
    stories: ['../src/components/**/*.stories.tsx'],
    addons: ['@storybook/addon-actions/register', '@storybook/addon-viewport/register'],
    webpackFinal: async (config) => {
        const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'));
        fileLoaderRule.exclude = /\.svg$/;
        config.module.rules.unshift({
          test: /\.svg$/,
          use: '@svgr/webpack',
        });
        return config;
    },
};
