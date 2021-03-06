/**
 * Created by Candy on 2017/8/14.
 */
import crypto from 'crypto';
import { handleUserReg, handleUserLogin, handleTeamList, handleUsersList,
  handleUserEdit, handleUserSave, handleUserDelete, getUserInfo } from '../models/user';

const checkNotLogin = require('./common').checkNotLogin;

module.exports = (app) => {
  app.post('/users/reg', async (req, res) => {
    const userInfo = req.body.userInfo;
    const { name, tid, admin, phone, email } = userInfo;
    let password = userInfo.password;
    // 生成密码的 md5 值
    const md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');
    const result = await handleUserReg({ name, password, tid, admin, phone, email });
    res.send(result);
  });
  app.post('/login', checkNotLogin);
  app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    const result = await handleUserLogin(name, password);
    if (!result.status) {
      res.send(result);
    } else {
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
        status: -1,
        msg: '未登录！'
      });
    } else {
      const result = await getUserInfo(req.session.user.uid);
      delete result.password;
      res.send({
        status: 1,
        user: result
      });
    }
  });
  app.get('/team', async (req, res) => {
    const result = await handleTeamList();
    res.send(result);
  });
  // 获取用户列表
  app.get('/users', async (req, res) => {
    const result = await handleUsersList(req.query);
    res.send(result);
  });
  app.get('/users/edit', async (req, res) => {
    const result = await handleUserEdit(req.query.uid);
    res.send(result);
  });
  app.post('/users/save', async (req, res) => {
    const userInfo = req.body.userInfo;
    const param = userInfo;
    let password = userInfo.password;
    if (password) {
      // 生成密码的 md5 值
      const md5 = crypto.createHash('md5');
      password = md5.update(password).digest('hex');
      param.password = password;
    }
    const result = await handleUserSave(userInfo);
    res.send(result);
  });
  app.post('/users/delete', async (req, res) => {
    const result = await handleUserDelete(req.body.uid);
    res.send(result);
  });
};
