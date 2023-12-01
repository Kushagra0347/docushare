import axios from 'axios'
import {
  DOWNLOAD_FILE_FAIL,
  DOWNLOAD_FILE_REQUEST,
  DOWNLOAD_FILE_SUCCESS,
  FILE_ADD_FAIL,
  FILE_ADD_REQUEST,
  FILE_ADD_SUCCESS,
  FILE_CHANGE_FAIL,
  FILE_CHANGE_REQUEST,
  FILE_CHANGE_SUCCESS,
  FILE_DATA_RESET,
  FILE_DELETE_FAIL,
  FILE_DELETE_REQUEST,
  FILE_DELETE_SUCCESS,
  FILE_GET_FAIL,
  FILE_GET_REQUEST,
  FILE_GET_SUCCESS,
  FILES_GET_FAIL,
  FILES_GET_REQUEST,
  FILES_GET_SUCCESS,
  SHARE_FILE_FAIL,
  SHARE_FILE_REQUEST,
  SHARE_FILE_SUCCESS,
} from '../constants/file'
import fileDownload from 'js-file-download'

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
      localStorage.setItem('files', JSON.stringify(data[0]))

      let files_size = 0
      const GB = 1000 * 1000 * 1000

      data[1] && data[1].forEach((file) => (files_size += file.file_size))
      files_size = Math.round((files_size / GB + Number.EPSILON) * 100) / 100

      localStorage.setItem('space_used', files_size)

      dispatch({
        type: FILES_GET_SUCCESS,
        payload: data[0],
        files_size: files_size,
      })
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

export const changeFile = (id, val) => async (dispatch, getState) => {
  console.log(val)
  try {
    dispatch({ type: FILE_CHANGE_REQUEST })

    const body = {}

    const { userInfo } = getState().userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(url + `change/${id}`, body, config)

    dispatch({ type: FILE_CHANGE_SUCCESS, payload: data })
    dispatch({ type: FILE_GET_SUCCESS, payload: data })

    // Change the state of the file in the list of files that I have available in the localStorage
    // Change the files state to trigger re-render
    let files = JSON.parse(localStorage.getItem('files'))
    for (let i = 0; i < files.length; i++) {
      if (files[i].id === data.id) {
        files[i] = data
        dispatch({
          type: FILES_GET_SUCCESS,
          payload: files,
          files_size: localStorage.getItem('space_used'),
        })
        localStorage.setItem('files', JSON.stringify(files))
        break
      }
    }
  } catch (err) {
    dispatch({
      type: FILE_CHANGE_FAIL,
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

export const shareFile = (usersList, file_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SHARE_FILE_REQUEST })

    const { userInfo } = getState().userLogin

    const body = {
      usersList,
      file_id,
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(url + 'share/', body, config)

    dispatch({ type: SHARE_FILE_SUCCESS, payload: data })
  } catch (err) {
    dispatch({
      type: SHARE_FILE_FAIL,
      payload:
        err.response && err.response.data.detail
          ? err.response.data.detail
          : err.message,
    })
  }
}

export const downloadFile = (id, name) => async (dispatch, getState) => {
  try {
    dispatch({ type: DOWNLOAD_FILE_REQUEST })

    const { userInfo } = getState().userLogin
    const config = {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      responseType: 'blob',
    }

    const { data } = await axios.get(url + `download/${id}`, config)
    await fileDownload(data, name)

    dispatch({ type: DOWNLOAD_FILE_SUCCESS, payload: data })
  } catch (err) {
    console.log('err', err)
    dispatch({
      type: DOWNLOAD_FILE_FAIL,
      payload:
        err.response && err.response.data.detail
          ? err.response.data.detail
          : err.message,
    })
  }
}
