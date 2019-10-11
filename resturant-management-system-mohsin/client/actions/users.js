import Axios from 'axios'
import {notification} from 'antd';
// import { Redirect } from 'react-router-dom'

//////       REGISTER_USER_REQUEST     ///////

export const registerUser = inputObj => (dispatch) => {
    console.log('Here Action recieves the values from  FrontEnd  :::', inputObj)
    dispatch({
        type : 'REGISTER_USER_REQUEST'
    })
    Axios({
        method : "POST",
        url : 'http://localhost:3002/api/v1/register',
        data :inputObj  
    })
    .then(function ({data}) {
        console.log(" This is ADDUSER Axios Response " , data)
        const { user, token } = data ;        
        localStorage.setItem('loginToken', token);
        Axios.defaults.headers.common.Authorization = `JWT ${token}`;
    
        notification.success({
          message: 'Register User',
          description: 'You have registered successfully !'
        });
        return dispatch({
            type : 'REGISTER_USER_SUCCESS',
            payLoad : user
        });
    })
    .catch( (error) => {
        const { data } = error.response.data;
        notification.error({
          message: 'Register User',
          description: data
        });
    
        dispatch({ type: 'REGISTER_USER_FAILED' });
    });
}







//////       LOGIN_USER_REQUEST     ///////

export const loginUser = ({ email, password }) => (dispatch) => {
    // console.log("Recieving Email and Password  at Action ::: ",email, password)
    dispatch({ 
        type: 'LOGIN_USER_REQUEST' 
    });
    Axios({
        method : "POST",
        url : 'http://localhost:3002/api/v1/login',
        data :{
            email,
            password
        } 
    }) 
    .then(({data}) => {
      const { user, token } = data;
      console.log("user in loginUser Action is  ::::  ",user);
      localStorage.setItem('loginToken', token);
      Axios.defaults.headers.common.Authorization = `JWT ${token}`;
      console.log("token in loginUser Action is  ::::  ",token);
    
    //   <Redirect to='/home' />
    //   HashHistory.push('/home');
      notification.success({
        message: 'Login User',
        description: 'You are sign in successfully !'
      });
  
      return dispatch({ type: 'LOGIN_USER_SUCCESS', payload: user });
    })
    .catch( (error) => {
        // const { data } = error.response;
        notification.error({
          message: 'Login User',
          description: error.response
        });
  
      dispatch({ type: 'LOGIN_USER_FAILED' });
    });
  };
  





////////     GET_USER       //////////


export const getUser = () => (dispatch) => {
    dispatch({ 
        type: 'GET_USER_REQUEST' 
    });
    return Axios({
        method : "GET",
        url : 'http://localhost:3002/api/v1/findUser',
    }) 
    .then(({ data }) => {
        const { user } = data;
        console.log("user in the Action of getUser is  :::: ", user)
        return dispatch({ type: 'GET_USER_SUCCESS', payload: user });
    })
    .catch( (error) => {
        console.log(error, 'Errr')
        notification.error({
          message: 'Get User',
          description: error.response
        });
  
      dispatch({ type: 'GET_USER_FAILED' });
    });
  };
  





//////       Get All User     ///////

export const getusers = () => (dispatch) => {
    dispatch({
        type : 'START_API_WORK'
    })
    Axios({
        method : "GET",
        url : 'http://localhost:3002/testGet'
    })
    .then ( function (response) {
        console.log(response);
        return dispatch ({
            type : 'GET_ALL_USERS',
            payLoad : {
                usersArr : response.data 
            }
        })
    })
    .catch( function (error) {
        console.error( " Error : " , error );
    })
    
}



//////       Delete User     ///////

export const deleteuser = user => (dispatch) => {
    dispatch({
        type : 'START_API_WORK'
    })
    Axios({
        method : "DELETE",
        url : 'http://localhost:3002/testDel',
        data :{
            user
        }
    })
    .then(function (response) {
        console.log(" This is ADDUSER Axios Response " , response)
        return dispatch({
            type : 'DELETE_USER',
            payLoad : {
                user
            }
        })
    })
    .catch( function (error){
        console.error("Error : ",error)
    })
}  



//////       Update User     ///////

export const updateuser = ( objToUpdate , updatedObj ) => (dispatch) => {
    dispatch({
        type : 'START_API_WORK'
    })
    Axios({
        method : "PUT",
        url : 'http://localhost:3002/testPut',
        data :{
            updatedObj,
            objToUpdate
        }
    })
    .then(function (response) {
        console.log(" This is Update User Axios Response " , response)
        return dispatch({
            type : 'UPDATE_USER',
            payLoad : {
                updatedObj
            }
        })
    })
    .catch( function (error){
        console.error("Error : ",error)
    })
}

export const updatepro = (index , objToUpdate) =>{
    return {
        type : 'UPDATE_PRO',
        payLoad : {
            index,
            objToUpdate
        }
    }
}








// export const adduser = text =>{
//     return {
//         type : ADD_USER,
//         payLoad : {
//             text
//         }
//     }
// }
