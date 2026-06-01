import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'

const meta: Meta<typeof Login> = {
  title: 'Auth/Login',
  component: Login,
  tags: ['autodocs'],
  // React Routerのコンテキストが必要なためラップ
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Login>

// デフォルト: 空のログイン画面
export const Default: Story = {}

// エラー状態の確認用（Storybook上で手動で確認）
export const WithBackground: Story = {
  parameters: {
    docs: {
      description: {
        story: '背景画像付きのログイン画面。実際の表示確認用。',
      },
    },
  },
}