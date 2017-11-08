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
import routesConfig from './routes';

Vue.use(ApiPlugin);
Vue.use(Element);
Vue.directive('time', Time);
Vue.directive('placeholder', Placeholder);
let Index = null;
const getUserInfo = async () => {
  const result = await axios.post('/isLogin');
  if (window.location.pathname === '/login') {
    Index = new Vue({
      router,
      store,
      el: '#app',
      template: '<App />',
      components: { App }
    });
    return;
  } else if (result.data.status !== -1) {
    store.commit('GET_USER_INFO', result.data.user);
    const powers = store.state.currentUserInfo.powers;
    for (const power of powers) {
      const keys = Object.keys(store.state.menus);
      if (keys.indexOf(power) !== -1) {
        store.state.menus[power] = true;
      }
      if (routesConfig[power]) {
        router.addRoutes([routesConfig[power]]);
      }
    }
    router.addRoutes([{ path: '*',
      component: (resolve) => {
        System.import('../components/layout/403.vue').then((comp) => {
          resolve(comp);
        });
      } }]);
  } else {
    window.location.href = '/login';
  }
  Index = new Vue({
    router,
    store,
    el: '#app',
    template: '<App />',
    components: { App }
  });
};
getUserInfo();
export default Index;
