import mongoose from 'mongoose';

const Order = new mongoose.Schema({
  o_id: {type: String, required: true},
  p_id: { type:String,required: true },
  p_quantity: { type:Number}, 
});

export default mongoose.model('Order', Order, 'Order');
