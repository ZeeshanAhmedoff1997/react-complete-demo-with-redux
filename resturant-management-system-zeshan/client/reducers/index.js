
import { combineReducers } from 'redux';
import user from './user';
import item from './items';
import admin from './admin';
export default combineReducers({
  user,
  item,
  admin
});
