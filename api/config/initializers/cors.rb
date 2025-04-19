#以下を追記する。
Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:5173', 'http://my-portfolio-frontend-20250419.s3-website-ap-northeast-1.amazonaws.com', 'https://api.linuxstudy5678.com'
  
      resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
          credentials: true
    end
  end
