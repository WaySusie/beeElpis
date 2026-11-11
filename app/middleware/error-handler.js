/**
 * 运行时异常处理，兜底所有异常
 * @param {*} app
 */
module.exports = app => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // 异常处理
      const { status, message, detail } = err;
      app.logger.info(JSON.stringify(err));
      app.logger.error('[-- exception --]:', err);
      app.logger.error('[-- exception --]:', status, message, detail);

      if (message && message.indexOf('template not found') > -1) {
        ctx.status = 302; // 临时重定向
        ctx.redirect(`${app.options?.homepage}`);
        return;
      }

      const resBody = {
        success: false,
        code: 50000,
        message: '服务器内部错误',
        data: null,
      };
      ctx.status = 200;
      ctx.body = resBody;
    }
  };
};
