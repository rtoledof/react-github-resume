import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const API = "https://api.github.com/";

ReactDOM.render(
    <App api={API}/>,
    document.getElementById('root'));
registerServiceWorker();
