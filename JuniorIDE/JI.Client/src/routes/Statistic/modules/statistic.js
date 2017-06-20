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
export const SET_MARK_EDIT_MODE = 'SET_MARK_EDIT_MODE'
export const MARK_CHANGE = 'MARK_CHANGE'
export const PROJECT_CHANGE = 'PROJECT_CHANGE'
export const CHANGE_CURRENT_FILE = 'CHANGE_CURRENT_FILE'
export const CHANGE_MODE = 'CHANGE_MODE'

export const TRYINGS_MODE = 'TRYINGS_MODE'
export const PROJECT_MODE = 'PROJECT_MODE'
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

export const setMarkEditMode = (userId, isEditMode, mark) => {
    return {
        type    : SET_MARK_EDIT_MODE,
        payload : { markEditModeUser: userId, markIsEditMode: isEditMode, markNewValue: mark }
    }
}

export const handleMarkChange = (e) => {
    return {
        type    : MARK_CHANGE,
        payload : e.target.value
    }
}

export const projectChange = (data) => {
    return {
        type    : PROJECT_CHANGE,
        payload : data
    }
}

export const changeCurrentFile = (data) => {
    return {
        type: CHANGE_CURRENT_FILE,
        payload: data
    }
}

export const changeMode = (mode) => {
    return {
        type: CHANGE_MODE,
        payload: mode
    }
}

export const actions = {
    changeMode,
    fetchAssignedGroupsSuccess,
    filterGroupChange,
    taskChange,
    statisticChange,
    setMarkEditMode,
    handleMarkChange
}
// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [MARK_CHANGE]               : (state, action) => {
        return Object.assign({}, state, { markNewValue: action.payload})
    },
    [SET_MARK_EDIT_MODE]        : (state, action) => {
        return Object.assign({}, state, action.payload)
    },
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
    },
    [PROJECT_CHANGE]: (state, action) => {
        return Object.assign({}, state, { currentProject: action.payload  })
    },
    [CHANGE_CURRENT_FILE]: (state, action) => {
        return Object.assign({}, state, { currentFile: action.payload  })
    },
    [CHANGE_MODE]: (state, action) => {
        return Object.assign({}, state, { mode: action.payload  })
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
  currentStatistic    : null,
  markEditModeUser    : null,
  markIsEditMode      : false,
  markNewValue        : null,
  currentProject      : null,
  currentFile         : null,
  mode                : null
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
        dispatch(changeMode(null))
        dispatch(filterGroupChange(group[0]))
    }
}

export function changeProject(userId){
    return (dispatch, getState) => {

        var token = getState().user.credentials.access_token
        var taskId = getState().statistic.taskId

        dispatch(currentUserChange(userId))

        requests.getProjectStructure(token, taskId, userId).then(function(result){
            if(!result.data.Children[0]){
                dispatch(projectChange(null)) 
            }
            else{
                var data =  mapFile(result.data.Children[0])
                dispatch(projectChange(data))
            }
        });

        dispatch(changeMode(PROJECT_MODE))
        dispatch(changeCurrentFile(null))
        dispatch(statisticChange(null))
    }
}

function mapFile(file){
    return  {
        id: file.Id,
        name: file.Name,
        isFolder: file.IsFolder,
        toggled: true,
        children: file.Children 
            ? file.Children.map(function(f){
                return mapFile(f)
            })
            : []
    }
}

export function saveMark(userId){
    return (dispatch, getState) => {
        var mark = getState().statistic.markNewValue
        var taskId = getState().statistic.taskId
        var token = getState().user.credentials.access_token

        requests.setMark(token, taskId, userId, mark).then(function(response){
            var groups = getState().statistic.groups

            groups.forEach(function(group){
                var user = group.users.filter(function(user){
                    return user.id == userId
                })[0]
                var index = group.users.map(function(u){ return u.id }).indexOf(userId)
                if(user){
                    user.mark = mark
                    group.users[index] = user
                }
            })

            dispatch(setMarkEditMode(null, false, null))
            dispatch(fetchAssignedGroupsSuccess(groups))
        },function(error){
            var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)
            dispatch(statisticChange([]))
      })
    }
}

export function loadFile(fileId, isFolder){
    return (dispatch, getState) => {
        if(isFolder){
            dispatch(changeCurrentFile(null))
            return
        }

        var token = getState().user.credentials.access_token
        requests.fetchFile(token, fileId).then(function(result){
            dispatch(changeCurrentFile(result.data))
        })
    }
}

export function openStatisticForUser(userId){
    return (dispatch, getState) => {

        var token = getState().user.credentials.access_token
        var taskId = getState().statistic.taskId

        dispatch(currentUserChange(userId))

        requests.fetchStatisticByTaskAndUser(token, taskId, userId).then(function(response){
            dispatch(statisticChange(response.data))
            dispatch(projectChange(null))
            dispatch(changeMode(TRYINGS_MODE))
        },function(error){
            var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)
            dispatch(statisticChange([]))
      })
    }
}