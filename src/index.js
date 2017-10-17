import React from 'react'
import ReactDOM from 'react-dom'
import store from 'store'
import App from './App'
import {checkSession} from 'common/actions/session'

store.dispatch(checkSession())

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
)
