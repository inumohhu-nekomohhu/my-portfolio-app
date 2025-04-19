# ベースイメージを指定
FROM ruby:3.2.2

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    nodejs \
    yarn \
    libvips42 \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリの設定
WORKDIR /myapp

# GemfileとGemfile.lockをコピーして依存関係をインストール
COPY Gemfile Gemfile.lock /myapp/
RUN bundle install

# アプリケーションのファイルをコピー
COPY . /myapp

# entrypoint.shのコピーと実行権限の付与
COPY ./entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh

# エントリーポイントの設定
ENTRYPOINT ["entrypoint.sh"]

# ポートのエクスポート
EXPOSE 3000

# Railsサーバーの起動コマンド（Puma）
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
