import { test, expect } from '@playwright/test'

// E2E: 在庫管理フローテスト
// 前提: ログイン済みの状態（認証テストで取得したトークンを利用）
// 開発再開時に認証状態の共有（storageState）を実装予定

test.describe('在庫管理フロー', () => {
  // ログインが必要なテストはローカル環境でのみ実行
  // CI環境での実行は今後設定予定

  test('未ログイン状態で在庫ページにアクセスするとログインにリダイレクトされる', async ({ page }) => {
    await page.goto('/inventory')
    // RequireAuthによるリダイレクトを確認
    await expect(page).toHaveURL(/login/)
  })
})