# db/seeds.rb

# 管理者ユーザーの作成（adminがtrue）
User.create!(
  email: 'admin@example.com',
  password: 'password',               # 平文パスワード。お好きなものに変更してください
  password_confirmation: 'password',
  admin: true,
  name: 'Admin'
)

# 通常ユーザーの作成（adminがfalse）
User.create!(
  email: 'user@example.com',
  password: 'password',               # 平文パスワード。お好きなものに変更してください
  password_confirmation: 'password',
  admin: false,
  name: 'Normal'
)
