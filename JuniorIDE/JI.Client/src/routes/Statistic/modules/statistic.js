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
export const TASK_FOR_STATISTIC_CHANGE = 'TASK_FOR_STATISTIC_CHANGE'
export const STATISTIC_CHANGE = 'STATISTIC_CHANGE'
export const CURRENT_USER_FOR_STATISTIC_CHANGE = 'CURRENT_USER_FOR_STATISTIC_CHANGE'
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

export const taskChange = (taskId) => {
    return {
        type    : TASK_FOR_STATISTIC_CHANGE,
        payload : taskId
    }
}

export const currentUserChange = (userId) => {
    return {
        type    : CURRENT_USER_FOR_STATISTIC_CHANGE,
        payload : userId
    }
}

export const statisticChange = (statistic) => {
    return {
        type    : STATISTIC_CHANGE,
        payload : statistic
    }
}

export const actions = {
    fetchAssignedGroupsSuccess,
    filterGroupChange,
    taskChange,
    statisticChange
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
    },
    [TASK_FOR_STATISTIC_CHANGE] : (state, action) => {
        return Object.assign({}, state, { taskId: action.payload  })
    },
    [STATISTIC_CHANGE]          : (state, action) => {
        return Object.assign({}, state, { currentStatistic: action.payload  })
    },
    [CURRENT_USER_FOR_STATISTIC_CHANGE]: (state, action) => {
        return Object.assign({}, state, { currentUser: action.payload  })
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  taskId              : null,
  groups              : [],
  filterGroup         : null,
  currentUser         : null,
  currentStatistic    : null
}

export default function statisticReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export function fetchTask(taskId){
    return (dispatch, getState) => {
    var token = getState().user.credentials.access_token
    requests.fetchTask(token, taskId).then(function(response){
      dispatch(taskChange(taskId))
      dispatch(handleHeaderChange("Statistic of '" + response.data.name + "'"))
    })
  }
}

export function fetchGroups(taskId){
    return (dispatch, getState) => {
        dispatch(currentUserChange(null))
        dispatch(statisticChange(null))
        
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
        dispatch(currentUserChange(null))
        dispatch(statisticChange(null))
        dispatch(filterGroupChange(group[0]))
    }
}

export function openStatisticForUser(userId){
    return (dispatch, getState) => {

        var token = getState().user.credentials.access_token
        var taskId = getState().statistic.taskId

        dispatch(currentUserChange(userId))

        requests.fetchStatisticByTaskAndUser(token, taskId, userId).then(function(response){
            dispatch(statisticChange(response.data))
        },function(error){
            var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)
            dispatch(statisticChange([]))
      })
    }
}