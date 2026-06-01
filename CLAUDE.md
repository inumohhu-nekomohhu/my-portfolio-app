# SmartPantryManager - CLAUDE.md

## プロジェクト概要

食材在庫管理 + 楽天レシピAPI連携アプリ。転職ポートフォリオ用。
Rails API + React SPA + AWS（EB / RDS / S3 / CloudFront）構成。

---

## 開発環境の起動

```bash
# コンテナ起動
docker compose up -d

# ログ確認
docker compose logs -f api

# Railsコンソール
docker compose exec api rails console

# マイグレーション
docker compose exec api rails db:migrate
```

ローカルURL:
- フロントエンド: http://localhost:5173
- バックエンドAPI: http://localhost:3000

---

## 技術スタック

### Frontend（`front/` ディレクトリ）
- React + TypeScript + Vite
- Tailwind CSS / Chakra UI v3
- React Router v6
- axios（axiosClient経由のみ・fetch直接利用禁止）
- JWT認証（localStorage保存）

### Backend（`api/` ディレクトリ）
- Ruby on Rails 7（APIモード）+ Ruby 3.2.2
- JWT認証 / bcrypt / has_secure_password
- Active Storage（画像管理）
- rack-cors（CORS制御）
- Puma + Nginx

### Database
- 開発: Docker内 MySQL 8.0（port: 4306）
- 本番: Amazon RDS（MySQL）

---

## コーディング規約

### React / TypeScript
- 関数コンポーネントのみ使用
- `any` 禁止（やむを得ない場合はコメントで理由を記載）
- UIとロジックを分離（カスタムフックを活用）
- API通信は必ず `axiosClient.ts` 経由

### Rails
- Fat Controller回避（ロジックはモデル / サービスへ）
- Strong Parameters必須
- APIレスポンス形式を統一（JSON）

### Tailwind
- Utility Firstを徹底
- 独自CSSは最小限に抑える

---

## よく触るファイル

### Frontend
```
front/src/
├── axiosClient.ts          # axios共通設定・インターセプタ
├── components/
│   ├── RequireAuth.tsx     # 認証ガード
│   ├── inventory/
│   │   ├── InventoryForm.tsx
│   │   └── InventoryEditForm.tsx
│   └── user/
│       └── UserManagement.tsx
└── hooks/
    └── useAllUsers.ts
```

### Backend
```
api/
├── Dockerfile
├── config/
│   ├── database.yml        # DB接続（DATABASE_URL参照）
│   ├── storage.yml         # Active Storage切り替え
│   ├── master.key          # Gitに含めない
│   └── environments/
│       ├── production.rb   # config.hosts設定など
│       └── development.rb
└── app/models/
    └── pantry_item.rb      # 在庫モデル・画像URL生成
```

---

## AWS構成（本番）

```
CloudFront → S3（フロントエンド）
CloudFront → ALB → Elastic Beanstalk（Rails API + Docker）
                         ↓
                    RDS（MySQL）
                    S3（my-inventry-images）← 画像専用
```

| 項目 | 値 |
|------|-----|
| EB環境名 | my-api-env-v2 |
| フロントS3バケット | my-portfolio-frontend-20250419 |
| 画像S3バケット | my-inventry-images |
| API URL | https://api.linuxstudy5678.com |
| Front URL | https://linuxstudy5678.com |

### デプロイコマンド

```bash
# バックエンド
eb deploy
eb status   # Green確認
eb logs     # エラー確認

# フロントエンド
cd front
npm run build
# distをS3バケットにアップロード
```

---

## 禁止事項・注意事項

- `.env` / `master.key` をGitにコミットしない
- 本番RDSを開発環境から直接操作しない
- 画像はフロントS3バケットではなく `my-inventry-images` に保存
- Chakra UI v3では `value` プロパティが必須（v2と挙動が異なる）
- `config.hosts` に本番ドメインがないと「Blocked hosts」エラー

---

## よくあるエラーと対処

| エラー | 原因 | 対処 |
|--------|------|------|
| 502 Bad Gateway | Pumaポート不一致・コンテナ起動失敗 | `eb logs` で確認 |
| Blocked host | production.rb の hosts設定漏れ | `config.hosts << "api.linuxstudy5678.com"` |
| InvalidMessage | RAILS_MASTER_KEY不一致 | EBの環境変数を再設定 |
| CORS error | cors.rb のオリジン設定漏れ | CloudFront URLを許可リストに追加 |
| 画像404 | S3設定・IAM権限不足 | storage.yml・IAMポリシー確認 |

---

## 最重要方針

「技術的な最適解」より「実際に動作すること」を優先する。

複数案がある場合は **推奨案 → 簡易案 → 本格案** の順で提示する。

不明点がある場合は推測で断定せず、確認すべき情報（コード・ログ・AWS設定値）を明示してから回答する。
