import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';


const store = createStore(
  reducers,
  applyMiddleware(thunk, createLogger())
);

export default store;
