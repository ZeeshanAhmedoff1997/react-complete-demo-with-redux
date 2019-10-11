import app from '../config/express'
import OrderItems from '../models/orderItems'

app.get('/testOrderItem',function(req,res){
    console.log(' It is (testOrderItem) API ');
})

// POST api adds an OrderItems to our DB just filtering by name

app.post('/addOrderItem', function (req, res ) {
    console.log(' It is (addOrderItem) API ');
    OrderItems.updateOne(
            {} , 
            {orderId:req.body.orderId ,itemId:req.body.itemId , quantity:req.body.quantity, created:new Date } , 
            {upsert:true}
        ).then(function(report){ 
            res.send(report);
        });
});
