module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: [
      '<rootDir>/common/**/*.{ts,js}',
      '<rootDir>/module/**/*.{ts,js}',
    ],
    coverageDirectory: '../coverage',
    // Feel free to increase these values as your coverage grows
    coverageThreshold: {
      global: {
        branches: 50,
        functions: 50,
        lines: 50,
        statements: 50,
      },
    },
    testEnvironment: 'node',
    // Keep these mappings synchronized with the ones in tsconfig.json as you add new modules
    moduleNameMapper: {
      '^@data/(.*)$': '<rootDir>/../data/$1',
      '^@common/(.*)$': '<rootDir>/common/$1',
      '^@configuration/(.*)$': '<rootDir>/configuration/$1',
      '^@address/(.*)$': '<rootDir>/module/address/$1',
      '^@appointment/(.*)$': '<rootDir>/module/appointment/$1',
      '^@contact-info/(.*)$': '<rootDir>/module/contact-info/$1',
      '^@dentist/(.*)$': '<rootDir>/module/dentist/$1',
      '^@patient/(.*)$': '<rootDir>/module/patient/$1',
      '^@user/(.*)$': '<rootDir>/module/user/$1',
  
      '^@test/(.*)$': '<rootDir>/test/$1',
      '^@/(.*)$': '<rootDir>/../src/$1',
      '^@root/(.*)$': '<rootDir>/../$1',
    },
  };
  