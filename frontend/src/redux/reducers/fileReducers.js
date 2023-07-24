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

export const addFileReducer = (state = {}, action) => {
  switch (action.type) {
    case FILE_ADD_REQUEST:
      return { loading: true }
    case FILE_ADD_SUCCESS:
      console.log(action.payload)
      return { loading: false, fileInfo: action.payload }
    case FILE_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getFilesReducer = (state = { files: [] }, action) => {
  switch (action.type) {
    case FILES_GET_REQUEST:
      return { loading: true, files: [] }
    case FILES_GET_SUCCESS:
      return { loading: false, files: action.payload }
    case FILES_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getFileReducer = (state = {}, action) => {
  switch (action.type) {
    case FILE_GET_REQUEST:
      return { loading: true }
    case FILE_GET_SUCCESS:
      return { loading: false, fileInfo: action.payload }
    case FILE_GET_FAIL:
      return { loading: false, error: action.payload }
    case FILE_DATA_RESET:
      return {}
    default:
      return state
  }
}

export const deleteFileReducer = (state = {}, action) => {
  switch (action.type) {
    case FILE_DELETE_REQUEST:
      return { loading: true }
    case FILE_DELETE_SUCCESS:
      return { loading: false, message: action.payload }
    case FILE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
