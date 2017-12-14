const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    publicPath: '/dist/',
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
    //   {
    //   test: /\.js?$/,
    //   enforce: 'pre',
    //   exclude: /node_modules/,
    //   use: {
    //     loader: 'eslint-loader',
    //     options: {
    //       formatter: require('eslint-friendly-formatter')
    //     }
    //   }
    // },
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/,
        use: 'file-loader'
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: '#inline-source-map',
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    inline: true,
    port: 8080,
    hot: true
  }
}

if (process.env.NODE_ENV === 'production') {
  delete module.exports.devtool
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ie8: true,
      compress: {
        warnings: false
      }}),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}
