var mongoose = require('mongoose');
var Schema= mongoose.Schema;
const orderItem = new Schema({

 orderId: {type: Schema.Types.ObjectId},
 itemId: {type: Schema.Types.ObjectId},
 quantity: {type: Number , required: true},

 created : {type : Date},
 updated : {type : Date}

});


module.exports = mongoose.model('orderItem' , orderItem);