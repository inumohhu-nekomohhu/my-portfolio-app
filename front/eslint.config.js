import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // --- React Hooks ---
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // useEffectの依存配列にeslint-disableを実質使わせない
      'react-hooks/exhaustive-deps': 'warn',

      // --- TypeScript ---
      // any禁止（コーディング規約: any禁止）
      '@typescript-eslint/no-explicit-any': 'error',
      // 未使用変数をエラーに（_ プレフィックスは除外）
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // 型のみのimportはtype importを使う
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports' },
      ],

      // --- 一般ルール ---
      // fetch直接利用禁止（axiosClient経由のみ許可）
      'no-restricted-globals': [
        'error',
        {
          name: 'fetch',
          message: 'fetch直接利用は禁止です。axiosClientを使用してください。',
        },
      ],
      // console.logを警告（本番コードへの混入防止）
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
)
