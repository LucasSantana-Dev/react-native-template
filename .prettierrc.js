export default {
  bracketSpacing: true,
  bracketSameLine: false,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  semi: true,
  tabWidth: 2,
  printWidth: 100,
  endOfLine: 'auto',
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  useTabs: false,
  proseWrap: 'preserve',

  overrides: [
    {
      files: '*.{ts,tsx}',
      options: {
        parser: 'typescript',
        quoteProps: 'consistent',
      },
    },
    {
      files: '*.{js,jsx}',
      options: {
        parser: 'babel',
      },
    },
    {
      files: '*.json',
      options: {
        parser: 'json',
        trailingComma: 'none',
        singleQuote: false,
      },
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown',
        printWidth: 80,
        proseWrap: 'always',
      },
    },
    {
      files: '*.{yml,yaml}',
      options: {
        parser: 'yaml',
        singleQuote: false,
      },
    },
    {
      files: 'package.json',
      options: {
        parser: 'json-stringify',
        printWidth: 120,
        trailingComma: 'none',
      },
    },
  ],
};
