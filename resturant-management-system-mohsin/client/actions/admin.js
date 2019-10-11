import axios from 'axios';
import { notification } from 'antd';


export const resetUserFilters = () => (dispatch) => {
  dispatch({ type: 'RESET_FILTERS_USERS' });
};

export const setFilters = filters => (dispatch) => {
  dispatch({ type: 'SET_FILTER_USERS', payload: filters });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('loginToken');
  localStorage.removeItem('adminToken');

  return dispatch({ type: 'LOGOUT_USER_SUCCESS' });
};

export const setPage = pageNumber => (dispatch) => {
  dispatch({ type: 'SET_PAGE_USERS', payload: { pageNumber } });
};

export const getUsers = () => (dispatch, getState) => {
  const { pageSize, pageNumber } = getState().admin.pagination;
  const { filters } = getState().admin;
  dispatch({ type: 'GET_ALL_USERS_REQUEST' });
  axios({
    method: 'get',
    url: '/api/v1/admin/fetchUsers',
    params: {
      limit: pageSize || 25,
      skip: (pageNumber - 1) * (pageSize || 25),
      filters
    }
  }).then(({ data }) => {
    return dispatch({ type: 'GET_ALL_USERS_SUCCESS', payload: data });
  });
};

export const setPageSize = pageSize => (dispatch) => {
  localStorage.setItem('usersPerPage', pageSize);
  dispatch({ type: 'SET_PAGE_SIZE_USERS', payload: { pageSize } });
};

export const impersonate = userId => (dispatch) => {
  dispatch({ type: 'IMPERSONATE_USER_REQUEST' });

  const url = '/api/v1/impersonate';

  return axios.post(url, {
    userId
  }).then(({ data }) => {
    const { user, token } = data;

    const loginToken = localStorage.getItem('loginToken');
    localStorage.setItem('adminToken', loginToken);

    localStorage.setItem('loginToken', token);
    axios.defaults.headers.common['Authorization'] = `JWT ${token}`;

    notification['success']({
      message: 'Impersonate User',
      description: 'User impersonated successfully !'
    });

    return dispatch({ type: 'IMPERSONATE_USER_SUCCESS', payload: user });
  }).catch((error) => {
    const { data } = error.response;

    notification['error']({
      message: 'Impersonate User',
      description: data,
    });

    return dispatch({ type: 'IMPERSONATE_USER_FAILED' });
  })
};
