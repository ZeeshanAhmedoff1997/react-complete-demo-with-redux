import mongoose from 'mongoose'
const itemSchema = new mongoose.Schema({
  
  _id: { type:String,required: true },
  name: { type: String },
  price: { type: Number },
  details: { type: String },
  image: { type: String },
  
  created : {type : Date},
  updated : {type : Date}
});

export default mongoose.model('Item' , itemSchema ); 