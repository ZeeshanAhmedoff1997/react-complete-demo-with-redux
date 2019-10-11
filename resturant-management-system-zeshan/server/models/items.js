const mongoose=require('mongoose');

const item = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  details: { type: String },
  image: { type: String },
  created : {type : Date},
  updated : {type : Date}
});

module.exports = mongoose.model('item' , item);
