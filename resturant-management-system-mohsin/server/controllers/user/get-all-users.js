import User from '../../models/users'

const getAllUsers = async () => {
    console.log(' It is (getAllUsers) Controller ');
    const users = await User.find({});
    return {users};
}

export default getAllUsers ;