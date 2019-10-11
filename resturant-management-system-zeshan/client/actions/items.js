import axios from 'axios';
import { notification } from 'antd';
export const addItem = ({itemName,itemPrice,details,imageUrl}) => (dispatch) => {
  console.log('add item action',itemPrice,itemName,details,imageUrl)
  dispatch({ type: 'ADD_ITEM_REQUEST' });

   const url = 'http://localhost:5000/addItem';

   return axios.post(url,{itemName,itemPrice,details,imageUrl}).then(( data ) => {
     console.log('data is ',JSON.parse(data.config.data));
     const item=JSON.parse(data.config.data);
     return dispatch({ type: 'ADD_ITEM_SUCCESS', payload: item });
  }).catch((error) => {
    const { item } = error.response;

    notification.error({
      message: 'ADD ITEM',
      description: data
    });

    dispatch({ type: 'ADD_ITEM_FAILED' });
  });
};
export const deleteItem = (itemId) => (dispatch) => {
  console.log('delete item action',itemId)
  dispatch({ type: 'DELETE_ITEM_REQUEST' });
   const url = 'http://localhost:5000/deleteItem';
   return axios.delete(url,{itemId}).then(({ data }) => {
     const { res } = data;
     return dispatch({ type: 'DELETE_ITEM_SUCCESS' });
  }).catch((error) => {
    const { data } = error.response;
    notification.error({
      message: 'DELETE ITEM',
      description: data
    });

    dispatch({ type: 'ADD_ITEM_FAILED' });
  });
};