
const passport = require('passport');
const LocalStrategy = require('passport-local');

const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

module.exports = app => {

  // ----初始化passport: 以中介軟體形式掛載
  app.use(passport.initialize());
  // 底下相當於app.use(passport.authenticate('session'))  使用session驗證策略
  app.use(passport.session());


  // ----設定認證策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true },
    (req, email, password, done) => {

      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, req.flash('error', '該email不存在'));
          }

          // 密碼驗證
          bcrypt.compare(password, user.password)
            .then(isMatch => {

              if (!isMatch) {
                return done(null, false, req.flash('error', '錯誤的使用者密碼'));
              }

              return done(null, user);
            })

        }).catch(err => done(err, false));
    }))

  // ----設定Sessions維護機制

  // 設定當策略驗證通過時，要存入session的資料
  passport.serializeUser((user, done) => {
    return done(null, { _id: user._id, id: user.id, name: user.name, email: user.email });
  })

  // 設定當session驗證通過時，要傳入req.user的資料
  passport.deserializeUser((user, done) => {
    return done(null, user);
  })

}
