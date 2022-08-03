/* eslint-env node */

module.exports = {
  env: {
    jest: true,
  },
  extends: [
    '@cylution/nodejs',
  ],
  overrides: [
    // typescript
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/type-annotation-spacing': ['warn', {
          before: false,
          after: true,
        }],
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: {
            delimiter: 'none',
            requireLast: false,
          },
          singleline: {
            delimiter: 'comma',
            requireLast: false,
          },
          // overrides: {
          //   interface: {
          //     multiline: {
          //       delimiter: 'none',
          //       requireLast: false
          //     }
          //   }
          // }
        }],
        '@typescript-eslint/dot-notation': ['error', {
          allowPrivateClassPropertyAccess: true,
          allowProtectedClassPropertyAccess: true,
          // allowIndexSignaturePropertyAccess: true,
        }],
      },
      overrides: [
        {
          files: ['*.d.ts'],
          rules: {
            'no-use-before-define': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            // '@typescript-eslint/ban-types': 'off',
            // '@typescript-eslint/adjacent-overload-signatures': 'off',
          },
        },
      ],
    },
  ],
  rules: {
    'dot-notation': 'off',
  },
}
