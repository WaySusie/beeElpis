module.exports = app => {
  const BaseController = require('./base')(app);
  return class projectController extends BaseController {
    /**
     * 获取项目列表
     * @param {object} ctx 上下文
     *
     */

    async getList (ctx) {
      const { project: projectService } = app.service;
      app.logger.info('123');

      const res = await projectService.getList();

      const a = res.a.v.a;

      app.logger.info(123);

      this.success(ctx, res);
    }
  };
};
