module.exports = app => {
  const BaseService = require('./base')(app);

  const modelList = require('../../model/index')(app);

  return class ProjectService extends BaseService {
    /**
     * 获取所有项目与数据模型结构
     */
    async getModelList () {
      return modelList;
    }
  };
};
