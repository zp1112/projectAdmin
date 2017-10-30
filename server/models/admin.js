import { format } from 'mysql';
import crypto from 'crypto';
import db from '../models/mysql';
import { getTimestamp } from '../utils';

exports.getRoles = async () => {
  const result = await db.query(format('select * from test.role'));
  return result;
};

exports.saveRoles = async (rname, roles) => {
  const result = await db.query(format('update test.role set roles = ? where rname=?', [roles, rname]));
  return result;
};

exports.saveRole = async (rname) => {
  const result = await db.query(format('insert into test.role set rname=?', [rname]));
  return result;
};

exports.deleteRole = async (rname) => {
  const result = await db.query(format('delete from test.role where rname=?', [rname]));
  return result;
};
