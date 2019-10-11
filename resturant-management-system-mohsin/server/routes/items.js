import express from 'express'
import {addItem , getAllItems} from '../controllers/item';
const Router = express.Router();

Router.route('/addItem').post( (req,res) => {
    
    console.log("I am routeAddItem");
    const { name, price, details, image } = req.body ;
    addItem({ name, price, details, image }).then((result) => {
        console.log("Hereeeeee is result ",result)
        res.send(result);
    });

});

Router.route('/allItems').get( (req,res) => {
   
    console.log("I am routeAllItems");
    getAllItems().then((result) => {
        console.log("All Items Are ",result)
        res.send(result)
    });

});


export default Router ;