# spec/factories/users.rb
FactoryBot.define do
    factory :user do
      email { Faker::Internet.email }
      password { "password" }
      password_confirmation { "password" }
      # 必要に応じて name や admin などの属性を追加
      name { Faker::Name.name }
      admin { false }
    end
  end
  