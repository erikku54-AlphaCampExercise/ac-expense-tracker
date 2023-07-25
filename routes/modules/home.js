
const express = require('express');
const router = express.Router();

const Record = require('../../models/recordModel');

// load category data
let categoryList;
require('../../config/category')
  .then(categories => { categoryList = categories; });

// (頁面)首頁
router.get('/', (req, res) => {

  Record.find({ userId: req.user.id }).sort({ date: 1 }).lean()
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

      res.render('index', { categoryList, records, sum })
    });
})

module.exports = router; // 匯出設定的express路由器
