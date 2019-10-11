import React from 'react';
import Login from '../client/components/authentication/Login.jsx';
import Register from '../client/components/authentication/Register.jsx';
import { Provider } from 'react-redux';
import RenderRoutes from './routes/index';
import Dummylayout from './components/dummy.jsx' 
import store from './Store';
const App = () => {
  return (
    <Provider store={store}>
       <RenderRoutes />
    </Provider>
  );
};
export default App;
