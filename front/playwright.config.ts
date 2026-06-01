import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
    // スクリーンショット比較の閾値（0〜1、小さいほど厳格）
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
    },
  },
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:5173',
    // 失敗時のスクリーンショット
    screenshot: 'only-on-failure',
    // 失敗時のトレース記録
    trace: 'on-first-retry',
    // ビジュアルリグレッション用: アニメーションを無効化
    actionTimeout: 10000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // スクリーンショット比較用に解像度を固定
        viewport: { width: 1280, height: 720 },
      },
    },
    // モバイル表示確認用（必要に応じてコメント解除）
    // {
    //   name: 'mobile-chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],
  // ローカルでViteサーバーが起動していない場合は自動起動（開発再開時にコメント解除）
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:5173',
  //   reuseExistingServer: !process.env.CI,
  // },
})