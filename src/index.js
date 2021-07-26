import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AuthContextProvider} from './contexts/AuthContext';

/*api*/
import getAuthUser from './api/Authentication'; 


ReactDOM.render(
    <AuthContextProvider callback={getAuthUser}>
        <App />
    </AuthContextProvider>
    ,document.getElementById('root'));