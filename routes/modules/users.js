
const express = require('express');
const router = express.Router();

// (頁面)登入
router.get('/login', (req, res) => {
  return res.render('login');
})

// (頁面)註冊
router.get('/register', (req, res) => {
  return res.render('register');
})

module.exports = router; // 匯出設定的express路由器
