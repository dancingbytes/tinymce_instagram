module TinymceInstagram

  class Engine < ::Rails::Engine

    initializer 'TinymceInstagram.assets_pipeline' do |app|
      app.config.assets.precompile << "tinymce/plugins/instagram/*"
    end

  end # Engine

end # TinymceInstagram
