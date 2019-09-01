module.exports = {
  extends: ['@whatasoda'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'error',
  }
}
