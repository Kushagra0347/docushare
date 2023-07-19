import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { login, signup } from './redux/reducers/userReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { addFileReducer } from './redux/reducers/fileReducers'

const reducer = combineReducers({
  userLogin: login,
  userRegister: signup,
  addFile: addFileReducer,
})

const userInfo = localStorage.getItem('userInfo')
const userInfoFromStorage = userInfo ? JSON.parse(userInfo) : null

const middleware = [thunk]

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
