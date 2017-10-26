/**
 * Created by wuhao on 2017/2/10.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

Vue.use(VueRouter);
const routes = [{
  path: '/',
  redirect: '/index'
}, {
  path: '/index',
  component: (resolve) => {
    System.import('../components/home/index.vue').then((comp) => {
      resolve(comp);
    });
  }
}, {
  path: '/logout',
  component: (resolve) => {
    System.import('../components/logout.vue').then((comp) => {
      resolve(comp);
    });
  }
}, {
  path: '/new',
  component: (resolve) => {
    System.import('../components/new/index.vue').then((comp) => {
      resolve(comp);
    });
  }
}, {
  path: '/login',
  component: (resolve) => {
    System.import('../components/login.vue').then((comp) => {
      resolve(comp);
    });
  }
}, {
  path: '/users',
  children: [{
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
  }],
  component: (resolve) => {
    System.import('../components/admin/users/index.vue').then((comp) => {
      resolve(comp);
    });
  }
}];

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active-link'
});
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    axios.post('/isLogin')
    .then((res) => {
      if (res.data.status === 1) {
        next();
      } else {
        router.push('login');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    axios.post('/isLogin')
    .then((res) => {
      if (res.data.status === 1) {
        router.push('/index');
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
});
export default router;
