import axios from 'axios'
import {
  USER_DETAILS_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
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

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: FILE_DATA_RESET })
}
