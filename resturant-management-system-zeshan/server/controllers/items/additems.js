import Item from '../../models/items'

const addItem = ({ itemName ,  itemPrice ,  details ,  imageUrl }) => {
  
    console.log(' It is (addItem) Controller ');
    console.log('itemName:',itemName,'itemPrice:',itemPrice)
      const res = Item.updateOne( {name:itemName }, 
        {price:itemPrice , details:details , image:imageUrl , created:new Date()} , 
        {upsert:true}
      );
      return res ;
}
export default addItem ;