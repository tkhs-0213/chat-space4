require_relative 'boot'

require 'rails/all'
# require 'devise'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace4
  class Application < Rails::Application
    config.generators do |g|
      g.stylesheets false
      g.javascripts false
      g.helper false
      g.test_framework false
    end
    config.i18n.default_locale = :ja
    config.time_zone = 'Tokyo' #表記を日本時間にする
  end
end
