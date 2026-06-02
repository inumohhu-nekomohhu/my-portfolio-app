---
description: デプロイ・動作確認・トラブルシューティングを自動化するコマンド
allowed-tools: Read, Glob, Grep, Edit, Write, Bash, mcp__aws-mcp__call_aws, mcp__aws-mcp__suggest_aws_commands
---

## コンテキスト
- プロジェクト構成: !`cat ../../CLAUDE.md`

## 使い方
引数 `$ARGUMENTS` に応じて以下のモードで動作します：

- `backend` → バックエンド（EB）のデプロイ状況確認・ログ取得
- `frontend` → フロントエンド（S3/CloudFront）のデプロイ状況確認
- `check` → 本番環境の全体的な動作確認
- `logs` → EBの最新ログを取得してエラーを分析
- `rollback` → 直前のバージョンへロールバック（確認後実施）
- 引数なし → 全体のデプロイ前チェック

## タスク

### 引数が `backend` の場合
1. EBのヘルス確認
   ```
   aws elasticbeanstalk describe-environments --application-name my-api-app --environment-names my-api-env-v2 --region ap-northeast-1
   ```
2. ステータスが Green でない場合はログを取得して原因を分析
3. よくあるエラーと照合して修正案を提示

### 引数が `frontend` の場合
1. S3バケットの最終更新日時を確認
   ```
   aws s3 ls s3://my-portfolio-frontend-20250419/index.html
   ```
2. CloudFrontのディストリビューション状態を確認
3. 本番URL（https://linuxstudy5678.com）にアクセスして疎通確認

### 引数が `check` の場合
以下を順番に確認して結果を表にまとめる：
1. EBヘルス（Green/Yellow/Red）
2. RDS状態（利用可能かどうか）
3. S3バケット疎通
4. APIエンドポイント疎通（https://api.linuxstudy5678.com/health等）
5. フロントエンドURL疎通（https://linuxstudy5678.com）

### 引数が `logs` の場合
1. EBの最新ログを取得
2. ERROR・WARNING・Exception を抽出
3. よくあるエラーと照合：
   - 502 Bad Gateway → Pumaポート・コンテナ起動失敗
   - Blocked host → production.rb の hosts設定漏れ
   - InvalidMessage → RAILS_MASTER_KEY不一致
   - CORS error → cors.rb のオリジン設定漏れ
4. 原因と修正方法を提示

### 引数が `rollback` の場合
1. 現在のバージョンと直前のバージョンを確認
2. ロールバック対象を提示して確認を求める
3. 承認後にロールバック実行

### 引数なし（デプロイ前チェック）の場合
以下をチェックして問題があれば警告する：
1. `.env` や `master.key` がgit管理されていないか確認
2. `front/.env.production` の VITE_API_URL が本番URLか確認
3. ESLintエラーがないか確認（`cd front && npm run lint`）
4. Vitestが全通過するか確認（`cd front && npm run test`）
5. 問題なければ「デプロイ準備OK」と報告

## 注意事項
- 本番RDS（MySQL）を直接操作しない
- デプロイ実行はGitHub Actions経由が原則（mainへのpushで自動実行）
- ロールバックは必ず確認を取ってから実施