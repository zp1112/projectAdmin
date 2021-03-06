let api;
const axios = require('axios');
const qs = require('querystring');
const rest = function (url, ...val) {
  val.forEach((v) => {
    if (Array.isArray(v)) {
      v.forEach((i) => {
        url += `/${i}`;
      });
    } else {
      url += `/${v}`;
    }
  });
  return url;
};
const defineReq = function (obj, commonSettings) {
  if (!obj) {
    return;
  }
  if (obj.url) {
    obj = Object.assign({}, obj, commonSettings);
    obj.request = (params, otherParams, settings) =>
      /**
       * 发送ajax请求
       * @param {object} obj
       * @param {object|array} params
       * @param {object} otherParams
       * @return {Promise<R>}
       */
       requestApi(Object.assign({}, settings, obj), params, otherParams);
    obj.req = (params, otherParams, settings) => requestApi2(Object.assign({}, settings, obj), params, otherParams);
  }


  for (const property in obj) {
    if (obj.hasOwnProperty(property) && typeof obj[property] === 'object') {
      obj[property] = defineReq(obj[property], commonSettings);
    }
  }
  return obj;
};
/**
 * 设置请求参数
 * @param {object} obj
 * @param {object} params
 * @return {object} axios的ajax请求对象
 */
const assignParams = function (obj, params) {
  if (obj.isFormData && ['post', 'put', 'patch'].indexOf(obj.method) >= 0) {
    obj.data = qs.stringify(params);
  } else if (['get', 'delete', 'head'].indexOf(obj.method) >= 0) {
    obj.url = `${obj.url}?${qs.stringify(params)}`;
  } else {
    obj.data = params;
  }
  return obj;
};
const requestApi = function (obj, params, otherParams) {
  if (obj.method == null) {
    obj.method = 'get';
  }
  if (params) {
    if (Array.isArray(params)) {
      obj.url = rest(obj.url, params);
      if (otherParams) {
        /**
         * ajax请求
         * @param {object} obj
         * @param {object|array} params
         * @param {object} otherParams
         * @return {Promise<R>|Promise.<T>}
         */
        obj = assignParams(obj, otherParams);
      }
    } else {
      obj = assignParams(obj, params);
    }
  }
  const p = axios.request(obj);
  return Promise.resolve(p).then(v => new Promise((resolve, reject) => {
    if (v.data.status <= 0) {
      const handleResult = api.defaultErrorHandler(v.data);
      if (!handleResult) {
        return;
      }
    }
    resolve(v);
  })).catch(err => new Promise((resolve, reject) => {
    reject(err);
  }));
};
const requestApi2 = function (obj, params, otherParams) {
  const p = requestApi(obj, params, otherParams);
  return Promise.resolve(p).then(v => new Promise((resolve, reject) => {
    if (v.data.success) {
      resolve(v.data);
    } else {
      if (api.defaultErrorHandler) {
        const handleResult = api.defaultErrorHandler(v.data);
        if (!handleResult) {
          return;
        }
      }
      reject(v.data);
    }
  })).catch(err => new Promise((resolve, reject) => {
    reject(err);
  }));
};
/**
 * Created by wuhao on 2017/1/16.
 */
const defineApi = function (apiObj, commonSettings) {
  const newObj = Object.assign({}, apiObj);
  api = defineReq(newObj, commonSettings);
  return api;
};
module.exports.define = defineApi;
