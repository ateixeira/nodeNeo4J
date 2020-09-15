const path = require('path');

module.exports = {
  entry: './src/public/js/main.ts',
  mode: 'development',
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../dist/public/js'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      }
    ]
  }
};
