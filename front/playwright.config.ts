import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  // テストファイルの場所
  testDir: './e2e',

  // タイムアウト設定
  timeout: 30 * 1000,
  expect: { timeout: 5000 },

  // テスト失敗時のリトライ（CI環境のみ）
  retries: process.env.CI ? 2 : 0,

  // 並列実行
  workers: process.env.CI ? 1 : undefined,

  // レポート
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],

  use: {
    // ローカル開発サーバーURL
    baseURL: 'http://localhost:5173',
    // テスト失敗時にスクリーンショットを撮る
    screenshot: 'only-on-failure',
    // テスト失敗時にトレースを記録
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // テスト前にVite開発サーバーを自動起動（ローカルのみ）
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:5173',
  //   reuseExistingServer: !process.env.CI,
  // },
})