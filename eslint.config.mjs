import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      // 非必要不允许分号结尾
      semi: ['error', 'never'],
      // 非必要必须使用单引号
      quotes: ['error', 'single'],
      // 末尾留空行
      'eol-last': ['error', 'always'],
      // 缩进2个空格
      indent: ['error', 2],
      // 禁止出现对象字面量中的拖尾逗号
      'comma-dangle': ['error', 'never']
    }
  }
)
