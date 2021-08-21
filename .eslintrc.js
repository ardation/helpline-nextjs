module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:jest/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@next/next/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'import/no-duplicates': 'error',
        'import/extensions': 'error',
        'import/order': 'error',
        'import/newline-after-import': 'error',
        'import/prefer-default-export': 'error',
        'import/no-named-default': 'error',
        'import/no-anonymous-default-export': 'error',
        'import/dynamic-import-chunkname': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
        {
            files: ['*.stories.tsx'],
            rules: {
                'import/no-anonymous-default-export': 'off',
            },
        },
    ],
};
