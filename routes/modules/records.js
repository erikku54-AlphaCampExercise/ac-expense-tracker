
const express = require('express');
const router = express.Router();


const Record = require('../../models/recordModel');

// load category data
let categoryList;
require('../../config/category')
  .then(categories => { categoryList = categories; });


// (頁面)新增支出
router.get('/new', (req, res) => {

  return res.render('new', { categoryList });
})

// (功能)新增支出
router.post('/new', (req, res) => {

  console.log(req.body);
  const { name, date, categoryId, amount } = req.body;

  if (!name || !date || !categoryId || !amount) {
    console.log('所有欄位皆為必填！');
    return res.render('new', { categoryList });
  }

  Record.create({ userId: req.user.id, ...req.body })
    .then(() => {
      return res.redirect('/');
    }).catch(err => console.log(err));
})

// (頁面)修改支出
router.get('/edit/:_id', (req, res) => {

  const _id = req.params._id;

  Record.findOne({ _id, userId: req.user.id })
    .lean()
    .then(record => {

      if (!record) {
        console.log('所選擇的紀錄不存在！')
        return res.redirect('/');
      }

      // 把時間格式化為日期字串yyyy-MM-dd
      const dateStr = record.date.toISOString().split('T')[0];

      return res.render('edit', { categoryList, record, dateStr });
    })

})

// (功能)修改支出
router.post('/edit', (req, res) => {

})

module.exports = router; // 匯出設定的express路由器
