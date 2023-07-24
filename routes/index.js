
const express = require('express');
const router = express.Router();

const authenticator = require('../middlewares/auth');

const records = require('./modules/records');
const users = require('./modules/users');
const home = require('./modules/home');

// 將request導向各子路由
router.use('/records', authenticator, records) // 以'/records'開頭的request導向records路由
router.use('/users', users) // 以'/users'開頭的request導向users路由
router.use('/', authenticator, home); // 以'/'開頭的request導向home路由

module.exports = router; // 匯出設定的express路由器
