process.env.TZ = 'GMT';

module.exports = {
    testEnvironment: 'jsdom',
    automock: false,
    roots: ['<rootDir>/src'],
    preset: 'ts-jest',
    setupFiles: ['<rootDir>/tests/setupTest.js'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.md$': 'jest-raw-loader',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.jest.json',
        },
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    },
};
