const prettierrc = require('./.prettierrc');

module.exports = {
  extends: ['@whatasoda'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "prettier/prettier": ["error", prettierrc],
  }
}
