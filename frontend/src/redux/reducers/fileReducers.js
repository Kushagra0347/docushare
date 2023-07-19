import {
  FILE_ADD_FAIL,
  FILE_ADD_REQUEST,
  FILE_ADD_SUCCESS,
} from '../constants/file'

export const addFileReducer = (state = {}, action) => {
  switch (action.type) {
    case FILE_ADD_REQUEST:
      return { loading: true }
    case FILE_ADD_SUCCESS:
      return { loading: false, fileInfo: action.payload }
    case FILE_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
