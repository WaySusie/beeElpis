const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 基类配置
const os = require('os');
const happyPack = require('happypack'); // 多进程打包

const MinCssExtractPlugin = require('mini-css-extract-plugin'); // 提取 css 文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空打包目录
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 优化并压缩 css 资源
const HtmlWebpackInjectAttributesPlugin = require('html-webpack-inject-attributes-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin'); // 压缩资源

// 多线程 build 设置
const happypackCommonConfig = {
  debug: false,
  threadPool: happyPack.ThreadPool({ size: os.cpus().length }),
};

// 生产环境 webpack 配置
const webpackConfig = webpackMerge.smart(baseConfig, {
  // 指定生产环境
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MinCssExtractPlugin.loader, 'happypack/loader?id=css', 'style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        include: [path.resolve(process.cwd(), './app/pages')], // 只处理 pages 目录下的 js 文件
        use: ['happypack/loader?id=js'],
      },
    ],
  },
  // 生产环境的 output
  output: {
    // 打包后的文件名
    filename: 'js/[name].[contenthash:8].bundle.js',
    // 打包后的文件存放路径
    path: path.join(process.cwd(), './app/public/dist/prod/'), // 输出目录,
    // 打包后文件引用路径
    publicPath: '/dist/prod',
    // 清除打包目录
    clean: true,
    // 跨域加载
    crossOriginLoading: 'anonymous',
  },
  // webpack 不会有大量 hints 信息, 默认为 warning
  performance: {
    hints: false,
  },

  plugins: [
    // 每次 build 前，清空 public/dist 目录
    new CleanWebpackPlugin(['public/dist'], {
      root: path.resolve(process.cwd(), './app/'),
      exclude: [],
      verbose: true,
      dry: false,
    }),
    // 提取 css 文件

    // 提取 css 的公共部分，有效利用缓存，（非公共部分使用 inline）
    new MinCssExtractPlugin({
      filename: 'css/[name]_[contenthash:8].bundle.css',
    }),
    // 优化并压缩 css 资源
    new CssMinimizerPlugin(),
    // 多进行打包 js，加快打包速度
    new happyPack({
      ...happypackCommonConfig,
      id: 'js',
      loaders: [
        `babel-loader?${JSON.stringify({
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
        })}`,
      ],
    }),
    // 多线程打包 css，加快打包速度
    new happyPack({
      ...happypackCommonConfig,
      id: 'css',
      loaders: [
        {
          path: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
      ],
    }),
    // 浏览器在请求资源时，不发送用户的身份凭证
    new HtmlWebpackInjectAttributesPlugin({
      crossorigin: 'anonymous',
    }),
  ],
  //
  optimization: {
    // 使用 TerserPlugin 的并发和缓存，提升压缩阶段的性能
    // 清除 console.log 避免泄露
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        cache: true, // 使用缓存来加速构建过程
        parallel: true, // 利用多核 CPU 并行执行任务，提升构建速度，加快压缩速度
        terserOptions: {
          compress: {
            drop_console: true, // 清除 console.log
          },
        },
      }),
    ],
  },
});

module.exports = webpackConfig;
