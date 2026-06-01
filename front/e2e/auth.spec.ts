import { test, expect } from '@playwright/test'

// E2E: 認証フローテスト
// 前提: docker compose up -d でローカル環境が起動していること

test.describe('認証フロー', () => {
  test('ログイン画面が表示される', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/login/)
    await expect(page.getByRole('button', { name: /ログイン/i })).toBeVisible()
  })

  test('無効な認証情報でログイン失敗する', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/メールアドレス/i).fill('invalid@example.com')
    await page.getByLabel(/パスワード/i).fill('wrongpassword')
    await page.getByRole('button', { name: /ログイン/i }).click()
    // エラーメッセージが表示されることを確認
    await expect(page.getByText(/メールアドレスまたはパスワード/i)).toBeVisible()
  })

  // 有効なユーザーでのログインテストは開発再開時に追加
  // test('有効な認証情報でログイン成功する', async ({ page }) => {
  //   await page.goto('/login')
  //   await page.getByLabel(/メールアドレス/i).fill('test@example.com')
  //   await page.getByLabel(/パスワード/i).fill('password')
  //   await page.getByRole('button', { name: /ログイン/i }).click()
  //   await expect(page).toHaveURL(/dashboard/)
  // })
})