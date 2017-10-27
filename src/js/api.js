/**
 * Created by 吴昊 on 2016/12/5.
 */

import 'babel-polyfill';
import axios from 'axios';
import router from '../module/router';

const apiHelper = require('aegis-api-helper');

const token = sessionStorage.getItem('auth-access-token');

// const browser = navigator.appName;
// const bVersion = navigator.appVersion;
// const version = bVersion.split(';');
// const trimVersion = version[1] ? version[1].replace(/[ ]/g, '') : '';
// if (browser === 'Microsoft Internet Explorer' && trimVersion === 'MSIE9.0') {
//   alert("建议升级到高级版本的浏览器，体验更佳！");
// }
// axios.defaults.baseURL = '/api';
axios.defaults.baseURL = '/api';
axios.interceptors.response.use((data) => { // 响应成功关闭loading
  console.log(1111, data, router);
  if (data.data.msg === '未登录！' && data.config.url !== '/api/isLogin') {
    window.location.href = '/login';
    // return Promise.reject();
  }
  return data;
}, error => Promise.reject(error));


const apiObj = {
  sentence: {
    url: '/blog/sentence'
  },
  posts: {
    url: '/posts'
  },
  newPost: {
    url: '/post',
    method: 'post'
  },
  removeOne: {
    url: '/remove',
    method: 'post'
  },
  editOne: {
    url: '/edit'
  },
  savePost: {
    url: '/edit',
    method: 'post'
  },
  getOne: {
    url: '/p'
  },
  getTwo: {
    url: '/pt'
  },
  login: {
    url: '/login',
    method: 'post'
  },
  logout: {
    url: '/logout'
  },
  admin: {
    team: {
      url: '/team'
    },
    users: {
      url: '/users'
    }
  },
  users: {
    edit: {
      url: '/users/edit'
    },
    save: {
      url: '/users/save',
      method: 'post'
    },
    reg: {
      url: '/users/reg',
      method: 'post'
    },
    delete: {
      url: '/users/delete',
      method: 'post'
    }
  },
  project: {
    new: {
      url: '/project/new',
      method: 'post'
    },
    list: {
      url: '/project/list'
    }
  }
};
const $apiProxy = apiHelper.define(apiObj, {
  headers: { common: { token } }
});


// 前端对接认证模块
// AuthPlugin(appRemote, clientId, clientSecret, authServerRemote, ucenterServerRemote);

module.exports.api = $apiProxy;
module.exports.accessToken = token;
