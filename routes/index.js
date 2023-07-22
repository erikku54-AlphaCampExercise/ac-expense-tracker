
const express = require('express');
const router = express.Router();

// const todos = require('./modules/todos');
const home = require('./modules/home');


// 將request導向各子路由
// router.use('/todos',todos)   // 以'/todos'開頭的request導向todo路由
router.use('/', home); // 以'/'開頭的request導向home路由

module.exports = router; // 匯出設定的express路由器
