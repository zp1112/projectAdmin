/**
 * Created by Candy on 2017/10/25.
 */
const db = {};
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'test'
});

db.query = sql => new Promise((resolve, reject) => {
  pool.query(sql, (err, result) => {
    if (err) {
      console.log('mysql query: ', sql);
      console.log(err);
      resolve({ err: 1 });
    }
    resolve(result);
  });
});
module.exports = db;
