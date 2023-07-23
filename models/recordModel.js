
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const getAutoIncrementID = require('./counterModel').getAutoIncrementID;

const recordSchema = new Schema({
  id: {
    type: Number
    // unique: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
  categoryId: {
    type: Number,
    required: true
  }
});

recordSchema.pre('save', async function (next) {

  try {
    // 如果不是新產生的文件就直接回傳，因為id已存在
    if (!this.$isNew) {
      return next();
    }

    // JS有提昇(Hoisting)的特性，所以可以先引用categoryModel
    // pre()一定要寫在mongoose.model之前，否則不會fire: Calling pre() or post() after compiling a model does not work in Mongoose in general.
    this.id = this.id || await getAutoIncrementID('Category', recordModel);
    return next();

  } catch (err) {
    return next(err);
  }

});

const recordModel = mongoose.model('Record', recordSchema);
module.exports = recordModel;

