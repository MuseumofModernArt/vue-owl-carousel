const webpack = require('webpack');
const {merge} = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

const config = {
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[ext]?[contenthash]',
        },
      },
    ],
  },
  externals: {
    moment: 'moment',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          sourceMap: false,
          mangle: true,
          compress: {
            warnings: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
};

module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-owl-carousel.min.js',
      libraryTarget: 'window',
      library: 'VueOwlCarousel',
    },
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/Carousel.vue'),
    output: {
      filename: 'vue-owl-carousel.js',
      libraryTarget: 'umd',
      library: 'vue-owl-carousel',
      umdNamedDefine: true,
    },
  }),
];
