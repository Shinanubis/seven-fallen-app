import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//Context import
import {DatasProvider} from './contexts/DatasContext';


ReactDOM.render(
    <DatasProvider>
        <App />
    </DatasProvider> 
    ,document.getElementById('root'));