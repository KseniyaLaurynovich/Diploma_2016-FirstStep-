import { GET_SUBJECTS_SUCCESS } from '../constants/ActionTypes';

const initialState = [];

export function subjectReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUBJECTS_SUCCESS:
      return action.subjects;
  }
  return state;
}
