import requests from '../../../../utils/requests'
import helpers from '../../../../utils/helpers'
import _ from 'lodash'
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USERS_SUCCESS            = 'FETCH_USERS_SUCCESS'
export const FETCH_ROLES_SUCCESS            = 'FETCH_ROLES_SUCCESS'
export const SET_USER_EDIT_MODAL_SHOWING    = 'SET_USER_EDIT_MODAL_SHOWING'
export const EDITING_FIRST_NAME_CHANGED     = 'EDITING_FIRST_NAME_CHANGED'
export const EDITING_LAST_NAME_CHANGED      = 'EDITING_LAST_NAME_CHANGED'
export const EDITING_PATRONYMIC_CHANGED     = 'EDITING_PATRONYMIC_CHANGED'
export const EDITING_EMAIL_CHANGED          = 'EDITING_EMAIL_CHANGED'
export const EDITING_ROLES_CHANGED          = 'EDITING_ROLES_CHANGED'
export const SAVE_EDITED_USER_SUCCESS       = 'SAVE_EDITED_USER_SUCCESS'
export const SAVE_EDITED_USER_FAILED        = 'SAVE_EDITED_USER_FAILED'
export const SAVE_EDITED_USER_IS_LOADING    = 'SAVE_EDITED_USER_IS_LOADING'
export const EDIT_USER_RESET_ERRORS         = 'EDIT_USER_RESET_ERRORS'
export const SET_DELETE_USER_CONFIRMED      = 'SET_DELETE_USER_CONFIRMED'
export const DELETE_USER_IS_LOADING         = 'DELETE_USER_IS_LOADING'
export const DELETE_USER_SUCCESS            = 'DELETE_USER_SUCCESS'
export const SET_USERS_FILTER               = 'SET_USERS_FILTER'
export const SET_USERS_SORT                 = 'SET_USERS_SORT'
export const SET_USERS_TEXT_FILTER          = 'SET_USERS_TEXT_FILTER'
export const FETCH_USERS_GROUPS_SUCCESS     = 'FETCH_USERS_GROUPS_SUCCESS'
export const EDITING_USER_GROUPS_CHANGED    = 'EDITING_USER_GROUPS_CHANGED'
export const SET_USERS_GROUP_FILTER         = 'SET_USERS_GROUP_FILTER'
// ------------------------------------
// Actions
// ------------------------------------

export const setFilter = (key, label) => {
  return {
    type    : SET_USERS_FILTER,
    payload : { filterKey: key, filterLabel : label }
  }
}

export const setSort = (key, label) => {
  return {
    type    : SET_USERS_SORT,
    payload : { sortKey: key, sortLabel : label }
  }
}

export const setGroupFilter = (key, label) => {
  return {
    type    : SET_USERS_GROUP_FILTER,
    payload : { groupFilterKey: key, groupFilterLabel : label }
  }
}

export const setTextFilter = (filter) => {
  return {
    type    : SET_USERS_TEXT_FILTER,
    payload : filter
  }
}

export const onFirstNameChange = (event) => {
  return {
    type    : EDITING_FIRST_NAME_CHANGED,
    payload : event.target.value
  }
}

export const onLastNameChange = (event) => {
  return {
    type    : EDITING_LAST_NAME_CHANGED,
    payload : event.target.value
  }
}

export const onPatronymicChange = (event) => {
  return {
    type    : EDITING_PATRONYMIC_CHANGED,
    payload : event.target.value
  }
}

export const onEmailChange = (event) => {
  return {
    type    : EDITING_EMAIL_CHANGED,
    payload : event.target.value
  }
}

export const onRolesChange = (roles) => {
  return {
    type    : EDITING_ROLES_CHANGED,
    payload : roles
  }
}

export const onGroupsChange = (groups) => {
  return {
    type    : EDITING_USER_GROUPS_CHANGED,
    payload : groups
  }
}

export const fetchUsersSuccess = (users) => {
  return {
    type    : FETCH_USERS_SUCCESS,
    payload : users
  }
}

export const fetchRolesSuccess = (roles) => {
  return {
    type    : FETCH_ROLES_SUCCESS,
    payload : roles
  }
}

