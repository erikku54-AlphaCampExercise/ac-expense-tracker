
const express = require('express');
const router = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../../models/userModel');

// (頁面)註冊
router.get('/register', (req, res) => {
  return res.render('register');
})

// (功能)註冊
router.post('/register', (req, res) => {

  const { name, email, password, confirmPassword } = req.body;

  const errors = [];

  if (!name || !email || !password || !confirmPassword) {

    errors.push({ message: '所有欄位皆為必填!' });
  }
  if (password !== confirmPassword) {

    errors.push({ message: '密碼與確認密碼不相符!' });
  }
  if (errors.length) {
    return res.render('register', { errors, ...req.body });
  }

  User.findOne({ email })
    .then(user => {
      if (user) {

        errors.push({ message: '此email已經註冊過!' });
        return res.render('register', { errors, ...req.body });
      }

      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))

      req.flash('success_msg', '註冊成功! 請重新登入!')
      return res.redirect('/users/login');

    }).catch(err => console.log(err));

})

// (頁面)登入
router.get('/login', (req, res) => {
  return res.render('login');
})

// (功能)登入
router.post('/login', passport.authenticate('local', {
  successRedirect: '/?showMsg=1',
  failureRedirect: '/users/login',
  failureFlash: true
})
)

// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user) => {
//     if (err) { return next(err) }
//     if (!user) { return res.render('login', { ...req.body }) }
//     console.log('TEST');
//     res.redirect('/');
//   })(req, res, next);
// });


// (功能)登出
router.post('/logout', (req, res) => {
  // 新版v0.6的logout()是非同步函數
  req.logout(err => {
    if (err) return console.log(err);

    req.flash('success_msg', '登出成功! 請重新登入')
    res.redirect('/users/login');
  })

})

module.exports = router; // 匯出設定的express路由器
