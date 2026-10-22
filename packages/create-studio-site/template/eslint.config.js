import next from '@studio/config/eslint/next';

export default [
  ...next,
  {
    languageOptions: {
      parserOptions: { tsconfigRootDir: import.meta.dirname },
    },
  },
];
