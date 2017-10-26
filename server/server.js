import express from 'express';
import bodyParser from 'body-parser';
import superagent from 'superagent';
import cheerio from 'cheerio';
import config from '../config';
import { format } from 'mysql';
import db from './models/mysql';

// (async () => {
//   for (let i = 100; i < 200; i += 1) {
//     await db.query(format('insert into temp_uid set tempuid=?', [`00${i}`]));
//   }
//   // console.log(1111111, result);
// })();

const routes = require('./routers/main');

const app = express();
app.use(bodyParser.json());
// 将session存到mongodb里面
const session = require('express-session');
const Store = require('express-mysql-session');

app.use(session({
  name: 'sid',
  secret: 'abc',
  resave: false,
  saveUninitiailzed: true,
  store: new Store({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'test'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));
routes(app);
// 监听端口
app.listen(4000);
console.log('success listen at port:4000......');
