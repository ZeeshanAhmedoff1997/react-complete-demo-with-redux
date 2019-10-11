const app=require('../config/express');
const item= require('../models/items');
import {getAllItems} from '../controllers/items/import-Items';
import addItem  from '../controllers/items/additems';
app.get('/test', function(req, res) {
  res.send('hello world');
});
app.get('/getItemId', function(req, res) {
  console.log('GetItemId is called');
  item.findOne({name: req.body.name}).then(function(item) {
    console.log(item._id);
    res.send(item._id);
  });
});
app.get('/getAllItems', function(req, res) {
  getAllItems().then((result) => {
    res.send(result);
  }).catch((error)=>{
    res.send(error);
  });
  // item.find({}, function(err, items) {
  //    console.log(users);
  //   res.json(items);
  // });
});
app.get('/getItem', function(req, res) {
  //var ObjectId = require('mongodb').ObjectID;
  console.log('Get Item is called');
  console.log('Object Id',req.body.id);
  item.findOne({"_id": req.body.id}).then(function(item) {
    console.log(item);
    res.send(item);
  });
});
app.post('/addItem', function(req, res) {
  const { itemName, itemPrice, details, imageUrl } = req.body ;
  console.log('whole Item', req.body);
  addItem({itemName, itemPrice, details, imageUrl }).then(function(result) {
    res.send(result);
  });
});
app.delete('/deleteItem', function(req, res) {
  // res.send('delete request is called', req.bosy.user);
  console.log('this is itemId in api is', req.query.itemId);
  item.deleteOne({ "_id": req.body.itemId })
  .then(function(item) {
    res.send(item);
  });
});
app.put('/updateItemById', function(req, res) {
  console.log('old id', req.body.preId);
  item.updateOne({ "_id": req.body.preId }, {
    $set: {
      name: req.body.name,
      details: req.body.details,
      image: req.body.image,
      price: req.body.price,
      updated: new Date(),
    },
  }, { upsert: false })
  .then(item => {
    console.log(item, 'After update');
    res.send(item);
  })
});
