/**
 * Created by Candy on 2017/8/14.
 */
import crypto from 'crypto';
import { handleUserReg, handleUserLogin, handleTeamList } from '../models/user';

const checkLogin = require('./common').checkLogin;
const checkNotLogin = require('./common').checkNotLogin;

module.exports = (app) => {
  app.post('/users/reg', checkLogin);
  app.post('/users/reg', async (req, res) => {
    if (req.session.user.admin.split(',').indexOf('root') === -1) {
      res.send({
        status: 0,
        msg: '无权限'
      });
    } else {
      const userInfo = req.body.userInfo;
      const { name, tid, admin, passre } = userInfo;
      let password = userInfo.password;
      // 检验用户两次输入的密码是否一致
      if (passre !== password) {
        res.send({
          status: 0,
          msg: '两次输入的密码不一致'
        });
      } else {
        // 生成密码的 md5 值
        const md5 = crypto.createHash('md5');
        password = md5.update(password).digest('hex');
        const result = await handleUserReg({ name, password, tid, admin: admin.join(',') });
        res.send(result);
      }
    }
  });
  app.post('/login', checkNotLogin);
  app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    const result = await handleUserLogin(name, password);
    if (!result.status) {
      res.send(result);
    } else {
      console.log(result);
      req.session.user = result.user;
      res.send({
        status: 1,
        user: result.user
      });
    }
  });
  app.get('/logout', async (req, res) => {
    req.session.user = null;
    res.send({
      status: 1
    });
  });
  app.post('/isLogin', async (req, res) => {
    if (!req.session.user) {
      res.send({
        status: 0,
        msg: '未登录！'
      });
    } else {
      res.send({
        status: 1,
        msg: '已登录！'
      });
    }
  });
  app.get('/team', async (req, res) => {
    const result = await handleTeamList();
    res.send(result);
  });
  // app.post('/user/edit', checkLogin);
  // app.post('/user/edit', async (req, res) => {
  //   const result = await User.update(JSON.parse(req.body.userInfo));
  //   if (!result.status) {
  //     res.send({
  //       status: 0,
  //       msg: `保存失败！${result.msg}`
  //     });
  //   } else {
  //     res.send({
  //       status: 1,
  //       msg: '保存成功！'
  //     });
  //   }
  // });
};
