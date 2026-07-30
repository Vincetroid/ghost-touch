const expoConfig = require('eslint-config-expo/flat');

module.exports = [
  ...expoConfig,
  {
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
];
