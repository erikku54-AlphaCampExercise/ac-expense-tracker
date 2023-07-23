
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config({ path: '../../.env' });
// }

const db = require('../../config/mongoose');

const Record = require('../recordModel');
const { records } = require('./seeds.json');

db.once('open', () => {

  Record.create(records)
    .then(() => {
      console.log('record seed data were created successfully.');
      process.exit();
    })
    .catch(err => console.log(err));

});
