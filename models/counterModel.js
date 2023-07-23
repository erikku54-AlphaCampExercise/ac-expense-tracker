
// 維護各個collection的計數器，用以建立自動增號id

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  id: {
    type: String,
    required: true,
    // index: true,
    unique: true
  },
  seq: {
    type: Number,
    default: 0
  }
})

const counterModel = mongoose.model('Counter', counterSchema);

const getAutoIncrementID = async function (modelName, model) {

  // 計數器累加 findByIdAndUpdate(id, update, options)
  let counter = await counterModel.findOneAndUpdate(
    { id: modelName }, // id: 計數的Model名稱
    { $inc: { seq: 1 } }, // update: 每次都將計數器seq加1
    { new: true, upsert: true }); // options: new-回傳修改後的新doc; upsert-document不存在就建立


  // 檢查該id是否已存在model，如果存在就要再往上加
  let check = await model.exists({ id: counter.seq });
  while (check !== null) {

    counter = await counterModel.findOneAndUpdate(
      { id: modelName }, { $inc: { seq: 1 } }, { new: true });
    check = await model.exists({ id: counter.seq });
  }

  return counter.seq;
}

module.exports = { counterModel, getAutoIncrementID };

