import React from 'react';
import ReactDOM from 'react-dom';
import main from './index.css';
// import darkMode from './darkMode.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));


import {BrowserRouter} from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    , document.getElementById('root'));

// registerServiceWorker();
