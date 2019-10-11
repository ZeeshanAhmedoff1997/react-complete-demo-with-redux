const app=require('../config/express');
const users= require('../models/users');
app.get('/testUsers', function(req, res) {
  res.send('hello world');
});
app.get('/getUserId', function(req, res) {
  console.log('GetUserId is called');
  users.findOne({name: req.body.name}).then(function(user) {
    console.log(user._id);
    res.send(user._id);
  });
});
app.get('/getAllUsers', function(req, res) {
  users.find({}, function(err, users) {
    // console.log(users);
    res.json(users);
  });
});
app.get('/getUserRole', function(req, res) {
  console.log('GetUserRole is called');
  users.findOne({"_id": req.body.id}).then(function(user) {
    console.log(user.role);
    res.send(user.role);
  });
});
app.get('/getUser', function(req, res) {
  //var ObjectId = require('mongodb').ObjectID;
  console.log('Get User is called');
  console.log('Object Id',req.body.id);
  users.findOne({"_id": req.body.id}).then(function(user) {
    console.log(user);
    res.send(user);
  });
});

app.post('/addUser', function(req, res) {
  console.log('whole User', req.body);
  users.updateOne(
    { "_id": req.body.user.id },
    { name: req.body.user.name,
      userName: req.body.user.userName,
      password: req.body.user.password,
      contact: req.body.user.contact,
      role: req.body.user.role,
      shippingAddress: req.body.user.shippingAddress,
      availabilityStatus: req.body.user.availabilityStatus,
      created: new Date(),
      updated: null,
    },
    { upsert: true }
  ).then(function(item) {
    res.send(item);
  });
});
app.delete('/deleteUser', function(req, res) {
  // res.send('delete request is called', req.bosy.user);
  console.log('this is delete api', req.body.id);
  users.deleteOne({ "_id": req.body.id })
  .then(function(user) {
    res.send(user);
  });
});
app.put('/updateUserById', function(req, res) {
  console.log('old id', req.body.preId);
  users.updateOne({ "_id": req.body.preId }, {
    $set: {
      name: req.body.user.name,
      userName: req.body.user.userName,
      password: req.body.user.password,
      contact: req.body.user.contact,
      role: req.body.user.role,
      shippingAddress: req.body.user.shippingAddress,
      availabilityStatus: req.body.user.availabilityStatus,
      updated: new Date(),
    },
  }, { upsert: false })
  .then(item => {
    console.log(item, 'After update');
    res.send(item);
  })
});
app.put('/updateUserAvailability', function(req, res) {
  console.log(' id', req.body.id);
  users.updateOne({ "_id": req.body.id }, {
    $set: {
      shippingAddress: req.body.user.shippingAddress,
      availabilityStatus: req.body.user.availabilityStatus,
      updated: new Date(),
    },
  }, { upsert: false })
  .then(item => {
    console.log(item, 'After update');
    res.send(item);
  })
});