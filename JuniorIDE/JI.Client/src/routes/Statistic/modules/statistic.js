import requests from '../../../utils/requests'
import { browserHistory } from 'react-router'
import { validationStates } from '../../../utils/constants'
import helpers from '../../../utils/helpers'
import { handleHeaderChange } from '../../../store/header'
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS'
export const FILTER_GROUP_CHANGE  = 'FILTER_GROUP_CHANGE'
// ------------------------------------
// Actions
// ------------------------------------

export const fetchAssignedGroupsSuccess = (groups) => {
    return {
        type    : FETCH_GROUPS_SUCCESS,
        payload : groups
    }
}

export const filterGroupChange = (group) => {
    return {
        type    : FILTER_GROUP_CHANGE,
        payload : group
    }
}

export const actions = {
    fetchAssignedGroupsSuccess,
    filterGroupChange
}
// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [FETCH_GROUPS_SUCCESS]      : (state, action) => {
        return Object.assign({}, state, { groups: action.payload  })
    },
    [FILTER_GROUP_CHANGE]       : (state, action) => {
        return Object.assign({}, state, { filterGroup: action.payload  })
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  groups              : [],
  filterGroup         : null
}

export default function statisticReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export function fetchTask(taskId){
    return (dispatch, getState) => {
    var token = getState().user.credentials.access_token
    requests.fetchTask(token, taskId).then(function(response){
      dispatch(handleHeaderChange("Statistic of '" + response.data.name + "'"))
    })
  }
}

export function fetchGroups(taskId){
    return (dispatch, getState) => {
        var token = getState().user.credentials.access_token
        requests.fetchGroupsWithUsersForTask(token, taskId).then(function(response){
            dispatch(fetchAssignedGroupsSuccess(response.data))
            dispatch(filterGroupChange(response.data[0]))
        })
    }
}

export function changeGroupFilter(groupId){
    return (dispatch, getState) => {
        var groups = getState().statistic.groups;
        var group = groups.filter((g) => { return g.id == groupId })
        dispatch(filterGroupChange(group[0]))
    }
}