module.exports = () => {
	return {
		roots: ['<rootDir>/src'],
		collectCoverageFrom: ['src/**/*.{js,jsx}'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    ],
    transform: {
      '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest'
    },
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
    ]
	}
}