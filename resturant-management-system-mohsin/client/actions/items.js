import Axios from 'axios'
import {notification} from 'antd';

export const addItem = inputObj => (dispatch) => {
    console.log('Here Action recieves the values from  FrontEnd  :::', inputObj)
    dispatch({
        type : 'ADD_ITEM_REQUEST'
    })
    Axios({
        method : "POST",
        url : 'http://localhost:3002/api/v1/items/addItem',
        data :inputObj  
    })
    .then(function ({config}) {
        // console.log(" This is ADDITEM Axios Response " , config)
        const { data } = config ;    
        const item = JSON.parse(data)    
        
        notification.success({
          message: 'Item',
          description: 'Item Added Successfully !'
        });
        return dispatch({
            type : 'ADD_ITEM_SUCCESS',
            payload : item 
        });
    })
    .catch( (error) => {
        // const { data } = error.response.data;
        notification.error({
          message: 'Register User',
          description: "Hello its Error"
        });
    
        dispatch({ type: 'ADD_ITEM_FAILED' });
    });
}




export const getAllItems = () => (dispatch) => {
    dispatch({
        type : 'GET_ALL_ITEMS_REQUEST'
    })
    Axios({
        method : "GET",
        url : 'http://localhost:3002/api/v1/items/allItems',
    })
    .then(function ({data}) {

        // console.log(" This is ALL ITEMS axios response " , data)
        const item = data    

        notification.success({
          message: 'Item Panel',
          description: 'Here is your Item Panel !'
        });
        return dispatch({
            type : 'GET_ALL_ITEMS_SUCCESS',
            payload : item   
        });
    })
    .catch( (error) => {
        // const { data } = error.response.data;
        notification.error({
          message: 'Item Panel',
          description: "OOPs! Something Wrong happens with your Item Panel"
        });
    
        dispatch({ type: 'GET_ALL_ITEMS_FAILED' });
    });
}
