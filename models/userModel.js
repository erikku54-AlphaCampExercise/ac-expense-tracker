
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const getAutoIncrementID = require('./counterModel').getAutoIncrementID;

const userSchema = new Schema({
  id: {
    type: Number
    // unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function (next) {

  try {
    // 如果不是新產生的文件就直接回傳，因為id已存在
    if (!this.$isNew) {
      return next();
    }

    // JS有提昇(Hoisting)的特性，所以可以先引用categoryModel
    // pre()一定要寫在mongoose.model之前，否則不會fire: Calling pre() or post() after compiling a model does not work in Mongoose in general.
    this.id = this.id || await getAutoIncrementID('User', userModel);
    return next();

  } catch (err) {
    return next(err);
  }

});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
