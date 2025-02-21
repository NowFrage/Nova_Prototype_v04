module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:prettier/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': 'error'
  }
};