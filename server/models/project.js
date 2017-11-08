import { format } from 'mysql';
import db from '../models/mysql';
import { getTimestamp } from '../utils';


exports.handleProjectSave = async ({ name, owner, team, description, members, edit }) => {
  const exist = await db.query(format('select count(*) as count from projects where pname=?', [name]));
  if (exist[0].count && !edit) {
    return {
      status: 0,
      msg: '项目已存在！'
    };
  } else if (!exist[0].count && !edit) {
    const result = await db.query(format(`insert into projects set pname=?,
    description=?, updatedTime=?, createdTime=?`, [name, description,
      getTimestamp(), getTimestamp()]));
    if (result.affectedRows) {
      const pid = await db.query(format('select pid from projects where pname=?', [name]));
      for (const uid of members) {
        await db.query(format(`insert into project_user set pid=?, uid=?, tid=?,
        owner=?, updatedTime=?, createdTime=?`, [pid[0].pid, uid, team, 0,
          getTimestamp(), getTimestamp()]));
      }
      await db.query(format(`insert into project_user set pid=?, uid=?, tid=?,
      owner=?, updatedTime=?, createdTime=?`, [pid[0].pid, owner, team, 1,
        getTimestamp(), getTimestamp()]));
      return {
        status: 1,
        msg: '项目创建成功！'
      };
    }
    return {
      status: 0,
      msg: '项目创建失败！'
    };
  }
};
exports.handleProjectList = async (query) => {
  const { type } = query;
  let result;
  let total;
  if (type == 0) {
    // 分页查询
    const page = Number(query.page) || 1;
    const sql = format(`select *,
    (SELECT name FROM users u WHERE u.uid=(SELECT uid as owner FROM project_user pu WHERE pu.pid=p.pid && pu.owner = 1 ) ) as ownerName,
    (SELECT tname FROM team t WHERE t.tid=(SELECT tid FROM project_user pu WHERE pu.pid=p.pid limit 1 ) ) as ownerTeam
    from projects p ORDER BY updatedTime DESC limit ?,?`,
    [(page - 1) * 10, 10]);
    total = await db.query(format('select count(*) as count from projects'));
    result = await db.query(sql);
    return {
      status: 1,
      projects: result,
      pages: {
        total: total[0].count,
        limit: 10,
        curPage: page
      }
    };
  } else if (type == 1) {
    // 关键词查询
    const keyword = query.keyword;
    const sql = format(`select pname, pid from projects where pname like '%${keyword}%'`);
    result = await db.query(sql);
    return {
      status: 1,
      users: result
    };
  }
};

exports.handleProjectOwner = async (uid) => {
  const sql = format('select pu.pid,p.pname from test.project_user pu left join test.projects p on p.pid=pu.pid where uid=? && owner=1', [uid]);
  const result = await db.query(sql);
  return {
    status: 1,
    projects: result
  };
};

exports.handleProjectReport = async ({ content, uid, pid, action }) => {
  const updatedTime = getTimestamp();
  // new
  if (action) {
    const createdTime = getTimestamp();
    const result = await db.query(format('insert into report set content=?, uid=?, pid=?, updatedTime=?, createdTime=?', [content, uid,
      pid, updatedTime, createdTime]));
    return {
      status: 1,
      projects: result
    };
  }
  const result = await db.query(format('update from report set content=?, uid=?, pid=?, updatedTime=?, createdTime=?', [content, uid,
    pid, updatedTime]));
  return {
    status: 1,
    projects: result
  };
};

exports.handleProjectDetail = async ({ pid }) => {
  const result = await db.query(format('select * from report where pid=? order by updatedTime desc', [pid]));
  const pname = await db.query(format('select pname from projects where pid=?', [pid]));
  return {
    status: 1,
    detail: result,
    pname: pname[0].pname
  };
};

exports.handleProjectDelete = async (updatedTime, pid) => {
  await db.query(format('delete * from report where updatedTime=?', [updatedTime]));
  const result = await db.query(format('select * from report where pid=? order by updatedTime desc', [pid]));
  return {
    status: 1,
    detail: result
  };
};
