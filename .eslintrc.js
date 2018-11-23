module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': 0,
    'linebreak-style': 0,
    'no-unused-vars': 0,
    'arrow-parens': ['error', 'always'],
    'no-mixed-operators': 'off',
    'prefer-destructuring': ['error', { object: false, array: false }],
    'no-await-in-loop': 'off', // 禁止将 await 写在循环里，因为这样就无法同时发送多个异步请求了
    'max-len': [
      'error',
      {
        code: 200,
        ignorePattern: '<.*>$',
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
};
