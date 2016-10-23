var combineReducers = require('redux').combineReducers;
var subjectsAsync = require('./subjectsAsyncBackend');

const rootReducer = combineReducers({
  subjectsAsync
});

module.exports = rootReducer