export const fetchGroupsSuccess = (groups) => {
  return {
    type    : FETCH_USERS_GROUPS_SUCCESS,
    payload : groups
  }
}

export const setEditModalShowing = (show, user) => {
  return {
    type    : SET_USER_EDIT_MODAL_SHOWING,
    payload : { showEditModal: show, currentUser: user, deleteConfirmed: false }
  }
}

export const setSaveEditUserLoading = (isLoading) => {
  return {
    type    : SAVE_EDITED_USER_IS_LOADING,
    payload : isLoading
  }
}

export const setDeleteUserLoading = (isLoading) => {
  return {
    type    : DELETE_USER_IS_LOADING,
    payload : isLoading
  }
}

export const saveEditUserFailed = (error) => {
  return {
    type    : SAVE_EDITED_USER_FAILED,
    payload : error
  }
}

export const saveEditUserSuccess = (user) => {
  return {
    type    : SAVE_EDITED_USER_SUCCESS,
    payload : user
  }
}

export const resetErrors = () => {
  return {
    type    : EDIT_USER_RESET_ERRORS
  }
}

export const onDeleteConfirmation = (event) => {
  return {
    type    : SET_DELETE_USER_CONFIRMED,
    payload : event.target.checked
  }
}

export const deleteUserSuccess = () => {
  return {
    type    : DELETE_USER_SUCCESS
  }
}

