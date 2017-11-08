module.exports = {
  '/users/add': {
    path: '/users/add',
    component: (resolve) => {
      System.import('../components/admin/users/add.vue').then((comp) => {
        resolve(comp);
      });
    }
  },
  '/team/add': {
    path: '/team/add',
    component: (resolve) => {
      System.import('../components/admin/users/teamadd.vue').then((comp) => {
        resolve(comp);
      });
    }
  },
  '/role': {
    path: '/role',
    component: (resolve) => {
      System.import('../components/admin/role.vue').then((comp) => {
        resolve(comp);
      });
    }
  }
};
