import React from 'react';
import { hot } from 'react-hot-loader'
import './style.css';
import LoginForm from './components/authentication/login.jsx'
import RegistrationForm from './components/authentication/register.jsx'

import { store } from './configureStore'
import { Provider } from 'react-redux'
import RenderRoutes from './routes';

const App = () => {
    return(
        <Provider store= {store} >
            <RenderRoutes />
            {/* <h1 className="h">Users</h1> */}
            {/* <div > 
                <LoginForm /> 
                <RegistrationForm /> 
            </div> */}
        </Provider>
    )
}

export default hot(module)(App)
