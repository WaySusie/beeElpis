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

    const { s_sign, sSign, s_t: st } = headers;

    // TODO: 签名key需要生成
    const signKey = '123456';

    const signature = md5(`${signKey}_${st}}`);

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
