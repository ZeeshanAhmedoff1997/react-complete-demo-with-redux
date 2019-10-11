import Item from '../../models/items'

const getAllItems = async () => {
    console.log(' It is (getAllItems) Controller ');
    const items = await Item.find({});
    return {items};
}

export default getAllItems ;