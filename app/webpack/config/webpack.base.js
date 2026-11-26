/**
 * webpack 基础配置
 */
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const htmlWebpackPlugin = require('html-webpack-plugin');

// 动态构造 pageEntries 和 htmlWebpackPluginList
const pageEntries = {};
const htmlWebpackPluginList = [];

// 获取 app/pages 目录下的所有入口文件 (entry.xxx.js)
const entryList = path.resolve(process.cwd(), './app/pages/**/entry.*.js');

glob.sync(entryList).forEach(item => {
  const entryName = path.basename(item, '.js');
  // 构造 entry
  pageEntries[entryName] = item;
  // 构造最终渲染的页面
  htmlWebpackPluginList.push(
    new htmlWebpackPlugin({
      // 产物（最终模板）输出路径
      filename: path.resolve(process.cwd(), './app/public/dist/', `${entryName}.tpl`),
      // 指定要使用的模板文件
      template: path.resolve(process.cwd(), './app/view/entry.tpl'),
      // 需要注入的代码块 chunk
      chunks: [entryName],
    }),
  );
});

module.exports = {
  // 入口配置
  entry: pageEntries,
  // 模块解析配置(决定了要家长解析哪些模块，以及用什么方式去解释)
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        include: [path.resolve(process.cwd(), './app/pages')], // 只处理 pages 目录下的 js 文件
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 3000, // 小于 10   kb 的图片会被转成 base64
              name: 'img/[name].[hash:7].[ext]', // 输出路径和文件名
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?.+)?$/,
        use: 'file-loader',
      },
    ],
  },
  // 输出配置 产物输出路径 因为开发和生产环境不一样，所以需要动态配置
  output: {
    path: path.join(process.cwd(), './app/public/dist/prod'), // 输出目录
    filename: 'js/[name]_[chunkhash:8].bundle.js',
    publicPath: '/dist/', // 公共路径
    crossOriginLoading: 'anonymous', // 跨域加载
  },
  // 配置模块如何被解析（）
  resolveLoader: {},
  // 配置模块如何被解析（定义 webpack 在打包时，如何找到并解析 具体模块的路径）
  resolve: {
    extensions: ['.js', '.less', '.vue', '.css'], // 解析模块时，可以省略的扩展名
    alias: {
      $pages: path.resolve(process.cwd(), './app/pages'),
      $common: path.resolve(process.cwd(), './app/pages/common'),
      $widgets: path.resolve(process.cwd(), './app/pages/widgets'),
      $store: path.resolve(process.cwd(), './app/pages/store'),
    },
  },
  // 配置 Webpack 插件
  plugins: [
    // 处理 .vue文件， 这个插件是必须的
    // 它的只能是讲你定义过的其他规则复制并应用到 .vue 文件的
    // 例如 如果有一条匹配规则 /\.js$/ 的规则，那么它会应用到 .vue 文件中的 <script> 部分
    new VueLoaderPlugin(),
    // 把第三方库暴露到 Window context 上， 例如 jQuery, Lodash, React, Vue 等等
    new webpack.ProvidePlugin({
      Vue: 'vue',
      axios: 'axios',
      _: 'lodash',
    }),

    // 定义全局常量
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true, // 开启 Options API
      __VUE_PROD_DEVTOOLS__: false, // 关闭生产环境下的 devtools
      __VUE_PROD_HYDRATION_MISMATCH__: false, // 关闭生产环境下的 “水合“ 检查
    }),

    // 构造最终渲染的页面
    ...htmlWebpackPluginList,
  ],
  // 配置打包输出优化（代码分割，模块合并，缓存，TreeShaing, 压缩等优化策略）
  optimization: {
    /**
     * 把 js 文件打包成 3 种类型
     * 1、vendors.js  第三方库 基本不会改的，除非依赖版本升级
     * 2、common.js  业务组件代码的公共模块，多个页面都会用到的模块
     * entry.{page}:  不用页面 entry 里的业务组件代码的差异部分，经常改动
     * 目的：把改动和引用频率不一样的 js 区分出来，以达到更好的利用浏览器缓存效果
     */
    splitChunks: {
      chunks: 'all', // 对同步和异步模块都进行分割
      maxAsyncRequests: 10, // 每次异步加载的最大并行请求数量
      maxInitialRequests: 10, // 每个入口的最大并行请求数量
      cacheGroups: {
        vendors: {
          // 打包第三方依赖库
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/, // 打包 node_modules 中的文件
          priority: -20, // 优先级 数字越大，优先级越高
          enforce: true, // 强制执行
          reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        },
        common: {
          // 公共模块
          name: 'common', // 模块名称
          minChunks: 2, // 被两处引用即被归为公共模块
          priority: -10, // 优先级
          reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          minSize: 1, // 最小分割大小（1 byte）
        },
      },
    },
    // 将 webpack 运行时的代码打包到 run-time.js 中
    runtimeChunk: true,
  },
};
