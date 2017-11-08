/**
 * Created by wuhao on 2017/2/10.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

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
    path: '/report',
    component: (resolve) => {
      System.import('../components/project/report.vue').then((comp) => {
        resolve(comp);
      });
    }
  }, {
    path: '/users/list',
    component: (resolve) => {
      System.import('../components/admin/users/list.vue').then((comp) => {
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
    path: '/login',
    component: (resolve) => {
      System.import('../components/login.vue').then((comp) => {
        resolve(comp);
      });
    }
  },
  {
    path: '/new',
    component: (resolve) => {
      System.import('../components/project/new.vue').then((comp) => {
        resolve(comp);
      });
    }
  },
  {
    path: '/projects',
    component: (resolve) => {
      System.import('../components/home/index.vue').then((comp) => {
        resolve(comp);
      });
    }
  },
  {
    path: '/project/detail',
    component: (resolve) => {
      System.import('../components/project/detail.vue').then((comp) => {
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


Vue.use(VueRouter);

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
