/**
 * Created by 吴昊 on 2016/12/5.
 */

import 'babel-polyfill';
import axios from 'axios';
import store from '../store';

const apiHelper = require('./api_helper');

const token = sessionStorage.getItem('auth-access-token');
axios.defaults.baseURL = '/api';


const apiObj = {
  defaultErrorHandler: (data) => {
    store.commit('API_ERROR', data.msg);
  },
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
    },
    role: {
      save: {
        url: '/roles/save',
        method: 'post'
      },
      roles: {
        url: '/roles'
      },
      new: {
        url: '/roles/new',
        method: 'post'
      },
      delete: {
        url: '/roles/delete',
        method: 'post'
      }
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

module.exports.api = $apiProxy;
module.exports.accessToken = token;
