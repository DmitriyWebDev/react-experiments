module.exports = {
  extends: 'react-app',
  rules: {
    'no-eval': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
  },
};
