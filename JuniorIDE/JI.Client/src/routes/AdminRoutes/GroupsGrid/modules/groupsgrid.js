import requests from '../../../../utils/requests'
import helpers from '../../../../utils/helpers'
import _ from 'lodash'
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_GROUPS_SUCCESS            = 'FETCH_GROUPS_SUCCESS'
export const SET_GROUP_EDIT_MODAL_SHOWING    = 'SET_GROUP_EDIT_MODAL_SHOWING'
export const EDITING_GROUP_NAME_CHANGED      = 'EDITING_GROUP_NAME_CHANGED'
export const SAVE_EDITED_GROUP_SUCCESS       = 'SAVE_EDITED_GROUP_SUCCESS'
export const SAVE_EDITED_GROUP_FAILED        = 'SAVE_EDITED_GROUP_FAILED'
export const SAVE_EDITED_GROUP_IS_LOADING    = 'SAVE_EDITED_GROUP_IS_LOADING'
export const EDIT_GROUP_RESET_ERRORS         = 'EDIT_GROUP_RESET_ERRORS'
export const SET_DELETE_GROUP_CONFIRMED      = 'SET_DELETE_GROUP_CONFIRMED'
export const DELETE_GROUP_IS_LOADING         = 'DELETE_GROUP_IS_LOADING'
export const DELETE_GROUP_SUCCESS            = 'DELETE_GROUP_SUCCESS'
export const SET_GROUP_TEXT_FILTER           = 'SET_GROUP_TEXT_FILTER'
// ------------------------------------
// Actions
// ------------------------------------

export const fetchGroupsSuccess = (groups) => {
  return {
    type    : FETCH_GROUPS_SUCCESS,
    payload : groups
  }
}

export const setEditModalShowing = (show, group) => {
  return {
    type    : SET_GROUP_EDIT_MODAL_SHOWING,
    payload : { showEditModal: show, currentGroup: group, deleteConfirmed: false }
  }
}

export const onNameChange = (event) => {
  return {
    type    : EDITING_GROUP_NAME_CHANGED,
    payload : event.target.value
  }
}

export const resetErrors = () => {
  return {
    type    : EDIT_GROUP_RESET_ERRORS,
  }
}

export const setSaveEditGroupLoading = (isLoading) => {
  return {
    type    : SAVE_EDITED_GROUP_IS_LOADING,
    payload : isLoading
  }
}

export const saveEditGroupSuccess = (group) => {
  return{
    type    : SAVE_EDITED_GROUP_SUCCESS,
    payload : group
  }
}

export const saveEditGroupFailed = (error) => {
  return {
    type    : SAVE_EDITED_GROUP_FAILED,
    payload : error
  }
}

export const onDeleteConfirmation = (event) => {
  return {
    type    : SET_DELETE_GROUP_CONFIRMED,
    payload : event.target.checked
  }
}

export const setDeleteGroupLoading = (isLoading) => {
  return {
    type    : DELETE_GROUP_IS_LOADING,
    payload : isLoading
  }
}

export const deleteGroupSuccess = () => {
  return {
    type    : DELETE_GROUP_SUCCESS
  }
}

export const setTextFilter = (filter) => {
  return {
    type    : SET_GROUP_TEXT_FILTER,
    payload : filter
  }
}

export function fetchGroups(){
  return (dispatch, getState) => {
    var token = getState().user.credentials.access_token
    requests.fetchGroups(token).then(function(response){
      dispatch(fetchGroupsSuccess(response.data))
    },function(error){
      //handle error
      dispatch(fetchGroupsSuccess([]))
    })
  }
}

export function openEditModal(groupId){
    return (dispatch, getState) => {
      dispatch(resetErrors())
      
      var groups = getState().groupsGrid.groups
      var group = null

      if(groupId != null){
        group = groups.find((g) => {
          return g.id === groupId
        });
      }

      dispatch(setEditModalShowing(true, _.cloneDeep(group)))
  }
}

export function closeEditModal(){
  return (dispatch, getState) => {
    dispatch(setEditModalShowing(false, null))
  }
}

