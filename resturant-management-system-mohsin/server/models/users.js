import mongoose from 'mongoose'
var user = new mongoose.Schema({

   name :  {type : String , required: true} ,
   email :  {type : String , required: true} ,
   password :  {type : String , required: true} ,
   contact :  {type : String , required: true} ,
   
   role :  {type : String , required: true} ,
   availabilityStatus :  {type : String} ,
   shippingAddress :  {type : String} ,

   created : {type : Date},
   updated : {type : Date}

});


export default mongoose.model('User' , user);