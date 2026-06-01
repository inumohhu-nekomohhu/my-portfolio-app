import type { Page } from '@playwright/test'

// テスト用ユーザー情報
// 開発環境のDBにシードデータとして登録されているユーザーを想定
export const TEST_USER = {
  email: 'test@example.com',
  password: 'password',
}

/**
 * ログイン処理を行いJWTをlocalStorageにセットする
 * 各テストのbeforeEachで呼び出して認証状態を作る
 */
export async function loginAsTestUser(page: Page) {
  await page.goto('/login')
  await page.getByPlaceholder('メールアドレス').fill(TEST_USER.email)
  await page.getByPlaceholder('パスワード').fill(TEST_USER.password)
  await page.getByRole('button', { name: 'ログイン' }).click()
  // ダッシュボードへ遷移するまで待機
  await page.waitForURL(/dashboard/)
}

/**
 * localStorageにJWTを直接セットしてログイン状態を再現する（高速版）
 * JWTトークンが既知の場合に使用
 */
export async function setAuthToken(page: Page, token: string) {
  await page.goto('/')
  await page.evaluate((t) => {
    localStorage.setItem('jwt', t)
  }, token)
}