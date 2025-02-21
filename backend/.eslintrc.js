module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'no-unused-vars': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'prettier/prettier': 'error'
  }
};