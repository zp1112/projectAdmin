import { format } from 'mysql';
import crypto from 'crypto';
import db from '../models/mysql';
import { getTimestamp } from '../utils';


const _getPowersByAdmin = async (admin) => {
  const powersResult = await db.query(format('select roles from role where rname in (?)', [admin.split(',')]));
  let powers = [];
  for (const item of powersResult) {
    powers = powers.concat(item.roles.split(','));
  }
  return new Set(powers);
};

exports.handleUserReg = async ({ tid, name, password, admin, phone, email }) => {
  const sql1 = format('select uid from users where name = ?', [name]);
  const user = await db.query(sql1);
  if (user.length) {
    return {
      status: 0,
      msg: '用户名已存在！'
    };
  }
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
  user[0].powers = await _getPowersByAdmin(user[0].admin);
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

exports.handleUsersList = async (query) => {
  const { type } = query;
  let result;
  let total;
  if (type == 0) {
    // 分页查询
    const page = Number(query.page) || 1;
    const sql = format(`select name, uid, tid, createdTime, updatedTime, phone, email, admin,
    (SELECT tname FROM team t WHERE t.tid=tid ) as tname from users ORDER BY updatedTime DESC limit ?,?`,
    [(page - 1) * 10, 10]);
    total = await db.query(format('select count(*) as count from users'));
    result = await db.query(sql);
    return {
      status: 1,
      users: result,
      pages: {
        total: total[0].count,
        limit: 10,
        curPage: page
      }
    };
  } else if (type == 1) {
    // 关键词查询
    const keyword = query.keyword;
    const sql = format(`select name, uid from users where name like '%${keyword}%'`);
    result = await db.query(sql);
    return {
      status: 1,
      users: result
    };
  }
};

exports.handleUserEdit = async (uid) => {
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
const _searchUserByName = async (name) => {
  const result = await db.query(format('select count(*) as count from users where name=?', [name]));
  return result[0].count;
};

exports.handleUserSave = async (userInfo) => {
  const exist = await _searchUserByName(userInfo.name);
  if (exist) {
    return {
      status: 0,
      msg: '名字已存在！'
    };
  }
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
    status: 1,
    msg: '保存成功！'
  };
};

exports.handleUserDelete = async (uid) => {
  const sql = format('delete from users where uid=?', [uid]);
  const result = await db.query(sql);
  if (result.err) {
    return {
      status: 0,
      msg: '删除失败！请重试'
    };
  }
  return {
    status: 1
  };
};

exports.getUserInfo = async (uid) => {
  const sql = format('select * from users where uid=?', [uid]);
  const result = await db.query(sql);
  result[0].powers = await _getPowersByAdmin(result[0].admin, result[0].uid);
  return result[0];
};
