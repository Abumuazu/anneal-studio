import react from '@studio/config/eslint/react';

export default [
  ...react,
  {
    languageOptions: {
      parserOptions: { tsconfigRootDir: import.meta.dirname },
    },
  },
];
