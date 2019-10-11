
import { notification } from 'antd';
import axios from 'axios';

export const loginUser = ({ email, password }) => (dispatch) => {
  console.log('action login is called',email,password);
  dispatch({ type: 'LOGIN_USER_REQUEST' });

  const url = 'http://localhost:5000/addItem';

  return axios.post(url, {
    email,
    password,
    
  }).then(({ data }) => {
    const { user, token } = data;
    console.log("this is user",user);
    localStorage.setItem('loginToken', token);
    axios.defaults.headers.common.Authorization = `JWT ${token}`;

    notification.success({
      message: 'Login User',
      description: 'You are sign in successfully !'
    });
    console.log("user after login is ",user);
    return dispatch({ type: 'LOGIN_USER_SUCCESS', payload: user });
  }).catch((error) => {
    const { data } = error.response;

    notification.error({
      message: 'Login User',
      description: data
    });

    dispatch({ type: 'LOGIN_USER_FAILED' });
  });
};
export const logoutUser = () => (dispatch) => {
  console.log('in the logout action');
  localStorage.removeItem('loginToken');

  return dispatch({ type: 'LOGOUT_USER_SUCCESS' });
};
export const registerUser = ({ name, email, password, role, shippingAddress,availabilityStatus,contact }) => (dispatch) => {
  console.log("register user action is called");
  dispatch({ type: 'REGISTER_USER_REQUEST' });

  const url = 'http://localhost:5000/api/v1/register';

  return axios.post(url, {
    name,
    email,
    password,
    role,
    shippingAddress,
    availabilityStatus,
    contact,
  }).then(({ data }) => {
    const { user, token } = data;

    localStorage.setItem('loginToken', token);
    axios.defaults.headers.common.Authorization = `JWT ${token}`;

    notification.success({
      message: 'Register User',
      description: 'You are registered successfully !'
    });

    return dispatch({ type: 'REGISTER_USER_SUCCESS', payload: user });
  }).catch((error) => {
    const { data } = error.response;

    notification.error({
      message: 'Register User',
      description: data
    });

    dispatch({ type: 'REGISTER_USER_FAILED' });
  });
};
export const getUser = () => (dispatch) => {
  dispatch({ type: 'GET_USER_REQUEST' });

  const url = 'http://localhost:5000/api/v1/findUser';

  return axios.get(url).then(({ data }) => {
    const { user } = data;

    return dispatch({ type: 'GET_USER_SUCCESS', payload: user });
  }).catch((error) => {
    const { data } = error.response;

    notification.error({
      message: 'Get User',
      description: data
    });

    dispatch({ type: 'GET_USER_FAILED' });
  });
};