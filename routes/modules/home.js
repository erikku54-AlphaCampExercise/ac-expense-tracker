
const express = require('express');
const router = express.Router();

const Record = require('../../models/recordModel');

// load category data
let categoryList;
require('../../config/category')
  .then(categories => { categoryList = categories; });

// (頁面)首頁
router.get('/', (req, res) => {

  const showMsg = req.query.showMsg; // sweetalert訊息選擇器
  const sortId = req.query.categoryId; // 分類選擇器

  // 根據分類選擇器(sortId)製作不同的搜尋字串
  const options = {};
  if (sortId !== undefined) {
    if (sortId === '0') {
      return res.redirect('/'); // 重定向去掉尾端query
    }
    options.categoryId = sortId;
  }

  Record.find({ userId: req.user.id, ...options }).sort({ date: 1 }).lean()
    .then(records => {

      // 計算消費總和
      const sum = records.reduce((total, record) => total + record.amount, 0);

      // records資料預處理
      records.forEach(record => {

        record.dateStr = record.date.toISOString().split('T')[0].replaceAll('-', '/'); // 把Date轉為需要的格式
        record.icon = categoryList.find(category => category.id === record.categoryId).icon; // 找到每個record對應的icon
      });

      res.render('index', { categoryList, sortId, showMsg, sum, records })
    });
})

module.exports = router; // 匯出設定的express路由器
