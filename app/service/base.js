module.exports = app =>
  class BaseService {
    /**
     *  service 基础类
     * 统一处理 service 层的公共方法
     *
     */
    constructor () {
      this.app = app;
      this.config = app.config;
    }
  };
