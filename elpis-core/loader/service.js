const glob = require('glob');
const path = require('path');

const { sep } = path;

/**
 * service loader
 * @param {object} app Koa 实例 
 * 
 * 加载所有 service ‘app.service.${目录}.${文件}’ 的方式访问'
 *
 * @example app/service
    |
    | --custom - module 
          | -- custom-service.js

    => app.service.customModule.customService
 *
 */
module.exports = app => {
  // 读取app/service/**/**.js
  const servicePath = path.resolve(app.businessPath, `.${sep}service`);
  // 提取所有的文件
  const fileList = glob.sync(path.resolve(servicePath, `.${sep}**${sep}**.js`));
  // 遍历所有文件目录，把内容加载到app.service下
  const services = {};

  fileList.forEach(file => {
    // 提取文件名称
    let fileName = path.resolve(file);

    // 截取路径 app/service/custom-module/custom-service => custom-module/custom-service
    fileName = fileName.substring(
      fileName.lastIndexOf(`service${sep}`) + `service${sep}`.length,
      fileName.lastIndexOf('.'),
    );

    // 把‘-’统一改为驼峰式， custom-module/service.js => customModule.customService
    fileName = fileName.replace(/[-_ ]+(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));

    // 挂在services 到内存app 对象中
    let tempService = services;
    const fileNameArr = fileName.split(sep);

    for (let i = 0; i < fileNameArr.length; i++) {
      if (i === fileNameArr.length - 1) {
        const ServiceModule = require(path.resolve(file))(app);
        tempService[fileNameArr[i]] = new ServiceModule();
      } else {
        if (!tempService[fileNameArr[i]]) {
          tempService[fileNameArr[i]] = {};
        }
        tempService = tempService[fileNameArr[i]];
      }
    }
  });

  // 挂载
  app.service = services;
};
