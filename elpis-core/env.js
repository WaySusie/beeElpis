module.exports = app => {
  return {
    // 判断是否是本地环境
    isLocal () {
      return process.env._ENV === 'local';
    },
    // 判断是否是开发环境
    isDev () {
      return process.env._ENV === 'development';
    },
    // 判断是否是测试环境
    isBeta () {
      return process.env._ENV === 'beta';
    },
    // 判断是否是生产环境
    isProd () {
      return process.env._ENV === 'production';
    },
    // 获取当前环境
    getEnv () {
      return process.env._ENV ?? 'local';
    },
  };
};
