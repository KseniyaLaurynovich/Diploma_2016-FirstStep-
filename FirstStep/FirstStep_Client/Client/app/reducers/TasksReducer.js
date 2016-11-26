import * as types from '../constants/ActionTypes'

const initialState = {
    task: null
};

export function taskReducer(state = initialState, action){
  switch(action.type){
    case types.GET_TASK_SUCCESS:
      return Object.assign({}, state, { task: action.task });
  }
  return state;
}
