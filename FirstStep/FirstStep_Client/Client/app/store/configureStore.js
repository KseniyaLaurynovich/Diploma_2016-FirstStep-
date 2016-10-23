var redux = require('redux');
var rootReducer = require('../reducers');

function configureStore(initialState){
    return redux.createStore(rootReducer);
}

module.exports = configureStore;
