# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'tinymce_instagram/version'

Gem::Specification.new do |spec|
  spec.name          = "tinymce_instagram"
  spec.version       = TinymceInstagram::VERSION
  spec.authors       = ["Tyralion"]
  spec.email         = ["piliaiev@gmail.com"]

  spec.summary       = %q{Plugin for TinyMCE for instagram cards.}
  spec.description   = %q{Plugin for TinyMCE for instagram cards.}
  spec.homepage      = "https://github.com/dancingbytes/tinymce_instagram"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.require_paths = ["lib"]

  spec.license       = "BSD"
  spec.add_runtime_dependency "railties", ">= 3.2", "< 5"
end
