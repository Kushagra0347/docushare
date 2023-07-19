import axios from 'axios'
import {
  FILE_ADD_FAIL,
  FILE_ADD_REQUEST,
  FILE_ADD_SUCCESS,
} from '../constants/file'

const url = 'http://127.0.0.1:8000/file/'

export const addFile = (details) => async (dispatch, getState) => {
  console.log(details)
  console.log(details['file'])
  try {
    dispatch({ type: FILE_ADD_REQUEST })

    const { userInfo } = getState().userLogin

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const body = new FormData()
    body.append('file', details['file'])
    body.append('thumbnail', details['thumbnail'])
    body.append('fileName', details['fileName'])
    body.append('tags', details['tags'])

    const { data } = axios.post(url + 'add/', body, config)

    console.log(data)

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
