const Koa = require('koa');
const path = require('path');

const { sep } = path; // 兼容不同操作系统的/

const env = require('./env');

const middlewareLoader = require('./loader/middleware');
const configLoader = require('./loader/config');
const controllerLoader = require('./loader/controller');
const extendLoader = require('./loader/extend');
const routerSchemaLoader = require('./loader/router-schema');
const routerLoader = require('./loader/router');
const serviceLoader = require('./loader/service');

module.exports = {
  /**
   * 启动服务
   * @params {Object} options 启动配置
  *
  * options: {
      name //项目名称
      homePage //项目主页
    }
   */
  start (options = {}) {
    const app = new Koa();

    // 配置应用
    app.options = options;

    // 基础目录
    app.baseDir = process.cwd();

    // 业务文件路径
    app.businessPath = path.resolve(app.baseDir, `.${sep}app`);

    // 初始化环境配置
    app.env = env(app);
    console.log(`--[start] env: ${app.env.getEnv()} --`);

    // 加载middleware
    middlewareLoader(app);
    console.log(`-- [start] middlewares loaded --`);

    // 加载router-schema
    routerSchemaLoader(app);
    // console.log(app.routerSchema);
    // console.log(`-- [start] routerSchema loaded --`);

    // 加载controller
    controllerLoader(app);
    // console.log(app.controller);
    // console.log(`-- [start] controller loaded --`);

    // 加载service
    serviceLoader(app);
    // console.log(app.service);
    // console.log(`-- [start] service loaded --`);

    // 加载config
    configLoader(app);
    // console.log(app.config);
    // console.log(`-- [start] config loaded --`);

    // 加载extend
    extendLoader(app);
    // console.log(app.extend);
    console.log(`-- [start] extend loaded --`);

    // 注册全局中间件 是用户自定义的milddleware
    // app.middleware.js
    try {
      require(`${app.businessPath}${sep}middleware.js`)(app);
      console.log(`-- [start] load global middleware loaded --`);
    } catch (error) {
      console.log('[exception ] there is no middleware file');
    }

    // 注册路由
    routerLoader(app);
    console.log(`-- [start] router loaded --`);

    // 启动服务
    try {
      const port = process.env.PORT || 2026;
      const host = process.env.IP || '127.0.0.1';
      app.listen(port, host, () => {
        console.log(`Server is running at http://${host}:${port}`);
      });
    } catch (err) {
      console.error(err);
    }
  },
};
