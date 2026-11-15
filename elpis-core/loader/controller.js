const glob = require('glob');
const path = require('path');

const { sep } = path;

/**
 * controller loader
 * @param {object} app Koa 实例 
 * 
 * 加载所有 controller ‘app.controller.${目录}.${文件}’ 的方式访问'
 *
 * @example app/controller
    |
    | --custom - module 
          | -- custom-controller.js

    => app.controller.customModule.customController
 *
 */
module.exports = app => {
  // 读取app/controller/**/**.js
  const controllerPath = path.resolve(app.businessPath, `.${sep}controller`);

  // 提取所有的文件
  const fileList = glob.sync(path.resolve(controllerPath, `.${sep}**${sep}**.js`));

  // 遍历所有文件目录，把内容加载到app.controller下
  const controllers = {};

  fileList.forEach(file => {
    // 提取文件名称
    let fileName = path.resolve(file);

    // 截取路径 app/controller/view.js => view-xxx
    fileName = fileName.substring(
      fileName.lastIndexOf(`controller${sep}`) + `controller${sep}`.length,
      fileName.lastIndexOf('.'),
    );

    // 把‘-’统一改为驼峰式， custom-module/controller.js => customModule.customController
    fileName = fileName.replace(/[-_ ]+(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));

    // 挂在controllers 到内存app 对象中
    let tempController = controllers;
    const fileNames = fileName.split(sep);

    for (let i = 0; i < fileNames.length; i++) {
      if (i === fileNames.length - 1) {
        const ControllerModule = require(path.resolve(file))(app);
        tempController[fileNames[i]] = new ControllerModule();
      } else {
        if (!tempController[fileNames[i]]) {
          tempController[fileNames[i]] = {};
        }
        tempController = tempController[fileNames[i]];
      }
    }
  });

  // 挂载
  app.controller = controllers;
};
