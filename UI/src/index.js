import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import reducers from './store/reducers';
import './index.css';

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
  ));

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
