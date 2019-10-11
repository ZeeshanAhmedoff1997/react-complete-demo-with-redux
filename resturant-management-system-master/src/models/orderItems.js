var mongoose = require('mongoose');

var user = new mongoose.Schema({

 o_id: {type: String , required: true},
 

});


module.exports = mongoose.model('user' , user);