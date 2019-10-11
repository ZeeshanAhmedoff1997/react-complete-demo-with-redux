const mongoose=require('mongoose');
var Schema= mongoose.Schema;
const order = new Schema({
  status: {type:String,required: true },
  Total_Price : {type: Number},
  completed_Time: { type: Date},
  customerId: {type: Schema.Types.ObjectId},
  created : {type : Date},
  updated : {type : Date}
});

module.exports = mongoose.model('order' , order);
// const mongoose=require('mongoose');

// const order = new mongoose.Schema({
//   status: {type:String,required: true },
//   Total_Price : {type: Number},
//   completed_Time: { type: Date},
//   customerId: {type: Schema.Types.ObjectId},
//   created : {type : Date},
//   updated : {type : Date}
// });

// module.exports = mongoose.model('order' , order);
