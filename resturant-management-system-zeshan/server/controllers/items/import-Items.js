var app = require('../../config/express');
const item = require('../../models/items')

const getAllItems = async () => {
  console.log(' It is (getAllItems) Controller ');
  const items = await Item.find({});
  return {items};
}
export default getAllItems;