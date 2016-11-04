import { combineReducers } from 'redux';
import { subjectReducer } from './subject-reducer';

var reducers = combineReducers({
  subjectsState: subjectReducer
});

export default reducers;
