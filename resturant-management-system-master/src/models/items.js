import mongoose from 'mongoose';

const Product = new mongoose.Schema({
  p_id: { type:String,required: true },
  p_name: { type: String },
  p_price: { type: Number },
  p_details: { type: String },
  p_image: { type: String },
});

export default mongoose.model('Product', Product, 'Product');
