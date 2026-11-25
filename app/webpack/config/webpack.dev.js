const path = require('path');
// const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.js'); // 基类配置

// dev-server 配置
const DEV_SERVER_CONFIG = {
  PORT: 9002,
  HOST: '127.0.0.1',
  HRM_PATH: '__webpack_hmr',
  TIMEOUT: 20000,
};

// 开发阶段的 entry 配置需要加入 hmr
Object.keys(webpackBaseConfig.entry).forEach(key => {
  if (key !== 'vendor') {
    webpackBaseConfig.entry[key] = [
      // 主入口文件
      webpackBaseConfig.entry[key],
      // hmr 更新入口，官方指定的 hmr 路径
      `webpack-hot-middleware/client?path=http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}/${DEV_SERVER_CONFIG.HRM_PATH}&timeout=${DEV_SERVER_CONFIG.TIMEOUT}?reload=${DEV_SERVER_CONFIG.TIMEOUT}`,
    ];
  }
});

// 生产环境 webpack 配置
const webpackConfig = webpackMerge.smart(webpackBaseConfig, {
  // 指定开发环境模式
  mode: 'development',
  // 开发环境 sourceMap 开发工具，呈现代码的映射关系，便于在开发过程中调试代码
  devtools: 'eval-cheap-module-source-map',
  // 开发环境的 output
  output: {
    // 打包后的文件名
    filename: 'js/[name].[contenthash:8].bundle.js',
    // 打包后的文件存放路径
    path: path.resolve(process.cwd(), './app/public/dist/dev/'), // 输出目录,
    // 打包后文件引用路径
    publicPath: `http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}/public/dist/dev/`, // 外部资源公共路径
    globalObject: 'this',
  },
  // 开发阶段插件
  plugins: [],
});

module.exports = {
  // webpack 配置
  webpackConfig,
  // dev-server 配置, 暴露给 dev.js 使用
  DEV_SERVER_CONFIG,
};
