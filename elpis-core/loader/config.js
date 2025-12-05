const path = require('path');

const { sep } = path;

/**
 * config loader
 * @param {object} app Koa 实例
 *
 * 配置区分 开发/生产/测试，通过env 环境读取不同文件 env.config.js
 * 通过 env.config.js 覆盖 default.config  加载到 app.config 中
 *
 * 目录下对应的config配置
 * 默认配置 config/config.default.js
 * 开发配置 config/config.dev.js
 * 测试配置 config/config.beta.js
 * 生产配置 config/config.prod.js
 *
 */
module.exports = app => {
  // 找到congfig/ 目录
  const configPath = path.resolve(app.baseDir, `.${sep}config`);

  // 获取default.config.js
  let defaultConfig = {};
  try {
    defaultConfig = require(path.resolve(configPath, `.${sep}config.default.js`));
  } catch (e) {
    // throw new Error('config.default.js is required');
    console.log('config.default.js is required');
  }

  //   获取env.config
  let envConfig = {};
  try {
    if (app.env.isLocal) {
      envConfig = require(path.resolve(configPath, `.${sep}config.local.js`));
    } else if (app.env.isBeta) {
      envConfig = require(path.resolve(configPath, `.${sep}config.beta.js`));
    } else if (app.env.isProd) {
      envConfig = require(path.resolve(configPath, `.${sep}config.prod.js`));
    }
  } catch (e) {
    // throw new Error('[exception] there is no env config file');
    console.log('[exception] there is no env config file');
  }

  // 覆盖并加载 config 配置
  app.config = Object.assign({}, defaultConfig, envConfig);
};
