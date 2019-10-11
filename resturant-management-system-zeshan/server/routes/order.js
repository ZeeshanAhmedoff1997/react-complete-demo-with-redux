const app=require('../config/express');
const order= require('../models/orders');
app.get('/OrderTest', function(req, res) {
  res.send('hello world');
});
app.get('/getOrderId', function(req, res) {
  console.log('GetOrderId is called');
  order.findOne({customerId: req.body.customerId}).then(function(order) {
    console.log(order._id);
    res.send(order._id);
  });
});
app.get('/getOrder', function(req, res) {
  //var ObjectId = require('mongodb').ObjectID;
  console.log('Get Order is called');
  console.log('Order Id',req.body.id);
  order.findOne({"_id": req.body.id}).then(function(order) {
    console.log(order);
    res.send(order);
  });
});
app.get('/getAllOrders', function(req, res) {
  order.find({}, function(err, users) {
    // console.log(users);
    res.json(orders);
  });
});
app.post('/addOrder', function(req, res) {
  order.updateOne(
    { customerId: req.body.order.customerId, created:req.body.order.created },{
    $set: { customerId: req.body.order.customerId,
      status: req.body.order.status,
      Total_Price: req.body.order.totalPrice,
      completed_Time: req.body.order.time,
      created: new Date(),
      updated: null,
      },
    },
    { upsert:true}
  ).then(function(item) {
    res.send(item);
  });
});
app.delete('/deleteOrder', function(req, res) {
  // res.send('delete request is called', req.bosy.user);
  console.log('this is delete api', req.body.id);
  order.deleteOne({ "_id": req.body.id })
  .then(function(order) {
    res.send(order);
  });
});
app.put('/updateOrderById', function(req, res) {
  console.log('old id', req.body.preId);
  item.updateOne({ "_id": req.body.preId }, {
    $set: {
      customerId: req.body.order.customerId,
      status: req.body.order.status,
      Total_Price: req.body.order.totalPrice,
      completed_Time: req.body.order.url,
      created: new Date(),
      updated: null,
    },
  }, { upsert: false })
  .then(item => {
    console.log(item, 'After update');
    res.send(item);
  })
});
