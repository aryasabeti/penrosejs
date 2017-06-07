const path = require('path');

const penroseBuild = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/'),
  },
};

const exampleProcessing = {
  entry: './example/processingjs/penroseView.js',
  output: {
    filename: 'example_processing.js',
    path: path.resolve(__dirname, 'example/processingjs/'),
  },
};

const exampleThree = {
  entry: './example/threejs/penroseView.js',
  output: {
    filename: 'example_three.js',
    path: path.resolve(__dirname, 'example/threejs/'),
  },
};

module.exports = [penroseBuild, exampleProcessing, exampleThree];
