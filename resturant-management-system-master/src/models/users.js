var mongoose = require('mongoose');

var user = new mongoose.Schema({

   name :  {type : String} ,
   userName :  {type : String} ,
   password :  {type : String} ,
   contact :  {type : String} ,

   role :  {type : String} ,
   availabilityStatus :  {type : String} ,
   shippingAddress :  {type : String} ,

   created : {type : Date},
   updated : {type : Date}

});


module.exports = mongoose.model('user' , user);