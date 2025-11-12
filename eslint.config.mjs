import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended',
  ),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'scripts/**',
      'global/api/ep.ts',
    ],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off', // 빈 타입 객체 허용
      '@next/next/no-img-element': 'off',
    },
  },
];

export default eslintConfig;
