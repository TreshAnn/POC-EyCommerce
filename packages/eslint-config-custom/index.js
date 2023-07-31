module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'simple-import-sort',
    '@typescript-eslint',
    'prettier',
    'react-hooks',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      { usePrettierrc: true, useTabs: false, singleQuote: true },
    ],
    '@typescript-eslint/no-duplicate-imports': 'error',
    '@typescript-eslint/quotes': [
      'warn',
      'single',
      { allowTemplateLiterals: true },
    ],
    '@typescript-eslint/semi': 'warn',
    'comma-dangle': 'off',
    indent: 'off',
    'no-console': 'error',
    'no-duplicate-imports': 'off',
    quotes: 'off',
    semi: 'off',
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',
    'sort-imports': 'off',
  },
};
