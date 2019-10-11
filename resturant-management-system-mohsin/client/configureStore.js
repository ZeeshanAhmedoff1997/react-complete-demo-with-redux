import { applyMiddleware , createStore } from 'redux';
import rootReducer from './reducers';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
export const store = createStore(rootReducer , applyMiddleware( thunk , createLogger() ));