const glob = require('glob');
const path = require('path');

const { sep } = path;
/**
 * router-schema loader
 * @param {object} app app koa 实例
 *
 * 通过 'json schema & ajv' 利用这两个库对 API 规则进行约束，配合 api-params-verify 中间件
 *
 * app/router-schema/**.js
 *

    输出：
    app.routerSchema = {
        '${api1}': ${jsonSchema1},
        '${api2}': ${jsonSchema2},
        '${api3}': ${jsonSchema3},
        '${api4}': ${jsonSchema4}
    }

 */
module.exports = app => {
  // 读取app/routerSchema/**/**.js
  const routerSchemaPath = path.resolve(app.businessPath, `.${sep}router-schema`);
  // 提取所有的文件
  const fileList = glob.sync(path.resolve(routerSchemaPath, `.${sep}**${sep}**.js`));

  // 注册所有 routerSchema，使得可以 ’app.routerSchema' 这样访问
  let routerSchemas = {};

  fileList.forEach(file => {
    routerSchemas = {
      ...routerSchemas,
      ...require(path.resolve(file)),
    };
  });

  app.routerSchema = routerSchemas;
};
