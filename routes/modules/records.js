
const express = require('express');
const router = express.Router();

// (頁面)新增支出
router.get('/new', (req, res) => {
  return res.render('new');
})

// (頁面)修改支出
router.get('/edit', (req, res) => {
  return res.render('edit');
})

module.exports = router; // 匯出設定的express路由器
