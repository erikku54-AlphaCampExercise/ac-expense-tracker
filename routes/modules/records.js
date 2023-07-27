
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
      return res.redirect('/?showMsg=2');
    }).catch(err => console.log(err));
})

// (頁面)修改支出
router.get('/:_id/edit', (req, res) => {

  const _id = req.params._id;

  Record.findOne({ _id, userId: req.user.id })
    .lean()
    .then(record => {

      if (!record) {
        // 紀錄不存在
        return res.redirect('/?showMsg=11');
      }

      // 把時間格式化為日期字串yyyy-MM-dd
      const dateStr = record.date.toISOString().split('T')[0];

      return res.render('edit', { categoryList, record, dateStr });

    }).catch(err => console.log(err));

})

// (功能)修改支出
router.put('/:_id', (req, res) => {

  const _id = req.params._id;
  const { name, date, categoryId, amount } = req.body;

  if (!name || !date || !categoryId || !amount) {
    console.log('所有欄位皆為必填！');
    return res.redirect('/_id/edit');
  }

  Record.findOne({ _id, userId: req.user.id })
    .then(record => {

      if (!record) {
        // 紀錄不存在
        return res.redirect('/?showMsg=11');
      }

      record.name = name;
      record.date = date;
      record.categoryId = categoryId;
      record.amount = amount;

      return record.save();
    }).then(() => res.redirect('/?showMsg=3'))
    .catch(err => console.log(err));

})

// (功能)刪除支出
router.delete('/:_id', (req, res) => {

  const _id = req.params._id;
  const userId = req.user.id;

  Record.findOne({ _id, userId })
    .then(record => {
      if (!record) {
        // 紀錄不存在
        return res.redirect('/?showMsg=11');
      }

      return record.deleteOne()
    }).then(() => res.redirect('/?showMsg=4'))
    .catch(err => console.log(err));
})


module.exports = router; // 匯出設定的express路由器
