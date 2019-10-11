import express from 'express'
import { addUser, getAllUsers, checkUser} from '../controllers/user';
const Router = express.Router();

// Router.route('/routeAddUser').post( (req,res) => {
    
//     console.log("I am routeAddUser");
//     const { name, email,  password,  contact, role, availabilityStatus, shippingAddress } = req.body ;
//     addUser({ name, email,  password,  contact, role, availabilityStatus, shippingAddress }).then((result) => {
//         res.send(result);
//     });

// });

// Router.route('/routeAllUsers').get( (req,res) => {
   
//     console.log("I am routeAllUsers");
//     getAllUsers().then((result) => {
//         console.log("All Users Are ",result)
//         res.send(result)
//     });

// });

// Router.route('/routeCheckUser').post( (req,res) => {
    
//     console.log("I am routeCheckUser");
//     const { email,  password } = req.body ;
//     checkUser({ email,  password }).then((result) => {
//         res.send(result);
//     });

// });




export default Router ;