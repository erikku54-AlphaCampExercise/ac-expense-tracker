
const express = require('express');
const router = express.Router();

const Record = require('../../models/recordModel');

// load category data
let categoryList;
require('../../config/category')
  .then(categories => { categoryList = categories; });

// (頁面)首頁
router.get('/', (req, res) => {

  const selectedId = req.query.categoryId;

  const options = {};
  if (selectedId !== undefined) {
    if (selectedId === '0') {
      return res.redirect('/'); // 重定向去掉尾端query
    }
    // 根據selectedId的值製作不同的搜尋字串
    options.categoryId = selectedId
  }

  Record.find({ userId: req.user.id, ...options }).sort({ date: 1 }).lean()
    .then(records => {

      // 計算消費總和
      const sum = records.reduce((total, record) => total + record.amount, 0);

      // records資料預處理
      records.forEach(record => {
        // 把Date轉為需要的格式
        record.dateStr = record.date.toLocaleDateString();
        // 找到每個record對應的icon
        record.icon = categoryList.find(category => category.id === record.id).icon;
      });

      res.render('index', { categoryList, selectedId, sum, records })
    });
})

module.exports = router; // 匯出設定的express路由器
