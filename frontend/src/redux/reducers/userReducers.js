import {
  USERS_DETAIL_FAIL,
  USERS_DETAIL_REQUEST,
  USERS_DETAIL_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
} from '../constants/user'

export const login = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }

    case USER_LOGOUT:
      return {}

    default:
      return state
  }
}

export const signup = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }

    case USER_LOGOUT:
      return {}

    default:
      return state
  }
}

export const editUserReducer = (
  state = { userInfo: localStorage.getItem('editUserInfo'), success: false },
  action,
) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { loading: true }
    case USER_EDIT_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true }
    case USER_EDIT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getUsersReducer = (
  state = { users: localStorage.getItem('usersList') },
  action,
) => {
  switch (action.type) {
    case USERS_DETAIL_REQUEST:
      return { loading: true }
    case USERS_DETAIL_SUCCESS:
      return { login: false, users: action.payload }
    case USERS_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
