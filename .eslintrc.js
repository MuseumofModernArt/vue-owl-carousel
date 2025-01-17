module.exports = {
  root: true,
  extends: ['plugin:vue/recommended', 'google'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
  },
  rules: {
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
  },
};
