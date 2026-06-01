import { test, expect } from '@playwright/test'

// E2E: 認証フローテスト
// 前提: docker compose up -d でローカル環境が起動していること

test.describe('認証フロー', () => {

  test.describe('ログイン画面の表示', () => {
    test('ルートにアクセスするとログイン画面にリダイレクトされる', async ({ page }) => {
      await page.goto('/')
      await expect(page).toHaveURL(/login/)
    })

    test('ログイン画面の必須要素が表示されている', async ({ page }) => {
      await page.goto('/login')
      await expect(page.getByPlaceholder('メールアドレス')).toBeVisible()
      await expect(page.getByPlaceholder('パスワード')).toBeVisible()
      await expect(page.getByRole('button', { name: 'ログイン' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'こちら' })).toBeVisible()
    })

    test('ログイン画面のスクリーンショット（ビジュアルリグレッション）', async ({ page }) => {
      await page.goto('/login')
      // アニメーション完了を待つ
      await page.waitForTimeout(500)
      await expect(page).toHaveScreenshot('login-page.png', {
        // 背景画像などの動的コンテンツをマスク
        mask: [page.locator('img')],
      })
    })
  })

  test.describe('ログイン操作', () => {
    test('無効な認証情報でログイン失敗しエラーが表示される', async ({ page }) => {
      await page.goto('/login')
      await page.getByPlaceholder('メールアドレス').fill('invalid@example.com')
      await page.getByPlaceholder('パスワード').fill('wrongpassword')
      await page.getByRole('button', { name: 'ログイン' }).click()
      await expect(page.getByText(/メールアドレスまたはパスワード/i)).toBeVisible()
    })

    test('空のフォームで送信するとHTML5バリデーションが動作する', async ({ page }) => {
      await page.goto('/login')
      await page.getByRole('button', { name: 'ログイン' }).click()
      // required属性によりフォーム送信されない（URLが変わらない）
      await expect(page).toHaveURL(/login/)
    })

    test('サインアップリンクをクリックするとサインアップ画面に遷移する', async ({ page }) => {
      await page.goto('/login')
      await page.getByRole('link', { name: 'こちら' }).click()
      await expect(page).toHaveURL(/signup/)
    })
  })

  test.describe('認証ガード', () => {
    test('未ログイン状態で在庫ページにアクセスするとログインにリダイレクトされる', async ({ page }) => {
      await page.goto('/inventory')
      await expect(page).toHaveURL(/login/)
    })

    test('未ログイン状態でダッシュボードにアクセスするとログインにリダイレクトされる', async ({ page }) => {
      await page.goto('/dashboard')
      await expect(page).toHaveURL(/login/)
    })

    test('未ログイン状態でレシピ検索にアクセスするとログインにリダイレクトされる', async ({ page }) => {
      await page.goto('/recipes/search')
      await expect(page).toHaveURL(/login/)
    })
  })
})