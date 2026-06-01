import { describe, it, expect } from 'vitest'

// Vitestの動作確認用サンプルテスト
// 開発再開時に実際のコンポーネントテストに置き換えてください
describe('Vitest セットアップ確認', () => {
  it('テスト環境が正常に動作している', () => {
    expect(1 + 1).toBe(2)
  })

  it('文字列の検証ができる', () => {
    const appName = 'SmartPantryManager'
    expect(appName).toContain('Pantry')
  })
})