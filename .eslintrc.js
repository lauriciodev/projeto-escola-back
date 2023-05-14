module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    quotes: 'off',
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/first': 'off',
    'no-param-reassign': 'off',
    'comma-dangle': 'off',
    'consistent-return': 'off',
    'no-shadow': 'off',
    'no-unused-expressions': 'off',
    camelcase: 'off',
  },
};
