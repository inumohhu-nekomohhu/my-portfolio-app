import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  // ストーリーファイルの場所
  stories: ['../src/**/*.stories.@(ts|tsx)'],

  addons: [
    '@storybook/addon-essentials',   // Controls, Actions, Docs等
    '@storybook/addon-interactions', // インタラクションテスト
    '@storybook/addon-a11y',         // アクセシビリティチェック
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },
}

export default config