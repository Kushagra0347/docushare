import axios from 'axios'
import {
  FILES_GET_FAIL,
  FILES_GET_REQUEST,
  FILES_GET_SUCCESS,
  FILE_ADD_FAIL,
  FILE_ADD_REQUEST,
  FILE_ADD_SUCCESS,
  FILE_DATA_RESET,
  FILE_DELETE_FAIL,
  FILE_DELETE_REQUEST,
  FILE_DELETE_SUCCESS,
  FILE_GET_FAIL,
  FILE_GET_REQUEST,
  FILE_GET_SUCCESS,
} from '../constants/file'

const url = 'http://127.0.0.1:8000/file/'

export const addFile = (details) => async (dispatch, getState) => {
  try {
    dispatch({ type: FILE_ADD_REQUEST })

    const { userInfo } = getState().userLogin

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const body = new FormData()
    body.append('file', details['file'])
    body.append('thumbnail', details['thumbnail'])
    body.append('fileName', details['fileName'])
    body.append('tags', details['tags'])

    const { data } = await axios.post(url + 'add/', body, config)

    dispatch({ type: FILE_ADD_SUCCESS, payload: data })
  } catch (err) {
    dispatch({
      type: FILE_ADD_FAIL,
      payload:
        err.response && err.response.data.detail
          ? err.response.data.detail
          : err.message,
    })
  }
}

// sortBy = 0 -> Alphabetical Order
// sortBy = 1 -> Date Added Order
// id = 0 -> My Cloud Files
// id = 1 -> Shared Files
// id = 2 -> All Files
export const getFiles =
  (id, sortBy = 0) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: FILES_GET_REQUEST })

      const { userInfo } = getState().userLogin

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(
        url + `all/${id}?sortBy=${sortBy}`,
        config,
      )
      localStorage.setItem('files', JSON.stringify(data))

      dispatch({ type: FILES_GET_SUCCESS, payload: data })
    } catch (err) {
      dispatch({
        type: FILES_GET_FAIL,
        payload:
          err.response && err.response.data.detail
            ? err.response.data.detail
            : err.message,
      })
    }
  }

export const getFile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FILE_GET_REQUEST })

    const { userInfo } = getState().userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(url + `get/${id}`, config)

    dispatch({ type: FILE_GET_SUCCESS, payload: data })
  } catch (err) {
    dispatch({
      type: FILE_GET_FAIL,
      payload:
        err.response && err.response.data.detail
          ? err.response.data.detail
          : err.message,
    })
  }
}

export const deleteFile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FILE_DELETE_REQUEST })

    const { userInfo } = getState().userLogin

    const body = {
      id: id,
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(url + `delete/`, body, config)

    dispatch({ type: FILE_DELETE_SUCCESS, payload: data })
    dispatch({ type: FILE_DATA_RESET })
  } catch (err) {
    dispatch({
      type: FILE_DELETE_FAIL,
      payload:
        err.response && err.response.data.detail
          ? err.response.data.detail
          : err.message,
    })
  }
}
