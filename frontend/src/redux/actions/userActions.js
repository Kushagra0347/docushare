import axios from 'axios'
import {
  USERS_DETAIL_FAIL,
  USERS_DETAIL_REQUEST,
  USERS_DETAIL_SUCCESS,
  USER_DETAILS_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_EDIT_REQUEST,
  USER_EDIT_FAIL,
  USER_EDIT_SUCCESS,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
} from '../constants/user'
import { FILE_DATA_RESET } from '../constants/file'

const url = 'http://127.0.0.1:8000/user/'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      url + 'login/',
      { email, password },
      config,
    )

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.detail
          ? err.response.data.detail
          : err.message,
    })
  }
}

export const register = (f_name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    const config = {
      headers: { 'Content-Type': 'application/json' },
    }

    const { data } = await axios.post(
      url + 'signup/',
      { f_name, email, password },
      config,
    )

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.detail
          ? err.response.data.detail
          : err.message,
    })
  }
}

export const editUser = (details, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_EDIT_REQUEST })

    const { userInfo } = getState().userLogin

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(url + `edit/${id}/`, details, config)

    dispatch({ type: USER_EDIT_SUCCESS, payload: data })
    localStorage.setItem('editUserInfo', JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: USER_EDIT_FAIL,
      payload:
        err.response && err.response.data.detail
          ? err.response.data.detail
          : err.message,
    })
  }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('all-files-sortBy')
  localStorage.removeItem('my-cloud-sortBy')
  localStorage.removeItem('shared-files-sortBy')
  localStorage.removeItem('favorites-sortBy')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: FILE_DATA_RESET })
}

export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USERS_DETAIL_REQUEST })

    const { userInfo } = getState().userLogin
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(url + 'all/', config)

    dispatch({ type: USERS_DETAIL_SUCCESS, payload: data })
    localStorage.setItem('usersList', JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: USERS_DETAIL_FAIL,
      payload:
        err.response && err.response.data.detail
          ? err.response.data.detail
          : err.message,
    })
  }
}

export const getUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAIL_REQUEST })

    const { userInfo } = getState().userLogin
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(url + `${id}/`, config)

    dispatch({ type: USER_DETAIL_SUCCESS, payload: data })
  } catch (err) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload:
        err.response && err.response.data.detail
          ? err.response.data.detail
          : err.message,
    })
  }
}
