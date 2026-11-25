const webpack = require('webpack');
const webpackProdConfig = require('./config/webpack.prod.js');

console.log('\nbuilding... \n');

webpack(webpackProdConfig, (err, stats) => {
  if (err) {
    console.log('%c [ err ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', err);

    return;
  }

  process.stdout.write(
    `${stats.toString({
      colors: true, // 在控制台输出彩色日志
      modules: false, // 不显示每个模块的打包信息
      children: false, // 不显示子编译任务信息
      chunks: false, // 不显示每个代码块的信息
      chunkModules: false, // 显示每个代码块的模块信息
    })}\n`,
  );
});
