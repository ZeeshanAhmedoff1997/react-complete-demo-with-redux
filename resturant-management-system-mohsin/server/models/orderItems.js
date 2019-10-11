import mongoose from 'mongoose'

var orderItem = new mongoose.Schema({

 orderId: {type: String , required: true},
 itemId: {type: String , required: true},
 quantity: {type: Number , required: true},

 created : {type : Date},
 updated : {type : Date}

});


export default mongoose.model('orderItems' , orderItem);