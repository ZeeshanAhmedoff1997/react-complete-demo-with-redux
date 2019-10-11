import User from '../../models/users'

const addUser = async ({ name, email,  password,  contact, role, availabilityStatus, shippingAddress }) => {
  
    console.log(' It is (addUser) Controller ');
    var postObj = {} ;
    if(role === "rider") {
        postObj= { name:name, password:password, contact:contact,   
            availabilityStatus:availabilityStatus,
            created:new Date()
        }  
    };
    if(role === "customer") {
        postObj={ name:name, password:password, contact:contact, 
            shippingAddress:shippingAddress, 
            created:new Date() 
        }
    };
    if(role === "admin") {
        postObj={ name:name, password:password, contact:contact, created:new Date() }
    };


    const res = await User.updateOne( {email:email , role:role}, 
        postObj  , 
        {upsert:true}
    );
    return res ;

}

export default addUser ;
