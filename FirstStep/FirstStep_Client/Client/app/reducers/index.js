import { combineReducers } from 'redux';
import { subjectReducer } from './subjectReducer';
import { reducer as reduxFormReducer } from 'redux-form';

var reducers = combineReducers({
  subjectsState: subjectReducer,
  form: reduxFormReducer
});

export default reducers;
