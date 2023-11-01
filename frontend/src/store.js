import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { getUsersReducer, login, signup } from './redux/reducers/userReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  addFileReducer,
  changeFileReducer,
  deleteFileReducer,
  downloadFileReducer,
  getFileReducer,
  getFilesReducer,
  shareFileReducer,
} from './redux/reducers/fileReducers'

const reducer = combineReducers({
  userLogin: login,
  userRegister: signup,
  getUsers: getUsersReducer,

  addFile: addFileReducer,
  getFiles: getFilesReducer,
  getFile: getFileReducer,
  changeFile: changeFileReducer,
  shareFile: shareFileReducer,
  deleteFile: deleteFileReducer,
  downloadFile: downloadFileReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
const userInfo = userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null

const usersListFromStorage = localStorage.getItem('usersList')
const usersList = usersListFromStorage ? JSON.parse(usersListFromStorage) : null

const filesFromStorage = localStorage.getItem('files')
const files = filesFromStorage ? JSON.parse(filesFromStorage) : null

const middleware = [thunk]

const initialState = {
  userLogin: {
    userInfo: userInfo,
  },
  getUsers: {
    users: usersList,
  },
  getFiles: {
    files: files,
  },
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
