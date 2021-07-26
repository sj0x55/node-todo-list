module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};
