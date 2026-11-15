const md5 = require('md5');

/**
 * API 签名的合法校验
 * @param {*} app
 */
module.exports = app => {
  return async (ctx, next) => {
    // 只处理API请求
    if (ctx.path.indexOf('/api') < 0) {
      return await next();
    }

    const { path, method } = ctx;
    const { headers } = ctx.request;

    const { s_sign: sSign, s_t: st } = headers;

    const signKey = 'klx05hb3n1c9ujp8uhxbs2ikkiowp212';

    const signature = md5(`${signKey}_${st}`);

    app.logger.info(`[${method}] ${path}] signature: ${signature}`);

    if (!sSign || !st || signature !== sSign.toLowerCase() || Date.now() - st > 600000) {
      ctx.status = 200;
      ctx.body = {
        success: false,
        message: 'signature verify failed',
        code: 445,
      };
      return;
    }

    await next();
  };
};
