import app from '../config/express' ;
import item from '../models/items' ;

app.get('/getAllItems',function(req,res){
  
  console.log(' It is (getAllItems) API ');
  
  item.find({})
  .then(function( all ){
    res.send(all);
  });

});

// POST api adds an item to our DB just filtering by name

app.post('/addItem', function (req, res ) {
  console.log(' It is (addItem) API ');

  item.updateOne(
    {name:req.body.name} , 
    {price:req.body.price , details:req.body.details , image:req.body.image , created:new Date()} , 
    {upsert:true}
  ).then(function(report){
        res.send(report);
    });
});



// GET api returns whole item finding by ID 

app.get('/getItem', function(req, res) {
  console.log(' It is (getItem) API ');

    item.findOne({"_id": req.body.id}).then(function(item) {
      console.log(item);
      res.send(item);
    });
});



// GET api returns the ID of item finding by name

app.get('/getItemId', function(req, res) {
  console.log(' It is (getItemId) API ');

    item.findOne({name: req.body.name}).then(function(item) {
      console.log(item._id);
      res.send(item._id);
    });
});



// DELETE api to delete item by using ID

// app.delete('/deleteItem', function(req, res) {
//     console.log(req.body.id);
//     item.deleteOne({ "_id": req.body.id })
//     .then(function(ress) {
//     res.send(ress);
//     });
// });
   

app.delete('/deleteItem', function(req, res) {
  console.log(' It is (deleteItem) API ');

  item.deleteOne( {"_id":req.body.id} ,{strict:false} )
    .then(function(item) {
      res.send(item);
    });//findByIdAndDelete()
   });
// UPDATE api to update item by using ID


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

   


// Router.route('/addItem').post((req, res) => {
//     // req.body;
//     items.updateOne(
//         {} , 
//         {name:'Biryani' , price:550 , details:'Continental' , image:'address of image' , created:new Date()} , 
//         {upsert:false})
//   });