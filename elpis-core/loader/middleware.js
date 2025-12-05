const glob = require('glob');
const path = require('path');

const { sep } = path;

/**
 * middleware loader
 * @param {object} app Koa 实例 
 * 
 * 加载所有 middleware，可以通过 ‘app.middleware.${目录}.${文件}’ 的方式访问'
 *
 * @example app/middleware
    |
    | --custom - module 
          | -- custom-middleware.js

    => app.middleware.customModule.customMiddleware
 *
 */
module.exports = app => {
  // 读取app/middleware/**/**.js
  const middlewarePath = path.resolve(app.businessPath, `.${sep}middleware`);
  // 提取所有的文件
  const fileList = glob.sync(path.resolve(middlewarePath, `.${sep}**${sep}**.js`));
  // 遍历所有文件目录，把内容加载到app.middlewares下
  const middlewares = {};

  fileList.forEach(file => {
    // 提取文件名称
    let fileName = path.resolve(file);

    // 截取路径 app/middlewares/custom-module/custom-middleware => custom-module/custom-middleware
    fileName = fileName.substring(
      fileName.lastIndexOf(`middleware${sep}`) + `middleware${sep}`.length,
      fileName.lastIndexOf('.'),
    );

    // 把‘-’统一改为驼峰式， custom-module/middleware.js => customModule.customMiddleware
    fileName = fileName.replace(/[-_ ]+(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));

    // 挂在middlewares 到内存app 对象中
    let tempMiddleware = middlewares;
    const fileNameArr = fileName.split(sep);

    for (let i = 0; i < fileNameArr.length; i++) {
      if (i === fileNameArr.length - 1) {
        tempMiddleware[fileNameArr[i]] = require(path.resolve(file))(app);
      } else {
        if (!tempMiddleware[fileNameArr[i]]) {
          tempMiddleware[fileNameArr[i]] = {};
        }
        tempMiddleware = tempMiddleware[fileNameArr[i]];
      }
    }
  });

  // 挂载
  app.middlewares = middlewares;
};
