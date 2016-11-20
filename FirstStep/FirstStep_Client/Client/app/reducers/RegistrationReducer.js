import * as types from '../constants/ActionTypes';

const initialState = {
    error: null
};

export function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case types.REGISTRATION_FAILED:
        return Object.assign({}, state, { error: action.registrationError});
    }
  return state;
};
