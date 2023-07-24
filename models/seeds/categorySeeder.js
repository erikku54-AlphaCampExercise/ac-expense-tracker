
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config({ path: './.env' });
// }

const bcrypt = require('bcryptjs');

const db = require('../../config/mongoose');

const Category = require('../categoryModel');
const User = require('../userModel');
const { categories, users } = require('./seeds.json');

db.once('open', () => {

  users.forEach(user => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  })

  Promise.all([Category.create(categories), User.create(users)])
    .then(() => {
      console.log('category & user seed data were created successfully.');
      process.exit();
    })
    .catch(err => console.log(err));

});



