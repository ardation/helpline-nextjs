process.env.TZ = 'GMT';

module.exports = {
    roots: ['<rootDir>/src'],
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.md$': 'jest-raw-loader',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/tsconfig.jest.json',
        },
    },
};
