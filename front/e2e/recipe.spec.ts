import { test, expect } from '@playwright/test'
import { loginAsTestUser } from './helpers/auth'

// E2E: レシピ検索フローテスト
// 前提: docker compose up -d でローカル環境が起動していること

test.describe('レシピ検索フロー', () => {

  test.describe('認証ガード', () => {
    test('未ログイン状態でレシピ検索ページにアクセスするとログインにリダイレクトされる', async ({ page }) => {
      await page.goto('/recipes/search')
      await expect(page).toHaveURL(/login/)
    })
  })

  test.describe('レシピ検索画面', () => {
    test.beforeEach(async ({ page }) => {
      await loginAsTestUser(page)
      await page.goto('/recipes/search')
    })

    test('レシピ検索画面が表示される', async ({ page }) => {
      // 楽天レシピAPIのロード完了を待機
      await page.waitForTimeout(1000)
      await expect(page).toHaveURL(/recipes\/search/)
    })

    test('レシピ検索画面のスクリーンショット（ビジュアルリグレッション）', async ({ page }) => {
      await page.waitForTimeout(1000)
      await expect(page).toHaveScreenshot('recipe-search.png', {
        // 外部画像・動的コンテンツをマスク
        mask: [page.locator('img')],
        // API応答により内容が変わるためレイアウトのみ確認
        maxDiffPixelRatio: 0.1,
      })
    })
  })
})