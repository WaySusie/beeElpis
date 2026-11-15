const path = require('path');

module.exports = app => {
  // 设置静态资源目录
  const KoaStatic = require('koa-static');
  app.use(KoaStatic(path.resolve(process.cwd(), './app/public')));

  const koaNunjucks = require('koa-nunjucks-2');

  app.use(
    koaNunjucks({
      ext: 'tpl',
      path: path.resolve(process.cwd(), './app/public'),
      nunjucksConfig: {
        noCache: true,
        trimBlocks: true,
      },
    }),
  );

  // 引入 ctx.body 解析中间件
  const bodyParser = require('koa-bodyparser');
  app.use(
    bodyParser({
      formList: '1000mb',
      enableTypes: ['form', 'json', 'text'],
    }),
  );

  // 引入异常处理中间件
  app.use(app.middlewares.errorHandler);

  // 签名合法性校验
  app.use(app.middlewares.apiSignVerify);

  // 引入 API 参数验证中间件
  app.use(app.middlewares.apiParamsVerify);
};
