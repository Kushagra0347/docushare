import {
  DOWNLOAD_FILE_FAIL,
  DOWNLOAD_FILE_REQUEST,
  DOWNLOAD_FILE_SUCCESS,
  FILES_GET_FAIL,
  FILES_GET_REQUEST,
  FILES_GET_SUCCESS,
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
  SHARE_FILE_FAIL,
  SHARE_FILE_REQUEST,
  SHARE_FILE_SUCCESS,
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
      return {
        loading: false,
        files: action.payload,
        space_used: action.files_size,
      }
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

export const changeFileReducer = (state = {}, action) => {
  switch (action.type) {
    case FILE_CHANGE_REQUEST:
      return { loading: true }
    case FILE_CHANGE_SUCCESS:
      return { loading: false, success: action.payload }
    case FILE_CHANGE_FAIL:
      return { loading: false, error: action.payload }
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

export const shareFileReducer = (state = {}, action) => {
  switch (action.type) {
    case SHARE_FILE_REQUEST:
      return { loading: true }
    case SHARE_FILE_SUCCESS:
      return { loading: false, message: action.payload }
    case SHARE_FILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const downloadFileReducer = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_FILE_REQUEST:
      return { loading: true }
    case DOWNLOAD_FILE_SUCCESS:
      return { loading: false, messsage: action.payload }
    case DOWNLOAD_FILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
