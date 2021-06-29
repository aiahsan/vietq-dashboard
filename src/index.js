import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {createStore} from 'redux';
import {store,perssistor} from './redux/store'

import { createBrowserHistory } from 'history';
import {
    Router,
    Route,
    Switch
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
/*import 'font-awesome/css/font-awesome.min.css';*/
import 'assets/scss/zest-admin.css';
import 'assets/fonts/simple-line-icons.css';
import 'assets/css/cststyles.css'
import indexRoutes from 'routes/index.jsx';
import MainApp from 'mainapp'
const hist = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
    <PersistGate persistor={perssistor}>
    <MainApp/>
    </PersistGate>
    </Provider>
, document.getElementById('root'));
