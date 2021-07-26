import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { PagesContextProvider } from './contexts/PagesContext';

/*api*/
import getAuthUser from './api/Authentication';

/*settings*/
import pages from './settings/pages.js'

ReactDOM.render(
    
        <AuthContextProvider callback={getAuthUser}>
            <PagesContextProvider pages={pages}>
            <App />
            </PagesContextProvider>
        </AuthContextProvider>

    , document.getElementById('root'));