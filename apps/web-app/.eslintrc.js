module.exports = {
  root: false,
  env: {
    browser: true,
    jest: true,
  },
  settings: {
    react: { version: 'detect' },
  },
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
  plugins: ['react-hooks'],
  ignorePatterns: ['*.codegen.ts'],
  rules: {
    'react/jsx-sort-props': 'error',
    'react/react-in-jsx-scope': 'off',
  },
};
