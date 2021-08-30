import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//i18n need to bundle
import i18n from "./i18n";

// Contexts
import { AuthContextProvider } from './contexts/AuthContext';
import { PagesContextProvider } from './contexts/PagesContext';
import { SessionContextProvider} from './contexts/SessionContext';

/*api*/
import getAuthUser from './api/Authentication';

/*settings*/
import pages from './settings/pages.js'

ReactDOM.render(
        <AuthContextProvider callback={getAuthUser}>
            <SessionContextProvider>
                <PagesContextProvider pages={pages}>
                    <App />
                </PagesContextProvider>
            </SessionContextProvider>
        </AuthContextProvider>

    , document.getElementById('root'));