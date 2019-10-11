var mongoose = require('mongoose');

var users = new mongoose.Schema({

   name :  {type : String , required: true} ,
   email :  {type : String , required: true} ,
   password :  {type : String , required: true} ,
   contact :  {type : String , required: true} ,
   role :  {type : String} ,
   availabilityStatus :  {type : String} ,
   shippingAddress :  {type : String} ,
   created : {type : Date},
   updated : {type : Date}

});


module.exports = mongoose.model('users' , users);