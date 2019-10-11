import app from '../config/express'
import User from '../models/users'

app.get('/getAllUsers',function(req,res){
    
    console.log('It is (getAllUsers) API ');
    item.find({},function(err , all){
        res.json(all);
    });
})

// POST api adds an User to our DB just filtering by name

app.post('/addUser', function (req, res ) {
    var obj ;
    if(req.body.role==="rider")
    {
        obj={   
            name:req.body.name , 
            password:req.body.password , 
            contact:req.body.contact , 
            role:req.body.role,
            
            availabilityStatus:req.body.availabilityStatus,
            
            created:new Date()
        }  
    }
    if(req.body.role==="customer")
    {
        obj={   
            name:req.body.name , 
            password:req.body.password , 
            contact:req.body.contact , 
            role:req.body.role,
            
            shippingAddress:req.body.shippingAddress,

            created:new Date()
        }
    }
    if(req.body.role==="admin")
    {
        obj={   
            name:req.body.name , 
            password:req.body.password , 
            contact:req.body.contact , 
            role:req.body.role,
            
            created:new Date()
        }
    }
    console.log('Object Id',req.body.id);
    User.updateOne(
            {userName:req.body.userName} , 
            obj , 
            {upsert:true}
        ).then(function(report){ 
            res.send(report);
        });
});


// {
// "email": "halwakhan",
// "name": "halwakhan", 
// "password": "halwakhan", 
// "contact": "halwakhan", 

// "role":"customer",
// "availabilityStatus": "true",
// "shippingAddress": "h#jsdaghkfj,Dfhjadgfhlas ,dfhoaewlf ,gaerg"

    
// }