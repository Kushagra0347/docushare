import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { login, signup } from './redux/reducers/userReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  addFileReducer,
  deleteFileReducer,
  getFileReducer,
  getFilesReducer,
} from './redux/reducers/fileReducers'

const reducer = combineReducers({
  userLogin: login,
  userRegister: signup,
  addFile: addFileReducer,
  getFiles: getFilesReducer,
  getFile: getFileReducer,
  deleteFile: deleteFileReducer,
})

const userInfo = localStorage.getItem('userInfo')
const userInfoFromStorage = userInfo ? JSON.parse(userInfo) : null

const files = localStorage.getItem('files')
const filesFromStorage = files ? JSON.parse(files) : null

const middleware = [thunk]

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
  getFiles: {
    files: filesFromStorage,
  },
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
