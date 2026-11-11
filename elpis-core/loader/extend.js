const glob = require('glob');
const path = require('path');

const { sep } = path;

/**
 * controller loader
 * @param {object} app Koa 实例 
 * 
 * 加载所有 extend ‘app.extend.${文件}’ 的方式访问'
 *
 * @example app/extend
    |
      | -- custom-extend.js

    => app.extend.customExtend
 *
 */
module.exports = app => {
  // 读取app/extend/**.js
  const extendPath = path.resolve(app.businessPath, `.${sep}extend`);
  // 提取所有的文件
  const fileList = glob.sync(path.resolve(extendPath, `.${sep}**${sep}**.js`));

  fileList.forEach(file => {
    // 提取文件名称
    let fileName = path.resolve(file);

    // 截取路径 app/extend/custom-extend => custom-extend
    fileName = fileName.substring(
      fileName.lastIndexOf(`extend${sep}`) + `extend${sep}`.length,
      fileName.lastIndexOf('.'),
    );

    // 把‘-’统一改为驼峰式， custom-module/extend.js => customModule.customExtend
    fileName = fileName.replace(/[-_ ]+(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));

    // 过滤 app 已经存在的 key
    for (let key in app) {
      if (key === fileName) {
        return;
      }
    }

    // 挂在 extend 到 app 上
    app[fileName] = require(path.resolve(file))(app);
  });
};
