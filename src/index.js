import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//i18n need to bundle
import i18n from "./i18n";

// Contexts
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