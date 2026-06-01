import type { Meta, StoryObj } from '@storybook/react'
import InventoryCard from './InventoryCard'

const meta: Meta<typeof InventoryCard> = {
  title: 'Inventory/InventoryCard',
  component: InventoryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof InventoryCard>

// 期限に余裕あり（緑枠）
export const Fresh: Story = {
  args: {
    item: {
      id: 1,
      name: 'キャベツ',
      category: '野菜',
      expiration_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0],
    },
  },
}

// 期限3日以内（黄色枠）
export const NearExpiry: Story = {
  args: {
    item: {
      id: 2,
      name: 'たまご',
      category: '乳製品',
      expiration_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0],
    },
  },
}

// 期限切れ（赤枠）
export const Expired: Story = {
  args: {
    item: {
      id: 3,
      name: '牛乳',
      category: '乳製品',
      expiration_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0],
    },
  },
}

// 画像あり
export const WithImage: Story = {
  args: {
    item: {
      id: 4,
      name: 'トマト',
      category: '野菜',
      expiration_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0],
      image_url: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=288&h=288&fit=crop',
    },
  },
}