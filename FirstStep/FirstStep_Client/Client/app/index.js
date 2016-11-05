import React from 'react';
import ReactDOM from 'react-dom';
import routes from './config/routers';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
   <Provider store={store}>
    {routes}
   </Provider>,
   document.getElementById('app')
);