export function fetchRoles(){
  return (dispatch, getState) => {
    var token = getState().user.credentials.access_token
    requests.fetchRoles(token).then(function(response){
      dispatch(fetchRolesSuccess(response.data))
    },function(error){
      //handle error
      dispatch(fetchUsersSuccess([]))
    })
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

export function fetchUsers(){
  return (dispatch, getState) => {
    var token = getState().user.credentials.access_token
    requests.fetchUsers(token).then(function(response){
      dispatch(fetchUsersSuccess(response.data))
    },function(error){
      //handle error
      dispatch(fetchUsersSuccess([]))
    })
  }
}

export function saveEditedUser(event){
  event.preventDefault()
  return (dispatch, getState) => {
    dispatch(resetErrors())
    dispatch(setSaveEditUserLoading(true))

    var user = getState().usersGrid.currentUser
    var token = getState().user.credentials.access_token
    requests.editUser(token, user).then(function(response){
      dispatch(saveEditUserSuccess(response.data))
      dispatch(setSaveEditUserLoading(false))
      dispatch(setEditModalShowing(null, false))
    },function(error){
      var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)

      dispatch(saveEditUserFailed(errorMessage))
      dispatch(setSaveEditUserLoading(false))
    })
  }
}

export function onDeleteUser(event){
  event.preventDefault()
  return (dispatch, getState) => {
    dispatch(setDeleteUserLoading(true))

    var userId = getState().usersGrid.currentUser.id
    var token = getState().user.credentials.access_token
    requests.deleteUser(token, userId).then(function(response){
      dispatch(deleteUserSuccess())
      dispatch(setDeleteUserLoading(false))
      dispatch(setEditModalShowing(null, false))
    },function(error){
      var errorMessage = helpers.getModelStateErrors(error.response.data.ModelState)

      //todo handle error
    })
  }
}

export function openEditModal(userId){
    return (dispatch, getState) => {
      var users = getState().usersGrid.users
      var user = null

      if(userId != null){
        user = users.find((u) => {
          return u.id === userId
        });
      }

      dispatch(setEditModalShowing(true, _.cloneDeep(user)))
  }
}

export function closeEditModal(){
  return (dispatch, getState) => {
    dispatch(setEditModalShowing(false, null))
  }
}

export const actions = {
  fetchRoles,
  fetchGroups,
  fetchUsers,
  openEditModal,
  closeEditModal,
  saveEditedUser,
  onFirstNameChange,
  onLastNameChange,
  onPatronymicChange,
  onEmailChange,
  onRolesChange,
  onGroupsChange,
  onDeleteConfirmation,
  onDeleteUser,
  setFilter,
  setSort,
  setTextFilter,
  setGroupFilter
}

// ------------------------------------
//  Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_USERS_SUCCESS]         : (state, action) => {
    return Object.assign({}, state, { users: action.payload })
  },
  [FETCH_USERS_GROUPS_SUCCESS]         : (state, action) => {
    return Object.assign({}, state, { groups: action.payload })
  },
  [FETCH_ROLES_SUCCESS]         : (state, action) => {
    return Object.assign({}, state, { roles: action.payload })
  },
  [SET_USER_EDIT_MODAL_SHOWING] : (state, action) => {
    return Object.assign({}, state, action.payload )
  },
  [EDITING_FIRST_NAME_CHANGED]  : (state, action) => {
    return Object.assign({}, state, { currentUser:
      Object.assign({}, state.currentUser, { firstName: action.payload })})
  },
  [EDITING_LAST_NAME_CHANGED]   : (state, action) => {
    return Object.assign({}, state, { currentUser:
      Object.assign({}, state.currentUser, { lastName: action.payload })})
  },
  [EDITING_PATRONYMIC_CHANGED]  : (state, action) => {
    return Object.assign({}, state, { currentUser:
      Object.assign({}, state.currentUser, { patronymic: action.payload })})
  },
  [EDITING_EMAIL_CHANGED]       : (state, action) => {
    return Object.assign({}, state, { currentUser:
      Object.assign({}, state.currentUser, { email: action.payload })})
  },
  [EDITING_ROLES_CHANGED]       : (state, action) => {
    return Object.assign({}, state, { currentUser:
      Object.assign({}, state.currentUser, { roles: action.payload })})
  },
  [EDITING_USER_GROUPS_CHANGED]: (state, action) => {
    return Object.assign({}, state, { currentUser:
      Object.assign({}, state.currentUser, { groups: action.payload })})
  },
  [SAVE_EDITED_USER_SUCCESS]    : (state, action) => {
    var users = _.cloneDeep(state.users)
    var user = users.find((u) => {
      return u.id === action.payload.id
    });

    var userIndex = users.indexOf(user)
    users[userIndex] = _.cloneDeep(action.payload)

    return Object.assign({}, state, { users: users } )
  },
  [DELETE_USER_SUCCESS]        : (state, action) => {
    var userId = state.currentUser.id
    var users = _.cloneDeep(state.users)
    var user = users.find((u) => {
      return u.id === userId
    });

    var userIndex = users.indexOf(user)
    users.splice(userIndex, 1)

    return Object.assign({}, state, { users: users } )
  },
  [SAVE_EDITED_USER_FAILED]     : (state, action) => {
    return Object.assign({}, state, { saveUserError : action.payload } )
  },
  [SAVE_EDITED_USER_IS_LOADING] : (state, action) => {
    return Object.assign({}, state, { saveUserLoading : action.payload } )
  },
  [EDIT_USER_RESET_ERRORS]     : (state, action) => {
    return Object.assign({}, state, { saveUserError : null  } )
  },
  [SET_DELETE_USER_CONFIRMED]  : (state, action) => {
    return Object.assign({}, state, { deleteConfirmed : action.payload  } )
  },
  [DELETE_USER_IS_LOADING]     : (state, action) => {
    return Object.assign({}, state, { deleteUserLoading : action.payload  } )
  },
  [SET_USERS_FILTER]           : (state, action)=> {
    return Object.assign({}, state, action.payload )
  },
  [SET_USERS_SORT]             : (state, action)=> {
    return Object.assign({}, state, action.payload )
  },
  [SET_USERS_GROUP_FILTER]     : (state, action)=> {
    return Object.assign({}, state, action.payload )
  },
  [SET_USERS_TEXT_FILTER]      : (state, action)=> {
    return Object.assign({}, state, { textFilter: action.payload })
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  users                   : [],
  roles                   : [],
  groups                  : [],
  currentUser             : null,
  showEditModal           : false,
  saveUserLoading         : false,
  deleteUserLoading       : false,
  saveUserError           : null,
  deleteConfirmed         : false,
  filterKey               : '',
  filterLabel             : 'Filter',
  sortKey                 : '',
  sortLabel               : 'Sort',
  textFilter              : '',
  groupFilterLabel        : 'Group',
  groupFilterKey          : ''
}

export default function usersGridReducer (state = initialState, action){
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
