/**
 * Created by wuhao on 2017/2/10.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import store from './store';

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: (resolve) => {
      System.import('../components/home/index.vue').then((comp) => {
        resolve(comp);
      });
    }
  },
  {
    path: '/role',
    component: (resolve) => {
      System.import('../components/admin/role.vue').then((comp) => {
        resolve(comp);
      });
    }
  },
  {
    path: '/logout',
    component: (resolve) => {
      System.import('../components/logout.vue').then((comp) => {
        resolve(comp);
      });
    },
    beforeEnter: (to, from, next) => {
      to.query.backup = from.path;
      next();
    }
  },
  {
    path: '/new',
    component: (resolve) => {
      System.import('../components/new/index.vue').then((comp) => {
        resolve(comp);
      });
    }
  },
  {
    path: '/login',
    component: (resolve) => {
      System.import('../components/login.vue').then((comp) => {
        resolve(comp);
      });
    }
  },
  {
    path: '/users/list',
    component: (resolve) => {
      System.import('../components/admin/users/list.vue').then((comp) => {
        resolve(comp);
      });
    }
  }, {
    path: '/users/add',
    component: (resolve) => {
      System.import('../components/admin/users/add.vue').then((comp) => {
        resolve(comp);
      });
    }
  },
  {
    path: '/team/add',
    component: (resolve) => {
      System.import('../components/admin/users/teamadd.vue').then((comp) => {
        resolve(comp);
      });
    }
  },
  {
    path: '/403',
    component: (resolve) => {
      System.import('../components/layout/403.vue').then((comp) => {
        resolve(comp);
      });
    }
  }];

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active-link'
});
const rootPath = [
  '/users/add',
  '/team/add'
];
export default router;
