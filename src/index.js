import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//i18n need to bundle
// eslint-disable-next-line no-unused-vars
import i18n from "./i18n";

// Contexts
import { AuthContextProvider } from './contexts/AuthContext';
import { PagesContextProvider } from './contexts/PagesContext';
import { SessionContextProvider} from './contexts/SessionContext';



/*settings*/
import pages from './settings/pages.js'

ReactDOM.render(
        <AuthContextProvider>
            <SessionContextProvider>
                <PagesContextProvider pages={pages}>
                    <App />
                </PagesContextProvider>
            </SessionContextProvider>
        </AuthContextProvider>

    , document.getElementById('root'));