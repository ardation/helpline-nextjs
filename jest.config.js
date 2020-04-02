module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/tsconfig.jest.json',
        },
    },
};
