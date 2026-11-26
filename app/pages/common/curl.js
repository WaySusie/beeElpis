const md5 = require('md5');
import { ElMessage } from 'element-plus';
/**
 * @description:  前端封装的 curl 方法
 * @params options 请求参数
 */

const curl = ({
  url, // 请求地址
  method = 'POST', // 请求方法
  data = {}, // 请求参数 post body
  headers = {}, // 请求头
  query = {}, // 请求参数: url query
  responseType = 'json', // 请求返回类型 response data type
  timeout = 60000, // 请求超时时间 timeout
  errorMessage = '网络异常', // 请求失败提示信息
}) => {
  // 接口签名处理（让接口变动态）
  const signKey = 'klx05hb3n1c9ujp8uhxbs2ikkiowp212';
  const st = Date.now();

  // 构造请求参数
  // const params = {
  //   ...query, // url query
  // };

  const ajaxSting = {
    url, // 请求地址
    method, // 请求方法
    params: query, // 请求参数: url query
    data, // 请求参数 post body
    responseType, // 请求返回类型 response data type
    timeout, // 请求超时时间 timeout
    headers: {
      ...headers,
      s_t: st,
      s_sign: md5(`${signKey}_${st}`),
    },
  };

  return axios
    .request(ajaxSting)
    .then(res => {
      const resData = res.data || {};

      //  后端 API 返回格式
      const { success } = resData;

      // 请求不成功的处理
      if (!success) {
        const { code, message } = resData;
        if (code === 442) {
          ElMessage.error('请求参数异常');
        } else if (code === 445) {
          ElMessage.error('请求不合法');
        } else if (code === 50000) {
          ElMessage.error(message);
        } else {
          ElMessage.error(errorMessage);
        }
        console.error(message);

        return Promise.resolve({ success, code, message });
      }
      // 成功
      const { data, metadata } = resData;
      return Promise.resolve({ success, data, metadata });
    })
    .catch(err => {
      const { message } = err;
      if (message.match(/timeout/)) {
        return Promise.resolve({
          message: 'request timeout',
          code: 504,
        });
      }

      return Promise.resolve(err);
    });
};

export default curl;
