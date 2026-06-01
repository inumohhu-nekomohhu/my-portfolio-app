---
description: テストケースの考案・生成・実行を自動化するコマンド
allowed-tools: Read, Glob, Grep, Edit, Write, Bash
---

## コンテキスト
- プロジェクト構成: !`cat ../../CLAUDE.md`
- フロントテストファイル一覧: !`find ../../front/src -name "*.test.*" -o -name "*.spec.*" 2>/dev/null | head -20`
- バックテストファイル一覧: !`find ../../api/spec -name "*_spec.rb" 2>/dev/null | head -20`

## タスク

引数 `$ARGUMENTS` に指定されたコンポーネント・機能・コントローラーに対して、以下を順番に実施してください。

### 1. 対象ファイルの特定
- 引数に対応するソースファイルを探す
- フロントの場合: `front/src/` 以下
- バックエンドの場合: `api/app/` 以下

### 2. テストケースの考案
以下の観点でテストケースを列挙する：
- 正常系（ハッピーパス）
- 異常系（エラー・バリデーション失敗）
- 境界値
- 認証が必要な操作

### 3. テストコードの生成
- フロント: Vitest + Testing Library形式で `src/test/` または対象ファイルと同階層に生成
- バック: RSpec形式で `spec/` 以下の適切な場所に生成
- FactoryBot・Fakerを活用する

### 4. テストの実行
- フロント: `cd front && npm run test`
- バック: `cd api && bundle exec rspec [生成したspecファイルパス]`

### 5. 結果の報告
- 成功・失敗の件数を報告
- 失敗したテストがあれば原因を分析して修正案を提示

## 注意事項
- `any` 型は使わない
- テストはコーディング規約に従う
- 本番環境（RDS・本番API）には接続しない
- テストデータはFactoryBot・Fakerで生成する