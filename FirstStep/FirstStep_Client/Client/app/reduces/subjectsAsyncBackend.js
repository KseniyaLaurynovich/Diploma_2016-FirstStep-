var ActionTypes = require('../constants/ActionTypes');

const initialState = [];

function todos(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_SUBJECTS_SUCCESS:
      return action.subjects;
};

module.exports = todos;
