import User from '../../models/users'

const checkUser = async ({ email,  password }) => {
  
    console.log(' It is (checkUser) Controller ');
    const res = await User.findOne( { email:email , password:password });
    console.log("Object to be find   :::  " , res )
    return res ;

}

export default checkUser ;
