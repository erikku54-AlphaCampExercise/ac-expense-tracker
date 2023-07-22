
const express = require('express');
const router = express.Router();

// (頁面)首頁
router.get('/', (req, res) => {
  return res.render('index')
})

module.exports = router; // 匯出設定的express路由器
