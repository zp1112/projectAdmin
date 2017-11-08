/**
 * Created by Candy on 2017/8/14.
 */

import { getRoles, saveRoles, saveRole, deleteRole } from '../models/admin';

module.exports = function (app) {
  app.get('/roles', async (req, res) => {
    const result = await getRoles();
    res.send({
      status: 1,
      roles: result
    });
  });
  app.post('/roles/save', async (req, res) => {
    const update = await saveRoles(req.body.rname, req.body.roles);
    if (update.err) {
      res.send({
        status: 0,
        msg: '更新失败！请重试'
      });
    } else {
      const result = await getRoles();
      res.send({
        status: 1,
        roles: result
      });
    }
  });
  app.post('/roles/new', async (req, res) => {
    const update = await saveRole(req.body.rname);
    if (update.err) {
      res.send({
        status: 0,
        msg: '添加失败！请检查角色名字是否重复'
      });
    } else {
      const result = await getRoles();
      res.send({
        status: 1,
        roles: result
      });
    }
  });
  app.post('/roles/delete', async (req, res) => {
    await deleteRole(req.body.rname);
    res.send({
      status: 1
    });
  });
  app.post('/roles/delete_all', async (req, res) => {
    const result = await deleteRole(req.body.rnames, 'all');
    res.send(result);
  });
};
