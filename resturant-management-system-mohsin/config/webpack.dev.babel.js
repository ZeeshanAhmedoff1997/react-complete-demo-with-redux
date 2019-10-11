import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = {
  entry: path.resolve(__dirname, '../client/index.js'),
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    pathinfo: false
  },
  module: {
    rules: [{
      test: /\.js|jsx$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }, {
      test: /\.jsx?$/,
      include: /node_modules/,
      use: ['react-hot-loader/webpack']
    }, {
      test: /\.(le|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development'
          }
        },
        'css-loader'
      ]
    }, {
      type: 'javascript/auto',
      exclude: /(node_modules)/,
      test: /\.json?$/,
      loader: 'json-loader'
    }, {
      test: /\.(png|gif|jpe?g|svg|ico)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      }]
    }, {
      test: /\.html$/,
      type: 'javascript/auto',
      use: [{
        loader: 'html-loader'
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // filename: 'index.html',
      template: path.resolve(__dirname, '../client/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    port: 5200,
    proxy: {
      '/api': 'http://localhost:5000'
    },
    hot: true,
    historyApiFallback: true
  }
};

export default config;
