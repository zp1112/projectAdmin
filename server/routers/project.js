/**
 * Created by Candy on 2017/8/14.
 */
import crypto from 'crypto';
import Project from '../models/project';

const checkLogin = require('./common').checkLogin;

module.exports = function (app) {
  app.post('/project/new', checkLogin);
  app.post('/project/new', async (req, res) => {
    const newProject = new Project(JSON.parse(req.body.json));
    // 检查用户名是否已经存在
    try {
      const result = await Project.get(newProject.name);
      if (result) {
        res.send({
          status: 0,
          msg: '项目已存在'
        });
      } else {
        await newProject.save();
        res.send({
          status: 1,
          msg: '立项成功'
        });
      }
    } catch (err) {
      res.send({
        status: 0,
        msg: `立项错误！${err}`
      });
    }
    // Project.get(newProject.name, (err, pro) => {
    //   if (err) {
    //     res.send({
    //       status: 0,
    //       msg: `立项错误！${err}`
    //     });
    //   } else if (pro) {
    //     res.send({
    //       status: 0,
    //       msg: '项目已存在'
    //     });
    //   } else {
    //     newProject.save((err) => {
    //       if (err) {
    //         res.send({
    //           status: 0,
    //           msg: `注册错误！${err}`
    //         });
    //       }
    //       res.send({
    //         status: 1,
    //         msg: '立项成功'
    //       });
    //     });
    //   }
    // });
  });
  app.post('/project/list', checkLogin);
  app.get('/project/list', async (req, res) => {
    const data = await Project.getAll();
    res.send({
      status: 1,
      project: data
    });
  });
};
