
// 這個檔案負責取得category的資料

const db = require('./mongoose');

const Category = require('../models/categoryModel');


// 運用Connection.asPromise方法，確定連線後才做後續動作
// 最後將Promise回傳，就可以完成跨檔案的非同步處理
module.exports = db.asPromise()
  // lean()要寫在裡面，否則會報錯，因為lean()是query的方法而不是Promise的方法，query只是Promise-like物件
  .then(() => Category.find().sort({ id: 1 }).lean())
  .then(categories => {
    console.log('category data was loaded OK!');
    return categories;
  }).catch(err => console.log(err))


// let categorylist;

// db.once('open', () => {
//   Category.find()
//     .lean()
//     .then(categories => {
//       categorylist = categories;
//       console.log('category data loaded OK!')
//     })
// })
