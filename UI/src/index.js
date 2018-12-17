import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router';

import App from './App';
import './index.css';
import { store } from "./store";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path='/' component={App} >
                </Route>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('#root'));
