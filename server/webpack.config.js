const path = require('path');

module.exports = {
  entry: './server/index.js', // Adjust this path to your actual entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist') // Adjust if your output directory is different
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
