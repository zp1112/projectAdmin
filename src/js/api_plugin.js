/**
 * Created by wuhao on 2016/12/7.
 */
import axios from 'axios';
import { api } from './api';

const plugin = {
  installed: false
};
plugin.install = function (Vue) {
  if (plugin.installed) {
    return;
  }
  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return api;
      }
    },
    $http: {
      get() {
        return axios;
      }
    },
    $has: {
      get() {
        return (permission, permissions) => {
          if (permissions.indexOf(permission) === -1) {
            return false;
          }
          return true;
        };
      }
    }
  });
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
export default plugin;
