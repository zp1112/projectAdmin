/**
 * Created by wuhao on 2016/12/6.
 */
import 'babel-polyfill';
import Vue from 'vue';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import '../less/normalize.css';
import '../less/common.less';
import '../less/awesome/font-awesome.less';
import App from '../components/app.vue';
import router from './router';
import ApiPlugin from '../js/api_plugin';
import store from '../store/index';
import Time from '../components/directives/time';
import Placeholder from '../components/directives/placeholder';

Vue.use(ApiPlugin);
Vue.use(Element);
Vue.directive('time', Time);
Vue.directive('placeholder', Placeholder);
let Index = null;
const getUserInfo = async () => {
  const result = await axios.post('/isLogin');
  Index = new Vue({
    router,
    store,
    el: '#app',
    template: '<App />',
    components: { App }
  });
  if (window.location.pathname === '/login') {
    return;
  }
  if (result.data.status === -1) {
    window.location.href = '/login';
  } else {
    store.commit('GET_USER_INFO', result.data.user);
  }
};
getUserInfo();
export default Index;
