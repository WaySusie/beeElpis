// 本地开发启动 devServer
const express = require('express');
const path = require('path');
const consoler = require('consoler');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// 从 webpack.dev.js 中获取配置和 devServer 配置
const { webpackConfig, DEV_SERVER_CONFIG } = require('./config/webpack.dev.js');

const app = express();

const compiler = webpack(webpackConfig);

// 指定静态文件目录
app.use(express.static(path.join(__dirname, '../public/dist/')));

// 引用 devMiddleware中间件（监控文件改动）
app.use(
  webpackDevMiddleware(compiler, {
    //   落地文件
    writeToDisk: filePath => filePath.endsWith('.tpl'),

    // 资源路径
    publicPath: webpackConfig.output.publicPath,

    // headers配置
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    // 打印日志
    stats: {
      color: true, // 颜色
    },
  }),
);

// 引用 webpackHotMiddleware 中间件（热更新）
app.use(
  webpackHotMiddleware(compiler, {
    path: `/${DEV_SERVER_CONFIG.HRM_PATH}`,
    log: () => {},
  }),
);

// 引用 webpackHotMiddleware 中间件（热更新）

consoler.info('请等待 webpack 初次构建完成提示......');

// 启动devserver服务
const port = DEV_SERVER_CONFIG.PORT;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
