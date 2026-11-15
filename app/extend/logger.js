const log4js = require('log4js');

/**
 * 日志工具
 * 外部调用
 * app.logger.log
 * app.logger.error
 * app.logger.warn
 * app.logger.info
 * app.logger.debug
 */
module.exports = app => {
  let logger;

  if (app.env.isLocal()) {
    // 打印在控制台即可
    logger = console;
  } else {
    // 把日志输出并落地到磁盘（日志落盘）
    log4js.configure({
      appenders: {
        console: {
          type: 'console',
        },
        // 日志切分
        dateFile: {
          type: 'dateFile',
          filename: './logs/appllication.log',
          pattern: 'yyyy-MM-dd.log',
        },
      },
      categories: {
        default: {
          appenders: ['console', 'dateFile'], // 日志输出到控制台和日志文件
          level: 'trace', // 日志级别
        },
      },
    });

    logger = log4js.getLogger(); // 获取日志对象
  }

  return logger;
};