export function saveEditedGroup(event){
  event.preventDefault()
  return (dispatch, getState) => {
    dispatch(resetErrors())
    dispatch(setSaveEditGroupLoading(true))

    var group = getState().groupsGrid.currentGroup
    var token = getState().user.credentials.access_token
    requests.editGroup(token, group).then(function(response){
      dispatch(saveEditGroupSuccess(response.data))
      dispatch(setSaveEditGroupLoading(false))
      dispatch(setEditModalShowing(false, null))
    },function(error){
      var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)

      dispatch(saveEditGroupFailed(errorMessage))
      dispatch(setSaveEditGroupLoading(false))
    })
  }
}

export function onDeleteGroup(event){
  event.preventDefault()
  return (dispatch, getState) => {
    dispatch(setDeleteGroupLoading(true))

    var groupId = getState().groupsGrid.currentGroup.id
    var token = getState().user.credentials.access_token
    requests.deleteGroup(token, groupId).then(function(response){
      dispatch(deleteGroupSuccess())
      dispatch(setDeleteGroupLoading(false))
      dispatch(setEditModalShowing(null, false))
    },function(error){
      var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)

      //todo handle error
    })
  }
}

export const actions = {
  fetchGroups,
  openEditModal,
  closeEditModal,
  onNameChange,
  saveEditedGroup,
  onDeleteConfirmation,
  onDeleteGroup,
  setTextFilter
}

// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_GROUPS_SUCCESS]          : (state, action) => {
    return Object.assign({}, state, { groups: action.payload })
  },
  [SET_GROUP_EDIT_MODAL_SHOWING]  : (state, action) => {
    return Object.assign({}, state, action.payload )
  },
  [EDITING_GROUP_NAME_CHANGED]    : (state, action) => {
    return Object.assign({}, state, { currentGroup:
      Object.assign({}, state.currentGroup, { name: action.payload })})
  },
  [EDIT_GROUP_RESET_ERRORS]       : (state, action) => {
      return Object.assign({}, state, { saveGroupError : null  } )
  },
  [SAVE_EDITED_GROUP_IS_LOADING]  : (state, action) => {
      return Object.assign({}, state, { saveGroupLoading : action.payload  } )
  },
  [SAVE_EDITED_GROUP_SUCCESS]     : (state, action) => {
    var groups = _.cloneDeep(state.groups)
    if(!state.currentGroup.id){
      groups.push(action.payload)
    }else{
      var groupId = state.currentGroup.id
      var group = groups.find((g) => {
        return g.id === groupId
      });

      var groupIndex = groups.indexOf(group)
      groups[groupIndex] = action.payload
    }

    return Object.assign({}, state, { groups: groups } )
  },
  [SAVE_EDITED_GROUP_FAILED]    : (state, action) => {
    return Object.assign({}, state, { saveGroupError: action.payload } )
  },
  [SET_DELETE_GROUP_CONFIRMED]  : (state, action) => {
    return Object.assign({}, state, { deleteConfirmed: action.payload } )
  },
  [DELETE_GROUP_IS_LOADING]     : (state, action) => {
    return Object.assign({}, state, { deleteGroupLoading: action.payload } )
  },
  [DELETE_GROUP_SUCCESS]        : (state, action) => {
      var groupId = state.currentGroup.id
      var groups = _.cloneDeep(state.groups)
      var group = groups.find((g) => {
        return g.id === groupId
      });

      var groupIndex = groups.indexOf(group)
      groups.splice(groupIndex, 1)

      return Object.assign({}, state, { groups: groups } )
    },
    [SET_GROUP_TEXT_FILTER]       : (state, action) => {
      return Object.assign({}, state, { textFilter: action.payload } )
    }
  }
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  groups            : [],
  currentGroup      : {},
  showEditModal     : false,
  deleteConfirmed   : false,
  saveGroupError    : null,
  saveGroupLoading  : false,
  deleteGroupLoading: false,
  deleteConfirmed   : false,
  textFilter        : ''
}

export default function usersGridReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
