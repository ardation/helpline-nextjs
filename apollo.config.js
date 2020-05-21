module.exports = {
    client: {
        name: 'Find A Helpline',
        includes: ['pages/**', 'src/**'],
        excludes: ['**/*.test.tsx'],
        service: {
            name: 'api',
            url: 'https://api.findahelpline.com',
        },
    },
};
