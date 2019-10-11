import mongoose from 'mongoose'

const order = new mongoose.Schema({

  _id: {type: String, required: true},
  status: {type:String,required: true },
  total: {type:Number},
  
  created : {type : Date},
  updated : {type : Date},
  completed : {type : Date}
});

export default mongoose.model('orders', order);
