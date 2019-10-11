const app=require('../config/express');
const orderItem= require('../models/orders');

app.post('/addItemsToOrder', function(req, res) {
  orderItem.updateOne(
    { },
    { 
      orderId: req.body.orderId,
      quantity: req.body.quantity,
      itemId: req.body.itemId,
      created: new Date(),
      updated: null,
    },
    { upsert: false }
  ).then(function(item) {
    res.send(item);
  });
});
app.delete('/deleteItemFromOrder', function(req, res) {
  // res.send('delete request is called', req.bosy.user);
  console.log('this is delete api', req.body.itemId);
  orderItem.deleteOne({ itemId: req.body.itemId })
  .then(function(deletedItem) {
    res.send(deletedItem);
  });
});
app.put('/updateItemQuantity', function(req, res) {
  console.log('item id', req.body.itemId);
  orderItem.updateOne({ itemId: req.body.itemId }, {
    $set: {
      quantity: req.body.quantity,
      updated: new Date(),
    },
  }, { upsert: false })
  .then(item => {
    console.log(item, 'After update');
    res.send(item);
  })
});
