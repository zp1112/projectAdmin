import { format } from 'mysql';
import crypto from 'crypto';
import db from '../models/mysql';
import { getTimestamp } from '../utils';

exports.handleUserReg = async ({ tid, name, password, admin, phone, email }) => {
  const sql = format('SELECT tempuid FROM temp_uid limit 1');
  const uid = await db.query(sql);
  if (uid.length) {
    await db.query(format('delete from temp_uid where tempuid=?', [uid[0].tempuid]));
    const result = await db.query(format(`insert into users set uid=?, tid=?, name=?,
    password=?, admin=?, createdTime=?, updatedTime=?, email=?, phone=?`, [uid[0].tempuid, tid, name, password,
      admin, getTimestamp(), getTimestamp(), phone, email]));
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

exports.handleUsersList = async () => {
  const sql = format('select name, uid, tid, createdTime, updatedTime, phone, email, admin, (SELECT tname FROM team t WHERE t.tid=tid ) as tname from users ');
  const result = await db.query(sql);
  return result;
};

exports.handleUserEdit = async (uid) => {
  console.log(uid);
  const sql = format('select name, uid, tid, phone, email, admin from users where uid=?', [uid]);
  const result = await db.query(sql);
  if (!result.length) {
    return {
      status: 0,
      msg: '没有该用户'
    };
  }
  return {
    status: 1,
    data: result[0]
  };
};

exports.handleUserSave = async (userInfo) => {
  userInfo.updatedTime = getTimestamp();
  const sql = format('update users set ? where uid=?', [userInfo, userInfo.uid]);
  const result = await db.query(sql);
  if (result.err) {
    return {
      status: 0,
      msg: '保存失败'
    };
  }
  return {
    status: 1
  };
};

exports.handleUserDelete = async (uid) => {
  const sql = format('delete from users where uid=?', [uid]);
  const result = await db.query(sql);
  if (result.err) {
    return {
      status: 0,
      msg: '删除'
    };
  }
  return {
    status: 1
  };
};

exports.getUserInfo = async (uid) => {
  const sql = format('select * from users where uid=?', [uid]);
  const result = await db.query(sql);
  return result[0];
};
