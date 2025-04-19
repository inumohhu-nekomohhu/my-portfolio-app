require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # Code is not reloaded between requests.
  config.cache_classes = true

  # Eager load code on boot.
  config.eager_load = true

  # Full error reports are disabled and caching is turned on.
  config.consider_all_requests_local = false

  # Ensures that a master key has been made available.
  config.require_master_key = true

  # Disable serving static files by default.
  config.public_file_server.enabled = ENV["RAILS_SERVE_STATIC_FILES"].present?

  # Store uploaded files on the local file system.
  config.active_storage.service = :local

  # Force all access to the app over SSL.
  config.force_ssl = true

  # Logging
  config.log_level = :info
  config.log_tags = [ :request_id ]
  config.log_formatter = ::Logger::Formatter.new

  if ENV["RAILS_LOG_TO_STDOUT"].present?
    logger           = ActiveSupport::Logger.new(STDOUT)
    logger.formatter = config.log_formatter
    config.logger    = ActiveSupport::TaggedLogging.new(logger)
  end

  # Active Job
  # config.active_job.queue_adapter     = :resque
  # config.active_job.queue_name_prefix = "myapp_production"

  config.action_mailer.perform_caching = false

  # I18n fallbacks
  config.i18n.fallbacks = true

  # Deprecations
  config.active_support.report_deprecations = false

  # Migrations
  config.active_record.dump_schema_after_migration = false

  # Allow Elastic Beanstalk hostname
  config.hosts << "my-api-env.eba-dtktsrwd.ap-northeast-1.elasticbeanstalk.com"

  # ↓ Optionally allow all (not recommended for production)
  # config.hosts.clear
  
  #写真・画像ホスト先（本番）
  Rails.application.routes.default_url_options[:host] = 'https://my-api-env.eba-dtktsrwd.ap-northeast-1.elasticbeanstalk.com'
end
