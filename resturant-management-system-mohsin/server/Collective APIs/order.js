import app from '../config/express'
import Order from '../models/orders'

app.get('/testOrder',function(req,res){
    console.log('api is called');
})

// POST api adds an Order to our DB just filtering by name

app.post('/placeOrder', function (req, res ) {
    console.log('Object Id',req.body.id);
    Order.updateOne(
        {status:req.body.status , total:req.body.total, created:new Date } , 
            {} , 
            {upsert:true}
        ).then(function(report){ 
            res.send(report);
        });
});
