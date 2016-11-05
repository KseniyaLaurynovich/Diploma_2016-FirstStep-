import { combineReducers } from 'redux';
import { subjectReducer } from './subjectReducer';

var reducers = combineReducers({
  subjectsState: subjectReducer
});

export default reducers;
