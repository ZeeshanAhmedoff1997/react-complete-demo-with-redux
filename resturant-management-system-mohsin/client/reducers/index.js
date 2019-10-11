import { combineReducers } from 'redux'
import user from './users'
import item from './items'

export default combineReducers( {
   user,
   item
})