import { format } from 'mysql';
import crypto from 'crypto';
import db from '../models/mysql';
import { getTimestamp } from '../utils';

// var mongodb = require('./db');
// const crypto = require('crypto');
// const mongoose = require('mongoose');
//
// const ObjectID = mongoose.Types.ObjectId;
//
// mongoose.connect('mongodb://localhost/blog');
//
// const userSchema = new mongoose.Schema({
//   name: String,
//   password: String,
//   email: String,
//   head: String,
//   projects: Array,
//   teams: Array,
//   createdTime: Number,
//   updatedTime: Number
// }, {
//   collection: 'users'
// });
//
// const userModel = mongoose.model('User', userSchema);
//
// function User(user) {
//   this.name = user.name;
//   this.password = user.password;
//   this.email = user.email;
//   this.head = user.head;
//   this.projects = user.projects || [];
//   this.teams = user.teams || [];
//   this.updatedTime = Date.now();
//   this.createdTime = Date.now();
// }
//
// module.exports = User;
//
// // 存储用户信息
// User.prototype.save = function (callback) {
//   // 要存入数据库的用户信息文档
//   const user = {
//     name: this.name,
//     password: this.password,
//     email: this.email,
//     head: this.head,
//     teams: this.teams,
//     projects: this.projects,
//     createdTime: Date.now(),
//     updatedTime: Date.now()
//   };
//
//   const newUser = new userModel(user);
//
//   newUser.save((err, user) => {
//     if (err) {
//       return callback(err);
//     }
//     return callback(null, user);
//   });
// };
//
// // 读取用户信息
// User.get = function (name, callback) {
//   userModel.findOne({ name }, (err, user) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(null, user);
//   });
// };
// User.getAll = function (callback) {
//   userModel.find((err, user) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(null, user);
//   });
// };
//
// // 更新
// User.update = async (obj) => {
//   // 存储各种时间格式，方便以后扩展
//   const { team, ...rest } = obj;
//   const data = {
//     updatedTime: Date.now(),
//     ...rest
//   };
//   try {
//     const result = await userModel.update({ _id: ObjectID(obj.id) },
//       { $push: { teams: { $each: team } }, $set: data });
//     return {
//       status: 1
//     };
//   } catch (err) {
//     return {
//       status: 0,
//       msg: err
//     };
//   }
// };
exports.handleUserReg = async ({ tid, name, password, admin }) => {
  const sql = format('SELECT tempuid FROM temp_uid limit 1');
  const uid = await db.query(sql);
  if (uid.length) {
    await db.query(format('delete from temp_uid where tempuid=?', [uid[0].tempuid]));
    const result = await db.query(format(`insert into users set uid=?, tid=?, name=?,
    password=?, admin=?, createdTime=?, updatedTime=?`, [uid[0].tempuid, tid, name, password,
      admin, getTimestamp(), getTimestamp()]));
    if (result.err) {
      return {
        status: 0,
        msg: '注册失败'
      };
    }
    return {
      status: 1,
      msg: '注册成功'
    };
  }
  return {
    status: 0,
    msg: '账号id用完'
  };
};

exports.handleUserLogin = async (name, password) => {
  const sql = format('SELECT * FROM users where name = ?', [name]);
  const user = await db.query(sql);
  if (!user.length) {
    return {
      status: 0,
      msg: '用户不存在'
    };
  }
  // 生成密码的 md5 值
  const md5 = crypto.createHash('md5');
  const pass = md5.update(password).digest('hex');
  if (user[0].password !== pass) {
    return {
      status: 0,
      msg: '密码不正确！'
    };
  }
  delete user[0].password;
  console.log(user[0]);
  return {
    status: 1,
    msg: '登录成功',
    user: user[0]
  };
};

exports.handleTeamList = async () => {
  const sql = format('select * from team');
  const result = await db.query(sql);
  return result;
};
