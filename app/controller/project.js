module.exports = app => {
  const BaseController = require('./base')(app);
  return class projectController extends BaseController {
    /**
     * 获取项目列表
     * @param {object} ctx 上下文
     *
     */

    async getList (ctx) {
      const { proj_key: projKey } = ctx.request.query;
      console.log('%c [ proj_key ]-12', 'font-size:13px; background:pink; color:#bf2c9f;', projKey);

      const { project: projectService } = app.service;

      const res = await projectService.getList();

      this.success(ctx, res);
    }
  };
};
