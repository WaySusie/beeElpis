module.exports = app => {
  const BaseService = require('./base')(app);
  return class ProjectService extends BaseService {
    async getList () {
      return [
        {
          name: 'project1',
          age: 18,
          desc: 'this is project1',
        },
        {
          name: 'project2',
          age: 19,
          desc: 'this is project2',
        },
      ];
    }
  };
};
