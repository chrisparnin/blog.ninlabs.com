require 'rack'
require 'ruhoh'
use Rack::Static, :urls => ["/media"]
run Ruhoh::Program.preview

# To preview your blog in "production" mode:
# run Ruhoh::Program.preview(:env => 'production')
