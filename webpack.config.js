module.exports = {
  entry: ['./app/main.js'],
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' }
    ]
  },
  externals: {
    "jquery": "jQuery",
    "webfontloader": "WebFont"
  }
};