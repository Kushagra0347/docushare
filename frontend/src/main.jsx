import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.jsx'
import './static/css/index.css'
import store from './store.js'

export const BACKEND_URL = 'http://127.0.0.1:8000'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>,
)
