import axios from 'axios'
import {
  SESSION_START,
  SESSION_END,
  SESSION_START_FAILED
} from './types'

export const checkSession = () => dispatch => {
  return axios.get('/api/check-session')
    .then(({data}) => {
      if (data === 'hasSession') {
        dispatch({
          type: SESSION_START
        })
      } else {
        dispatch({
          type: SESSION_END
        })
      }
    })
}

export const login = (username, password) => dispatch => {
  return axios.post('/api/login', {username, password})
    .then(({data}) => {
      dispatch({
        type: SESSION_START
      })
    })
    .catch(err => {
      dispatch({
        type: SESSION_START_FAILED,
        payload: err.message || 'Incorrect username or password'
      })
    })
}

export const logout = () => dispatch => {
  return axios.post('/api/logout')
    .then(response => {
      dispatch({
        type: SESSION_END
      })
    })
}
