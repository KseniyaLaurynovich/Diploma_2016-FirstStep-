import React from 'react';
import ReactDOM from 'react-dom';
import routes from './config/routers';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './store';
import styles from './main.css'

ReactDOM.render(
   <Provider store={store}>
    {routes}
   </Provider>,
   document.getElementById('app')
);
