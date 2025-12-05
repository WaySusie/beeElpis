module.exports = app =>
  class BaseController {
    /**
     * controller 基类
     * controller 相关的公共方法 都写在这里了
     */

    constructor () {
      this.app = app;
      this.config = app.config;
      this.service = app.service;
    }

    /**
     *
     * API 处理成功时统一返回结构
     * 统一返回格式
     * @param {Object} ctx koa context
     * @param {Object} data 返回的核心数据
     * @param {Object} metadata 返回的附加数据
     */
    success (ctx, data = {}, metadata = {}) {
      //   设置响应状态码
      ctx.status = 200;
      //   设置响应内容
      ctx.body = {
        success: true,
        data,
        metadata,
      };
    }

    /**
     *
     * API 处理失败时统一返回结构
     * 统一返回格式
     * @param {Object} ctx koa context
     * @param {Object} message 返回的错误信息
     * @param {Object} code 返回的错误码
     */
    fail (ctx, message = {}, code) {
      // 设置响应内容
      ctx.body = {
        success: false,
        message,
        code,
      };
    }
  };
