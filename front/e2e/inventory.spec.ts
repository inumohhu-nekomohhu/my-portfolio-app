import { test, expect } from '@playwright/test'
import { loginAsTestUser } from './helpers/auth'

// E2E: 在庫管理フローテスト
// 前提: docker compose up -d でローカル環境が起動していること
// 前提: test@example.com / password のテストユーザーがDBに存在すること

test.describe('在庫管理フロー', () => {

  test.describe('認証ガード', () => {
    test('未ログイン状態で在庫ページにアクセスするとログインにリダイレクトされる', async ({ page }) => {
      await page.goto('/inventory')
      await expect(page).toHaveURL(/login/)
    })
  })

  // 以下は実際のAPIサーバーが起動している場合のみ実行
  // docker compose up -d 後にコメント解除して使用
  test.describe('在庫一覧画面', () => {
    test.beforeEach(async ({ page }) => {
      await loginAsTestUser(page)
      await page.goto('/inventory')
    })

    test('在庫一覧画面の必須要素が表示されている', async ({ page }) => {
      await expect(page.getByRole('heading', { name: '在庫一覧' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'データを追加' })).toBeVisible()
    })

    test('「データを追加」ボタン押下でモーダルが表示される', async ({ page }) => {
      await page.getByRole('button', { name: 'データを追加' }).click()
      // モーダル内のフォーム要素が表示されることを確認
      await expect(page.getByRole('button', { name: /登録|追加/i })).toBeVisible()
    })

    test('在庫一覧画面のスクリーンショット（ビジュアルリグレッション）', async ({ page }) => {
      await page.waitForTimeout(500)
      await expect(page).toHaveScreenshot('inventory-list.png', {
        mask: [page.locator('img')],
      })
    })
  })
})